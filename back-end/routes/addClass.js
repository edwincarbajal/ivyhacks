var express = require("express");
var router = express.Router();
const { db } = require('../db');

router.post("/", function(req, res, next) {
  async function addClass() {
    try {
      const newDoc = {
        "_id": req.body.classID,
        "name": req.body.className,
        "description": req.body.classDesc,
        "lectures": []
      };

      let res = await db.insert(newDoc);
      return true;

    } catch(err){
      return false;
      console.error(`Error -> ${error}`);
    }
  }

addClass().then((data) => {
  console.log("Class added");
  res.send(data);
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
