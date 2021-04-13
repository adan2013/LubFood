import React, { useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import firebase from 'firebase'
import {UserContext} from '../firebase/UserContext'
import {Redirect} from 'react-router'
import logo from '../lubfoodlogo.png'
import {authorizationIsInProgress, authorizationStart} from '../firebase/authorizationProgressFlag'

const LoginForm = styled.div`
background-color: #393e46;
width: 100vw;
max-width: 800px;
height: 100vh;
text-align: center;
padding: 80px 50px 0 50px;
box-shadow: 0 0 30px 6px rgba(0,0,0,0.75);
`

const LubFood = styled.div`
margin-bottom: 30px;
  img {
    max-width: 80%;
  }
`

const KeyIcon = styled(FontAwesomeIcon)`
margin-right: 14px;
`

const LoginButton = styled(Button)`
padding: 10px 20px;
`

const ProgressLabel = styled.div`
color: #fff;
font-size: 20px;
animation: pulse 0.5s infinite;
animation-direction: alternate;

@keyframes pulse {
0% { color: rgba(255, 255, 255, 1) }
100% { color: rgba(255, 255, 255, 0.2) }
}
`

const AbortButton = styled(Button)`
padding: 4px 20px;
position: fixed;
bottom: 10px;
transform: translateX(-50%);
`

const signInWithGoogle = () => {
    authorizationStart()
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
        .catch(err => alert(`AUTH ERROR: ${err}`))
}

const LoginPage = () => {
    const authorized = useContext(UserContext)
    const authInProgress = authorizationIsInProgress()
    if(authorized) {
        return (<Redirect to={'/recipes'}/>)
    }else{
        return (
            <LoginForm>
                <LubFood><img src={logo} alt={'lubfood logo'}/></LubFood>
                {
                    authInProgress
                    ?
                        <>
                            <ProgressLabel>Logowanie w toku...</ProgressLabel>
                            <AbortButton variant={'danger'} size={'sm'} onClick={signInWithGoogle}>
                                Spróbuj ponownie
                            </AbortButton>
                        </>
                        :
                        <LoginButton variant={'light'} onClick={signInWithGoogle}>
                            <KeyIcon icon={faKey}/>Zaloguj do systemu
                        </LoginButton>
                }
            </LoginForm>
        )
    }
}

export default LoginPage
