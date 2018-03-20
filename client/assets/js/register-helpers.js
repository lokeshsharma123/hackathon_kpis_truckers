
var speed = '';
var  odometer = '';
var engineHrs = '';
var time ='';
var vin = '';
var rpm = '';
var speed2 = '';
var isBluthooothConnected = true;
var decrypteddata;
var timeint=0;
var timeinte=0;
var refreshInrevalId ;
var macaddress = "";
var deviceName = "OBDII";
var isFirst = true;
var protocolString = "";
var isProtocolSet = -1;
var counter = 0;
var decryptType = "speed2";
var app ;
var CityLocationjson;				

Handlebars.registerHelper('equals', function(v1, v2) {
  if(v1 === v2) 
    return true;
  else
  return false;
});
Handlebars.registerHelper('getvehicledefect', function(id) {
var arr=VehicleDefectsList.find().fetch();
if(arr.length)
{
var res= _.findWhere(arr, {_id: id});
return res.defect
}
});
Handlebars.registerHelper('gettrailerdefect', function(id) {
var arr=TrailerDefectsList.find().fetch();
if(arr.length)
{
var res= _.findWhere(arr, {_id: id});
return res.defect
}
});
 
Handlebars.registerHelper('getStateCode', function(s) {
return s?s.split("(")[0]:''
})
Handlebars.registerHelper('getCompanyTimeZone', function(t) {
var obj=HTTZList.findOne({_id:t})
if(!obj)
return "";
else
return obj.timezone
});
Handlebars.registerHelper('convertTripDate', function(d) {
return d?moment(new Date(d)).format("DD-MMM-YYYY"):'';
})
Handlebars.registerHelper('concat', function(a,b) {
return a+b
})
Handlebars.registerHelper('isBleConnecte', function() {
     return isBluthooothConnected;
 })

 Handlebars.registerHelper('getCurrentLocation', function() {
     getLocation();
     return address;
 })
 
 Handlebars.registerHelper('callLocation', function() {
     getLocation();
 })
 
  Handlebars.registerHelper('getLatitude', function() {
     return _lat;
 })
  Handlebars.registerHelper('getLongitude', function() {
     return _lon;
 })


 Handlebars.registerHelper('getLocationString', function() {
    //alert(Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get()));
     return  Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get());
 })
 
  Handlebars.registerHelper('getBluetoothDATA', function() {
    Meteor.call("callBluetoothApi",function(err,res){
	  console.log(res.data);
	  
	  
	  speed = res.data.responsePacket.bluetoothDetail.speed;
      odometer = res.data.responsePacket.bluetoothDetail.odometer;
      vin = res.data.responsePacket.bluetoothDetail.vin;
      engineHrs = res.data.responsePacket.bluetoothDetail.engineHours;
	})
 })
 
 
 
  Handlebars.registerHelper('getMinimumDistance', function(lat1,lon1) {
         //    alert(CityLocation.find({}).count())
        if(lat1 == 0 || lon1 == 0){
           return "";
       }
       
      if(!CityLocationjson){
  CityLocationjson = require('./city_location.json');
									  
									  
									
	   
											
												  
	
   
      }
		   
		 
        return getMinDistance(CityLocationjson,lat1,lon1); 
        
 })
 
 function getMinDistance(json,lat1,lon1){
      var min =0;
     var city = '';
     var index = 0;
     for(var i = 0;i<json.length;i++){
        
         var dif = Math.sqrt(Math.pow((json[i].lat-lat1), 2)+Math.pow((json[i].lon-lon1), 2));
          if(i==0){
            min =  dif;
         }
         if(min>=dif){
            
             min = dif;
            
             index = i;
         }
     }
     return direction(json[index].lat,json[index].lon,lat1,lon1) +" from "+json[index].city+"("+json[index].code+")"
     //alert(direction(json[index].lat,json[index].lon,lat1,lon1) +" from "+json[index].city+"("+json[index].state+")");
 }
 
 function direction(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        dist = Math.round(dist * 1.609344*100)/100;   
    var bearing=getBearing(lat1, lon1, lat2, lon2);
    bearing = ((bearing%360)+360)%360; // normalise to range 0..360°
precision=3;
    var cardinals = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW' ];
    var n = 4 * Math.pow(2, precision-1); // no of compass points at req’d precision (1=>4, 2=>8, 3=>16)
    var cardinal = cardinals[Math.round(bearing*n/360)%n * 16/n];

    
        return dist+" "+cardinal;
}

function radians(n) {
  return n * (Math.PI / 180);
}
function degrees(n) {
  return n * (180 / Math.PI);
}

function getBearing(startLat,startLong,endLat,endLong){
  startLat = radians(startLat);
  startLong = radians(startLong);
  endLat = radians(endLat);
  endLong = radians(endLong);

  var dLong = endLong - startLong;

  var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
  if (Math.abs(dLong) > Math.PI){
    if (dLong > 0.0)
       dLong = -(2.0 * Math.PI - dLong);
    else
       dLong = (2.0 * Math.PI + dLong);
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}
 
////for address and location
Template.location.helpers({
  
  lat: _lat.get(),
  lon: _lon.get()
  
});

import { Tracker } from 'meteor/tracker'


 var zeitInterval;
_lat = {
  current: 0,
  dep: new Deps.Dependency,
  get: function(){
    this.dep.depend();

//zeitInterval = Meteor.setInterval(getLocation, 30000000);
    if(this.current === 0){
      getLocation();
    }

    return this.current;
  },
  set: function(value){
    this.current = value;
    this.dep.changed();
    //Deps.flush();
    return this.current;
  }
};

_lon = {
  current: 0,
  dep: new Deps.Dependency,
  get: function(){
    this.dep.depend();

    if(this.current === 0){
      getLocation();
    }

    return this.current;
  },
  set: function(value){
    this.current = value;
    this.dep.changed();
    //Deps.flush();
    return this.current;
  }
};


function getLocation(){
  if (navigator.geolocation)
  {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
  
  
  }
  else{
    console.log("Geolocation is not supported by this browser.");
  }
}



var address = "";
function showPosition(position)
{
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);
  _lat.set(position.coords.latitude);
  _lon.set(position.coords.longitude);
  
 address =  Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get());
 
}
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

