const cors = require('cors');
const { query } = require('express');
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
  response.send({
    'ack': true, 
    '/products': "No params",
    '/products/search': "limit, brand, price, sort, page"
  }); 
});

app.get('/products',  async (request, response) => {
  let page = 1
  if(request.query.page != undefined){page = request.query.page}

  let size = 12 
  if(request.query.size != undefined){size = request.query.size}

  let allProducts = await db.findAllProducts()
  let products = allProducts.slice((page-1)*size, page*size)

  response.send({
    "success":true,
    "data": {
      "result" : products,
      "meta" : {"currentPage":page,"pageCount":products.length,"pageSize":size,"count":allProducts.length}}}
)})

app.get('/products/search', async (request, response) => {
  // Define parameters 
  let limit = 12 // Maximal number of products by page
  if(request.query.limit != undefined){limit = parseInt(request.query.limit)}
  let brand = "all" // Brand of the products on the page
  if(request.query.brand != undefined){brand = request.query.brand}
  let price = 10000 // Maximal price of the products on the page
  if(request.query.price != undefined){price = parseFloat(request.query.price)}
  let sort = 1 // Products will be sort by ascending (-1) or descending order (1)
  if(request.query.sort != undefined){sort = parseInt(request.query.sort)}
  let page = 1 // Page number 
  if(request.query.page != undefined){page = parseInt(request.query.page)}
  let start = limit*(page-1)
  let end = limit*page

  let allProducts = await db.findAllProducts()

  // Choose the query to db 
  let db_query = {}
  if(brand == "all"){db_query = [{$match : {"price" : {$lt: price}}},
                                {$sort : {"price" : sort}}]}
  else {db_query = [{$match : {"brand" : brand, "price" : {$lt: price}}},
                    {$sort : {"price" : sort}}]}

  // Request the database
  let products = await db.findProductsByQuery(db_query);

  // Send the response 
  response.send({ 
    "success" : true,
    "data" : {
      "limit" : limit, 
      "page" : page,
      "total" : products.length, 
      "result" : products.slice(start, end),
      "meta" : {"currentPage":page, "currentSize":limit, "pageCount":products.length, "count": allProducts.length}
    }
  })
}) 

app.get('/products/:id', async (request, response) => {
  let product = await db.findProductsByID(request.params.id)
  response.send({"_id":request.params.id, "product":product})
})

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
