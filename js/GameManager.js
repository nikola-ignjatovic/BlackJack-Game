var DeckList = [];
var valueOfPlayerCardsOnTable = 0;
var valueOfHouseCardsOnTable = 0;

var secondTimeChipsAreGoingToMiddle = false;
var hasBlackJackHappened = false;

function CreateCardSprites(card, cardShouldNotBeShown) {
  if (card.boolIsPlayerCard == true) {
    listOfPlayerCardSprites.push(
      new PIXI.Sprite.from(app.loader.resources['cardBackgroundSprite'].texture)
    );
    // tempCardSprite = ListOfPlayerCardSprites[ListOfPlayerCardSprites.length - 1];
    tempCardSprite =
      listOfPlayerCardSprites[listOfPlayerCardSprites.length - 1];
    tempCardSprite.anchor.set(0.5);
    tempCardSprite.x = topCardOfTheDeckPositionX;
    tempCardSprite.y = topCardOfTheDeckPositionY;
    tempCardSprite.width = cardWidth;
    tempCardSprite.height = cardHeight;

    xStartingPosition = tempCardSprite.x;
    xDestination = app.view.width / 3.2 + listOfPlayerCardSprites.length * 100;

    yStartingPosition = tempCardSprite.y;
    yDestination = app.view.height / 1.7;
    cardHasToBeFlipped = true;
  } else {
    listOfHouseCardSprites.push(
      new PIXI.Sprite.from(app.loader.resources['cardBackgroundSprite'].texture)
    );
    houseTotalSprites++;

    tempCardSprite = listOfHouseCardSprites[listOfHouseCardSprites.length - 1];
    tempCardSprite.anchor.set(0.5);
    tempCardSprite.x = topCardOfTheDeckPositionX;
    tempCardSprite.y = topCardOfTheDeckPositionY;
    tempCardSprite.width = cardWidth;
    tempCardSprite.height = cardHeight;

    xStartingPosition = tempCardSprite.x;
    xDestination = tempCardSprite.x =
      app.view.width / 3.2 + houseTotalSprites * 100;

    yStartingPosition = tempCardSprite.y;
    yDestination = app.view.height / 6;

    cardHasToBeFlipped = true;
    if (cardShouldNotBeShown) {
      //Checking to see if its the second card House gets dealt so we can cover it
      listOfVeiledCardSprites.push(new VeiledCard(card.id, tempCardSprite));
      tempCardSprite.texture =
        app.loader.resources['cardBackgroundSprite'].texture;
      tempCardSprite =
        listOfVeiledCardSprites[listOfVeiledCardSprites.length - 1].cardsprite;
      listOfHouseCardSprites.pop();
      cardHasToBeFlipped = false;
    }
  }
  cardThatWaitsForAnimation = tempCardSprite;
  firstTurnDone = false;
  secondTurnDone = false;
  cardHasToBeDealt = true;
  _temporaryCardID = card.id;
  app.stage.addChild(tempCardSprite);
}

function UnveilCard() {
  cardFlipSound.play();

  shouldHouseCardBeUnveiled = true;
  cardThatWaitsForAnimation = listOfVeiledCardSprites[0].cardsprite;
  unveiledCardID = listOfVeiledCardSprites[0].id;

  listOfHouseCardSprites.push(listOfVeiledCardSprites[0].cardsprite);
  listOfVeiledCardSprites.shift();
}

