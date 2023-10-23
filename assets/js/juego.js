let deck = [];
const palos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    computerPoints = 0;

const btnAskFor = document.querySelector('#btnAskFor');
const btnStop = document.querySelector('#btnStop');
const btnNewGame = document.querySelector('#btnNewGame');

const playerCardsContainer = document.querySelector('#jugador-cartas');
const playerPointsContainer = document.querySelector('#playerPoints');

const computerCardsContainer = document.querySelector('#computadora-cartas');
const computerPointsContainer = document.querySelector('#computerPoints');

const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let palo of palos) {
            deck.push(i + palo);
        }
    }
    for (let palo of palos) {
        for (let especial of especiales) {
            deck.push(especial + palo);
            
        }
    }

    deck = _.shuffle(deck);
    return deck;
}

createDeck();

const askforCard = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop();
    return card;
};

 askforCard();

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === 'A') ? 11 : 10 : value * 1;
}

const point = cardValue(askforCard());

const computerTurn = (pointsMin) => {
    do {
        const card = askforCard();
        computerPoints = computerPoints + cardValue(card);
        computerPointsContainer.innerText = computerPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        imgCard.alt = `Carta ${card}`;

        computerCardsContainer.append(imgCard);

        if (pointsMin > 21) {
            break;
        }
    } while (computerPoints < pointsMin && pointsMin <= 21);

    // if (pointsMin < computerPoints && computerPoints <= 21) {
    //     alert('Perdiste');
    // } else 
    setTimeout(() => {
        if (pointsMin === computerPoints) {
            alert('Empate');
        } else if (pointsMin > 21) {
            alert('Has perdido');
        } else if (computerPoints > 21) {
            alert('Has ganado!!');
        } else {
            alert('Has perdido');
        }
    }, 100);
}

btnAskFor.addEventListener('click', () => {
    const card = askforCard();
    console.log('Carta', card);

    playerPoints = playerPoints + cardValue(card);

    playerPointsContainer.innerText = playerPoints;

    // <img src="assets/cartas/2C.png" alt="carta" class="carta"></img>

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    imgCard.alt = `Carta ${card}`;

    playerCardsContainer.append(imgCard);

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
    computerTurn(playerPoints);
});

const newGame = () => {
    console.clear();
    deck = [];
    deck = createDeck();

    computerPoints, playerPoints = 0;

    playerPointsContainer.innerText = 0;
    computerPointsContainer.innerText = 0;

    playerCardsContainer.innerHTML = '';
    computerCardsContainer.innerHTML = '';

    btnAskFor.disabled = false;
    btnStop.disabled = false;
};

btnNewGame.addEventListener('click', () => {
    newGame();
});