var _ = require('lodash')
  , partial = _.partial;

var returnMatchingHandler = function (router, path) {
  var matches = router.recognize(path);

  return matches
    ? partial(matches[0].handler, path, matches[0].params)
    : null;
};

module.exports = {
  returnMatchingHandler: returnMatchingHandler
};
