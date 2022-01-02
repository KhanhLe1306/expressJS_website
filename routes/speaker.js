const express = require('express');

const route = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  route.get('/', async (req, res, next) => {
    try {
      const speakers = await speakerService.getList();
      const allArtwork = await speakerService.getAllArtwork();
      return res.render('layout/layout.ejs', {
        pageTitle: 'Welcome',
        renderedPage: 'speakers',
        speakers,
        allArtwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  route.get('/:name', async (req, res, next) => {
    try {
      const speakers = await speakerService.getList();
      const allArtwork = await speakerService.getAllArtwork();
      return res.render('layout/layout.ejs', {
        pageTitle: 'Welcome',
        renderedPage: 'speakers',
        speakers,
        allArtwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return route;
};
