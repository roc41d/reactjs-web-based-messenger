const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {
    const params = req.body;
    
    console.log("Loginparams", params);

    res.status(200).send({ response: params });
});

module.exports = router;