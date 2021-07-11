const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')   
const session = require('./config/session')

const server = express()

server.use(session)
server.use(express.urlencoded({ extended: true }))  // Config que permite o req.body funcionar
server.use(express.static('public'))                // Configurando para o express procurar CSS e JS na pasta Public
server.use(methodOverride('_method'))               // Essa parte identifica nas ações dos form a query String: _method, para poder sobreescrever POST e GET
server.use((req, res, next) => {                    // Colocando a Session como Variavel Global
    res.locals.session = req.session;
    next();
});

server.use(routes)                                  // Config para poder usar o arquivo de rotas
server.set("view engine", "njk")                    // Config que diz qual engine estamos usando

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true  
})

server.use(function(req, res){ res.status(404).render("layouts/not-found") })   // Tratamento para caso o algo não seja encontrado
server.listen(5000, function(){ console.log('Server is running') })             // Verificando se o server está rodando