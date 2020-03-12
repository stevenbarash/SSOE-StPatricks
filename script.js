// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
  numSegments: 12, // Specify number of segments.
  outerRadius: 90, // Set outer radius so wheel fits inside the background.
  textFontSize: 20, // Set font size as desired.
  textFontFamily: "Impact",
  textOrientation: "vertical",
  textStrokeStyle: "white",
  // Define segments including colour and text.
  segments: [
    { fillStyle: "#009f52", text: "2500" },
    { fillStyle: "#ff9fe4", text: "500" },
    { fillStyle: "#5fdfff", text: "500" },
    { fillStyle: "#ffff00", text: "500" },
    { fillStyle: "#ff0000", text: "500" },
    { fillStyle: "#bf5fff", text: "500" },
    { fillStyle: "#009f52", text: "1500" },
    { fillStyle: "#ff9fe4", text: "500" },
    { fillStyle: "#5fdfff", text: "500" },
    { fillStyle: "#ffff00", text: "500" },
    { fillStyle: "#ff0000", text: "500" },
    { fillStyle: "#bf5fff", text: "500" }
  ],
  // Specify the animation to use.
  animation: {
    type: "spinToStop",
    duration: 5, // Duration in seconds.
    spins: 8, // Number of complete spins.
    callbackFinished: promptGuess
  }
});

// Vars used by the code in this page to do power controls.
let wheelPower = 0;
let wheelSpinning = false;

var score = 0;
//stores the letters guessed previously in a list
var guessedLetters = [];
//stores the letters that are correct guesses
var correctLetters = [
  "H",
  "A",
  "P",
  "Y",
  "S",
  "T",
  "D",
  "F",
  "R",
  "O",
  "M",
  "W",
  "N"
];
//stores the value where the wheel spin lands
var currentWheelValue = 500;

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
  // Ensure that spinning can't be clicked again while already running.
  if (wheelSpinning == false) {
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    if (wheelPower == 1) {
      theWheel.animation.spins = 3;
    } else if (wheelPower == 2) {
      theWheel.animation.spins = 8;
    } else if (wheelPower == 3) {
      theWheel.animation.spins = 15;
    }

    // Disable the spin button so can't click again while wheel is spinning.
    //   document.getElementById("spin_button").src = "spin_off.png";
    //   document.getElementById("spin_button").className = "";

    // Begin the spin animation by calling startAnimation on the wheel object.
    theWheel.startAnimation();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
  }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
  theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
  theWheel.draw(); // Call draw to render changes to the wheel.

  wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
  // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
  alert("You have won " + indicatedSegment.text);
}

function addToBoard(correctLetter) {
  //adds letter to board
  // check at the end if all letters are added, disable spin button

  var store = document.querySelectorAll(".inner " + "." + correctLetter);
  for (var i = 0; i < store.length; i++) {
    store[i].innerHTML = "<p>" + correctLetter + "</p>";
  }
}
function promptGuess(indicatedSegment) {
  currentWheelValue = parseInt(indicatedSegment.text);
  var input = prompt("Enter a Letter");
  var guess = "";
  //rejects input if null or length greater than 1
  if (input !== null && input.length == 1) {
    guess = input.toUpperCase();

    if (guessedLetters.includes(guess)) {
      alert("You already guessed this.");
      this.promptGuess();
    } else {
      //check if correctletters array contains guess
      if (correctLetters.includes(guess)) {
        score = score + currentWheelValue;

        guessedLetters.push(guess);

        this.addToBoard(guess);
        document.getElementsByClassName("score-display")[0].innerHTML =
          "Score: " + score.toString();
        console.log(score);
        console.log(currentWheelValue);

        // if (this.state.guessedLetters.includes) {
        //   alert("You win!");
        // }
      } else {
        //subtract current wheel value from score, record guessed letter
        var newScore = score - currentWheelValue;
        guessedLetters.push(guess);

        score = newScore;
        console.log(score);
        console.log(currentWheelValue);

        document.getElementsByClassName("score-display")[0].innerHTML =
          "Score: " + score.toString();
      }
    }
  } else {
    alert("Please only input single letters.");
  }
}
