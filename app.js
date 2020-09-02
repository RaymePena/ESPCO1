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
	let totalCorrect = 0;
	let hits = 0;

	const shuffleRandom = () => {
		let cardSource;
		const shuffleCard = _.shuffle(cards);
		const randomCardIndex = _.random(0, shuffleCard.length);

		if (cards[randomCardIndex].value && cards[randomCardIndex].name) {
			card = cards[randomCardIndex].name.toLocaleLowerCase();
			cardSource = cards[randomCardIndex].value;
		}
		addSymbol(cardSource, card);
	};

	/**
	 * Start the sound
	 */

	const soundByte = async () => {
		let sound = await new Audio('./dist/sounds/Culling_Blade.mp3.mpeg');
		return sound.play();
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
	});

	xModalButton.addEventListener('click', () => {
		closeModal();
	});

	/**
	 * Vibrate
	 */

	const vibrateAction = (ms) => {
		return navigator.vibrate(ms);
	};
	const addSymbol = (symbol, name) => {
		cardSymbol = name;
		frontOfCard.innerHTML = `<img src="${symbol}" alt="${name}" />`;
	};

	/**
	 * compare the cards with a card click
	 */

	const compareCards = (cardSymbol) => {
		console.log(card, 9999999999);
		console.log(cardSymbol, 888888888);
		if (cardSymbol === card) {
			totalCorrect++;
			soundByte();
			displayCard();
		} else {
			vibrateAction(200);
			displayCard();
		}
		shuffleRandom();
	};

	/**
	 * display card
	 */

	const displayCard = () => {
		hits++;
		if (hits <= 11) {
			backOfCard.style.display = 'none';
			setTimeout(() => {
				backOfCard.style.display = 'block';
			}, 1000);
		}
		if (hits === 11) {
			displayModal(totalCorrect);
		}
	};

	/**
	 *
	 * Display modal
	 */

	const displayModal = (answer) => {
		let p = document.querySelector('.modal-body p');
		let header = document.querySelector('.modal-body h3');
		console.log(hits);
		if (answer > 5) {
			header.innerHTML = `Congratulations!, You have ninja ESP Powers`;
			p.innerHTML = `Score: <br/> Correct: ${answer} <br/> ${hits - answer}`;
			openModal();
		} else {
			header.innerHTML = `Sorry!, Your ESP Powers Need more training`;
			p.innerHTML = `Score: <br /> Correct: ${answer} <br/> Miss: ${
				hits - answer
			}`;
			openModal();
		}
		count = 0;
	};
	/**
	 * shuffles and random the cards.
	 */

	waves.addEventListener('click', () => {
		const wavesSymbol = waves.getAttribute('data-value');
		compareCards(wavesSymbol);
	});

	circle.addEventListener('click', () => {
		const circleSymbol = circle.getAttribute('data-value');
		compareCards(circleSymbol);
	});

	star.addEventListener('click', () => {
		const starSymbol = star.getAttribute('data-value');
		compareCards(starSymbol);
	});

	square.addEventListener('click', () => {
		const squareSymbol = square.getAttribute('data-value');
		console.log(squareSymbol);
		compareCards(squareSymbol);
	});
	plus.addEventListener('click', () => {
		const plusSymbol = plus.getAttribute('data-value');
		compareCards(plusSymbol);
	});
})();
