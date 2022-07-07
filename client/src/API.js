const APIURL = new URL('http://localhost:3001/');

async function getAllRiddles() {

    const response = await fetch(new URL('riddles', APIURL), {credentials: 'include'});
    const riddlesJson = await response.json();
    if (response.ok) {
        return riddlesJson.map((e) =>
        ({
            id: e.id,
            user: e.user,
            question: e.question,
            difficulty: e.difficulty,
            duration: e.duration,
            solution: e.solution,
            advice1: e.advice1,
            advice2: e.advice2,
            state: e.state,
            winner: e.winner,
            counter: e.counter
        }))
    } else {
        throw riddlesJson;    // oggetto json fornito dal server che contiene l'errore
    }
}

async function getTopScores() {

    const response = await fetch(new URL('topScores', APIURL), {credentials: 'include'});
    const topScoresJson = await response.json();
    if (response.ok) {
        return topScoresJson.map((e) =>
        ({
            user: e.user,
            name: e.name,
            score: e.score,
            rank: e.rank
        }))
    } else {
        throw topScoresJson;    
    }
}

async function getAnswers() {
    const response = await fetch(new URL('answers', APIURL), {credentials: 'include'});
    const answersJson = await response.json();
    if (response.ok) {
        return answersJson.map((e) =>
        ({
            user: e.user,
            question: e.question,
            answer: e.answer
        }))
    } else {
        throw answersJson;    
    }
}

  function updateRiddle(riddle) {
    return new Promise((resolve, reject) => {
      fetch(new URL('updateRiddle', APIURL), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: riddle.user, question: riddle.question, state: riddle.state, winner: riddle.winner}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
         
          response.json()
            .then((obj) => { reject(obj); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
    });
  }

  function addRiddle(riddle) {
    return new Promise((resolve, reject) => {
      fetch(new URL('addRiddle', APIURL), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riddle),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
    });
  }

  function addAnswer(answer) {
    return new Promise((resolve, reject) => {
      fetch(new URL('addAnswer', APIURL), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
        
          response.json()
            .then((message) => { reject(message); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
    });
  }

  function updateScore(score,user) {
    return new Promise((resolve, reject) => {
      fetch(new URL('updateScore', APIURL), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user, score: score}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
         
          response.json()
            .then((obj) => { reject(obj); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
    });
  }

  function updateCounter(id,counter) {
    return new Promise((resolve, reject) => {
      fetch(new URL('updateCounter', APIURL), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, counter: counter}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          
          response.json()
            .then((obj) => { reject(obj); }) 
            .catch(() => { reject({ error: "Cannot parse server response." }) }); 
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
    });
  }

  async function logIn(credentials) {
    let response = await fetch(new URL('sessions', APIURL), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }

  async function logOut() {
    await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
  }
  
  async function getUserInfo() {
    const response = await fetch(new URL('sessions/current', APIURL), {credentials: 'include'});
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  
    }
  }

const API = { getAllRiddles, getTopScores, getAnswers, logIn, logOut, getUserInfo, updateRiddle, addRiddle, addAnswer, updateScore, updateCounter};
export default API;