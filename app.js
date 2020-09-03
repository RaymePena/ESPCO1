(() => {
	const cards = [
		{ name: 'Circle', value: './dist/img/circle.svg' },
		{ name: 'Square', value: './dist/img/square.svg' },
		{ name: 'Star', value: './dist/img/star.svg' },
		{ name: 'Plus', value: './dist/img/plus.svg' },
		{ name: 'Waves', value: './dist/img/waves.svg' }
	];

	const startButton = document.querySelector('#start-btn');
	const modal = document.querySelector('#mainModal');
	const frontOfCard = document.querySelector('.front-card');
	const backOfCard = document.querySelector('.back-card');
	const star = document.querySelector('#star-symbol-btn');
	const waves = document.querySelector('#waves-symbol-btn');
	const circle = document.querySelector('#circle-symbol-btn');
	const plus = document.querySelector('#plus-symbol-btn');
	const square = document.querySelector('#square-symbol-btn');
	const modalButton = document.getElementById('modal-btn');
	const xModalButton = document.getElementById('x-close');
	let card;
	let cardSource;
	let totalCorrect = 0;
	let cardMiss = 0;
	let hits = 0;

	/**
	 * Symbol add the image to the front of the card in the html document.
	 * @param {the path where the card can be found} path
	 * @param {* the name of the card} name
	 */
	const addSymbol = (path, name) => {
		cardSymbol = name;
		frontOfCard.innerHTML = `<img src="${path}" alt="${name}" />`;
	};

	/**
	 * Start the sound
	 */

	const soundByte = async () => {
		let sound = await new Audio('./dist/sounds/Vo_bounty_hunter.mp3');
		sound.play();
	};

	/**
	 * Display Modal
	 */

	const openModal = () => {
		document.getElementById('mainModal').style.display = 'block';
		document.getElementById('mainModal').className += 'show';
	};

	/**
	 *
	 *closed the modal
	 */

	const closeModal = () => {
		document.getElementById('mainModal').style.display = 'none';
		document.getElementById('mainModal').className += document
			.getElementById('mainModal')
			.className.replace('show', '');
	};

	modalButton.addEventListener('click', () => {
		closeModal();
		location.reload();
	});

	xModalButton.addEventListener('click', () => {
		closeModal();
		location.reload();
	});

	/**
	 * Vibrate the mobile dive it the user miss
	 */

	const vibrateAction = (ms) => {
		return navigator.vibrate(ms);
	};

	/**
	 * Randomize the cards
	 */
	const shuffleRandom = () => {
		const shuffleCard = _.shuffle(cards);
		const randomCardIndex = _.random(0, cards.length);
		if (
			cards[randomCardIndex].value !== undefined &&
			cards[randomCardIndex].name !== undefined
		) {
			card = cards[randomCardIndex].name.toLocaleLowerCase();
			cardSource = cards[randomCardIndex].value;
		} else {
			card = cards[0].name;
			cardSource = cards[0].value;
		}
		addSymbol(cardSource, card);
	};
	shuffleRandom();

	/**
	 *
	 * @param {*} cardName
	 */
	const compareCards = (cardName) => {
		if (cardName === card) {
			totalCorrect++;
			soundByte();
		} else {
			cardMiss++;
			vibrateAction(200);
		}

		let correctGuess = document.querySelector('.correct-guess');
		correctGuess.innerHTML = `<strong>Hits:</strong> ${totalCorrect}  `;
		let miss = document.querySelector('.card-miss');
		miss.innerHTML = `<prev> <strong>Miss:</strong> ${cardMiss} </prev>`;
	};

	/**
	 * display card
	 */

	const displayCard = () => {
		if (hits <= 10) {
			backOfCard.style.display = 'none';
			setTimeout(() => {
				backOfCard.style.display = 'block';
				shuffleRandom();
			}, 1000);
		}
		hits++;
		if (hits === 11) {
			setTimeout(() => {
				displayModal(totalCorrect);
			}, 500);
		}
	};

	/**
	 *
	 * Display modal
	 */

	const displayModal = (answer) => {
		let p = document.querySelector('.modal-body p');
		let header = document.querySelector('.modal-body h3');
		if (answer > 5) {
			header.innerHTML = `Congratulations!, You have ninja ESP Powers`;
			p.innerHTML = `Score: <br/> Correct: ${answer} <br/> ${
				hits - 1 - answer
			}`;
			openModal();
		} else {
			header.innerHTML = `Sorry!, Your ESP Powers Need more training`;
			p.innerHTML = `Score: <br /> Correct: ${answer} <br/> Miss: ${cardMiss}`;
			openModal();
		}
	};
	/**
	 * shuffles and random the cards.
	 */

	waves.addEventListener('click', () => {
		const wavesSymbol = waves.getAttribute('data-value');
		compareCards(wavesSymbol);
		displayCard();
	});

	circle.addEventListener('click', () => {
		const circleSymbol = circle.getAttribute('data-value');
		compareCards(circleSymbol);
		displayCard();
	});

	star.addEventListener('click', () => {
		const starSymbol = star.getAttribute('data-value');
		compareCards(starSymbol);
		displayCard();
	});

	square.addEventListener('click', () => {
		const squareSymbol = square.getAttribute('data-value');
		compareCards(squareSymbol);
		displayCard();
	});
	plus.addEventListener('click', () => {
		const plusSymbol = plus.getAttribute('data-value');
		compareCards(plusSymbol);
		displayCard();
	});
})();
