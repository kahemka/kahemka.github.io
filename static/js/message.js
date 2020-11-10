
var url_api_message = "https://kmkapi.pythonanywhere.com/API/Messages/KMK";


function format_string(string){
  if (string==""){
    string ="UnDefined";
  };
  return string;//encodeURIComponent(string);
}


function send_message(){
  document.getElementById("button").value = "Sending...wait";
  var username = format_string(document.getElementById('user').value);
  var email= format_string(document.getElementById('email').value);
  var subject = format_string(document.getElementById('subject').value);
  var message = format_string(document.getElementById('message').value);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function() {
    if (xhr.readyState === 4){   //if complete
        if(xhr.status === 200){  //check if "OK" (200)
            //success
        } else {
            swal({title: "Oops!",
        text: "Your message could not be sent. Corporate proxy might be the issue !",
        type: "success"}).then(function(){
           document.getElementById("form_contact").reset();
           }
         );
        }
      }
  }


  xhr.open("POST", url_api_message, false);
    xhr.setRequestHeader('Content-Type', 'text/plain');
  var message = {
      username: username,
      email: email,
      subject: subject,
      message: message,
      delta_time : (moment()-timestamp)/1000
  };
  var info = get_info();
  var informations = Object.assign({}, message, info);

  xhr.send(JSON.stringify(informations));

  xhr.onload = function() {
    var data = JSON.parse(this.responseText);
    if (data['message'] == "Received")
    {
      swal({title: "Thank you !",
            text: "Your message has been received",
            type:"success"}).then(function()
            {
              document.getElementById("form_contact").reset();
            }
          );
    }
    else
    {
      console.log(data['message']);
      swal({title: "Oops!",
            text: "Your message could not be sent. Try again later..",
            type: "success"}).then(function(){
               document.getElementById("form_contact").reset();
               }
             );
    }
  }



  document.getElementById("button").value = "Send message";
}




function info_message(){
  const el = document.createElement('div');
  el.innerHTML = " <a href='https://kahemka.github.io/article_3_api_static.html'>More info on how messaging is handle on this website.</a>";
  swal({
  title: "How does it work ?",
  content: el,
  });
}

document.getElementById("button").onclick = send_message;
document.getElementById("button").disabled = false;
document.getElementById("button").value = "Send message";
