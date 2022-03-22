// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
// let currentProducts = [];
// let currentPagination = {};
// let favProductsID = [];
let selectedBrand = "select"; 
let selectedSort = "select";

let currentProducts = [];
let favorite_list = [];
let currentPagination = {};
currentPagination.currentSize = 12;
currentPagination.currentPage = 1; 
let currentBrand = 'all';
let currentMaxPrice = 10000;
let currentSort = 1;

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select'); 
const selectSort = document.querySelector('#sort-select');
const reasonablePrice = document.querySelector('#reasonable-price');
const recentlyReleased = document.querySelector('#recently-released'); 
const favoriteProducts = document.querySelector('#fav-products');
const resetFilters = document.querySelector('#reset-filters');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts'); 
const p50Indicator = document.querySelector('#p50-indicator');
const p90Indicator = document.querySelector('#p90-indicator');
const p95Indicator = document.querySelector('#p95-indicator');
const lastReleaseIndicator = document.querySelector('#last-release');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (limit = currentPagination.currentSize, brand = currentBrand, price = currentMaxPrice,
  sort = currentSort, page = 1 ) => {
  console.log("Je passe dans le fetchProducts")
  try {
    const response = await fetch(
      // `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
      `https://server-iota-beige.vercel.app/products/search?limit=${limit}&brand=${brand}&price=${price}&sort=${sort}&page=${page}`
    );
    const body = await response.json();
    console.log(body.data)
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


var brandNames = []
const getBrands = async (totalNbProducts) => {
  try {
    const response = await fetch(
      // `https://clear-fashion-api.vercel.app?page=1&size=${totalNbProducts}`
      `https://server-iota-beige.vercel.app/products/search?page=1&limit=${totalNbProducts}`
    );
    const body = await response.json();
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    for(let i = 0; i < body.data.result.length; i++){
      brandNames.push(body.data.result[i].brand)
    }
    brandNames = [ ... new Set(brandNames)] //Transform the array into a set to suppress duplicates 
    return brandNames
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
}
console.log(getBrands(182))

///// Unused
function sortByPriceAsc(table){ //Tri à bulles 
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

function sortByPriceDesc(table){ //Tri à bulles 
  var tab = table.slice();
  var changed;
  do{
    changed = false;
    for(let i = 0; i < tab.length-1; i++){
      if(tab[i].price < tab[i+1].price){
        var tmp = tab[i];
        tab[i] = tab[i+1];
        tab[i+1] = tmp; 
        changed = true; 
      }
    }
  }while(changed);
  return(tab);
}

function sortByDateAsc(table){ //Tri à bulles 
  var tab = table.slice();
  var changed;
  do{
    changed = false;
    for(let i = 0; i < tab.length-1; i++){
      if(tab[i].released < tab[i+1].released){
        var tmp = tab[i];
        tab[i] = tab[i+1];
        tab[i+1] = tmp; 
        changed = true; 
      }
    }
  }while(changed);
  return(tab);
}

function sortByDateDesc(table){ //Tri à bulles 
  var tab = table.slice();
  var changed;
  do{
    changed = false;
    for(let i = 0; i < tab.length-1; i++){
      if(tab[i].released > tab[i+1].released){
        var tmp = tab[i];
        tab[i] = tab[i+1];
        tab[i+1] = tmp; 
        changed = true; 
      }
    }
  }while(changed);
  return(tab);
}
/////

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
  
  // Feature 13 - Save as favorite
  let presentedProducts = document.querySelectorAll('.product');
  let presentedProductsArray = Array.prototype.slice.call(presentedProducts);
  presentedProductsArray.forEach(function(elem){
    elem.addEventListener("click", function(){
      favProductsID.push(elem.id)
      this.style.backgroundColor = "#ff0";
    });
  });
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');
  
  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param {Array} brandNames 
 */
const renderBrandNames = brandNames => {
  var options = `<option value="select">Select</option>` //We use a default selection for when no brand is selected
  options += Array.from(
    brandNames, 
    (value, index) => `<option value="${value}">${value}</option>`
  ).join('');
  selectBrand.innerHTML = options;
  selectBrand.selectedIndex = brandNames.indexOf(selectedBrand)+1; //We display the selected brand in the selector
}
/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = async () => {
    // Feature 9 - Number of recent products indicator
  // Feature 11 - Last released date indicator
  let countNew = 0;
  let mostRecentDate = new Date("2020-01-01");
  let twoWeeksAgo = new Date(Date.now() - 12096e5);
  const products = await fetchProducts(100000); 
  const productsTab = products.result;
  const count = productsTab.length;
  console.log(productsTab)
  products.result.forEach(elmt => {
    let d = new Date(elmt.released)
    if(d.getTime() > twoWeeksAgo.getTime()){ countNew = countNew + 1 }
    if(d.getTime() > mostRecentDate){ mostRecentDate = d }
  })
  spanNbProducts.innerHTML = count;
  spanNbNewProducts.innerHTML = countNew; 
  lastReleaseIndicator.innerHTML = mostRecentDate.toLocaleDateString(); 
  
  // Feature 10 - p50, p90 and p95 price value indicator
  p50Indicator.innerHTML = productsTab[Math.round(count*0.5)].price;
  p90Indicator.innerHTML = productsTab[Math.round(count*0.9)].price;
  p95Indicator.innerHTML = productsTab[Math.round(count*0.95)].price;
};

const render = (products) => {
  renderProducts(products);
  // renderPagination(pagination);
  renderBrandNames(brandNames);
  renderIndicators();
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
// selectShow.addEventListener('change', async (event) => {
//   console.log("Je passe dans l'event listener selectShow")
//   const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));
//   setCurrentProducts(products);
//   render(currentProducts, currentPagination);
// });
selectShow.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value))
      .then((result) => {
        setCurrentProducts({result : result.result, meta : result.meta})
        render(currentProducts, currentPagination)
      }); //, pagination
});

// Feature 1 - Browse pages
selectPage.addEventListener('change', event => {
  fetchProducts(pageparseInt(event.target.value))
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));  
}); 

