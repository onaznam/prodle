import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
  
}
html, body {
  margin: 0;
  padding: 0;
}
`;
export const KeyboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  button {
    height: 2rem;
    width: 2rem;
  }
  .desktop-button {
    height: 2rem;
    width: 2rem;
    border: 1px solid black;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .desktop-button.green {
    background-color: green;
  }

  .desktop-button.grey {
    background-color: grey;
  }

  .desktop-button.yellow {
    background-color: yellow;
  }
`;

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  @media (max-width: 768px) {
    font-family: "Open Sans", sans-serif;
    gap: 0.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  input {
    display: flex;
    text-align: center;
    height: 3rem;
    width: 3rem;
    border-radius: 5px;
    font-size: 2rem;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    outline: none;

    @media (max-width: 768px) {
      height: 2rem;
      width: 2rem;
      font-size: 1.5rem;
    }
  }

  .correct {
    transition: transform 2s, background-color 4s;
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateY(360deg);
    background-color: #00d900;
  }
  .incorrect {
    transition: transform 2s, background-color 4s;
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateY(360deg);
    background-color: grey;
  }
  .close {
    transition: transform 2s, background-color 4s;
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateY(360deg);
    background-color: yellow;
  }
`;
