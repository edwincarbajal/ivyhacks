var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.post("/", function(req, res, next) {
  async function addLecture() {
    try {

      let doc = await db.get(req.body.classID);

      const newLec = {
        "title": req.body.lecTitle,
        "date": req.body.lecDate,
        "notes": []
      };

      doc.lectures.push(newLec);

      let res = await db.insert(doc, doc._id);

      return true;

    } catch(err){
      return false;
      console.error(`Error -> ${error}`);
    }
  }

addLecture().then((data) => {
  console.log("Lecture added");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
