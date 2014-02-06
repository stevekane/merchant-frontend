var React = require('react')
  , _ = require('lodash')
  , map = _.map
  , values = _.values

var renderDealTile = function (deal, index) {
  return <li key={index}>{deal.title}</li>;
};

var Deallist = React.createClass({
  render: function () {
    return <ul>{ map(values(this.props.deals), renderDealTile) }</ul>;
  }
});

module.exports = Deallist;
