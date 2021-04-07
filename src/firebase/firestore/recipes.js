import firebase from '../firebase'

export const getRecipesFromCategory = categoryCode => {
    return firebase.firestore().collection(categoryCode).get()
        .then(collection => {
            return collection.docs
                .map(recipe => ({ id: recipe.id, ...recipe.data() }))
                .sort((a, b) => {
                    if(a.name < b.name) return -1
                    if(a.name > b.name) return 1
                    return 0
                })
        })
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const getRecipe = (categoryCode, recipeId) => {
    return firebase.firestore().collection(categoryCode).doc(recipeId).get()
        .then(recipe => recipe.data())
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const deleteRecipe = (categoryCode, recipeId) => {
    return firebase.firestore().collection(categoryCode).doc(recipeId).delete()
        .catch(err => alert(`DELETE ERROR ${err.code}`))
}

export const addRecipe = (categoryCode, name, difficult, preparationTime, cookingTime) => {
    return firebase.firestore().collection(categoryCode).add({
        name, difficult, preparationTime, cookingTime
    })
        .then(res => res.id)
        .catch(err => alert(`ADD ERROR ${err.code}`))
}

export const updateRecipe = (categoryCode, recipeId, name, difficult, preparationTime, cookingTime) => {
    return firebase.firestore().collection(categoryCode).doc(recipeId).update({
        name, difficult, preparationTime, cookingTime
    })
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}
