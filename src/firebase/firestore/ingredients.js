import firebase from '../firebase'
import { getIngredientsFromRecipe } from './recipes'

export const getIngredients = () => {
    return firebase.firestore().collection('ingredients').get()
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

export const deleteIngredient = ingredientId => {
    return firebase.firestore().collection('ingredients').doc(ingredientId).delete()
        .catch(err => alert(`DELETE ERROR ${err.code}`))
}

export const addIngredient = (name, unit) => {
    return firebase.firestore().collection('ingredients').add({ name, unit })
        .catch(err => alert(`ADD ERROR ${err.code}`))
}

export const getIngredientsFromSystemAndRecipe = recipeId => {
    const fromRecipe = getIngredientsFromRecipe(recipeId)
    const fromSystem = getIngredients()
    return Promise.all([fromRecipe, fromSystem])
        .then(data => ({
            recipe: data[0],
            dictionary: data[1]
        }))
}
