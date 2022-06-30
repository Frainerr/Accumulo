import dayjs from 'dayjs';
const APIURL = new URL('http://localhost:3001/');


async function getAllFilms() {
    // call /films

    const response = await fetch(new URL('films', APIURL), {credentials: 'include'});
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((ex) =>
        ({
            id: ex.id,
            title: ex.title,
            favorite: ex.favorite,
            rating: ex.rating,
            date: dayjs(ex.watchdate),
            user: ex.user
        }))
    } else {
        throw filmsJson;    // oggetto json fornito dal server che contiene l'errore
    }
}

async function getFavoriteFilms() {
    // call /films

    const response = await fetch(new URL('favorite', APIURL),{credentials: 'include'});
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((ex) =>
        ({
            id: ex.id,
            title: ex.title,
            favorite: ex.favorite,
            rating: ex.rating,
            date: dayjs(ex.watchdate),
            user: ex.user
        }))
    } else {
        throw filmsJson;    // oggetto json fornito dal server che contiene l'errore
    }
}

async function getBestRatedFilms() {
    // call /films

    const response = await fetch(new URL('best-rated', APIURL),{credentials: 'include'});
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((ex) =>
        ({
            id: ex.id,
            title: ex.title,
            favorite: ex.favorite,
            rating: ex.rating,
            date: dayjs(ex.watchdate),
            user: ex.user
        }))
    } else {
        throw filmsJson;    // oggetto json fornito dal server che contiene l'errore
    }
}

async function getLastMonthFilms() {
    // call /films

    const response = await fetch(new URL('seen-last-month', APIURL),{credentials: 'include'});
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((ex) =>
        ({
            id: ex.id,
            title: ex.title,
            favorite: ex.favorite,
            rating: ex.rating,
            date: dayjs(ex.watchdate),
            user: ex.user
        }))
    } else {
        throw filmsJson;    // oggetto json fornito dal server che contiene l'errore
    }
}

async function getUnseenFilms() {
    // call /films

    const response = await fetch(new URL('unseen', APIURL),{credentials: 'include'});
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((ex) =>
        ({
            id: ex.id,
            title: ex.title,
            favorite: ex.favorite,
            rating: ex.rating,
            date: dayjs(ex.watchdate),
            user: ex.user
        }))
    } else {
        throw filmsJson;    // oggetto json fornito dal server che contiene l'errore
    }
}

function addFilm(film) {
    return new Promise((resolve, reject) => {
        fetch(new URL('createFilm', APIURL),{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: film.title, favorite: film.favorite, watchdate: film.watchdate.format('YYYY-MM-DD'), rating: film.rating, user: 1 }),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((message) => { reject(message); }) // error message in the response body
                    .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
}

function UpdateFilm(film) {
    return new Promise((resolve, reject) => {
        fetch(new URL('updateFilm/' + film.id, APIURL), {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate.format('YYYY-MM-DD'), rating: film.rating })
        }).then((response) => {
            if (response.ok)
                resolve(null);
            else {
                response.json()
                    .then((obj) => { reject(obj); })    // error message in the response body
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) })
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
    const response = await fetch(new URL('sessions/current', APIURL), { credentials: 'include' });
    const userInfo = await response.json();
    if (response.ok) {
        return userInfo;
    } else {
        throw userInfo;  // an object with the error coming from the server
    }
}

const API = { getAllFilms, getFavoriteFilms, getBestRatedFilms, getLastMonthFilms, getUnseenFilms, UpdateFilm, addFilm, logIn, logOut, getUserInfo};
export default API;