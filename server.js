const express = require('express');
const server = express();

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');
const tagdb = require('./data/helpers/tagDb');

const PORT = 8000;
server.use(express.json());

server.use('/users', userRoutes);

server.use('/posts', postRoutes);


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


server.get('/tags/:id', (req, res) => {
  const {id} = req.params
  tagdb.get(id)
  .then(tag => {
    if (!tag) {
      res.status(404).json({error: "That tag cannot be found"})
    } else {
      res.status(200).json(tag)
    }
  })
  .catch(() => {
    res.status(500).json({error: "you gots an error"})
  })
})

server.post('/tags', (req, res) => {
  const taggy = req.body
  if (!taggy) {
    res.status(400).json({error: "Gots to give us a tag"})
  }
  tagdb.insert(taggy)
  .then(id => {
    res.status(201).json(id)
  })
  .catch(() => {
    res.status(500).json({error: "could not tag"})
  })
})

server.put('/tags/:id', (req, res) => {
  const {id} = req.params
  const tag = req.body
  tagdb.update(id, tag)
  .then(updated => {
    if (updated != 1) {
      res.status(400).json({message: "nope"})
    } else {
      res.status(200).json({message: "tag updated"})
    }
  })
  .catch(() => {
    res.status(500).json({message: "No Dice"})
  })
})

server.delete('/tags/:id', (req, res) => {
  const {id} = req.params
  tagdb.remove(id)
  .then(deleted => {
    if (deleted != 1) {
      res.status(400).json({error: "no tag yo"})
    } else {
      res.status(200).json({message: "Tag was deleted"})
    }
  })
  .catch(() => {
    res.status(500).json({error: "No Dice"})
  })
})


server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`)
})