const express=require('express')
const router=express.Router()
const session=require('express-session')
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo=''
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   dbo = db.db("chat");
});
var check=Math.random()
var usermail
 var username1
  var random=[]
router.post('/',function(req,res){
    var c=Math.floor(100000+ Math.random() * 900000);
    random.push(c)

    console.log(JSON.stringify(req.body))
    username1=req.body.name
    usermail=req.body.mail.toLowerCase()
    userpassword=req.body.password
    myobj={usermail:usermail}
    dbo.collection("customers").find(myobj,{$exists:true}).toArray(function(err, result) {
      if (err) throw err;
      if(result.length){
      res.send(JSON.stringify("useralreadyexists"))
    }
      else{
          console.log("in mail")
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wolvesofthevalleysspardha@gmail.com',
          pass: 'fmt@12345'
        }
      });
      var mailOptions = {
        from: 'find my tutor',
        to: usermail,
        subject: 'account conformation',
      html:'welcome to chat book ypur otp is   '+c
      };  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent for general login');
        }
      });
      res.send(JSON.stringify("confirm"))
    }});   
})
router.post('/otp',function(req,res){
    c=req.body.otp1
    check=0
    for(var i=0;i<random.length;i++){
        if(random[i]==c)
        check=1
    }
    if(check==1){
        req.session.name=username1
        myobj={username:username1,usermail:usermail,userpassword:userpassword}
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          
          })
       
    res.send(JSON.stringify("ok"))}
    else
    res.send(JSON.stringify("not ok"))
})

module.exports=router