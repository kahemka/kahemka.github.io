
function send_message(){

  var id_message = moment().format('h:mm:ss:DD:MM:YYYY');
  console
  var user = document.getElementById('user').value;
  var email= document.getElementById('email').value;
  var subject =document.getElementById('subject').value;
  var text = document.getElementById('message').value;


    xhr = new XMLHttpRequest();
    var url = "https://kvuquant.pythonanywhere.com/kmkMessage/"+id_message+"/"+user+"/"+email+"/"+subject+"/"+text;
    console.log(url);
    xhr.open("GET", url, false);
    console.log(xhr.status);
    console.log(xhr.statusText);
    return xhr.responseText;
}
