const express = require('express')
const routes = express.Router()

const Public = require('../../app/controllers/PublicController')

// Rotas Públicas
routes.get('/', Public.redirectIndex)           // Redirecionar para a Pag. Index
routes.get('/about', Public.redirectAbout)      // Redirecionar para a Pag. About
routes.get('/index', Public.index)              // Mostrar a lista de receitas no Index
routes.get('/chefs', Public.listChef)           // Mostrar a lista de chefs
routes.get('/recipes', Public.listRecipes)      // Mostrar a lista de receitas
routes.get('/recipes/:id', Public.showRecipe)   // Exibir detalhes de uma receita

module.exports = routes