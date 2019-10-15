const express = require('express');
const Admin = require('../models/admin');
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
  Admin.findOne({
    email: req.body.email,
    isDeleted: false
  }).exec((err, admin) => {
    if (err) {
      return res.status(500).send({
        loggedIn: false,
        message: 'Database error'
      });
    }
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      let token = jwt.sign({ userId: admin._id }, config.secret);
      delete admin.password;
      res.status(200).send({ token, loggedIn: true, admin });
    } else {
      return res.status(404).send({
        loggedIn: false,
        message: 'Incorrect email or password'
      });
    }
  });
};

exports.addAdmin = function(req, res) {
  //   if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  console.log(req.body, 'request body');
  let newAdmin = new Admin(req.body);
  newAdmin.save((err, admin) => {
    if (err) {
      if (err.code === 11000) {
        res.status(409).send({ error: 'This admin already exists!' });
      } else {
        res.status(500).send({ error: err.message });
      }
    } else {
      res.status(200).send({ message: 'Admin successfully added!', _id: admin._id });
    }
  });
};

exports.getAdmins = (req, res) => {
  //   if (!req.userId) return res.status(403).send({ error: 'User id is required' });
  Admin.find({ isDeleted: false }).exec((err, admins) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send(admins);
  });
};
