require('dotenv').config();
const Cloudant = require("@cloudant/cloudant");

const conn = Cloudant({
  url: process.env.URL,
  plugins:{
    iamauth:{
      iamApiKey: process.env.API_KEY
    }
  }
})

const db = conn.db.use("ivy-hacks");

module.exports = { db };
