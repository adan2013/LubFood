import CategoryBrowser from './views/CategoryBrowser'
import RecipeBrowser from './views/RecipeBrowser'
import RecipeCreator from './views/RecipeCreator'
import RecipePreview from './views/RecipePreview'

import IngredientBrowser from './views/IngredientBrowser'
import ProfilePage from './views/ProfilePage'

export default [
    { path: '/recipes', exact: true, name: 'Kategorie przepisów', component: CategoryBrowser },
    { path: '/recipes/:category', exact: true, name: 'Przepisy', component: RecipeBrowser },
    { path: '/recipes/:category/add', exact: true, name: 'Nowy przepis', component: RecipeCreator },
    { path: '/recipes/:category/:recipe', exact: true, name: 'Podgląd przepisu', component: RecipePreview },
    { path: '/recipes/:category/:recipe/edit-recipe', exact: true, name: 'Edycja przepisu', component: RecipeCreator },

    { path: '/ingredients', exact: true, name: 'Składniki', component: IngredientBrowser },
    { path: '/profile', exact: true, name: 'Profil', component: ProfilePage },
]