Handlebars.registerHelper('addCommonEvent', function(type,code,recordOrigin,comment) {
  getLocation();
   var event ={};
   
   event.date = new Date();
  
   event.seqId = getLastSeqId();
   event.time = getCurrentTimeInFormat();
   event.start_time = Number(getCurrentTimeValue());
  if(Blaze._globalHelpers.isBleConnecte()){
    

    Meteor.setTimeout(function(){event.vehicleMiles = Blaze._globalHelpers.getOdometer()},4000);
   
   Meteor.setTimeout(function(){event.vin = Blaze._globalHelpers.getVin()},8000);
  
   Meteor.setTimeout(function(){
           event.engineHour = Blaze._globalHelpers.getEngineHour();
       },12000);   
    }


    event.eventType = type;
	event.eventCode = code;
   event.eldId = 1;
    event.recordStatus = 1;
        event.recordOrigin = recordOrigin;
    event.vehicleStatus = 1;
     event.latitude = _lat.current;
	event.longitude = _lon.current;
    event.companyId = Session.get("company_id_to_subscribe");
    event.location = Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get());
    event.comment = comment;
    event.userId = Meteor.userId();
   Events.insert(event);
 
})

//------suresh for app login ------
Handlebars.registerHelper('appLoginEvent', function() {
    Blaze._globalHelpers.addCommonEvent(5,1,2,"App LogIn");
})

Handlebars.registerHelper('appLogoutEvent', function() {
     Blaze._globalHelpers.addCommonEvent(5,2,2,"App LogOut");
})

// -------- Lokesh -----------

Handlebars.registerHelper('loginEvent', function() {
    Blaze._globalHelpers.addCommonEvent(5,1,1,"LogIn");
})

Handlebars.registerHelper('logoutEvent', function() {
 Blaze._globalHelpers.addCommonEvent(5,2,1,"LogIn");
    
})

Handlebars.registerHelper('insertMalfunctionStatus', function(d) {
   var event ={};
   
   event.date = new Date();
   event.seqId = getLastSeqId();
   event.start_time = Number(getCurrentTimeValue());
   if(Blaze._globalHelpers.isBleConnecte()){
    event.vehicleMiles = Meteor.setTimeout(function(){Blaze._globalHelpers.getBLEdata("00FEC1 4", "odometer");},4000);
    Meteor.setTimeout(function(){
        event.engineHour = Blaze._globalHelpers.getBLEdata("00FEE5 4", "engine hours");
        },12000);
    }
   event.malfunctionCode = d;
   event.eventType = 7;
   event.eventCode = 1;
    event.username = Users.findOne().profile.username;
    event.usdot_no = CompanyDriverList.findOne().company_profile.usdot_no;
   event.userId = Meteor.userId();
   Events.insert(event);
   
   
    console.log(Events.find({}).fetch());
  
   
})

Handlebars.registerHelper('insertMalfunctionEventStatus', function(d) {
   var event ={};
   
   event.date = new Date();
   
   event.seqId = getLastSeqId();
   event.time = getCurrentTimeValue();
  if(Blaze._globalHelpers.isBleConnecte()){
    event.vehicleMiles = Meteor.setTimeout(function(){Blaze._globalHelpers.getBLEdata("00FEC1 4", "odometer");},4000);
    Meteor.setTimeout(function(){
        event.engineHour = Blaze._globalHelpers.getBLEdata("00FEE5 4", "engine hours");
        },12000);
    }
   event.malfunctionCode = d;
   event.eventType = 7;
   event.eventCode = 3;
  event.start_time = Number(getCurrentTimeValue());
  //event.username = Users.findOne().profile.username;
  //  event.usdot_no = CompanyDriverList.findOne().company_profile.usdot_no;
//event.userId = Meteor.userId();
   Events.insert(event);
   
   
    console.log(Events.find({}).fetch());
  
   
})
Handlebars.registerHelper('insertBTLog', function(macaddress,datastring,decrypteddata,datatype) {
   var btLog ={};
   
   btLog.date = getTodayDate();
   btLog.macaddress = macaddress;
   btLog.datastring = datastring;
   btLog.time = getCurrentTimeValue();
   btLog.decrypteddata = decrypteddata;
   btLog.datatype = datatype;
  
  // btLog.username = Users.findOne().profile.username;

   //console.log(CompanyDriverList.findOne().company_profile.usdot_no);
   // btLog.usdot_no = CompanyDriverList.findOne().company_profile.usdot_no;
  

   BTlog.insert(btLog);
   
   
   // console.log(BTlog.find({}).fetch());
  
   
})
/***Lokesh**/
/*
var speedCode =  "00FEF1 4";
var milesDrivenCode = "00feb 1"; 
var odometerCode = "00FEC1 4" ;
var engineTimeCode = "00feb 4"; 
var vinCode =  "00FEEC";
var engineHourCode = "00FEE5 4"

console.log("SPEED -J1708---"+getDecTypeJ1708("54 1  90 54 B4  >"));
console.log("ENGINE LOAD -J1708---"+getDecTypeJ1708("5c 1  90 5C B4  >"));
console.log("ODOMETER -J1708---"+getDecTypeJ1708("f5  80 F5 B2 01 B2 01  >"));
console.log("ENGINE-HOURS -J1708---"+getDecTypeJ1708("f7 1  80 F7 B2 01 B2 01  >"));
console.log("RPM -J1708---"+getDecTypeJ1708("be 1  80 BE B2 01  >"));

speed = Blaze._globalHelpers.getBLEdata(speedCode, "speed");
    Meteor.setTimeout(function(){vehicle_miles = Blaze._globalHelpers.getBLEdata(odometerCode, "odometer");},4000);
   
   Meteor.setTimeout(function(){cmv_vin = Blaze._globalHelpers.getBLEdata(vinCode, "vin");},8000);
  
   Meteor.setTimeout(function(){
           engine_hours = Blaze._globalHelpers.getBLEdata(engineHourCode, "engine hours");*/
