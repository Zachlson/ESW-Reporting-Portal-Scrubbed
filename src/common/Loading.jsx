import React from "react";
import styled from "styled-components";
import DotLoader from "react-spinners/PulseLoader";

function Loading({ isLoading }) {
  return (
    <StyledDiv>
      <h1>
        Loading <DotLoader loading={isLoading} color={"white"} />
      </h1>

      <img src="../../images/ESW-logo.png" alt="Logo" />
    </StyledDiv>
  );
}

export default Loading;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin: 15% 30%;
`;
