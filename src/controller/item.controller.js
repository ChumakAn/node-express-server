const Sequelize = require("sequelize");
const Item = require("../models/item.model")
const Op = Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.price) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const item = {
        title: req.body.title,
        price: req.body.price
    };

    Item.create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the Item."
            });
        });
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const isASC = req.query.sorting;
    const titleCondition = title ? { title: { [Op.like] : `%${title}%` } } : null;
    const priceCondition = JSON.parse(isASC.toLowerCase()) ? ["price", "ASC"] : ["price", "DESC"];

    Item.findAll({
        where: titleCondition,
        order: [priceCondition]
    }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                   "Some error occurred while retrieving items."
            });
        });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Item with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Item with id=" + id
            });
        });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Item.update(req.body, {
        where: { id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Item was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:  "Error updating Item with id=" + id
        })
    })
    
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Item was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Item with id=" + id
        })
    })

};