const express = require("express");
const router = express.Router();


router.route("/").get((req,res)=>{
    res.json({Alert:"Payment gateway"})
})


module.exports = router;