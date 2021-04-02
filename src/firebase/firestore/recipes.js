import firebase from '../firebase'

export const getRecipesFromCategory = categoryCode => {
    return firebase.firestore().collection(categoryCode).get()
        .then(collection => {
            return collection.docs.map(recipe => ({ id: recipe.id, ...recipe.data() }))
        })
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const deleteRecipe = recipeId => {

}

export const addRecipe = recipeData => {

}
