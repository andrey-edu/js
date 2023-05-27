export default class GuessNumber {
  constructor(app) {
    this.app = app;
    this.counter = 0;
    this.guessedNumber = 0;
    this.userMsgChoices = ["Ok. Is it ",
                    "Maybe your number is ",
                    "Your number is "];
    this.botMsgChoices = ["No, my number is ",
                          "Are you kidding me? My number is ",
                          "Why it's so hard for you? My number is "];

    this.screen = this.app.querySelector(".app__screen");
    this.sendBtn = this.app.querySelector(".app-controls__button-send");
    this.inputGuess = this.app.querySelector(".app-controls__input-number-field");

    this.sendBtn.addEventListener("click", ()=>{
        this.checkGuess();
    });
  }

  init() {
    this.setGuessedNumber(this.getRandomInt(10));
    this.say("Hello", "bot");
    this.say("I guessed a number from 1 to 10", "bot");
    this.say("Can you guess it?", "bot");
  }

  setGuessedNumber(num) {
    this.guessedNumber = num;
  }

  getGuessedNumber() {
    return this.guessedNumber;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  say(message, cls) {
    const msgBubble = this.createBubble(message, cls);
    this.screen.append(msgBubble)
  }

  randomChoice(choices) {
    return choices[ Math.floor(Math.random() * choices.length) ];
  }

  checkGuess() {
    const checkingNum = parseInt(this.inputGuess.value);
    console.log( checkingNum, this.getGuessedNumber() )

    this.say(this.randomChoice(this.userMsgChoices)+checkingNum+'?', "player");

    if (checkingNum < parseInt(this.getGuessedNumber())) {
      this.say(this.randomChoice(this.botMsgChoices) + "bigger", "bot");
    }
    else if (checkingNum > parseInt(this.getGuessedNumber())) {
      this.say(this.randomChoice(this.botMsgChoices) + "less", "bot");
    }
    else {
      this.say("Damn, you won 😒", "bot");
    }

  }

  createBubble(message, cls) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.classList.add(cls)
    bubble.innerHTML = message;
    return bubble;
  }

}
