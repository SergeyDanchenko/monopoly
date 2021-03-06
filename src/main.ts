import { initWindowCards } from './popupWindows/cellsCards/cellCard';
import roll from './gameSections/dice/dice';
import { startWindow } from './popupWindows/StartWindow/startWindow';
import { btnClikMenu } from './popupWindows/menu/menu';
import initPledgeBtn  from './gameSections/propertyActions/pledge/pledge';
import initBuyoutBtn from './gameSections/propertyActions/buyout/buyout';
import { changeTitleOnCell } from './changeLanguage/changeLanguage';
import initBuyHouseButton from './gameSections/propertyActions/buyHouse/buyHouse';
import initSellHouseButton from './gameSections/propertyActions/sellHouse/sellHouse';
import { showWinScreen } from './popupWindows/winScreen/winScreen'

import './style/style.scss';
import './gameSections/dice/dice.scss';
import './gameSections/dialogWindow/dialogWindow.scss';
import './style/field.scss';
import './gameSections/histiryWindow/historyWindow.scss';
import './style/player.scss';
import './popupWindows/StartWindow/startWindow.scss';
import './gameSections/playerCards/playerCards.scss';
import './popupWindows/menu/menu.scss';
import './style/constants.scss';
import './style/scrollBar.scss';
import './style/buyingSection.scss';
import './style/radioBtnForLanguage.scss';

import './style/testBtn.scss';
import './style/dark.scss';
import './gameSections/dialogWindow/loader.scss';
import './style/footer.scss';
import './popupWindows/winScreen/gameСompletion.scss';

initWindowCards();

startWindow();
btnClikMenu()

initBuyHouseButton();
initSellHouseButton();

initPledgeBtn();
initBuyoutBtn();

changeTitleOnCell();

// const btn = document.querySelector('.btn')
// btn.addEventListener('click', gameСompletion)

roll();

