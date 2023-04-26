let mainContainer = document.querySelector("#mainContainer");
console.log(mainContainer);

let deckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

fetch(deckUrl, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  // GET requests do not have a body because client is not sending any data
})
  .then((response) => {
    // waits for the request to complete
    // response is what the request returned
    return response.json();
  })
  .then((parsedResponse) => {
    // data is what the above promise (step) returned
    let deckId = parsedResponse.deck_id;
    return deckId;
  })
  .then((idFromPrevStep) => {
    fetch(
      `https://deckofcardsapi.com/api/deck/${idFromPrevStep}/draw?count=2`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        for (let card of parsedResponse.cards) {
          let cardEl = document.createElement("img");
          cardEl.src = card.image;
          mainContainer.appendChild(cardEl);
        }
      });
  });
