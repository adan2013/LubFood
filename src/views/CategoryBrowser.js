import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import config from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import { getRecipesFromCategory } from '../firebase/firestore/recipes'
import DataLoader from '../components/DataLoader'

const ButtonGroup = styled.div`
  padding: 10px;
`

const RecipeButton = styled(Button)`
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
    const { category } = useParams()
    return(
        <>
            <CardTitle
                leftButton={{ link: '/recipes', variant: 'light', icon: faChevronLeft }}
                rightButton={{ link: '/recipes/abc/add', variant: 'success', icon: faPlusCircle }}>
                {config.categories.find(c => c.code === category).name}
            </CardTitle>
            <DataLoader loader={() => getRecipesFromCategory(category)}
                        viewer={data => (
                            <ButtonGroup>
                                {
                                    data.map(recipe => (
                                        <RecipeButton key={recipe.id}
                                                        variant={'light'}
                                                        block
                                                        onClick={() => history.push(`/recipes/${category}/${recipe.id}`)}>
                                            {recipe.name}
                                            <CategoryArrowIcon icon={faChevronRight} />
                                        </RecipeButton>
                                    ))
                                }
                            </ButtonGroup>
                        )}/>
        </>
    )
}

export default CategoryBrowser
