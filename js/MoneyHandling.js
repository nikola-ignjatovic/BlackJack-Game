var amountOfChipsBid;
var amountOfChipsThatFinishedAnimations = 0;
var chipsShouldMove;
var chipsShouldGoToMiddle;
var chipsShouldGoToHouse;
var chipsShouldGoToPlayer;
var chipShouldSpill;
var chipsShouldStackInMiddle;
var startingChipInMiddlePosition;
var chipsAreStackedInMiddle;

var listOfChipsInMiddle = [];
var listOfPlayerChips = [];
var listOfChipsThatShouldBeMoved = [];

var houseChipss;
var towerChips = false;

class Chip {
  constructor(
    sprite,
    xStartingPosition,
    yStartingPosition,
    chipDeltaTime,
    calculatedValue
  ) {
    this.sprite = sprite;
    this.xStartingPosition = xStartingPosition;
    this.yStartingPosition = yStartingPosition;
    this.chipDeltaTime = chipDeltaTime;
    this.calculatedValue = calculatedValue;
  }

  MoveChip(delta, xDestination, yDestination, timeToDo) {
    // Moving Sprite to Location
    if (this.chipDeltaTime < 1) {
      this.chipDeltaTime += (delta / timeToDo) * 28.79; // Here instead of 2 should be delta  as of deltatime but if you minimize browser it glitches
      this.BRINGMYUNITYLERPCHIP(
        this.xStartingPosition,
        xDestination,
        this.chipDeltaTime
      );
      this.sprite.x = this.calculatedValue;
      this.BRINGMYUNITYLERPCHIP(
        this.yStartingPosition,
        yDestination,
        this.chipDeltaTime
      );
      this.sprite.y = this.calculatedValue;
    } else {
      this.sprite.x = xDestination;
      this.sprite.y = yDestination;

      this.xStartingPosition = this.sprite.x;
      this.yStartingPosition = this.sprite.y;

      this.chipDeltaTime = 0;

      amountOfChipsThatFinishedAnimations++;
    }
  }

  BRINGMYUNITYLERPCHIP(startingValue, endValue, time) {
    this.calculatedValue = startingValue + (endValue - startingValue) * time;
    return this.calculatedValue;
  }
}

var chipsShouldMove = true;
var amountOfChipsThatFinishedAnimations;

function OnMoneyGot(HowMuch) {
  // Stacks and adds chips to the list
  for (var i = 0; i < HowMuch; i++) {
    listOfPlayerChips.push(
      new PIXI.Sprite.from(app.loader.resources['purpleChipBackground'.texture])
    );
    tempChip = listOfPlayerChips[listOfPlayerChips.length - 1];
    tempChip.anchor.set(0.5);
    tempChip.x = app.view.width / 4.7;
    tempChip.y =
      app.view.height / 1.3 - (listOfPlayerChips.length - 1) * ChipGapScaler;
    tempChip.width = 200;
    tempChip.height = 195;
    tempChip.transform.rotation = 0;
    app.stage.addChild(tempChip);
  }
}

function OnMoneyLoss(HowMuch) {
  // Destorys and removes chips from the list
  for (var i = 0; i < HowMuch; i++) {
    app.stage.removeChild(listOfPlayerChips[listOfPlayerChips.length - 1]);
    listOfPlayerChips.pop();
  }
}

function GetChipPositionsInMiddle() {}

function GetPlayerChipPositions() {}

function ResetChips() {
  _tempNumber = listOfPlayerChips.length;
  for (var i = 0; i < _tempNumber; i++) {
    app.stage.removeChild(listOfPlayerChips[0].sprite);
    listOfPlayerChips.shift();
  }
  AddStartingChips();
  UpdateChipText();
}

function UpdateChipText() {
  chipText.text = 'Cash ' + listOfPlayerChips.length + '$';
}

function SendChipsToMiddleFromPlayer() {
  for (let i = 0; i < amountOfChipsBid; i++) {
    _tempChip = listOfPlayerChips[listOfPlayerChips.length - 1];
    listOfPlayerChips.pop();
    listOfChipsThatShouldBeMoved.push(_tempChip);
    listOfChipsInMiddle.push(_tempChip);
  }
  startingChipInMiddlePosition =
    app.view.width / 2 -
    chipsInMiddleVariable *
      (listOfChipsThatShouldBeMoved.length * chipInMiddleGapScaler);
  chipsShouldGoToMiddle = true;
  chipShouldSpill = false;
  chipsShouldMove = true;

  UpdateChipText();

  setTimeout(function () {
    listOfChipsThatShouldBeMoved.length = 0;
  }, 2000);
}

