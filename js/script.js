const guessedLettersElement = document.querySelector(".guessed-letters");
const guessletterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//display our symbols as placeholders  for the chosen word's letters?
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("🟣");
  }
wordInprogress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  //empty message paragraph
  message.innerText = "";
  //let's grab what was entered in the input
  const guess = letterInput.value;
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);
  //console.log(guess);

  if (goodguess) {
  // we've got a letter! Let's guess!
  makeGuess(guess);
}
  letterInput.value ="";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
  //is the input empty??
    message.innerText = "PLease enter a letter.";
  } else if (input.length > 1) {
    // did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    //Did you type a number, a special character or some other non letter?
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    //We finally got a single letter!
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.tpUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly, try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("🟣");
    }
  }
   //console.log(revealWord);
   wordInProgress.innerText = revealWord.join("");
   checkIfWin()
 };

 const checkIfWin = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
     message.classList.add("win");
     message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
   }
 };
