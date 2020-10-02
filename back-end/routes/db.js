var express = require("express");
var router = express.Router();
require('dotenv').config();
const Cloudant = require("@cloudant/cloudant");

router.get("/", function(req, res, next) {
  //cloudant
  cloudant();
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

      const doc0 = {"id":"canidae:dog", "name":"dog"};
      let res ="";

      res = await db.insert(doc0);

      console.log(`Added doc to db ${res}`);

    } catch(err){
      console.error(`Error -> ${error}`);
    }
  }

res.send("API is working properly")
});

module.exports = router;
