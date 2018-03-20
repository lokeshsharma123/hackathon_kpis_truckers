Template.dvir_trailer_defect_list.helpers({
"defects":function(){
	var defect=DVIRTrailerDefect.find({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()}).fetch()
	if(defect.length)
	return defect
	}
})
Template.dvir_trailer_defect_list.events({
"click .delete_button":function(e,tpl){
Meteor.call("removeDVIRTrailerDefect",this._id,function(err,res){
});
}
});