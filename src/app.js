const express = require('express')
const Post = require('./models/Posts.js')

const app = express()

//Configurar variaveis do ambiente do ambiente
require('dotenv').config()

//Liberar a api para uso
const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT

//Midleware(executa quando usar as rotas)
app.use(express.json())

app.post('/create_post', async (req, res) => {
    try{
        const {title, description, content} = req.body
        //Retorna diretamente do banco do dados
        const post = await Post.create({title, description, content})
        res.send(post)
    } catch(err) {
        res.status(400).send(err)
    }
})

app.get('/list_posts', async (req, res) => {
    try{
        //Seria interessante criar uma forma de paginação
        const posts = await Post.find()
        res.send({posts})
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/show_post/:postId', async (req, res) => {
    try{
        const {postId} = req.params
        const post = await Post.findById(postId)
        res.send({post})
    }catch(err){
        res.status(400).send(err)
    }
})

app.patch('/update_post/:postId', async (req, res) => {
    try {
        const {postId} = req.params
        const {title, description, content} =  req.body

        const postUpdated = await Post.findByIdAndUpdate(postId, {title, description, content},{new: true})
        res.send({postUpdated})
    } catch(err){
        res.status(400).send(err)
    }
})

app.delete('/delete_post/:postId', async (req, res) => {
    try{
        const {postId} = req.params

        const postDeleted = await Post.findByIdAndDelete(postId)
        res.send(postDeleted)
    }catch(err){
        res.status(400).send(err)
    }
})

app.listen(PORT, () => {
    //Aparecerá quando o server for iniciado
    console.log(`Server running on port: ${PORT}`)
})