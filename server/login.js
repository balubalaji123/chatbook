const express=require('express')
const router=express.Router()
var MongoClient = require('mongodb').MongoClient;
var usermail
var userpassword
var url = "mongodb://localhost:27017/";
var dbo=''
// check for existing data
var checkuser
MongoClient.connect(url, function(err, db) { 
  if (err) throw err;
   dbo = db.db("chat");
});
router.post('/',function(req,res){
    // checkuser=[]
usermail=req.body.mail
userpassword=req.body.password
c={usermail:usermail}
dbo.collection("customers").find(c,{username:1,userpassword:1},{$exists:true}).toArray(function(err, result) {
    if (err) throw err;
    checkuser=result
    if(result.length){
      if(result[0].userpassword!=userpassword){
          res.send(JSON.stringify("passwordwrong")) //password doesn't match
          }
         else{
      req.session.name=result[0].username

    res.send(JSON.stringify("display chats"))
  }}
    else{
    res.send(JSON.stringify("not exists"))
  }});
});
module.exports=router