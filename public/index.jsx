var React = require('react')
  , hyperquest = require('hyperquest')
  , _ = require('lodash')
  , partial = _.partial
  , bind = _.bind
  , AccumulateStream = require('../modules/AccumulateStream')
  , updateCache = require('../modules/mutate-cache').updateCache
  , PageComponent = require('./components/Page.jsx')
  , config = require('./config.json')
  , apiHost = config.api.url

//string for current route is application state (mutable)
var route = ""

//cached data by type (keys are ids)
var cache = {
  brands: {},
  deals: {}
};

var fetchAndUpdateCache = function (url, key, cache) {
  var fetchStream = hyperquest.get(url)
    , accumStream = AccumulateStream({key: key});

  fetchStream 
  .pipe(accumStream);

  accumStream.on("end", partial(updateCache, cache, {}));
  accumStream.on("error", bind(console.log, console));
};

var fetchData = function (host, cache) {
  fetchAndUpdateCache(host+"/deals", "deals", cache.deals);
  fetchAndUpdateCache(host+"/brands", "brands", cache.brands);
};

var updateRoute = function () {
  route = window.location.hash;
};

var Page = React.renderComponent(
  <PageComponent route={route} cache={cache} />, 
  document.body
);

var tick = function () {
  Page.setProps({
    route: route,
    cache: cache
  });
  window.requestAnimationFrame(tick);
};

window.addEventListener("load", updateRoute, false);
window.addEventListener("load", partial(fetchData, apiHost, cache), false);
window.addEventListener("hashchange", updateRoute, false);
window.requestAnimationFrame(tick);
