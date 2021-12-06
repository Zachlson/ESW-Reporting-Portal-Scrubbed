import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledMainDiv>
      <StyledFooterContainer>
        <a href="https://eswit.com/contact/get-it-support.html">IT Support</a>|
        <a href="https://eswit.com/contact/canadian-bc-alberta-offices/calgary-alberta-canada.html">
          Calgary
        </a>
        |
        <a href="https://eswit.com/contact/canadian-bc-alberta-offices/edmonton-alberta-canada.html">
          Edmonton
        </a>
        |
        <a href="https://eswit.com/contact/canadian-bc-alberta-offices/fort-st-john-bc-canada.html">
          Fort St.John
        </a>
        |
        <a href="https://eswit.com/contact/canadian-bc-alberta-offices/grande-prairie-alberta-canada.html">
          Grande Prairie
        </a>
        |
        <a href="https://eswit.com/contact/canadian-bc-alberta-offices/victoria-bc-canada.html">
          Victoria
        </a>
        {/* break */} <br />
        <a href="https://eswit.com/privacy-policy">Privacy Policy</a>
      </StyledFooterContainer>
    </StyledMainDiv>
  );
};

export default Footer;

const StyledMainDiv = styled.div`
  background-color: #1e1b47;
  width: 100%;
  display: flex;
`;

const StyledFooterContainer = styled.div`
  max-width: 1440px;
  max-height: 80px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  a {
    color: #d4d4d4;
    &:hover {
      color: #ffffff;
    }
    margin-left: 5px;
    margin-right: 5px;
    text-decoration: none;
  }
`;
