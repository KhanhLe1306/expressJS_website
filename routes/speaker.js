const express = require('express');

const route = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  route.get('/', async (req, res) => {
    const speaker = await speakerService.getList();
    return res.json(speaker);
  });

  route.get('/:name', (req, res) => {
    res.send(`This is the voice from ${req.params.name}!!!`);
  });

  return route;
};
