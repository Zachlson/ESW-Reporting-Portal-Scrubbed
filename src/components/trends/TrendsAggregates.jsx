import React from 'react'
import styled from 'styled-components';

const TrendsAggregates = ( {uppertext, count}) => {
    return (
        <StyledContainerBox>
         <StyledUpperText>{uppertext}</StyledUpperText>
         <StyledNumber>
             {count}
         </StyledNumber>
        </StyledContainerBox>
    )
}

export default TrendsAggregates

const StyledContainerBox = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
height: 40px;
width: 280px;
background-color:#373B53;
border-radius:10px;
padding: 20px 30px;
`
const StyledUpperText = styled.p`
color: white;
font-size:24px;
`
const StyledNumber = styled.p`
color: white;
font-size:36px;
align-self:center;
display: inline-block;
width:50%;
margin-left:40px;
`
const StyledLowerText = styled.p`
color:#D4D4D4;
font-size:18px;
align-self:center;
`