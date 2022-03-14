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
  let page = 1
  if(request.query.page != undefined){page = request.query.page}

  let size = 12 
  if(request.query.size != undefined){size = request.query.size}

  let allProducts = await db.findAllProducts()
  let products = allProducts.slice((page-1)*size, page*size)

  response.send({"success":true,
    "data": {"result" : products,
      "meta" : {"currentPage":page,"pageCount":products.length,"pageSize":size,"count":allProducts.length}}}
    /*
    {"MONTLIMART" : montlimart, 
  "DEDICATED" : dedicated, 
  "ADRESSEPARIS" : adresseparis*/
)
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
