window.onload = function() {
	var index = 0;
	var timer = setInterval(run, 2000);

	var pics = $('pic').getElementsByTagName('li');
	var nums = $('num').getElementsByTagName('li');
	var len = pics.length;
	var carousel = $('carousel');
	var arrowLeft = $('arrow-left');
	var arrowRight = $('arrow-right');

	// 初始化
	for(var i=0; i<len; ++i) {
		nums[i].index = i;
		pics[i].style.zIndex = len - i;

	}


	// 函数定义
	function run() {
		var oldIndex = index;

		index++;
		if (index >= len) {
			index = 0;
		}

		changeStatus(oldIndex, index);
	}

	function changeStatus(oldIndex, curIndex) {
		pics[oldIndex].style.opacity = '0';
		nums[oldIndex].className = '';

		pics[curIndex].style.opacity = '1';
		nums[curIndex].className = 'active';

		index = curIndex;
	}


	// 元素绑定事件
	// nums元素悬浮绑定，鼠标停在页签上，停止计时器，手动切换
	for(var i=0; i<len; ++i) {
		nums[i].onmouseover = function() {
			clearInterval(timer);
			changeStatus(index, this.index);
		}
	}

	//单击左箭头
	arrowLeft.onclick = function() {
		var oldIndex = index;

		index--;
		if (index < 0) {
			index = len - 1;
		}

		changeStatus(oldIndex, index);
	}

	//单击右箭头
	arrowRight.onclick = function() {
		var oldIndex = index;

		index++;
		if (index >= len) {
			index = 0;
		}

		changeStatus(oldIndex, index);
	}

	//鼠标悬浮轮播图上，停止计时器
	carousel.onmouseover = function() {
		clearInterval(timer);
	}

	//鼠标离开轮播图上，开启计时器
	carousel.onmouseout = function() {
		timer = setInterval(run, 2000);
	}
	
}

function $(id) {
	return typeof id==='string' ? document.getElementById(id) : id;
}
