// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.burger.findAll({}).then(function(result){
        var hbsObject = {
            burgers: result
        };
        res.render("index", hbsObject);
      });
      });



  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/burgers", function(req, res) {
    db.burger.create({
        burger_name: req.body.burger_name
    }).then(function() {
        res.redirect("/");
    });
  });

  // PUT route for updating burgers. The updated todo will be available in req.body
  app.put("/api/burgers/:id", function(req, res) {
    db.burger.update({
        devoured: req.body.devoured,
    },
    {
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.send(result);
    });
  });

  // DELETE route for deleting burgers. You can access the burgers's id in req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    db.burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.end();
    });
  });
};
