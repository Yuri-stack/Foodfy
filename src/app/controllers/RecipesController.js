const { unlinkSync } = require('fs');

const Recipe = require('../models/Recipe')
const File = require('../models/File')

const LoadRecipeService = require('../services/LoadRecipeService')

module.exports = { 

    //Função para LISTAR as receitas no Index
    async index(req, res){
        try {
            const recipes = await LoadRecipeService.load('recipes')

            return res.render('admin/recipes/index', { recipes })

        } catch (error) {
            console.error(error)
            return res.render('admin/recipes/index', {
                error: "Houve um erro ao carregar as receitas, tente novamente"
            })
        }
    },

    //Função para REDIRECIONAR para a pag de Create
    async redirectCreate(req, res){

        const results = await Recipe.chefSelectOptions()
        const chefNames = results.rows
        
        return res.render('admin/recipes/create', { chefNames })
    },

    //Função para CADASTRAR uma nova receita
    async post(req, res){
        try {
            const { filename, path } = req.files[0]
            const { userId } = req.session
            const { title, ingredients, preparation, information, chef } = req.body
            
            const fileId = await File.create({ name: filename, path })
            const recipeId = await Recipe.create({ title, ingredients, preparation, information, chef_id: chef, user_id: userId })

            await Recipe.createImageRecipe(recipeId,fileId)

            return res.redirect(`/admin/recipes/${ recipeId }`)
            
        } catch (error) {
            console.error(error)
            return res.render('admin/recipes/index', {
                error: "Houve um erro na criação da Receita, tente novamente"
            })
        }
    },

    //Função para MOSTRAR os detalhes da receitas
    async show(req, res){
        try {
            const { id } = req.params
            const recipe = await LoadRecipeService.load('recipe', id)

            if(!recipe){
                return res.render('admin/recipes/details', {
                    error: "Receita não encontrada, tente novamente mais tarde"
                })
            }

            return res.render('admin/recipes/details', { recipe })

        } catch (error) {
            console.error(error)
            return res.render('admin/recipes/details', {
                error: "Houve um erro na apresentação da Receita, tente novamente mais tarde"
            })
        }
    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    async edit(req, res){
        try {
            const { id } = req.params
            const recipe = await LoadRecipeService.load('recipe', id)
            
            if(!recipe){
                return res.render('admin/recipe/details', {
                    error: "Receita não encontrada, tente novamente mais tarde"
                })
            }

            //Carrega os nomes dos Chefs
            const results = await Recipe.chefSelectOptions()
            const chefNames = results.rows

            return res.render('admin/recipes/edit', { recipe, chefNames })

        } catch (error) {
            console.error(error)
            return res.render('admin/recipes/details', {
                error: "Houve um erro na edição da Receita, tente novamente mais tarde"
            })
        }
    },

    //Função para ATUALIZAR as receitas
    async put(req, res){
        try {
            const { id, title, ingredients, preparation, information, chef, removed_file } = req.body

            // Lógica para SALVAR as novas imagens carregadas durante a Atualização
            if(req.files.length != 0){

                // Lógica para verificar se já existem 5 imagens cadastradas
                const oldFiles = await Recipe.findImageRecipe(id)
                const totalFiles = oldFiles.length + req.files.length

                if(totalFiles <= 5){
                    const newFilesPromise = req.files.map(async file => {
                        const fileId = await File.create({
                            name: file.filename,
                            path: file.path
                        })

                        await Recipe.createImageRecipe(id, fileId)

                    })

                    await Promise.all(newFilesPromise)
                }
            }

            // Lógica para EXCLUIR as imagens do BD
            if(removed_file){                                           //Ex: o campo envia 1,2,3
                const removedFile = req.body.removed_file.split(",")    //aqui ele transformar em array [1,2,3,]
                const lastIndex = removedFile.length - 1   
                removedFile.splice(lastIndex, 1)                        //aqui fica desse jeito [1,2,3]

                const removedFilePromise = removedFile.map(async id => {
                    const file = await File.findOne({ where: { id } })
                    File.delete(id)
                    unlinkSync(file.path);
                })

                await Promise.all(removedFilePromise);
            } 

            await Recipe.update(id, { title, ingredients, preparation, information, chef_id: chef })

            return res.redirect(`/admin/recipes/${id}`)

        } catch (error) {
            console.error(error)
            return res.render('admin/recipes/details', {
                error: "Houve um erro na atualização da Receita, tente novamente mais tarde"
            })
        }
    },

    //Função para APAGAR as receitas
    async delete(req, res){
        try {
            const { id } = req.body;
            const files = await Recipe.findImageRecipe(id);

            const removedFilePromise =  files.map(file => {
                File.delete({ id: file.file_id })
                unlinkSync(file.path)
            })

            await Promise.all(removedFilePromise)
            await Recipe.delete(id)

            return res.render('admin/recipes/index')

        } catch (error) {
            console.error(error)
            return res.render('admin/recipes/details', {
                error: "Houve um erro ao excluir a Receita, tente novamente mais tarde"
            })
        }
    }
}