function SpillChips() {
  chipShouldSpill = true;
  chipsShouldMove = true;
}

var listOfHouseChips = [];
function CreateHouseChips(amountOfChips) {
  houseChipss = amountOfChips;
  var chipx;
  var chipy;
  var _tempPositionXNumber = Math.random() * houseCardSpawnRandomness + 0;
  for (var i = 0; i < amountOfChips; i++) {
    chipx = app.view.width / (2 + _tempPositionXNumber);
    chipy = 0 - i * ChipGapScaler;
    listOfHouseChips.push(
      new Chip(
        new PIXI.Sprite.from(app.loader.resources['purpleChipSprite'].texture),
        chipx,
        chipy,
        0
      )
    );
    _tempChip = listOfHouseChips[i].sprite;
    _tempChip.anchor.set(0.5);
    _tempChip.x = chipx;
    _tempChip.y = chipy;
    _tempChip.width = 200;
    _tempChip.height = 195;
    _tempChip.transform.rotation = 0;
    app.stage.addChild(_tempChip);
  }
}

function SendChipsFromHouseToMiddle(amountOfChips) {
  for (let i = 0; i < amountOfChips; i++) {
    _tempChip = listOfHouseChips[listOfHouseChips.length - 1];
    listOfHouseChips.pop();
    listOfChipsThatShouldBeMoved.push(_tempChip);
    listOfChipsInMiddle.push(_tempChip);
  }
  startingChipInMiddlePosition =
    app.view.width / 2 -
    chipsInMiddleVariable *
      (listOfChipsThatShouldBeMoved.length * chipInMiddleGapScaler);
  chipsShouldGoToMiddle = true;
  chipShouldSpill = false;
  chipsShouldMove = true;
}

function TowerChips() {
  var _amountOfChipsInMiddle = listOfChipsThatShouldBeMoved.length;
  for (
    var i = 0;
    i < _amountOfChipsInMiddle;
    i++ // removing chips sprite so i can overlap them nicely because of stupid zIndex pixi...
  ) {
    app.stage.removeChild(listOfChipsInMiddle[0].sprite);
    listOfChipsInMiddle.shift();
    listOfChipsThatShouldBeMoved.shift();
  }

  for (var i = 0; i < _amountOfChipsInMiddle; i++) {
    listOfChipsInMiddle.push(
      new Chip(
        new PIXI.Sprite.from(app.loader.resources['purpleChipSprite'].texture),
        startingChipInMiddlePosition,
        ChipPositionInMiddle,
        0
      )
    );
    _tempChip = listOfChipsInMiddle[i].sprite;
    _tempChip.anchor.set(0.5);
    _tempChip.x = startingChipInMiddlePosition;
    _tempChip.y = ChipPositionInMiddle;
    _tempChip.width = 200;
    _tempChip.height = 195;
    _tempChip.transform.rotation = 0;
    listOfChipsThatShouldBeMoved.push(listOfChipsInMiddle[i]);
    app.stage.addChild(_tempChip);
  }

  towerChips = true;
  chipsShouldMove = true;
}

function MoveChipsToHouse() {
  chipsShouldMove = true;
  listOfChipsInMiddle.length = 0;

  setTimeout(function () {
    chipText.text = 'Cash ' + listOfPlayerChips.length + '$';
    chipsAreStackedInMiddle = false;
    _tempNumberForSizeOfList = listOfChipsThatShouldBeMoved.length;
    for (var i = 0; i < _tempNumberForSizeOfList; i++) {
      app.stage.removeChild(listOfChipsThatShouldBeMoved[0].sprite);
      listOfChipsThatShouldBeMoved.shift();
    }
    chipsShouldGoToHouse = false;
    console.log(listOfChipsThatShouldBeMoved);
  }, chipToHouseAnimationTime);
}

function MoveChipsToPlayer() {
  chipsShouldMove = true;
  listOfChipsInMiddle.length = 0;
  setTimeout(function () {
    listOfPlayerChips.push.apply(
      listOfPlayerChips,
      listOfChipsThatShouldBeMoved
    );
    chipText.text = 'Cash ' + listOfPlayerChips.length + '$';
    chipsAreStackedInMiddle = false;
    chipsShouldGoToPlayer = false;
    listOfChipsThatShouldBeMoved.length = 0;
  }, chipToPlayerAnimationTime);
}
