function DealCardAnimation(delta) {
  // Moving Sprites to Location
  if (dealDeltaTime < 1) {
    dealDeltaTime += (delta / cardDealAnimationTime) * 28.79; // Here instead of 2 should be delta  as of deltatime but if you minimize browser it glitches
    BRINGMYUNITYLERP(xStartingPosition, xDestination, dealDeltaTime);
    cardThatWaitsForAnimation.x = calculatedValue;
    BRINGMYUNITYLERP(yStartingPosition, yDestination, dealDeltaTime);
    cardThatWaitsForAnimation.y = calculatedValue;
  } else {
    cardThatWaitsForAnimation.x = xDestination;
    cardThatWaitsForAnimation.y = yDestination;
    cardHasToBeDealt = false;
    dealDeltaTime = 0;
  }
}

function ReturnCardToDeckAnimation(
  cardThatIsUnderWork,
  xReturningCardPosition,
  yReturningCardPosition
) {
  // Here instead of 2 should be delta  as of deltatime but if you minimize browser it glitches
  BRINGMYUNITYLERP(
    xReturningCardPosition,
    topCardOfTheDeckPositionX,
    returningDeltaTime
  );
  cardThatIsUnderWork.x = calculatedValue;
  BRINGMYUNITYLERP(
    yReturningCardPosition,
    topCardOfTheDeckPositionY,
    returningDeltaTime
  );
  cardThatIsUnderWork.y = calculatedValue;
}

function FlipCardAnimation(delta, cardThatIsUnderWork, tempDeltaTime) {
  // Flipping Cards to half
  if (firstTurnDone == false) {
    if (tempDeltaTime < 1) {
      tempDeltaTime += (delta / (cardFlipAnimationTime / 2)) * 28.79; // Here instead of 2 should be delta  as of deltatime but if you minimize browser it glitches
      flipDeltaTime += tempDeltaTime;
      BRINGMYUNITYLERP(cardWidth, 0, tempDeltaTime);
      cardThatIsUnderWork.width = calculatedValue;
    } else {
      firstTurnDone = true;
      cardThatIsUnderWork.texture =
        app.loader.resources['cardID' + _temporaryCardID].texture;
      tempDeltaTime = 0;
      flipDeltaTime = tempDeltaTime;
      cardThatIsUnderWork.width = 0;
    }
  }
  if (firstTurnDone) {
    if (tempDeltaTime < 1) {
      tempDeltaTime += (2 / (cardFlipAnimationTime / 2)) * 28.79; // Here instead of 2 should be delta
      flipDeltaTime = tempDeltaTime;
      BRINGMYUNITYLERP(0, cardWidth, tempDeltaTime);
      cardThatIsUnderWork.width = calculatedValue;
    } else {
      cardHasToBeFlipped = false;
      firstTurnDone = false;
      tempDeltaTime = 0;
      flipDeltaTime = tempDeltaTime;
      cardThatIsUnderWork.width = cardWidth;
    }
  }
}

function ReturningFlipCardAnimation(
  delta,
  cardThatIsUnderWork,
  tempDeltaTime,
  deltaID
) {
  // Flipping Cards to half
  if (ListOfReturningCards[deltaID].firstTurnCompleted == false) {
    if (tempDeltaTime < 1) {
      tempDeltaTime += (delta / (cardFlipAnimationTime / 2)) * 28.79; // Here instead of 2 should be delta  as of deltatime but if you minimize browser it glitches
      ListOfReturningCards[deltaID].deltatime += tempDeltaTime;
      BRINGMYUNITYLERP(cardWidth, 0, tempDeltaTime);
      cardThatIsUnderWork.width = calculatedValue;
    } else {
      ListOfReturningCards[deltaID].firstTurnCompleted = true;
      cardThatIsUnderWork.texture =
        app.loader.resources['cardBackgroundSprite'].texture;
      tempDeltaTime = 0;
      ListOfReturningCards[deltaID].deltatime = tempDeltaTime;
      cardThatIsUnderWork.width = 0;
    }
  }
  if (ListOfReturningCards[deltaID].firstTurnCompleted) {
    if (tempDeltaTime < 1) {
      tempDeltaTime += (2 / (cardFlipAnimationTime / 2)) * 28.79; // Here instead of 2 should be delta
      ListOfReturningCards[deltaID].deltatime = tempDeltaTime;
      BRINGMYUNITYLERP(0, cardWidth, tempDeltaTime);
      cardThatIsUnderWork.width = calculatedValue;
    } else {
      cardsShouldFlipToDeck = false;
      ListOfReturningCards[deltaID].firstTurnCompleted = false;
      tempDeltaTime = 0;
      ListOfReturningCards[deltaID].deltatime = tempDeltaTime;
      cardThatIsUnderWork.width = cardWidth;
    }
  }
}

function UnveilCardAnimation(delta, cardThatIsUnderWork, tempDeltaTime) {
  // Flipping Cards to half /
  if (firstTurnDone == false) {
    if (tempDeltaTime < 1) {
      tempDeltaTime += (delta / (cardFlipAnimationTime / 2)) * 28.79; // Here instead of 2 should be delta  as of deltatime but if you minimize browser it glitches
      unveilCardDeltaTime += tempDeltaTime;
      BRINGMYUNITYLERP(cardWidth, 0, tempDeltaTime);
      cardThatIsUnderWork.width = calculatedValue;
    } else {
      firstTurnDone = true;
      cardThatIsUnderWork.texture =
        app.loader.resources['cardID' + unveiledCardID].texture;
      tempDeltaTime = 0;
      unveilCardDeltaTime = tempDeltaTime;
      cardThatIsUnderWork.width = 0;
    }
  }
  if (firstTurnDone) {
    if (tempDeltaTime < 1) {
      tempDeltaTime += (2 / (cardFlipAnimationTime / 2)) * 28.79; // Here instead of 2 should be delta
      unveilCardDeltaTime = tempDeltaTime;
      BRINGMYUNITYLERP(0, cardWidth, tempDeltaTime);
      cardThatIsUnderWork.width = calculatedValue;
    } else {
      unveiledCardID = 0;
      shouldHouseCardBeUnveiled = false;
      firstTurnDone = false;
      tempDeltaTime = 0;
      unveilCardDeltaTime = tempDeltaTime;
      cardThatIsUnderWork.width = cardWidth;
    }
  }
}

function BRINGMYUNITYLERP(startingValue, endValue, time) {
  calculatedValue = startingValue + (endValue - startingValue) * time;
  return calculatedValue;
}
