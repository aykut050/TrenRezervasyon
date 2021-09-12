const express = require("express");
const axios = require("axios");
const router = express.Router();

const services = require("../services/render");

router.get("/", services.homeRoutes);

router.post("/reservation", async(req, res, next) => {
    const request = {
        "Tren": {
            "Ad": req.body.trains,
            "Vagonlar": 
            [
                {"Ad":req.body.carriageName1, "Kapasite":req.body.carriageCapacity1, "DoluKoltukAdet": req.body.fullSeat1},
                {"Ad":req.body.carriageName2, "Kapasite":req.body.carriageCapacity2, "DoluKoltukAdet": req.body.fullSeat2},
                {"Ad":req.body.carriageName3, "Kapasite":req.body.carriageCapacity3, "DoluKoltukAdet": req.body.fullSeat3}
            ]
        },
        "RezervasyonYapilacakKisiSayisi": req.body.passengerNumber,
        "KisilerFarkliVagonlaraYerlestirilebilir":req.body.differentCarriage
    }
    axios.post('http://localhost:3000/reservationCheck', request)
    res.redirect("/");
});

router.post("/reservationCheck", async(req, res) => {
    const response = {

    }
    await req.body.Tren.Vagonlar.map((data, index) => {
        const i = data.Kapasite / 10;
        const j = i * 7;
        data.DoluKoltukAdet < j ? data.RezervasyonYapilabilir = "true" : data.RezervasyonYapilabilir = "false"
    })
    let num = 0;
    let YerleşimAyrinti = [];
    await req.body.Tren.Vagonlar.map(async(data) => {
        await data.RezervasyonYapilabilir == "true" ? ++num : null;
    })

    if( num > 0) {
        req.body.Tren.Vagonlar.map(async(data, index) => {
            response.RezervasyonYapilabilir = "true";
            let quantity = data.Kapasite - data.DoluKoltukAdet;
            let YerleşimAyrintiEleman = {"VagonAdi":data.Ad,"KisiSayisi":quantity};
            YerleşimAyrinti.push(YerleşimAyrintiEleman)
        })
    } else {
        response.RezervasyonYapilabilir = "false",
        response.YerleşimAyrinti = YerleşimAyrinti
    }
    response.YerleşimAyrinti=YerleşimAyrinti;
    console.log(response)

});

module.exports = router;