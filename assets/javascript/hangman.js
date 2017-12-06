//declare variables here:
var alphabet = "abcdefghijklmnopqrstuvwxyz"; // Variable storing the alphabet
var alphArr = alphabet.split("");
console.log(alphArr);
//a list of words from the theme for the computer to choose from after getting started.
var words = ["Harry", "Ron", "Hermione", "Ginny", 
"Malfoy", "Dumbledore", "Hagrid", "Gryffindor", 
"Hufflepuff", "Ravenclaw", "Slytherin", "Hogwarts"];
var sorted = []; //turn all words in the array into uppercase
    for (var i = 0; i < words.length; i++) {
        sorted[i] = words[i].toUpperCase();
    }
    console.log(sorted);
var lives = 13;
var wins = 0;
var chosenWord = sorted[Math.floor(Math.random() * sorted.length)];
    console.log(chosenWord);
var spacesLeft = [];
    for (var j = 0; j < chosenWord.length; j++) { //Creating the correct amount of spaces for the chosen word
        spacesLeft[j] = " _ ";
    }
var wrong = " ";
// var guesses = [ ]; //empty array for storing user guesses

//display the number of spaces for chosen word
document.getElementById('word').innerHTML = "<h2>" + spacesLeft.join(" ") + "</h2>";
console.log(spacesLeft);


//set a variable for remaining letters
var remaining = chosenWord.length;
console.log(remaining);

//Press any key to get started!
//replace heading with the spaces of the chosen word
document.onkeyup = function(event) {
    document.getElementById("hide").style.display = "none";
    document.getElementById("guesses").innerHTML = "Guesses: ";
    document.getElementById("lives").innerHTML ="Guesses Remaining: " + lives;
    document.getElementById("wins").innerHTML = "Wins: " + wins;

    var userGuess = event.key.toUpperCase();
    console.log(chosenWord.indexOf(userGuess))
    //check for valid letter
    // if (alphArr.indexOf(userGuess) == -1) {
    //     return false;
    // }
    // console.log(alphArr.indexOf(userGuess));
    
    //user inputs letters and we need to store the guesses
    //If Letter is correct {
        if (chosenWord.indexOf(userGuess) != -1) {
            for (var k = 0; k < chosenWord.length; k++) {
                if (userGuess === chosenWord[k]) {
                    spacesLeft[k] = userGuess;
                    //replace space with the letter
                    document.getElementById('word').innerHTML = "<h2>" + spacesLeft.join(" ") + "</h2>";
                    // --remaining;
                    // console.log(remaining);
                } 
            }
        }
        else if (chosenWord.indexOf(userGuess) == -1) {
            wrong += userGuess;
            document.getElementById("wrongLetters").innerHTML = wrong;
            document.getElementById("lives").innerHTML ="Guesses Remaining: " + --lives;
        }
    console.log(spacesLeft);
    //Else {
        //lose a life
        //show incorrect guess
        //}
        
    //show wins count and/or victory screen if word guessed correctly
    //If word is completed {
        //Show victory Screen
        //Try Again?
        //update win count
        //}
        
    //give a max try amount until fail.
    //If last life is lost {
        //Show failure screen
        //Try Again?
        //}
        
        //Reset game
        //If try again {
            //reset the game
            //}
                        
}