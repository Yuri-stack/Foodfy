const express = require('express')
const routes = express.Router()

const multer = require('./app/middlewares/multer')
const public = require('./app/controllers/public')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

// Rotas Públicas
routes.get('/', public.redirectIndex)           // Redirecionar para a Pag. Index
routes.get('/about', public.redirectAbout)      // Redirecionar para a Pag. About
routes.get('/index', public.index)              // Mostrar a lista de receitas no Index
routes.get('/chefs', public.listChef)           // Mostrar a lista de chefs
routes.get('/recipes', public.listRecipes)      // Mostrar a lista de receitas
routes.get('/recipes/:id', public.showRecipe)   // Exibir detalhes de uma receita

// Rotas para a Administração das Receitas
routes.get("/admin/recipes", recipes.index)                             // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.redirectCreate)             // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show)                          // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit)                     // Mostrar formulário de edição de receita
routes.post("/admin/recipes", multer.array("photos", 5), recipes.post)  // Cadastrar nova receita
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put)    // Editar uma receita
routes.delete("/admin/recipes", recipes.delete)                         // Deletar uma receita

// Rotas para a Administração dos Chefs
routes.get("/admin/chefs", chefs.index)                                 // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.redirectCreate)                 // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", chefs.show)                              // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", chefs.edit)                         // Mostrar formulário de edição de chef
routes.post("/admin/chefs", multer.single("photo"), chefs.post)         // Cadastrar um novo chef
routes.put('/admin/chefs', multer.single("photo"), chefs.put)           // Editar um chef
routes.delete("/admin/chefs", chefs.delete)                             // Deletar um chef

module.exports = routes