const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const pages = require("../controllers/page.controller.js");

module.exports = app => {
    var router = require("express").Router();
  
    // Create a new page
    router.post("/",[authJwt.verifyToken], pages.create);
  
    // Retrieve all pages
    router.get("/", [authJwt.verifyToken], pages.findAll);
  
    // Retrieve all published pages
    router.get("/published", pages.findAllPublished);
  
    // Retrieve a single page with id
    router.get("/:id", pages.findOne);
  
    // Update a page with id
    router.put("/:id", [authJwt.verifyToken], pages.update);
  
    // Delete a page with id
    router.delete("/:id", [authJwt.verifyToken], pages.delete);
  
    // Delete all pages
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], pages.deleteAll);
  
    app.use('/api/pages', router);
};