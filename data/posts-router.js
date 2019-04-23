const express=require('express')

const Db = require('./db.js')

const router = express.Router()

router.get('/',(req,res)=>{
    Db
    .find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        res.status(500).json({error:err, message:"The posts information could not be retrieved."})
    })
})

module.exports=router;