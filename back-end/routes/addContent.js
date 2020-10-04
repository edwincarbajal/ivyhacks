var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.post("/", function(req, res, next) {
  async function updateVote() {
    try {
      let doc = await db.get(req.body.classID);
      var notes = doc.lectures[req.body.lectureID].notes[req.body.noteID];

      var content = req.body.content;

      content = content + " <h2>"; //need this at the end

      var sections = content.match(/(?<=<h2>\s+).*?(?=\s+<\/h2>)/gs);
      var content = content.match(/(?<=<\/h2>\s+).*?(?=\s+<h2>)/gs);

      for(var i = 0; i < sections.length; i++) {
        doc.lectures[req.body.lectureID].notes[req.body.noteID].sections.push(sections[i]);
        doc.lectures[req.body.lectureID].notes[req.body.noteID].content.push(content[i]);
        doc.lectures[req.body.lectureID].notes[req.body.noteID].votes.push(0);
      }

      let res = await db.insert(doc, doc._id);

      return true;

    } catch(err){
      return false;
      console.error(`Error -> ${error}`);
    }
  }

updateVote().then((data) => {
  console.log("Note content updated");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
