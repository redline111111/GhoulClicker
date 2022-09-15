let score = 1000;
let updating = 0.01;
let menu = document.getElementsByName("menu-item");
let menuList = document.getElementsByName("list");

document.getElementsByName("Click")[0].addEventListener('click', addScore);

function addScore() {
	score = score + updating;
	document.getElementsByName("score")[0].innerHTML = score.toFixed(2) + " Rc-клеток";
}

function selectMenuItem(number) {
	for (let i = 0; i < menu.length; i++) {
		menu[i].className = '';
		menuList[i].style.display = 'none';
	}
	menu[number].className = "underline decoration-rose-700 decoration-2 font-semibold text-rose-700";
	menuList[number].style.display = '';
}

selectMenuItem(2);