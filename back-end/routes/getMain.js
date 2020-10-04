var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.get("/", function(req, res, next) {
  async function getMain() {
    try {
      let doc = await db.get(req.query.classID); //req.query.classID

      let lec = doc.lectures[req.query.lectureID];  // req.query.lectureID

      let notes = lec.notes;

      var votes = [];

      for(var i = 0; i < notes.length; i++) {
        votes.push(notes[i].votes);
      }

      var maxIDX = []; //idx of the sections with most votes

      for(var j = 0; j < votes[0].length; j++) {
        var maxNumb = votes[0][j];
        var tmpIDX = 0;

        for(var i = 0; i < votes.length; i++) {
          if(votes[i][j] > maxNumb) {
            maxNumb = votes[i][j];
            tmpIDX = i;
          }
        }
        maxIDX.push(tmpIDX);
      }

      var sections = [];
      var content = [];
      var authors = [];

      for(var i = 0; i < maxIDX.length; i++) {
        sections.push(notes[maxIDX[i]].sections[i]);
        content.push(notes[maxIDX[i]].content[i]);
        authors.push(notes[maxIDX[i]].author);
      }

      let result = {
        class: req.query.classID,
        lecture: req.query.lectureID,
        title: lec.title,
        sections: sections,
        content: content,
        authors: authors
      }

      return JSON.stringify(result);

    } catch(err){
      console.error(`Error -> ${error}`);
    }
  }

getMain().then((data) => {
  console.log("Main note sent");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
