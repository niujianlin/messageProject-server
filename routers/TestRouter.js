const express = require("express")
const router = express.Router()
// const db = require("../db/DbUtils")
// const user = require('../db/user')

router.get("/test", (req, res) => {
    // db.all("select * from `admin`", [], (err, rows) => {
    //     console.log(rows)
    // })
    // res.send(user);
    res.send("testRouters");
})

module.exports = router