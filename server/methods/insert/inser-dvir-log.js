Meteor.methods({
    "insert_dvir_log": function(obj) {
	// DVIRLog.remove({ "$and":[{userid:Meteor.userId()},{date:new Date().toDateString()}]});
	obj.userid=Meteor.userId();
	obj.timestamp=new Date();
	obj.date=obj.date_of_entry.toDateString();
    return DVIRLog.insert(obj);
	}

});
