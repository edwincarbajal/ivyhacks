var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.get("/", function(req, res, next) {
  async function getNotes() {
    try {
      let res = await db.get(req.query.class);

      let lecture = res.lectures[req.query.lecture];

      let result = {
        title: lecture.title,
        date: lecture.date,
        course: res.name,
        notes: lecture.notes,
      }
      console.log(result.notes);

      return JSON.stringify(result);

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
