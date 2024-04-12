import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post(
        "https://busy-bright-april.glitch.me/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred during logout.");
      });
  };
  return (
    <ContainerDiv>
      <div className="form">
        <div className="div-container">
          <h2>Logout</h2>
          <div className="button-container">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        </div>
      </div>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  @media (max-width: 768px) {
    font-family: "Open Sans", sans-serif;
  }
  background-color: #c7c7c7;

  button {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    margin-top: 1rem;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }
  }
  .div-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .button-container {
      display: flex;
    }
    .button-container button:first-child {
      margin-right: 1rem;
    }
  }
  h2 {
    margin-top: 4rem;
  }
  h3 {
    text-decoration: underline;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.3s, font-size 0.3s;

    &:hover {
      color: #007bff;
    }
  }

  .form {
    background-color: white;
    border-radius: 0.5rem;
    height: 16rem;
    width: 15rem;
    transition: box-shadow 0.3s, transform 0.3s;
    &:hover {
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1),
        0 6px 6px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1),
        0 18px 18px rgba(0, 0, 0, 0.1);
      transform: scale(1.02);
    }
    input {
      width: 10rem;
      height: 1rem;
    }
  }
`;
export default Logout;
