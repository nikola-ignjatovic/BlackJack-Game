class Card {
  constructor(value, shape, id, boolIsPlayerCard, cardtexture) {
    this.value = value;
    this.shape = shape;
    this.id = id;
    this.boolIsPlayerCard = boolIsPlayerCard;
    this.cardtexture = cardtexture;
  }
}

class VeiledCard {
  constructor(id, cardsprite) {
    this.id = id;
    this.cardsprite = cardsprite;
  }
}

class ReturningCardClass {
  constructor(cardsprite, deltatime, firstTurnCompleted) {
    this.cardsprite = cardsprite;
    this.deltatime = deltatime;
    this.firstTurnCompleted = firstTurnCompleted;
  }
}

// Returning Cards to deck Variables
var listOfReturningCardSpritesX = [];
var listOfReturningCardSpritesY = [];
var cardsShouldReturnToDeck = false;
var cardsShouldFlipToDeck = false;
var ListOfReturningCards = [];
var returningDeltaTime = 0;
var returningFlipDeltaTime = 0;

var houseTotalSprites = 0;

var firstTurnDone = false;
var secondTurnDone = false;

var dealDeltaTime = 0;
var flipDeltaTime = 0;

// Unveiling HouseCard Variables
var unveiledCardID;
var shouldHouseCardBeUnveiled = false;
var unveilCardDeltaTime = 0;

// Animation variables
var cardThatWaitsForAnimation = null;
var xStartingPosition;
var xDestination;
var yStartingPosition;
var yDestination;
var _temporaryCardID = 0;

var topCardOfTheDeckPositionX = 0;
var topCardOfTheDeckPositionY = 0;

var cardHasToBeDealt = false;
var cardHasToBeFlipped = false;

var listOfPlayerCardsOnBoard = [];
var listOfHouseCardsOnBoard = [];
var listOfPlayerCardSprites = [];
var listOfHouseCardSprites = [];
var listOfVeiledCardSprites = [];

function ReturnCardsToDeck() {
  DeckList.push.apply(DeckList, listOfPlayerCardsOnBoard);
  DeckList.push.apply(DeckList, listOfHouseCardsOnBoard);

  listOfPlayerCardsOnBoard.length = 0;
  listOfHouseCardsOnBoard.length = 0;

  houseTotalSprites = 0;
  RemoveCardSprites();
}

function RemoveCardSprites() {
  var tempNumberPlayerCards = listOfPlayerCardSprites.length;
  var tempNumberHouseCards = listOfHouseCardSprites.length;

  for (var i = 0; i < tempNumberPlayerCards; i++) {
    ListOfReturningCards.push(
      new ReturningCardClass(listOfPlayerCardSprites[i], 0, false)
    );
    listOfReturningCardSpritesX.push(listOfPlayerCardSprites[i].x);
    listOfReturningCardSpritesY.push(listOfPlayerCardSprites[i].y);
  }
  listOfPlayerCardSprites.length = 0;

  for (var i = 0; i < tempNumberHouseCards; i++) {
    ListOfReturningCards.push(
      new ReturningCardClass(listOfHouseCardSprites[i], 0, false)
    );
    listOfReturningCardSpritesX.push(listOfHouseCardSprites[i].x);
    listOfReturningCardSpritesY.push(listOfHouseCardSprites[i].y);
  }
  listOfHouseCardSprites.length = 0;

  for (var i = 0; i < listOfVeiledCardSprites.length; i++) {
    ListOfReturningCards.push(
      new ReturningCardClass(listOfVeiledCardSprites[i].cardsprite, 0, false)
    );
    listOfReturningCardSpritesX.push(listOfVeiledCardSprites[i].cardsprite.x);
    listOfReturningCardSpritesY.push(listOfVeiledCardSprites[i].cardsprite.y);
  }
  listOfVeiledCardSprites.length = 0;
  cardsShouldReturnToDeck = true;
  cardsShouldFlipToDeck = true;
}
