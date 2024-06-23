// core modules
// http= lounch server
// https= lounch ssl server
// ,fs,path,od








//CREATE SERVER

const { AsyncLocalStorage } = require('async_hooks');
const { log } = require('console');
const http = require('http'); //golbal module


// 1st way
// function request_lister(request,response){

// }
// http.createServer(request_lister);   //IMP creating server

//2nd way

// http.createServer(function(req,res){

// })

//OR

const server=http.createServer((req,res)=>
{
  console.log(req);
  //process.exit() => to end the server
})

//now it keep on looping untill server get start  Also called event loop
server.listen(3000);
//if i open the localhost:3000 consle.log(req) gonna print objects
