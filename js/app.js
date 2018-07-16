/*
 * Create a list that holds all of your cards
 */
 "use strict";

 let firstCard = "";
 let secondCard = "";
 let myClicks = 0;
 let myCard = "";
 let class1="";
 let class2="";
 let matches ="";
 let myMoves = 0;
 let numberStars =0;
 let startTime="";
 let finishTime="";
 let totalClicks = 0;
 let myTime="";
 let myTimer="";
 let runningTime="";
 let modal = "";
 let totalStars = "";
 const firstStar = document.querySelector(".star1");
 const secondStar = document.querySelector(".star2");
 const oneStar = firstStar.classList;
 const twoStar = secondStar.classList;

 const rawCards =['<i class="fa fa-diamond"></i>',
                '<i class="fa fa-paper-plane-o"></i>',
                '<i class="fa fa-anchor"></i>',
                '<i class="fa fa-bolt"></i>',
                '<i class="fa fa-cube"></i>',
                '<i class="fa fa-leaf"></i>',
                '<i class="fa fa-bicycle"></i>',
                '<i class="fa fa-bomb"></i>'];

/*Thank you to the Udacity Reviewer that suggested to use the concat to clean up the code*/
const cards = rawCards.concat(rawCards);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// shuffle function from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/34377908#34377908
Array.prototype.shuffle = function() {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
};
cards.shuffle();

const newCard = document.getElementsByClassName("card");

for (let i=0; i < newCard.length; i++){

  for(let i = 0; i < cards.length; i++){
  newCard[i].innerHTML= cards[i];
  };
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// This sets up the event listeners
const newDeck = document.getElementsByClassName("card");

for (let i=0; i < newDeck.length; i++){

  newDeck[i].addEventListener ("click", clicks);
};

// restarts the Game
const myRestart = document.querySelector('.fa-repeat');
myRestart.addEventListener("click", reStart);

function reStart(){
  location.reload();
};

/*This is the main function and really drives what happens when a card is clicked
it branches out to other functions to achieve the overall effect of picking cards
and matching.
*/

function clicks(event){
  if (totalClicks===0){
    startTime = performance.now();
  };
  myCard = this;
  myClicks ++;

// this calls the function to show the cards
  openList();
// this increases the total Clicks
  totalClicks ++;
  //this keeps the timer running
  timer();
  // this stops the timer function
  stopTimer();
};

// This adds the cards to the open list. The OPEN: label is to control flow.
function openList(){OPEN:{
// the first if statement checks to see if a card is already open. If it is
// then the break jumps out of the routine
if(myCard.classList.contains ("open")){
  myClicks --;
  break OPEN;
};
// Assigns innerHTML to variables and shows the cards
  if (myClicks ===1) {

    class1=myCard.classList;
    class1.add("open", "show");
    firstCard =myCard.innerHTML;
  };

  if (myClicks ===2) {

    class2=myCard.classList;
    class2.add("open", "show");
    secondCard = myCard.innerHTML;
    // setTimeout is used to give the user a second to view the 2 cards open
    setTimeout(checkForMatch,1000) ;
  };
     myCounter();
     scoreCard();
     stopTimer();
}
};

// add the match class. If finished calculate time
function match(){

  class1.add("match");
  class2.add("match");
  matches ++;
  if (matches===8){
    const endTime = performance.now();
    finishTime= Math.round(((endTime-startTime)/1000));
    console.log (finishTime + " seconds");
    stopTimer();
  };
};

// closes cards if no match
function noMatch(){

  class1.remove("open","show");
  class2.remove("open","show");
};

// this compares the cards clicked
function checkForMatch(){
  if (firstCard === secondCard) {
    match();
    myClicks=0;
  };

  if (firstCard != secondCard && myClicks===2) {
    noMatch();
    myClicks=0;
  };
};

// this counts the moves and writes to web page
function myCounter(){

  if (myClicks===2){
    let myMove = document.querySelector(".moves");
    myMoves ++;
    myMove.textContent = myMoves;
  };
};

// this keeps track of the rating stars
function scoreCard(){

  if (myMoves>7 && matches<4){
    oneStar.add("hide");

  } else if (myMoves>17){
    twoStar.add("hide");

  };
  // this portion counts the stars not hidden at the end
  const hideStars = document.getElementsByClassName('hide');
  totalStars = 3 - hideStars.length;
  console.log (totalStars);
};
// this is the timer
function timer() {
  if (totalClicks===1){
//set interval keeps it updating every second
  myTime = setInterval(newTimer,1000);
  };
};

// this round the timer and puts on the web page
function newTimer(){
  runningTime = Math.round(((performance.now()- startTime)/1000));
  myTimer = document.querySelector(".timer");
  myTimer.textContent = "        " +runningTime;
};

function stopTimer(){

  if (matches===8){
    clearInterval(myTime);
    myTimer.textContent = "        " + finishTime;
    myBox();
  };
};
//  the code below sets up the modal and hides as necessary
function myBox(){
  modal = document.getElementById('myModal')
  const myNewText =document.querySelector(".modal-text");
  myNewText.textContent = "You completed the game in " + finishTime + " seconds and earned "+ totalStars + " \
  stars. If you would like to play another game, click the refresh button after closing this window. \
  To close This window, click inside of it."
  modal.style.display="block";
}

window.onclick = function(event){
  if (event.target != modal){
  modal.style.display = "none";
};
};
