Meteor.methods({
    "insert_primary_cycle": function(obj) {
	// DVIRLog.remove({ "$and":[{userid:Meteor.userId()},{date:new Date().toDateString()}]});
	obj.userid=Meteor.userId();
	obj.timestamp=new Date();
	obj.date=new Date().toDateString();
    return PrimaryCycle.insert(obj);
	}

});
