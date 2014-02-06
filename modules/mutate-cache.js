var _ = require('lodash')
  , isArray = _.isArray
  , indexBy = _.indexBy
  , extend = _.extend

var updateCache = function (cache, options, data) {
  var primaryKey = options.primaryKey || "id";

  if (isArray(data)) extend(cache, indexBy(data, primaryKey));
  else cache[data[primaryKey]] = data;
};

module.exports = {
  updateCache: updateCache
};
