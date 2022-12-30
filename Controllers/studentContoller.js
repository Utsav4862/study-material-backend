const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
const jwt = require("jsonwebtoken");
const Student = require("../Model/Student");
const key = "adsfgdlfpowierure304958fkjd";

const signUp = async (req, res) => {
  let exist = await Student.exists({ email: req.body.email });
  const { name, email, password } = req.body;

  if (exist) {
    res.send({ exist: "User Already Exist" });
  } else {
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = await Student.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.send({ student: user });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = await jwt.sign({ user }, key);
    await res.send({ token: token, student: user });
  } else {
    res.send({ error: "User not Found" });
  }
};

const getCurrentUser = async (req, res) => {
  let user = await req.user;
  res.send(user);
};

module.exports = { signUp, login, getCurrentUser };
