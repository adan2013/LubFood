import React from 'react'
import styled from 'styled-components'
import NavMenu from './NavMenu'
import PropTypes from 'prop-types'

const Container = styled.div`
    background-color: #3589e3;
    width: 100%;
    height: 100vh;
`

const Content = styled.div`
    background-color: #3589e3;
    color: #fff;
    min-height: 100%;
    padding: 5px 5px 90px 5px;
    box-shadow: 0 0 30px 6px rgba(0, 0, 0, 0.75);
`

const Layout = (props) => {
    const showMenu = !window.location.href.includes('/cooking')

    return (
        <Container>
            <Content>{props.children}</Content>
            {showMenu && <NavMenu/>}
        </Container>
    )
}

Layout.propTypes = {
    children: PropTypes.element.isRequired
}

export default Layout
