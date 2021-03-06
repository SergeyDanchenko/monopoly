import Game from '../../../entities/Game/Game';
import { isPlayerHaveEnoughMoney, getCellObjByPosition } from '../dialogWindow';
import Property from '../../../entities/ifacies/Property';

export default function lockPayOrBuyBtnIfNotEnoughMoney(): void {
  const payOrBuyBtn: HTMLElement = document.querySelector('.pay-or-buy');
  if (payOrBuyBtn) {
    const cellObj: Property = getCellObjByPosition(Game.activePlayer.position);
    if (payOrBuyBtn.classList.contains('buy')) {
      if (!isPlayerHaveEnoughMoney(Game.activePlayer, cellObj.cost)) {
        payOrBuyBtn.classList.add('inactive');
      }
    } else {
      if (!isPlayerHaveEnoughMoney(Game.activePlayer, cellObj.currentRent)) {
        payOrBuyBtn.classList.add('inactive');
      }
    }
  }
}