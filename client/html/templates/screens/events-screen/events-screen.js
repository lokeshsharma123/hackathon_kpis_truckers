Template.events_screen.events({
"click #event":function(e,tpl){
var obj={
	DriverLocationDescription:1000,
	EventCommentTextOrAnnotation:"my comment",
	ELDIdentifier:"FAZ2",
	EventCode:1,
	EventType:4,
	EventDate:getDate(),
	EventTime:getTime()
}
show_loader();
setTimeout(function(){
console.log(obj)
Meteor.call("insert_event",obj,function(err,res){
hide_loader();
if(!err)
show_toast("Event inserted successfully");
else
show_toast(err);
});
},1000)
 
}
});