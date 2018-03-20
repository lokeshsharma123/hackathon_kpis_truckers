Template.navbar_bottom.onRendered(function() {

	//Meteor.clearInterval(btStatusInterval);
	if (Meteor.isCordova) {
		 var btStatusInterval = Meteor.setInterval(function() {
			//console.log(6)
			bluetoothSerial.isConnected(
			function() {
			// alert(2)
				$('#bt_status').text('connected');

			},
			function() {
			// alert(3)
				$('#bt_status').text('disconnected');
			}
		);
	   }, 3000);
	}
   
   	var locMal = Events.find({eventType:7,malfunctionCode:"L",date:getTodayDate()},{sort:{time:-1}}).fetch();
	var powerMal = Events.find({eventType:7,malfunctionCode:"P",date:getTodayDate()},{sort:{time:-1}}).fetch();
	var eMal = Events.find({eventType:7,malfunctionCode:"E",date:getTodayDate()},{sort:{time:-1}}).fetch();
	$("#Lmal,#Pmal, #Emal").hide();
	if(locMal.length > 0){
		$("#Lmal").show();
	}
	if(powerMal.length > 0){
		$("#Pmal").show();
	}
	if(eMal.length > 0){
		$("#Emal").show();
	}
   
   
});

Template.navbar_bottom.events({
	"click .viewreport":function(){
		Router.go("/reports");
	}
});
Template.navbar_bottom.events({
	"click .viewnotification":function(){
		Router.go("/view-notifications-list");
	}
});