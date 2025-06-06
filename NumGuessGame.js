// Node.js의 내장 모듈인 readline을 가져옵니다.
const readline = require("readline");

// 터미널에서 사용자 입력을 받고 출력하기 위한 인터페이스를 생성합니다.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 게임 전체를 관리하는 함수
function startGame() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.\n");

  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)\n");

  // 사용자에게 난이도 선택을 질문합니다.
  rl.question("Enter your choice: ", (choice) => {
    let chances;
    let difficulty;

    switch (choice) {
      case "1":
        chances = 10;
        difficulty = "Easy";
        break;
      case "2":
        chances = 5;
        difficulty = "Medium";
        break;
      case "3":
        chances = 3;
        difficulty = "Hard";
        break;
      default:
        console.log(
          "Invalid choice. Please run the game again and select 1, 2, or 3."
        );
        rl.close();
        return;
    }

    console.log(
      `\nGreat! You have selected the ${difficulty} difficulty level.`
    );
    console.log("Let's start the game!\n");

    // 1부터 100 사이의 정답 숫자를 생성합니다.
    const answer = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    // 추측을 물어보는 함수
    askForGuess(answer, chances, attempts);
  });
}

// 사용자에게 숫자를 추측하도록 반복해서 물어보는 함수
function askForGuess(answer, maxChances, attempts) {
  // 남은 기회를 먼저 확인합니다.
  if (attempts >= maxChances) {
    console.log(
      `\nGame Over! You've used all your chances. The correct number was ${answer}.`
    );
    rl.close();
    return;
  }

  rl.question("Enter your guess: ", (guessStr) => {
    const guess = parseInt(guessStr, 10);
    attempts++;

    // 입력값이 숫자인지 확인합니다.
    if (isNaN(guess)) {
      console.log("That's not a number! Please enter a valid number.");
      // 잘못된 입력은 시도 횟수에서 제외하고 다시 질문합니다.
      attempts--;
      askForGuess(answer, maxChances, attempts);
      return;
    }

    // 추측한 숫자와 정답을 비교합니다.
    if (guess === answer) {
      console.log(
        `\nCongratulations! You guessed the correct number in ${attempts} attempts.`
      );
      rl.close(); // 게임이 끝났으므로 인터페이스를 닫습니다.
    } else if (guess < answer) {
      console.log(`Incorrect! The number is greater than ${guess}.\n`);
      askForGuess(answer, maxChances, attempts); // 재귀 호출로 다시 질문합니다.
    } else {
      console.log(`Incorrect! The number is less than ${guess}.\n`);
      askForGuess(answer, maxChances, attempts); // 재귀 호출로 다시 질문합니다.
    }
  });
}

// 게임 시작
startGame();
