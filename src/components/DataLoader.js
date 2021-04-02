import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  text-align: center;
  margin: 5px auto;
  font-size: 18px;
`

const DataLoader = ({viewer, loader}) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        loader().then(resp => setData(resp))
    }, [loader])
    if(data) {
        return(<Container>{viewer(data)}</Container>)
    }else{
        return(<Container>Ładowanie...</Container>)
    }
}

DataLoader.propTypes = {
    viewer: PropTypes.func.isRequired,
    loader: PropTypes.func.isRequired
}

export default DataLoader
