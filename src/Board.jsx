import React, { useState, useEffect } from "react";
import { BoardWrapper, GridDiv, KeyboardDiv } from "./Styles";
import axios from "axios";
function Board() {
  const [letters, setLetters] = useState(Array(36).fill(""));
  const [fieldStatus, setFieldStatus] = useState(Array(36).fill(""));
  const [buttonStatus, setButtonStatus] = useState(Array(36).fill(""));
  const [todaysWord, setTodaysWord] = useState([]);
  const [row, setRow] = useState(1);
  const [currentRow, setCurrentRow] = useState(1);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [isLoss, setIsLoss] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [buttonClasses, setButtonClasses] = useState({});

  let keyboard = {
    1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    3: ["Go", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  };

  let desktopBoard = {
    1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    3: ["Z", "X", "C", "V", "B", "N", "M"],
  };

  const isMobile = window.innerWidth <= 768;

  const handleClassnameChange = (value, type) => {
    setButtonClasses((prevClasses) => {
      const newClasses = { ...prevClasses };
      if (type === "correct") {
        newClasses[value] = "green";
      } else if (type === "incorrect") {
        newClasses[value] = "grey";
      } else if (type === "close") {
        newClasses[value] = "yellow";
      }

      return newClasses;
    });
  };

  const handleKeyboardChange = (value) => {
    let n = 6;
    let left = n * row - n;
    let right = n * row;
    const findIndex = letters.findIndex((value) => value === "");
    console.log("delete! ", " left: ", left, "index: ", findIndex);

    if (value === "Go" || value === "ENTER") {
      handleEnter();
    } else if (value === "Del" || value === "BACKSPACE") {
      if (findIndex <= right && findIndex > left) {
        console.log("delete! ", " left: ", left, "index: ", findIndex);
        handleDelete(findIndex - 1);
      }
    } else {
      if (findIndex < right && findIndex >= left) {
        const updateValues = [...letters];
        updateValues[findIndex] = value;
        setLetters(updateValues);
      }
    }
  };

  const handleDelete = (index) => {
    const updateValues = [...letters];
    if (letters[index] === "" && index > 0) {
      if (index % 6 !== 0) {
        updateValues[index - 1] = "";
        setLetters(updateValues);
      }
    } else {
      updateValues[index] = "";
      setLetters(updateValues);
    }
  };

  useEffect(() => {
    setCurrentRow((r) => r + 1);
  }, [row]);

  //desktop keyboard input
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const keyValue = e.key.toUpperCase();
      if (
        keyboard[1].includes(keyValue) ||
        keyboard[2].includes(keyValue) ||
        keyboard[3].includes(keyValue) ||
        keyValue === "ENTER" ||
        keyValue === "BACKSPACE"
      ) {
        handleKeyboardChange(keyValue);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  });

  const handleEnter = () => {
    //get the current row
    let n = 6;
    let currentRow,
      left = row * n - n,
      right = row * n;
    currentRow = letters.slice(left, right);

    //test validity
    const isFilled = currentRow.every((item) => item !== "");
    let isValid = [];

    for (let i = 0; i < 6; i++) {
      isValid.push(currentRow[i]);
    }
    let testValidity = isValid.join("");
    let testWord = testValidity.toLowerCase();
    const isValidWord = Object.values(data).some(
      (wordObj) => wordObj.iambic === testWord
    );

    //inputted word is valid and
    if (isFilled && isValidWord) {
      //this is to color the boxes
      const statusCopy = [...fieldStatus];
      let slicedAnswer = todaysWord.slice(0, 6);

      //map contains all the inputted values
      let map = new Map();
      for (let i = 0; i < 6; i++) {
        if (map.has(currentRow[i])) {
          map.set(currentRow[i], map.get(currentRow[i]) + 1);
        } else {
          map.set(currentRow[i], 1);
        }
      }

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
        if (currentRow[i] === slicedAnswer[i]) {
          //"currentrow[I] is the value like "X" or "M"
          handleClassnameChange(currentRow[i], "correct");
          statusCopy[left + i] = "correct";
          map.set(currentRow[i], map.get(currentRow[i]) - 1);
          answerMap.set(slicedAnswer[i], answerMap.get(slicedAnswer[i]) - 1);
        }
      }

      // Then check for close ones
      for (let i = 0; i < 6; i++) {
        if (
          statusCopy[left + i] !== "correct" &&
          todaysWord.includes(currentRow[i])
        ) {
          if (answerMap.get(currentRow[i]) > 0) {
            handleClassnameChange(currentRow[i], "close");
            statusCopy[left + i] = "close";
            answerMap.set(currentRow[i], answerMap.get(currentRow[i]) - 1);
          } else {
            handleClassnameChange(currentRow[i], "incorrect");
            statusCopy[left + i] = "incorrect";
          }
        } else if (statusCopy[left + i] !== "correct") {
          handleClassnameChange(currentRow[i], "incorrect");
          statusCopy[left + i] = "incorrect";
        }
      }
      setFieldStatus(statusCopy);
      //goal
      if (slicedAnswer.join() === currentRow.join()) {
        setWins((w) => w + 1);
        setIsWin(true);
        handleResult("win");
      } else if (row === 6 && !(slicedAnswer.join() === currentRow.join())) {
        setLosses((l) => l + 1);
        setIsLoss(true);
        handleResult("loss");
      } else {
        setRow((r) => r + 1);
      }
    }
    //word is not valid or complete, clear it
    else {
      const copyLetters = [...letters];
      for (let i = left; i < right; i++) {
        copyLetters[i] = "";
      }
      setLetters(copyLetters);
    }
  };

  const handleResult = (value) => {
    if (user) {
      axios
        .patch(
          "https://prodle-back-end-19c30685df21.herokuapp.com/updateResults",
          {
            username: userObject.username,
            value: value,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response) {
            // render component with the results
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleContinue = () => {
    setLetters(Array(36).fill(""));
    setFieldStatus(Array(36).fill(""));
    setRow(1);
    setIsLoss(false);
    setIsWin(false);
    //generate a new word
    randomWord();
  };

  useEffect(() => {
    fetch("https://prodle-back-end-19c30685df21.herokuapp.com/api/words")
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
    console.log("todays word ", todaysWord);
  }, [todaysWord]);

  //get a random word from the list of words
  const randomWord = () => {
    let random_number = Math.floor(Math.random() * 17250) + 1;
    let word = data[random_number].iambic;
    let uppercase_word = word.toUpperCase();
    let split_word = uppercase_word.split("");
    setTodaysWord(split_word);
  };

  //generate random word once the list loads
  useEffect(() => {
    if (!isLoading) {
      randomWord();
    }
  }, [isLoading]);

  //fetches current user
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://prodle-back-end-19c30685df21.herokuapp.com/api/user",
        {
          withCredentials: true,
        }
      );
      // Checks if the response contains username field
      if (response.data && response.data.username) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //generates users detail
  const fetchUserDetail = async () => {
    if (user) {
      try {
        const response = await axios.get(
          `https://prodle-back-end-19c30685df21.herokuapp.com/getUser/${user.username}`,
          {
            withCredentials: true,
          }
        );
        setUserObject(response.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setUserObject({});
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserDetail();
    }
  }, [user]);

  return (
    <BoardWrapper>
      <h1>Prodle</h1>
      <GridDiv>
        {letters.map((value, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={value}
            className={fieldStatus[i]}
            disabled={Math.floor(i / 6) !== row - 1 || isWin || isLoss}
          />
        ))}
      </GridDiv>
      <KeyboardDiv>
        {isMobile
          ? Object.values(keyboard).map((rows, rowIndex) => (
              <div className="button-row" key={rowIndex}>
                {rows.map((letter, index) => (
                  <button
                    className={`desktop-button ${buttonClasses[letter] || ""}`}
                    key={index}
                    value={letter}
                    onClick={(e) => handleKeyboardChange(e.target.value)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))
          : Object.values(desktopBoard).map((rows, rowIndex) => (
              <div className="button-row" key={rowIndex}>
                {rows.map((letter, index) => (
                  <div
                    className={`desktop-button ${buttonClasses[letter] || ""}`}
                    key={index}
                    value={letter}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
      </KeyboardDiv>
    </BoardWrapper>
  );
}

export default Board;
