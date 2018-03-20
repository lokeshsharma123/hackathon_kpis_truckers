if (Meteor.isCordova) {
document.addEventListener("deviceready", function(){


bluetoothSerial.isConnected(
    function() {
        console.log("Bluetooth is connected");
    },
    function() {
        console.log("Bluetooth is *not* connected");
    }
);
/*
bluetoothle.initialize(function(res){
	alert("initialize res");
	alert(JSON.stringify(res));
}, {
  "request": true,
  "statusReceiver": false,
  "restoreKey" : "bluetoothleplugin"
});
*/
/*
bluetoothle.bond(function(res){
	alert("bond res");
	alert(JSON.stringify(res));
}, function(err){
	alert("bond err");
	alert(JSON.stringify(err));
}, {
  "address": "D0:37:42:5E:B1:76"
});
*/
/*
bluetoothle.connect(function(res){
	alert("connect res");
	alert(JSON.stringify(res));
		
}, function(err){
	alert("connect err");
	alert(JSON.stringify(err));
}, {
  "address": "00:26:5E:E5:86:6C"
});
*/

/*
setTimeout(function(){
	bluetoothle.discover(function(res){
	alert("discover res");
	alert(JSON.stringify(res));
	}, function(err){
	alert("discover err");
	alert(JSON.stringify(err));
}, {
  "address": "00:26:5E:E5:86:6C",
   "clearCache": true
});

},6000);

bluetoothle.retrieveConnected(function(res){
alert("retrive connected")
	alert(JSON.stringify(res));
}, function(err){
alert("retrive connected error")
	alert(JSON.stringify(err));
});
*/

bluetoothSerial.subscribe( function (data) {
    alert(JSON.stringify(data));
}, function(err){
	alert(JSON.stringify(err));
});
bluetoothSerial.list(function(res){
	Session.set("list",res);
}, function(err){
	alert(JSON.stringify(err));
});
/*
bluetoothSerial.readRSSI(function(res){
alert("read rssi")
	alert(JSON.stringify(err));
}, function(err){
	alert(JSON.stringify(err));
});
bluetoothSerial.read(function (data) {
alert(JSON.stringify(data));
}, function(err){
	alert(JSON.stringify(err));
});

bluetoothSerial.subscribe('\n', function (data) {
alert("subs res")
    alert(JSON.stringify(data))
}, function(err){
	alert("subs err")
	alert(JSON.stringify(err))
});

bluetoothSerial.subscribeRawData(function (data) {
alert("subs raw res")
    alert(JSON.stringify(data))
}, function(err){
	alert("subs raw err")
	alert(JSON.stringify(err))
});
bluetoothSerial.subscribeRawData(function (data) {
    var bytes = new Uint8Array(data);
    console.log(bytes);
}, function(err){
	alert("subscribeRawData err")
	alert(JSON.stringify(err))
});
*/
/*
bluetoothSerial.connect("D0:37:42:5E:B1:76", function(res){
	alert(JSON.stringify(res));

	bluetoothSerial.write("hello", success, failure);

	
	},function(err){
	alert(JSON.stringify(err));
});

*/
}, false);
}