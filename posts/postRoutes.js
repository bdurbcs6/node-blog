const express = require('express');
const postdb = require('../data/helpers/postDb');

const router = express.Router();

const serverError = (res) => {
  res.status(500).json({ message: "Server Error!"})
}

router.get('/', (req, res) => {
  postdb.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    return serverError(res)
  })
})

router.get('/:id', (req, res) => {
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
    return serverError(res)
  })
})

router.post('/', (req, res) => {
  const post = req.body
  if (!post.text || !post.userId) {
    res.status(400).json({error: "Gots to give us a post"})
  }
  postdb.insert(post)
  .then(id => {
    res.status(201).send(id)
  })
  .catch(() => {
    return serverError(res)
  })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params
  postdb.remove(id)
  .then(deleted => {
    if (deleted != 1) {
      res.status(400).json({error: "no post yo"})
    } else {
      res.status(200).json({message: "Post was deleted"})
    }
  })
  .catch(() => {
    return serverError(res)
  })
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const post = req.body
  postdb.update(id, post)
  .then(updated => {
    if (updated != 1) {
      res.status(400).json({message: "nope"})
    } else {
      res.status(200).json({message: "post updated"})
    }
  })
  .catch(() => {
    return serverError(res)
  })
})

router.get('/tags/:id', (req, res) => {
  const {id} = req.params
  postdb.getPostTags(id)
  .then(tags => {
    res.status(200).json(tags)
  })
  .catch(() => {
    return serverError(res)
  })
})


module.exports = router;