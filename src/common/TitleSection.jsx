import React from 'react';
import styled from 'styled-components';
import Menu from '../common/Menu';

const TitleSection = ({title, imgsrc, currentToggle, setCurrentToggle}) => {
  return (
    <DashboardLogoContainer>
      <div>
        <Logo src={imgsrc} alt="Dashboard Logo" />
        <h1>{title}</h1>
      </div>
      <div>
        <Menu currentToggle={currentToggle} setCurrentToggle={setCurrentToggle}/>
      </div>
    </DashboardLogoContainer>
  );
};

export default TitleSection;

const DashboardLogoContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  div:first-child{
    display: flex;
    min-width:250px;
  }
  div:last-child{
    width:65%;
  }
`;

const Logo = styled.img`
  height: 32px;
  width: 42px;
  margin-right: 8px;
`;



