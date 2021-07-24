const express = require('express')
const routes = express.Router()

const multer = require('../../app/middlewares/multer')
const { onlyUsers, isAdmin } = require('../../app/middlewares/session')

const Recipes = require('../../app/controllers/RecipesController')

// Rotas para a Administração das Receitas
routes.get('/myRecipes', onlyUsers, Recipes.userRecipes)
routes.get("/", onlyUsers, isAdmin, Recipes.index)                      // Mostrar a lista de receitas
routes.get("/create", onlyUsers, Recipes.redirectCreate)                // Mostrar formulário de nova receita
routes.get("/:id", onlyUsers, Recipes.show)                             // Exibir detalhes de uma receita
routes.get("/:id/edit", onlyUsers, Recipes.edit)                        // Mostrar formulário de edição de receita
routes.post("/", onlyUsers,  multer.array("photos", 5), Recipes.post)   // Cadastrar nova receita
routes.put("/", onlyUsers,  multer.array("photos", 5), Recipes.put)     // Editar uma receita
routes.delete("/", onlyUsers, Recipes.delete)                           // Deletar uma receita

module.exports = routes