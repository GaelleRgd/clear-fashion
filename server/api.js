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
app.get('/products/search', async (request, response) => {
  console.log(request.query)

  let limit = 12 
  if(request.query.limit != undefined){limit = request.query.limit}

  let brand = "all"
  if(request.query.brand != undefined){brand = request.query.brand}

  let price = 10000
  if(request.query.price != undefined){price = parseFloat(request.query.price)}

  let products = await db.findProductsByBrandAndPrice(brand, price);
  response.send({ 
    "limit" : limit, 
    "total" : products.length, 
    "results" : products.slice(0, limit)
  })
})

app.get('/products/:id', async (request, response) => {
  let product = await db.findProductsByID(request.params.id)
  response.send({"_id":request.params.id, "product":product})
})



app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
