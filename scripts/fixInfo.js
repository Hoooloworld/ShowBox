function fixInfo ()
{
	if (!document.getElementById || !document.getElementsByTagName) {return false;}

	var imgtTitle = ["Camping", "Ball", "Light House", "Pockmon Go", "Good Day"];

	var boxUl = document.getElementById("show-box");
	var divs = boxUl.getElementsByTagName("div");

	for (var i = 0, divsLength = divs.length; i < divsLength; i++)
	{
		var headTitle = divs[i].getElementsByTagName("h2");
		headTitle[0].innerHTML = imgtTitle[i];

		var paragraph = divs[i].getElementsByTagName("p");
		paragraph[0].innerHTML = "Thanks to Dribbble for providing these beautiful pictures."
	}
}

addLoadEvent(fixInfo);