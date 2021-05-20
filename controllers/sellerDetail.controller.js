'use strict';

const UserData = require('../models/userdata.model');
const _ = require('lodash');

function handleError(res, err) {
  return res.status(500).send(err);
}


exports.getData = function (req, res) {
  return res.status(200).json("userdata shilpa");
};
/**
 * Get list of Sendmail
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  UserData.find(function (err, userdata) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(userdata);
  });
};

/**
 * Get a single Sendmail
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  UserData.findById(req.params.id, function (err, userdata) {
    if (err) { return handleError(res, err); }
    if (!userdata) { return res.status(404).end(); }
    return res.status(200).json(userdata);
  });
};

/**
 * Creates a new Sendmail in the DB.
 *
 * @param req
 * @param res
 */
exports.createUserdata = function (req, res) {
  let db_data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password
    //avatar : req.file.path
  };
  UserData.create(db_data, function (err, userdata) {
    if (err) { return handleError(res, err); }
    return res.status(201).json({ status: "Success", data: userdata });
  });
};


exports.userlogin = function (req, res, callback) {
  UserData.findOne({ email: req.body.email, password: req.body.password })
    .select('email firstName lastName password address')
    .exec(function (err, userdata) {
      if (err) {
        return callback(err)
      } else if (!userdata) {
        return res.status(401).json({ error: 'userdata not found.' });
        return callback(err);
      }

      return res.status(200).json({ status: "Success", data: userdata });
    });
}



/**
 * Updates an existing Sendmail in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  UserData.findById(req.params.id, function (err, userdata) {
    if (err) { return handleError(res, err); }
    if (!userdata) { return res.status(404).end(); }
    var updated = _.merge(userdata, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(userdata);
    });
  });
};

/**
 * Deletes a Sendmail from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  UserData.findById(req.params.id, function (err, userdata) {
    if (err) { return handleError(res, err); }
    if (!userdata) { return res.status(404).end(); }
    userdata.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
