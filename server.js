const express=require('express')
const session=require('express-session')
const app=express()
const register=require('./server/register')
const profile=require('./server/profile')
const login=require('./server/login')
const logout=require('./server/logout')
const friend=require('./server/friends')
const messages=require('./server/messanger')
const path=require('path')
const suggestions=require('./server/suggestions')
const bodyparser=require('body-parser')
var server = require('http').Server(app);
var io = require('socket.io')(server);
const multer=require('multer')
app.use(express.static(path.join(__dirname,'dist/chatbook1')))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var chat=''
var id1
var users={}
var d=null
var upload
var usersdetails={}
// sessions
var sess={
    name:'sid',
    resave:false,
    saveUninitialized:true,
    secret:'a',
    cookie:{
      maxAge:100*60*69*2,
      sameSite:false,
      secure:false,
      httpOnly:false,
    }  
  }
  app.use(session(sess))
  app.use('/register',register)
  app.use('/login',login)
  app.use('/logout',logout)
  app.use('/suggestions',suggestions)
  app.use('/profile',profile)
  app.use('/friend',friend)
  app.use('/messages',messages)
var store=multer.diskStorage({
destination:function(req,file,cb){
        cb(null,'./src/assets/uploads1')
    },
    filename:function(req,file,cb){
        // console.log("c"+JSON.stringify(file))
        function makeString() {
            let outString = '';
            let inOptions= 'abcdefghijklmnopqrstuvwxyz';
            for (let i = 0; i < 26; i++) {
              outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
            }
            return outString;
          }
          const rand=()=>{
            d=makeString()+".jpg"
            // console.log("d",d)
          }
        rand()
        cb(null,d)
    }
});
var checkuser=[]
 upload=multer({storage:store})
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("chat");
io.on('connection',(socket)=>{
     chat=dbo.collection('chat')
    socket.on('join',function(data){
        id1=socket.join("room")
        users[data.mail]=id1
        socket.broadcast.to("room").emit('new user',{name:data.name,message:'joined the room'})
        chat.find().sort({_id:-1}).toArray(function(err,res){
            if(err)
            throw err
            socket.emit('output',res)
        })
    })
    socket.on('message',function(data){
        var c={image:d,name:data.name,message:data.message,likes:0,comment:[],likednames:[],userimage:data.userimage,mail:data.mail}
        // d=null
        dbo.collection("chat").insertOne(c, function(err, res) { 
            if(err) throw err
            d=null
        })
        chat.find().sort({_id:-1}).toArray(function(err,res){
          if(err)
          throw err
        io.in("room").emit('output',res);  
      })
    })
socket.on('like',function(data){
query={name:data.name,message:data.message,image:data.image}
    dbo.collection("chat").find(query,{likes:1}).toArray(function(err,result){
        if(err)
        console.log(err)
        else
        likess=result[0].likes
        likess=likess+1;
        checkuser=result[0].likednames
        checkuser.push(data.username)
    var newtutorvalues = { $set: {likes:likess,likednames:checkuser} };
    dbo.collection("chat").updateOne(query, newtutorvalues, function(err, res) {
        if (err) throw err;
      });
      chat.find().sort({_id:-1}).toArray(function(err,res){
        if(err)
        throw err    
        socket.emit('output1',res)
    })
})})
socket.on('comment',function(data){
    var commentarray=[]
    query={name:data.name,message:data.message}
    // for comments insertion
    query1={name:data.username,comment:data.comment}
        dbo.collection("chat").find(query,{likes:1}).toArray(function(err,result){
            if(err)
            console.log(err)
            else
            commentarray=result[0].comment
            commentarray.push(query1)
            // for increase likes in tutors account
        var newtutorvalues = { $set: {comment:commentarray} };
        dbo.collection("chat").updateOne(query, newtutorvalues, function(err, res) {
            if (err) throw err;
          });
          chat.find().sort({_id:-1}).toArray(function(err,res){
            if(err)
            throw err
            socket.emit('output2',res)
        })
    })})
socket.on('type',function(data){
    socket.broadcast.to("room").emit('typing',data)
})
// for personal messages
socket.on('personalmessage',function(data){
  data.tomail.length>data.sendermail.length?finalhash=data.tomail+data.sendermail:finalhash=data.sendermail+data.tomail
  var query={hashvalue:finalhash}
  dbo.collection('messages').find(query).toArray(function(err,res){
    if(err)throw err
    // if already chat exists
    else if(res.length){
      result=[]
     result=res[0].messages
     result.push({mail:data.sendermail,message:data.message})
     var newvalues = { $set:{messages:result}};
     dbo.collection("messages").updateOne(query, newvalues, function(err, res2) {
         if (err) throw err;
         // to emit after the chat
    dbo.collection('messages').find(query).toArray(function(err,response){
      if(err)throw err
      // if user in online
      if(data.tomail in users){
      users[data.tomail].emit('new_msg',response[0])}
      users[data.sendermail].emit('new_msg',response[0])
    })
     }) }
    // if chat not exists
    else{
      var insertquery={hashvalue:finalhash,messages:[{mail:data.sendermail,message:data.message}]}
      dbo.collection('messages').insertOne(insertquery,function(err,res){
        if(err)throw err
        // to emit after the chat
    dbo.collection('messages').find(query).toArray(function(err,response){
      if(err)throw err
      if(data.tomail in users){
      users[data.tomail].emit('new_msg',response[0])}
      users[data.sendermail].emit('new_msg',response[0])
    })
      })
    }
  })
})
// to handle if user left the room
socket.on('leave', function(data){
  socket.leave('room');
  delete users[data.mail]
});
})

});
app.post('/image',upload.single('file'),function(req,res){
    res.send(true)
})
app.get('/imageget',function(req,res){
    name=req.query['name']
    address=__dirname+'/src/assets/uploads1/'+name
    res.sendFile(address)
  })
  app.get('/name',function(req,res){
    res.send(JSON.stringify(req.session.name))
  })
  // for image url
  app.get('/imageurl',function(req,res){
    res.send(JSON.stringify(req.session.image))
  })
  // for message sender image
  app.get('/imageget1',function(req,res){
    name=req.query['name']
    address=__dirname+'/server/uploads1/'+name
    res.sendFile(address)
  })
  // to send user mail
  app.get('/usermail',function(req,res){
    res.send(JSON.stringify(req.session.mail))
  })
  // wildcart routing in backend
  app.get('/*',function(req,res){
    res.sendFile(__dirname+'/dist/chatbook1/index.html')
  }) 
server.listen(3000)
