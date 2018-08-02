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

server.get('/users/:id', (req, res) => {
  const {id} = req.params
  userdb.get(id)
  .then(user => {
    if (!user) {
      res.status(404).json({error: "That user cannot be found"})
    } else {
      res.status(200).json(user)
    }
  })
  .catch(() => {
    res.status(500).json({error: "you gots an error"})
  })
})

server.post('/users', (req, res) => {
  const user = req.body
  if (!user.name) {
    res.status(400).json({error: "Gots to give us a name"})
  }
  userdb.insert(user)
  .then(id => {
    res.status(200).send(id)
  })
  .catch(() => {
    res.status(500).json({error: "could not remove"})
  })
})

server.delete('/users/:id', (req, res) => {
  const {id} = req.params
  userdb.remove(id)
  .then(deleted => {
    if (deleted != 1) {
      res.status(400).json({error: "no user yo"})
    } else {
      res.status(200).json({message: "User was deleted"})
    }
  })
  .catch(() => {
    res.status(500).json({error: "epic fail"})
  })
})

server.put('/users/:id', (req, res) => {
  const {id} = req.params
  const user = req.body
  userdb.update(id, user)
  .then(updated => {
    if (updated != 1) {
      res.status(400).json({message: "nope"})
    } else {
      res.status(200).json({message: "user updated"})
    }
  })
  .catch(() => {
    res.status(500).json({message: "User was updated!"})
  })
})

server.get('/users/posts/:id', (req, res) => {
  const {id} = req.params
  userdb.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    res.status(500).json({message: "Danger Will Robinson"})
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

server.get('/posts/:id', (req, res) => {
  const {id} = req.params
  postdb.get(id)
  .then(post => {
    if (!post) {
      res.status(404).json({error: "That post cannot be found"})
    } else {
      res.status(200).json(post)
    }
  })
  .catch(() => {
    res.status(500).json({error: "you gots an error"})
  })
})

server.post('/posts', (req, res) => {
  const post = req.body
  if (!post.text) {
    res.status(400).json({error: "Gots to give us a name"})
  }
  postdb.insert(post)
  .then(id => {
    res.status(200).send(id)
  })
  .catch(() => {
    res.status(500).json({error: "could not remove"})
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