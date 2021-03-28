const express = require('express')
const routes = express.Router()

const multer = require('../../app/middlewares/multer')

const Chefs = require('../../app/controllers/ChefsController')

// Rotas para a Administração dos Chefs
routes.get("/", Chefs.index)                                // Mostrar a lista de Chefs
routes.get("/create", Chefs.redirectCreate)                 // Mostrar formulário de novo chef
routes.get("/:id", Chefs.show)                              // Exibir detalhes de um chef
routes.get("/:id/edit", Chefs.edit)                         // Mostrar formulário de edição de chef
routes.post("/", multer.array("photos", 1), Chefs.post)     // Cadastrar um novo chef
routes.put('/', multer.array("photos", 1), Chefs.put)       // Editar um chef
routes.delete("/", Chefs.delete)                            // Deletar um chef

module.exports = routes