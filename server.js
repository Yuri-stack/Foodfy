const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.urlencoded({ extended: true }))  //config que permite o req.body funcionar
server.use(express.static('public'))

server.use(routes)

server.set("view engine", "njk")

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true  
})

server.use(function(req, res){ res.status(404).render("not-found") })   //tratamento para caso o algo não seja encontrado
server.listen(5000, function(){ console.log('Server is running') })     //verificando se o server está rodando