function Shuffle(array) {
  // Shuffles deck
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function StandFunction() {
  standSound.play();
  TurnOffHitAndStandButtons();
  UnveilCard();
  setTimeout(function () {
    DealingRestHouseCards();
  }, houseCardFlipAnimationTime);
}

function CheckWhoWon() {
  console.log('house:  ' + valueOfHouseCardsOnTable);
  console.log(valueOfPlayerCardsOnTable);

  if (valueOfHouseCardsOnTable > 21) {
    PlayerWinsRoundFunction();
    console.log('HouseLost');
  } else {
    if (valueOfPlayerCardsOnTable > valueOfHouseCardsOnTable) {
      PlayerWinsRoundFunction();
      console.log('Igrac je dobio');
    } else if (valueOfPlayerCardsOnTable == valueOfHouseCardsOnTable) {
      RoundDrawFunction();
      console.log('Nereseno');
    } else {
      PlayerLostRoundFunction();
      console.log('Kuca je dobila ofc');
    }
  }
}

{
  // Round Ending Decide

  function RoundDrawFunction() {
    TurnOffHitAndStandButtons();

    for (var i = 0; i < listOfChipsInMiddle.length; i++) {
      listOfChipsThatShouldBeMoved.push(listOfChipsInMiddle[i]);
    }

    chipsShouldGoToPlayer = true;
    chipsShouldStackInMiddle = true;
    chipsShouldMove = true;

    setTimeout(function () {
      PrepForNextRoundFunction();
    }, chipSpillAnimationTime * 2 +
      chipToPlayerAnimationTime +
      animationDelayBetweenCollectingChipsAndCollectingCards);
  }

  function PlayerWinsRoundFunction() {
    var howMuchChipsPlayerWon;

    if (hasBlackJackHappened) {
      howMuchChipsPlayerWon = Math.floor(listOfChipsInMiddle.length / 2);
    } else {
      howMuchChipsPlayerWon = listOfChipsInMiddle.length;
    }
    CreateHouseChips(howMuchChipsPlayerWon);
    secondTimeChipsAreGoingToMiddle = true;
    SendChipsFromHouseToMiddle(howMuchChipsPlayerWon);
    setTimeout(function () {
      listOfChipsThatShouldBeMoved.length = 0;
      listOfChipsThatShouldBeMoved.push.apply(
        listOfChipsThatShouldBeMoved,
        listOfChipsInMiddle
      );

      chipsShouldStackInMiddle = true;
      chipsShouldGoToPlayer = true;
      chipsShouldMove = true;
    }, chipSpillAnimationTime + chipToMiddleAnimationTime);
    setTimeout(function () {
      PrepForNextRoundFunction();
    }, chipToMiddleAnimationTime +
      chipSpillAnimationTime * 3 +
      chipToPlayerAnimationTime +
      animationDelayBetweenCollectingChipsAndCollectingCards);
  }

  function PlayerLostRoundFunction() {
    TurnOffHitAndStandButtons();

    for (var i = 0; i < listOfChipsInMiddle.length; i++) {
      listOfChipsThatShouldBeMoved.push(listOfChipsInMiddle[i]);
    }

    chipsShouldGoToHouse = true;
    chipsShouldStackInMiddle = true;
    chipsShouldMove = true;

    setTimeout(function () {
      PrepForNextRoundFunction();
    }, chipSpillAnimationTime * 2 +
      chipToHouseAnimationTime +
      animationDelayBetweenCollectingChipsAndCollectingCards);
  }
}

function UpdateValueOfCardsOnTheTable(card) {
  if (card.boolIsPlayerCard == true) {
    var numberOfAces = 0;
    valueOfPlayerCardsOnTable = 0;
    for (var i = 0; i < listOfPlayerCardsOnBoard.length; i++) {
      if (listOfPlayerCardsOnBoard[i].value == 1) {
        numberOfAces++;
        valueOfPlayerCardsOnTable += listOfPlayerCardsOnBoard[i].value + 10;
      } else {
        valueOfPlayerCardsOnTable += listOfPlayerCardsOnBoard[i].value;
      }
      for (; numberOfAces > 0; numberOfAces--) {
        if (valueOfPlayerCardsOnTable > 21) {
          valueOfPlayerCardsOnTable -= 10;
        } else {
          break;
        }
      }
    }
    if (valueOfPlayerCardsOnTable > 21) {
      // If Player Loses To OverDrawing 21
      PlayerLostRoundFunction();
      console.log('Busted');
    } else {
      if (listOfPlayerCardsOnBoard.length == maxAmountOfPlayerCards) {
        PlayerWinsRoundFunction();
        console.log(
          'Number 1 victory royale, yeah fornite we bout to g3t down'
        );
      }
      if (valueOfPlayerCardsOnTable == 21) {
        if (listOfHouseCardsOnBoard.length > 1) {
          console.log('Auto Stand');
        } else {
          BlackJack();
        }
        StandFunction();
      }
    }
  } else {
    var numberOfAces = 0;
    valueOfHouseCardsOnTable = 0;
    for (var i = 0; i < listOfHouseCardsOnBoard.length; i++) {
      if (listOfHouseCardsOnBoard[i].value == 1) {
        numberOfAces++;
        valueOfHouseCardsOnTable += listOfHouseCardsOnBoard[i].value + 10;
      } else {
        valueOfHouseCardsOnTable += listOfHouseCardsOnBoard[i].value;
      }
      for (; numberOfAces > 0; numberOfAces--) {
        if (valueOfHouseCardsOnTable > 21) {
          valueOfHouseCardsOnTable -= 10;
        } else {
          break;
        }
      }
    }
  }
}

function BlackJack() {
  // Tipa da na ekranu ispise blackjack i posle sekund krene u ovu stand funkciju
  hasBlackJackHappened = true;
}

function StartGamePhase1() {
  var tempnumber = 1; //so i dont have to put numbers manually
  PlayerDealCard();
  setTimeout(function () {
    HouseDealCard();
  }, cardDealAnimationTime * tempnumber);
  tempnumber++;
  setTimeout(function () {
    PlayerDealCard();
  }, cardDealAnimationTime * tempnumber);
  tempnumber++;
  setTimeout(function () {
    HouseDealCard(true);
  }, cardDealAnimationTime * tempnumber);
  setTimeout(function () {
    TurnOnHitAndStandButtons();
  }, cardDealAnimationTime * tempnumber);
}

function GameLoop(delta) {
  {
    if (cardHasToBeDealt) {
      DealCardAnimation(delta);
    }

    if (cardHasToBeFlipped) {
      FlipCardAnimation(delta, cardThatWaitsForAnimation, flipDeltaTime);
    }

    if (cardsShouldReturnToDeck) {
      // Checking to see if cards should go back to the deck and activating animations
      if (returningDeltaTime < 1) {
        returningDeltaTime += (delta / returningCardsAnimationTime) * 28.79;

        var tempAmountOfReturningCards = ListOfReturningCards.length;

        for (var i = 0; i < tempAmountOfReturningCards; i++) {
          ReturnCardToDeckAnimation(
            ListOfReturningCards[i].cardsprite,
            listOfReturningCardSpritesX[i],
            listOfReturningCardSpritesY[i]
          );
        }
      } else {
        var tempAmountOfReturningCards = ListOfReturningCards.length;
        for (var i = 0; i < tempAmountOfReturningCards; i++) {
          app.stage.removeChild(ListOfReturningCards[i].cardsprite);
        }
        ListOfReturningCards.splice();
        cardsShouldReturnToDeck = false;
        cardsShouldFlipToDeck = false;
        returningDeltaTime = 0;
        returningFlipDeltaTime = 0;
      }

      // Flipping Cards to deck
      if (cardsShouldFlipToDeck) {
        var tempAmountOfReturningCards = ListOfReturningCards.length;
        for (var i = 0; i < tempAmountOfReturningCards; i++) {
          ReturningFlipCardAnimation(
            delta,
            ListOfReturningCards[i].cardsprite,
            ListOfReturningCards[i].deltatime,
            i
          );
        }
      }
    }

    if (shouldHouseCardBeUnveiled) {
      UnveilCardAnimation(
        delta,
        cardThatWaitsForAnimation,
        unveilCardDeltaTime
      );
    }
  }

  if (chipsShouldMove) {
    if (chipsShouldGoToMiddle == true) {
      if (secondTimeChipsAreGoingToMiddle) {
        _tempXPosition = app.view.width / 2; //+ chipsInMiddleVariable*(listOfChipsInMiddle.length)*chipInMiddleGapScaler;
        //_tempXPosition=(app.view.width / 2) - amountOfChipsThatShouldBeMoved*chipInMiddleGapScaler;
        _tempYPosition = ChipPositionInMiddle;
        _tempTimeToDo = chipToMiddleAnimationTime;
      } else {
        _tempXPosition =
          app.view.width / 2 -
          chipsInMiddleVariable *
            listOfChipsInMiddle.length *
            chipInMiddleGapScaler;
        //_tempXPosition=(app.view.width / 2) - amountOfChipsThatShouldBeMoved*chipInMiddleGapScaler;
        _tempYPosition = ChipPositionInMiddle;
        _tempTimeToDo = chipToMiddleAnimationTime;
      }
    }

    if (chipsShouldGoToPlayer == true) {
    }

    if (chipsShouldGoToHouse == true) {
    }

    if (chipsShouldStackInMiddle == true) {
      chipShouldSpill = false;
      _tempYPosition = ChipPositionInMiddle;
      _tempXPosition = startingChipInMiddlePosition;
      _tempTimeToDo = chipSpillAnimationTime;
    }

    if (
      amountOfChipsThatFinishedAnimations != listOfChipsThatShouldBeMoved.length
    ) {
      _tempAmountOfChipsThatShouldBeMoved = listOfChipsThatShouldBeMoved.length;
      for (var i = 0; i < _tempAmountOfChipsThatShouldBeMoved; i++) {
        if (chipShouldSpill == true) {
          _tempXPosition =
            startingChipInMiddlePosition +
            (listOfChipsInMiddle.length - i) * chipInMiddleGapScaler;
          _tempYPosition = ChipPositionInMiddle;
          _tempTimeToDo = chipSpillAnimationTime;
        }

        if (towerChips == true) {
          _tempXPosition = startingChipInMiddlePosition;
          _tempYPosition = ChipPositionInMiddle - i * ChipGapScaler;
          _tempTimeToDo = chipSpillAnimationTime;
        }
        if (chipsAreStackedInMiddle) {
          if (chipsShouldGoToPlayer == true) {
            _tempXPosition = chipTowerXPosition;
            _tempYPosition =
              chipTowerStartingYPosition -
              (listOfPlayerChips.length + i) * ChipGapScaler;
            _tempTimeToDo = chipToPlayerAnimationTime;
          }

          if (chipsShouldGoToHouse == true) {
            _tempXPosition = whereToMoveChipsFromMiddleToHouseX;
            _tempYPosition = -200;
            _tempTimeToDo = chipToHouseAnimationTime;
          }
        }

        listOfChipsThatShouldBeMoved[i].MoveChip(
          delta,
          _tempXPosition,
          _tempYPosition,
          _tempTimeToDo
        );
      }
    } else {
      amountOfChipsThatFinishedAnimations = 0;
      chipShouldSpill == false;
      chipsShouldMove = false;

      if (chipsAreStackedInMiddle == true) {
        chipsAreStackedInMiddle = false;
      }

      if (towerChips == true) {
        chipsAreStackedInMiddle = true;
        if (chipsShouldGoToHouse) {
          MoveChipsToHouse();
        }
        if (chipsShouldGoToPlayer) {
          MoveChipsToPlayer();
        }
      }
      towerChips = false;
      if (chipsShouldStackInMiddle == true) {
        TowerChips();
      }
      if (chipsShouldGoToMiddle == true) {
        SpillChips();
      }
      chipsShouldStackInMiddle = false;
      chipsShouldGoToMiddle = false;
    }
  }
}

function PrepForNextRoundFunction() {
  hasBlackJackHappened = false;
  secondTimeChipsAreGoingToMiddle = false;
  TurnOffHitAndStandButtons();
  setTimeout(function () {
    ReturnCardsToDeck();
    console.log(delayBetweenRoundEndAndReturningCards);
  }, delayBetweenRoundEndAndReturningCards);
  setTimeout(function () {
    TurnOnBidAndRestartGameButton();
  }, delayForShowingBidAndRestartGameButtons);
}

function StartGame() {
  Shuffle(DeckList);
}

function RestartGame() {
  bidButtonAlreadyPressed = false;
  document.getElementById('FormaZaBid').style.display = 'none';

  ResetChips();
}
