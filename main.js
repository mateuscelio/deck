class Deck {
  CARD_SUITS = ["hearts", "spades", "diams", "clubs"];
  CARD_NUMBERS = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  initial_deck = [];
  current_deck = [];

  constructor() {
    this.initial_deck = this.generateInitialDeck();
    this.resetCurrentDeck();
  }

  generateInitialDeck() {
    return this.CARD_SUITS.flatMap((suit) =>
      this.CARD_NUMBERS.map((n) => ({ suit, n }))
    );
  }

  filterBySuit(suit) {
    return this.current_deck.filter((card) => card.suit === suit);
  }

  resetCurrentDeck() {
    this.current_deck = [...this.initial_deck];
  }

  shuffleCurrentDeck() {
    this.current_deck.sort(() => Math.random() - 0.5);
  }
}

const deck = new Deck();

// DOM manipulation

//Deck div
const deckDiv = document.querySelector(".deck");

//Buttons
const initialDeckBtn = document.querySelector("#initial-deck-btn");
const shuffleDeckBtn = document.querySelector("#shuffle-deck-btn");
const heartsBtn = document.querySelector("#hearts-btn");
const spadesBtn = document.querySelector("#spades-btn");
const diamsBtn = document.querySelector("#diams-btn");
const clubsBtn = document.querySelector("#clubs-btn");

initialDeckBtn.addEventListener("click", () => {
  deck.resetCurrentDeck();
  renderDeck(deck.current_deck);
});
shuffleDeckBtn.addEventListener("click", () => {
  deck.shuffleCurrentDeck();
  renderDeck(deck.current_deck);
});
heartsBtn.addEventListener("click", () =>
  renderDeck(deck.filterBySuit("hearts"))
);
spadesBtn.addEventListener("click", () =>
  renderDeck(deck.filterBySuit("spades"))
);
diamsBtn.addEventListener("click", () =>
  renderDeck(deck.filterBySuit("diams"))
);
clubsBtn.addEventListener("click", () =>
  renderDeck(deck.filterBySuit("clubs"))
);

function renderDeck(deck) {
  const createdCardsNodes = deck.map((card) => createCardNode(card));
  deckDiv.replaceChildren(...createdCardsNodes);
}

function createCardNode(card) {
  const cardElement = document.createElement("div");

  const numberElement = document.createElement("div");
  const numberElementInverted = document.createElement("div");
  const suitElement = document.createElement("div");

  numberElement.innerHTML = `${card.n}`;
  numberElementInverted.innerHTML = `${card.n}`;
  suitElement.innerHTML = `&${card.suit};`;

  numberElement.className = "deck__card__number";
  numberElementInverted.classList.add(
    "deck__card__number",
    "deck__card__number--inverted"
  );
  suitElement.className = "deck__card__suit";

  cardElement.append(numberElement, suitElement, numberElementInverted);

  cardElement.classList.add("deck__card", `deck__card--${card.suit}`);
  return cardElement;
}

//Initial Render
renderDeck(deck.initial_deck);
