import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  text-align: center;
  margin: 15px auto;
  font-size: 18px;
  font-style: italic;
`

const DataLoader = ({viewer, loader, refreshFlag}) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        loader().then(resp => setData(resp))
    }, [loader, refreshFlag])
    if(data) {
        if(Array.isArray(data) && data.length > 0) {
            return(<Container>{viewer(data)}</Container>)
        }else{
            return(<Container>Lista jest pusta</Container>)
        }
    }else{
        return(<Container>Ładowanie...</Container>)
    }
}

DataLoader.propTypes = {
    viewer: PropTypes.func.isRequired,
    loader: PropTypes.func.isRequired,
    refreshFlag: PropTypes.bool,
}

DataLoader.defaultProps = {
    refreshFlag: false,
}

export default DataLoader
