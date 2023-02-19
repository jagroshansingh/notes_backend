const express = require("express");
const bcrypt = require("bcrypt");
const { AuthModel } = require("../models/auth.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // res.send(password)
  try {
    bcrypt.hash(password, 5, function (err, hash) {
      let insert = new AuthModel({ name, email, password: hash });
      insert.save();
      res.send(insert);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let figure = await AuthModel.find({ email });
    if (figure.length == 1) {
      bcrypt.compare(password, figure[0].password, function (err, result) {
        // if (err) res.send({ msg: "Wrong Credentials" });
        if (result) {
          var token = jwt.sign({ author:figure[0]._id }, "masai");
          res.send({ msg: "Login Success",token});
        } else res.send({ msg: "Wrong Credentials" });
      });
    } else res.send({ err: "Multiple users found" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = { router };
