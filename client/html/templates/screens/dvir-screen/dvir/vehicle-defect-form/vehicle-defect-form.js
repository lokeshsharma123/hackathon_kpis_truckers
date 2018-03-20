Template.vehicle_defect_form.helpers({
	"value":function(){
	//if(Session.get("vehicle_no"))
	//return Session.get("vehicle_no")
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log.vehicle_no
	},
	"vin_no":function(){
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log.vin_no?log.vin_no.replace("-",""):"";
	}
})
Template.vehicle_defect_form.events({
	"keyup #vehicle_no":function(e,tpl){
		Session.set("vehicle_no",e.target.value)
	},
	"click .delete_button":function(e,tpl){
	var _id=this._id;
	var log=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	Session.set("vehicle_defects_array",log.vehicle_defects_array)
	
	var arr=_.reject(Session.get("vehicle_defects_array"), function(n){ return n._id == _id; });
	Session.set("vehicle_defects_array",arr)
	},
	"click #show_vehicle_defect_list":function(e,tpl){
	Session.set("show_vehicle_defect_screen",true);
	}
})
/*
Template.vehicle_defect_form.onRendered(function(){
console.log("run")
this.autorun(function(){
if(!Session.get("vehicle_defects_array") || !Session.get("vehicle_defects_array").length)
{
var data=DVIRLog.findOne({date:Session.get("CurrentDate").toDateString()});
if(!data)
{
Session.set("vehicle_defects_array",[]);
Session.set("vehicle_no","")
}
else if(data)
{
Session.set("vehicle_defects_array",data.vehicle_defects_array);
Session.set("vehicle_no",data.vehicle_no)
}
}
 
})
})
*/