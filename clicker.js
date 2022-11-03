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
let player = {
	health: {
		max: 100,
		current: 100,
	},
	energy: {
		max: 10,
		current: 10,
	},
	damage: {
		max: 0,
		min: 0,
	}
}
const rankTable ={
	'SSS': 8,
	'SS': 7,
	'S': 6,
	'A+': 5,
	'A': 4,
	'B+': 3,
	'B': 2,
	'C': 1
}
function addScore(upd) {
	score = score + upd;
	document.getElementsByName("score")[0].innerHTML = score.toFixed(2) + " Rc-клеток";
	updateCharacs();
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

async function attackGhoul(){
	document.querySelector("[name='battleMode']").style.display = '';
	await battleMode();
	characteristics.strength.change(1);
	const randomRc = Math.floor(Math.random() * 105 + 10);
	addScore(randomRc);
}
function updateCharacs(){
	player.damage.max = characteristics.strength.count * 7;
	player.damage.min = Math.floor(characteristics.strength.count * 7 * 0.66);
	document.querySelector("[name='health']").innerHTML = 'Здоровье: ' + player.health.current + '/' + player.health.max;
	document.querySelector("[name='energy']").innerHTML = 'Энергия: ' + player.energy.current + '/' + player.energy.max;
	document.querySelector("[name='damage']").innerHTML = 'Урон: ' + player.damage.min + '-' + player.damage.max;
}
async function battleMode(){
	let cells = document.querySelector("[name='cells']");
	let cellsBtn = cells.querySelectorAll("button");
	let turn = 1;
	let isActiveBattle = true

	cellsBtn.forEach((item)=>{
		item.disabled = true;
	});

	let enemy = spawnEnemy();
	updateEnemy(enemy);
	console.log(spawnEnemy());

	document.querySelector('[name="ghoulName"]').innerHTML = 'Гуль ' + enemy.ghoulRank +' ранга';

	while(isActiveBattle){
		player.health.current <= 0 && lose();
		if(enemy.health <= 0){
			win();
			isActiveBattle = false;
		}
		if(turn % 2 === 1){
			document.querySelector("[name='attack']").style.display = '';
			await playerAttack(Math.floor(Math.random() * (player.damage.max - player.damage.min) + player.damage.min), enemy);
			updateEnemy(enemy);
			turn++;
		}else{
			document.querySelector("[name='attack']").style.display = 'none';
			await enemyAttack(Math.floor(Math.random() * (enemy.damage.max - enemy.damage.min) + enemy.damage.min));
			updateCharacs(); 
			turn++;
		}
	}

	cellsBtn.forEach((item)=>{
		item.disabled = false;
	});
}
async function enemyAttack(damage){
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			console.log('timeout');
			player.health.current -= damage;
			resolve()
		}, 1500)
	})
	
}
async function playerAttack(damage, enemy){
	return new Promise((resolve, reject) => {
		document.querySelector("[name='attack']").onclick = () => {
			enemy.health -= damage;
			resolve()
		}
	})
}
function updateEnemy(enemy){
	const enemyPlace = document.querySelector('[name="enemy"]');
	enemyPlace.querySelector('[name="ghoulName"]').innerHTML = 'Гуль ' + enemy.ghoulRank +' ранга';
	enemyPlace.querySelector('[name="health"]').innerHTML = enemy.health;
	enemyPlace.querySelector('[name="energy"]').innerHTML = enemy.energy;
	enemyPlace.querySelector('[name="damage"]').innerHTML = enemy.damage.min + '-' + enemy.damage.max;
}

function spawnEnemy(){
	let rank = 'C';
	const ranks = Object.keys(rankTable);
	let scoreRank = Math.floor(Math.random() * (1800 - rankTable[rank] * 100)+ 1);	
	console.log('rank', scoreRank);

	for (let i = 0; i < 7; i++) {
		const newScore = Math.floor(Math.random() * (1800 - rankTable[ranks[i]] * 100) + 1);
		console.log(newScore);
		if(newScore >= scoreRank){
			scoreRank = newScore;
			rank = ranks[i];
		}
	}
	return createEnemy(rank);
}

function createEnemy(rank){
	let enemy= {
		ghoulRank: rank,
		health: 0,
		energy: 0,
		damage: {
			max: 0,
			min: 0,
			type: 'melee',
		}
	};
	enemy.health = Math.floor(Math.random() * (Math.pow(3,rankTable[rank]) + 97) + (Math.pow(2,rankTable[rank]) * 4.6 + 60)/3);
	enemy.energy = Math.floor(Math.random() * (20 * rankTable[rank] + 10)/3 + (2 * rankTable[rank] + 5));
	enemy.damage.max = Math.floor(Math.random() * ( 4 * rankTable[rank] * (Math.pow(2,rankTable[rank])/3 + 5))/3 + (2 * rankTable[rank] + 7));
	enemy.damage.min = Math.floor(enemy.damage.max - (enemy.damage.max * 0.33));
	console.log(enemy);
	return enemy;
}
function lose(){
	alert('Вы проиграли!');
	location.reload();
}
function win(){
	alert('Вы победили!');
	document.querySelector("[name='battleMode']").style.display = 'none';
}
selectMenuItem(0);
updateCharacs();