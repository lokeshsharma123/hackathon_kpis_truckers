 Meteor.publish('Form', function(obj) {
  if(!obj.date)
	{
 		return Form.find({userid:this.userId,company_id:obj.company_id,date:new Date().toDateString()},{sort: {timestamp: -1},limit: 1});
	}
	else
	{	
		return Form.find({userid:this.userId,company_id:obj.company_id,date:new Date(obj.date).toDateString()},{sort: {timestamp: -1},limit: 1});
	}
  });