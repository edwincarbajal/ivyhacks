var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.get("/", function(req, res, next) {
  async function getNotes() {
    try {
      let res = await db.get(req.query.class);

      var arr = [res.name, res.description];
      for(var i = 0; i < res.lectures.length; i++) {
        arr.push({
          id: i,
          title: res.lectures[i].title,
          date: res.lectures[i].date
        });
      }
      console.log(arr);
      return JSON.stringify(arr);

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
