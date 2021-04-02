import RecipeBrowser from './views/RecipeBrowser'
import CategoryBrowser from './views/CategoryBrowser'

import ProfilePage from './views/ProfilePage'

export default [
    { path: '/recipes', exact: true, name: 'Kategorie przepisów', component: RecipeBrowser },
    { path: '/recipes/:category', exact: true, name: 'Przepisy', component: CategoryBrowser },

    { path: '/profile', exact: true, name: 'Profil', component: ProfilePage },
]
