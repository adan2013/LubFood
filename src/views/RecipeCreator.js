import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import NumberPicker from '../components/NumberPicker'
import IngredientsPicker from '../components/IngredientsPicker'

const Container = styled.div`
  padding: 10px;
`

const SectionTitle = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 4px;
`

const RecipeCreator = () => {
    const [name, setName] = useState('')
    const [difficult, setDifficult] = useState(1)
    const [preparationTime, setPreparationTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)
    const [ingredientsList, setIngredientsList] = useState({})
    //const [stepList, setStepList] = useState([])
    const history = useHistory()
    const { category } = useParams()

    return(
        <>
            <CardTitle
                leftButton={{ link: `/recipes/${category}`, variant: `light`, icon: faChevronLeft }}>
                Nowy przepis
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
                              minValue={1} maxValue={5} label={'/5'} />
                <SectionTitle>Czas przygotowania</SectionTitle>
                <NumberPicker onChange={v => setPreparationTime(v)}
                              value={preparationTime} step={10}
                              maxValue={300} label={' min'} downText={'-10'} upText={'+10'} />
                <SectionTitle>Czas gotowania</SectionTitle>
                <NumberPicker onChange={v => setCookingTime(v)}
                              value={cookingTime} step={10}
                              maxValue={300} label={' min'} downText={'-10'} upText={'+10'} />

                <SectionTitle>Składniki</SectionTitle>
                <IngredientsPicker initialValues={ingredientsList} onChange={v => setIngredientsList(v)} />

                <SectionTitle>Treść przepisu</SectionTitle>

                <Button variant={'success'} style={{marginTop: '20px'}} disabled block>Dodaj przepis</Button>
            </Container>
        </>
    )
}

export default RecipeCreator
