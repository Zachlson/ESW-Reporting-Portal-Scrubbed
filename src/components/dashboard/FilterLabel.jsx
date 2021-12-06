import React from 'react'
import styled from 'styled-components'

const FilterLabel = ({filter, clearFilter, modalOpen}) => {
    return (
        <SelectedFilterButton
            name={filter.id}
            onClick={clearFilter}>
            {filter.name}
            <FilterX>x</FilterX>
        </SelectedFilterButton>
    )
}

export default FilterLabel

const SelectedFilterButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 6px 30px 6px 20px;
    min-width: 120px;
    max-width: 200px;
    height: 30px;
    background-color: #0B78BD;
    color:#fff;
    margin-left: 20px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    position: relative;
    &:hover{
        cursor:pointer;
    }
`

const FilterX = styled.span`
    display: block;
    position: absolute;
    right:10px;
`