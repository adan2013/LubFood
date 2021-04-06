import CategoryBrowser from './views/CategoryBrowser'
import RecipeBrowser from './views/RecipeBrowser'
import RecipeCreator from './views/RecipeCreator'

import ProfilePage from './views/ProfilePage'

export default [
    { path: '/recipes', exact: true, name: 'Kategorie przepisów', component: CategoryBrowser },
    { path: '/recipes/:category', exact: true, name: 'Przepisy', component: RecipeBrowser },
    { path: '/recipes/:category/add', exact: true, name: 'Nowy przepis', component: RecipeCreator },

    { path: '/profile', exact: true, name: 'Profil', component: ProfilePage },
]
