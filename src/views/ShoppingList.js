import React from 'react'
import { getShoppingList } from '../firebase/firestore/shoppingList'
import firebase from '../firebase/firebase'
import CardTitle from '../components/CardTitle'
import DataLoader from '../components/DataLoader'
import IngredientList from '../components/IngredientList'

const ShoppingList = () => {
    const uid = firebase.auth().currentUser.uid

    return(
        <>
            <CardTitle>Lista zakupów</CardTitle>
            <DataLoader loader={() => getShoppingList(uid)} viewer={data => (
                <>
                    <IngredientList list={data} deleteOption clearOption exportOption manualAdder />
                </>
            )}/>
        </>
    )
}

export default ShoppingList
