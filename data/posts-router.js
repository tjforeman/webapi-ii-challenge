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

router.get('/:id', (req,res)=>{
    Db
    .findById(req.params.id)
    .then(post =>{
        console.log(post)
        if (post.length>0){
            res.status(200).json(post)
}else{
    res.status(404).json({message: "The post with the specified ID does not exist."})
}
})
    .catch(err =>{
        res.status(500).json({error: "The post information could not be retrieved."})
    })
 })

 router.delete('/:id', (req,res)=>{
    Db
    .remove(req.params.id)
    .then(deleted =>{
        console.log(deleted)
        if (deleted){
            res.status(204).json(deleted).end()
}else{
    res.status(404).json({message: "The post with the specified ID does not exist."})
}
})
    .catch(err =>{
        res.status(500).json({error: "The post information could not be removed."})
    })
 })

 router.put('/:id',(req,res) =>{
const updatedPost=req.body
console.log('req body:', updatedPost)
if (!updatedPost.title || !updatedPost.contents){
    res.status(400).json({message:"Please provide title and contents for the user."})
}else{
Db
.update(req.params.id,updatedPost)
.then(post=>{
if(!post){
    res.status(404).json({message:"The user with the specified ID does not exist."})
}else{
    res.status(201).json(post)
}
})
.catch(err=>{
    res.status(500).json({ error: "The post information could not be modified."})
})
}
 })

module.exports=router;