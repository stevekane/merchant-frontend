var React = require('react')
  , Router = require('../modules/route-recognizer').default
  , _ = require('lodash')
  , partial = _.partial
  , isEqual = _.isEqual

var renderNotFound = function (path, props) {
  return <h2>Nothing found matching this route</h2>;
};

var renderIndex = function (path, args, props) {
  return <h2>You are in the index</h2>;
};

var renderDeals = function (path, args, props) {
  return <h2>You are looking at all deals.</h2>;
};

var renderBrands = function (path, args, props) {
  return <h2>You are looking at all brands.</h2>;
};

var router = new Router

router.add([
  {path: "/", handler: renderIndex },
]);

router.add([
  {path: "/brands", handler: renderBrands },
]);

router.add([
  {path: "/deals", handler: renderDeals }
]);

var returnMatchingHandler = function (path) {
  var matches = router.recognize(path.replace("#", ""));

  return matches
    ? partial(matches[0].handler, path, matches[0].params)
    : partial(renderNotFound, path);
};


var Page = React.createClass({
  shouldComponentUpdate: function (nextProps) {
    return !isEqual(nextProps, this.props);
  },

  render: function () {
    var handler = returnMatchingHandler(this.props.route); 

    return(
      <div>
        <h1>Main Template</h1> 
        <a href="#">Home</a>
        <a href="#brands">Brands</a>
        <a href="#deals">Deals</a>
        { handler(this.props) }
      </div>
    );
  }
});

module.exports = Page;
