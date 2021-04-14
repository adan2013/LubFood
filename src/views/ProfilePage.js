import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import firebase from 'firebase'
import { UserContext } from '../firebase/UserContext'
import {
    exportRecipes,
    exportIngredients,
    exportShopingList
} from '../firebase/firestore/databaseExports'

const Panel = styled.div`
    text-align: center;
    margin: 50px 20px 0 20px;
`

const StyledButton = styled(Button)`
    margin-top: 25px;
`

const logout = () => {
    firebase.auth().signOut()
        .catch(err => alert(`AUTH ERROR: ${err}`))
}

const ProfilePage = () => {
    const user = useContext(UserContext)
    const [exportData, setExportData] = useState(null)
    const [fetchingInProgress, setFetchingInProgress] = useState(false)
    const [fileName, setFileName] = useState('exportdata')

    const fetchData = typeID => {
        setExportData(null)
        setFetchingInProgress(true)
        switch (typeID) {
            case 'RECIPES':
                setFileName('RecipesDataExport')
                exportRecipes().then(data => setExportData(data))
                break
            case 'INGREDIENTS':
                setFileName('IngredientsDataExport')
                exportIngredients().then(data => setExportData(data))
                break
            case 'SHOPINGLIST':
                setFileName('ShopingListDataExport')
                exportShopingList(user.uid).then(data => setExportData(data))
                break
            default:
                setFileName('exportdata')
                setExportData(null)
        }
    }

    const clickExportRecipes = () => fetchData('RECIPES')
    const clickExportIngredients = () => fetchData('INGREDIENTS')
    const clickExportShopingList = () => fetchData('SHOPINGLIST')

    const downloadExportData = () => {
        const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportData.toString())
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', data)
        downloadAnchorNode.setAttribute('download', `${fileName}.json`);
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
        setExportData(null)
        setFetchingInProgress(false)
    }

    return (
        <>
            <Panel>
                <b>Zalogowano jako:</b><br />{user.displayName}<br/>{user.email}
                <StyledButton variant={'danger'} block onClick={logout}>Wyloguj z systemu</StyledButton>
            </Panel>
            <Panel>
                <StyledButton variant={'light'} block onClick={clickExportRecipes}>Eksportuj przepisy</StyledButton>
                <StyledButton variant={'light'} block onClick={clickExportIngredients}>Eksportuj składniki</StyledButton>
                <StyledButton variant={'light'} block onClick={clickExportShopingList}>Eksportuj listę zakupów</StyledButton>
                {
                    fetchingInProgress
                    &&
                    <StyledButton variant={'warning'}
                                  block
                                  onClick={downloadExportData}
                                  style={{marginTop: '20px'}}
                                  disabled={exportData === null}>
                        {exportData === null ? 'Pobieranie...' : 'Pobierz plik z danymi'}
                    </StyledButton>
                }
            </Panel>
        </>
    )
}

export default ProfilePage
