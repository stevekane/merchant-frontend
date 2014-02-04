var React = require('react')
  , PageComponent = require('./components/Page.jsx');

//string for current route is application state (mutable)
var route = ""

//cached deals available on the frontend
var deals = [];

var updateRoute = function () {
  route = window.location.hash;
};

var tick = function () {
  React.renderComponent(
    <PageComponent route={route} deals={deals} />, 
    document.body
  );
  window.requestAnimationFrame(tick);
};

window.addEventListener("load", updateRoute, false);
window.addEventListener("hashchange", updateRoute, false);
window.requestAnimationFrame(tick);
