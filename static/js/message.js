function send_message(){

  var id_message = moment().format('MMMM Do YYYY, h:mm:ss a');
  var user = document.getElementById('user').value;
  var email= document.getElementById('email').value;
  var subject =document.getElementById('subject').value;
  var text = document.getElementById('message').value;


    xhr = new XMLHttpRequest();
    var url = "https://www.kvuquant.pythonanywhere.com/testjson/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json)
        }
    }
    var data = JSON.stringify({"id_message":id_message,"user":user, "email":email,"subject":subject,"text":text});
    xhr.send(data);
}
