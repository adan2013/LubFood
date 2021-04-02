import firebase from '../firebase'
import config from '../../config'

export const exportRecipes = () => {
    const promises = config.categories.map(category => (
        firebase.firestore().collection(category.code).get()
    ))
    return Promise.all(promises)
        .then(recipes => {
            return recipes.map(recipe => JSON.stringify(recipe.data()))
        })
        .catch(err => alert(`EXPORT ERROR ${err.code}`))
}

export const exportIngredients = () => {
    //TODO export ingredients
}

export const exportShopingList = uid => {
    //TODO export shoping list
}
