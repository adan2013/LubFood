import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import DataLoader from '../components/DataLoader'
import RecipeStepPanel from '../components/RecipeStepPanel'
import { getStepsFromRecipe, addStep } from '../firebase/firestore/steps'

const Container = styled.div`
  text-align: center;
  padding: 10px;
  svg { margin: 0 4px; }
`

const NewItemButton = styled(Button)`
  margin-top: 10px;
  width: 200px;
`

const RecipeEditor = () => {
    const { category, recipe } = useParams()

    const onDeleteItem = (idx, data, dataSetter) => {
        dataSetter([])
        dataSetter(data.filter((el, index) => index !== idx))
    }
    const onClickNewItem = (data, dataSetter) => {
        addStep(category, recipe, '', 0).then(id => {
            dataSetter([
                ...data,
                { id: id.toString(), text: '', timer: 0 }
            ])
        })
    }

    return(
        <>
            <CardTitle leftButton={{ link: `/recipes/${category}/${recipe}`, variant: `light`, icon: faChevronLeft }}>
                Edycja kroków
            </CardTitle>
            <Container>
                <DataLoader noPreventEmptyList loader={() => getStepsFromRecipe(category, recipe)} viewer={(data, dataSetter) => (
                    <>
                        {
                            data.map((item, idx) => (
                                <RecipeStepPanel key={idx}
                                                 categoryCode={category}
                                                 recipeId={recipe}
                                                 initialValues={item}
                                                 stepCount={data.length}
                                                 no={idx+1}
                                                 onDelete={id => onDeleteItem(id, data, dataSetter)} />
                            ))
                        }
                        <NewItemButton variant={'success'} onClick={() => onClickNewItem(data, dataSetter)}>
                            <FontAwesomeIcon icon={faPlusCircle} /> Nowa pozycja
                        </NewItemButton>
                    </>
                )} />
            </Container>
        </>
    )
}

export default RecipeEditor
