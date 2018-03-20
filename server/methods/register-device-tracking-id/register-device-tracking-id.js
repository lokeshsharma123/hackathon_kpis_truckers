Meteor.methods({
    "registerDeviceTrackingID": function(obj) {
	var check=DeviceTrackingIDList.findOne({tracking_id:obj.dti,password:obj.password,allotted:true});
 	if(!check)
	throw new Meteor.Error('Authentication Error', 'Wrong Credentials');
	var check2=CompanyDriverList.findOne({company_id:obj.company_id,driver_id:this.userId,isActive:true})
	if(!check2)
		throw new Meteor.Error('Un Authorized Access', 'The Driver not exists in the Company');
	if(check2.is_logged_in)
		throw new Meteor.Error('Error', 'Already Registered');	
	return	CompanyDriverList.update({company_id:obj.company_id,driver_id:this.userId,isActive:true},{$set: {is_logged_in:true}});
			
	}

});
