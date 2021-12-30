const express = require('express');

const feedbackRoute = require('./feedback');
const speakerRoute = require('./speaker');

const route = express.Router();

module.exports = (params) => {
    route.get('/', async (req, res) => {
        
        // if (!req.session.visitcount) {
        //     req.session.visitcount = 0;
        // }
        // req.session.visitcount += 1;
        // console.log(req.session.visitcount);
      
      const { speakerService } = params;
      const speakerList = await speakerService.getList();
      res.render('layout/layout.ejs', { pageTitle: 'Welcome' , renderedPage: 'index.ejs', speakerList});
    });

    route.use('/feedback', feedbackRoute(params));
    route.use('/speakers', speakerRoute(params));
    return route;
}