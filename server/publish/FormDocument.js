 Meteor.publish('FormDocument', function(obj) {
  if(!obj.date)
	{
	console.log("published for "+new Date().toDateString())
		return FormDocument.find({userid:this.userId,company_id:obj.company_id,date:new Date().toDateString()},{sort: {timestamp: -1}},{limit: 1});
	}
	else
	{
		console.log("published for "+new Date(obj.date).toDateString())
		return FormDocument.find({userid:this.userId,company_id:obj.company_id,date:new Date(obj.date).toDateString()},{sort: {timestamp: -1}},{limit: 1});
	}
  });