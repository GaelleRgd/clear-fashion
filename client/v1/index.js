// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var cheapestTeeShirt = 'https://adresse.paris/t-shirts-et-polos/4238-t-shirt-ranelagh-1300000262026.html';
console.log(cheapestTeeShirt);



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var nbProducts = marketplace.length; 
console.log(nbProducts);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brandNames = [] // Create the variable
for(let i = 0; i < marketplace.length; i++){
  brandNames.push(marketplace[i].brand)
}
brandNames = [ ... new Set(brandNames)] //Transform the array into a set to suppress duplicates
console.log(brandNames)
console.log(brandNames.length)


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
function sortByPrice(table){ //Tri à bulles 
  var tab = table.slice();
  var changed;
  do{
    changed = false;
    for(let i = 0; i < tab.length-1; i++){
      if(tab[i].price > tab[i+1].price){
        var tmp = tab[i];
        tab[i] = tab[i+1];
        tab[i+1] = tmp; 
        changed = true; 
      }
    }
  }while(changed);
  return(tab);
}
var sortedMarketplace = sortByPrice(marketplace);
console.log(sortedMarketplace);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function sortByDate(table){ //Tri à bulles 
  var tab = table.slice();
  var changed;
  do{
    changed = false;
    for(let i = 0; i < tab.length-1; i++){
      if(tab[i].date > tab[i+1].date){
        var tmp = tab[i];
        tab[i] = tab[i+1];
        tab[i+1] = tmp; 
        changed = true; 
      }
    }
  }while(changed);
  return(tab);
}
var sortedByDateMarketplace = sortByDate(marketplace);
console.log(sortedByDateMarketplace);


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

var filteredMarketplace = [];
let i = 0;
do{
  i = i + 1; 
}while(sortedMarketplace[i].price<50)
do{
  filteredMarketplace.push(sortedMarketplace[i]);
  i = i + 1;
}while(sortedMarketplace[i].price<100)
console.log(filteredMarketplace);

// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

let sum = 0;
for(let i = 0; i < marketplace.length; i++){
  sum = sum + marketplace[i].price; 
}
console.log(sum / marketplace.length);



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

const brands = {};
for(let i = 0; i < brandNames.length; i++){
  brands[brandNames[i]] = []; 
}
for(let j = 0; j < marketplace.length; j++){
  brands[marketplace[j].brand].push(marketplace[j]);
}
console.log(brands);

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

for(let i = 0; i < brandNames.length; i++){
  brands[brandNames[i]] = sortByPrice(brands[brandNames[i]]);
}
console.log(brands);


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

for(let i = 0; i < brandNames.length; i++){
  brands[brandNames[i]] = sortByDate(brands[brandNames[i]]);
}
console.log(brands);


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

for(let i = 0; i < brandNames.length; i++){
  let nbOfElementsInPercentile90 = Math.round(brands[brandNames[i]].length*0.1);
  let p90 = brands[brandNames[i]][nbOfElementsInPercentile90].price; 
  console.log(brandNames[i] + " : " + p90);
}


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
let twoWeeksAgo = new Date(Date.now() - 12096e5); //12096e5 is two weeks in miliseconds
let newProducts = true;
for(let i = 0; i < COTELE_PARIS.length; i++){
  let d = new Date(COTELE_PARIS[i].released); 
  if(d.getTime() < twoWeeksAgo.getTime()){newProducts = false}
}
console.log("New products only : " + newProducts);


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

let reasonablePrice = true;
for(let i = 0; i < COTELE_PARIS.length; i++){
  if(COTELE_PARIS[i].price > 100){reasonablePrice = false}
}
console.log("Reasonable price : " + reasonablePrice);

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

let specificProduct = "";
for(let i = 0; i < COTELE_PARIS.length; i++){
  if(COTELE_PARIS[i].uuid == `b56c6d88-749a-5b4c-b571-e5b5c6483131`) {specificProduct = COTELE_PARIS[i]}
}
console.log(specificProduct);

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

for(let i = 0; i < COTELE_PARIS.length; i++){
  if(COTELE_PARIS[i].uuid == `b56c6d88-749a-5b4c-b571-e5b5c6483131`) {COTELE_PARIS.splice(i,1)}
}
console.log(COTELE_PARIS);


// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables

console.log(blueJacket);
console.log(jacket);

// 2. What do you notice?
//Both objects have a "favorite" attribute now. 

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = JSON.parse(JSON.stringify(blueJacket));; 
jacket.favorite = true; 
console.log(blueJacket);
console.log(jacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage

const jsonMY_FAVORITE_BRANDS = JSON.stringify(MY_FAVORITE_BRANDS); // convert the object into a json string
localStorage.setItem("favBrands", jsonMY_FAVORITE_BRANDS); // save to localStorage

// 2. log the localStorage
const str = localStorage.getItem("favBrands"); // get the string from local storage
const parsedObj = JSON.parse(str); // convert string to valid object4
console.log(parsedObj);