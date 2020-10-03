var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.get("/", function(req, res, next) {
  async function getNotes() {
    try {
      let res = await db.get(req.query.class);

      var arr = [];
      for(var i = 0; i < res.lectures.length; i++) {
        arr.push({
          id: i,
          title: res.lectures[i].title,
          date: res.lectures[i].date
        });
      }

      let result = {
        name: res.name,
        desc: res.description,
        lectures: arr
      }

      return JSON.stringify(result);

    } catch(err){
      console.error(`Error -> ${error}`);
    }
  }

getNotes().then((data) => {
  console.log("Lectures sent");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
