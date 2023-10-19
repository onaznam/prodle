import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
  font-family: "Roboto", sans-serif;
}
html, body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}
body, input, button, h1, h2, h3,h4, div{
  font-family: "Roboto", sans-serif;
}

`;
export const KeyboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3rem;

  /* button {
    height: 2.5rem;
    width: 2.5rem;
  } */

  .desktop-button {
    color: black;
    height: 3rem;
    width: 3rem;
    border: 1px solid black;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      height: 3rem;
      width: 2.3rem;
    }
  }
  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .desktop-button.green {
    background-color: #05ee05;
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
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  input {
    display: flex;
    text-align: center;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 5px;
    font-size: 2rem;
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
