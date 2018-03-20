Template.login_screen.helpers({
"list":function(){
return Session.get("list");
}
})

Template.login_screen.events({
"click .connect":function(e,tpl){
e.preventDefault();
var address=this.address
alert(address)
bluetoothSerial.connectInsecure(address, function(res){
	alert(JSON.stringify(res))
}, function(err){

	alert(JSON.stringify(err))
});
},
"click .send":function(e,tpl){
e.preventDefault();
bluetoothSerial.write("hello, world", function(res){
alert("write")
	alert(JSON.stringify(res))
	
	bluetoothSerial.available(function (numBytes) {
    alert("There are " + numBytes + " available to read.");
}, function(err){
alert(JSON.stringify(err))
});
	bluetoothSerial.read(function (data) {
    alert(JSON.stringify(data))
}, function(err){
	alert(JSON.stringify(err))
});
}, function(err){
alert("write")
	alert(JSON.stringify(err))
});

},
"click #read":function(e,tpl){
	e.preventDefault();
	alert("reading");
	bluetoothSerial.read(function (data) {
    alert(JSON.stringify(data))
}, function(err){
	alert(JSON.stringify(err))
});
	
}
})
