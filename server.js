const express = require('express');

const PORT = 8000;

const server = express();

server.use(express.json());


server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`)
});