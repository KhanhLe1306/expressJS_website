const express = require('express');
const { check, validationResult } = require('express-validator');

const route = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  route.get('/', async (req, res, next) => {
    try {
      const errors = req.session.feedbacks ? req.session.feedbacks.errors : false;
      const successMessage = req.session.feedbacks ? req.session.feedbacks.message : false;
      // // console.log(req.session.feedbacks);
      // // console.log(req.session.feedbacks.errors);
      req.session.feedbacks = {};
    
      const feedbacks = await feedbackService.getList();
      return res.render('layout/layout.ejs', {
        pageTitle: 'Feedback',
        renderedPage: 'feedback.ejs',
        feedbacks,
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
    
  });

  route.post(
    '/',
    [
      check('name')
        .trim()
        .escape() //  escape html tags
        .isLength({ min: 3 })
        .withMessage('A name with more than 3 characters is required'),
      check('email')
        .trim()
        .escape() //  escape html tags
        .isEmail()
        .withMessage('A valid email address is required'),
      check('title')
        .trim()
        .escape() //  escape html tags
        .isLength({ min: 5 })
        .withMessage('A name with more than 5 characters is required'),
      check('message')
        .trim()
        .isLength({ min: 8 })
        .escape() //  escape html tags
        .withMessage('A message with more than 8 characters is required'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.feedbacks = {
          errors: errors.array(),
        };
        return res.redirect('/feedback')
      }

      // const { name, email, title, message } = req.body;
      req.session.feedbacks = {
        message: 'Thank you for your feedback!'
      }
      return res.redirect('/feedback');
    }
  );

  return route;
};
