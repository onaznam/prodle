import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === retypePassword) {
      axios
        .post("https://prodle-back-end-19c30685df21.herokuapp.com/register", {
          username,
          password,
        })
        .then((response) => {
          if (response) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //return incorrect
    }
  };
  return (
    <ContainerDiv>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Register</h2>
          <label>username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label>retype password</label>
          <input
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          ></input>
          <button type="submit">register</button>
        </div>
      </form>
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
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
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

  form {
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
export default Register;
