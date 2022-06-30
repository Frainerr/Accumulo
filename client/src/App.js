import './App.css';
/*
import Sidebar from './Components/Sidebar'
import DisplayFilms from './Components/DisplayFilms'
import NavigationBar from './Components/NavigationBar'
*/


import 'bootstrap/dist/css/bootstrap.min.css'
/*
import {Container, Row} from 'react-bootstrap'

*/
import { useEffect, useState } from 'react';

import MovieFormRoute from './Routes/MovieFormRoute';
import FilterMoviesRoute from './Routes/FilterMoviesRoute';
import { LoginForm, LogoutButton } from './Components/Login';
// import dayjs from 'dayjs'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import API from './API';

function App() {
  return (
    <BrowserRouter>
      <App2 />
    </BrowserRouter>
  )
}

/*
const fakeMovies = [{title: "Space Jam", favorite: true, rating: 5, date: dayjs('05-09-1999')}, {title: "Interstellar", favorite: true, rating: 3, date: dayjs('03-05-2022')}];
*/
/*
const filters = [{name: "All", comparator: (film) => true}, {name: "Favorite", comparator: (film) => film.favorite}, {name: "Best rated", comparator: (film) => film.rating === 5}, {name: "Seen Last Month", comparator: (film) => (film.date > dayjs().subtract(30, "day") && film.date < dayjs())}, {name: "Unseen", comparator: (film) => film.date ? false : true}];
*/

function App2() {
  /*
    const [filterState, setFilterState] = useState("All");
  */
  const [movies, setMovies] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [bestRated, setBestRated] = useState([]);
  const [seenLastMonth, setSeenLastMonth] = useState([]);
  const [unseen, setUnseen] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);  
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch (err) {
        handleError(err);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (loggedIn)
      setDirty(true);
  }, [loggedIn])

  useEffect(() => {
    // fetch /films
    // setMovies del risultato
    if (dirty) {
      API.getAllFilms()
        .then((movies) => {
          setMovies(movies);
          setDirty(false);
        })
        .catch(err => console.log(err))

      API.getFavoriteFilms()
        .then((favorite) => setFavorite(favorite))
        .catch(err => console.log(err))

      API.getBestRatedFilms()
        .then((bestRated) => setBestRated(bestRated))
        .catch(err => console.log(err))

      API.getLastMonthFilms()
        .then((seenLastMonth) => setSeenLastMonth(seenLastMonth))
        .catch(err => console.log(err))

      API.getUnseenFilms()
        .then((unseen) => setUnseen(unseen))
        .catch(err => console.log(err))
    }
  }, [dirty])

  /*
    const handleChangeFilter = (state) => {
      if(filterState !== state){
        setFilterState(state);
      }
    }
  */

  function handleError(err) {
    console.log(err);
  }

  const handleToggleFavorite = (title) => {
    const newMovies = [...movies];
    const film = newMovies.find(film => film.title === title);
    film.favorite = !film.favorite;
    setMovies(newMovies);
    API.UpdateFilm(film)
      .then(() => setDirty(true))
      .catch(err => handleError(err));
  }

  const handleChangeRating = (title, rating) => {
    const newMovies = [...movies];
    const film = newMovies.find(film => film.title === title);
    film.rating = rating;
    setMovies(newMovies);
    API.UpdateFilm(film)
      .then(() => setDirty(true))
      .catch(err => handleError(err));
  }

  const handleDeleteFilm = (title) => {
    const newMovies = movies.filter(film => film.title !== title);
    setMovies(newMovies);
  }

  const handleAddFilm = (film) => {
    movies.map(f => f.title).includes(film.title) ? alert("Movie already exists") : setMovies([...movies, film]);
    API.addFilm(film)
      .then(() => setDirty(true))
      .catch(err => handleError(err))
  }

  const handleUpdateFilm = (film, oldTitle) => {
    const newMovies = movies.filter(film => film.title !== oldTitle);
    newMovies.map(f => f.title).includes(film.title) ? alert("There is already a movie with this title") : setMovies([...newMovies, film]);
    API.UpdateFilm(film)
      .then(() => setDirty(true))
      .catch(err => handleError(err));
  }

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then(user => {
        setLoggedIn(true);
        setUser(user);
        setMessage('');
        navigate('/');
      })
      .catch(err => {
        setMessage(err);
      }
      )
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser({});
    setMovies([]);
  }

  return (
    /*
    <div>
      <header>
        <NavigationBar />
      </header>
      <main>
        <Container fluid>
          <Row className="vh-100">
            <Sidebar options={filters.map((filt) => filt.name)} filterState={filterState} changeState={handleChangeFilter} />
            <DisplayFilms editFilm={handleEditFilm} addFilm={handleAddFilm} deleteFilm={handleDeleteFilm} changeRating={handleChangeRating} toggleFavorite={handleToggleFavorite} filter={filterState} films={movies.filter(filters.find((filt) => filt.name === filterState).comparator)}/>
          </Row>
        </Container>
      </main>
    </div>
    */
    <>
      <Container>
        <Row><Col>
          {loggedIn ? <LogoutButton logout={doLogOut} user={user} /> : false}
        </Col></Row>
        <Row><Col>
          {message ? <Alert variant='danger' onClose={() => setMessage('')} dismissible>{message}</Alert> : false}
        </Col></Row>
      </Container>
        <Routes>
          <Route path="/" element={loggedIn ? <FilterMoviesRoute movies={movies} deleteFilm={handleDeleteFilm} changeRating={handleChangeRating} toggleFavorite={handleToggleFavorite} filterState={"All"}/> : <Navigate to='/login' /> } />
          <Route path='/login' element={loggedIn ? <Navigate to='/' /> : <LoginForm login={doLogIn} />} />
          <Route path="/favorite" element={loggedIn ? <FilterMoviesRoute movies={favorite} deleteFilm={handleDeleteFilm} changeRating={handleChangeRating} toggleFavorite={handleToggleFavorite} filterState={"Favorite"}/> : <Navigate to='/login' /> } />
          <Route path="/best-rated" element={loggedIn ? <FilterMoviesRoute movies={bestRated} deleteFilm={handleDeleteFilm} changeRating={handleChangeRating} toggleFavorite={handleToggleFavorite} filterState={"Best Rated"}/> : <Navigate to='/login' /> } />
          <Route path="/seen-last-month" element={loggedIn ? <FilterMoviesRoute movies={seenLastMonth} deleteFilm={handleDeleteFilm} changeRating={handleChangeRating} toggleFavorite={handleToggleFavorite} filterState={"Seen Last Month"}/> : <Navigate to='/login' /> } />
          <Route path="/unseen" element={loggedIn ? <FilterMoviesRoute movies={unseen} deleteFilm={handleDeleteFilm} changeRating={handleChangeRating} toggleFavorite={handleToggleFavorite} filterState={"Unseen"}/> : <Navigate to='/login' /> } />
          <Route path="/add-movie" element={<MovieFormRoute label="Add a new movie" addFilm={handleAddFilm} editFilm={handleUpdateFilm} />} />
          <Route path="/edit-movie" element={<MovieFormRoute label="Edit movie" addFilm={handleAddFilm} editFilm={handleUpdateFilm} />} />
        </Routes>
    </>
  );
}

export default App;

