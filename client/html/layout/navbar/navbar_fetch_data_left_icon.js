Template.navbar_fetch_data_left_icon.events({
"click i":function(e,tpl){
var prevDate=getPrevDate(Session.get("CurrentDate"));
var old_date = Session.get("CurrentDate");
Session.set("CurrentDate",prevDate);
clear_dvir_sessions();
clear_form_sessions();
setSignFlag(old_date.toDateString(),prevDate.toDateString());
if(!DVIRLog.findOne({date:prevDate.toDateString()}))
DVIRLogSubsManager.subscribe("DVIRLog",{date:prevDate,company_id:Session.get("company_id_to_subscribe")});
if(!DVIRTrailerDefect.findOne({date:prevDate.toDateString()}))
DVIRTrailerDefectSubsManager.subscribe("DVIRTrailerDefect",{date:prevDate,company_id:Session.get("company_id_to_subscribe")});
if(!DVIRVehicleDefect.findOne({date:prevDate.toDateString()}))
DVIRVehicleDefectSubsManager.subscribe("DVIRVehicleDefect",{date:prevDate,company_id:Session.get("company_id_to_subscribe")});
if(!Form.findOne({date:prevDate.toDateString()}))
FormSubsManager.subscribe("Form",{date:prevDate,company_id:Session.get("company_id_to_subscribe")});
if(!FormDocument.findOne({date:prevDate.toDateString()}))
FormDocumentSubsManager.subscribe("FormDocument",{date:prevDate,company_id:Session.get("company_id_to_subscribe")});
if(!SignLog.findOne({date:prevDate.toDateString()}))
SignLogSubsManager.subscribe("SignLog",{date:prevDate,company_id:Session.get("company_id_to_subscribe")});
}
})

	 