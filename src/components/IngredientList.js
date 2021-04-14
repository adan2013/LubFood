import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faShoppingCart, faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons'
import {addToShoppingList, clearShoppingList, deleteFromShoppingList} from '../firebase/firestore/shoppingList'
import copy from 'copy-to-clipboard'
import firebase from  '../firebase/firebase'
import ModalWindow from './ModalWindow'
import getUnitName from '../utils/getUnitName'

const ListContainer = styled.div`
    text-align: center;
`

const ItemContainer = styled.div`
    position: relative;
    background-color: #fff;
    max-width: 600px;
    margin: 0 auto 5px auto;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    color: #000;
    padding-left: 70px;
    overflow-y: hidden;
    text-align: left;
    text-decoration: ${props => props.lineThrough ? 'line-through' : 'none'};
`

const ItemButton = styled(Button)`
    position: absolute;
    top: 6px;
    left: 6px;
    min-width: 50px;
    text-align: center;
`

const MainOptionContainer = styled(ButtonGroup)`
    display: block;
    text-align: center;
    padding: 0 15px;
    max-width: 600px;
    margin: 15px auto;
    svg { margin: 0 8px; }
`

const ManualAdder = styled(InputGroup)`
    margin: 15px auto;
    max-width: 600px;
`

const convertObjects = list => {
    if(list.length === 0) return []
    if(typeof list[0] === 'string') return list
    if(typeof list[0] === 'object' && list[0] !== null) {
        return list.map(i => {
            if(i.unit === '') {
                return ''
            }else{
                return `${i.name} (${getUnitName(i.unit)})${i.value === 0 ? '' : ' - ' + i.value}`
            }
        })
    }
    return []
}

const ListItem = ({ item, itemAdded, addOption, deleteOption }) => {
    const [actionExecuted, setActionExecuted] = useState(false)
    const uid = firebase.auth().currentUser.uid

    const addAction = () => {
        setActionExecuted(true)
        addToShoppingList(uid, item)
    }
    const deleteAction = () => {
        setActionExecuted(true)
        deleteFromShoppingList(uid, item)
    }

    return(
        <ItemContainer lineThrough={deleteOption && actionExecuted}>
            {
                addOption
                &&
                <ItemButton variant={'success'} size={'sm'} disabled={actionExecuted || itemAdded} onClick={addAction}>
                    <FontAwesomeIcon icon={actionExecuted || itemAdded ? faCheck : faShoppingCart}/>
                </ItemButton>
            }
            {
                deleteOption
                &&
                <ItemButton variant={'danger'} size={'sm'} disabled={actionExecuted} onClick={deleteAction}>
                    <FontAwesomeIcon icon={faTrash}/>
                </ItemButton>
            }
            {item}
        </ItemContainer>
    )
}

ListItem.propTypes = {
    item: PropTypes.string.isRequired,
    itemAdded: PropTypes.bool,
    addOption: PropTypes.bool,
    deleteOption: PropTypes.bool,
}

const IngredientList = (props) => {
    const [list, setList] = useState(convertObjects(props.list))
    const [itemsAdded, setItemsAdded] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [dataCopied, setDataCopied] = useState(false)
    const [customItem, setCustomItem] = useState('')
    const uid = firebase.auth().currentUser.uid

    const addAll = () => {
        setItemsAdded(true)
        addToShoppingList(uid, list)
    }
    const deleteAll = () => {
        setDeleteModalIsOpen(false)
        setList([])
        clearShoppingList(uid)
    }
    const copyToClipboard = () => {
        setDataCopied(true)
        copy(list.join('\n'))
        setTimeout(() => setDataCopied(false), 2000)
    }
    const addCustomItem = () => {
        setList([
            ...list,
            customItem
        ])
        addToShoppingList(uid, customItem)
        setCustomItem('')
    }

    return(
        <ListContainer>
            <MainOptionContainer block>
                {
                    props.addAllOption
                    &&
                    <Button variant={'success'} disabled={itemsAdded || list.length === 0} onClick={addAll}>
                        <FontAwesomeIcon icon={itemsAdded ? faCheck : faShoppingCart}/>{itemsAdded ? 'Dodano' : 'Dodaj wszystkie'}
                    </Button>
                }
                {
                    props.clearOption
                    &&
                    <Button variant={'danger'} disabled={list.length === 0} onClick={() => setDeleteModalIsOpen(true)}>
                        <FontAwesomeIcon icon={faTrash}/>Wyczyść
                    </Button>
                }
                {
                    props.exportOption
                    &&
                    <Button variant={'warning'} disabled={dataCopied || list.length === 0} onClick={copyToClipboard}>
                        <FontAwesomeIcon icon={dataCopied ? faCheck : faClipboard}/>{dataCopied ? 'Zapisano!' : 'Do schowka'}
                    </Button>
                }
            </MainOptionContainer>
            {
                list.map(item => (
                    <ListItem key={item} item={item} itemsAdded={itemsAdded} {...props} />
                ))
            }
            {list.length === 0 && <i>Lista składników jest pusta</i>}
            {
                props.manualAdder
                &&
                <ManualAdder>
                    <Form.Control type={'text'}
                                  value={customItem}
                                  onChange={e => setCustomItem(e.target.value)}
                                  placeholder={'Nowa pozycja'}
                                  maxLength={'50'} />
                    <InputGroup.Append>
                        <Button variant={'success'}
                                disabled={customItem.length < 5}
                                onClick={addCustomItem}>
                            Dodaj
                        </Button>
                    </InputGroup.Append>
                </ManualAdder>
            }
            <ModalWindow show={deleteModalIsOpen}
                         onSubmit={deleteAll}
                         onCancel={() => setDeleteModalIsOpen(false)}
                         text={'Czy chcesz usunąć całą listę zakupów?'} />
        </ListContainer>
    )
}

IngredientList.propTypes = {
    list: PropTypes.array.isRequired,
    addOption: PropTypes.bool,
    deleteOption: PropTypes.bool,
    exportOption: PropTypes.bool,
    addAllOption: PropTypes.bool,
    clearOption: PropTypes.bool,
    manualAdder: PropTypes.bool,
}

export default IngredientList
