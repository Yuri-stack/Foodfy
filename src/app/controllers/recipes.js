const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFile = require('../models/RecipeFiles')

module.exports = { 

    //Função para LISTAR as receitas no Index da Administração
    async index(req, res){

        const results = await Recipe.all()
        const recipes = results.rows

        async function getImage(recipeID){
            let results = await Recipe.recipeFiles(recipeID)
            const files = results.rows.map(file => 
                `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`    
            )
            return files[0]
        }

        const recipesPromises = recipes.map(async recipe => {
            recipe.src = await getImage(recipe.id)
            return recipe
        })

        const recipeAll = await Promise.all(recipesPromises)
        
        return res.render('admin/recipes/index', { recipes : recipeAll })
    },

    //Função para REDIRECIONAR para a pag de Create
    async redirectCreate(req, res){

        const results = await Recipe.chefSelectOptions()
        const options = results.rows
        
        return res.render('admin/recipes/create', { chefNames : options })
    },

    //Função para CADASTRAR uma nova receita
    async post(req, res){

        const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

        for(key of keys){                           
            if(req.body[key] == ""){                
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        if(req.files.length == 0){
            return res.send('Please, send at least one image')
        }

        const filesPromise = req.files.map(file => File.create({...file}))
        let results = await Promise.all(filesPromise)
        const fileID = results[0].rows[0].id

        const recipe = await Recipe.create(req.body)
        const recipeID = recipe.rows[0].id

        await RecipeFile.create(recipeID,fileID)
        
        return res.redirect(`/admin/recipes/${ recipeID }`)
    },

    //Função para MOSTRAR os detalhes da receitas
    async show(req, res){

        const { id } = req.params

        let results = await Recipe.find(id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Recipe not found / Receita não encontrada")

        results = await Recipe.recipeFiles(id)
        const files = results.rows.map(file => ({
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`  
        }))

        return res.render('admin/recipes/details', { recipe, files })   
    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    async edit(req, res){

        const { id } = req.params

        let results = await Recipe.find(id)
        const recipe = results.rows[0]
        
        if(!recipe) return res.send("Recipe not found")

        //Carrega as imagens das Receitas
        results = await Recipe.recipeFiles(id)
        let files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        //Carrega os nomes dos Chefs
        results = await Recipe.chefSelectOptions()
        const options = results.rows

        return res.render('admin/recipes/edit', { recipe, chefNames : options, files })

    },

    //Função para ATUALIZAR as receitas
    async put(req, res){

        const keys = Object.keys(req.body).pop()    //Aqui eu pego todos os campos(keys) do formulário de receitas, exceto o último que é opcional

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Por favor, preencha todos os campos!") 
            }
        }

        // Lógica para EXCLUIR as imagens do BD
        if(req.body.removed_file){
                                                                    //Ex: o campo envia 1,2,3
            const removedFile = req.body.removed_file.split(",")    //aqui ele transformar em array [1,2,3,]
            const lastIndex = removedFile.length - 1                
            removedFile.splice(lastIndex, 1)                        //aqui fica desse jeito [1,2,3]

            const removedFilePromises = removedFile.map(id => File.delete(id))

            await Promise.all(removedFilePromises)
        }

        // Lógica para SALVAR as novas imagens carregadas durante a Atualização
        if(req.files.length != 0){

            // Lógica para verificar se já existem 5 imagens cadastradas
            const oldFiles = await Recipe.recipeFiles(req.body.id)
            const totalFiles = oldFiles.rows.length + req.files.length

            if(totalFiles <= 5){
            
                const newFilesPromise = req.files.map(file => File.create(file))
                let results = await Promise.all(newFilesPromise)
                
                const files = results.map(result => result.rows[0])
                files.map(file => RecipeFile.create(req.body.id, file.id))
                
            }
        }

        await Recipe.update(req.body)
        return res.redirect(`/admin/recipes/${req.body.id}`)
    },

    //Função para APAGAR as receitas
    async delete(req, res){

        try {
            const { id } = req.body;

            let results = await Recipe.recipeFiles(id);

            const filesPromise = results.rows.map(async file => {

                const files = { recipe_id: id, file_id: file.id}

                    await RecipeFile.delete(files)

                    await File.delete(file.id);

                    await Recipe.delete(id);
            });

            Promise.all(filesPromise);

            return res.redirect(`/admin/recipes`)
    
        }catch (error) {
            console.log(error)
        }

    }

}