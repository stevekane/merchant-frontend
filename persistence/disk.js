var fs = require('fs')
  , _ = require('lodash')
  , extend = _.extend
  , uuid = require('node-uuid')
  , log = './persistence/disk-log.txt';

module.exports = function (app, options) {
  var logger = options.logger || console;

  var writeAndLog = function (data, cb) {
    fs.appendFile(log, JSON.stringify(data, null, 4), function (err) {
      if (err) logger.error(err); 
      else logger.log(data);
      cb(err, data);
    });      
  };

  var createDeal = function (deal, cb) {
    var id = uuid.v4()
    var data = {
      message: "Deal " + id + " created",
      deal: extend(deal, {id: id})
    };
    writeAndLog(data, cb);
  };

  var createBrand = function (brand, cb) {
    var id = uuid.v4()
    var data = {
      message: "Brand " + id + " created",
      brand: extend(brand, {id: id})
    };
    writeAndLog(data, cb); 
  };

  var addBrandToDeal = function (dealId, brandId, cb) {
    var data = {
      message: "Brand " + brandId + " added to " + dealId,
    };
    writeAndLog(data, cb);
  };

  var addOptionToDeal = function (dealId, option, cb) {
    var data = {
      message: "Option " + option.id + " added to " + dealId, 
      option: option
    };
    writeAndLog(data, cb);
  };

  return {
    createDeal: createDeal,
    createBrand: createBrand,
    addOptionToDeal: addOptionToDeal,
    addBrandToDeal: addBrandToDeal
  };
};
