import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import RiddlesRoute from './Routes/RiddlesRoute'
import RiddleForm from './Components/RiddleForm'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from './Components/LoginComponents';
import { useEffect, useState } from "react";
import API from './API';

function App() {
  return (
    <BrowserRouter>
      <App2 />
    </BrowserRouter>
  )
}

function App2() {

  const [riddles, setRiddles] = useState([]);
  const [dirty, setDirty] = useState(0);
  const [dirty1, setDirty1] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [answers, setAnswers] = useState([]);
  const [stopCounter,setStopCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      API.getAnswers()
        .then((answers) => {
          setAnswers(answers);
        })
        .catch(err => setMessage(err))
    }
    API.getAllRiddles()
      .then((riddles) => {
        setRiddles(riddles);
      })
      .catch(err => setMessage(err))
    setTimeout(() => setDirty(dirty + 1), 1000);
  }, [dirty, loggedIn])

  useEffect(() => {
    if (dirty1) {
      API.getTopScores()
        .then((topScores) => {
          setTopScores(topScores);
          setDirty1(false);
        })
        .catch(err => setMessage(err))
    }
  }, [dirty1])

  function addAnswer(answer) {
    API.addAnswer(answer)
      .catch(err => { setMessage(err); })
  }

  function updateCounter(id, counter) {
    API.updateCounter(id,counter)
      .catch(err => { setMessage(err); });
  }

  function editScore(newScore, user) {
    API.updateScore(newScore, user)
      .then(() => setDirty1(true))
      .catch(err => { setMessage(err); })
  }

  function addRiddle(newRiddle) {
    API.addRiddle(newRiddle)
      .then(() => setDirty1(true))
      .catch(err => { setMessage(err); })
  }

  function editRiddle(newRiddle) {
    API.updateRiddle(newRiddle)
      .then(() => setDirty1(true))
      .catch(err => { setMessage(err); })
  }

  function resetMessage(){
    setMessage('');
  }

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then(user => {
        setLoggedIn(true);
        setUser(user);
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
    setDirty(0);
    setUser({});
    setAnswers([]);
  }
  return (
    <>  
        <Routes>
          <Route path="/" element={<RiddlesRoute riddles={riddles} answers={answers} option={true} loggedIn={loggedIn} logOut={doLogOut} message = {message}
             user={user} editRiddle={editRiddle} addAnswer={addAnswer} editScore={editScore} updateCounter={updateCounter} resetMessage = {resetMessage} />} />
          <Route path='/login' element={loggedIn ? <Navigate to='/' /> : <LoginForm login={doLogIn} />} />
          <Route path="/ranking" element={<RiddlesRoute topScores={topScores} option={false} message = {message} resetMessage = {resetMessage}
          user = {user} loggedIn = {loggedIn} logOut = {doLogOut}/>} />
          <Route path="/addRiddle" element={<RiddleForm user={user} riddles={riddles} addRiddle={addRiddle}></RiddleForm>} />
        </Routes>

    </>
  );

}

export default App;
