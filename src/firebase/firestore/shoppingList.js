import firebase from '../firebase'

const SHOPPING_LIST_COLL = 'shoppingList'

export const getShoppingList = uid => {
    return firebase.firestore().collection(SHOPPING_LIST_COLL).doc(uid).get()
        .then(list => list.data().list)
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const updateShoppingList = (uid, list) => {
    return firebase.firestore().collection(SHOPPING_LIST_COLL).doc(uid).update(list)
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}

export const clearShoppingList = uid => {
    return firebase.firestore().collection(SHOPPING_LIST_COLL).doc(uid).set({ list: [] })
        .catch(err => alert(`SET ERROR ${err.code}`))
}

export const addToShoppingList = (uid, obj) => {
    return firebase.firestore().collection(SHOPPING_LIST_COLL).doc(uid).set({
        list: typeof obj === 'string' ? firebase.firestore.FieldValue.arrayUnion(obj) : firebase.firestore.FieldValue.arrayUnion(...obj)
    }, { merge: true })
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}

export const deleteFromShoppingList = (uid, obj) => {
    return firebase.firestore().collection(SHOPPING_LIST_COLL).doc(uid).set({
        list: typeof obj === 'string' ? firebase.firestore.FieldValue.arrayRemove(obj) : firebase.firestore.FieldValue.arrayRemove(...obj)
    }, { merge: true })
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}
