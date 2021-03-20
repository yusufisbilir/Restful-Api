const http = require('http');
const {getUsers, getUser, createUser, updateUser,deleteUser} = require('./controller/userController');

http.createServer(function (req, res) {

    if(req.url === '/api/users' && req.method === 'GET'){
        getUsers(req,res);
    }
    else if(req.url.match(/\/api\/user\/([0-9]+)/) && req.method ==='GET'){
        const id = req.url.split('/')[3];
        getUser(req,res,id);
    }
    else if(req.url === '/api/user' && req.method === 'POST'){
        createUser(req,res);
    }
    else if(req.url.match(/\/api\/user\/([0-9]+)/) && req.method ==='PUT'){
        const id = req.url.split('/')[3];
        updateUser(req,res,id);
    }
    else if(req.url.match(/\/api\/user\/([0-9]+)/) && req.method ==='DELETE'){
        const id = req.url.split('/')[3];
        deleteUser(req,res,id);
    }

    else{
        res.writeHead(404,{'content-type':'application/json'});
        res.end(JSON.stringify({'message':'invalid request'}));
    };

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');