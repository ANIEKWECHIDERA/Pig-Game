'use strict';

const player0 = document.querySelector(`.player--0`);
const player1 = document.querySelector(`.player--1`);

const tScoreP1 = document.getElementById(`score--0`);
const tScoreP2 = document.getElementById(`score--1`);
const cScorep1 = document.getElementById(`current--0`);
const cScorep2 = document.getElementById(`current--1`);
const dice = document.querySelector(`.dice`);
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/////specifying starting conditions
tScoreP1.textContent = 0;
tScoreP2.textContent = 0;
dice.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0.classList.toggle(`player--active`);
  player1.classList.toggle(`player--active`);
};
//rolling dice func
btnRoll.addEventListener('click', () => {
  if (playing) {
    ///generate a randon dice number
    const randDice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(randDice);

    //display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${randDice}.png`;

    const active = document.getElementById(`current--${activePlayer}`);
    //check for rolled 1: if true switch to next player
    if (randDice !== 1) {
      //add dice value to current score
      currentScore += randDice;

      active.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    //add current score to player main score
    scores[activePlayer] += currentScore;
    //display the player held score
    const tScore = document.getElementById(`score--${activePlayer}`);
    tScore.textContent = scores[activePlayer];

    //check if the player's score is >= 100 if true finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
  //switch player
});

const resetGame = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer = 0;
  currentScore = 0;

  if (activePlayer === 0) {
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove(`player--active`);
    player0.classList.add(`player--active`);
  } else {
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove(`player--active`);
    player0.classList.add(`player--active`);
  }
  tScoreP1.textContent = 0;
  tScoreP2.textContent = 0;
  cScorep1.textContent = 0;
  cScorep2.textContent = 0;
  dice.classList.add('hidden');
  playing = true;
};

btnNew.addEventListener('click', resetGame);
