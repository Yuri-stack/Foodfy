const express = require('express')
const routes = express.Router() 

const multer = require('../../app/middlewares/multer')
const { onlyUsers } = require('../../app/middlewares/session')

const Chefs = require('../../app/controllers/ChefsController')

// Rotas para a Administração dos Chefs
routes.get("/", onlyUsers, Chefs.index)                                // Mostrar a lista de Chefs
routes.get("/create", onlyUsers, Chefs.redirectCreate)                 // Mostrar formulário de novo chef
routes.get("/:id", onlyUsers, Chefs.show)                              // Exibir detalhes de um chef
routes.get("/:id/edit", onlyUsers, Chefs.edit)                         // Mostrar formulário de edição de chef
routes.post("/", onlyUsers, multer.array("photos", 1), Chefs.post)     // Cadastrar um novo chef
routes.put('/', onlyUsers, multer.array("photos", 1), Chefs.put)       // Editar um chef
routes.delete("/", onlyUsers, Chefs.delete)                            // Deletar um chef

module.exports = routes