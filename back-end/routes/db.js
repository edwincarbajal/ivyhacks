var express = require("express");
var router = express.Router();
require('dotenv').config();
const Cloudant = require("@cloudant/cloudant");

router.get("/", function(req, res, next) {
  //cloudant

  async function cloudant() {
    console.log("cloudant tutorial");
    try {
      console.log("Creating cloudant connection...");
      const cloudant = Cloudant({
        url: process.env.URL,
        plugins:{
          iamauth:{
            iamApiKey: process.env.API_KEY
          }
        }
      })
      console.log("Created cloudant connection...");

      console.log("Getting cloudant dbs");
      let allDBS = await cloudant.db.list();
      console.log(`Cloudant dbs [${allDBS}]`);

      console.log("Setting the db that we are going to use!");
      const db = cloudant.db.use("ivy-hacks");

      const doc0 = {"_id":"class:323",
        "name": "Algorithms",
        "lectures":[
          [
            {"author":"Jairo", "sections":["title 1", "title2"], "texts":["text 1", "text 2"]},
            {"author":"Raymond", "sections":["title 1", "title2"], "texts":["text 1", "text 2"]}
          ],
          [
            {"author":"Edwin", "sections":["title 1", "title2"], "texts":["text 1", "text 2"]},
            {"author":"Jinay", "sections":["title 1", "title2"], "texts":["text 1", "text 2"]}
          ]
        ]
      };
      let res ="";

      // res = await db.insert(doc0);
      // console.log(`Added doc to db`);
      // console.log(res);

      console.log("Get doc from db");
      res = await db.get(doc0._id);
      console.log(res.lectures[0][1].author);
      return res.lectures[0][1].author;

    } catch(err){
      console.error(`Error -> ${error}`);
    }
  }
cloudant().then((data) => {
  res.send(data);//work
}).catch((err) => {
  res.send("Didnt get data");
});


});

module.exports = router;
