const express = require('express')
const routes = express.Router()

const public = require('./app/controllers/public')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

// Rotas Públicas
routes.get('/', function(req, res){ return res.redirect('/index') })
routes.get('/about', function(req,res){ return res.render('public/about') })
routes.get('/index', public.index)
routes.get('/recipes', public.list)
routes.get('/recipes/:id', public.show)

// Rotas para a Administração das Receitas
routes.get("/admin/recipes", recipes.index);                    // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.redirectCreate);    // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show);                 // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit);            // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post);                    // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put);                      // Editar uma receita
routes.delete("/admin/recipes", recipes.delete);                // Deletar uma receita

// Rotas para a Administração das Receitas
routes.get("/admin/chefs", chefs.index);                    // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.redirectCreate);    // Mostrar formulário de novo chef
routes.post("/admin/chefs", chefs.post);                    // Cadastrar um novo chef

module.exports = routes