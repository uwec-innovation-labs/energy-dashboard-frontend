module.exports = app => {
  var dataController = require("./dataController");

  app
    .route("/request")
    .get(dataController.getData);
};
