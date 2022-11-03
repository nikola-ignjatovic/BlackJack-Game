function PlayerDealCard() {
  tempCard = DeckList[0];
  tempCard.boolIsPlayerCard = true;
  //tempCard.value=1; //Just a memory of losing my mind...

  listOfPlayerCardsOnBoard.push(tempCard);
  DeckList.shift();
  setTimeout(function () {
    cardDealSound.play();
  }, 100);

  CreateCardSprites(tempCard);
  setTimeout(function () {
    if (listOfPlayerCardsOnBoard.length > 2) {
      TurnOnHitAndStandButtons();
    }

    UpdateValueOfCardsOnTheTable(tempCard);
  }, cardDealAnimationTime);
}

function HouseDealCard(cardShouldNotBeShown) {
  tempCard = DeckList[0];
  tempCard.boolIsPlayerCard = false;
  //tempBool=cardShouldNotBeShown;
  if (tempCard.value == 1) {
    if (21 - valueOfHouseCardsOnTable >= 11) {
      tempCard.value = 11;
    }
  }
  listOfHouseCardsOnBoard.push(tempCard);
  DeckList.shift();
  //tap1Sound.play();
  cardDealSound.play();
  CreateCardSprites(tempCard, cardShouldNotBeShown);
  UpdateValueOfCardsOnTheTable(tempCard);
}

function DealingRestHouseCards() {
  if (valueOfHouseCardsOnTable >= 17) {
    CheckWhoWon();
  } else {
    HouseDealCard();
    setTimeout(function () {
      DealingRestHouseCards();
    }, houseCardDealAnimationTime);
  }
}
