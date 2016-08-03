// 计时器的间隔
var interval = 8;

/*
 为链接添加鼠标悬浮事件
*/
function addMouseEvent ()
{
	if (!document.getElementById || !document.getElementsByTagName) { return false; }

	var boxUl = document.getElementById("show-box");
	// 获取所有链接
	var links = boxUl.getElementsByTagName("a");

	for (var i = 0, linksLength = links.length; i < linksLength; i++)
	{
		// 获取链接下的div
		var info = links[i].getElementsByTagName("div");
		// 设置链接的鼠标进入事件
		links[i].onmouseenter = (function (elem)
		{
			return function (event) 
			{
				// 获取鼠标进入的方向
				var direction = whichDirection(this, event);
				displayInfo(elem, direction);
			};
		})(info[0]);
		// 设置链接的鼠标离开事件
		links[i].onmouseleave = (function (elem)
		{
			return function (event) 
			{
				var direction = whichDirection(this, event);
				hideInfo(elem, direction);
			};
		})(info[0]);
	}
}
/*
 显示info
*/
function displayInfo (elem, direction)
{	
	if (!elem) { return false;}

	if (!elem.style.left) { elem.style.left = "100%"; }
	if (!elem.style.top) { elem.style.top = "-100%"; }

	switch (direction)
	{
		// 上
		case 0:
			elem.style.left = "0";
			elem.style.top = "-100%";
			verticalMove(elem, 0, interval);
			break;
		// 右
		case 1:
			elem.style.top = "0";
			elem.style.left = "100%";
			horizontalMove(elem, 0, interval);
			break;
		// 下
		case 2:
			elem.style.left = "0";
			elem.style.top = "100%";
			verticalMove(elem, 0, interval);
			break;
		// 左
		case 3:
			elem.style.top = "0";
			elem.style.left = "-100%";
			horizontalMove(elem, 0, interval);
			break;
	}

}
/*
 隐藏info
*/
function hideInfo (elem, direction)
{
	if (!elem) { return false; }

	switch(direction)
	{
		// 上
		case 0:
			verticalMove(elem, -100, interval);
			break;
		// 右
		case 1:
			horizontalMove(elem, 100, interval);
			break;
		// 下
		case 2:
			verticalMove(elem, 100, interval);
			break;
		// 左
		case 3:
			horizontalMove(elem, -100, interval);
			break;
	}

}
/*
 垂直移动
*/
function verticalMove (elem, final_y, interval)
{
	if (elem.movement) { clearTimeout(elem.movement); }
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	if (ypos === final_y) { return true; }

	if (ypos < final_y) {
		dist = Math.ceil((final_y - ypos) / 20);
		dist = getDistance(ypos, final_y);
		ypos += dist;
	}
	else {
		dist = getDistance(final_y, ypos);
		ypos -= dist;
	}

	elem.style.top = ypos + "%";
	elem.movement = setTimeout(function() {
		return verticalMove(elem, final_y, interval);
	}, interval);
}

/*
 水平移动
*/
function horizontalMove (elem, final_x, interval)
{
	if (elem.movement) { clearTimeout(elem.movement); }

	var xpos = parseInt(elem.style.left);
	var dist = 0;
	if (xpos === final_x) { return true; }

	if (xpos < final_x) {
		dist = getDistance(xpos, final_x);
		xpos += dist;
	}
	else {
		dist = getDistance(final_x, xpos);;
		xpos -= dist;
	}

	elem.style.left = xpos + "%";
	elem.movement = setTimeout(function() {
		return horizontalMove(elem, final_x, interval);
	}, interval);
}

/*
 判断鼠标进入元素的方向
 返回 0、1、2、3 分别代表着上、右、下、左
*/
function whichDirection (elem, event)
{
	// 获取元素的宽高
	var elemWidth = elem.clientWidth;
	var elemHeight = elem.clientHeight;
	// 将事件触发点转移为元素的中心点
	var x = event.pageX - elem.offsetLeft - (elemWidth / 2); 
	var y = event.pageY - elem.offsetTop - (elemHeight / 2); 
	// 计算方向
	var direction = Math.round(((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;

	return direction;
}

/*
 获取 info 移动的间隔
*/
function getDistance (start, end)
{
	return Math.ceil((end - start) / 15);
}

addLoadEvent(addMouseEvent);