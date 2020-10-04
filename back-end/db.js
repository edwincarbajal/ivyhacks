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

const analyzeParams = {
  'text': 'Have you been through airport security lately? If you have, you’ve probably noticed that it’s carefully designed to let some things in (such as passengers with tickets) and to keep others out (such as weapons, explosives, and bottled water). Flight attendants, captains, and airport personnel travel through quickly via a special channel, while regular passengers pass through more slowly, sometimes with a long wait in line. In many ways, airport security is a lot like the plasma membrane of a cell. Cell membranes are selectively permeable, regulating which substances can pass through, as well as how much of each substance can enter or exit at a given time. Selective permeability is essential to cells’ ability to obtain nutrients, eliminate wastes, and maintain a stable interior environment different than that of the surroundings (maintain homeostasis). The simplest forms of transport across a membrane are passive. Passive transport does not require the cell to expend any energy and involves a substance diffusing down its concentration gradient across a membrane. A concentration gradient is a just a region of space over which the concentration of a substance changes, and substances will naturally move down their gradients, from an area of higher to an area of lower concentration. In cells, some molecules can move down their concentration gradients by crossing the lipid portion of the membrane directly, while others must pass through membrane proteins in a process called facilitated diffusion. Here, we’ll look in more detail at membrane permeability and different modes of passive transport.',
  'features': {
    'concepts': {
      'limit': 3
    }
  }
};

watson.analyze(analyzeParams).then(results => {
  console.log(results.result.concepts);
}).catch(err => console.log(err));

module.exports = { db, watson };
