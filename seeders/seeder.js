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
    lastName: 'Inique',
    email: 'dom@gmail.com',
    password: hash,
    categories: [{
      name: 'All Phrases',
    }, {
      name: 'Shameful Acts',
    }],
    phrases: [
      {
        chinesePhrase: '爸爸 Foong 打我的屁股',
        pinyin: 'Bàba Foong dǎ wǒ de pìgu',
        definition: 'Daddy Foong spanks my ass',
        category: ['All Phrases'],
      },
      {
        chinesePhrase: 'Gary 终于中奖，但是他跑路了',
        pinyin: 'Gary zhōngyú zhòngjiǎng, dànshì tā pǎo lùle',
        definition: 'Gary finally wins, but he runs away',
        category: ['All Phrases', 'Shameful Acts'],
      },
    ],
  },
  {
    firstName: 'Tristan',
    lastName: 'Teo',
    email: 'tris@gmail.com',
    password: hash,
    categories: [{
      name: 'AllPhrases',
    }],
  },
  {
    firstName: 'Jiahao',
    lastName: 'Lim',
    email: 'jiahao@gmail.com',
    password: hash,
    categories: [{
      name: 'All Phrases',
    }],
  },
  {
    firstName: 'Foong',
    lastName: 'Daddy',
    email: 'foong@daddy.com',
    password: hash,
    categories: [{
      name: 'All Phrases',
    }],
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
  const userIds = allNames.map((el) => el.id);
  console.log('All the userIds in our app', userIds);
};

runSeeder().then(() => {
  mongoose.connection.close();
});
