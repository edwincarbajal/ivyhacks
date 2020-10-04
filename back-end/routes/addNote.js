var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.post("/", function(req, res, next) {
  async function adddNote() {
    try {

      let doc = await db.get(req.body.classID);

      const newNote = {
        "author": req.body.author,
        "sections": [],
        "content": [],
        "votes":[],
        "tags": []
      };

      doc.lectures[req.body.lectureID].notes.push(newNote);

      let res = await db.insert(doc, doc._id);

      return true;

    } catch(err){
      return false;
      console.error(`Error -> ${error}`);
    }
  }

adddNote().then((data) => {
  console.log("Note added");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
