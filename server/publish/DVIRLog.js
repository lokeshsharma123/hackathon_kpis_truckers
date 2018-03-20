 Meteor.publish('DVIRLog', function(obj) {
	if(!obj.date)
	{
		return DVIRLog.find({userid:this.userId,company_id:obj.company_id,date:new Date().toDateString()},{sort: {timestamp: -1},limit: 1});
	}
	else
	{
		return DVIRLog.find({userid:this.userId,company_id:obj.company_id,date:new Date(obj.date).toDateString()},{sort: {timestamp: -1},limit: 1});
 
	}
  });
  
   Meteor.publish('DVIRVehicleDefect', function(obj) {
	if(!obj.date)
	{
		return DVIRVehicleDefect.find({userid:this.userId,company_id:obj.company_id,date:new Date().toDateString()},{sort: {timestamp: -1}});
	}
	else
	{
		return DVIRVehicleDefect.find({userid:this.userId,company_id:obj.company_id,date:new Date(obj.date).toDateString()},{sort: {timestamp: -1}});
 
	}
  });
  
   Meteor.publish('DVIRTrailerDefect', function(obj) {
	if(!obj.date)
	{
		return DVIRTrailerDefect.find({userid:this.userId,company_id:obj.company_id,date:new Date().toDateString()},{sort: {timestamp: -1}});
	}
	else
	{
		return DVIRTrailerDefect.find({userid:this.userId,company_id:obj.company_id,date:new Date(obj.date).toDateString()},{sort: {timestamp: -1}});
 
	}
  });
  
  