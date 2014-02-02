var express = require("express")
  , _ = require("lodash")
  , config = require("./config.json")
  , configureRoutes = require("./routes/configureRoutes")
  , app = express()
  , port = config.server.port || 1234

/*
options object contains modules to be determined at run-time
examples include database choice, auth system, etc
*/
var options = {};

app
  .use(express.methodOverride())
  .use(express.cookieParser())
  .use(express.cookieSession({
    secret: config.server.session.secret 
  }))
  .use(express.logger())
  .use(express.urlencoded())
  .use(express.json())

/*
here we are creating route handlers by passing in run-time
dependencies to our routes.  This prevents us from recreating
closures for every request when underlying modules are not changing
*/
configureRoutes(app, options);

app.listen(port, function () {
  console.log("your server is listening on port", port); 
});
