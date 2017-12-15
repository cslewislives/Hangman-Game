//=======================================================
initialize();
//declare variables here: 
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Variable storing the alphabet
var alphArr = alphabet.split("");
    console.log(alphArr);
//because of how I built my game I had to declare A LOT of variables. Mostly just so my function would work
var chosenWord;
var sorted;
var spacesLeft;
var wrong;
var guesses;
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
var backgroundMusic;
var winSound;
var loseSound;
//=======================================================
// I had a hard time getting my audio to work so I created sound object generators that I found via google.
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
  document.body.appendChild(this.sound);
}
function BackgroundSound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("loop", true);
  this.sound.volume = 0.3;
  this.sound.style.display = "none";
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
  document.body.appendChild(this.sound);
}
backgroundMusic.play();
//=======================================================

// Function to initialize the game

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
  //display the number of spaces for chosen word
  for (var j = 0; j < length; j++) {
    //Creating the correct amount of spaces for the chosen word
    spacesLeft[j] = " _ ";
  }
  secretWord = document.getElementById("word");
  secretWord.innerHTML = spacesLeft.join(" ");
  console.log(spacesLeft);
  //=======================================================
  // I wanted to add image functionality to the game.
  // When user wins or loses they see a picture of the word.
  relatedImg = document.getElementById("mainImage");
  // needed for re-initialize
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
// in order to get the right picture I had to match the index of the pic to the index of the word.
// I would love to learn if there is a way to do this dynamically
  chosenImg = images[sorted.indexOf(chosenWord)];

  //=======================================================
  // I also wanted audio functionality.
  // winSound for victory/loseSound for defeat and background.
  backgroundMusic = new BackgroundSound("assets/music/Hedwigs-theme.mp3");
  winSound = new Sound("assets/music/housecup-final.mp3");
  loseSound = new Sound("assets/music/expelliarmus.mp3");

  //=======================================================

  //Function containing the actual game logic.

  //Press any key to get started!
  document.onkeyup = function(event) {
    //switches to the info screen
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
              //replace space with the letter and lower remaining guesses
              secretWord.innerHTML = spacesLeft.join(" ");
              --remaining;
              console.log("Remaining Letters " + remaining);
            }
          }
        } else {
          //show incorrect guess
          wrong += userGuess + " ";
          wrongLetters.innerHTML = wrong;
          //lose a life
          livesLeft.innerHTML = "Guesses Remaining: " + --lives;
        }
        console.log(spacesLeft);
      }

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
        // display related image
        relatedImg.src = chosenImg;
        // play winning sound
        winSound.play();
        // allow no other input or else win and lose count will keep going up
        document.onkeyup = function() {
          return false;
        };
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
        // show related image
        relatedImg.src = chosenImg;
        //play losing sound
        loseSound.play();
        //restrict input
        document.onkeyup = function() {
          return false;
        };
      }
    }
  };
}


//Reset game
function reset() {
  // quit sounds
  winSound.stop();
  loseSound.stop();
  // re-initialize after setting onkeyup to false
  initialize();
  // return to info screen
  victoryScreen.style.display = "none";
  defeatScreen.style.display = "none";
  wrongLetters.style.display = "block";
  wrongLetters.innerHTML = wrong;
  guessesHead.style.display = "block";
  livesLeft.style.display = "block";
  livesLeft.innerHTML = "Guesses Remaining: " + lives;
  totalWins.innerHTML = "Wins: " + wins;
  resetBtn.style.display = "none";
}
