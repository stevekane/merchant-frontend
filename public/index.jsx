var React = require('react')
  , hyperquest = require('hyperquest')
  , PageComponent = require('./components/Page.jsx');

//string for current route is application state (mutable)
var route = ""

//cached deals available on the frontend
var deals = [];

var fetchData = function () {
  var url = window.location.origin + "/deals"
    , dealStream = hyperquest.get(url)
    , results = "";

  dealStream.on("error", console.log.bind(console));
  dealStream.on("response", function (res) {
    res.on("data", function (chunk) {
      results += chunk;

    });
    res.on("end", function () {
      try {
        deals = JSON.parse(results);
      } catch (e) {
        console.log(e); 
      }
      console.log(deals);
    });
  });
};

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
window.addEventListener("load", fetchData, false);
window.addEventListener("hashchange", updateRoute, false);
window.requestAnimationFrame(tick);
