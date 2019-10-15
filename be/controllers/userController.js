const express = require('express');
const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      loggedIn: false,
      message: 'Email is required'
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      loggedIn: false,
      message: 'Password is required'
    });
  }
  User.findOne({
    email: req.body.email,
    isDeleted: false
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        loggedIn: false,
        message: 'Database error'
      });
    }
    if (user && user.active === true && bcrypt.compareSync(req.body.password, user.password)) {
      let token = jwt.sign({ userId: user._id }, config.secret);
      delete user.password;
      res.status(200).send({ token, loggedIn: true, user });
    } else {
      return res.status(404).send({
        loggedIn: false,
        message: 'Incorrect email or password'
      });
    }
  });
};

exports.register = function(req, res) {
  //   if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  console.log(req.body, 'request body');
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      if (err.code === 11000) {
        res.status(409).send({ error: 'This user already exists!' });
      } else {
        res.status(500).send({ error: err.message });
      }
    } else {
      res.status(200).send({ message: 'User successfully added!', _id: user._id });
    }
  });
};

exports.getUsers = (req, res) => {
  //   if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  User.find({ isDeleted: false }).exec((err, users) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send(users);
  });
};
exports.deleteUser = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  console.log(req.query._id);
  User.findByIdAndRemove(req.query._id, (err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'User successfully removed!' });
  });
};
exports.updateUser = function(req, res) {
  // if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  var _id = req.query._id;
  delete req.query._id;
  User.findOneAndUpdate({ _id: _id }, req.query).exec((err, result) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send({ message: 'User successfully updated!' });
  });
};
