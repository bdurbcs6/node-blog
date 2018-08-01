const express = require('express');
const server = express();
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');
const tagdb = require('./data/helpers/tagDb');

const PORT = 8000;

server.use(express.json());

server.get('/users', (req, res) => {
  userdb.get()
  .then(users => 
    res.status(200).json(users)
  )
  .catch(() => {
    res.status(500).json({error: "you gots an error"})
  })
})


server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`)
});