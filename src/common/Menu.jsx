import styled from "styled-components";

const Menu = ({ currentToggle, setCurrentToggle }) => {

  const toggleButton = (e) => {
    setCurrentToggle(e.target.innerHTML);
  };

  return (
    <MenuDiv>
      <TicketButton onClick={toggleButton} id={currentToggle}>
        Ticket
      </TicketButton>
      <ConfigButton onClick={toggleButton} id={currentToggle}>
        Config
      </ConfigButton>
      <AgreementButton onClick={toggleButton} id={currentToggle}>
        Agreement
      </AgreementButton>
    </MenuDiv>
  );
};

export default Menu;

const MenuDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const AgreementButton = styled.button`
  height: 46px;
  margin: 10px;
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  border-radius: 30px;
  border-color: transparent;
  background-color: ${(props) =>
    props.id === "Agreement" ? "#0B78BD" : "transparent"};
  &:hover {
    background-color: #0b78bd;
    cursor: pointer;
  }
`;

const TicketButton = styled.button`
  height: 46px;
  margin: 10px;
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  border-radius: 30px;
  border-color: transparent;
  background-color: ${(props) =>
    props.id === "Ticket" ? "#0B78BD" : "transparent"};
  &:hover {
    background-color: #0b78bd;
    cursor: pointer;
  }
`;

const ConfigButton = styled.button`
  height: 46px;
  margin: 10px;
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  border-radius: 30px;
  border-color: transparent;
  background-color: ${(props) =>
    props.id === "Config" ? "#0B78BD" : "transparent"};
  &:hover {
    background-color: #0b78bd;
    cursor: pointer;
  }
`;
