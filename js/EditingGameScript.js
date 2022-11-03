var cardWidth = 170;
var cardHeight = 200;

// Settings for Animations and Delays
{
  var gameSlowMoOrSpeedUp = 1;
  var milisecondsToSeconds = 1000 * gameSlowMoOrSpeedUp;

  var cardDealAnimationTime = 0.5 * milisecondsToSeconds;
  var cardFlipAnimationTime = 0.5 * milisecondsToSeconds;
  var returningCardsAnimationTime = 1 * milisecondsToSeconds;
  var returningCardsFlipAnimationTime = 1 * milisecondsToSeconds;

  var houseCardDealAnimationTime = 1 * milisecondsToSeconds;
  var houseCardFlipAnimationTime = 0.5 * milisecondsToSeconds;

  var delayBetweenRoundEndAndReturningCards = 0 * milisecondsToSeconds;

  var delayForShowingBidAndRestartGameButtons =
    (returningCardsAnimationTime + delayBetweenRoundEndAndReturningCards) *
    gameSlowMoOrSpeedUp;
  // Chip Animation Times
  var chipToMiddleAnimationTime = 1 * milisecondsToSeconds;
  var chipToPlayerAnimationTime = 1 * milisecondsToSeconds;
  var chipToHouseAnimationTime = 1 * milisecondsToSeconds;
  var chipSpillAnimationTime = 1 * milisecondsToSeconds;

  var animationDelayBetweenCollectingChipsAndCollectingCards =
    0 * milisecondsToSeconds;
}

var maxValueBeforeHouseStands = 17;

var maxAmountOfPlayerCards = 7;

// Chips settings
var ChipGapScaler = 8;
var chipInMiddleGapScaler = 15;
var startingMoney = 20;
var ChipPositionInMiddle;
var chipsInMiddleVariable = 1; // Increase number
var chipTowerXPosition;
var chipTowerStartingYPosition;
var whereToMoveChipsFromMiddleToHouseX;

function ChangingScalesAndPositions() {
  whereToMoveChipsFromMiddleToHouseX = app.view.width / 2; // Middle of screen
  chipTowerStartingYPosition = app.view.height / 1.3;
  chipTowerXPosition = app.view.width / 4.7;
  ChipPositionInMiddle = app.view.height / 2.65;
}
var houseCardSpawnRandomness = 3;
