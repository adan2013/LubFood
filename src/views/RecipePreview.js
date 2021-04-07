import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'

const Container = styled.div`
  text-align: center;
  margin: 50px 20px 0 20px;
`

const RecipePreview = () => {
    const { category, recipe } = useParams()

    return (
        <Container>
            RECIPE PREVIEW<br/>
            CATEGORY: {category}<br/>
            RECIPE: {recipe}
        </Container>
    )
}

export default RecipePreview
