const express = require('express');

const route = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  route.get('/', async (req, res) => {
    const feedback = await feedbackService.getList();
    return res.json(feedback);
  });

  route.post('/', (req, res) => {
    res.send('Feed back has been sent!');
  });

  return route;
};
