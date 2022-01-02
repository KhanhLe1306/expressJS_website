const express = require('express');

const feedbackRoute = require('./feedback');
const speakerRoute = require('./speaker');

const route = express.Router();

module.exports = (params) => {
  route.get('/', async (req, res, next) => {
    // return next(new Error('some error'));    //  to test error handling middleware
    try {
      // if (!req.session.visitcount) {
      //     req.session.visitcount = 0;
      // }
      // req.session.visitcount += 1;
      // console.log(req.session.visitcount);

      const { speakerService } = params;
      const speakerList = await speakerService.getList();
      const allArtwork = await speakerService.getAllArtwork();
      // console.log(speakerList);
      return res.render('layout/layout.ejs', {
        pageTitle: 'Welcome',
        renderedPage: 'index.ejs',
        speakerList,
        allArtwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  route.use('/feedback', feedbackRoute(params));
  route.use('/speakers', speakerRoute(params));
  return route;
};
