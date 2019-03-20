const cards = document.querySelectorAll('.gamecard');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
}
secondCard = this;
checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.foto === secondCard.dataset.foto;
    console.log(firstCard.classList, secondCard.classList);
    isMatch ? disableCards() : unFlipCards();
} //function used to compare two cards and find the matches


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
} //function used to keep cards unflipped after matching from checkForMatch()

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
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => {card.addEventListener('click', flipCard);
});