Handlebars.registerHelper('getSpeed', function() {
	return speed;
	if(deviceName == ''){
		return '';
	}
	
	if(deviceName == 'OBDII'){
		return Blaze._globalHelpers.getBLEdata("00FEF1 4", "speed");
	}else{
		return Blaze._globalHelpers.getBLEdata("54 1", "speed");
	}
     
})

Handlebars.registerHelper('getSpeed2', function() {
  
  if(deviceName == ''){
    return '';
  }
  
  if(deviceName == 'OBDII'){
    return Blaze._globalHelpers.getBLEdata("00FE6C 4", "speed2");
  }else{
    return Blaze._globalHelpers.getBLEdata("54 1", "speed");
  }
     
})

Handlebars.registerHelper('getRpm', function() {
  
  if(deviceName == ''){
    return '';
  }
  
  if(deviceName == 'OBDII'){
    return Blaze._globalHelpers.getBLEdata("00F004 1", "rpm");
  }else{
    return Blaze._globalHelpers.getBLEdata("be 1", "rpm");
  }
     
})

Handlebars.registerHelper('getVin', function() {
	return vin;
	if(deviceName == ''){
		return '';
	}
	
	if(deviceName == 'OBDII'){
		return Blaze._globalHelpers.getBLEdata("00FEEC", "vin");
	}else{
		return Blaze._globalHelpers.getBLEdata("ED 1", "vin");                                            
	}
     
})

Handlebars.registerHelper('getOdometer', function() {
	return odometer;
	if(deviceName == ''){
		return '';
	}
	
	if(deviceName == 'OBDII'){
		return Blaze._globalHelpers.getBLEdata("00FEC1 4", "odometer");
	}else{
		return Blaze._globalHelpers.getBLEdata("f5 1", "odometer");
	}
     
})

Handlebars.registerHelper('getEngineHour', function() {
	return engineHrs;
	if(deviceName == ''){
		return '';
	}
	
	if(deviceName == 'OBDII'){
		return Blaze._globalHelpers.getBLEdata("00FEE5 4", "engine hours");
	}else{
		return Blaze._globalHelpers.getBLEdata("f7 1", "engine hours");
	}
     
})

/***Lokesh**/
//getBLEdata
Handlebars.registerHelper('getBLEdata', function(command, decryptype) {
  console.log("ENTERED");
  decryptType = decryptype;
  var ap = Blaze._globalHelpers.getBleApp();
  decrypteddata = '';
  

  if(decryptype === 'speed'){
    ap.sendData(command);
    return speed;
     // return 10;
  }else if(decryptype === 'odometer'){
    ap.sendData(command);
    return odometer;
    //  return 50000;
  }else if(decryptype==='vin'){
    ap.sendData(command);
    return vin;
  // return "1XKP555";

  }else if(decryptype==='speed2'){
    ap.sendData(command);
   return speed2;
  // return 11;

  }else if(decryptType==='engine hours'){
    ap.sendData(command);
   return engineHrs;

  }else if(decryptType==='rpm'){
    ap.sendData(command);
   return rpm;
     //   return 999;
  }
  

   
   
})

function sleep(miliseconds) {
   var currentTime = localDateTime(Session.get("companyLocationOffset")).getTime();

   while (currentTime + miliseconds >= localDateTime(Session.get("companyLocationOffset")).getTime()) {
   }
}



// Get Last Seq Id 
function getLastSeqId(){
 var lastrecord = Events.find({},{sort: {seqId: 1}}).fetch();
    // console.log(Events.find({},{sort: {seqId: 1}}).fetch());
  //alert(lastrecord.length);
    var lastId = 0;
    if (lastrecord.length > 0) {
        lastId = lastrecord[lastrecord.length - 1].seqId + 1;
    }else{
    lastId = 1;
  }

    return lastId;
}

//Get Current Date and time
function getTodayDate() {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
var today2;
if(Session.get("companyLocationOffset") && Session.get("companyLocationOffset") != ''){
      console.log('OFFSETTTTTTTTTTTTTT--'+Session.get("companyLocationOffset"));
        today2 = localDateTime(Session.get("companyLocationOffset"));
    }else{
      console.log('OFFSETTTTTTTTTTTTTT--1--'+macaddress);
     var macCom = CompanyMacAddress.find({MacAddress:macaddress}).fetch();
     console.log('OFFSETTTTTTTTTTTTTT-2-'+macCom[0].CompanyId);
     var comtimeZone = CompanyTimeZone.find({companyId : macCom[0].CompanyId}).fetch();
     console.log(CompanyTimeZone.find({}).fetch());
     console.log(HTTZList.find({}).fetch());
     console.log('OFFSETTTTTTTTTTTTTT-3-'+comtimeZone[0]);
     var utcOffset = UTCoffset.find({locationID : comtimeZone[0].timeZone}).fetch();
     console.log('OFFSETTTTTTTTTTTTTT-4-'+utcOffset[0].utcOffset);
     today2 = localDateTime(utcOffset[0].utcOffset);
    }

     
    var _today = today2.toLocaleDateString("en-US", dateFormat);
    return _today;
}


