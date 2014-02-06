var through = require('through')
  , _ = require('lodash')
  , partial = _.partial
  , bind = _.bind

var AccumulateStream = function (options) {
  var results = ""
    , parsed
    , json;

  return through(
    function (chunk) {
      results += chunk 
    },
    function () {
      try {
        parsed = JSON.parse(results);
      } catch (e) {
        return this.emit("error", e); 
      }
      json = options.key ? parsed[options.key] : parsed;
      this.emit("end", json);
    }
  )
};

module.exports = AccumulateStream;
