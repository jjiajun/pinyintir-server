// const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
// const Group = require("../models/Group.js");

const hash = bcrypt.hashSync('123', 10);
const { DATABASE } = process.env;

/** Create connection to mongodb */
mongoose.connect(DATABASE, () => {
  console.log('connected to mongodb');
});

const userSeeds = [
  {
    firstName: 'Dom',
    lastName: 'Pethicc',
    email: 'dom@gmail.com',
    password: hash,
  },
  {
    firstName: 'Tris',
    lastName: 'Waist',
    email: 'tris@gmail.com',
    password: hash,
  },
  {
    firstName: 'Jiahao',
    lastName: 'Shorthair',
    email: 'jiahao@gmail.com',
    password: hash,
  },
];
const runSeeder = async () => {
  // delete all existing records in the DB
  await User.deleteMany({});
  // inserts seed data
  const users = await User.insertMany(userSeeds);
  console.log('Inserted userSeeds. This is the result: ', users);
  // find all names in the db
  const allNames = await User.find().select('name');
  console.log('All the users in our app', allNames);
  // get all the userIds
  const userIds = allNames.map((el) => el._id);
  console.log('All the userIds in our app', userIds);
};

runSeeder().then(() => {
  mongoose.connection.close();
});
