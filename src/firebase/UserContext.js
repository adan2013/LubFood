import React, { Component, createContext } from 'react'
import firebase from './firebase'
import PropTypes from 'prop-types'
import { authorizationStart, authorizationEnd } from './authorizationProgressFlag'

export const UserContext = createContext({ user: null })

class UserProvider extends Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(userAuth => {
            if(userAuth) {
                authorizationStart()
                this.setState({ user: userAuth })
                // OPTIONAL DATABASE WHITELIST CHECK (DISABLED IN THIS PROJECT)
                // firebase.firestore().collection('whitelist').get()
                //     .then(() => {
                //         authorizationStart()
                //         this.setState({ user: userAuth })
                //     })
                //     .catch(() => {
                //         authorizationEnd()
                //         alert('PERMISSION DENIED!')
                //         this.setState({ user: null })
                //     })
            }else{
                authorizationEnd()
                this.setState({ user: null })
            }
        })
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

UserProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export default UserProvider
