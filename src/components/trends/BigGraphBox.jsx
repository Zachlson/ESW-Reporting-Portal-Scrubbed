import React from 'react';
import styled from 'styled-components'
import BarGraph from "./BarGraph"

const BigGraphBox = ({barData, barKeys, barLegend}) => {
    return (
        <BigGraphBoxContainer>
            <BigGraphBoxTop>
                <BigGraphBoxTitle>{`${barLegend} Trends`}</BigGraphBoxTitle>
            </BigGraphBoxTop>
            <BigGraphBoxBottom>
            <BarGraph
            barData ={barData}
            barKeys = {barKeys}
            barLegend = {barLegend}/>
            </BigGraphBoxBottom>
        </BigGraphBoxContainer>
    )
}

export default BigGraphBox;

const BigGraphBoxContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:705px;
    height:549px;
    padding:30px 0;
    background-color:#373B53;
    border-radius:10px;
`
const BigGraphBoxTop = styled.div`
    display:flex;
    flex-direction:row;
    width:687[px];
    height:5%;
    border-bottom: 1px solid white;
    padding:2%;
    margin:0 13px;
`
const BigGraphBoxBottom = styled.div`
    width:100%;
    height:90%;
    padding:0 26px;
`
const BigGraphBoxTitle = styled.h2`
    width:50%;
    float:left;
    margin-top:-15px;
`