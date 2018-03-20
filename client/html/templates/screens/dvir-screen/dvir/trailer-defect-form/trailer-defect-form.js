Template.trailer_defect_form.helpers({
	"defects":function(){
	if(Session.get("trailer_defects_array") && Session.get("trailer_defects_array").length)
	return Session.get("trailer_defects_array")
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log.trailer_defects_array
	},
	"value":function(){
	//if(Session.get("trailer_no"))
	//return Session.get("trailer_no")
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log.trailer_no
	},
	"value2":function(){
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log.trailer_no2
	},
	"value3":function(){
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log.trailer_no3
	}
})
Template.trailer_defect_form.events({
	"keyup #trailer_no":function(e,tpl){
		Session.set("trailer_no",e.target.value)
	},
	"click .delete_button":function(e,tpl){
	var _id=this._id;
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	Session.set("trailer_defects_array",log.trailer_defects_array)
	var arr=_.reject(Session.get("trailer_defects_array"), function(n){ return n._id == _id; });
	Session.set("trailer_defects_array",arr)
	},
	"click #show_trailer_defect_list":function(e,tpl){
	Session.set("show_trailer_defect_screen",true);
	}
})

 
/*
Template.trailer_defect_form.onDestroyed(function () {
  Session.set("trailer_defects_array",[]);
Session.set("trailer_no","")
});
*/