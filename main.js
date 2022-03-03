class Deck {
  card_suits = ["hearts", "spades", "diams", "clubs"];
  card_numbers = [
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
    this.card_suits.forEach((suit) => {
      this.card_numbers.forEach((n) => {
        this.initial_deck.push({ suit, n });
      });
    });

    this.current_deck = [...this.initial_deck];
  }

  filterBySuit(suit) {
    return this.current_deck.filter((card) => card.suit === suit);
  }
}

const deck = new Deck();

//Deck div
const deckDiv = document.querySelector(".deck");

//Buttons
const heartsBtn = document.querySelector("#hearts-btn");
const spadesBtn = document.querySelector("#spades-btn");
const diamsBtn = document.querySelector("#diams-btn");
const clubsBtn = document.querySelector("#clubs-btn");

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
  const createdCardsNodes = deck.map((card) => {
    const el = document.createElement("div");
    el.innerHTML = `${card.n} &${card.suit};`;
    el.className = "deck__card";
    return el;
  });

  deckDiv.replaceChildren(...createdCardsNodes);
}

renderDeck(deck.initial_deck);
