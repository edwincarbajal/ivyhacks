var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.get("/", function(req, res, next) {
  async function getAllClasses() {
    try {


      let res = await db.list({include_docs:true});

      var arr = [];
      for(var i = 0; i < res.rows.length; i++) {
        arr.push({
          id: res.rows[i].doc._id,
          name: res.rows[i].doc.name,
          desc: res.rows[i].doc.description
        });
      }

      return JSON.stringify(arr);

    } catch(err){
      console.error(`Error -> ${error}`);
    }
  }

getAllClasses().then((data) => {
  console.log("Classes Sent");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
