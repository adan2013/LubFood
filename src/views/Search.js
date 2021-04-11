import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import config from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import DataLoader from '../components/DataLoader'
import { getAllRecipes } from '../firebase/firestore/recipes'

const SearchGroup = styled.div`
  padding: 10px;
  i {
    display: block;
    text-align: center;
  }
`

const SearchResultButton = styled(Button)`
  position: relative;
  text-align: left;
  line-height: 40px;
  margin-bottom: 12px;
`

const ButtonArrowIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 20px;
  margin-top: 20px;
  transform: translateY(-50%);
`

const getCategoryName = categoryCode => {
    const category = config.categories.find(i => i.code === categoryCode)
    return category ? category.name : ''
}

const SearchResultPanels = ({recipes, searchQuery, historyHook}) => {
    searchQuery = searchQuery.toLowerCase()

    // WARNING:
    // THIS SEARCH ENGINE CONTAINS BAD PRACTISE WITH CLIENT-SIDE FILTERING BECAUSE FIRESTORE
    // DOESN'T SUPPORT NATIVE FULL-TEXT SEARCHING - DOING IT PROPERLY REQUIRES USING EXTERNAL
    // SEARCH ENGINE LIKE ALGOLIA BUT I DON'T WANT COMPLICATE TO MUCH THIS SIMPLE PROJECT

    const filteredRecipes = recipes
        .filter(i => i.name.toLowerCase().includes(searchQuery)).map(recipe => (
        <SearchResultButton key={recipe.id}
                            variant={'light'}
                            block
                            onClick={() => historyHook.push(`/recipes/${recipe.category}/${recipe.id}`)}>
            {getCategoryName(recipe.category)}: {recipe.name}
            <ButtonArrowIcon icon={faChevronRight} />
        </SearchResultButton>
    ))
    if(filteredRecipes.length === 0) {
        return <i>nie znaleziono przepisów o takiej nazwie</i>
    }else{
        return filteredRecipes
    }
}

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const history = useHistory()

    return(
        <>
            <CardTitle>Wyszukiwarka</CardTitle>
            <SearchGroup>
                <Form.Control type={'text'}
                              value={searchText}
                              onChange={e => setSearchText(e.target.value)} placeholder={'Wpisz szukaną frazę (min. 3 znaki)'}
                              maxLength={'30'} />
            </SearchGroup>
            <SearchGroup>
                <DataLoader noPreventEmptyList loader={getAllRecipes} viewer={data => {
                    if(searchText.length >= 3) {
                        return <SearchResultPanels searchQuery={searchText} recipes={data} historyHook={history} />
                    }else{
                        return <></>
                    }
                }} />
            </SearchGroup>
        </>
    )
}

export default Search
