import React, { useState } from "react";
import styled from "styled-components";
import passwords from "../data/passwords.json";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [error, setError] = useState({ message: "", error: true });

  const handleLogin = (e) => {
    e.preventDefault();
    let tempObj;
    let checking = true;
    let i = 0;
    while (checking) {
      tempObj = { message: "", error: true };
      let valid = true;
      if (e.target.username.value !== passwords[i].username) {
        valid = false;
      }
      if (e.target.password.value !== passwords[i].password) {
        valid = false;
      }
      if (valid) {
        setError({});
        setUser(passwords[i].name);
        setIsLoggedIn(true);
        checking = false;
        localStorage.setItem("esw_logged_in_status", "logged_in");
        localStorage.setItem("esw_user_name", passwords[i].name);
      } else {
        tempObj.message = "Username or Password is incorrect.";
        setError(tempObj);
      }
      i++;
      if (i >= passwords.length) {
        checking = false;
      }
    }
  };

  return (
    <LoginContainer>
      <div className="bottom-left-image"></div>
      <div className="top-right-image"></div>
      <div className="logo-image"></div>

      <StyledFormContainer
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <h2>LOGIN</h2>
        <form>
          <label>
            <p styles={{ color: "#ccc" }}>Username</p>
            <StyledInput name="username" type="text" formMethod="post" />
          </label>
          <label>
            <p styles={{ color: "#ccc" }}>Password</p>
            <StyledInput type="password" name="password" />
          </label>
          <div>
            <ErrorMessage error={error.error}>{error.message}</ErrorMessage>
            <StyledButton type="submit">Submit</StyledButton>
          </div>
        </form>
      </StyledFormContainer>
    </LoginContainer>
  );
};

export default Login;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  min-width: 300px;
  min-width: 80px;
  max-width: 270px;
  min-height: 200px;
  max-height: 400px;
  background-color: #32364f;
  padding: 70px;
  border-radius: 10px;
  border: 3px solid #32364f;
  position: absolute;
  top: 10vh;
  right: 20vw;
  h2 {
    font-size: 40px;
    color: #ddd;
    margin-bottom: 30px;
  }
`;

const StyledButton = styled.button`
  height: 66px;
  width: 280px;
  background: #2673a3;
  border-radius: 10px;
  cursor: pointer;
  margin: 50px auto 0 auto;
  border: none;
  color: #ccc;
  font-size: 20px;
  font-weight: 600;
  :hover {
    background-color: #05598d;
  }
`;

const StyledInput = styled.input`
  max-width: 250px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  outline: none;
  padding: 0 15px;
  margin: 15px 0;
`;

const LoginContainer = styled.div`
  background-color: #0a0a2d;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;

  .bottom-left-image {
    background-image: url("/images/login-bg-bottom-left.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 15vw;
    width: 58vw;
    z-index: -1;
  }

  .top-right-image {
    background-image: url("/images/login-bg-top-right.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    height: 19vw;
    width: 60vw;
    z-index: -1;
  }

  .logo-image {
    background-image: url("/images/ESW-logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 41vh;
    left: 9vw;
    height: 9vw;
    width: 38vw;
    max-width: 360px;
    z-index: -1;
  }
`;

const ErrorMessage = styled.p`
  display: ${(props) => (props.error ? "inherit" : "none")};
  color: ${(props) => (props.error ? "#f96157" : "#000000")};
  font-size: 20px;
  text-align: center;
`;
