var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.get("/", function(req, res, next) {
  async function getNotes() {
    try {
      let res = await db.get(req.query.class);

      return JSON.stringify(res.lectures[req.query.lecture].notes);

    } catch(err){
      console.error(`Error -> ${error}`);
    }
  }

getNotes().then((data) => {
  console.log("Notes sent");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
