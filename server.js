const express = require('express');
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');
const tagdb = require('./data/helpers/tagDb');

const PORT = 8000;

const server = express();

server.use(express.json());


server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`)
});