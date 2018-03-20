Meteor.methods({
    "insertDVIRTrailerDefect": function(obj) {
	var ob={};
	for(var i=0;i<obj.trailer_defects_array.length;i++)
	{
	ob.userid=Meteor.userId();
	ob.timestamp=new Date();
	ob.date=obj.date_of_entry.toDateString();
	ob.company_id=obj.company_id
	ob.defect=obj.trailer_defects_array[i]
	DVIRTrailerDefect.insert(ob);
	}
	return true
	}

});