function getCurrentTimeValue() {
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    if(Session.get("companyLocationOffset") && Session.get("companyLocationOffset") != ''){
      console.log('OFFSETTTTTTTTTTTTTT--'+Session.get("companyLocationOffset"));
        d = localDateTime(Session.get("companyLocationOffset"));
    }else{
      console.log('OFFSETTTTTTTTTTTTTT--1--'+macaddress);
     var macCom = CompanyMacAddress.find({MacAddress:macaddress}).fetch();
     console.log('OFFSETTTTTTTTTTTTTT-2-'+macCom[0].CompanyId);
     var comtimeZone = CompanyTimeZone.find({companyId : macCom[0].CompanyId}).fetch();
     console.log(CompanyTimeZone.find({}).fetch());
     console.log(HTTZList.find({}).fetch());
     console.log('OFFSETTTTTTTTTTTTTT-3-'+comtimeZone[0]);
     var utcOffset = UTCoffset.find({locationID : comtimeZone[0].timeZone}).fetch();
     console.log('OFFSETTTTTTTTTTTTTT-4-'+utcOffset[0].utcOffset);
     d = localDateTime(utcOffset[0].utcOffset);
    }
    var t = d.getTime();
    var x = d.getHours();
    var y = d.getMinutes();
   
    //console.log("prevoius" + y);
    y = parseInt(y / 0.6);
    while ((y + '').length < 2) {
        y = '0' + y;
    }
    //console.log("after" + y);

    var current_value = x + '.' + y;
    return current_value;
}
function getCurrentTimeInFormat(){
    var d;
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    if(Session.get("companyLocationOffset") && Session.get("companyLocationOffset") != ''){
        d = localDateTime(Session.get("companyLocationOffset"));
    }else{
     var macCom = CompanyMacAddress.find({MacAddress:macaddress}).fetch();
     var comtimeZone = CompanyTimeZone.find({companyId : macCom[0].CompanyId}).fetch();
     var utcOffset = UTCoffset.find({locationID : comtimeZone[0].timeZone}).fetch();
     d = localDateTime(utcOffset[0].utcOffset);
    }
   var t = d.getTime();
    var x = d.getHours();
    var y = d.getMinutes();
  var z = d.getSeconds();
  var time = x+":"+y+":"+z;
  return time;
}

Handlebars.registerHelper('stopTimer', function() {
  //alert("dddd");
      //clearInterval(refreshInrevalId);
      // 00FEC1 4 6 0FEC1 17 6D A2 2B 0A FF FF FF FF   >
// 00FEEC 011  6 0EBFF 00 01 34 56 34 4E 43 39 45  6 0EBFF 00 02 4A 2E 20 4E 35 34 33  6 0EBFF 00 03 36 34 36 FF FF FF FF   >
//3456344E4339454A2E204E353433363436FF
/*54 1 90 54 B4  >
5C 1 90 5C B4  >
F5 80 F5 B2 01 B2 01  >
F7 1 80 F7 B2 01 B2 01  >
BE 1 80 BE B2 01  >*/
/*console.log("SPEED -J1708---"+getDecTypeJ1708("54 1  90 54 B4  >"));
console.log("ENGINE LOAD -J1708---"+getDecTypeJ1708("5c 1  90 5C B4  >"));
console.log("ODOMETER -J1708---"+getDecTypeJ1708("f5  80 F5 B2 01 B2 01  >"));
console.log("ENGINE-HOURS -J1708---"+getDecTypeJ1708("f7 1  80 F7 B2 01 B2 01  >"));
console.log("RPM -J1708---"+getDecTypeJ1708("be 1  80 BE B2 01  >"));

console.log("SPEED -J1708---"+extractJ1708DataString("54 1  90 54 B4  >",'speed'));
console.log("ENGINE LOAD -J1708---"+extractJ1708DataString("5c 1  90 5C B4  >",'speed'));
console.log("ODOMETER -J1708---"+extractJ1708DataString("F5  80 F5 B2 01 B2 01  >",'odometer'));
console.log("ENGINE-HOURS -J1708---"+extractJ1708DataString("f7 1  80 F7 B2 01 B2 01  >",'engine hours'));
console.log("RPM -J1708---"+extractJ1708DataString("be 1  80 BE B2 01  >",'rpm'));
      console.log("ODOMETER -17---"+extractDataString("00FEC1 4 6 0FEC1 17 6D A2 2B 0A FF FF FF FF   >","FEC1"));
      var st = extractDataString("00FEC1 4 6 0FEC1 17 6D A2 2B 0A FF FF FF FF   >","FEC1");
      console.log("ODOMETER_DECRYPt-17---"+decrypt(st,"odometer",'J1939'));
      console.log("VIN -011-015---"+decrypt("00FEEC 011  6 0EBFF 00 01 34 56 34 4E 43 39 45  6 0EBFF 00 02 4A 2E 20 4E 35 34 33  6 0EBFF 00 03 36 34 36 FF FF FF FF   >", "vin", "J1939"));*/
  })

