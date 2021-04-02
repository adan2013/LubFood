const KEY_NAME = 'authenticatedWithFirebase'

export const authorizationIsInProgress = () => window.localStorage.getItem(KEY_NAME) !== null

export const authorizationStart = () => window.localStorage.setItem(KEY_NAME, new Date().toString())

export const authorizationEnd = () => window.localStorage.removeItem(KEY_NAME)
