const File = require('../models/File')
const Recipe = require('../models/Recipe')

//Lógica para buscar as imagens das receitas
async function getImage(recipeId) {
    let files = await Recipe.findImageRecipe(recipeId)
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace("public", "")}`
    }))

    return files
}

const LoadService = {
    load(service, filter){
        this.filter = filter
        return this[service]()
    },

    async recipe(){
        try {
            const recipe = await Recipe.find(this.filter)
            recipe.files = await getImage(recipe.id)

            return recipe
            
        } catch (error) {
            console.error(error)
        }
    },

    async recipes(){
        try {
            const recipes = await Recipe.findAllRecipes()
            const recipesPromise = recipes.map(async recipe => {
                const files = await getImage(recipe.id)
                recipe.image = files[0].src
                return recipe
            })

            const allRecipes = await Promise.all(recipesPromise)
            return allRecipes
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = LoadService