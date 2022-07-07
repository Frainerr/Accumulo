'use strict'

const sqlite = require('sqlite3');
// open the database
const db = new sqlite.Database('indovinelli.sqlite', (err) => {
    if (err) throw err;
});

exports.getRiddles = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM riddles';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const riddles = rows.map((e) => ({
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
            }));
            resolve(riddles);
        });
    });
};

exports.getTopScores = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM (SELECT user,name,score, DENSE_RANK() OVER(ORDER BY score DESC) as rank FROM scores) AS tab WHERE rank<4 ';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const scores = rows.map((e) => ({
                user: e.user,
                name: e.name,
                score: e.score,
                rank: e.rank
            }));
            resolve(scores);
        });
    });
};

exports.getAnswers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM answers';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const answers = rows.map((e) => ({
                user: e.user,
                question: e.question,
                answer: e.answer
            }));
            resolve(answers);
        });
    });
};


exports.updateRiddle = (riddle) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE riddles SET state=?, winner=?WHERE user=? AND question=?';
        db.run(sql, [riddle.state, riddle.winner, riddle.user, riddle.question], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO answers(user,question,answer) VALUES(?, ?, ?)';
        db.run(sql, [answer.user, answer.question, answer.answer], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.updateScore = (score) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE scores SET score= score + ? WHERE user=?';
        db.run(sql, [score.score,score.user], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.updateCounter = (id,counter) =>{
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE riddles SET counter = ?-1 WHERE id=?';
        db.run(sql, [counter,id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

exports.addRiddle = (riddle) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO riddles(user,question,difficulty,duration,solution,advice1,advice2,state,winner,counter) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [riddle.user,riddle.question,riddle.difficulty,riddle.duration,riddle.solution,riddle.advice1,riddle.advice2,riddle.state,riddle.winner,riddle.counter], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};