const db = require("../models");
const Page = db.pages;
const Op = db.Sequelize.Op;

// Create and Save a new Page
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Page
    const page = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      content: req.body.content,
      authorid: req.body.authorid,
      tags: req.body.tags
    };
  
    // Save page in the database
    Page.create(page)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the page."
        });
      });
  };

// Retrieve all pages from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Page.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pages."
        });
      });
  };

// Find a single page with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Page.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving page with id=" + id
        });
      });
};

// Update a page by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Page.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "page was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update page with id=${id}. Maybe page was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating page with id=" + id
        });
      });
  };

// Delete a page with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Page.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Page was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete page with id=${id}. Maybe page was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete page with id=" + id
        });
      });
};

// Delete all pages from the database.
exports.deleteAll = (req, res) => {
    Page.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} pages were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all pages."
        });
      });
};

// Find all published pages
exports.findAllPublished = (req, res) => {
    Page.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pages."
        });
      });
};