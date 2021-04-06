import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import config from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import CardTitle from '../components/CardTitle'

const ButtonGroup = styled.div`
  padding: 10px;
`

const CategoryButton = styled(Button)`
  position: relative;
  text-align: left;
  line-height: 40px;
  margin-bottom: 12px;
`

const CategoryArrowIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 20px;
  margin-top: 20px;
  transform: translateY(-50%);
`

const CategoryBrowser = () => {
    const history = useHistory()
    return(
        <>
            <CardTitle>Wybierz kategorię</CardTitle>
            <ButtonGroup>
                {
                    config.categories.map(category => (
                        <CategoryButton key={category.code}
                                        variant={'light'}
                                        block
                                        onClick={() => history.push(`/recipes/${category.code}`)}>
                            {category.name}
                            <CategoryArrowIcon icon={faChevronRight} />
                        </CategoryButton>
                    ))
                }
            </ButtonGroup>
        </>
    )
}

export default CategoryBrowser
