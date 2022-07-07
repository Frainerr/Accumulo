'use strict';

const express = require('express');
const dao = require('./dao');
const userDao = require('./userDao');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3001;


app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

//--------------configure passport--------------
passport.use(new LocalStrategy(
  function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); 
    }).catch(err => {
      done(err, null);
    });
});

//------------------Custom authorization middleware----------

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

//---------------------Session configuration---------------
app.use(session({
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// login
app.post('/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
     
      return res.status(401).json(info);
    }
  
    req.login(user, (err) => {
      if (err)
        return next(err);

      return res.json(req.user);
    });
  })(req, res, next);
});

// logout
app.delete('/sessions/current', (req, res) => {
  req.logout(() => { res.end(); });
});

// check whether the user is logged in or not
app.get('/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});

//-------------------------other APIs---------------

app.get('/riddles', async (req, res) => {
  try {
    const riddles = await dao.getRiddles();
    res.json(riddles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving riddles` }).end();
  }
});

app.get('/topScores', async (req, res) => {
  try {
    const scores = await dao.getTopScores();
    res.json(scores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving top scores` }).end();
  }
});

app.get('/answers', isLoggedIn, async (req, res) => {
  try {
    const answers = await dao.getAnswers();
    if (answers.error)
      res.status(404).json(answers);
    else
      res.json(answers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving answers` }).end();
  }
});


app.put('/updateRiddle',isLoggedIn, async (req, res) => {
  
  const riddle = req.body;

  // you can also check here if the code passed in the URL matches with the code in req.body
  try {
    await dao.updateRiddle(riddle);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of riddle ${riddle.question}.` });
  }
});

app.post('/addRiddle',isLoggedIn, [
  check('duration').isInt({min: 30, max: 300}),
],async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const riddle = req.body;
  try {
    await dao.addRiddle(riddle);
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the adding of the answer ${answer.answer}.` });
  }
});

app.post('/addAnswer',isLoggedIn, async (req, res) => {

  const answer = req.body;

  try {
    await dao.addAnswer(answer);
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the adding of the answer ${answer.answer}.` });
  }
});

app.put('/updateScore',isLoggedIn, async (req, res) => {

  const score = req.body;
  try {
    await dao.updateScore(score);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of ${score.user}'s score.` });
  }
});

app.put('/updateCounter', async (req, res) => {
  
  const id = req.body.id
  const counter = req.body.counter;

  try {
    await dao.updateCounter(id,counter);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of the counter.` });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));