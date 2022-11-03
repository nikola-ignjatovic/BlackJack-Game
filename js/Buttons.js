var bidButtonAlreadyPressed = false;

function OnRestartGameButtonDown() {
  RestartGame();
}

function TurnOnBidAndRestartGameButton() {
  TurnOnButton(BidButton);
  TurnOnButton(RestartGameButton);
}

function TurnOffBidAndRestartGameButton() {
  TurnOffButton(BidButton);
  TurnOffButton(RestartGameButton);
}

function TurnOffButton(button) {
  button.visible = false;
  button.interactive = false;
  button.buttonMode = false;
}

function TurnOnButton(button) {
  button.visible = true;
  button.interactive = true;
  button.buttonMode = true;
}

function OnBidButtonDown() {
  if (bidButtonAlreadyPressed) {
    var a = document.getElementById('InputZaBid').value;
    if (
      document.getElementById('InputZaBid').value <= listOfPlayerChips.length &&
      document.getElementById('InputZaBid').value != 0
    ) {
      amountOfChipsBid = document.getElementById('InputZaBid').value;
      SendChipsToMiddleFromPlayer();
      setTimeout(function () {
        StartGamePhase1();
      }, chipSpillAnimationTime + chipToMiddleAnimationTime);
      bidButtonAlreadyPressed = false;
      document.getElementById('FormaZaBid').style.display = 'none';
      TurnOffButton(BidButton);
      TurnOffButton(RestartGameButton);
    }
  } else {
    document.getElementById('FormaZaBid').style.display = 'block';

    bidButtonAlreadyPressed = true;
  }
}

function OnHitButtonDown() {
  tap1Sound.play();
  TurnOffHitAndStandButtons();
  PlayerDealCard();
}

function TurnOnHitAndStandButtons() {
  TurnOnButton(HitButton);
  TurnOnButton(StandButton);
}

function TurnOffHitAndStandButtons() {
  HitButton.visible = false;
  HitButton.interactive = false;
  HitButton.buttonMode = false;

  StandButton.visible = false;
  StandButton.interactive = false;
  StandButton.buttonMode = false;
}
