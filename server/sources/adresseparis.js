const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list .product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseFloat(
        $(element)
          .find('.product-price')
          .text()
      );
      const date = new Date();
      return {"brand":"ADRESSEPARIS", name, price, date};
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
    let response = await fetch(url);
    let body = "";
    if (response.ok) {
      body = await response.text();
    }
    response = await fetch(url + '?p=2')
    if (response.ok) {
      body = body + await response.text();
    }
    return parse(body);
    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
