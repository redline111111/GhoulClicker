let score = 1000;
let updating = 0.01;
console.log(1)
function clickBtn() {
	score = score + updating;
	document.getElementsByName("score")[0].innerHTML = score.toFixed(2) + " rc";
}
document.getElementsByName("Click")[0].addEventListener('click', clickBtn);