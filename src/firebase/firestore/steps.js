import firebase from '../firebase'

export const getStepsFromRecipe = (categoryCode, recipeId) => {
    return firebase.firestore().collection(categoryCode).doc(recipeId).collection('steps').get()
        .then(steps => {
            return steps.docs.map(step => ({ id: step.id, ...step.data() }))
        })
        .catch(err => alert(`GET ERROR ${err.code}`))
}

export const deleteStep = (categoryCode, recipeId, stepId) => {
    return firebase.firestore().collection(categoryCode).doc(recipeId).collection('steps').doc(stepId.toString()).delete()
        .catch(err => alert(`DELETE ERROR ${err.code}`))
}

export const addStep = (categoryCode, recipeId, text, timer) => {
    const stepId = Date.now()
    return firebase.firestore().collection(categoryCode).doc(recipeId).collection('steps').doc(stepId.toString()).set({
        text, timer
    })
        .then(() => stepId)
        .catch(err => alert(`ADD ERROR ${err.code}`))
}

export const updateStep = (categoryCode, recipeId, stepId, text, timer) => {
    return firebase.firestore().collection(categoryCode).doc(recipeId).collection('steps').doc(stepId.toString()).update({
        text, timer
    })
        .catch(err => alert(`UPDATE ERROR ${err.code}`))
}
