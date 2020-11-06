
function send_message(){

  var id_message = moment().format('h:mm:ss:DD:MM:YYYY');
  console
  var user = handle_string(document.getElementById('user').value);
  var email= handle_string(document.getElementById('email').value);
  var subject = handle_string(document.getElementById('subject').value);
  var text = handle_string(document.getElementById('message').value);


    xhr = new XMLHttpRequest();
    var url = "https://kvuquant.pythonanywhere.com/kmkMessage/"+id_message+"/"+user+"/"+email+"/"+subject+"/"+text;
    console.log(url);
    xhr.open("GET", url, false);
    xhr.send(null);
    console.log(xhr.statusText );
    if (xhr.statusText == "OK"){
      swal("Thank you !", "Your message has been received", "success");
    }
    else{
      swal("Oops!", "Your message could not be sent. Try again later..", "error");
    }
    return xhr.responseText;
}



function handle_string(string){
  if (string==""){
    string ="UnDefined";
  }
  return string.replace(" ","%20");
}


function info_message(){
  const el = document.createElement('div');
  el.innerHTML = " <a href='https://kahemka.github.io/article_3_api_static.html'>More info on how messaging is handle on this website.</a>";
  swal({
  title: "How does it work ?",
  content: el,
  });
}
