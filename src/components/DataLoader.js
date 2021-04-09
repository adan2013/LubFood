import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  text-align: center;
  margin: 15px auto;
  font-size: 18px;
  font-style: italic;
`

const DataLoader = ({viewer, loader, refreshFlag, noPreventEmptyList}) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        loader().then(resp => setData(resp))
    }, [loader, refreshFlag])
    if(data) {
        if(!noPreventEmptyList && Array.isArray(data) && data.length === 0) {
            return(<Container>Lista jest pusta</Container>)
        }else{
            return(viewer(data, setData))
        }
    }else{
        return(<Container>Ładowanie...</Container>)
    }
}

DataLoader.propTypes = {
    viewer: PropTypes.func.isRequired,
    loader: PropTypes.func.isRequired,
    refreshFlag: PropTypes.bool,
    noPreventEmptyList: PropTypes.bool,
}

DataLoader.defaultProps = {
    refreshFlag: false,
    noPreventEmptyList: false,
}

export default DataLoader
