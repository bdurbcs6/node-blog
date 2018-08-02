const express = require('express');
const server = express();

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');
const tagRoutes = require('./tags/tagRoutes');

const PORT = 8000;

server.use(express.json());


server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes)


server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`)
})