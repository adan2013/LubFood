import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faShoppingCart, faSearch, faCarrot, faUser } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import config from '../config'

const NavContainer = styled.div`
  width: 100%;
  max-width: 800px;
  position: fixed;
  bottom: 0;
  background-color: #2868ac;
  height: 70px;
  display: flex;
  border-top: 1px #222020 solid;
  z-index: 9999;
`

const NavItem = styled(Link)`
flex: 1;
color: #fff;
padding: 14px 2px 5px 2px;
text-decoration: none;
text-align: center;
line-height: 20px;
font-size: 12px;

&.active {
background-color: #0c0c0c;
}

&:hover {
background-color: #0c0c0c;
text-decoration: none;
color: #fff;
}

.menu-icon {
font-size: 22px;
display: block;
margin: 0 auto 4px auto;
}
`

const items = [
    { icon: faUtensils, name: 'Przepisy', path: '/recipes', alternativePaths: config.categories.map(c => `/recipes/${c.code}`) },
    { icon: faShoppingCart, name: 'Zakupy', path: '/shoping-list', alternativePaths: ['/panel/history/private', '/panel/history/public'] },
    { icon: faSearch, name: 'Szukaj', path: '/search', alternativePaths: ['/panel/new/private', '/panel/new/public'] },
    { icon: faCarrot, name: 'Składniki', path: '/ingredients' },
    { icon: faUser, name: 'Profil', path: '/profile' }
]

const NavMenu = () => {
    const location = useLocation()
    return (
        <NavContainer>
            {
                items.map(item => (
                    <NavItem key={item.name}
                             to={item.path}
                             className={(location.pathname === item.path || (item.alternativePaths && item.alternativePaths.includes(location.pathname))) && 'active'}>
                        <FontAwesomeIcon className={'menu-icon'} icon={item.icon}/>
                        {item.name}
                    </NavItem>
                ))
            }
        </NavContainer>
    )
}

export default NavMenu
