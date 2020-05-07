const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const dataRecipes = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true  
})

server.get("/", function(req, res){
    res.render('index', {dataRecipes})
})

server.get("/about", function(req, res){
    res.render('about')
})

server.get("/recipes", function(req, res){
    return res.render('recipes', {dataRecipes : dataRecipes})
})

server.get("/recipes/:id", function(req, res){
    const index = req.params.id;
    // const recipe = dataRecipes[index]

    const recipe = dataRecipes.find(function(recipe){
        if(recipe.id == index){
            return recipe
        } 
    })

    return res.render('recipe', {recipe : recipe})

})

server.use(function(req, res){
    res.send("Não encontrou")
    // res.status(404).render("not-found")
})

server.listen(5000, function(){
    console.log('Server is running')
})