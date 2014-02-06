var React = require('react')
  , Router = require('../modules/route-recognizer').default
  , _ = require('lodash')
  , partial = _.partial
  , map = _.map
  , values = _.values
  , isEqual = _.isEqual
  , BrandlistComponent = require('./Brandlist.jsx')
  , DeallistComponent = require('./Deallist.jsx')
  , returnMatchingHandler = require('../utils').returnMatchingHandler;

var renderNotFound = function (props) {
  return(
    <h2>
      Nothing found matching this route
      <a href="#">Return Home</a>
    </h2>
  );
};

var renderIndex = function (path, args, props) {
  return <h2>You are in the index</h2>;
};

var renderBrands = function (path, args, props) {
  return <BrandlistComponent brands={props.cache.brands} route={props.route}/>;
};

var renderDeals = function (path, args, props) {
  return <DeallistComponent deals={props.cache.deals} />;
};

var renderNewDeal = function (path, args, props) {};

var router = new Router;

router.add([
  {path: "/", handler: renderIndex}
]);

router.add([
  {path: "/brands", handler: renderBrands}
]);

router.add([
  {path: "/brands/:slug", handler: renderBrands}
]);

router.add([
  {path: "/deals", handler: renderDeals}
]);

router.add([
  {path: "/deals/new", handler: renderNewDeal}
]);

var Page = React.createClass({
  render: function () {
    var handler = returnMatchingHandler(router, this.props.route); 

    return(
      <div>
        <h1>Main Template</h1> 
        <a href="#">Home</a>
        <a href="#brands">Brands</a>
        <a href="#deals">Deals</a>
        <a href="#deals/new">New Deal</a>
        { handler ? handler(this.props) : renderNotFound(this.props)}
      </div>
    );
  }
});

module.exports = Page;
