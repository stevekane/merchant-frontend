var request = require('request')
  , storesHost = require('./stores-api-config.json').host

module.exports = function (app, options) {
  var logger = options.logger || console;

  //wraps request w/ logging and callback value normalization
  var sendWith = function (method, options, cb) {
    request[method](options, function (err, res, data) { 
      logger.log("Request sent to ", options.url);
      if (err) logger.error(err)
      else logger.log(data);
      cb(err, data);
    });
  };

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
    addOptionToDeal: addOptionToDeal,
    addBrandToDeal: addBrandToDeal
  };
};