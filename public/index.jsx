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

//cached brands available on the frontend
var brands = {};

//mutate the cache
var fetchBrands = function (host, brands) {
  var url = host + "/brands"
    , brandStream = hyperquest.get(url)
    , accumStream = AccumulateStream({key: "brands"});

  brandStream
  .pipe(accumStream);

  accumStream.on("end", partial(updateCache, brands, {}));
  accumStream.on("error", bind(console.log, console));
};

var updateRoute = function () {
  route = window.location.hash;
};

var Page = React.renderComponent(
  <PageComponent route={route} brands={brands} />, 
  document.body
);

var tick = function () {
  Page.setProps({
    route: route,
    brands: brands 
  });
  window.requestAnimationFrame(tick);
};

window.addEventListener("load", updateRoute, false);
window.addEventListener("load", partial(fetchBrands, apiHost, brands), false);
window.addEventListener("hashchange", updateRoute, false);
window.requestAnimationFrame(tick);