Handlebars.registerHelper('getBleApp', function() {
  // if(app){
  //   return app;
  // }
   app = {
          initialize: function() {
            console.log("bletooth---");
              this.bindEvents();
              //this.showMainPage();
          },
          bindEvents: function() {
            app.onDeviceReady();
            app.refreshDeviceList();
              var TOUCH_START = 'touchstart';
              if (window.navigator.msPointerEnabled) { // windows phone
                  TOUCH_START = 'MSPointerDown';
              }
              //document.addEventListener('deviceready', this.onDeviceReady, false);
              //refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
              //sendButton.addEventListener(TOUCH_START, this.sendData, false);
              //disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
              //deviceList.addEventListener('touchstart', this.connect, false);
              //deviceListUnPair.addEventListener('touchstart', this.connect, false);
          },
          onDeviceReady: function() {
              app.refreshDeviceList();
          },
          refreshDeviceList: function() {
              bluetoothSerial.list(app.onDeviceList, app.onError);
              //bluetoothSerial.discoverUnpaired(app.onDeviceListUnPair, app.onError);
          },
          onDeviceList: function(devices) {
              var option;
console.log("device execute");
              // remove existing devices
              //deviceList.innerHTML = "";
              //app.setStatus("");
              
              //deviceList.remove();
              var devList = [];
              devices.forEach(function(device) {

                  //var listItem = document.createElement('li'),
                    //  html = '<b>' + device.name + '</b><br/>' + device.id;

                 // listItem.innerHTML = html;

                  var singleObj = {}
              singleObj['name'] = device.name;

                  console.log(device);

                  if (cordova.platformId === 'windowsphone') {
                    // This is a temporary hack until I get the list tap working
                   // var button = document.createElement('button');
                    //button.innerHTML = "Connect";
                    //button.addEventListener('click', app.connect, false);
                    //button.dataset = {};
                    //button.dataset.deviceId = device.id;
                    //listItem.appendChild(button);
                  } else {
                    //listItem.dataset.deviceId = device.id;
                    singleObj['id'] = device.id;
                    if(device.name === 'OBDII' || device.name === 'Blue Epsilon'){
                      deviceName = device.name;
                      devList.push(singleObj);
                     }
                  }
                  //deviceList.appendChild(listItem);
                  
              
                  //devList.push(singleObj);
              });

              console.log("deviceList");
              console.log(devList);

              if (devices.length === 0) {

                  option = document.createElement('option');
                  option.innerHTML = "No Bluetooth Devices";
                  deviceList.appendChild(option);

                  if (cordova.platformId === "ios") { // BLE
                      app.setStatus("No Bluetooth Peripherals Discovered.");
                  } else { // Android or Windows Phone
                      app.setStatus("Please Pair a Bluetooth Device.");
                  }

              } else {
                  app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
                  
                  //console.log(Object.keys(devList[0])[1]);
                  console.log(devList[0]['id']);


                  app.connect(devList[0]['id']);
                  refreshInrevalId = setInterval(function(){app.connect(devList[0]['id']); }, 30000);
                 
                  //console.log(refreshInrevalId);
              }
          },
          onDeviceListUnPair: function(devices) {
                  var option;
console.log("UnPair execute");
                  // remove existing devices
                  //deviceListUnPair.innerHTML = "";
                  app.setStatus("");

                  devices.forEach(function(device) {

                      var listItem = document.createElement('li'),
                          html = '<b>' + device.name + '</b><br/>' + device.id;

                      listItem.innerHTML = html;

                      console.log(device);

                      if (cordova.platformId === 'windowsphone') {
                        // This is a temporary hack until I get the list tap working
                        var button = document.createElement('button');
                        button.innerHTML = "Connect";
                        button.addEventListener('click', app.connect, false);
                        button.dataset = {};
                        button.dataset.deviceId = device.id;
                        listItem.appendChild(button);
                      } else {
                        listItem.dataset.deviceId = device.id;
                      }
                      deviceListUnPair.appendChild(listItem);
                  });

console.log("UnPair");
console.log(deviceListUnPair);


                  if (devices.length === 0) {

                      option = document.createElement('option');
                      option.innerHTML = "No Bluetooth Devices";
                      deviceListUnPair.appendChild(option);

                      if (cordova.platformId === "ios") { // BLE
                          app.setStatus("No Bluetooth Peripherals Discovered.");
                      } else { // Android or Windows Phone
                          app.setStatus("Please Pair a Bluetooth Device.");
                      }

                  } else {
                      app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
                      
                  }

              },
          bin2string: function (array){
            var result = "";
            for(var i = 0; i < array.length; ++i){
              result+= (String.fromCharCode(array[i]));
            }
            return result;
          },

          onConnect: function(data) {

//onConnect subscribes to data and sends one command. Connect ensures connection before sending/receiving
var                       completestring
= "";
bluetoothSerial.subscribeRawData(function (data) {
                    var bytes = new Uint8Array(data);
                   // console.log("AAAA");
var result = "";
            for(var i = 0; i < bytes.length; ++i){
              result+= (String.fromCharCode(bytes[i]));
            }
                    app.onData(result);

                      completestring = completestring +result;
                                         // console.log("Raw data");
                    //console.log(data);
                   // console.log(bytes);
                   // console.log(result);
                   // console.log("complete"+completestring);
                   var count = (completestring.match(/>/g) || []).length;
                   if(count == 1){
              if(completestring.endsWith(">")){
                      if(isProtocolSet == 0){
                        
                        if(completestring.includes("CAN ERROR")){
                          //isProtocolSet = true;
                          
                          app.sendData("ATPB 4201");
                            Meteor.setTimeout(function(){app.sendData("ATSPB");},5000);
                            Meteor.setTimeout(function(){app.sendData("00F004 1");
                              isProtocolSet = 1;},10000);
                        }else{
                          isFirst = false;
                          isProtocolSet = 3;
                          protocolString = "J1939";
                        }
                      }else if(isProtocolSet == 1){

                        if(completestring.includes("CAN ERROR")){
                          //isProtocolSet = true;
                          isProtocolSet = 2;
                        //app.sendData("ATZ");
                        //Meteor.setTimeout(function(){app.sendData("ATD");},5000);
                          Meteor.setTimeout(function(){app.sendData("ATSPA");},5000);
                          Meteor.setTimeout(function(){app.sendData("00F004 1");},10000);
                        }else{
                          isFirst = false;
                          isProtocolSet = 3;
                          protocolString = "J1939";
                        }
                      }else if(isProtocolSet == 2){

                        if(completestring.includes("CAN ERROR")){
                          //isProtocolSet = true;
                          isProtocolSet = 0;
                        //app.sendData("ATZ");
                        //Meteor.setTimeout(function(){app.sendData("ATD");},5000);
                          Meteor.setTimeout(function(){app.sendData("ATSPA");},5000);
                          Meteor.setTimeout(function(){app.sendData("00F004 1");},10000);
                        }else{
                          isFirst = false;
                          isProtocolSet = 3;
                          protocolString = "J1939";
                        }
                      }else{
                        //isFirst = false;
                        console.log("completeinsidebefore"+completestring);
                        if(completestring.includes("DATA") || completestring.includes("CAN ERROR") || completestring.includes("STOP")){
                          if(completestring.includes("00F004") || completestring.includes("be 1")){
                            rpm = 0;
                          }
                          completestring = "";

                      //    alert("ERROR: Please check your bluetooth");
                        }else{
                          var st = completestring.replace(/\r?\n/g, " ");
                          var decType = "";
                          var extractedString;
                          if(deviceName == 'OBDII'){
                            if(st.includes("00FEC1")){
                                decType = "odometer";
                                extractedString = extractDataString(st,"FEC1");
                            }else if(st.includes("00FEEC")){
                                decType = "vin";
                                extractedString = st;
                            }else if(st.includes("0FE6C")){
                                decType = "speed2";
                                //extractedString = extractDataString(st,"FE6C");
                                 extractedString="3F 3F 31 FF 15 04 00 84";
                            }else if(st.includes("00FEE5")){
                                decType = "engine hours";
                                extractedString = extractDataString(st,"FEE5");
                            }else if(st.includes("0FEF1")){
                                decType = "speed";
                                extractedString = extractDataString(st,"FEF1");
                            }else if(st.includes("00F004")){
                                decType = "rpm";
                                extractedString = extractDataString(st,"F004");
                            }
                            console.log("completeinside"+st); 
                            decrypteddata = decrypt(extractedString, decType, "J1939");
                            console.log("DECCCRYPTED--"+decrypteddata);
       if(decrypteddata==""){
       }else{
                            Blaze._globalHelpers.insertBTLog(macaddress,st,decrypteddata,decType);
       }
                            completestring = "";
                          }else{
                             var st1 = completestring.replace(/\r?\n/g, "  ");
                            var dectype1 = getDecTypeJ1708(st1);
       var extractedString1=extractJ1708DataString(st1,dectype1);
       
       console.log("completeinside"+st1); 
                            var decrypteddata1 = decrypt(extractedString1, dectype1, "J1708");
                            console.log("DECCCRYPTED--"+decrypteddata1);
                            Blaze._globalHelpers.insertBTLog(macaddress,st1,decrypteddata1,dectype1);
                            completestring = "";
                          }
                        }
                      }
                      }
                      
                    }
                }, function(err){
                    console.log("Raw data");
                    console.log(err)
                });

        timeint = getCurrentTimeValue();
                      //resultDiv.innerHTML = "";   
                      app.setStatus("Connected");
            //Blaze._globalHelpers.loginEvent();
           
               //       app.sendData("atrv   ");
                      //app.showDetailPage();
                  },


          connect: function(e) {
                

                  //on onconnect ends here , doesnt do anything called *********************************************

                    //var deviceId = e.target.dataset.deviceId;
                    var deviceId = e; 
             macaddress = e;

              console.log("Start connect");
              //app.sendData("00f003 1");
              console.log(deviceId);


              bluetoothSerial.isConnected(
    function() {
        isBluthooothConnected = true;
     console.log("Bluetooth is connected");
     if(deviceName == 'OBDII'){
       if(isFirst){
        //var datString = "00FEEC 6 0E8F9 17 01 FF FF FF FF EC FE 00  012  6 0EBFF 00 01 33 48 53 44 48 53 4A  6 0EBFF 00 02 52 30 43 4E 36 31 37  6 0EBFF 00 03 33 31 30 2A FF FF FF   >";
        //console.log("DEDEDEDE-"+decrypt(datString,"vin","J1939"));
        //var protocoltype = Users.findOne().profile.protocol;
        console.log("COUNTER--"+(counter+1));
        //Meteor.setTimeout(app.sendData("ATH1"),500);
              //app.sendData("ATZ");
                    app.sendData("ATH1");
         //Meteor.setTimeout(
         // function(){app.sendData("ATH1");
       // },4000);
          
          Meteor.setTimeout(function(){app.sendData("ATL1");},4000);
        //if(protocoltype === 1){
          Meteor.setTimeout(function(){app.sendData("ATSPA");},8000);
          Meteor.setTimeout(function(){app.sendData("00F004 1");
            isProtocolSet = 0;},12000);

        //}else if(protocoltype === 2){
        //  app.sendData("ATSP 4201");
          //app.sendData("ATSPB");
       // }else{
         //app.sendData("ATSPA");
        //}
        if(IntervalId)
          clearInterval(IntervalId);
        addPowerEvent();
       }else{
        //decryptType = "speed2";
          //app.sendData("00fe6c 1");
        }
    }else{
      if(isFirst){
            addPowerEvent();
      }
      isProtocolSet = 3;
    }

         app.onConnect();

        //app.disconnect();
        //app.disconnect();

    },
    function() {
    //-------------Lokesh -----------------
                isBluthooothConnected = false;
    if(timeint === 0){
      console.log(timeint);
      timeint = getCurrentTimeValue();
    }
    //alert(getCurrentTimeValue()-timeint);  //30sec
    if(getCurrentTimeValue()-timeint > 0.5){
      timeint = getCurrentTimeValue();
      Blaze._globalHelpers.insertMalfunctionStatus("P");
    }
  //  Blaze._globalHelpers.insertMalfunctionEventStatus("1");
  //  Blaze._globalHelpers.logoutEvent();
    //-------------Lokesh -----------------
      console.log("Bluetooth is *not* connected");

        Meteor.setTimeout(function(){bluetoothSerial.connect(deviceId, app.onConnect, app.onError);},2000);

        Meteor.setTimeout(function(){
           bluetoothSerial.isConnected(
              function() {
              },
              function(){
                Meteor.setTimeout(function(){bluetoothSerial.connect(deviceId, app.onConnect, app.onError);},2000);
              });
        },12000);
    //  bluetoothSerial.connect(deviceId, app.onConnect, app.onError);
    }
  );
              
          }, // connect ends after this****************************************************************


          onData: function(data) { // data received from Arduino
              //console.log(data);
             // console.log("BBBB");
              //resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
              //resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + app.bin2string(data) + "<br/>";
              //resultDiv.scrollTop = resultDiv.scrollHeight;
          },
          sendData: function(event) { // send data to Arduino

              var success = function() {
               //completestring = "";
          timeinte = getCurrentTimeValue();
                  console.log("success");
                  //resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
                  //resultDiv.scrollTop = resultDiv.scrollHeight;
              };

      var failure = function() {
        completestring = "";
          Blaze._globalHelpers.insertMalfunctionEventStatus("2");
          if(timeinte === 0){
          console.log(timeinte);
          timeinte = getCurrentTimeValue();
        }
        
        if(getCurrentTimeValue()-timeinte > 0.5){
          timeinte = getCurrentTimeValue();
          Blaze._globalHelpers.insertMalfunctionStatus("E");
        }
                  alert("Failed writing data to Bluetooth peripheral");
             };

              var data = event+"\r";
              console.log(event);
              // ble.write(connectedDeviceId, "FFF0", "FFF2", data.buffer, success, failure);
              bluetoothSerial.write(data, success, failure);
          },
          disconnect: function(event) {

            bluetoothSerial.disconnect(app.showMainPage, app.onError);
          },
          showMainPage: function() {
              mainPage.style.display = "";
              detailPage.style.display = "none";
          },
          showDetailPage: function() {
              mainPage.style.display = "none";
              detailPage.style.display = "";
          },
          setStatus: function(message) {
              console.log("111"+message);

              window.clearTimeout(app.statusTimeout);
              //statusDiv.innerHTML = message;
              //statusDiv.className = 'fadein';

              // automatically clear the status with a timer
              app.statusTimeout = setTimeout(function () {
                  //statusDiv.className = 'fadeout';
              }, 5000);
          },
          onError: function(reason) {
              console.log("Error");
              console.log(reason);
              //alert("ERROR: " + reason); // real apps should use notification.alert
          }
      };
      
      return app;
      });
      
