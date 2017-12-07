//declare variables here:
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Variable storing the alphabet
var alphArr = alphabet.split("");
console.log(alphArr);
//creating a function to initialize the game settings
function initialize() {
  //list of words for comp to choose from
  var words = [
    "Harry",
    "Ron",
    "Hermione",
    "Ginny",
    "Malfoy",
    "Dumbledore",
    "Hagrid",
    "Gryffindor",
    "Hufflepuff",
    "Ravenclaw",
    "Slytherin",
    "Hogwarts",
    "Sirius",
    "Lupin"
  ];
  sorted = []; //turn all words in the array into uppercase
  for (var i = 0; i < words.length; i++) {
    sorted[i] = words[i].toUpperCase();
  }
  console.log(sorted);
  chosenWord = sorted[Math.floor(Math.random() * sorted.length)];
  console.log(sorted.indexOf(chosenWord));
  console.log(chosenWord);
  length = chosenWord.length;
  spacesLeft = [];
  wrong = " ";
  guesses = [];
  lives = 7;
  remaining = length;

  for (var j = 0; j < length; j++) {
    //Creating the correct amount of spaces for the chosen word
    spacesLeft[j] = " _ ";
  }
  secretWord = document.getElementById("word");
  secretWord.innerHTML = "<h2>" + spacesLeft.join(" ") + "</h2>";
  console.log(spacesLeft);
  relatedImg = document.getElementById("mainImage");
  relatedImg.src = "assets/images/sorting-hat.jpg";

  images = [
    "assets/images/Harry.jpg",
    "assets/images/Ron.jpg",
    "assets/images/Hermione.jpg",
    "assets/images/Ginny.jpg",
    "assets/images/Malfoy.jpg",
    "assets/images/Dumbeldore.jpg",
    "assets/images/rubeus-hagrid.jpg",
    "assets/images/gryffindor.png",
    "assets/images/hufflepuff.png",
    "assets/images/ravenclaw.png",
    "assets/images/slytherin.png",
    "assets/images/Hogwarts-crest.jpg",
    "assets/images/Sirius.jpg",
    "assets/images/Lupin.jpg"
  ];
  chosenImg = images[sorted.indexOf(chosenWord)];
}

initialize();
var chosenWord;
var sorted;
var spacesLeft;
var wrong;
var guesses; //empty array for storing user guesses
var lives;
var wins = 0;
var losses = 0;
var length;
var remaining;
console.log("Remaining Letters " + remaining);
var images;
var secretWord;
var startScreen = document.getElementById("hide");
var guessesHead = document.getElementById("guesses");
var livesLeft = document.getElementById("lives");
var totalWins = document.getElementById("wins");
var totalLosses = document.getElementById("losses");
var wrongLetters = document.getElementById("wrongLetters");
var victoryScreen = document.getElementById("victory");
var defeatScreen = document.getElementById("defeat");
var resetBtn = document.getElementById("resetButton");
var chosenImg;
var relatedImg;
relatedImg = document.getElementById("mainImage");


//display the number of spaces for chosen word

//Press any key to get started!
//replace heading with the spaces of the chosen word
document.onkeyup = function(event) {
  startScreen.style.display = "none";
  guessesHead.innerHTML = "Guesses: ";
  livesLeft.innerHTML = "Guesses Remaining: " + lives;
  totalWins.innerHTML = "Wins: " + wins;
  totalLosses.innerHTML = "Losses: " + losses;

  var userGuess = event.key.toUpperCase();
  console.log("chosenWord Index " + chosenWord.indexOf(userGuess));
  //check for valid letter
  if (alphArr.indexOf(userGuess) > -1) {
    //user inputs letters and we need to store the guesses
    if (guesses.indexOf(userGuess) === -1) {
      guesses.push(userGuess);
      console.log("User Guesses " + guesses);

      //If Letter is correct
      if (chosenWord.indexOf(userGuess) > -1) {
        for (var l = 0; l < length; l++) {
          if (userGuess === chosenWord[l]) {
            spacesLeft[l] = userGuess;
            //replace space with the letter
            secretWord.innerHTML = "<h2>" + spacesLeft.join(" ") + "</h2>";
            --remaining;
            console.log("Remaining Letters " + remaining);
          }
        }
      } else if (chosenWord.indexOf(userGuess) == -1) {
        //show incorrect guess
        wrong += userGuess + " ";
        wrongLetters.innerHTML = wrong;
        //lose a life
        livesLeft.innerHTML = "Guesses Remaining: " + --lives;
      }
      wrongLetters.innerHTML = wrong;
      console.log(spacesLeft);
    }
  }

  //show wins count and/or victory screen if word guessed correctly
  //If word is completed
  if (remaining === 0) {
    //Show victory Screen
    victoryScreen.style.display = "block";
    victoryScreen.innerHTML = "You've Won the House Cup!";
    //hide wrong guesses
    guessesHead.style.display = "none";

    wrongLetters.style.display = "none";
    //update win count
    totalWins.innerHTML = "Wins: " + ++wins;
    //Try Again?
    livesLeft.style.display = "none";
    resetBtn.style.display = "block";
    relatedImg.src = chosenImg;
  } else if (lives === 0) {
    //If last life is lost
    //Show failure screen
    secretWord.innerHTML = chosenWord;
    defeatScreen.style.display = "block";

    defeatScreen.innerHTML = "You've Been Cursed!";
    //hide wrong guesses
    guessesHead.style.display = "none";

    wrongLetters.style.display = "none";
    //Try Again?
    livesLeft.style.display = "none";
    resetBtn.style.display = "block";
    totalLosses.innerHTML = "Losses: " + ++losses;
    relatedImg.src = chosenImg;
  }
};

//Reset game
function reset() {
  initialize();
  victoryScreen.style.display = "none";
  defeatScreen.style.display = "none";
  wrongLetters.style.display = "block";
  wrongLetters.innerHTML = wrong;
  guessesHead.style.display = "block";
  livesLeft.style.display = "block";
  livesLeft.innerHTML = "Guesses Remaining: " + lives;
  // totalWins.innerHTML = "Wins: " + wins;
  resetBtn.style.display = "none";
  console.log(guesses);
}
