 
if (Meteor.isCordova) {
/* 
Template.bluetooth_screen.events({
"click #sendButton":function(e,tpl){
 var success = function() {
            console.log("success");
			var resultDiv=document.getElementById("resultDiv");
			var messageInput=document.getElementById("messageInput");
            resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
            resultDiv.scrollTop = resultDiv.scrollHeight;
        };

        var failure = function() {
            alert("Failed writing data to Bluetooth peripheral");
        };

        var data = messageInput.value;
        bluetoothSerial.write(data, success, failure);
},
"click #refreshButton":function(e,tpl){
	 bluetoothSerial.list(onDeviceList, onError);
        bluetoothSerial.discoverUnpaired(onDeviceListUnPair, onError);
},
"click #disconnectButton":function(e,tpl){
bluetoothSerial.disconnect(function(){alert("disconnected");}, onError);
},
"click #sendButton":function(e,tpl){
sendData()
},
"click li":function(e,tpl){
console.log(e)
connect(e);
}
});*/


Template.bluetooth_screen.onRendered(function(){

/*setTimeout(function(){
console.log("e");
 bluetoothSerial.list(onDeviceList, onError);
        bluetoothSerial.discoverUnpaired(onDeviceListUnPair, onError);
},1000);*/
})

/*
function refresh_list(){

 bluetoothSerial.list(onDeviceList, onError);
/* bluetoothSerial.list(function(res){
	Session.set("list",res);
}, function(err){
	alert(JSON.stringify(err));
});

        bluetoothSerial.discoverUnpaired(onDeviceListUnPair, onError);

}


function onDeviceList(devices){

var deviceList=document.getElementById("deviceList")

 var option;

        // remove existing devices
        deviceList.innerHTML = "";
       // app.setStatus("");

        devices.forEach(function(device) {

            var listItem = document.createElement('li'),
                html = '<b>' + device.name + '</b><br/>' + device.id;

            listItem.innerHTML = html;

            console.log(device);

            if (cordova.platformId === 'windowsphone') {
              // This is a temporary hack until I get the list tap working
              var button = document.createElement('button');
              button.innerHTML = "Connect";
              button.addEventListener('click', connect, false);
              button.dataset = {};
              button.dataset.deviceId = device.id;
              listItem.appendChild(button);
            } else {
              listItem.dataset.deviceId = device.id;
            }
            deviceList.appendChild(listItem);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                alert("No Bluetooth Peripherals Discovered.");
            } else { // Android or Windows Phone
               alert("Please Pair a Bluetooth Device.");
            }

        } else {
            alert("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }
		
}


function onError(reason){
     alert("ERROR: " + reason); // real apps should use notification.alert
  
}


function onDeviceListUnPair(devices) {
            var option;

            // remove existing devices
            deviceListUnPair.innerHTML = "";
            //app.setStatus("");

            devices.forEach(function(device) {

                var listItem = document.createElement('li'),
                    html = '<b>' + device.name + '</b><br/>' + device.id;

                listItem.innerHTML = html;

                console.log(device);

                if (cordova.platformId === 'windowsphone') {
                  // This is a temporary hack until I get the list tap working
                  var button = document.createElement('button');
                  button.innerHTML = "Connect";
                  button.addEventListener('click', connect, false);
                  button.dataset = {};
                  button.dataset.deviceId = device.id;
                  listItem.appendChild(button);
                } else {
                  listItem.dataset.deviceId = device.id;
                }
                deviceListUnPair.appendChild(listItem);
            });

            if (devices.length === 0) {

                option = document.createElement('option');
                option.innerHTML = "No Bluetooth Devices";
                deviceListUnPair.appendChild(option);

                if (cordova.platformId === "ios") { // BLE
                   alert("No Bluetooth Peripherals Discovered.");
                } else { // Android or Windows Phone
                    alert("Please Pair a Bluetooth Device.");
                }

            } else {
              alert("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
            }

        }
		
		
function sendData() { // send data to Arduino
var resultDiv=document.getElementById("resultDiv");
        var success = function() {
            console.log("success");
            resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
            resultDiv.scrollTop = resultDiv.scrollHeight;
        };

        var failure = function() {
            alert("Failed writing data to Bluetooth peripheral");
        };

        var data = messageInput.value;
        bluetoothSerial.write(data, success, failure);
    }
	
	function connect(e){
	var onConnect = function() {
                // subscribe for incoming data
                bluetoothSerial.subscribe('\n', onData, onError);
var resultDiv=document.getElementById("resultDiv");
                resultDiv.innerHTML = "";
               alert("Connected");
                //app.showDetailPage();
            };

       var deviceId = e.target.dataset.deviceId;
        if (!deviceId) { // try the parent
            deviceId = e.target.parentNode.dataset.deviceId;
        }

        console.log("Start connect");
        console.log(deviceId);
        bluetoothSerial.connect(deviceId, onConnect, onError);
		
}


function onData(data){
var resultDiv=document.getElementById("resultDiv");
 console.log(data);
        resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
        resultDiv.scrollTop = resultDiv.scrollHeight;

 
}*/
 
}