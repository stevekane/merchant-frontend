var React = require('react')

var Input = React.createClas({
  getInitialState: function () {
    return {value: ""}; 
  },

  handleChange: function (event) {
    this.setState({value: event.target.value}) 
  },

  render: function () {
    var value = this.state.value;     
    return <input type="text" value={value} onChange={this.handleChange} />
  },
});
