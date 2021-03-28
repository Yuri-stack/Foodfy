const express = require('express')
const routes = express.Router()

const multer = require('../../app/middlewares/multer')
const Recipes = require('../../app/controllers/RecipesController')

// Rotas para a Administração das Receitas
routes.get("/", Recipes.index)                             // Mostrar a lista de receitas
routes.get("/create", Recipes.redirectCreate)              // Mostrar formulário de nova receita
routes.get("/:id", Recipes.show)                           // Exibir detalhes de uma receita
routes.get("/:id/edit", Recipes.edit)                      // Mostrar formulário de edição de receita
routes.post("/", multer.array("photos", 5), Recipes.post)  // Cadastrar nova receita
routes.put("/", multer.array("photos", 5), Recipes.put)    // Editar uma receita
routes.delete("/", Recipes.delete)                         // Deletar uma receita

module.exports = routes