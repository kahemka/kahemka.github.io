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
    xmlhttp.open('GET', 'http://www.geoplugin.net/json.gp?jsoncallback', false);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var data= JSON.parse(xmlhttp.responseText);
                b["ip"] = data["geoplugin_request"].slice(0,55);
                b["status"] = data["geoplugin_status"];
                b["delay"] = parseInt(data["geoplugin_delay"].replace("ms",""));
                b["tz"] = data["geoplugin_timezone"].slice(0,30);
                b["continent"] = data["geoplugin_continentName"].slice(0,15);
                b["country"] = data["geoplugin_countryName"].slice(0,50);
                b["region"] = data["geoplugin_region"].slice(0,50);
                b["region2"] = data["geoplugin_regionName"].slice(0,50);
                b["city"] = data["geoplugin_city"].slice(0,50);
                b["latitude"] = parseFloat(data["geoplugin_latitude"]);
                b["longitude"] = parseFloat(data["geoplugin_longitude"]);
             }
        }
    };
    xmlhttp.send(null);

  }
  catch (error){
    b["IP"] ="error"
    b["status"] = 0;
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
