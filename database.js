/**
 * 
 */

function loadXMLFile(file) {
	var f = file.files[0];
	var fileReader = new FileReader();
	fileReader.onloadend = function(e) {
		var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
		var header = "";
		for (var i = 0; i < arr.length; i++) {
			header += arr[i].toString(16);
		}
		console.log(e);
		console.log(header);

		if (header == "3c3f786d") {
			console.log("Loading");
		} else {
			console.log("Error, this is not a xml !");
			alert("Error, " + e.target + " is not a xml !");
		}

	};
	fileReader.readAsArrayBuffer(f);
}