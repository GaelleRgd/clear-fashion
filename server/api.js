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
  // Return all the products of the dataset 
  let montlimart = await db.findProductsByBrand("MONTLIMART")
  let dedicated = await db.findProductsByBrand("DEDICATED")
  let adresseparis = await db.findProductsByBrand("ADRESSEPARIS")
  response.send({"MONTLIMART" : montlimart, 
  "DEDICATED" : dedicated, 
  "ADRESSEPARIS" : adresseparis
})
})

app.get('/products/:id', async (request, response) => {
  let product = await db.findProductsByID(request.params.id)
  response.send({"_id":request.params.id, "Product":product})
})

app.get('/products/search', async (request, response) => {
  console.log(request)
  let products = await db.findProductsByBrandAndPrice("MONTLIMART", 60);
  response.send({ 
    "limit" : 12, 
    "total" : products.length, 
    "results" : products
  })
})

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
