var request = require('request')
  , storesHost = require('./stores-api-config.json').host

module.exports = function (app, options) {
  var logger = options.logger || console;

  //wraps request w/ logging and callback value normalization
  var sendWith = function (options, cb) {
    request(options, function (err, res, data) { 
      logger.log("Request sent to ", options.url);
      if (err) logger.error(err)
      else logger.log(data);
      cb(err, data);
    });
  };

  //CREATE

  //create a new deal based on a big-commerce product
  var createDeal = function (deal, cb) {
    var options = {
      method: "post",
      url: storesHost + "deals",
      json: {deal: deal}
    };
    sendWith(options, cb);
  };

  //create new brand with brand from big commerce api
  var createBrand = function (brand, cb) {
    var options = {
      method: "post",
      url: storesHost + "brands",
      json: {brand: brand}
    };
    sendWith(options, cb);
  };

  //READ

  var getDeals = function (cb) {
    var options = {
      method: "get",
      url: storesHost + "brands/search",
      json: true
    }; 
    sendWith(options, cb);
  };

  var getDeal = function (slug, cb) {
    var options = {
      method: "get",
      url: storesHost + "brands/" + slug,
      json: true
    }; 
    sendWith(options, cb);
  };

  //UPDATE

  /*
  add a groupon brand to an existing groupon deal.  
  NOTE: This must be called after both the brand and deal
  exist inside the store's db
  */
  var addBrandToDeal = function (dealId, brandId, cb) {
    var options = {
      method: "put",
      url: storesHost + "deals/" + dealId + "/brands/" + brandId,
      json: true,
    };
    sendWith(options, cb);
  };

  //add an option to an existing deal
  var addOptionToDeal = function (dealId, option, cb) {
    var options = {
      method: "post",
      url: storesHost + "deals/" + dealId + "/options",
      json: {option: option}
    };
    sendWith(options, cb);
  };

  return {
    createDeal: createDeal,
    createBrand: createBrand,
    getDeals: getDeals,
    getDeal: getDeal,
    addOptionToDeal: addOptionToDeal,
    addBrandToDeal: addBrandToDeal
  };
};
