module.exports = app => {
    const pages = require("../controllers/page.controller.js");
  
    var router = require("express").Router();
  
    // Create a new page
    router.post("/", pages.create);
  
    // Retrieve all pages
    router.get("/", pages.findAll);
  
    // Retrieve all published pages
    router.get("/published", pages.findAllPublished);
  
    // Retrieve a single page with id
    router.get("/:id", pages.findOne);
  
    // Update a page with id
    router.put("/:id", pages.update);
  
    // Delete a page with id
    router.delete("/:id", pages.delete);
  
    // Create a new page
    router.delete("/", pages.deleteAll);
  
    app.use('/api/pages', router);
};