 Meteor.publish('SignLog', function(obj) {
	/* if(!obj.date)
	{
			return SignLog.find({userid:this.userId,company_id:obj.company_id,date:new Date().toDateString()},{sort: {timestamp: -1},limit: 1});
	}
	else
	{	
		return SignLog.find({userid:this.userId,company_id:obj.company_id,date:new Date(obj.date).toDateString()},{sort: {timestamp: -1},limit: 1});
	}
	*/
	return SignLog.find()
  });