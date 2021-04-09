import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import DataLoader from '../components/DataLoader'
import RecipeIngredientPanel from '../components/RecipeIngredientPanel'
import { updateIngredients } from '../firebase/firestore/recipes'
import { getIngredientsFromSystemAndRecipe } from '../firebase/firestore/ingredients'

const Container = styled.div`
  text-align: center;
  padding: 10px;
  svg { margin: 0 4px; }
`

const NewItemButton = styled(Button)`
  margin-top: 10px;
  width: 200px;
`

const cloneObject = obj => JSON.parse(JSON.stringify(obj))

const IngredientEditor = () => {
    const { category, recipe } = useParams()

    const deleteItem = (idx, data, dataSetter) => {
        const newList = cloneObject(data)
        newList.recipe.splice(idx, 1)
        dataSetter(newList)
        updateIngredients(recipe, newList.recipe)
    }
    const addNewItem = (data, dataSetter) => {
        const newList = cloneObject(data)
        newList.recipe.push({ id: '', name: '', unit: '', value: 0 })
        dataSetter(newList)
        updateIngredients(recipe, newList.recipe)
    }
    const updateItem = (idx, ingredient, value, data, dataSetter) => {
        const newList = cloneObject(data)
        newList.recipe[idx] = { id: ingredient.id, name: ingredient.name, unit: ingredient.unit, value }
        dataSetter(newList)
        updateIngredients(recipe, newList.recipe)
    }

    return(
        <>
            <CardTitle leftButton={{ link: `/recipes/${category}/${recipe}`, variant: `light`, icon: faChevronLeft }}>
                Edycja składników
            </CardTitle>
            <Container>
                <DataLoader noPreventEmptyList
                            loader={() => getIngredientsFromSystemAndRecipe(recipe)}
                            viewer={(data, dataSetter) => (
                                <>
                                    {
                                        data.recipe.map((item, idx) => (
                                            <RecipeIngredientPanel key={idx+item.name+item.unit+item.value}
                                                                   initialValues={item}
                                                                   no={idx+1}
                                                                   dictionary={data.dictionary}
                                                                   onDelete={idx => deleteItem(idx, data, dataSetter)}
                                                                   onUpdate={(idx, ingredient, value) => updateItem(idx, ingredient, value, data, dataSetter)} />
                                        ))
                                    }
                                    <NewItemButton variant={'success'} onClick={() => addNewItem(data, dataSetter)}>
                                        <FontAwesomeIcon icon={faPlusCircle} /> Nowy składnik
                                    </NewItemButton>
                                </>
                            )} />
            </Container>
        </>
    )
}

export default IngredientEditor
