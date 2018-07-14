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

// This sets up the event listeners
const newDeck = document.getElementsByClassName("card");
for (let i=0; i < newDeck.length; i++){
  // This calls the clicks function that does some work
  newDeck[i].addEventListener ("click", clicks);

};

// these 3 let statements are used to keep track of how many cards are clicked
let firstCard = "";

let secondCard = "";

let myClicks = 0;

/*This is the main function and really drives what happens when a card is clicked
it branches out to other functions to achieve the overall effect of picking cards
and matching.
*/
function clicks(event){
myClicks ++;


if (myClicks ===1) {
  firstCard =this.innerHTML;
  console.log (firstCard);
};

if (myClicks ===2) {
  secondCard = this.innerHTML;
  console.log(secondCard);
};
// this calls the function to show the cards
showMe();
console.log(myClicks);
};

// this will be the part that makes the cards show
function showMe(){


// need to update this to add the matched class to the cards if they match
if (firstCard === secondCard) {
  console.log ("GREAT");

};
};
