import React, { useState, createRef, useEffect } from "react";
import styled from "styled-components";

function Board() {
  const [letters, setLetters] = useState(Array(36).fill(""));
  const [fieldStatus, setFieldStatus] = useState(Array(36).fill(""));
  const [todaysWord, setTodaysWord] = useState([]);
  const [row, setRow] = useState(1);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isLoss, setIsLoss] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const refs = Array(36)
    .fill()
    .map(() => createRef());

  const handleChange = (i, e) => {
    const updateValues = [...letters];
    let input = e.target.value;
    if ((input.length === 1 && /[a-zA-Z]/.test(input)) || input === "") {
      input = input.toUpperCase();
      updateValues[i] = input;
      setLetters(updateValues);
      if (input.length === 1) {
        if (refs[i + 1]) {
          refs[i + 1].current.focus();
        }
      }
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const updateValues = [...letters];
      if (letters[i] === "" && i > 0) {
        updateValues[i - 1] = "";
        setLetters(updateValues);
        refs[i - 1].current.focus();
      } else {
        updateValues[i] = "";
        setLetters(updateValues);
      }
    } else if (e.key === "Enter" || e.key === "enter") {
      let slicedArr, left, right;
      if (row === 1) {
        left = 0;
        right = 6;
        slicedArr = letters.slice(left, right);
      } else if (row === 2) {
        left = 6;
        right = 12;
        slicedArr = letters.slice(left, right);
      } else if (row === 3) {
        left = 12;
        right = 18;
        slicedArr = letters.slice(left, right);
      } else if (row === 4) {
        left = 18;
        right = 24;
        slicedArr = letters.slice(left, right);
      } else if (row === 5) {
        left = 24;
        right = 30;
        slicedArr = letters.slice(left, right);
      } else if (row === 6) {
        left = 30;
        right = 36;
        slicedArr = letters.slice(30, 36);
      }
      const isFilled = slicedArr.every((item) => item !== "");

      //test validity
      let isValid = [];
      for (let i = 0; i < 6; i++) {
        isValid.push(slicedArr[i]);
      }
      let testValidity = isValid.join("");
      let testWord = testValidity.toLowerCase();
      const isValidWord = Object.values(data).some(
        (wordObj) => wordObj.iambic === testWord
      );

      if (isFilled && isValidWord) {
        //you should check here if its also filled with a correct word
        const statusCopy = [...fieldStatus];
        let slicedAnswer = todaysWord.slice(0, 6);
        let leftCopy = left;

        //map contains all the inputted values
        let map = new Map();
        for (let i = 0; i < 6; i++) {
          if (map.has(slicedArr[i])) {
            map.set(slicedArr[i], map.get(slicedArr[i]) + 1);
          } else {
            map.set(slicedArr[i], 1);
          }
        }
        console.log("map", map);

        //first get all correct values
        let correct_array = [];

        let answerMap = new Map();
        for (let i = 0; i < 6; i++) {
          if (answerMap.has(slicedAnswer[i])) {
            answerMap.set(slicedAnswer[i], answerMap.get(slicedAnswer[i]) + 1);
          } else {
            answerMap.set(slicedAnswer[i], 1);
          }
        }

        // First, flag the correct ones
        for (let i = 0; i < 6; i++) {
          if (slicedArr[i] === slicedAnswer[i]) {
            statusCopy[left + i] = "correct";
            map.set(slicedArr[i], map.get(slicedArr[i]) - 1);
            answerMap.set(slicedAnswer[i], answerMap.get(slicedAnswer[i]) - 1);
          }
        }

        // Then check for close ones
        for (let i = 0; i < 6; i++) {
          if (
            statusCopy[left + i] !== "correct" &&
            todaysWord.includes(slicedArr[i])
          ) {
            if (answerMap.get(slicedArr[i]) > 0) {
              statusCopy[left + i] = "close";
              answerMap.set(slicedArr[i], answerMap.get(slicedArr[i]) - 1);
            } else {
              statusCopy[left + i] = "incorrect";
            }
          } else if (statusCopy[left + i] !== "correct") {
            statusCopy[left + i] = "incorrect";
          }
        }
        setFieldStatus(statusCopy);
        //goal
        if (slicedAnswer.join() === slicedArr.join()) {
          setWins((w) => w + 1);
          setIsWin(true);
        } else if (row === 6 && !(slicedAnswer.join() === slicedArr.join())) {
          setLosses((l) => l + 1);
          setIsLoss(true);
        } else {
          setRow((r) => r + 1);
        }
      } else {
        const copyLetters = [...letters];
        for (let i = left; i < right; i++) {
          copyLetters[i] = "";
        }
        setLetters(copyLetters);
        refs[left].current.focus();
      }
    }
  };

  const handleContinue = () => {
    setLetters(Array(36).fill(""));
    setFieldStatus(Array(36).fill(""));
    setRow(1);
    setFocusedIndex(0);
    refs[0].current.focus();
    setIsLoss(false);
    setIsWin(false);
    //generate a new word
    randomWord();
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/words")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      refs[(row - 1) * 6]?.current?.focus();
    }, 100);
  }, [row]);

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  useEffect(() => {
    console.log("todays word ", todaysWord);
  }, [todaysWord]);

  const randomWord = () => {
    let random_number = Math.floor(Math.random() * 17250) + 1;
    let word = data[random_number].iambic;
    let uppercase_word = word.toUpperCase();
    let split_word = uppercase_word.split("");
    setTodaysWord(split_word);
  };

  useEffect(() => {
    if (!isLoading) {
      randomWord();
    }
  }, [isLoading]);

  return (
    <BoardWrapper>
      <BoardDiv>
        <h1>Prodle</h1>
        <GridDiv>
          {letters.map((value, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={value}
              ref={refs[i]}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={fieldStatus[i]}
              disabled={Math.floor(i / 6) !== row - 1 || isWin || isLoss}
            />
          ))}
        </GridDiv>
      </BoardDiv>
      <div className="wrapper">
        <div>
          <h2>Wins: {wins}</h2>
          <h2>Losses: {losses}</h2>
        </div>
        {isWin && (
          <div>
            <h2>Winner</h2>
            <button onClick={handleContinue}>Continue</button>
          </div>
        )}
        {isLoss && (
          <div>
            <h2>Loser</h2>
            <button onClick={handleContinue}>Continue</button>
          </div>
        )}
      </div>
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin-right: 2rem;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  button {
    height: 4rem;
    width: 6rem;
    font-family: "Open Sans", sans-serif;
  }
`;

const BoardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  input {
    display: flex;
    text-align: center;
    height: 4rem;
    width: 4rem;
    border-radius: 5px;
    font-size: 2rem;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
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

export default Board;
