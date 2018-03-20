Template.view_notifications_list_screen.onRendered(function(){
	powerButton = document.getElementById( 'powerButton' );
	locationButton = document.getElementById( 'locationButton' );
	eButton = document.getElementById( 'eButton' );
	timeButton = document.getElementById( 'timeButton' );
	dRecordButton = document.getElementById( 'dRecordButton' );
	dTransferButton = document.getElementById( 'dTransferButton' );
	
	locMal = Events.find({type:7,malfunctionCode:"L",date:getTodayDate()},{sort:{time:-1}}).fetch();
	powerMal = Events.find({type:7,malfunctionCode:"P",date:getTodayDate()},{sort:{time:-1}}).fetch();
	eMal = Events.find({type:7,malfunctionCode:"E",date:getTodayDate()},{sort:{time:-1}}).fetch();
	tMal = Events.find({type:7,malfunctionCode:"T",date:getTodayDate()},{sort:{time:-1}}).fetch();
	dTMal = Events.find({type:7,malfunctionCode:"s",date:getTodayDate()},{sort:{time:-1}}).fetch();
	dRMal = Events.find({type:7,malfunctionCode:"R",date:getTodayDate()},{sort:{time:-1}}).fetch();

	console.log("TEST-----");
	console.log("DATE---"+getTodayDate());
	
	if(locMal.length > 0){
		locationButton.style.backgroundColor = "red";
	}
	if(powerMal.length > 0){
		powerButton.style.backgroundColor = "red";
	}
	if(eMal.length > 0){
		eButton.style.backgroundColor = "red";
	}
	if(tMal.length > 0){
		timeButton.style.backgroundColor = "red";
	}
	if(dTMal.length > 0){
		dTransferButton.style.backgroundColor = "red";
	}
	if(dRMal.length > 0){
		dRecordButton.style.backgroundColor = "red";
	}

	 bluetoothSerial.isConnected(
    function() {
        document.getElementById('p1').innerHTML = 'connected';

    },
    function() {
		//-------------Lokesh -----------------
	document.getElementById('p1').innerHTML = 'disconnected';
    }
);

	
})


var powerButton;
var locationButton;
var eButton;
var locMal = [];
var powerMal = [];
var eMal = [];

//Get Current Date and time
function getTodayDate() {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var today2 = localDateTime(Session.get("companyLocationOffset"));
    var _today = today2.toLocaleDateString("en-US", dateFormat);
    return _today;
}