// -------- Lokesh -----------
// DECRYPTING RAW DATA
// 00FEC1 4 6 0FEC1 17 6D A2 2B 0A FF FF FF FF   >
// 00FEEC 011  6 0EBFF 00 01 34 56 34 4E 43 39 45  6 0EBFF 00 02 4A 2E 20 4E 35 34 33  6 0EBFF 00 03 36 34 36 FF FF FF FF   >
function extractDataString(data, command){
var length = 8; // length of vin #
      var index = 0; // where length is specified
      var split = data.split("  "); // array split by lines
      console.log("SPLITTED"+split);
      console.log("COMMAND-"+command+" 00");
      var isExist = false;
      for (i = 0; i < split.length; i++) // finding where in input string the length is specified
      {
        console.log("SPLIT[i]--"+split[i]);
        if (split[i].includes(command+" 00") || split[i].includes("FEC1 17"))
        {
          //length = parseInt(split[i], 16);
          index = i;
          isExist = true;
          break;
        }else{
          isExist = false;
        }
      }
      console.log("SPLITTED-INDEX--"+split[index]);
var returnString='';
if(isExist){
      var split1 = split[index].split(" ");
     // var returnString='';
      var index1 = 0;
        for( j = 0; j<split1.length;j++){
          if((split1[j].includes(command) && split1[j+1]==="00") || (split1[j].includes("FEC1") && split1[j+1]==="17")){
              index1 = j+2;
              break;
          }
        }  

        console.log("INDEX1-"+index1);

        for( k = index1; k<index1+8;k++){
          if(k===index1+7){
            returnString = returnString+split1[k];
          }else{
            returnString = returnString+split1[k]+" ";
          }
          
        }
        console.log("RETURNEDDATA-"+returnString);
      }else{

      }
return returnString;
      /*var str = "";
      var limit;

      for (j = index + 1; j < Math.ceil(length / 7) + index + 1; j++) // assembles hex string of appropriate length
      {
        //var split2 = split[j].split(" "); 
        var split2 = parse(split[j]).split(" "); // splits each line individually into bytes

        if (j == Math.ceil(length / 7) + index) // if last necessary line (bc you might not need all 7 bytes)
        {
          limit = length % 7 + 1;
        }
        else 
        {
          limit = split2.length;
        }
        
        for (s = 1; s < limit; s++) // concatenates relevant bytes
        {
          str = str + split2[s];
        }
      }*/
}

