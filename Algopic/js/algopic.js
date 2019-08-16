var openFile = function(file) {
  var input = file.target;

  var reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    var output = document.getElementById('output');
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
};



var device = "Unknown";


function getPlatformType() {
  var string_detection = document.getElementById('device_detection');

	if(navigator.userAgent.match(/mobile/i)) {
		string_detection.innerHTML="You are using a mobile";
	} else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
		string_detection.innerHTML="You are using a tablet";
	} else {
		string_detection.innerHTML="You are using a desktop";
	}
}

getPlatformType();
