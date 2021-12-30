const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const routes = require('./routes/index');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Site';

app.set('trust proxy', 1); //  if it is not declared, it might fail when depoying the app

app.use( async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    app.locals.speakers = names;  //  speakers are now availble for use for all files
    // console.log(app.locals);
    return next();
  } catch (err) {
    return next();
  }
});
app.use(
  cookieSession({
    name: 'session',
    keys: ['jlashdfuuwhfljk3244', '234hjkjhvj23v4k'],
  })
);
app.use(express.static('static'));
app.use('/', routes({ feedbackService, speakerService }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
