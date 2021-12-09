module.exports = app => {
    const items = require("../controller/item.controller");
  
    var router = require("express").Router();
  
    // Create a new Item
    router.post("/", items.create);
  
    // Retrieve all Item
    router.get("/", items.findAll);
  
    // Retrieve a single Item with id
    router.get("/:id", items.findOne);
  
    // Update a Item with id
    router.put("/:id", items.update);
  
    // Delete a Item with id
    router.delete("/:id", items.delete);
  
    // using a middleware
    app.use('/api/v2/items', router);
  };