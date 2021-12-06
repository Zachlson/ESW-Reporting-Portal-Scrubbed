import React, {useState} from 'react'
import styled  from 'styled-components'

function SearchBar({modalOpen, setSearchString}) {
    const [inputData, setInputData] = useState("")

    const  handleOnchange = (event) => {
        setSearchString(event.target.value)
        setInputData(event.target.value)
    }
    return (
        <SearchBarContainer
        modalOpen={modalOpen}>
            <Img src="images/icon-search.png"/>
            <Input type="text"  placeholder="Search" onChange={handleOnchange} isEmpty={inputData}/>
        </SearchBarContainer>
    )
}

export default SearchBar


const Input = styled.input`
    height: 56px;
    width: 100%;
    margin: 0;
    padding-left: 45px;
    border-radius: 10px;
    border:none;
    color: white;
    font-size: ${props => props.isEmpty === ""? "14px": "18px"};
    background-color: #05040F;
    outline: none;
    &::placeholder {
        color: #6B689F;
    };
`
const Img = styled.img`
    position: absolute;
    bottom: 17px;
    left: 10px;
    width: 24px;
    height: 24px;
`

const SearchBarContainer = styled.div`
    position:relative;
    padding: 0 0 0 0;
    margin: 0;
    direction: ltr;
    width: 320px;
    min-width: 200px;
    border-radius: 1rem;
    z-index: 5;
`