document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");

  const width = 4;
  const squares = [];

  let totalScore = 0;

  //Create a game board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = "";
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateARandomNumber();
    generateARandomNumber();
    changeColor();
    scoreDisplay.innerHTML = totalScore;
  }
  createBoard();

  //Generate a number randomly
  function generateARandomNumber() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    const twoOrFour = Math.floor(Math.random() * 10) == 1 ? 4 : 2;
    squares[randomNumber].innerHTML == ""
      ? ((squares[randomNumber].innerHTML = twoOrFour), changeColor())
      : generateARandomNumber();
  }

  document.addEventListener("keyup", (e) => {
    if (["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(e.key)) {
      switch (e.key) {
        case "ArrowUp":
          move("top");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowDown":
          move("bottom");
          break;
        case "ArrowRight":
          move("right");
          break;
      }
      generateARandomNumber();
    }
  });

  function combainedRow(action) {
    for (let i = 0; i < 15; i++) {
      if (
        parseInt(squares[i].innerHTML) == parseInt(squares[i + 1].innerHTML)
      ) {
        const combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        if (action == "left") {
          squares[i].innerHTML = combinedTotal;
          squares[i + 1].innerHTML = "";
          changeColor();
        } else {
          squares[i].innerHTML = "";
          changeColor();
          squares[i + 1].innerHTML = combinedTotal;
        }
        totalScore += combinedTotal;
        scoreDisplay.innerHTML = parseInt(totalScore);
      }
    }
  }

  function combainedColumn(action) {
    for (let i = 0; i < 12; i++) {
      if (
        parseInt(squares[i].innerHTML) == parseInt(squares[i + width].innerHTML)
      ) {
        const combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        if (action == "top") {
          squares[i].innerHTML = combinedTotal;
          squares[i + width].innerHTML = "";
          changeColor();
        } else {
          squares[i].innerHTML = "";
          changeColor();
          squares[i + width].innerHTML = combinedTotal;
        }
        totalScore += combinedTotal;
        scoreDisplay.innerHTML = parseInt(totalScore);
      }
    }
  }

  function move(action) {
    checkWinOrLoose();
    switch (action) {
      case "top":
        moveTop();
        combainedColumn(action);
        break;
      case "left":
        moveLeft();
        combainedRow(action);
        break;
      case "bottom":
        moveBottom();
        combainedColumn(action);
        break;
      default:
        moveRight();
        combainedRow(action);
    }

    function moveTop() {
      for (let i = 0; i < Math.sqrt(squares.length); i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 4].innerHTML;
        let totalThree = squares[i + 4 * 2].innerHTML;
        let totalFour = squares[i + 4 * 3].innerHTML;
        let column = [totalOne, totalTwo, totalThree, totalFour].map(
          (element) => parseInt(element),
        );

        let filteredColumn = column.filter((el) => el);
        const missingElements = 4 - filteredColumn.length;
        const addingMissingZeros = Array(missingElements).fill("");
        let newColumn = filteredColumn.concat(addingMissingZeros);

        squares[i].innerHTML = newColumn[0];
        squares[i + 4].innerHTML = newColumn[1];
        squares[i + 4 * 2].innerHTML = newColumn[2];
        squares[i + 4 * 3].innerHTML = newColumn[3];
      }
    }

    function moveRight() {
      for (let i = 0; i < squares.length; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML;
          let totalTwo = squares[i + 1].innerHTML;
          let totalThree = squares[i + 2].innerHTML;
          let totalFour = squares[i + 3].innerHTML;
          let row = [totalOne, totalTwo, totalThree, totalFour].map((element) =>
            parseInt(element),
          );

          let filteredRow = row.filter((el) => el);
          const missingElements = 4 - filteredRow.length;
          const addingMissingZeros = Array(missingElements).fill("");
          let newRow = addingMissingZeros.concat(filteredRow);

          squares[i].innerHTML = newRow[0];
          squares[i + 1].innerHTML = newRow[1];
          squares[i + 2].innerHTML = newRow[2];
          squares[i + 3].innerHTML = newRow[3];
        }
      }
    }

    function moveLeft() {
      for (let i = 0; i < squares.length; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML;
          let totalTwo = squares[i + 1].innerHTML;
          let totalThree = squares[i + 2].innerHTML;
          let totalFour = squares[i + 3].innerHTML;
          let row = [totalOne, totalTwo, totalThree, totalFour].map((element) =>
            parseInt(element),
          );

          let filteredRow = row.filter((el) => el);
          const missingElements = 4 - filteredRow.length;
          const addingMissingZeros = Array(missingElements).fill("");
          let newRow = filteredRow.concat(addingMissingZeros);

          squares[i].innerHTML = newRow[0];
          squares[i + 1].innerHTML = newRow[1];
          squares[i + 2].innerHTML = newRow[2];
          squares[i + 3].innerHTML = newRow[3];
        }
      }
    }

    function moveBottom() {
      for (let i = 0; i < Math.sqrt(squares.length); i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 4].innerHTML;
        let totalThree = squares[i + 4 * 2].innerHTML;
        let totalFour = squares[i + 4 * 3].innerHTML;
        let column = [totalOne, totalTwo, totalThree, totalFour].map(
          (element) => parseInt(element),
        );

        let filteredColumn = column.filter((el) => el);
        const missingElements = 4 - filteredColumn.length;
        const addingMissingZeros = Array(missingElements).fill("");
        let newColumn = addingMissingZeros.concat(filteredColumn);

        squares[i].innerHTML = newColumn[0];
        squares[i + 4].innerHTML = newColumn[1];
        squares[i + 4 * 2].innerHTML = newColumn[2];
        squares[i + 4 * 3].innerHTML = newColumn[3];
      }
    }
  }

  function checkWinOrLoose() {
    let countOfBlanks = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        document.removeEventListener("keyup",(e) => {
          console.log("removed an event listener");
        });
        resultDisplay.innerHTML = "You win";
      }
      if (squares[i].innerHTML == "") {
        countOfBlanks++;
      }
    }
    if(countOfBlanks === 0){
      resultDisplay.innerHTML = "You Lose"
      document.removeEventListener("keyup",(e) => {
        console.log("removed an event listener");
      });
    }
  }

  function changeColor() {
    for (let i = 0; i < squares.length; i++) {
      let elm = squares[i];
      let baseCase = 2;
      switch (elm.innerHTML) {
        case `${baseCase}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${baseCase}`);
          break;
        case `${Math.pow(baseCase, 2)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 2)}`);
          break;
        case `${Math.pow(baseCase, 3)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 3)}`);
          break;
        case `${Math.pow(baseCase, 4)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 4)}`);
          break;
        case `${Math.pow(baseCase, 5)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 5)}`);
          break;
        case `${Math.pow(baseCase, 6)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 6)}`);
          break;
        case `${Math.pow(baseCase, 7)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 7)}`);
          break;
        case `${Math.pow(baseCase, 8)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 8)}`);
          break;
        case `${Math.pow(baseCase, 9)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 9)}`);
          break;
        case `${Math.pow(baseCase, 10)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 10)}`);
          break;
        case `${Math.pow(baseCase, 11)}`:
          elm.removeAttribute("class");
          elm.classList.add(`c-${Math.pow(baseCase, 11)}`);
          break;
        default:
          elm.removeAttribute("class");
          elm.classList.add(`c-default`);
      }
    }
  }
});
