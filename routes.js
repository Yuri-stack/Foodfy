const express = require('express')
const routes = express.Router()

const recipes = require('./controllers/recipes')

routes.get('/', function(req, res){ return res.redirect('/index') })
routes.get('/about', function(req,res){ return res.render('about') })

routes.get('/index', recipes.index)
routes.get('/recipes', recipes.list)
routes.get('/recipes/:id', recipes.details)

module.exports = routes