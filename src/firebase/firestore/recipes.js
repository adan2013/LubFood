import firebase from '../firebase'

const RECIPES_COLL = 'recipes'
const STEPS_FIELD = 'steps'
const INGREDIENTS_FIELD = 'ingredients'

// RECIPES
export const getRecipesFromCategory = (categoryCode, sortData = true) => {
    return firebase.firestore().collection(RECIPES_COLL).where('category', '==', categoryCode).get()
        .then(docs => {
            let data = []
            docs.forEach(recipe => {
                data.push({ id: recipe.id, ...recipe.data() })
            })
            if(sortData) {
                data = data.sort((a, b) => {
                    if(a.name < b.name) return -1
                    if(a.name > b.name) return 1
                    return 0
                })
            }
            return data
        })
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const getRecipe = recipeId => {
    return firebase.firestore().collection(RECIPES_COLL).doc(recipeId).get()
        .then(recipe => recipe.data())
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const deleteRecipe = recipeId => {
    return firebase.firestore().collection(RECIPES_COLL).doc(recipeId).delete()
        .catch(err => alert(`DELETE ERROR ${err.code}`))
}

export const addRecipe = (category, name, difficult, preparationTime, cookingTime) => {
    return firebase.firestore().collection(RECIPES_COLL).add({
        category, name, difficult, preparationTime, cookingTime, [STEPS_FIELD]: [], [INGREDIENTS_FIELD]: []
    })
        .then(res => res.id)
        .catch(err => alert(`ADD ERROR ${err.code}`))
}

export const updateRecipe = (recipeId, name, difficult, preparationTime, cookingTime) => {
    return firebase.firestore().collection(RECIPES_COLL).doc(recipeId).update({
        name, difficult, preparationTime, cookingTime
    })
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}

export const getRecipeField = (recipeId, fieldName) => {
    return firebase.firestore().collection(RECIPES_COLL).doc(recipeId).get()
        .then(recipe => recipe.data()[fieldName])
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const updateRecipeField = (recipeId, fieldName, data) => {
    return firebase.firestore().collection(RECIPES_COLL).doc(recipeId).update({
        [fieldName]: data
    })
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}

// STEPS
export const getStepsFromRecipe = recipeId => getRecipeField(recipeId, STEPS_FIELD)

export const updateSteps = (recipeId, stepArray) => updateRecipeField(recipeId, STEPS_FIELD, stepArray)

// INGREDIENTS
export const getIngredientsFromRecipe = recipeId => getRecipeField(recipeId, INGREDIENTS_FIELD)

export const updateIngredients = (recipeId, ingredientArray) => updateRecipeField(recipeId, INGREDIENTS_FIELD, ingredientArray)
