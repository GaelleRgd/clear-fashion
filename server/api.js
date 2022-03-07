const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const db = require('./db')
// console.log(db.findProductsByBrand("MONTLIMART"))

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products',  async (request, response) => {
  let montlimart = await db.findProductsByBrand("MONTLIMART")
  let dedicated = await db.findProductsByBrand("DEDICATED")
  let adresseparis = await db.findProductsByBrand("ADRESSEPARIS")
  response.send({"MONTLIMART" : montlimart, 
  "DEDICATED" : dedicated, 
  "ADRESSEPARIS" : adresseparis
})
})

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
