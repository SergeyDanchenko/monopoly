import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'

export function startWindow() {
    const classStartWindow = document.querySelector('.start-window')
    const numberPlayers = createElement('div', ['number-players'], 'Select number of players.')
    const gamekoi = createElement('select', ['select-style'])
    const gamekoiDisabl = createElement('option', ['num'], 'num')
    gamekoiDisabl.selected = 'selected'
    gamekoiDisabl.disabled = 'disabled'

    const gamekoiTuo = createElement('option', ['num'], '2')
    gamekoiTuo.value = 2

    const gamekoiThree = createElement('option', ['num'], '3')
    gamekoiThree.value = 3

    const gamekoiFour = createElement('option', ['num'], '4')
    gamekoiFour.value = 4

    const settingGamers = createElement('div', ['setting-gamers'])
    const btnStart = createElement('button', ['btn-start', 'color-btn'], 'Start game')

    appendElementTo(classStartWindow, numberPlayers)
    appendElementTo(numberPlayers, gamekoi)
    appendElementTo(gamekoi, gamekoiDisabl, gamekoiTuo, gamekoiThree, gamekoiFour)
    appendElementTo(classStartWindow, settingGamers)
    appendElementTo(classStartWindow, btnStart)

    gamekoi.addEventListener('change', () => addGamecoaSetting(settingGamers, gamekoi.value))

    startBtn()
}

export function startBtn() {
    const startBtn = document.querySelector('.btn-start')
    startBtn.addEventListener('click', function () {
        document.querySelector('.start-window').classList.add('no-active')
        document.querySelector('#blackout').classList.remove('blackout');
    })
}

function addGamecoaSetting(settingGamers, selectNum) {
    settingGamers.innerHTML = '';
    for (let i = 0; i < selectNum; i++) {

        const playerWrapper = createElement('div', ['player-wrapper'])
        const playerIcon = createElement('div', [`player-icon${i + 1}`, 'icon'])
        const playerIconName = createElement('p', [`player-icon-name${i + 1}`, 'icon-name'], 'P')
        const playerInput = createElement('input', [`player-input${i + 1}`, 'input-name'])
        playerInput.placeholder = `Player ${i + 1}`

        const playerSelectColor = createElement('select', [`player-select-color${i + 1}`, 'select-style', 'select-game'])
        const selectColorDisabl = createElement('option', ['disabled'], 'Color')
        selectColorDisabl.selected = 'selected'
        selectColorDisabl.disabled = 'disabled'

        const selectColorUan = createElement('option', ['red'], 'Red')
        selectColorUan.value = '#db2428'

        const selectColorTuo = createElement('option', ['blue'], 'Blue')
        selectColorTuo.value = '#47a7ff'

        const selectColorThree = createElement('option', ['orange'], 'Orange')
        selectColorThree.value = '#eb8b2c'

        const selectColorFour = createElement('option', ['green'], 'Green')
        selectColorFour.value = '#11a85a'

        const playerSelectHuman = createElement('select', ['player-selectHuman', 'select-style'])
        const selectHuman = createElement('option', ['num'], 'Human')
        selectHuman.value = 'human'

        const selectAi = createElement('option', ['num'], 'AI(test)')
        selectAi.value = 'ai'

        appendElementTo(settingGamers, playerWrapper)
        appendElementTo(playerWrapper, playerIcon, playerInput, playerSelectColor, playerSelectHuman)
        appendElementTo(playerIcon, playerIconName)
        appendElementTo(playerSelectColor, selectColorDisabl, selectColorUan, selectColorTuo, selectColorThree, selectColorFour)
        appendElementTo(playerSelectHuman, selectHuman, selectAi)

        playerSelectColor.addEventListener('change', () => playerIcon.style.backgroundColor = playerSelectColor.value)
    }
}