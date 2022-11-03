var cardDealSound;
var cardFlipSound;
var standSound;
var tap1Sound;
var tap2Sound;

function SoundCreator() {
  cardDealSound = app.loader.resources['cardDealSound'].data;
  cardFlipSound = app.loader.resources['cardFlipSound'].data;
  standSound = app.loader.resources['standSound'].data;
  tap1Sound = app.loader.resources['regularTapSound'].data;
  tap2Sound = app.loader.resources['fasterTapSound'].data;
}
