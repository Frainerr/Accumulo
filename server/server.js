'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');
const { check, validatorResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userDao = require('./user-dao');
const cors = require('cors');

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
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});


const PORT = 3001;

const app = express();


// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//////////API////////////

// get all films
app.get('/films', isLoggedIn, async (req, res) => {
  try {
    const films = await dao.listFilms();
    res.json(films);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving films` }).end();
  }
});

// get favorite films
app.get('/favorite', isLoggedIn, async (req, res) => {
  try {
    const films = await dao.getFavoriteFilms();
    res.json(films);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving favorite films` }).end();
  }
});

// get best rated films
app.get('/best-rated', isLoggedIn, async (req, res) => {
  try {
    const films = await dao.getBestRatedFilms();
    res.json(films);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving best rated films` }).end();
  }
});

// get last month films
app.get('/seen-last-month', isLoggedIn, async (req, res) => {
  try {
    const films = await dao.getLastMonthFilms();
    res.json(films);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving last month films` }).end();
  }
});

// get unseen films
app.get('/unseen', isLoggedIn, async (req, res) => {
  try {
    const films = await dao.getUnseenFilms();
    res.json(films);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: `Database error while retrieving unseen films` }).end();
  }
});

// get a film by id
app.get('/filmById/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.FilmById(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving film ${req.params.id}.` }).end();
  }
});

// create a new film
app.post('/createFilm', isLoggedIn, [
  check('favorite').isInt({ min: 0, max: 1 }),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true }),
  check('rating').isInt({ min: 1, max: 5 })
], async (req, res) => {
  const errors = validatorResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const id = dao.countFilms() + 1;
  const film = {
    id: id,
    title: req.body.title,
    favorite: req.body.favorite,
    watchdate: req.body.watchdate,
    rating: req.body.rating,
    user: req.body.user
  };
  try {
    await dao.createFilm(film);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of the film.` });
  }
});

app.put('/updateFilm/:id', isLoggedIn, [
  check('favorite').isInt({ min: 0, max: 1 }),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true }),
  check('rating').isInt({ min: 1, max: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const film = {
    id: req.params.id,
    title: req.body.title,
    favorite: req.body.favorite,
    watchdate: req.body.watchdate,
    rating: req.body.rating
  };

  // you can also check here if the code passed in the URL matches with the code in req.body
  try {
    await dao.updateFilm(film);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of the film ${film.id}` });
  }
});

app.put('/updateFavorite', isLoggedIn, [
  check('favorite').isInt({ min: 0, max: 1 }),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true }),
  check('rating').isInt({ min: 1, max: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const film = req.body;

  // you can also check here if the code passed in the URL matches with the code in req.body
  try {
    await dao.RemarkFilm(film);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of the favorite field of the film ${film.id}` });
  }
});

app.delete('/deleteFilm/:id', isLoggedIn, async (req, res) => {
  try {
    await dao.deleteFilm(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of film ${req.params.id}.` });
  }
});

///////login////////

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

app.delete('/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

app.get('/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
  res.status(200).json(req.user);}
else
  res.status(401).json({error: 'Unauthenticated user!'});;
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));