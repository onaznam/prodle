import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InstructionModal from "./InstructionModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Landing() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      // Checks if the response contains username field
      if (response.data && response.data.username) {
        setUser(response.data);
        console.log("meow", user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ContainerDiv>
      <LandingDiv>
        <h1>Prodle</h1>
        <div>
          <button onClick={handleOpen}>Instructions</button>
          {user && (
            <>
              <button onClick={() => navigate("/board")}>Play now!</button>
              <button onClick={() => navigate("/logout")}>Logout</button>
            </>
          )}
          {!user && <button onClick={() => navigate("/login")}>Login</button>}
          <InstructionModal isOpen={isModalOpen} onClose={handleClose}>
            <InstructionDiv>
              <h2>Every day users have a chance to guess the daily word</h2>
              <h2>Users have 6 chances to input a valid 6 letter word</h2>
              <h2>There are over 17,000 6 letter English words</h2>
              <div className="container">
                <p className="correct">M</p>
                <h3 style={{ color: "green" }}>Green</h3>
                <h3>means the letter is in the correct place</h3>
              </div>
              <div className="container">
                <p className="close">E</p>
                <h3
                  style={{
                    color: "yellow",
                    textShadow:
                      "1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black",
                  }}
                >
                  Yellow{" "}
                </h3>
                <h3>represents letter is in the wrong spot</h3>
              </div>
              <div className="container">
                <p className="incorrect">O</p>
                <h3 style={{ color: "grey" }}>Grey</h3>
                <h3>represents the letter does not exist in word</h3>
              </div>
              <h2>Do you have what it takes?</h2>
            </InstructionDiv>
          </InstructionModal>
        </div>
      </LandingDiv>
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
`;

const LandingDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    font-family: "Montserrat", sans-serif;
    height: 4rem;
    width: 8rem;
    margin: 1rem;
    cursor: pointer;
  }
`;

const InstructionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  .container {
    display: flex;
    align-items: center;
  }
  h3 {
    margin-right: 0.3rem;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    width: 4rem;
    border-radius: 5px;
    font-size: 2rem;
    margin: 1rem;
  }
  .correct {
    background-color: #00d900;
  }
  .close {
    background-color: yellow;
  }
  .incorrect {
    background-color: grey;
  }
`;
export default Landing;
