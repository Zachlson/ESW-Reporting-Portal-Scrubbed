import React from 'react';
import styled from 'styled-components';

const TrendsTitle = () => {
    return (
        <HeaderStyling>
            <TrendsLogo src="/images/chart-line-solid.svg" alt=""/><h1>Trends</h1>
        </HeaderStyling>
    )
}

export default TrendsTitle

const TrendsLogo = styled.img`
height: 30px;
width: 30px;
padding-top: 6px;
margin-right: 5px;
filter:invert(100%);
`

const HeaderStyling = styled.div`
display:flex;
min-width: 25vw;
width:100%;
margin-top: 35px;
margin-bottom: 75px;
`