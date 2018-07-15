/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



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
let myMoves = 0;
// This sets up the event listeners
const newDeck = document.getElementsByClassName("card");
for (let i=0; i < newDeck.length; i++){
  // This calls the clicks function that does some work
  newDeck[i].addEventListener ("click", clicks);

};

// these 3 let statements are used to keep track of how many cards are clicked
let firstCard = "";
let secondCard = "";
// let classes = "";
let myClicks = 0;
let myCard = "";
let class1="";
let class2="";
let matches ="";
/*This is the main function and really drives what happens when a card is clicked
it branches out to other functions to achieve the overall effect of picking cards
and matching.
*/

function clicks(event){

  myCard = this;
  myClicks ++;

// this calls the function to show the cards
  openList();
  myCounter();


};

function openList(){
// need to add functionality to check and make sure the cards clicked are not the
// exact same card meaning they literally clicked on same card

  if (myClicks ===1) {

    class1=myCard.classList;
    class1.add("open", "show");
    firstCard =myCard.innerHTML;

    console.log (firstCard);
  };

  if (myClicks ===2) {

    class2=myCard.classList;
    class2.add("open", "show");
    secondCard = myCard.innerHTML;
    console.log(secondCard);
 setTimeout(checkForMatch,250) ;
  };

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
    alert ("The cards do not match.");
    noMatch();
    myClicks=0;
  };
};

function myCounter(){
  if (myClicks===2){
    let myMove = document.querySelector(".moves");
    myMoves ++;
    myMove.textContent = myMoves;
    console.log (myMoves);

  };
};

function scoreCard(){

  const newLi = document.getElementsByTagName("Li");
  let numberStars =0;
  if (myMoves <11){
    numberStars = 3;
  } else if (myMoves>10 && myMoves <16) {
    numberStars = 2;
  }else{
    numberStars=1;
  };

  for (let i=0; i < numberStars; i++){
    // This calls the clicks function that does some work
    newLi[i].innerHTML= '<i class="fa fa-star"></i>';

  };
alert ("Gongratulations!!!! You won!");
};
