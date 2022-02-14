const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://gaelle:0000@cluster0.s0fw2.mongodb.net/clearfashion?retryWrites=true&w=majority'
const db_name = 'clearfashion'
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const Montlimart_products = require('./Montlimart_products.json')
const AdresseParis_products = require('./AdresseParis_products.json')
const Dedicated_products = require('./Dedicated_products.json')

const all_products = [Montlimart_products, AdresseParis_products, Dedicated_products]

async function insertProductsInDataBase(){
    try{
        // Connection to the data base
        const client = await MongoClient.connect(url, connectionParams);
        console.log('Connected to database')
        const db = client.db(db_name)
        
        //Insert the products into the database
        for(let i = 0; i < all_products.length; i++){
            const collection = db.collection('products');
            const result = collection.insertMany(all_products[i]);
        }

    } catch(err) {
        console.error(`Error connecting to the database. \n${err}`);
    }
}

async function findProductsByBrand(brand){
    // Connection to the data base
    const client = await MongoClient.connect(url, connectionParams);
    console.log('Connected to database')
    const db = client.db(db_name)

    // Get requested products 
    const collection = db.collection('products');
    const products = await collection.find({brand}).toArray();
  
    console.log(products);
}

//insertProductsInDataBase()
findProductsByBrand("MONTLIMART")