let score = 1000;
let menu = document.getElementsByName("menu-item");
let menuList = document.getElementsByName("list");

let characteristics = {
	strength: {
		count: 1,
		change(number){
			this.count += number;
			document.getElementsByName("strength")[0].innerHTML = 'Сила: ' + this.count;
		}
	},
	agility: {
		count: 1,
		change(number){
			this.count += number;
			document.getElementsByName("agility")[0].innerHTML = 'Ловкость: ' + this.count;
		}
	},
	intelligence: {
		count: 1,
		change(number){
			this.count += number;
			document.getElementsByName("intelligence")[0].innerHTML = 'Интеллект: ' + this.count;
		}
	},
	endurance: {
		count: 1,
		change(number){
			this.count += number;
			document.getElementsByName("endurance")[0].innerHTML = 'Выносливость: ' + this.count;
		}
	},
	charisma:{
		count: 1,
		change(number){
			this.count += number;
			document.getElementsByName("charisma")[0].innerHTML = 'Харизма: ' + this.count;
		}
	},
	mastery: {
		count: 1,
		change(number){
			this.count += number;
			document.getElementsByName("mastery")[0].innerHTML = 'Мастерство: ' + this.count;
		}
	},
}

function addScore(upd) {
	score = score + upd;
	document.getElementsByName("score")[0].innerHTML = score.toFixed(2) + " Rc-клеток";
	checkRank (score);
}

function checkRank(score) {
	let rank = document.querySelector('[name="rank"]');
	console.log(rank);
	if (score < 1600) {
       rank.innerHTML = "Ранг: C"
	} else
	if (score >=1600 & score < 2200) {
	   rank.innerHTML = "Ранг: C+"
	} else
	if (score >=2200 & score < 2800) {
	   rank.innerHTML = "Ранг: B"
	} else
	if (score >=2800 & score < 3400) {
	   rank.innerHTML = "Ранг: B+"
	} else
	if (score >=3400 & score < 4000) {
	   rank.innerHTML = "Ранг: A"
	} else
	if (score >=4000 & score < 4600) {
	   rank.innerHTML = "Ранг: A+"
	} else
	if (score >=4600 & score < 5200) {
	   rank.innerHTML = "Ранг: S"
	} else
	if (score >=5200 & score < 5800) {
	   rank.innerHTML = "Ранг: S+"
	} else
	if (score >=4000 & score < 6400) {
	   rank.innerHTML = "Ранг: SS"
	} else
	if (score >=6400 & score < 8000) {
	   rank.innerHTML = "Ранг: SS+"
	} else
	if (score >=8000) {
	   rank.innerHTML = "Ранг: SSS"
	}
}

function selectMenuItem(number) {
	for (let i = 0; i < menu.length; i++) {
		menu[i].className = '';
		menuList[i].style.display = 'none';
	}
	menu[number].className = "underline decoration-rose-700 decoration-2 font-semibold text-rose-700";
	menuList[number].style.display = '';
}

function drinkCoffe(){
	addScore(1)
}

function hunting(){
	const randomRc = Math.floor(Math.random() * 10);
	addScore(randomRc);
}

function attackGhoul(){
	characteristics.strength.change(1);
	const randomRc = Math.floor(Math.random() * (120 - 15) + 10);
	addScore(randomRc);
}
selectMenuItem(0);


function addInt(value){
	value = Number(value)
	characteristics.intelligence.change(value);
	let int = document.querySelector('[name="int"]');
	int.value = value + 1
	int.innerHTML = "+" + int.value + " Интеллект"
	if (value >= 10) {
		int.disabled = true
		int.innerHTML = "max level"
		int.className = "text-red-600"
	}
}