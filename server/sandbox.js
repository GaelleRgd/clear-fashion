/* eslint-disable no-console, no-process-exit */
const fs = require('fs');

const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/montlimart');
const adresseparis = require('./sources/adresseparis');

const dedicatedbrand_url = 'https://www.dedicatedbrand.com/en/men/all-men';
const montlimart_url = 'https://www.montlimart.com/toute-la-collection.html';
const adresseparis_url = 'https://adresse.paris/630-toute-la-collection';

async function sandbox (eshop = dedicatedbrand_url) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log(products.length +" products collected");
    console.log('done');

    var jsonData = JSON.stringify(products);
    fs.writeFileSync("Dedicated_products.json", jsonData, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File written successfully\n");
      }
    });


    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
