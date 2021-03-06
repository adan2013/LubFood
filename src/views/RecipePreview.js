import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faChevronLeft, faPlayCircle, faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularFaStar } from '@fortawesome/free-regular-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import CardTitle from '../components/CardTitle'
import { getRecipe, deleteRecipe } from '../firebase/firestore/recipes'
import DataLoader from '../components/DataLoader'
import ModalWindow from '../components/ModalWindow'
import IngredientList from '../components/IngredientList'

const RecipeTitleContainer = styled.div`
    margin: 50px 20px 30px;
    font-size: 1.2rem;
`

const Title = styled.div`
    text-align: center;
    margin-top: 14px;
`

const Content = styled.div`
    text-align: center;
    font-weight: bold;
    margin: 6px 0 0 0;
`

const TimerContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`

const SingleTimerContainer = styled.div`
    flex: 1;
    font-size: 14px;
    text-align: center;
  
    div {
        font-size: 3rem;
    }
`

const FooterButton = styled(Button)`
    min-width: 200px;
    max-width: 600px;
    margin: 5px auto;
    svg { margin-right: 6px; }
`

const DifficultMeter = ({level}) => (
    <Content>
        {[1,2,3,4,5].map(i => <FontAwesomeIcon key={i} icon={level >= i ? solidFaStar : regularFaStar} />)}
    </Content>
)

DifficultMeter.propTypes = {
    level: PropTypes.number.isRequired
}

const TimeDisplay = ({minutes, description}) => {
    let h = Math.floor(minutes / 60)
    let m = minutes % 60
    if(m < 10) m = '0' + m
    return (
        <SingleTimerContainer>
            {minutes === 0 ? <div>--:--</div> : <div>{h}:{m}</div>}
            {description}
        </SingleTimerContainer>
    )
}

TimeDisplay.propTypes = {
    minutes: PropTypes.number.isRequired,
    description: PropTypes.string,
}

const RecipePreview = () => {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const { push } = useHistory()
    const { category, recipe } = useParams()

    return (
        <>
            <DataLoader loader={() => getRecipe(recipe)} viewer={data => (
                <>
                    <CardTitle leftButton={{ link: `/recipes/${category}`, variant: `light`, icon: faChevronLeft }}
                               rightButton={data.steps.length > 0 && { link: `/recipes/${category}/${recipe}/cooking`, variant: `success`, icon: faPlayCircle }}>
                        Podgl??d przepisu
                    </CardTitle>

                    <RecipeTitleContainer>
                        <Content>{data.name}</Content>
                        <DifficultMeter level={data.difficult} />
                        <TimerContainer>
                            <TimeDisplay minutes={data.preparationTime}
                                         description={'Czas przygotowywania'} />
                            <TimeDisplay minutes={data.cookingTime}
                                         description={'Czas gotowania'} />
                        </TimerContainer>
                    </RecipeTitleContainer>

                    <Title>Lista sk??adnik??w</Title>
                    <IngredientList list={data.ingredients} addOption addAllOption exportOption />

                    <Title>Zarz??dzanie przepisem</Title>
                    <Content>
                        <FooterButton variant={'secondary'} block onClick={() => push(`/recipes/${category}/${recipe}/edit-recipe`)}>Edytuj przepis</FooterButton>
                        <FooterButton variant={'secondary'} block onClick={() => push(`/recipes/${category}/${recipe}/edit-ingredients`)}>Edytuj list?? sk??adnik??w</FooterButton>
                        <FooterButton variant={'secondary'} block onClick={() => push(`/recipes/${category}/${recipe}/edit-steps`)}>Edytuj list?? krok??w</FooterButton>
                        <FooterButton variant={'danger'} block onClick={() => setDeleteModalIsOpen(true)}>
                            <FontAwesomeIcon icon={faTrash} /> Usu?? przepis
                        </FooterButton>
                    </Content>
                </>
            )} />
            <ModalWindow show={deleteModalIsOpen}
                         text={'Czy chcesz usun???? ca??y przepis?'}
                         onSubmit={() => deleteRecipe(recipe).then(() => push(`/recipes/${category}`))}
                         onCancel={() => setDeleteModalIsOpen(false)} />
        </>
    )
}

export default RecipePreview
