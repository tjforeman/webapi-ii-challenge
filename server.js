const express= require('express')

const postsRouter= require('./data/posts-router.js')

const server= express();

server.use(express.json());

server.get('/', (req,res)=>{
    res.send(`hello world`)
})

server.use('/api/posts', postsRouter)

module.exports=server