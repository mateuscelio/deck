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
    this.resetCurrentDeck();
  }

  filterBySuit(suit) {
    return this.current_deck.filter((card) => card.suit === suit);
  }

  resetCurrentDeck() {
    this.current_deck = [...this.initial_deck];
  }

  shuffleCurrentDeck() {
    this.current_deck = this.current_deck.sort(() => Math.random() - 0.5);
  }
}

const deck = new Deck();

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
  const createdCardsNodes = deck.map((card) => {
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
  });

  deckDiv.replaceChildren(...createdCardsNodes);
}

renderDeck(deck.initial_deck);
