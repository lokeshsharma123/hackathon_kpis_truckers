Meteor.methods({
 
  callBluetoothApi: function() { 
    const response = Meteor.http.call("GET","http://122.180.21.77:8084/getDetail");
	return response;
 }
});