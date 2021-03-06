var _ = require('lodash')
  , async = require('async')
  , partial = _.partial
  , pluck = _.pluck
  , configurePersistence = require('../persistence/stores-api')

//index route handlers
var respondToIndex = function (options, req, res) {
  res.json(200, {message: "things are looking pretty good"}); 
};

var getBrands = function (options, req, res) {
  options.persistence.getBrands().pipe(res);
};

var getBrand = function (options, req, res) {
  var slug = req.params.slug || "";
  options.persistence.getBrand(slug).pipe(res);
};

var getDeals = function (options, req, res) {
  options.persistence.getDeals().pipe(res);
};

var getDeal = function (options, req, res) {
  var slug = req.params.slug || "";
  options.persistence.getDeal(slug).pipe(res);
};

var createDeal = function (options, req, res) {
  var deal = req.body || {};
  options.persistence.createDeal(deal).pipe(res);
};

var createBrand = function (options, req, res) {
  var brand = req.body || {};
  options.persistence.createBrand(brand).pipe(res);
};

/*
 * API we are calling against has addOptionToDeal and addBrandToDeal
 * Therefore, we need to inspect the passed in properties and build
 * up an array of possible async calls to make
 *
 * Format of input would be like the folowing:
 * {
 *   brand: id,
 *   options: [{}, {}, {}...]
 *   ... (other parameters)
 * }
*/
var updateDeal = function (options, req, res) {
  var dealId = req.params.dealId
    , properties = req.body || {}
    , addOption = partial(options.persistence.addOptionToDeal, dealId)
    , addBrand = partial(options.persistence.addBrandToDeal, dealId)
    , updates = []

  if (properties.brand) {
    updates.push(partial(addBrand, properties.brand));
  }
  if (properties.options) {
    updates.push(partial(async.map, properties.options, addOption));
  }

  async.parallel(updates, function (err, updates) {
    if (err) res.json(400, {message: err});
    else res.send(200, {updates: updates});
  });
};

module.exports = function (app, options) {
  var persistence = configurePersistence(app, options);
  var routeOptions = {
    logger: options.logger || console,
    persistence: persistence
  };

  app.get("/", partial(respondToIndex, routeOptions));
  app.post("/deals", partial(createDeal, routeOptions));
  app.get("/brands", partial(getBrands, routeOptions));
  app.get("/brands/:slug", partial(getBrand, routeOptions));
  app.get("/deals", partial(getDeals, routeOptions));
  app.get("/deals/:slug", partial(getDeal, routeOptions));
  app.post("/brands", partial(createBrand, routeOptions));
  app.put("/deals/:dealId", partial(updateDeal, routeOptions));
};
