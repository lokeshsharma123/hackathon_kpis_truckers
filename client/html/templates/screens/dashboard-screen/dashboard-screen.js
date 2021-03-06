Template.dashboard_screen.helpers({
"profile":function(){
if(Users.findOne())
return Users.findOne().profile
}

})

Template.dashboard_screen.helpers({
"driver_list":function(){
var driver_list=CompanyDriverList.find({company_id:Meteor.userId()}).fetch();
if(driver_list.length>0){
    for(var i = 0;i<driver_list.length;i++){
  var dataRec = Events.find({userId:driver_list[i].driver_id},{sort:{start_time:-1}},{sort:{date:-1}}).fetch();
  if(dataRec.length>0){
      driver_list[i].time = dataRec[0].date+"'"+changeNumToTime(dataRec[0].time);
      driver_list[i].location = dataRec[0].location;
  }
  var dataGraph = Data.find({ userId: driver_list[i].driver_id},{sort:{DateOFDataSaving: -1}}).fetch();
  console.log(dataGraph);
   if(dataGraph.length>0){
      driver_list[i].hos = dataGraph[0].multiDayHoursRemainig;
      driver_list[i].violation = "no";
      if(dataGraph[0].isViolation){
           driver_list[i].violation = "yes";
      }
  }
    }
return driver_list
}
}
});

Template.dashboard_screen.helpers({
"undefined_driver_list":function(){
var undefined_driver_list=[];
var dataRec = Events.find({userId:'0'},{sort:{start_time:1}}).fetch();
      var tTime = 0;
       var val = {};
      if(dataRec.length>0){
        for(var i = 0;i<dataRec.length-1;i++){
            tTime = tTime+(dataRec[i+1].start_time-dataRec[i].start_time)
            i++;
        }
      //  alert( tTime);
      
         var locMal = Events.find({eventType:7,malfunctionCode:"L",userId:'0'},{sort:{time:-1}}).fetch();
	var powerMal = Events.find({eventType:7,malfunctionCode:"P",userId:'0'},{sort:{time:-1}}).fetch();

	if(locMal.length > 0){
		val.isMalFunc = "yes";
	}
	else if(powerMal.length > 0){
		val.isMalFunc = "yes";
	}
        else {
            val.isMalFunc = "no";
        }
    val.tTime = changeNumToTime(tTime);
    val.eldId = dataRec[0].eldId;
    undefined_driver_list.push(val)
      }
if(undefined_driver_list.length>0)
return undefined_driver_list
}
});

Template.dashboard_screen.events({
"click [viewReport]":function(event, template){
 //   alert('');
//Router.go("/edit-driver/"+this.driver_id);
if(!this.driver_id)
//show_toast("This driver has not created his account yet.");
Router.go("/view-company-driver/"+this._id);
else{
    Session.set("isFromCompany",true);
    Session.set("senserUserId",this.driver_id);
	Router.go("/reports/"+this.company_id);
}
event.stopPropagation();
}

});

Template.dashboard_screen.events({

  'input #speed': function (event, template) {
    var speed = document.getElementById('speed').value;
       if(speed){
        if(speed>=5){
          Router.go("/Warn_Unauthorizer");  
        }
  }
  }
});

Template.dashboard_screen.events({
"click [distance]":function(event, template){
     var lat = document.getElementById('lat').value;
      var lon = document.getElementById('lon').value;
    Blaze._globalHelpers.getMinimumDistance(lat,lon);
}
 //   alert('');
//Router.go("/edit-driver/"+this.driver_id);

});

// -------- Lokesh -----------
Template.dashboard_screen.onRendered(function(){
// testing wsdl
Blaze._globalHelpers.stopTimer();

//Meteor.call("testwsdl",function(err,res){
 // console.log("RESPONSE: "+ res[0]);
 //})
 $('.tooltipped').tooltip({delay: 50});
	var profiles = Users.findOne().profile.type;
	//console.log(Users.findOne().profile);
	console.log(profiles);
	if(profiles === "driver"){	
  //  show_loader();
	  if (Meteor.isCordova) {
    // Wait for deviceready
    Meteor.startup(function () {
		
		var permissions = cordova.plugins.permissions;
		Session.set("senserUserId",Users.findOne()._id);
		permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, function( status ){
		  if ( status.hasPermission ) {
			console.log("Yes :D ");
			Blaze._globalHelpers.getCurrentLocation();
		  }
		  else {
			permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, success, error);

		function error() {
		  console.warn('Location permission is not turned on');
		}

		function success( status ) {
		  if( !status.hasPermission ) error();
		  else console.log("Permission granted to use ");
		}
		  }
		});

    });
}

	  /*var ap = Blaze._globalHelpers.getBleApp();
	  ap.initialize();*/

    Meteor.setTimeout(function(){hide_loader();},60000);
	}  
	else if(profiles === "company"){
		Session.set("companyId",Users.findOne()._id);
		setCompanyOffset(Session.get("companyId"));
	}
 })
 // -------- Lokesh -----------
 
 function changeNumToTime(num) {

    if ((num + '').includes(".")) {
        var decPart = ((num + "").split(".")[1]);
        var intPart = parseInt((num + "").split(".")[0]);
        var str = '';
        for (var i = 0, len = decPart.length; i < len; i++) {
            if (decPart[i] == '0') {
                str = str + '0';
            } else {
                break;
            }
        }
        decPart = (decPart) * 0.6;
        decPart = Math.round(decPart);
        decPart = str + decPart;
        while ((decPart + '').length < 2) {
            decPart = decPart + '0'
        }
        if ((decPart + '').length > 2) {

            decPart = (decPart + '').substring(0, 2);
        }
        num = intPart + ':' + decPart;

    }
    return num;
}