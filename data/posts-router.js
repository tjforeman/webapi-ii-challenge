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

router.post('/',(req,res)=>{
    const newPost=req.body;
    console.log('req.body:', newPost)
    if(newPost.title && newPost.contents){
    Db
    .insert(newPost)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(err=>{
        res.status(500).json({error:err, error: "There was an error while saving the post to the database" })
    })
    }else{ res.status(400).json({errorMessage: "Please provide title and contents for the post." })
}
})

module.exports=router;