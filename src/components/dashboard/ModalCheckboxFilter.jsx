import React, {useState} from 'react'
import styled from 'styled-components'

const ModalCheckboxFilter = ({labelText, handleCheckboxChange}) => {
    const [isChecked, setIsChecked] = useState(false)
    const handleOnChange = () => {
        setIsChecked(!isChecked)}

    return (
        <StyledCheckboxContainer>
            <StyledCheckbox>
                <input type="checkbox"
                    checked={isChecked}
                    onChange={handleOnChange}
                />   
            <span/>
            <label>{labelText}</label>
            </StyledCheckbox>
        </StyledCheckboxContainer>
    )
}

export default ModalCheckboxFilter

const StyledCheckboxContainer = styled.div`
    margin:20px 0px;
`;

const StyledCheckbox = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input{
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        :checked + span {
        background-image: url(/images/checkMark.png);
        background-size: 24px;
        margin-right: 4px;
        }
    }
    span{
        position: absolute;
        top: 0;
        left: 0;
        height: 24px;
        width: 24px;
        background-color: #373B53;
        border: 2px solid #fff;
        border-radius: 5px;
        }
    label{
        font-size: 18px;
        font-weight: bold;
    }
`;



