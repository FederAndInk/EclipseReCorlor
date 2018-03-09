/**
 * 
 */

function loadXMLFile(file) {
	var f = file.files[0];
	var fileReader = new FileReader();
	fileReader.onloadend = function(e) {
		var arr = e.target.result.substr(0, 4);
		var header = "";
		for (var i = 0; i < arr.length; i++) {
			header += arr.charCodeAt(i).toString(16);
		}
		console.log(header);

		if (header == "3c3f786d") {
			console.log("Loading : " + e.target.result);
			loadXML(e.target.result);
		} else {
			console.log("Error, this is not a xml !");
			alert("Error, " + e.target + " is not a xml !");
		}

	};
	fileReader.readAsText(f);
}

function loadXML(data) {
	var xml = $.parseXML(data);
	console.log(xml);
	if (xml && xml.firstElementChild.tagName == "colorTheme") {
		xml = xml.firstElementChild.firstElementChild;
		while (xml) {
			console.log("color : " + xml.tagName + "with : " + xml.attributes.getNamedItem("color").textContent);
			setColorFor(xml.tagName, xml.attributes.getNamedItem("color").textContent);
			xml = xml.nextElementSibling;
		}
	}
}