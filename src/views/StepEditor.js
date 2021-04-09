import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import DataLoader from '../components/DataLoader'
import RecipeStepPanel from '../components/RecipeStepPanel'
import { getStepsFromRecipe, updateSteps } from '../firebase/firestore/recipes'

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

    const deleteItem = (idx, data, dataSetter) => {
        const newList = [...data]
        newList.splice(idx, 1)
        dataSetter(newList)
        updateSteps(recipe, newList)
    }
    const addNewItem = (data, dataSetter) => {
        const newList = [...data, { text: '', timer: 0 }]
        dataSetter(newList)
        updateSteps(recipe, newList)
    }
    const updateItem = (idx, text, timer, data, dataSetter) => {
        const newList = [...data]
        newList[idx] = { text, timer }
        dataSetter(newList)
        updateSteps(recipe, newList)
    }

    return(
        <>
            <CardTitle leftButton={{ link: `/recipes/${category}/${recipe}`, variant: `light`, icon: faChevronLeft }}>
                Edycja kroków
            </CardTitle>
            <Container>
                <DataLoader noPreventEmptyList
                            loader={() => getStepsFromRecipe(recipe)}
                            viewer={(data, dataSetter) => (
                    <>
                        {
                            data.map((item, idx) => (
                                <RecipeStepPanel key={idx+item.text+item.timer}
                                                 initialValues={item}
                                                 stepCount={data.length}
                                                 no={idx+1}
                                                 onDelete={idx => deleteItem(idx, data, dataSetter)}
                                                 onUpdate={(idx, text, timer) => updateItem(idx, text, timer, data, dataSetter)} />
                            ))
                        }
                        <NewItemButton variant={'success'} onClick={() => addNewItem(data, dataSetter)}>
                            <FontAwesomeIcon icon={faPlusCircle} /> Nowa pozycja
                        </NewItemButton>
                    </>
                )} />
            </Container>
        </>
    )
}

export default RecipeEditor
