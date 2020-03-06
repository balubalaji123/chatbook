const express=require('express')
const session=require('express-session')
const app=express()
const register=require('./server/register')
const login=require('./server/login')
const logout=require('./server/logout')
const path=require('path')
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
var d=null
var upload
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
      
        socket.join("room");
        socket.broadcast.to("room").emit('new user',{name:data.name,message:'joined the room'})
        chat.find().sort({_id:-1}).toArray(function(err,res){
            if(err)
            throw err
            socket.emit('output',res)
        })
    })
    socket.on('message',function(data){
        var c={image:d,name:data.name,message:data.message,likes:0,comment:[],likednames:[],userimage:data.userimage}
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
socket.on('leave', function(data){
  socket.broadcast.to('room').emit('left room', {name:data.name, message:'has left this room.'});
  socket.leave('room');
});
})});
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
  // wildcart routing in backend
  app.get('/*',function(req,res){
    res.sendFile(__dirname+'/dist/chatbook1/index.html')
  }) 
server.listen(3000)
