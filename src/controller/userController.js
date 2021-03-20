const User = require('../models/userModel.js');
const {getPostdata} = require('../utils')

async function getUsers(req,res){
    try {
        const users = await User.findAll()

        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error);
    };
};


async function getUser(req,res,id){
    try {
        const user = await User.findById(id);
        if(!user){
            res.writeHead(404,{"content-type":"application/json"});
            res.end(JSON.stringify({'message':'user not found'}))
            
        }else{
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(user))
        }
        
    } catch (error) {
        console.log(error);
    };
};

async function createUser(req,res){
    try {
        const body = await getPostdata(req);
        const {name,email} = JSON.parse(body)
        
        const newuser = {
            name:name,
            email:email
        }
        const newUser = await User.create(newuser)
        res.writeHead(201,{"content-type":"application/json"});
        return res.end(JSON.stringify(newUser));
        
    } catch (error) {
        console.log(error);
    }
}


async function updateUser(req,res,id){
    try {
        const user = await User.findById(id);
        if(!user){
            res.writeHead(404,{"content-type":"application/json"});
            res.end(JSON.stringify({'message':'user not found'}))
            
        }else{
            const body = await getPostdata(req);
            const {name,email} = JSON.parse(body)
            
            const userdata = {
                name:name || user.name,
                email:email || user.email
            }

            const updateUser = await User.update(id,userdata)
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(updateUser))
        }
        
    } catch (error) {
        console.log(error);
    };
};

async function deleteUser(req,res,id){
    try {
        const user = await User.findById(id);
        if(!user){
            res.writeHead(404,{"content-type":"application/json"});
            res.end(JSON.stringify({'message':'user not found'}))
            
        }else{
            await User.remove(id);
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify({'message':`id:${id} deleted`}))
        }
        
    } catch (error) {
        console.log(error);
    };
};



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};