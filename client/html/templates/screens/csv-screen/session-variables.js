/*Tracker.autorun(function(){
setTimeout(function(){
if(Meteor.userId())
{
var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
var date_used_for_event=Session.get("CurrentDate").toLocaleDateString("en-US", dateFormat);
var eld_array=[]
var user=Meteor.user();
if(user)
var state=StateList.findOne({_id:user.profile.state_id})
var form=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
var dvir=DVIRLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
var company_driver_list=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
var sign=SignLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
var events=Events.find({date:date_used_for_event,userId:Meteor.userId()}).fetch();
if(user)
{
	var profile=user.profile
	Session.set("DriverLastName",profile.last_name)
	Session.set("DriverFirstName",profile.first_name)
	Session.set("ELDUsernameForDriver",profile.email)
	if(state)
	Session.set("DriverLicenseIssuingState",state.state)
	Session.set("DriverLicenseNumber",profile.driver_licence_no)
	if(form)
	{
	Session.set("CoDriverFirstName",form.co_drivers)
	Session.set("CoDriverLastName",form.co_drivers)
	Session.set("ELDUsernameForCoDriver",form.co_drivers)
	Session.set("CurrentTotalVehicleMiles",form.odometers)
	}
	if(dvir)
	{
		Session.set("TrailerNumber",dvir.trailer_no)
	}
	if(company_driver_list)
	{
		Session.set("CarrierUSDOTNumber",company_driver_list.company_profile.usdot_no)
		Session.set("CarrierName",company_driver_list.company_profile.company_name)
		Session.set("ExemptDriverConfiguration",company_driver_list.profile_by_company.exempt_driver_configuration)
		
	}
	if(sign){
		Session.set("OutputFileComment",sign.output_file_comment)
	}
	if(events.length){
	var obj={}
		for(var i=0;i<events.length;i++)
		{
			var e=events[i]
			obj={
				EventSequenceIDNumber:e.seqId,
				EventRecordStatus:e.recordStatus,
				EventRecordOrigin:e.recordOrigin,
				EventType:e.type,
				EventCode:e.code,
				EventDate:e.date,
				EventTime:e.time,
				AccumulatedVehicleMiles:e.vehicleMiles,
				ElapsedEngineHours:e.engineHour,
				EventLatitude:e.latituede.current,
				EventLongitude:e.longitude.current,
				DistanceSinceLastValidCoordinates:"",
				CorrespondingCMVOrderNumber:"",
				UserOrderNumberForRecordOriginator:"",
				MalfunctionIndicatorStatusForELD:"",
				DataDiagnosticEventIndicatorStatusForDriver:""
				}
			eld_array.push(obj)
		}
		Session.set("ELDEventList",eld_array);
			
	}
	
}

}

 },3000);
})
 */