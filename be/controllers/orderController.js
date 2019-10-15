const express = require('express');
const Order = require('../models/order');

exports.addOrder = function(req, res) {
  console.log(req.query);
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  let newOrder = new Order(req.query);
  newOrder.save((err, order) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send({ message: 'Order successfully added!' });
    }
  });
};

exports.getOrders = (req, res) => {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  Order.find({ isDeleted: false }).exec((err, orders) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send(orders);
  });
};

exports.getFilteredOrders = (req, res) => {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  let query = req.query;
  query['isDeleted'] = false;

  Order.find(query).exec((err, orders) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send(orders);
  });
};

exports.updateOrder = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  Order.findOneAndUpdate({ _id: req.query._id }, req.query).exec((err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'Order successfully updated!' });
  });
};

exports.deleteOrder = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  console.log(req.query._id);
  Order.findByIdAndRemove(req.query._id, (err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'Order successfully removed!' });
  });
};
