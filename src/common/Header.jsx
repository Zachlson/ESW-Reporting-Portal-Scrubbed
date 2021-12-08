import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = ({ userName }) => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  //For navigation
  const history = useHistory();

  const currentPath = useLocation().pathname;

  const handleSelectPage = (e) => {
    setSelectedPage(e.target.innerHTML);
    history.push(
      e.target.innerHTML === "Dashboard"
        ? "/"
        : "/" + e.target.innerHTML.toLocaleLowerCase()
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    history.go("/");
  };

  useEffect(() => {
    switch (currentPath) {
      default:
      case "/":
        setSelectedPage("Dashboard");
        break;
      case "/trends":
        setSelectedPage("Trends");
        break;
      case "/reports":
        setSelectedPage("Reports");
    }
    return () => {};
  }, [selectedPage, currentPath]);

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledLogo>
          <img src="/images/ESW-logo.png" alt="ESW logo" />
        </StyledLogo>
        <StyledNav>
          <ul>
            <li>
              <StyledPageLink
                onClick={handleSelectPage}
                selectedPage={selectedPage}
                linkName="Dashboard"
              >
                Dashboard
              </StyledPageLink>
            </li>
            <li>
              <StyledPageLink
                onClick={handleSelectPage}
                selectedPage={selectedPage}
                linkName="Trends"
              >
                Trends
              </StyledPageLink>
            </li>
            <li>
              <StyledPageLink
                onClick={handleSelectPage}
                selectedPage={selectedPage}
                linkName="Reports"
              >
                Reports
              </StyledPageLink>
            </li>
          </ul>
        </StyledNav>
        <StyledUserSettings>
          <p>{userName}</p>
          <img src="/images/icon_person.png" alt="avatar" />
        </StyledUserSettings>
        <StyledLogoutButton onClick={handleLogout}>Sign Out</StyledLogoutButton>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  background-color: #1e1b47;
  padding: 15px 0;
  width: 100%;
`;

const StyledHeaderContainer = styled.div`
  max-width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  @media (max-width: 1440px) {
    padding: 0 20px;
  }
`;

const StyledLogo = styled.div`
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 28px;
  img {
    height: 60px;
    width: 237px;
    cursor: pointer;
  }
`;

const StyledNav = styled.div`
  width: 100%;

  ul {
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    max-width: 400px;
    min-width: 325px;
  }

  li {
    display: inline;
    list-style-type: none;
    :first-child {
    }
  }
`;

const StyledPageLink = styled.a`
  color: ${(prop) =>
    prop.selectedPage === prop.linkName ? "#FFFFFF" : "#A9A9A9"};
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
`;

const StyledUserSettings = styled.div`
  display: flex;

  img {
    height: 24px;
    width: 24px;
    margin: 20px 20px 20px 10px;
    cursor: pointer;
  }
  p {
    margin-top: 22px;
    margin-right: 0px;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    text-align: right;
    letter-spacing: 0.01em;
    color: #6b689f;
  }
`;

const StyledLogoutButton = styled.button`
  width: 120px;
  height: 25px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #535abe;
  color: #dddddd;

  :hover {
    background-color: #a53501;
    color: #dddddd;
  }
`;
