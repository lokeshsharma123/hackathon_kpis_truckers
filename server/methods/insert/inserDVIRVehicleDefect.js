Meteor.methods({
    "insertDVIRVehicleDefect": function(obj) {
	var ob={};
	for(var i=0;i<obj.vehicle_defects_array.length;i++)
	{
	ob.userid=Meteor.userId();
	ob.timestamp=new Date();
	ob.date=obj.date_of_entry.toDateString();
	ob.company_id=obj.company_id
	ob.defect=obj.vehicle_defects_array[i]
	DVIRVehicleDefect.insert(ob);
	}
   return true
	}

});
