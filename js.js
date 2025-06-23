let currentSearchedItemIndex = 0;
let receivedItemsCountEl = document.getElementById('receivedItemsCountEl');
let allItemsCountEl = document.getElementById('allItemsCountEl');

let receivedItems = [];
const getItemBtn = document.getElementById('getItemBtn');
const infoBlock = document.getElementById('searchedItemInfo');
const gameField = document.getElementById('gameField');
let record = localStorage.getItem('record');

const items = [
	{name: 'Синий цветок', image: 'blue_flower.png'},
	{name: 'Золотая рыбка', image: 'fish.gif'},
	{name: 'Лягушка', image: 'frog.png'},
	{name: 'Коричневый кот', image: 'brown_cat.png'},
	{name: 'Бриллиант', image: 'diamond.gif'},
	{name: 'Кнопочный телефон', image: 'telephone.gif'},
	{name: 'Коричневая курица', image: 'brown_curica.png'},
	{name: 'Бабочка', image: 'butterfly.png'},
	{name: 'Веточка', image: 'branch.jpg'},
	{name: 'Синичка', image: 'sinica.png'},
	{name: 'Лисичка', image: 'fox.gif'},
	{name: 'Пузыри', image: 'puziri.gif'},
	{name: 'Мышка', image: 'mouse.gif'},
	{name: 'Розовый цветок', image: 'pink_flower.gif'},
	{name: 'Цветок лотоса', image: 'lotus.png'},
]

allItemsCountEl.innerHTML = items.length;

function shuffelWord(word) {
  word_spl = word.split('');

  let first = word_spl.shift();
  let last = '';
  if (word.length > 1) {last = word_spl.pop()}

  for (let i = word_spl.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [word_spl[i], word_spl[j]] = [word_spl[j], word_spl[i]];
  }
  return first + word_spl.join("") + last;
}

function generateItem() {
	function getRandomInt(min, max) {
		min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	if(getRandomInt(1, 2) == 2) {
		let itemIndex = getRandomInt(0, items.length-1);
		let shuffledWord = shuffelWord(items[itemIndex].name).replace(/\s/g, '');
		infoBlock.innerHTML = 'Найден предмет: ' + shuffledWord + '';
		getItemBtn.classList.remove('hidden');
		currentSearchedItemIndex = itemIndex;
	}
}

function clearSearchedBlock() {
		infoBlock.innerHTML = 'Здесь отобразится обнаруженный предмет.';
		getItemBtn.classList.add('hidden');
}

function getItem() {
	const ul = document.getElementById('receivedItems');
	let includesStatus = false;
	let oldItemIndex;
	receivedItems.forEach((item, key) => {
		if(item['name'] == items[currentSearchedItemIndex]['name']) {
			includesStatus = true;
			oldItemIndex = key;
		}
	})
	if(!includesStatus) {
		let li = document.createElement('li');
		li.innerHTML = "<img src='./icons/" + items[currentSearchedItemIndex]['image'] + "'>" + items[currentSearchedItemIndex]['name'];
		li.id = 'item_' + currentSearchedItemIndex;
		ul.appendChild(li);
		receivedItems.push({name: items[currentSearchedItemIndex]['name'], image: items[currentSearchedItemIndex]['image']});
		receivedItemsCountEl.innerHTML = receivedItems.length;
		meow();
		if(receivedItems.length == items.length) {
			showResult();
		}
	} else {
		receivedItems.splice(oldItemIndex, 1);
		document.getElementById('item_' + currentSearchedItemIndex).remove();
		receivedItemsCountEl.innerHTML = receivedItems.length;
	};
	clearSearchedBlock();
}

let seconds = 1;
function timer() {
	let timer = document.getElementById('timer');
	let seconds_timer_id = setInterval(function() {
		if (seconds > 0) {
			seconds ++;
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			timer.innerHTML = seconds + ' сек.';
		} else {
			clearInterval(seconds_timer_id);    
		}
	}, 1000);
}

function meow() {
	let audio2 = new Audio();
	audio2.preload = 'auto';
	audio2.src = 'мяу.mp3';
	audio2.play();
}

function startGame() {
	const startPage = document.getElementById('startPage');
	gameField.classList.remove('hidden');
	startPage.classList.add('hidden');
	timer();
	meow();
	let audio1 = new Audio();
	audio1.preload = 'auto';
	audio1.src = 'music.mp3';
	audio1.play();
}

function showResult() {
	meow();
	const resultText = document.getElementById('resultText');
	const resultPage = document.getElementById('resultPage');
	const timeImprovementText = document.getElementById('timeImprovementText');
	resultPage.classList.remove('hidden');
	resultText.innerHTML = seconds;
	if(seconds < record || record == null) {
		localStorage.setItem('record', seconds);
		gameField.append = 'Это рекорд!';
		if(record != null) {
			timeImprovementText.innerHTML = record - seconds;
		} else {
			timeImprovementText.innerHTML = "млрд";
		}
		document.getElementById('recordStatus').classList.remove('hidden');
	}
}