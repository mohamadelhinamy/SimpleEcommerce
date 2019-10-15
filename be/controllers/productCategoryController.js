const express = require('express');
const ProductCategory = require('../models/productCategory');

exports.addProductCategory = function(req, res) {
  console.log(req.body);
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  let newProductCategory = new ProductCategory(req.body);
  newProductCategory.save((err, productCategory) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send({ message: 'Product category successfully added!' });
    }
  });
};

exports.getProductCategories = (req, res) => {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  ProductCategory.find({ isDeleted: false }).exec((err, productCategories) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send(productCategories);
  });
};

exports.updateProductCategory = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  ProductCategory.findOneAndUpdate({ _id: req.body._id }, req.body).exec((err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'Product category successfully updated!' });
  });
};

exports.deleteProductCategory = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  console.log(req.query._id);
  ProductCategory.findByIdAndRemove(req.query._id, (err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'Product category successfully removed!' });
  });
};
