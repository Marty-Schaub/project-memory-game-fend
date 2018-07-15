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
  // This calls the clicks function that does some work
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

  myCard = this;
  myClicks ++;

// this calls the function to show the cards
  openList();
  // myCounter();


};

function openList(){OPEN:{
// need to add functionality to check and make sure the cards clicked are not the
// exact same card meaning they literally clicked on same card
if(myCard.classList.contains ("open")){
  // put code here to stop the execution
  alert ("please pick another card");
  myClicks --;
  break OPEN;
};
  if (myClicks ===1) {

    class1=myCard.classList;
    class1.add("open", "show");
    firstCard =myCard.innerHTML;

  };

  if (myClicks ===2) {

    class2=myCard.classList;
    class2.add("open", "show");
    secondCard = myCard.innerHTML;
    setTimeout(checkForMatch,1000) ;
  };
     myCounter();
}
};


function match(){

  class1.add("match");
  class2.add("match");
  matches ++;
  if (matches===8){
    scoreCard();
  };
};

function noMatch(){

  class1.remove("open","show");
  class2.remove("open","show");
};


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

function myCounter(){
  if (myClicks===2){
    let myMove = document.querySelector(".moves");
    myMoves ++;
    myMove.textContent = myMoves;


  };
};

function scoreCard(){

  const newLi = document.getElementsByTagName("Li");
  if (myMoves <11){
    numberStars = 3;
    alert ("Gongratulations!!!! You won in " + myMoves + " moves. You earned 3 Stars.");
  } else if (myMoves>10 && myMoves <16) {
    numberStars = 2;
    alert ("Gongratulations!!!! You won in " + myMoves + " moves. You earned 2 Stars.");
  }else{
    numberStars=1;
    alert ("Gongratulations!!!! You won in " + myMoves + " moves. You earned a Star.");
  };

  for (let i=0; i < numberStars; i++){
    // This calls the clicks function that does some work
    newLi[i].innerHTML= '<i class="fa fa-star"></i>';

  };

};
