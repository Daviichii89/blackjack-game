const myModule = (() => {
    'use strict';

    let deck = [''];
    const suits = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    const btnAskFor = document.querySelector('#btnAskFor'),
          btnStop = document.querySelector('#btnStop'),
          btnNewGame = document.querySelector('#btnNewGame');

    const playersCardsContainer = document.querySelectorAll('.divCards'),
          playersPointsContainer = document.querySelectorAll('small');

    const initializeGame = ( playerNum = 2 ) => {
        deck = createDeck()
        playersPoints = [];
        for (let i = 0; i < playerNum; i++) {
            playersPoints.push(0);
        }

        playersPointsContainer.forEach(element => element.innerText = 0);
        playersCardsContainer.forEach(element => element.innerHTML = '');

        btnAskFor.disabled = false;
        btnStop.disabled = false;
    };

    const createDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let suit of suits) {
                deck.push(i + suit);
            }
        }
        for (let suit of suits) {
            for (let special of specials) {
                deck.push(special + suit);
                
            }
        }
        return _.shuffle(deck);
    }

    const askforCard = () => {
        if (deck.length === 0) {
            alert('No hay cartas en la baraja, pulse en Nuevo Juego');
            throw 'No hay cartas en la baraja';
        }
        return deck.pop();
    };

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return isNaN(value) ? (value === 'A') ? 11 : 10 : value * 1;
    }

    const amountPoints = ( card, turn ) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        playersPointsContainer[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        imgCard.alt = `Carta ${card}`;
        playersCardsContainer[turn].append(imgCard);
    }

    const determineWinner = () => {
        const [minPoints, computerPoints] = playersPoints;
        setTimeout(() => {
            if (computerPoints === minPoints) {
                alert('Empate');
            } else if (minPoints > 21) {
                alert('Has perdido');
            } else if (computerPoints > 21) {
                alert('Has ganado!!');
            } else {
                alert('Has perdido');
            }
        }, 100);
    };

    const computerTurn = (minPoints) => {
        let computerPoints = 0;
        do {
            const card = askforCard();
            computerPoints = amountPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);
        } while (computerPoints < minPoints && minPoints <= 21);
        determineWinner();
    }

    btnAskFor.addEventListener('click', () => {

        const card = askforCard();
        const playerPoints = amountPoints(card, 0);
        createCard(card, 0);

        if (playerPoints > 21) {
            console.warn('Otra vez será. Perdiste');
            btnAskFor.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            console.warn('21, genial!');
            btnAskFor.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        }
    });

    btnStop.addEventListener('click', () => {
        btnAskFor.disabled = true;
        btnStop.disabled = true;
        computerTurn(playersPoints[0]);
    });

    btnNewGame.addEventListener('click', () => {
        initializeGame();
    });

    return {
        newGame: initializeGame
    };
})()


