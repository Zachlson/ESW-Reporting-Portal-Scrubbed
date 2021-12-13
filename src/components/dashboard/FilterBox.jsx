import React from "react";
import styled from "styled-components";

const FilterBox = ({
  heading,
  number,
  setModalData,
  currentToggle,
  setModalOpen,
}) => {
  const handleViewAllClick = () => {
    let menu = currentToggle + "_" + heading;
    let passDownModalData = {
      menu: menu,
    };
    setModalData(passDownModalData);
    setModalOpen(true);
  };
  return (
    <StyledContainer>
      <StyledCheckContainer>
        <p>{heading}</p>
      </StyledCheckContainer>
      <StyledNumber>{number}</StyledNumber>
      <StyledButton onClick={handleViewAllClick} number={number}>
        View All
      </StyledButton>
    </StyledContainer>
  );
};

export default FilterBox;

const StyledContainer = styled.div`
  height: 197px;
  min-width: 211px;
  background-color: #373b53;
  border-radius: 10px;
  font-size: 64px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
`;
// const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
//   height: 25px;
//   width: 25px;
//   margin-right: 10px;
// `;
const StyledCheckContainer = styled.div`
  display: flex;
  margin-top: 17px;
  font-size: 20px;
`;
const StyledNumber = styled.p`
  margin: 0 10px;
  font-size: 72px;
  color: ${(props) =>
    props.severity === 3
      ? "#F96157"
      : props.severity === 2
      ? "#6BBB7C"
      : "#FFFFFF"};
`;
// const StyledSubText = styled.p`
//   font-size: 18px;
// `;
const StyledButton = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 46px;
  border-radius: 0px 0px 10px 10px;
  border: none;
  display: ${(props) => (props.number === 0 ? "none" : "block")};
`;
