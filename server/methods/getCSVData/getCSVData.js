Meteor.methods({
    "getCSVData": function(obj) {
	var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
	var company_id=obj.company_id
	var no_of_days=parseInt(obj.no_of_days)
	
	 
	 var array=[];
	 
	 var date_to_find
	 var date_used_for_event
	 for(var i=1;i<=no_of_days;i++){
	 var datee=new Date()
	 var ob={}
	 datee.setDate(datee.getDate()-i+1);
	 date_used_for_event=datee.toLocaleDateString("en-US", dateFormat)
	 date_to_find=datee.toDateString()
	 ob.dvir=DVIRLog.findOne({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}});
	 ob.form=Form.findOne({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}});
	 ob.sign=SignLog.findOne({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}});
	 ob.dt=DVIRTrailerDefect.find({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	 ob.dv=DVIRVehicleDefect.find({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	 ob.date=date_to_find
	 ob.events=Events.find({date:date_used_for_event,userId:this.userId}).fetch();
	 ob.user=Meteor.user().profile
	 ob.cdp=CompanyDriverList.findOne({company_id:company_id,driver_id:this.userId})
	 array.push(ob)
	 }
	
	return array
	}
	

});