// Feature 2 - Filter by brands
selectBrand.addEventListener('change', event => {
  let selectedBrand = event.target.value
  if(event.target.value == "select"){selectedBrand = "all"}
  fetchProducts(12, event.target.value).then((result) => { 
    setCurrentProducts({result : result.result, meta : result.meta}); //Reset the page data
    render(currentProducts, currentPagination); //Render the page with the new data
  })
})

// Feature 3 - Filter by recent products 
recentlyReleased.addEventListener('click', () =>{
  let selectedProducts = []
  let twoWeeksAgo = new Date(Date.now() - 12096e5); //12096e5 is two weeks in miliseconds
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize).then((result) => { //We fetch the initial page so that the selection could be change later on without going back manually to the initial page
    for(let i = 0; i < result.result.length; i++){ //Go throught the products of the initial page
      let d = new Date(result.result[i].released)
      if(d.getTime() > twoWeeksAgo.getTime()){ selectedProducts.push(result.result[i]) }
    }
    setCurrentProducts({result : selectedProducts, meta : result.meta}); //Reset the page data
    render(currentProducts, currentPagination); //Render the page with the new data
  })
})

// Feature 4 - Filter by reasonable price 
reasonablePrice.addEventListener('click', () => {
  let selectedProducts = []
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize).then((result) => { //We fetch the initial page so that the selection could be change later on without going back manually to the initial page
    for(let i = 0; i < result.result.length; i++){ //Go throught the products of the initial page
      if(result.result[i].price <= 50){ selectedProducts.push(result.result[i]) }
    }
    setCurrentProducts({result : selectedProducts, meta : result.meta}); //Reset the page data
    render(currentProducts, currentPagination); //Render the page with the new data
  })
})

// Feature 14 - Filter by favorite
favoriteProducts.addEventListener('click', async () => {
  let favProducts = [];
  const products = await fetchProducts(1, 139); 
  products.result.forEach(elmt => {
    if(favProductsID.includes(elmt.uuid)){ favProducts.push(elmt) }
  })
  setCurrentProducts({result : favProducts, meta : products.meta}); //Reset the page data
  render(currentProducts, currentPagination); //Render the page with the new data
})

resetFilters.addEventListener('click', async () => {
  selectBrand.selectedIndex = "select"
  selectSort.selectedIndex = "select"
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
})

selectSort.addEventListener('change', event => {
  let selectedProducts = []
  let selectedMeta = {}
  selectedSort = event.target.value;
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize).then((result) => { //We fetch the initial page so that the selection could be change later on without going back manually to the initial page
    selectedMeta = result.meta //Get the metadata of the current page
    if(selectedSort == "select"){ //If the user wants to supress the brand selection
      setCurrentProducts({result : result.result, meta : selectedMeta});
      render(currentProducts,currentPagination);
    }
    else{
      if(selectedSort == "date-asc"){
        selectedProducts = sortByDateAsc(result.result)
      }
      if(selectedSort == "date-desc"){
        selectedProducts = sortByDateDesc(result.result)
      }
      if(selectedSort == "price-asc"){ // Feature 5 - Sort by price (ascending)
        selectedProducts = sortByPriceAsc(result.result)
      }
      if(selectedSort == "price-desc"){
        selectedProducts = sortByPriceDesc(result.result)
      }
      setCurrentProducts({result : selectedProducts, meta : selectedMeta}); //Reset the page data
      render(currentProducts, currentPagination); //Render the page with the new data
    }
  })

})

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Je passe dans le dom event listener")
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
