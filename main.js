/**
 * 
 */
function addColors(xmlDataBase) {
	var elem = xmlDataBase.firstElementChild.firstElementChild.firstElementChild;

	while (elem != undefined) {
		$('<div class="color-entry">')
			.append('<p class="colorDesc">' + elem.nodeName + ' :</p>')
			.append('<div class="colorBox"></div>')
			.appendTo("#colors");

		elem = elem.nextElementSibling;
	}
	elem = xmlDataBase.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
	while (elem != undefined) {
		var boldBtn = $("<input type='button' value='B' class='boldBtn squareBtn' onclick='applyEffect(this)'>");
		var itaBtn = $("<input type='button' value='I' class='itaBtn squareBtn' onclick='applyEffect(this)'>");
		var underBtn = $("<input type='button' value='U' class='underBtn squareBtn' onclick='applyEffect(this)'>");
		var strikeBtn = $("<input type='button' value='S' class='strikeBtn squareBtn' onclick='applyEffect(this)'>");

		$('<div class="color-entry">')
			.append('<p class="colorDesc">' + elem.nodeName + ' :</p>')
			.append('<div class="colorBox"></div>')
			.append(boldBtn)
			.append(itaBtn)
			.append(underBtn)
			.append(strikeBtn)
			.appendTo("#colors");

		elem = elem.nextElementSibling;
	}

	setColorPickers();

	initColors();
}

var time = 500;
var movCur = function cursor() {
	$(".cursor").html("");
	setTimeout(function() {
		$(".cursor").html("|");
		setTimeout(cursor, time);
	}, time);
};

$(function() {
	console.log("Haha");

	$.ajax({
		type : 'POST',
		url : 'theme-base.xml',
		timeout : 3000,
		success : addColors,
		error : function() {
			console.log("cannot retrieve data");
		}
	});


	movCur();
});



function setColorPickers() {
	var colorBoxes = $(".colorBox");
	var colorBox;
	colorBoxes.ColorPicker({
		onShow : function(colpkr) {
			$(colpkr).fadeIn(500);
			colorBox = $(this);
			return false;
		},
		onHide : function(colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange : function(hsb, hex, rgb, colpkr) {
			colorBox.css('backgroundColor', '#' + hex);
			setBoxColor(colorBox, hex);
		},
		color : "#ffffff"
	});
	setColorFor("foreground", "#ebebeb");
	setColorFor("background", "#363636");
}

function setColorFor(opt, color) {
	var box = $(".colorDesc:contains('" + opt + "')").next();
	box.ColorPickerSetColor(color);
	box.css('backgroundColor', color);
	setBoxColor(box, color);
}

function getColorFor(param) {
	var color = $(".colorDesc:contains('" + param + "')").next();
	return color.css("backgroundColor");
}

function setBoxColor(colorBox, hex) {
	var e = colorBox.prev().html();
	e = e.substr(0, e.length - 2);

	if ((e == "background" || e == "foreground") && $(".immersiveMode").hasClass("selected")) {
		var foreground = getColorFor("foreground");
		var background = getColorFor("background");
		$("body").css("backgroundColor", background);
		$("body").css("color", foreground);
	}

	if (e.includes("selection")) {
		selectionColor();
	} else {
		if (e == "background"
			|| e == "currentLine") {
			$("." + e).css('backgroundColor', '#' + hex);
		} else {
			$("." + e).css('color', '#' + hex);
		}
	}
}

function selectionColor() {
	var foreground = getColorFor("selectionForeground");
	var background = getColorFor("selectionBackground");

	document.getElementById("selectColor").innerHTML = ".allPreview::selection{\
				color: " + foreground + ";\
				background: " + background + ";\
			}\
			.allPreview::-moz-selection {\
				color: " + foreground + ";\
				background: " + background + ";\
			}";
}

function immersiveMode(btn) {
	var foreground = getColorFor("foreground");
	var background = getColorFor("background");
	btn = $(btn);
	$("body").css("backgroundColor", btn.hasClass("selected") ? "" : background);
	$("body").css("color", btn.hasClass("selected") ? "" : foreground);

	$(".colorBox").css({
		borderColor : btn.hasClass("selected") ? "" : foreground
	});

	$(btn).toggleClass("selected");

}

function initColors() {
	$(".colorBox").each(function(i, element) {
		setBoxColor($(this), $(this).css("backgroundColor"));
	})
}

function applyEffect(btn) {
	var e = btn.parentElement.firstChild.innerHTML;
	e = e.substr(0, e.length - 2);
	e = $("." + e);
	e.toggleClass($(btn).attr('class').split(' ')[0]);
	$(btn).toggleClass("selected");

//	if ($("#" + e).css("text-decoration") == $(btn).css("text-decoration")) {
//		$("#" + e).css("text-decoration", "");
//	} else {
//		$("#" + e).css("text-decoration", $(btn).css("text-decoration"));
//	}
}