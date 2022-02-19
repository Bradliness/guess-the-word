const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//display our symbols as placeholders  for the chosen word's letters?
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//fire off the game?
getWord();
  //Display the symbols? But my page is still not working!!!
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("🟢");
  }
wordInprogress.innerText = placeholderLetters.join("");
};

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
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showguessedLetters = function () {
  //clear list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li.innerText = letter;
    guessedLettersElement.append(li);
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
      revealWord.push("🟢");
    }
  }
   //console.log(revealWord);
   wordInProgress.innerText = revealWord.join("");
   checkIfWin()
 };

 const updateGuessesRemaining = function (guess) {
   const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
     // womp womp
     message.innerText = `Sorry, the word has no ${guess}.`;
     remainingGuesses -= 1;
   } else {
     message.innerText = `Good Guess! The word has the letter ${guess}.`;
   }

   if (remainingGuesses === 0) {
     message.inmnerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

 const checkIfWin = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
     message.classList.add("win");
     message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

     startOver();
   }
 };

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  platAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  //reset all originalvalues - grab new words
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  //new words

 //show the right UI elements? mine still isnt weorking!!!!!
 guessedLetterButton.classList.remove("hide");
 playAgainButton.classList.add("hide");
 remainingGuessesElement.classList.remove("hide");
 guessedLettersElement.classList.remove("hide");
});
