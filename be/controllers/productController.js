const express = require('express');
const Product = require('../models/product');

exports.addProduct = function(req, res) {
  console.log(req.body);
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  let newProduct = new Product(req.body);
  newProduct.save((err, product) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send({ message: 'Product successfully added!' });
    }
  });
};

exports.getProducts = (req, res) => {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  Product.find({ isDeleted: false }).exec((err, products) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send(products);
  });
};
exports.getFilteredProducts = (req, res) => {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  let query = req.query;
  query['isDeleted'] = false;
  Product.find(query).exec((err, products) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send(products);
  });
};

exports.updateProduct = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  Product.findOneAndUpdate({ _id: req.body._id }, req.body).exec((err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'Product successfully updated!' });
  });
};

exports.deleteProduct = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  console.log(req.query._id);
  Product.findByIdAndRemove(req.query._id, (err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'Product successfully removed!' });
  });
};
