var React = require('react')
  , Router = require('../modules/route-recognizer').default
  , _ = require('lodash')
  , partial = _.partial
  , map = _.map
  , values = _.values
  , isEqual = _.isEqual

var renderNotFound = function (path, props) {
  return <h2>Nothing found matching this route</h2>;
};

var renderBrandTile = function (brand) {
  return <li key={brand.id}>{brand.name}</li>;
};

var renderDealTile = function (deal) {
  return <li key={deal.id}>{deal.title}</li>;
};

var renderIndex = function (path, args, props) {
  return <h2>You are in the index</h2>;
};

var renderBrands = function (path, args, props) {
  return <ul>{ map(values(props.cache.brands), renderBrandTile) }</ul>;
};

var renderDeals = function (path, args, props) {
  return <ul>{ map(values(props.cache.deals), renderDealTile) }</ul>;
};

var renderDeal = function (path, args, props) {};

var renderNewDeal = function (path, args, props) {};

var router = new Router

router.add([
  {path: "/", handler: renderIndex}
]);

router.add([
  {path: "/brands", handler: renderBrands}
]);

router.add([
  {path: "/deals", handler: renderDeals}
]);

router.add([
  {path: "/deals/new", handler: renderNewDeal}
]);

router.add([
  {path: "/deals/:deal_id", handler: renderDeal}
]);


var returnMatchingHandler = function (path) {
  var matches = router.recognize(path.replace("#", ""));

  return matches
    ? partial(matches[0].handler, path, matches[0].params)
    : partial(renderNotFound, path);
};


var Page = React.createClass({
  render: function () {
    var handler = returnMatchingHandler(this.props.route); 

    return(
    <div>
      <h1>Main Template</h1> 
      <a href="#">Home</a>
      <a href="#brands">Brands</a>
      <a href="#deals">Deals</a>
      <a href="#deals/new">New Deal</a>
      { handler(this.props) }
    </div>
    );
  }
});

module.exports = Page;
