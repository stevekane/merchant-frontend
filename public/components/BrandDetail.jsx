var React = require('react');

var BrandDetail = React.createClass({
  render: function () {
    var brand = this.props.brand;

    return (
      <div>
        <p>UUID: {brand.uuid}</p>
        <p>Name: {brand.name}</p>
        <p>Slug: {brand.slug}</p>
        <p>State: {brand.state}</p>
        <p>CreatedAt: {brand["created_at"]}</p>
        <p>UpdatedAt: {brand["updated_at"]}</p>
      </div>  
    );
  } 
});

module.exports = BrandDetail;
