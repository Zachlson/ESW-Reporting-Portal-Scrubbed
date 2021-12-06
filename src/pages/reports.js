import React from "react";
import styled from "styled-components";

const Reports = () => {
  return (
    <StyledReportsContainer>
      <StyledConstructionImage
        src="/images/coming_soon.png"
        alt="coming soon"
      />
    </StyledReportsContainer>
  );
};

export default Reports;

const StyledReportsContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const StyledConstructionImage = styled.img`
  height: 400px;
  width: 500px;
  margin: 100px;
`;
