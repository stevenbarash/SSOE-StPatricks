import React, { Component } from "react";
import "./App.css";
import { TweenMax, Power4 } from "gsap";
import { wait } from "@testing-library/react";

// import Confetti from 'react-confetti'
// const { width, height } = useWindowSize()

export default class App extends Component {
  rotation = 0;

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      guessedLetters: [],
      correctLetters: [
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
      ],
      currentWheelValue: 500
    };
    this.spinWheel = this.spinWheel.bind(this);
  }

  // animateWheel() {
  //   var rotation;
  //   var wheel = document.getElementById("wheel");

  //   let randomNum = Math.floor(Math.random() * 10);
  //   rotation += 30 * 10 + 30 * randomNum;

  //   TweenMax.to(wheel, 10, {
  //     ease: Power4.easeOut,
  //     rotation: rotation,
  //     onComplete: this.checkGuess
  //   });
  // }

  async spinWheel() {
    var wheel = document.getElementById("wheel");
    var wheelStyle = window.getComputedStyle(wheel, null);

    // wheel.classList.remove("stop-animation");
    wheel.classList.add("wheel-animated");

    wheel.style.animationPlayState = "running";

    // var newWheel = wheel.cloneNode(true);

    // wheel.parentNode.replaceChild(newWheel, wheel);

    // console.log((Math.random*10))

    var angle = 0;
    setTimeout(() => {
      // var wheel = document.getElementById("wheel");
      // var wheelStyle = window.getComputedStyle(wheel, null);

      // wheel.classList.add("stop-animation");
      wheel.style.animationPlayState = "paused";

      var rotation = wheelStyle.getPropertyValue("transform");

      //takes cosine and sine of rotation, does some geometry to get rotation degree value
      if (rotation !== "none" && rotation !== null) {
        var values = rotation
          .split("(")[1]
          .split(")")[0]
          .split(",");
        var a = values[0];
        var b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      } else {
        var angle = 0;
      }

      //make sure the wheel rotation doesn't reset
      // wheel.style.transform = "rotate(" + angle + "deg)";

      console.log(angle);

      // sets the currentWheelValue to the value the spinner is at
      // the higher scores are between these degrees of rotation
      if (angle <= 185 && angle >= 173) {
        this.setState({
          currentWheelValue: 1000
        });
      }
      if ((angle <= 7 && angle >= 0) || (angle <= 353 && angle >= 359)) {
        this.setState({
          currentWheelValue: 2500
        });
      } else {
        this.setState({
          currentWheelValue: 500
        });
      }
      console.log(rotation);
      // wheel.classList.add("stop-animation");
      wheel.classList.remove("wheel-animated");

      this.checkGuess();
    }, 1200);

    // document.getElementById("wheel").classList.remove("wheel-animated");
    // document.getElementById("wheel").classList.remove("stop-animation");

    //spin wheel, set state to what the wheel is at
    // let randomNum = Math.floor(Math.random() * 10);
    // let duration = Math.floor(100);

    // rotation += 30 * duration + 30 * randomNum;

    // if(this.state.currentWheelValue!== 0){

    // }

    //do UI stuff, make spin random
    return 1;
  }

  async checkGuess() {
    // var doneSpinning = await this.spinWheel();

    // var doneSpinning = true;

    //prompt user for a guess, check if the letter was already guessed.
    // if not, then it checks if it is in the correct letters array
    // adds/subtracts score based on current wheel value depending on correct/incorrect answer
    // this.spinWheel();
    var input = prompt("Enter a Letter");
    var guess = "";
    //rejects input if null or length greater than 1
    if (input !== null && input.length == 1) {
      guess = input.toUpperCase();
    } else {
      alert("Please only input single letters.");
    }

    if (this.state.guessedLetters.includes(guess)) {
      alert("You already guessed this.");
      this.checkGuess();
    } else {
      //check if correctletters array contains guess
      if (this.state.correctLetters.includes(guess)) {
        this.setState({
          score: this.state.score + this.state.currentWheelValue
        });
        this.state.guessedLetters.push(guess);

        this.addToBoard(guess);
        // if (this.state.guessedLetters.includes) {
        //   alert("You win!");
        // }
      } else {
        //subtract current wheel value from score, record guessed letter
        var newScore = this.state.score - this.state.currentWheelValue;
        this.state.guessedLetters.push(guess);

        this.setState({ score: newScore });
      }
    }
  }

  addToBoard(correctLetter) {
    //adds letter to board
    // check at the end if all letters are added, disable spin button

    var store = document.querySelectorAll(".inner " + "." + correctLetter);
    for (var i = 0; i < store.length; i++) {
      store[i].innerHTML = "<p>" + correctLetter + "</p>";
    }
  }

  render() {
    return (
      <div className="fl-container">
        <div className="logo">
          <span className="logo__text">Luck O'</span>
          <span className="logo__text second">The Irish</span>
          <span className="logo__shadow">Luck O'</span>
          <span className="logo__shadow second">The Irish</span>
        </div>
        <div className="game-area-container">
          <div className="wheel-container">
            <div className="arrow">▼</div>
            <div id="wheel" className="wheel">
              <img src="./spinner.png" />
            </div>
          </div>

          <div className="container">
            {/* --------- Row 1 */}
            <div className="tile push">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="H"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="A"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="P"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="P"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="Y"> </p>
              </div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            {/* --------- Row 2 */}
            <div className="tile start">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="S"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="T"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p>.</p>
              </div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="P"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="A" />
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="T"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="T"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="Y"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p>'</p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="S"> </p>
              </div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            {/* --------- Row 3 */}
            <div className="tile start">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="D"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="A"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="Y"> </p>
              </div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="F"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="R"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="O"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="M"> </p>
              </div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            {/* -------- Row 4 */}
            <div className="tile push">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="S"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="W"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="A"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="N"></p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="S"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="O"> </p>
              </div>
            </div>
            <div className="tile white">
              <div className="inner">
                <p className="N" />
              </div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
            <div className="tile">
              <div className="inner"></div>
            </div>
          </div>
        </div>
        <h1>Score: {this.state.score}</h1>
        <button
          className={"reset-btn"}
          onClick={() => {
            this.spinWheel();
          }}
        >
          Spin
        </button>
      </div>
    );
  }
}
