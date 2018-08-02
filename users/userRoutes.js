const express = require('express');
const userdb = require('../data/helpers/userDb');

const router = express.Router();


router.get('/', (req, res) => {
  userdb.get()
  .then(users => 
    res.status(200).json(users)
  )
  .catch(() => {
    res.status(500).json({error: "you gots an error"})
  })
})

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const user = req.body
  if (!user.name) {
    res.status(400).json({error: "Gots to give us a name"})
  }
  userdb.insert(user)
  .then(id => {
    res.status(201).send(id)
  })
  .catch(() => {
    res.status(500).json({error: "could not post"})
  })
})

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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
    res.status(500).json({message: "No Dice"})
  })
})

router.get('/posts/:id', (req, res) => {
  const {id} = req.params
  userdb.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    res.status(500).json({message: "Danger Will Robinson"})
  })
})


module.exports = router;