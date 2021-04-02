import React, {useContext} from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
 import LoginPage from './views/LoginPage'
 import Layout from './components/Layout'
 import routes from './routes'
import {UserContext} from './firebase/UserContext'

const PrivateRoute = () => {
    const authorized = useContext(UserContext)
    if(authorized) {
        return (
            <Layout>
              <Switch>
                {
                  routes.map((route, idx) => (
                      <Route key={idx}
                             path={route.path}
                             exact={route.exact}
                             name={route.name}
                             render={props => (
                                 <route.component {...props} />
                             )} />
                  ))
                }
              </Switch>
            </Layout>
        )
    }else{
        return (
            <Redirect to={'/'}/>
        )
    }
}

const App = () => (
    <BrowserRouter>
      <React.Suspense fallback={() => <span>Loading...</span>}>
        <Switch>
          <Route exact path="/" name="Login Page" render={props => <LoginPage {...props} />} />
          <PrivateRoute/>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
)

export default App
