const Chef = require('../models/Chef')
const File = require('../models/File')
const Recipe = require('../models/Recipe')

//Lógica para buscar as imagens das receitas
async function getImage(recipeId) {
    let files = await Recipe.findImageRecipe(recipeId)
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace('public', '')}`
    }))

    return files
}

const LoadService = {
    load(service, filter){
        this.filter = filter
        return this[service]()
    },

    async chef(){
        try {
            const chef = await Chef.find(this.filter)

            chef.file = await File.findOne({ where: { id: chef.file_id }})
            chef.file.src = `${chef.file.path.replace('public', '')}`

            const recipes = await Chef.findRecipesChef(chef.id)

            if(recipes[0].id != null){
                const recipesPromise = recipes.map(async recipe => {
                    const files = await getImage(recipe.id)
                    recipe.image = files[0].src
                    return recipe
                })
                chef.recipes = await Promise.all(recipesPromise)
            }
            chef.total_recipes = await Chef.countRecipe(chef.id)
            return chef

        } catch (error) {
            console.error(error)
        }
    },

    async chefs(){
        try {
            const chefs = await Chef.findAll(this.filter)
            const chefsPromise = chefs.map(async chef => {
                const file = await File.findOne({ where: { id: chef.file_id } })

                if(file.path != 'public/images/chef_nameFaker.png'){
                    chef.image = `${file.path.replace('public', '')}`
                }else{
                    chef.image = 'http://placehold.it/940x280?text=Chef sem foto';
                }

                chef.total_recipes = await Chef.countRecipe(chef.id)
                return chef
            })

            const allChefs = await Promise.all(chefsPromise)
            return allChefs

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = LoadService