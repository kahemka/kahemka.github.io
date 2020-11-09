var timestamp = moment();

function get_info(){
  var basic = {};
  basic["delta_time"] = (moment()-timestamp)/1000;
  basic["date"] = moment().format('YYYY-MM-DD H:mm:ss');
  basic["device"] = get_device().slice(0,255);
  basic["browser"] = get_browser().slice(0,40);
  analytics_info = Object.assign({},basic,get_location());
return analytics_info;
}


function get_location(){
  var b = {};

  try{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://ipapi.co/json/', false);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var data= JSON.parse(xmlhttp.responseText);
                b["ip"] = data["ip"].slice(0,55);
                b["postal"] = data["postal"].slice(0,15);
                b["tz"] = data["timezone"].slice(0,30);
                b["continent"] = data["continent_code"].slice(0,5);
                b["country"] = data["country_name"].slice(0,50);
                b["region"] = data["region"].slice(0,50);
                b["city"] = data["city"].slice(0,50);
                b["latitude"] = parseFloat(data["latitude"]);
                b["longitude"] = parseFloat(data["longitude"]);
             }
        }
    };
    xmlhttp.send(null);

  }
  catch (error){
    b["ip"] ="error";
  }
  return b;
}

function get_device(){
  return window.navigator.userAgent;
}

function get_browser() {
     if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 )
    {
        return 'Opera';
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        return 'Chrome';
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        return 'Safari';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 )
    {
         return 'Firefox';
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
      return 'IE';
    }
    else
    {
       return 'unknown';
    }
    }
