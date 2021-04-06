import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CardTitle from '../components/CardTitle'
import ModalWindow from '../components/ModalWindow'
import { getIngredients, deleteIngredient, addIngredient } from '../firebase/firestore/ingredients'
import DataLoader from '../components/DataLoader'

const Container = styled.div`
  padding: 10px;
`

const ItemButton = styled(Button)`
  position: relative;
  text-align: left;
  line-height: 40px;
  margin-bottom: 12px;
`

const TrashIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 20px;
  margin-top: 20px;
  transform: translateY(-50%);
`

const IngredientAdder = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const adder = () => {
        addIngredient(name)
            .then(() => {
                setName('')
                if(onSubmit) onSubmit()
            })
    }
    return(
        <Container>
            <InputGroup>
                <Form.Control type={'text'}
                              value={name}
                              onChange={e => setName(e.target.value)} placeholder={'Nazwa składnika'}
                              maxLength={'30'} />
                <InputGroup.Append>
                    <Button variant={'success'}
                         onClick={adder}
                         disabled={name.length < 3}>
                        Dodaj
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Container>
    )
}

const IngredientBrowser = () => {
    const [selectedId, setSelectedId] = useState(null)
    const [refreshFlag, setRefreshFlag] = useState(false)
    const deleteItem = () => {
        deleteIngredient(selectedId)
            .then(() => {
                setSelectedId(null)
                setRefreshFlag(f => !f)
            })
    }
    return(
        <>
            <CardTitle>Składniki</CardTitle>
            <IngredientAdder onSubmit={() => setRefreshFlag(f => !f)} />
            <DataLoader refreshFlag={refreshFlag} loader={getIngredients} viewer={data => (
                <Container>
                    {
                        data.map(item => (
                            <ItemButton key={item.id}
                                        variant={'light'}
                                        block
                                        onClick={() => setSelectedId(item.id)}>
                                {item.name}
                                <TrashIcon icon={faTrash} style={{color: '#d00000'}} />
                            </ItemButton>
                        ))
                    }
                </Container>
            )} />
            <ModalWindow show={selectedId != null}
                         onSubmit={deleteItem}
                         onCancel={() => setSelectedId(null)} />
        </>
    )
}

export default IngredientBrowser
