const cards = document.querySelectorAll('.gamecard');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; //prevents the clicking(flipping) of the first card twice

    this.classList.add('flip');//upon success of the first two checks, flips the card

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    } //carried out to determine the first card by checking if in the current pairing attempt, this is the first flip

  secondCard = this;//determines the second card by exiting the first card's criteria if statement
  checkForMatch();//called to determine the Match of the cards

}

function checkForMatch() {
    let isMatch = firstCard.dataset.foto === secondCard.dataset.foto;
    isMatch ? disableCards() : unFlipCards();
} //function used to compare two cards and find the matches using the unique data attached to each gamecard div class


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
} //function used to keep cards unflipped after matching from checkForMatch() by removing their "clickability"

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 500);
} //function used to return cards to face down after not matching

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}//used to carry out the reflipping of the cards and setting of the board, used by the unFlipCards function

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();//carries out the shuffling of the cards, that every game may be different from the previous board


cards.forEach(card => {card.addEventListener('click', flipCard);
});//Makes user able to click the cards
