import firebase from '../firebase'

const RECIPES_COLL = 'recipes'
const INGREDIENTS_COLL = 'ingredients'
const SHOPPING_LIST_COLL = 'shoppingList'

const exportDataFromCollection = (collectionName, docName = '') => {
    if(docName === '') {
        return firebase.firestore().collection(collectionName).get()
            .then(collection => (
                JSON.stringify(collection.docs.map(doc => ({ id: doc.id, data: doc.data() })))
            ))
            .catch(err => alert(`EXPORT ERROR ${err.code}`))
    }else{
        return firebase.firestore().collection(collectionName).doc(docName).get()
            .then(doc => (
                JSON.stringify({ id: doc.id, data: doc.data() })
            ))
            .catch(err => alert(`EXPORT ERROR ${err.code}`))
    }
}

export const exportRecipes = () => exportDataFromCollection(RECIPES_COLL)

export const exportIngredients = () => exportDataFromCollection(INGREDIENTS_COLL)

export const exportShopingList = uid => exportDataFromCollection(SHOPPING_LIST_COLL, uid)
