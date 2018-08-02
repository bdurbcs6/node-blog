const express = require('express');
const userdb = require('../data/helpers/userDb');

const router = express.Router();

const serverError = (res) => {
  res.status(500).json({ message: "Server Error!"})
}


router.get('/', (req, res) => {
  userdb.get()
  .then(users => 
    res.status(200).json(users)
  )
  .catch(() => {
    return serverError(res)
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
    return serverError(res)
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
    return serverError(res)
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
    return serverError(res)
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
    return serverError(res)
  })
})

router.get('/posts/:id', (req, res) => {
  const {id} = req.params
  userdb.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    return serverError(res)
  })
})


module.exports = router;