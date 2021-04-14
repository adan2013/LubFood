import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import NumberPicker from '../components/NumberPicker'
import { addRecipe, getRecipe, updateRecipe } from '../firebase/firestore/recipes'

const Container = styled.div`
    padding: 10px;
`

const SectionTitle = styled.div`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 4px;
`

const FooterMessage = styled.div`
    text-align: center;
    font-size: 14px;
    margin: 15px auto 0 auto;
    max-width: 400px;
`

const RecipeEditor = () => {
    const [name, setName] = useState('')
    const [difficult, setDifficult] = useState(1)
    const [preparationTime, setPreparationTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)
    const history = useHistory()
    const { category, recipe } = useParams()

    useEffect(() => {
        if(recipe) {
            getRecipe(recipe)
                .then(currentData => {
                    setName(currentData.name)
                    setDifficult(currentData.difficult)
                    setPreparationTime(currentData.preparationTime)
                    setCookingTime(currentData.cookingTime)
                })
        }
    }, [])

    const validateData = () => name.length > 3

    const onSubmitButtonClick = () => {
        if(recipe) {
            updateRecipe(recipe, name, difficult, preparationTime, cookingTime)
                .then(() => history.push(`/recipes/${category}/${recipe}`))
        }else{
            addRecipe(category, name, difficult, preparationTime, cookingTime)
                .then(id => history.push(`/recipes/${category}/${id}`))
        }
    }

    return(
        <>
            <CardTitle leftButton={{ link: recipe ? `/recipes/${category}/${recipe}` : `/recipes/${category}`, variant: `light`, icon: faChevronLeft }}>
                {recipe ? 'Edycja przepisu' : 'Nowy przepis'}
            </CardTitle>
            <Container>
                <SectionTitle>Nazwa przepisu</SectionTitle>
                <Form.Control type={'text'}
                              value={name}
                              onChange={e => setName(e.target.value)}
                              maxLength={40} />

                <SectionTitle>Trudność w przygotowaniu</SectionTitle>
                <NumberPicker onChange={v => setDifficult(v)}
                              value={difficult}
                              minValue={1}
                              maxValue={5}
                              label={'/5'} />

                <SectionTitle>Czas przygotowania</SectionTitle>
                <NumberPicker onChange={v => setPreparationTime(v)}
                              value={preparationTime}
                              step={[10]}
                              maxValue={300}
                              label={' min'}
                              downText={'-10'}
                              upText={'+10'} />

                <SectionTitle>Czas gotowania</SectionTitle>
                <NumberPicker onChange={v => setCookingTime(v)}
                              value={cookingTime}
                              step={[10]}
                              maxValue={300}
                              label={' min'}
                              downText={'-10'}
                              upText={'+10'} />

                <FooterMessage>
                    Redagowanie listy składników oraz kroków gotowania możliwe jest z poziomu ekranu przepisu
                </FooterMessage>

                <Button variant={'success'}
                        style={{marginTop: '20px'}}
                        disabled={!validateData()}
                        onClick={onSubmitButtonClick} block>
                    {recipe ? 'Zaktualizuj przepis' : 'Dodaj przepis'}
                </Button>
            </Container>
        </>
    )
}

export default RecipeEditor
