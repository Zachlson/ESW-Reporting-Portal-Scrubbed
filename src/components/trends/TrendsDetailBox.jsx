import React from "react";
import styled from "styled-components";

const TrendsDetailBox = ({ type, boxTitle, children }) => {
  return (
    <TrendsDetailStyling  type={type} >
      <h2>{boxTitle}</h2>
      <TrendsDetailHeaderUnderline/>
      {children}
    </TrendsDetailStyling> 
  );
};

export default TrendsDetailBox;

const TrendsDetailStyling = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #373b53;
  padding: 2%;
  min-width: 140px;
  width: 280px;
  border-radius: 10px;
  margin: 40px, 20px, 40px, 20px;
  height: 549px;
`;

const TrendsDetailHeaderUnderline = styled.div`
  border-bottom: 1px solid white;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
`;