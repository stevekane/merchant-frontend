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

var renderIndex = function (path, args, props) {
  return <h2>You are in the index</h2>;
};

var renderBrandTile = function (brand) {
  return <li key={brand.id}>{brand.name}</li>;
};

var renderBrands = function (path, args, props) {
  return <ul>{ map(values(props.brands), renderBrandTile) }</ul>;
};

var renderProducts = function (path, args, props) {};

var renderProduct = function (path, args, props) {};

var renderNewProduct = function (path, args, props) {};

var router = new Router

router.add([
  {path: "/", handler: renderIndex}
]);

router.add([
  {path: "/brands", handler: renderBrands}
]);

router.add([
  {path: "/products", handler: renderProducts}
]);

router.add([
  {path: "/products/new", handler: renderNewProduct}
]);

router.add([
  {path: "/products/:product_id", handler: renderProduct}
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
      <a href="#products">Products</a>
      <a href="#products/new">New Product</a>
      { handler(this.props) }
    </div>
    );
  }
});

module.exports = Page;
