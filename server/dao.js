'use strict';

const sqlite = require('sqlite3');
const dayjs = require("dayjs");
// open the database
const db = new sqlite.Database('films.sqlite',(err) => {
    if(err) throw err;
});

// get all films
exports.listFilms = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM films';
        db.all(sql,[],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const films = rows.map((e) => ({
                id: e.id,
                title: e.title,
                favorite: e.favorite,
                watchdate: e.watchdate,
                rating: e.rating,
                user: e.user
            }));
            resolve(films);
        });
    });
};

// get favorite films
exports.getFavoriteFilms = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM films WHERE favorite=1';
        db.all(sql,[],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const films = rows.map((e) => ({
                id: e.id,
                title: e.title,
                favorite: e.favorite,
                watchdate: e.watchdate,
                rating: e.rating,
                user: e.user
            }));
            resolve(films);
        });
    });
};


// get best rated films
exports.getBestRatedFilms = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM films WHERE rating=5';
        db.all(sql,[],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const films = rows.map((e) => ({
                id: e.id,
                title: e.title,
                favorite: e.favorite,
                watchdate: e.watchdate,
                rating: e.rating,
                user: e.user
            }));
            resolve(films);
        });
    });
};

// get films that has been seen last month
exports.getLastMonthFilms = () => {
    return new Promise((resolve,reject) => {
        const current = dayjs().format("YYYY/MM/DD");
        var lastDate = dayjs().subtract(30,'day').format("YYYY/MM/DD");
        const sql = 'SELECT * FROM films WHERE watchdate>=? AND watchdate<=?';
        db.all(sql,[lastDate,current],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const films = rows.map((e) => ({
                id: e.id,
                title: e.title,
                favorite: e.favorite,
                watchdate: e.watchdate,
                rating: e.rating,
                user: e.user
            }));
            resolve(films);
        });
    });
};

// get unseen films
exports.getUnseenFilms = () => {
    return new Promise((resolve,reject) => {
        const current = new Date();
        const sql = 'SELECT * FROM films WHERE rating=0';
        db.all(sql,[],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const films = rows.map((e) => ({
                id: e.id,
                title: e.title,
                favorite: e.favorite,
                watchdate: e.watchdate,
                rating: e.rating,
                user: e.user
            }));
            resolve(films);
        });
    });
};

// get film by id
exports.FilmById = (id) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM films WHERE id =?';
        db.all(sql,[id],(err,row) => {
            if(err){
                reject(err);
                return;
            }
            if(row == undefined){
                resolve({error: 'Film not found.'});
            }else{
                const film =  row.map((e) => ({
                    id: e.id,
                    title: e.title,
                    favorite: e.favorite,
                    watchdate: e.watchdate,
                    rating: e.rating,
                    user: e.user
                }));
                resolve(film);
            }
        });
    });
};

exports.countFilms = () =>{
    const films = this.listFilms();
    i=0;
    for (l in films){
        i++;
    }
    return i;
}

// create a new film
exports.createFilm = (film) => {
    return new Promise((resolve,reject) =>
    {   
        const sql1 = 'INSERT INTO films (id,title, favorite, watchdate, rating, user) VALUES(?,?,DATE(?),?,?)';
        db.run(sql,[film.id,film.title,film.favorite,film.watchdate,film.rating,film.user], function(err){
            if(err){
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// update an existing exam
exports.updateFilm = (film) => {
    return new Promise((resolve,reject) =>
    {
        const sql = 'UPDATE films SET title=?,favorite=?,watchdate=DATE(?),rating=?, user=? WHERE id=?';
        db.run(sql,[film.title,film.favorite,film.watchdate,film.rating,film.user,film.id], function(err){
            if(err){
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// Set favorite/unfavorite film
exports.RemarkFilm = (film) => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM films WHERE id =?';
        db.all(sql,[film.id],(err,row) => {
            if(err){
                reject(err);
                return;
            }
            if(row == undefined){
                resolve({error: 'Film not found.'});
            }else{
                if(row.favorite==1){
                    const favorite = 0;
                }else{
                    const favorite = 1;
                }
                const sql = 'UPDATE films SET favorite=? WHERE id=?';
                db.run(sql,[favorite,film.id], function(err){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(this.lastID);
                });
            }
        });
    });
};

// delete an existing film
exports.deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM exam WHERE id = ?';
      db.run(sql, [id], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve(null);
      });
    });
  }