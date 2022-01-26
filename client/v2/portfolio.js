// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select'); 
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  console.log('Set Current Products')
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  console.log('Fetch Products')
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    console.log(body.data)

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var brandNames = []
const getBrands = async (totalNbProducts) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=1&size=${totalNbProducts}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    console.log(body.data)

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

pause(1000) //We need to wait because of the asynchronus functions.
console.log(getBrands(139))

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
      <div class="product" id=${product.uuid}>
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
  var options = `<option value="select">select</option>` //We use a default selection for when no brand is selected
  options += Array.from(
    brandNames, 
    (value, index) => `<option value="${value}">${value}</option>`
  ).join('');
  selectBrand.innerHTML = options;
}
/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderBrandNames(brandNames);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

// Feature 1 - Browse pages
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination)); 
}); 

// Feature 2 - Filter by brands
selectBrand.addEventListener('change', event => {
  var selectedProducts = []
  var selectedMeta = {}
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize).then((result) => { //We fetch the initial page so that the selection could be change later on without going back manually to the initial page
    selectedMeta = result.meta //Get the metadata of the current page
    for(let i = 0; i < result.result.length; i++){ //Go throught the products of the initial page
      if(result.result[i].brand == event.target.value){ //If a product is from the selected brand ...
        selectedProducts.push(result.result[i]) //... Add it to the list of products that will be displayed
      }
    }
    setCurrentProducts({result : selectedProducts, meta : selectedMeta}); //Reset the page data
    render(currentProducts, currentPagination); //Render the page with the new data
  })
})


document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  console.log(products)
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
