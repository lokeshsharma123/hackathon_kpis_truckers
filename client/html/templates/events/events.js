insertEvent5 = function insertEvent5(obj) {
var obj={
	EventSequenceIDNumber:obj.EventSequenceIDNumber,
	EventType:5,
	EventCode:1,
	VehicleMiles:obj.VehicleMiles,
	EngineHours:obj.EngineHours,
	ELDIdentifier:obj.ELDIdentifier
	
}
    show_loader();
	Meteor.call("insert_event",obj,function(err,res){
	hide_loader();
	alert(JSON.stringify(res));
	});
}
