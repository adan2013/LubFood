import React, { useState } from 'react'
import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap'
import styled from 'styled-components'
import config from '../config'
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

const SectionTitle = styled.div`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 4px;
`

const IngredientAdder = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const [unitType, setUnitType] = useState(config.ingredientUtils[0].code)

    const adder = () => {
        addIngredient(name, unitType)
            .then(() => {
                setName('')
                setUnitType(config.ingredientUtils[0].code)
                if(onSubmit) onSubmit()
            })
    }

    return(
        <Container>
            <Dropdown isOpen={dropdownIsOpen}
                      toggle={() => setDropdownIsOpen(v => !v)}>
                <Dropdown.Toggle variant={'light'} caret block>
                    Jednostka: {config.ingredientUtils.find(unit => unit.code === unitType).name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        config.ingredientUtils.map(unit => (
                            <Dropdown.Item key={unit.code}
                                           onClick={() => setUnitType(unit.code)}
                                           disabled={unit.code === unitType}>
                                {unit.name}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
            <InputGroup style={{marginTop: '10px'}}>
                <Form.Control type={'text'}
                              value={name}
                              onChange={e => setName(e.target.value)}
                              placeholder={'Nazwa składnika'}
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
            <SectionTitle>Nowa pozycja</SectionTitle>
            <IngredientAdder onSubmit={() => setRefreshFlag(f => !f)} />
            <SectionTitle>Wprowadzone składniki</SectionTitle>
            <DataLoader refreshFlag={refreshFlag}
                        loader={getIngredients}
                        viewer={data => (
                <Container>
                    {
                        data.map(item => (
                            <ItemButton key={item.id}
                                        variant={'light'}
                                        block
                                        onClick={() => setSelectedId(item.id)}>
                                <b>{item.name}</b> <i>({config.ingredientUtils.find(unit => unit.code === item.unit).name})</i>
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
