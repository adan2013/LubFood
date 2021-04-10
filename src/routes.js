import CategoryBrowser from './views/CategoryBrowser'
import RecipeBrowser from './views/RecipeBrowser'
import RecipePreview from './views/RecipePreview'
import RecipeEditor from './views/RecipeEditor'
import IngredientEditor from './views/IngredientEditor'
import StepEditor from './views/StepEditor'
import ShoppingList from './views/ShoppingList'
import IngredientBrowser from './views/IngredientBrowser'
import ProfilePage from './views/ProfilePage'

export default [
    { path: '/recipes', exact: true, name: 'Kategorie przepisów', component: CategoryBrowser },
    { path: '/recipes/:category', exact: true, name: 'Przepisy', component: RecipeBrowser },
    { path: '/recipes/:category/add', exact: true, name: 'Nowy przepis', component: RecipeEditor },
    { path: '/recipes/:category/:recipe', exact: true, name: 'Podgląd przepisu', component: RecipePreview },
    { path: '/recipes/:category/:recipe/edit-recipe', exact: true, name: 'Edycja przepisu', component: RecipeEditor },
    { path: '/recipes/:category/:recipe/edit-ingredients', exact: true, name: 'Edycja składników przepisu', component: IngredientEditor },
    { path: '/recipes/:category/:recipe/edit-steps', exact: true, name: 'Edycja kroków przepisu', component: StepEditor },

    { path: '/shoping-list', exact: true, name: 'Lista zakupów', component: ShoppingList },
    { path: '/ingredients', exact: true, name: 'Składniki', component: IngredientBrowser },
    { path: '/profile', exact: true, name: 'Profil', component: ProfilePage },
]
