const cardImages = ["kazuha", "cyno", "nahida", "raiden", "wanderer", "xiao"];
const gameBoard = document.getElementById("game-board");
let selectedCards = []; // keep track which cards were selected
let matchedPairs = 0; // to track when game ends

initializeGame();

function initializeGame() {
  // Shuffle the cards
  shuffledCards = shuffle([...cardImages, ...cardImages]);

  // Create card elements and add them to the game board
  for (let index = 0; index < shuffledCards.length; index++) {
    const imageName = shuffledCards[index];

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-image", imageName);
    cardElement.addEventListener("click", () => flipCard(cardElement));

    gameBoard.appendChild(cardElement);
  }
}

function flipCard(card) {
  if (selectedCards.length < 2) {
    selectedCards.push(card); // adds card to selectedCards using push()
    card.style.backgroundImage = `url("${card.dataset.image}.png")`;
    // selectedCards.setAttribute(“onclick”, null);
  }

  if (selectedCards.length === 2) {
    setTimeout(checkMatch, 1000); // 1000 miliseconds (1 second)
  }
}

function checkMatch() {
  const [card1, card2] = selectedCards;

  // checks if card1 and card2 match
  if (card1.dataset.image === card2.dataset.image) {
    // if cards match, make them disappear
    card1.removeEventListener("click", () => flipCard(card1)); // prevents card 1 from being clicked
    card2.removeEventListener("click", () => flipCard(card2)); // prevents card 2 from being clicked
    matchedPairs++;

    // when all solved
    if (matchedPairs === cardImages.length) {
      alert("Congratulations");
    }

    card1.style.backgroundImage = `url("${card1.dataset.image}.gif")`;
    card2.style.backgroundImage = `url("${card2.dataset.image}.gif")`;
  }

  else {
    // if cards don't match, flip them back
    card1.style.backgroundImage = 'url("back.png")';
    card2.style.backgroundImage = 'url("back.png")';
  }

  selectedCards = []; // resets
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetGame() {
  gameBoard.innerHTML = '';
  initializeGame();
}
