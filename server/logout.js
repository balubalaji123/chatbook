const express=require('express')
const session=require('express-session')
const router=express.Router()
router.get('/',function(req,res){
    req.session.destroy(err=>{
        if(err)
        {
            res.send(JSON.stringify("error"))

        }
        else{
        res.clearCookie('sid')
        res.send(JSON.stringify("logout sucess"))
       
    }})
})
router.get('/session',function(req,res){
    if(req.session.name){
    res.send(true)
    }
    else
    res.send(false)
})
module.exports=router