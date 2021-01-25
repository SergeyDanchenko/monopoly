import roll from '../dice/dice';
import game from '../Game/Game';
import movePlayer from '../move_player/movePlayerFn';
import showDialogWindow, {
  getCellObjByPosition, isPlayerHaveEnoughMoney, addPropertyToPlayer, changeMoneyOnPlayerCard, setNextPlayerAsActive, setStreetRent, setRailroadRent, setCommunalRent, isColorSet,
} from '../dialogWindow/dialogWindow';
import initBuyHouseButton from '../buyHouse/buyHouse';
import initHistoryWindow from '../histiryWindow/historyWindow';

export default function computerMove(action) {
  const cell = getCellObjByPosition(game.activePlayer.position);
  switch (action) {
    case 'roll':
      const p = new Promise((resolve) => {
        let test;
        setTimeout(() => {
          test = setInterval(roll, 200);
        }, 0);
        setTimeout(() => {
          clearInterval(test);
          resolve();
        }, 3000);
      });
      p.then(() => {
        const diceValue = roll();
        movePlayer(diceValue);
        initHistoryWindow(`rolled ${diceValue} on the dice`);
      });
      break;
    case 'buy':
      if (isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
        addPropertyToPlayer(game.activePlayer, cell);
        changeMoneyOnPlayerCard(game.activePlayer);
        const ownerLine = cell.element.querySelector('.owner');
        ownerLine.style.backgroundColor = game.activePlayer.color;
        if (cell.type === 'street') {
          setStreetRent(cell, game.activePlayer);
        } else if (cell.type === 'railroad') {
          setRailroadRent(game.activePlayer);
        } else {
          setCommunalRent(cell, game.activePlayer);
        }
        // логика постройки дома
        computerMove();
      } else {
        computerMove();
      }
      initHistoryWindow(`bought ${cell.name} for $${cell.cost}`);
      break;
    case 'rent':
      if (cell.type !== 'communal') {
        if (isPlayerHaveEnoughMoney(game.activePlayer, cell.currentRent)) {
          game.activePlayer.money -= cell.currentRent;
          changeMoneyOnPlayerCard(game.activePlayer);
          cell.owner.addMoney(cell.currentRent);
          changeMoneyOnPlayerCard(cell.owner);
          initHistoryWindow(`paid $${cell.currentRent} rent to ${cell.owner.name}`);
          computerMove();
        } else {
          // доработать
        }
      } else {
        const p = new Promise((resolve) => {
          let test;
          setTimeout(() => {
            test = setInterval(roll, 200);
          }, 0);
          setTimeout(() => {
            clearInterval(test);
            resolve();
          }, 3000);
        });
        p.then(() => {
          let rent = roll();
          initHistoryWindow(`rolled ${rent} on the dice`);
          rent = isColorSet(cell.owner, cell) ? rent * 10 : rent * 4;
          if (isPlayerHaveEnoughMoney(game.activePlayer, rent)) {
            game.activePlayer.money -= rent;
            changeMoneyOnPlayerCard(game.activePlayer);
            cell.owner.addMoney(rent);
            changeMoneyOnPlayerCard(cell.owner);
            initHistoryWindow(`paid $${cell.currentRent} rent to ${cell.owner.name}`);
            computerMove();
          } else {
            // доработать
          }
        });
      }
      break;
    case 'tax':
      if (isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
        game.activePlayer.subtractMoney(cell.cost);
        changeMoneyOnPlayerCard(game.activePlayer);
        initHistoryWindow(`paid $${cell.cost} ${cell.name}`);
        computerMove();
      } else {
        // доработать
      }
      break;
    default:
      setNextPlayerAsActive();
      if (game.activePlayer.isHuman) {
        showDialogWindow('roll');
      } else {
        computerMove('roll');
      }
      initBuyHouseButton();
      break;
  }
}
