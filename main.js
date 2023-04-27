let mainContainer = document.querySelector("#mainContainer");
console.log(mainContainer);

let deckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
// obtained the URL from the API docs https://deckofcardsapi.com/

fetch(deckUrl, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  // GET requests do not have a body because client is not sending any data
})
  .then((response) => {
    // waits for the request to complete
    // response is what the request returned
    return response.json();
    // parse the response body
    //https://developer.mozilla.org/en-US/docs/Web/API/Response/json
  })
  .then((parsedResponse) => {
    // parsedResponse is what the above promise (step) returned
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