function parse(data) // helper function - returns the index at which pgn is located in string separated array
{
  /*for(i = 0; i < data.length; ++i)
  {
    if (data[i].length >= 4)
    {
      return i;
    }
  }
    return 0;*/
  var last= data.substr(data.length - 23); 
 
  return last;
}

function hex_to_ascii(str1) // helper function - takes a hex string and converts to ascii string
{
  var hex  = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

function get_vin(data, arr) // function for getting vin #
{
  var length = 18; // length of vin #
      var index = 0; // where length is specified
      var split = data.split("  "); // array split by lines

      for (i = 0; i < split.length; i++) // finding where in input string the length is specified
      {
        if (split[i].includes("012") || split[i].includes("011") || split[i].includes("015"))
        {
          //length = parseInt(split[i], 16);
          index = i;
          break;
        }
      }

      var str = "";
      var limit;

      for (j = index + 1; j < Math.ceil(length / 7) + index + 1; j++) // assembles hex string of appropriate length
      {
        //var split2 = split[j].split(" "); 
        var split2 = parse(split[j]).split(" "); // splits each line individually into bytes

        if (j == Math.ceil(length / 7) + index) // if last necessary line (bc you might not need all 7 bytes)
        {
          limit = length % 7 + 1;
        }
        else 
        {
          limit = split2.length;
        }
        
        for (s = 1; s < limit; s++) // concatenates relevant bytes
        {
          str = str + split2[s];
        }
      }
        console.log("VINNNNN---"+str);
      return hex_to_ascii(str); // converts hex string to ascii
}


function decrypt(data, data_type, protocol) // "data" refers to raw data string
{ console.log("DATA_DATA"+data);
console.log("DECTYPE"+data_type);

if(data === ''){
  return;
}

  var arr = (parse(data)).split(" ");
  console.log("DATAFORDECRYPT"+arr);
  console.log("DATA_TYPE_DEC"+data_type);
  //var ind = parse(arr);

  if (protocol == "J1939")
  {
    
    if (data_type == "speed")
    {
      var hex =arr[3 - 1] + arr[2 - 1];
      console.log("speed raw data = "+hex);
      speed = ((parseInt(arr[3 - 1] + arr[2 - 1], 16)) * 0.00390625/1.6);
      return speed;
    }
    
    else if (data_type == "odometer")
    {
      var hex = arr[4 - 1] + arr[3 - 1] + arr[2 - 1] + arr[1 - 1];
            console.log("odometer raw data = "+hex);
      odometer = parseFloat((parseInt(hex, 16) * 0.003125)).toFixed(2);
      return odometer;
    }

    else if (data_type == "engine hours")
    {
      var hex = arr[4 - 1] + arr[3 - 1] + arr[2 - 1] + arr[1 - 1];
      console.log("engine hours raw data = "+hex);
engineHrs = parseFloat((parseInt(hex, 16) * 0.05)).toFixed(2);
      return engineHrs;
    }

    else if (data_type == "time")
    {
      return (arr[1 - 1] * 0.25);
    }

    else if (data_type == "vin")
    {
      var vinNo = get_vin(data, arr);
      
  	  if(vinNo.includes(".")){
        console.log('VIN-DECCRYPT--'+vinNo);
  		  return "";
  	  }
    if(vinNo.includes(" ")){
      vin = vinNo.replace(/\s/g, "");
    }else{
      vin = vinNo;
    }
    
      return vin;
    }

    else if (data_type == "rpm")
    {
      var hex = arr[5 - 1] + arr[4 - 1];
      console.log("rpm raw data = "+hex);
      rpm =((parseInt(arr[5 - 1] + arr[4 - 1], 16)) * 0.125);
      return rpm;
    }

    else if (data_type == "speed2")
    {
        var hex =arr[8 - 1] + arr[7 - 1];
        console.log("speed raw data = "+hex);
      speed2 = ((parseInt(arr[8 - 1] + arr[7 - 1], 16))* 0.00390625/1.6); 
      return speed2;//no resolution
    }
  }

  else if (protocol == "J1708")
  {

    var arr1 = data.split(" ");
    //decrypt for J1708
    if (data_type == "speed")
    {
      
      if(data == 'FF'){
        return 0;
      }else{
        console.log("speed raw data = "+data);
        speed = ((parseInt(data, 16)) * 0.5);
        return speed;
      }
    }
    
    else if (data_type == "odometer")
    {
      
      
	  var hex = arr1[4 - 1] + arr1[3 - 1] + arr1[2 - 1] + arr1[1 - 1];
    console.log("odometer raw data = "+hex);
    var odo = parseFloat((parseInt(hex, 16) * 0.1)).toFixed(2);
    if(odo !== odo){

    }else{
      odometer = odo;
	  console.log("odometer raw data = "+odometer);
  }
     // odometer = (parseInt(hex, 16) * 0.1);
      return odometer;
    }

    else if (data_type == "engine hours")
    {
      var hex = arr1[4 - 1] + arr1[3 - 1] + arr1[2 - 1] + arr1[1 - 1];
      console.log("engine hours raw data = "+hex);
		engineHrs = parseFloat((parseInt(hex, 16) * 0.05)).toFixed(2);  
      console.log("engine hours raw data = "+engineHrs);
     // engineHrs = (parseInt(data, 16) * 0.05);
      return engineHrs;
    }

    else if (data_type == "vin")
    {
      //vin = get_vin(data, arr);
      var str ='';
      for(i=0;i<arr1.length;i++){
        str = str+arr1[i];
      }
      vin = hex_to_ascii(str);
	  if(vin.includes(" ") || vin.includes(".")){
		  return "";
	  }
      return vin;
    }

    else if (data_type == "rpm")
    {
      var hex = arr1[2 - 1] + arr1[1 - 1];
      console.log("rpm raw data = "+hex);
      rpm = ((parseInt(hex, 16)) * 0.25);
      return rpm;
    }

    else if (data_type == "speed2")
    {
        
        console.log("speed raw data = "+data);
      speed2 = ((parseInt(hex, 16))* 0.00390625/1.6); 
      return speed2;//no resolution
    }
  }
}

// 00FEEC 011  6 0EBFF 00 01 34 56 34 4E 43 39 45  6 0EBFF 00 02 4A 2E 20 4E 35 34 33  6 0EBFF 00 03 36 34 36 FF FF FF FF   >
function extractJ1708DataString(data, dectype){
  console.log("EXTRACTED--"+dectype);
	var unitbyte = 0;
	if(dectype == 'speed'){
		unitbyte = 1;
	}else if(dectype == 'rpm'){
		unitbyte = 2;
	}else if(dectype == 'odometer' || dectype == 'engine hours'){
		unitbyte = 4;
	}else if(dectype == 'vin'){
    unitbyte = 18;

    console.log("RETURNSTRING--"+returnString);
  }

    var split = data.split("  "); // array split by lines
    var returnString='';

    var split1 = split[1].split(" ");
    var index1 = 0;
    for( j = 3; j<unitbyte+3;j++){
      if(unitbyte ==1){
        returnString = returnString+split1[j-1];
      }else if(unitbyte == 2){
        if(j == 1){
          returnString = returnString+split1[j-1];
        }else{
          returnString = returnString+split1[j-1]+" ";
        }
      }else if(unitbyte == 4 || unitbyte == 18){
        if(j == 1){
          returnString = returnString+split1[j];
        }else{
          returnString = returnString+split1[j]+" ";
        }
      }
    }  

    console.log("RETURNSTRING--"+returnString);

	return returnString;
}

function getDecTypeJ1708(data){
	var returnString='';

    
      var split = data.split("  "); // array split by lines
      console.log("SPLITTED--type----"+split[0]);
	  if(split[0]==='54 1'){
		  returnString = 'speed';
	  }else if(split[0]==='5c 1'){
		  returnString = 'speed';
	  }else if(split[0]==='f5 1'){
		  returnString = 'odometer';
	  }else if(split[0]==='f7 1'){
		  returnString = 'engine hours';
	  }else if(split[0]==='be 1'){
		  returnString = 'rpm';
	  }else if(split[0]==='ED 1'){
		  returnString = 'vin';
	  }
      


      
return returnString;
}

var pm = -1;
var eventCount = 0;
var IntervalId;
function addPowerEvent(){
  IntervalId = setInterval(function(){
    if(speed && speed != '' && speed > 0){
      console.log('RPM--1 --'+speed);
      if(eventCount == 0){
          eventCount = 1;
          Blaze._globalHelpers.addCommonEvent(6,1,2,'Power Up');
        }
        return;
    }
     pm = Blaze._globalHelpers.getRpm(); 
     if(pm || pm != '' || pm != -1){
      console.log('RPM--2 --'+pm);
      if(pm > 400){
        console.log('RPM--3 --'+pm+'--'+eventCount);
        if(eventCount == 0){
          console.log('RPM--4 --'+pm+'--'+eventCount);
          eventCount = 1;
          Blaze._globalHelpers.addCommonEvent(6,1,2,'Power Up');
        }
      }else{
        console.log('RPM--5 --'+pm);
        if(eventCount == 1){
          eventCount = 0;
          Blaze._globalHelpers.addCommonEvent(6,1,2,'Power Down');
        }
      }
    }
  }, 50000);
}
