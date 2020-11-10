var url_api_traffic = "https://kmkapi.pythonanywhere.com/API/Traffic/KMK";



function basic_traffic(){
  var traffic = get_info()
  traffic["page"]=window.location.href;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url_api_traffic, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');

   xhr.send(JSON.stringify(traffic));
  xhr.onload = function() {
    var data = JSON.parse(this.responseText);
    console.log(data);
  }

  }

basic_traffic();
