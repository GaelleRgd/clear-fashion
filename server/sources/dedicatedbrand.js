const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseFloat(
        $(element)
          .find('.productList-price')
          .text()
      );
      const date = new Date()
      /*
      const link = $(element)
        .find('a.productList-link')  
      const image = $(element)
      .find('.productList-image')
      console.log(image)*/

      return {"brand":"DEDICATED", name, price, date};
    })
    .get();
}; 

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    let body = "";

    // Fetch the first page
    let response = await fetch(url);
    if (response.ok) {
      body = await response.text();
    }
/*
    // Fetch the following pages to get all the products
    for(let i = 2; i < 11; i++){
      response = await fetch(url + "#page=" + i);
      if (response.ok) {
        body = body + await response.text();
      }
    }
    */
    return parse(body);
    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
