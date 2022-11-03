var w = 0;
var h = 0;
let app;
let renderer;
var chipText;
let amountOfCash;

function OnResizeFunction() {
  // Happens when page is resized
  GetViewPortSize();
}

function GetViewPortSize() {
  // Gets Viewport size without scrollbars and navbar
  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    w = window.innerWidth;
    h = window.innerHeight;
  } else {
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
  }
}

function OnLoadFunction() {
  // Happens when page loads
  GetViewPortSize();
  app = new PIXI.Application({
    width: 1920,
    height: 967,
    backgroundColor: 0xaaaaaa,
  });
  document.body.appendChild(app.view);
  // renderer = new PIXI.Renderer(    {
  //   view:app.view,
  //   width:1920,
  //   height:967
  // });
  LoadingAssets();
}
function LoadingAssets() {
  // Loading Textures
  app.loader.baseUrl = '../Assets';
  app.loader.add('cardBackgroundSprite', 'CardBackground.png');
  app.loader.add('gameBackgroundSprite', 'BlackJack Background Final 3.jpg');
  app.loader.add('purpleChipSprite', 'PurpleChip.png');
  app.loader.add('buttonHitSprite', '/Buttons/HitButton.png');
  app.loader.add('buttonStandSprite', '/Buttons/StandButton.png');
  app.loader.add('buttonBidSprite', '/Buttons/BidButton.png');
  app.loader.add('buttonRestartGameSprite', '/Buttons/RestartGameButton.png');
  for (var i = 1; i <= 52; i++) {
    app.loader.add('cardID' + i, '/CardsWithIDs/' + i + '.png');
  }

  // Loading Sounds
  app.loader.add('cardDealSound', '/Sounds/card_deal.mp3');
  app.loader.add('cardFlipSound', '/Sounds/card_flip.mp3');
  app.loader.add('standSound', '/Sounds/stand.mp3');
  app.loader.add('regularTapSound', '/Sounds/tap.mp3');
  app.loader.add('fasterTapSound', '/Sounds/tap_2.mp3');
  app.loader.load();
  app.loader.onComplete.add(DoneLoadingAssets);
}

function DoneLoadingAssets() {
  StartingStuff();
}

function StartingStuff() {
  ChangingScalesAndPositions();
  SettingVariables();
  AddBackgroundImage();
  AddDeckPicture();
  AddStartingChips();
  AddChipText();
  SoundCreator();
  ButtonCreator();
  GenerateDeck();
  app.ticker.add((delta) => GameLoop(delta));
  StartGame();
  // OnMoneyGot(10);
  // OnLossGot(5);
}

function SettingVariables() {
  topCardOfTheDeckPositionX = app.view.width / 1.2;
  topCardOfTheDeckPositionY = app.view.height / 6 - 6 * 3;
}

