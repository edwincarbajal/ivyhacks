require('dotenv').config();
const Cloudant = require("@cloudant/cloudant");
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const watson = new NaturalLanguageUnderstandingV1({
    version: "2020-08-01",
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY,
    }),
    serviceUrl: process.env.WATSON_URL,
});

const conn = Cloudant({
  url: process.env.URL,
  plugins:{
    iamauth:{
      iamApiKey: process.env.API_KEY
    }
  }
})

const db = conn.db.use("ivy-hacks");

module.exports = { db, watson };
