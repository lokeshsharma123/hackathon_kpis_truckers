Template.navbar_fetch_data_right_icon.events({
"click i":function(e,tpl){
   
var current_date=Session.get("CurrentDate").getDate();
var old_date = Session.get("CurrentDate");
var today_date=localDateTime(Session.get("companyLocationOffset")).getDate();
if(current_date==today_date)
{
show_toast("Can't load data for required date");
return
}
var nextDate=getNextDate(Session.get("CurrentDate"));
Session.set("CurrentDate",nextDate);
setSignFlag(old_date.toDateString(),nextDate.toDateString());
if(!DVIRLog.findOne({date:nextDate.toDateString()}))
DVIRLogSubsManager.subscribe("DVIRLog",{date:nextDate,company_id:Session.get("company_id_to_subscribe")});
if(!DVIRTrailerDefect.findOne({date:nextDate.toDateString()}))
DVIRTrailerDefectSubsManager.subscribe("DVIRTrailerDefect",{date:nextDate,company_id:Session.get("company_id_to_subscribe")});
if(!DVIRVehicleDefect.findOne({date:nextDate.toDateString()}))
DVIRVehicleDefectSubsManager.subscribe("DVIRVehicleDefect",{date:nextDate,company_id:Session.get("company_id_to_subscribe")});
if(!Form.findOne({date:nextDate.toDateString()}))
FormSubsManager.subscribe("Form",{date:nextDate,company_id:Session.get("company_id_to_subscribe")});
if(!FormDocument.findOne({date:nextDate.toDateString()}))
FormDocumentSubsManager.subscribe("FormDocument",{date:nextDate,company_id:Session.get("company_id_to_subscribe")});
if(!SignLog.findOne({date:nextDate.toDateString()}))
SignLogSubsManager.subscribe("SignLog",{date:nextDate,company_id:Session.get("company_id_to_subscribe")});
}
})

	 