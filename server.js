const express = require('express');
const server = express();
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');
const tagdb = require('./data/helpers/tagDb');

const PORT = 8000;

server.use(express.json());

//------------users-------------------
server.get('/users', (req, res) => {
  userdb.get()
  .then(users => 
    res.status(200).json(users)
  )
  .catch(() => {
    res.status(500).json({error: "you gots an error"})
  })
})


// posts-----------------------------

server.get('/posts', (req, res) => {
  postdb.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    res.status(500).json({error: "Can't sit here... seats taken"})
  })
})


//  tags-----------------------------

server.get('/tags', (req, res) => {
  tagdb.get()
  .then(tags => {
    res.status(200).json(tags)
  })
  .catch(() => {
    res.status(500).json({error: "No Tags Tags"})
  })
})
server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`)
});