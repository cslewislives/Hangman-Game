//declare variables here:
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Variable storing the alphabet
var alphArr = alphabet.split("");
console.log(alphArr);
//a list of words from the theme for the computer to choose from after getting started.
function chooseWord() {

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
        "Hogwarts"
    ];
    var sorted = []; //turn all words in the array into uppercase
    for (var i = 0; i < words.length; i++) {
        sorted[i] = words[i].toUpperCase();
    }
    console.log(sorted);
    chosenWord = sorted[Math.floor(Math.random() * sorted.length)];
    console.log(chosenWord);
    length = chosenWord.length;
}

chooseWord();
var chosenWord;
var spacesLeft = [];
var wrong = " ";
var guesses = []; //empty array for storing user guesses
var lives = 7;
var wins = 0;
var losses = 0;
var length;
var remaining = length;
console.log("Remaining Letters " + remaining);

for (var j = 0; j < length; j++) {
  //Creating the correct amount of spaces for the chosen word
  spacesLeft[j] = " _ ";
}
//display the number of spaces for chosen word
document.getElementById("word").innerHTML =
  "<h2>" + spacesLeft.join(" ") + "</h2>";
console.log(spacesLeft);

//Press any key to get started!
//replace heading with the spaces of the chosen word
document.onkeyup = function(event) {
    
  document.getElementById("hide").style.display = "none";
  document.getElementById("guesses").innerHTML = "Guesses: ";
  document.getElementById("lives").innerHTML = "Guesses Remaining: " + lives;
  document.getElementById("wins").innerHTML = "Wins: " + wins;
  document.getElementById("losses").innerHTML = "Losses: " + losses;

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
            document.getElementById("word").innerHTML =
              "<h2>" + spacesLeft.join(" ") + "</h2>";
            --remaining;
            console.log("Remaining Letters " + remaining);
          }
        }
      } else if (chosenWord.indexOf(userGuess) == -1) {
        //show incorrect guess
        wrong += userGuess + " ";
        document.getElementById("wrongLetters").innerHTML = wrong;
        //lose a life
        document.getElementById("lives").innerHTML =
          "Guesses Remaining: " + --lives;
      }
      document.getElementById("wrongLetters").innerHTML = wrong;
      console.log(spacesLeft);
    }
  }

  //show wins count and/or victory screen if word guessed correctly
  //If word is completed {
  if (remaining === 0) {
    //Show victory Screen
    document.getElementById("victory").style.display = "block";
    document.getElementById("victory").innerHTML = "You've Won the House Cup!";
    //hide wrong guesses
    document.getElementById("guesses").style.display = "none";
    
    document.getElementById("wrongLetters").style.display = "none";
    //update win count
    document.getElementById("wins").innerHTML = "Wins: " + ++wins;
    //Try Again?
    document.getElementById("lives").style.display = "none";
    document.getElementById("resetButton").style.display = "block";
  } else if (lives === 0) {
    //give a max try amount until fail.
    //If last life is lost {
    //Show failure screen
    document.getElementById("defeat").style.display = "block";
    
    document.getElementById("defeat").innerHTML = "You've Been Cursed!";
    //hide wrong guesses
    document.getElementById("guesses").style.display = "none";
    
    document.getElementById("wrongLetters").style.display = "none";
    //Try Again?
    document.getElementById("lives").style.display = "none";
    document.getElementById("resetButton").style.display = "block";
    document.getElementById("losses").innerHTML = "Losses: " + ++losses;
  }
};

guesses = [];

//Reset game
function reset() {
    chooseWord();
    wrong = " ";
    remaining = length;
    lives = 7;
    // guesses = [];
    spacesLeft = [];
    for (var j = 0; j < length; j++) {
        //Creating the correct amount of spaces for the chosen word
        spacesLeft[j] = " _ ";
      }
    document.getElementById("word").innerHTML =
    "<h2>" + spacesLeft.join(" ") + "</h2>";
    document.getElementById("victory").style.display = "none";
    document.getElementById("defeat").style.display = "none";
    document.getElementById("wrongLetters").style.display = "block";
    document.getElementById("wrongLetters").innerHTML = wrong;
    document.getElementById("guesses").style.display = "block";
    document.getElementById("lives").style.display = "block";
    document.getElementById("lives").innerHTML = "Guesses Remaining: " + lives;
    // document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("resetButton").style.display = "none";
    return chosenWord;
}

var newWord = chosenWord;
console.log(newWord);
//If try again {
//reset the game
//}
