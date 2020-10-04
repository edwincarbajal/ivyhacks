var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.post("/", function(req, res, next) {
  async function updateVote() {
    try {
      let doc = await db.get(req.body.classID);
      var votes = doc.lectures[req.body.lectureID].notes[req.body.sectionID].votes[req.body.type];

      if(req.body.type == -1) { //downvote
        if(votes == 0) {
          return false;
        } else {
          doc.lectures[req.body.lectureID].notes[req.body.sectionID].votes[req.body.type]--;
        }
      } else if (req.body.type == 1) { //upvote
        doc.lectures[req.body.lectureID].notes[req.body.sectionID].votes[req.body.type]++;
      }

      let res = await db.insert(doc, doc._id);

      return true;

    } catch(err){
      return false;
      console.error(`Error -> ${error}`);
    }
  }

updateVote().then((data) => {
  console.log("Vote updated");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
