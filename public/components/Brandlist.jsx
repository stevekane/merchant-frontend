var React = require('react')
  , Router = require('../modules/route-recognizer').default
  , _ = require('lodash')
  , map = _.map
  , values = _.values
  , find = _.find
  , BrandDetailComponent = require('./BrandDetail.jsx')
  , returnMatchingHandler = require('../utils').returnMatchingHandler

var renderBrandItem = function (brand, index) {
  return <li><a href={"#brands/" + brand.slug} key={index}>{brand.name}</a></li>;
};

var renderBrand = function (path, args, props) {
  var targetBrand = find(values(props.brands), {slug: args.slug});
  
  return targetBrand ? <BrandDetailComponent brand={targetBrand} /> : null;
};

var router = new Router;

router.add([
  {path: "/brands/:slug", handler: renderBrand}
]);

var Brandlist = React.createClass({
  render: function () {
    var handler = returnMatchingHandler(router, this.props.route);

    return (
      <div>
        { handler ? handler(this.props) : null }
        <ul>{ map(values(this.props.brands), renderBrandItem) }</ul>
      </div>
    );
  }
});

module.exports = Brandlist;
