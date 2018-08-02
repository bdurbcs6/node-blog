const express = require('express');
const tagdb = require('../data/helpers/tagDb');
const router = express.Router();

const serverError = (res) => {
  res.status(500).json({ message: "Server Error!"})
}

router.get('/', (req, res) => {
  tagdb.get()
  .then(tags => {
    res.status(200).json(tags)
  })
  .catch(() => {
    return serverError(res)
  })
})


router.get('/:id', (req, res) => {
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
    return serverError(res)
  })
})

router.post('/', (req, res) => {
  const taggy = req.body
  if (!taggy) {
    res.status(400).json({error: "Gots to give us a tag"})
  }
  tagdb.insert(taggy)
  .then(id => {
    res.status(201).json(id)
  })
  .catch(() => {
    return serverError(res)
  })
})

router.put('/:id', (req, res) => {
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
    return serverError(res)
  })
})

router.delete('/:id', (req, res) => {
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
    return serverError(res)
  })
})

module.exports = router;