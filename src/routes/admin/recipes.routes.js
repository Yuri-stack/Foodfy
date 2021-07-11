const express = require('express')
const routes = express.Router()

const multer = require('../../app/middlewares/multer')
const { onlyUsers, isAdmin } = require('../../app/middlewares/session')

const Recipes = require('../../app/controllers/RecipesController')

// Rotas para a Administração das Receitas
routes.get("/", onlyUsers, isAdmin, Recipes.index)                             // Mostrar a lista de receitas
routes.get("/create", onlyUsers, isAdmin, Recipes.redirectCreate)              // Mostrar formulário de nova receita
routes.get("/:id", onlyUsers, isAdmin, Recipes.show)                           // Exibir detalhes de uma receita
routes.get("/:id/edit", onlyUsers, isAdmin, Recipes.edit)                      // Mostrar formulário de edição de receita
routes.post("/", onlyUsers, isAdmin, multer.array("photos", 5), Recipes.post)  // Cadastrar nova receita
routes.put("/", onlyUsers, isAdmin, multer.array("photos", 5), Recipes.put)    // Editar uma receita
routes.delete("/", onlyUsers, isAdmin, Recipes.delete)                         // Deletar uma receita

module.exports = routes