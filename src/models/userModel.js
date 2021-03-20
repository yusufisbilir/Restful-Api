let users = require('../data/usersDB.json'); //database
const {v4:uuidv4} = require('uuid');
const {writeFile} = require('../utils');

function findAll(){
    return new Promise((resolve, reject) => {
        resolve(users)
    });
};

function findById(id){
    return new Promise((resolve, reject) => {
        const user = users.find((u)=>u.id == id);
        resolve(user)
    });
};

function create(user){
    return new Promise((resolve, reject) => {
        const newUser  = {id:uuidv4(),...user};
        users.push(newUser);
        writeFile('./data/usersDB.json',users)
        resolve(newUser);
    });
};

function update(id,user){
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u)=>{u.id === id});
        users[index] = {id,...user}
        
        writeFile('./data/usersDB.json',users)
        resolve(users[index]);  
    });
};

function remove(id){
    return new Promise((resolve, reject) => {
        users = users.filter((u)=>u.id!=id);
        writeFile('./data/usersDB.json',users);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}