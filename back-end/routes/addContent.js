var express = require("express");
var router = express.Router();
const { db, watson } = require("../db");

function addSpaces(html) {
  let result = [];
  for (let i = html.length - 1; i >= 0; i--) {
    if (html[i] == "<") {
      result.push(html[i]);
      result.push(" ");
    } else if (html[i] == ">") {
      result.push(" ");
      result.push(html[i]);
    } else {
      result.push(html[i]);
    }
  }
  return result.reverse().join("");
}

router.post("/", function (req, res, next) {
  async function addContent() {
    try {
      let doc = await db.get(req.body.classID);
      var notes = doc.lectures[req.body.lectureID].notes[req.body.noteID];

      let reqContent = req.body.content;
      console.log(reqContent);

      let result = addSpaces(reqContent);

      try {
          let watsonResult = await watson.analyze({
              html: reqContent,
              features: {
                  concepts: {
                      limit: 3,
                  },
              },
          });
          watsonResult = watsonResult.result.concepts;
          const tags = watsonResult.map(res => res.text.toLowerCase())
          console.log(tags);
          doc.lectures[req.body.lectureID].notes[req.body.noteID].tags = tags;
      } catch (err) {
        console.log("Watson failed.");
        console.log(err);
      }

      result = result + " <h2>"; //need this at the end
      var sections = result.match(/(?<=<h2>\s+).*?(?=\s+<\/h2>)/gs);
      var content = result.match(/(?<=<\/h2>\s+).*?(?=\s+<h2>)/gs);

      for (var i = 0; i < sections.length; i++) {
        doc.lectures[req.body.lectureID].notes[req.body.noteID].sections.push(
          sections[i]
        );
        doc.lectures[req.body.lectureID].notes[req.body.noteID].content.push(
          content[i]
        );
        doc.lectures[req.body.lectureID].notes[req.body.noteID].votes.push(0);
      }

      let res = await db.insert(doc, doc._id);

      return true;
    } catch (err) {
      return false;
      console.error(`Error -> ${error}`);
    }
  }

  addContent()
    .then((data) => {
      console.log("Note content added");
      res.send(data);
    })
    .catch((err) => {
      res.send("Didnt get data");
    });
});
module.exports = router;