{
  // Adding Deck, Starting Chips, Background Image, Buttons

  function AddDeckPicture() {
    for (var i = 0; i < 7; i++) {
      cardDeckBackground = new PIXI.Sprite.from(
        app.loader.resources['cardBackgroundSprite'].texture
      );
      cardDeckBackground.anchor.set(0.5);
      cardDeckBackground.x = app.view.width / 1.2;
      cardDeckBackground.y = app.view.height / 6 - i * 3;
      cardDeckBackground.width = cardWidth;
      cardDeckBackground.height = cardHeight;
      cardDeckBackground.transform.rotation = 0;
      app.stage.addChild(cardDeckBackground);
    }
  }

  function AddStartingChips() {
    var chipx;
    var chipy;
    for (var i = 0; i < startingMoney; i++) {
      chipx = chipTowerXPosition;
      chipy = chipTowerStartingYPosition - i * ChipGapScaler;
      listOfPlayerChips.push(
        new Chip(
          new PIXI.Sprite.from(
            app.loader.resources['purpleChipSprite'].texture
          ),
          chipx,
          chipy,
          0
        )
      );
      _tempChip = listOfPlayerChips[i].sprite;
      _tempChip.anchor.set(0.5);
      _tempChip.x = chipx;
      _tempChip.y = chipy;
      _tempChip.width = 200;
      _tempChip.height = 195;
      _tempChip.transform.rotation = 0;
      app.stage.addChild(_tempChip);
    }
  }

  function AddBackgroundImage() {
    BackgroundImage = new PIXI.Sprite.from(
      app.loader.resources['gameBackgroundSprite'].texture
    );
    BackgroundImage.anchor.set(0.5);
    BackgroundImage.x = app.view.width / 2;
    BackgroundImage.y = app.view.height / 2;
    app.stage.addChild(BackgroundImage);

    // testSprite = new PIXI.Sprite.from(app.loader.resources["cardBackgroundSprite"].texture);
    // testSprite.anchor.set(0.5);
    // testSprite.x = app.view.width / 2;
    // testSprite.y = app.view.height / 2;
    // width = 100;
    // height = 100;
    // testSprite.interactive = true;
    // a = app.view.width / 2;
    // b = app.view.width / 3;
    // c = app.view.height / 2;
    // d = app.view.height / 6;
    // app.stage.addChild(testSprite);
  }

  function ButtonCreator() {
    // Adding Hit Button
    HitButton = new PIXI.Sprite.from(
      app.loader.resources['buttonHitSprite'].texture
    );
    HitButton.anchor.set(0.5);
    HitButton.x = app.view.width / 2.5;
    HitButton.y = app.view.height / 1.2;
    HitButton.width = 150;
    HitButton.height = 150;

    // Adding Stand Button
    StandButton = new PIXI.Sprite.from(
      app.loader.resources['buttonStandSprite'].texture
    );
    StandButton.anchor.set(0.5);
    StandButton.x = app.view.width / 1.8;
    StandButton.y = app.view.height / 1.2;
    StandButton.width = 150;
    StandButton.height = 150;

    // Adding Bid Button;
    BidButton = new PIXI.Sprite.from(
      app.loader.resources['buttonBidSprite'].texture
    );
    BidButton.anchor.set(0.5);
    BidButton.x = app.view.width / 2.5;
    BidButton.y = app.view.height / 1.2;
    BidButton.width = 150;
    BidButton.height = 150;

    // Adding Restart Game Button
    RestartGameButton = new PIXI.Sprite.from(
      app.loader.resources['buttonRestartGameSprite'].texture
    );
    RestartGameButton.anchor.set(0.5);
    RestartGameButton.x = app.view.width / 1.8;
    RestartGameButton.y = app.view.height / 1.2;
    RestartGameButton.width = 150;
    RestartGameButton.height = 150;

    // Making Buttons inivisble
    TurnOffHitAndStandButtons();

    // Making Bid Buttons Visible
    TurnOnBidAndRestartGameButton();

    // Adding Buttons to stage
    app.stage.addChild(HitButton);
    app.stage.addChild(StandButton);
    app.stage.addChild(BidButton);
    app.stage.addChild(RestartGameButton);

    // Setting events for Buttons
    HitButton.on('pointerdown', OnHitButtonDown);
    StandButton.on('pointerdown', StandFunction);
    BidButton.on('pointerdown', OnBidButtonDown);
    RestartGameButton.on('pointerdown', OnRestartGameButtonDown);
  }

  function AddChipText() {
    // Creating Chip Text
    chipText = new PIXI.Text('Cash: 0$');
    chipText.style = new PIXI.TextStyle({
      dropShadow: true,

      fill: ['black', '#3c004d'],
      fillGradientType: 1,
      fillGradientStops: [1],

      fontFamily: 'Comic Sans MS',
      fontSize: 50,
      stroke: '#8a1919',
      strokeThickness: 6,
      //fill: 0x800080
    });
    app.stage.addChild(chipText);
    chipText.x = app.view.width / 2;
    chipText.y = app.view.height / 1.1;
    chipText.text = 'Cash ' + startingMoney + '$';
  }
}

function UpdateChipTextFunction() {}

function GenerateDeck() {
  // Generating all 52 cards and putting them in deck that is not shuffled
  var tempCardShape;
  var tempCardID = 0;
  for (
    var j = 0;
    j < 4;
    j++ // Generates Cards from 1 to 10
  ) {
    if (j == 0) tempCardShape = 'heart';

    if (j == 1) tempCardShape = 'spades';

    if (j == 2) tempCardShape = 'clubs';

    if (j == 3) tempCardShape = 'diamonds';

    for (var i = 1; i < 11; i++) {
      tempCardID++;
      DeckList.push(
        new Card(
          i,
          tempCardShape,
          tempCardID,
          (boolIsPlayerCard = null),
          (cardtexture = new PIXI.Sprite.from(
            app.loader.resources['cardID' + tempCardID].texture
          ))
        )
      );
    }
    for (
      var g = 0;
      g < 3;
      g++ // Generates Zandars Queens and Kings
    ) {
      tempCardID++;
      DeckList.push(
        new Card(
          10,
          tempCardShape,
          tempCardID,
          (boolIsPlayerCard = null),
          (cardtexture = new PIXI.Sprite.from(
            app.loader.resources['cardID' + tempCardID].texture
          ))
        )
      );
    }
  }
}
