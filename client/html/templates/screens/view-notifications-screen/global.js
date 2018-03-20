validate_csv_fields=function validate_csv_fields(data){


//****************** Start 4.8.2.1.1 ****************
DriverLastName=csvValidateDE_30(data[0].user?data[0].user.first_name:"","DriverLastName")
DriverFirstName=csvValidateDE_28(data[0].user?data[0].user.last_name:"","DriverFirstName")
/*adjusted*/ELDUsernameForDriver=csvValidateDE_18(data[0].user?data[0].user.username:"","ELDUsernameForDriver")
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var state
if(data[0].cdp)
state=StateList.findOne({_id:data[0].cdp.state_id})
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
DriverLicenseIssuingState=csvValidateDE_10(state?state.state.split("(")[0]:"","DriverLicenseIssuingState")
DriverLicenseNumber=csvValidateDE_11(data[0].cdp?data[0].cdp.driver_licence_no:"","DriverLicenseNumber")

CoDriverLastName=csvValidateDE_30(data[0].form?data[0].form.co_drivers.split(" ")[1]:"","CoDriverLastName")
CoDriverFirstName=csvValidateDE_28(data[0].form?data[0].form.co_drivers.split(" ")[0]:"","CoDriverFirstName")
ELDUsernameForCoDriver=csvValidateDE_18(data[0].form?data[0].form.co_drivers.split(" ")[0]:"","ELDUsernameForCoDriver")//doubt

CMVPowerUnitNumber=csvValidateDE_4("","CMVPowerUnitNumber");//missing
CMVVIN=csvValidateDE_5("","CMVVIN");//missing
TrailerNumber=csvValidateDE_42(data[0].dvir?data[0].dvir.trailer_no:"","TrailerNumber")

CarrierUSDOTNumber=csvValidateDE_3(data[0].cdp?data[0].cdp.company_profile.usdot_no:"","CarrierUSDOTNumber")//missing
CarrierName=csvValidateDE_2(data[0].cdp?data[0].cdp.company_profile.company_name:"","CarrierName")
MultidayBasisUsed=csvValidateDE_36("","MultidayBasisUsed")//missing
TwentyFourHourPeriodStartingTime=csvValidateDE_1("000000","TwentyFourHourPeriodStartingTime")//missing
TimeZoneOffsetFromUTC=csvValidateDE_41("","TimeZoneOffsetFromUTC")//doubt

ShippingDocumentNumber=csvValidateDE_39(data[0].form?data[0].form.shipping_documents:"","ShippingDocumentNumber")//doubt
ExemptDriverConfiguration=csvValidateDE_26(data[0].cdp?data[0].cdp.profile_by_company.exempt_driver_configuration:"","ExemptDriverConfiguration")

Current_Date=csvValidateDE_8(getDate(),"Current_Date")
Current_Time=csvValidateDE_40(getTime(),"Current_Time")
CurrentLatitude=csvValidateDE_31("","CurrentLatitude")//missing
CurrentLongitude=csvValidateDE_33("","CurrentLongitude")//missing
CurrentTotalVehicleMiles=csvValidateDE_43("","CurrentTotalVehicleMiles")//missing
CurrentTotalEngineHours=csvValidateDE_19("","CurrentTotalEngineHours")//missing

ELDRegistrationID=csvValidateDE_17(data[0].cdp.tracking_id,"ELDRegistrationID")//missing
ELDIdentifier=csvValidateDE_15("","ELDIdentifier")//missing
ELDAuthenticationValue=csvValidateDE_14("","ELDAuthenticationValue")//missing
OutputFileComment=csvValidateDE_38(data[0].sign?data[0].sign.output_file_comment:"","OutputFileComment")


//****************** End 4.8.2.1.1  ****************



//****************** Start 4.8.2.1.2 ****************
 
UserList=[]
var tmp;
for(var i=0;i<data.length;i++){
	tmp={}
	tmp.AssignedUserOrderNumber=i;
	tmp.UserELDAccountType='D';
	tmp.UserLastName=DriverLastName;
	tmp.UserFirstName=DriverFirstName;
	UserList.push(tmp)
	
	tmp={}
	
	tmp.AssignedUserOrderNumber=i+1;
	tmp.UserELDAccountType='S';
	tmp.UserLastName=data[i].form?data[i].form.co_drivers.split(" ")[1]:"";
	tmp.UserFirstName=data[i].form?data[i].form.co_drivers.split(" ")[0]:"";;
	UserList.push(tmp)
}
 

//****************** End 4.8.2.1.2  *****************


//****************** Start 4.8.2.1.3 ****************

CMVList=[
{
AssignedCMVOrderNumber:csvValidateDE_37("","AssignedCMVOrderNumber"),//missing
CMVPowerUnitNumber:csvValidateDE_4("","CMVPowerUnitNumber"),//missing
CMVVIN:csvValidateDE_5("","CMVVIN")//missing
},
{
AssignedCMVOrderNumber:csvValidateDE_37("","AssignedCMVOrderNumber"),//missing
CMVPowerUnitNumber:csvValidateDE_4("","CMVPowerUnitNumber"),//missing
CMVVIN:csvValidateDE_5("","CMVVIN")//missing
}]

 

//****************** End 4.8.2.1.3  *****************


//****************** Start 4.8.2.1.4 ****************


if(data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:"","EventSequenceIDNumber"),
				EventRecordStatus:csvValidateDE_23(e.recordStatus?e.recordStatus:"","EventRecordStatus"),
				EventRecordOrigin:csvValidateDE_22(e.recordOrigin?e.recordOrigin:"","EventRecordOrigin"),
				EventType:csvValidateDE_25(e.type?e.type:"","EventType"),
				EventCode:csvValidateDE_20(e.code?e.code:"","EventCode"),
				EventDate:csvValidateDE_8(e.date?e.date:"","EventDate"),
				EventTime:csvValidateDE_40(e.time?e.time:"","EventTime"),
				AccumulatedVehicleMiles:csvValidateDE_43(e.vehicleMiles?e.vehicleMiles:"","AccumulatedVehicleMiles"),
				ElapsedEngineHours:csvValidateDE_19(e.engineHour?e.engineHour:"","ElapsedEngineHours"),
				EventLatitude:csvValidateDE_31(e.latitude?e.latitude.current:"","EventLatitude"),
				EventLongitude:csvValidateDE_33(e.longitude?e.longitude.current:"","EventLongitude"),
				DistanceSinceLastValidCoordinates:csvValidateDE_9(e.DistanceSinceLastValidCoordinates?e.DistanceSinceLastValidCoordinates:"","DistanceSinceLastValidCoordinates"),//missing
				CorrespondingCMVOrderNumber:csvValidateDE_37(e.CorrespondingCMVOrderNumber?e.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber"),//missing
				UserOrderNumberForRecordOriginator:csvValidateDE_37(e.UserOrderNumberForRecordOriginator?e.UserOrderNumberForRecordOriginator:"","UserOrderNumberForRecordOriginator"),//missing
				MalfunctionIndicatorStatusForELD:csvValidateDE_35(e.MalfunctionIndicatorStatusForELD?e.MalfunctionIndicatorStatusForELD:"","MalfunctionIndicatorStatusForELD"),//missing
				DataDiagnosticEventIndicatorStatusForDriver:csvValidateDE_7(e.DataDiagnosticEventIndicatorStatusForDriver?e.DataDiagnosticEventIndicatorStatusForDriver:"","DataDiagnosticEventIndicatorStatusForDriver")//missing
				}
			eld_array.push(obj)
		}
		ELDEventList=eld_array;
			
	}

 


 
 

//****************** End 4.8.2.1.4  *****************


//complete section missing
//****************** Start 4.8.2.1.5 ****************
  EventAnnotationsCommentsDriverLocationDescription=[];
 

 
 var tmp;
 var evnt;
for(var i=0;i<data.length;i++){
	tmp={}
	if(data[i].events)
	evnt=_.find(data[i].events,function(n){return n.EventCode===1 && n.EventType===4})
	if(!evnt)
	break
	tmp.EventSequenceIDNumber=csvValidateDE_24(evnt.EventSequenceIDNumber?evnt.EventSequenceIDNumber:"","EventSequenceIDNumber")
	tmp.ELDUsernameOfTheRecordOriginator=csvValidateDE_18(evnt.eld_username?evnt.eld_username:"","ELDUsernameOfTheRecordOriginator");
	tmp.EventCommentTextOrAnnotation=csvValidateDE_6(evnt.EventCommentTextOrAnnotation?evnt.EventCommentTextOrAnnotation:"","EventCommentTextOrAnnotation")
	tmp.EventDate=csvValidateDE_8(evnt.EventDate?evnt.EventDate:"","EventDate");
	tmp.EventTime=csvValidateDE_40(evnt.EventTime?evnt.EventTime:"","EventTime");
	tmp.DriverLocationDescription=csvValidateDE_12(evnt.DriverLocationDescription?evnt.DriverLocationDescription:"","DriverLocationDescription");
	EventAnnotationsCommentsDriverLocationDescription.push(tmp)

}


//****************** End 4.8.2.1.5  *****************


//complete section missing
//****************** Start 4.8.2.1.6 ****************
 
 ELDEventListForDriverCertificationOfOwnRecords=[];
 
 var tmp;
 var evnt;
for(var i=0;i<data.length;i++){
	tmp={}
	if(data[i].events)
	evnt=_.find(data[i].events,function(n){return n.EventCode===1 && n.EventType===4})
	if(!evnt)
	break
	tmp.EventSequenceIDNumber=csvValidateDE_24(evnt.EventSequenceIDNumber?evnt.EventSequenceIDNumber:"","EventSequenceIDNumber")
	tmp.EventCode=csvValidateDE_20(evnt.EventCode?evnt.EventCode:"","EventCode");
	tmp.EventDate=csvValidateDE_8(evnt.EventDate?evnt.EventDate:"","EventDate");
	tmp.EventTime=csvValidateDE_40(evnt.EventTime?evnt.EventTime:"","EventTime");
	tmp.DateOfTheCertifiedRecord=csvValidateDE_8(evnt.DateOfTheCertifiedRecord?evnt.DateOfTheCertifiedRecord:"","DateOfTheCertifiedRecord");
	ELDEventListForDriverCertificationOfOwnRecords.push(tmp)

}

 
//complete section missing
//****************** End 4.8.2.1.6  *****************


//complete section missing
//****************** Start 4.8.2.1.7 ****************
MalfunctionAndDiagnosticEventRecords=[]
 
 
   var tmp;
 var evnt;
for(var i=0;i<data.length;i++){
	tmp={}
	if(data[i].events)
	evnt=_.find(data[i].events,function(n){return (n.EventCode===1 || n.EventCode===2) && n.EventType===7})
	if(!evnt)
	break
	tmp.EventSequenceIDNumber=csvValidateDE_24(evnt.EventSequenceIDNumber?evnt.EventSequenceIDNumber:"","EventSequenceIDNumber")
	tmp.EventCode=csvValidateDE_20(evnt.EventCode?evnt.EventCode:"","EventCode");
	tmp.MalfunctionDiagnosticCode=csvValidateDE_34(evnt.MalfunctionDiagnosticCode?evnt.MalfunctionDiagnosticCode:"","MalfunctionDiagnosticCode");
	tmp.EventDate=csvValidateDE_8(evnt.EventDate?evnt.EventDate:"","EventDate");
	tmp.EventTime=csvValidateDE_40(evnt.EventTime?evnt.EventTime:"","EventTime");
	tmp.TotalVehicleMiles=csvValidateDE_43(evnt.vehicle_miles?evnt.vehicle_miles:"","vehicle_miles");
	tmp.TotalEngineHours=csvValidateDE_19(evnt.engine_hours?evnt.engine_hours:"","engine_hours");
	tmp.CorrespondingCMVOrderNumber=csvValidateDE_19(evnt.CorrespondingCMVOrderNumber?evnt.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber");
	MalfunctionAndDiagnosticEventRecords.push(tmp)

}

//****************** End 4.8.2.1.7  *****************
//complete section missing

//****************** Start 4.8.2.1.8 ****************
ELDLoginLogoutReport=[]
 
  var tmp;
 var evnt;
for(var i=0;i<data.length;i++){
	tmp={}
	if(data[i].events)
	evnt=_.find(data[i].events,function(n){return (n.EventCode===1 || n.EventCode===2) && n.EventType===5})
	if(!evnt)
	break
	tmp.EventSequenceIDNumber=csvValidateDE_24(evnt.EventSequenceIDNumber?evnt.EventSequenceIDNumber:"","EventSequenceIDNumber")
	tmp.EventCode=csvValidateDE_20(evnt.EventCode?evnt.EventCode:"","EventCode");
	tmp.ELDUsername=csvValidateDE_18(evnt.eld_username?evnt.eld_username:"","eld_username");
	tmp.EventDate=csvValidateDE_8(evnt.EventDate?evnt.EventDate:"","EventDate");
	tmp.EventTime=csvValidateDE_40(evnt.EventTime?evnt.EventTime:"","EventTime");
	tmp.TotalVehicleMiles=csvValidateDE_43(evnt.vehicle_miles?evnt.vehicle_miles:"","vehicle_miles");
	tmp.TotalEngineHours=csvValidateDE_19(evnt.engine_hours?evnt.engine_hours:"","engine_hours");
	ELDLoginLogoutReport.push(tmp)

}

//****************** End 4.8.2.1.8  *****************

//complete section missing
//****************** Start 4.8.2.1.9 ****************
CMVEnginePowerUpAndShutDownActivity=[]
 
  var tmp;
 var evnt;
for(var i=0;i<data.length;i++){
	tmp={}
	if(data[i].events)
	evnt=_.find(data[i].events,function(n){return (n.EventCode===1 || n.EventCode===2) && n.EventType===5})
	if(!evnt)
	break
	tmp.EventSequenceIDNumber=csvValidateDE_24(evnt.EventSequenceIDNumber?evnt.EventSequenceIDNumber:"","EventSequenceIDNumber")
	tmp.EventCode=csvValidateDE_20(evnt.EventCode?evnt.EventCode:"","EventCode");
	tmp.EventDate=csvValidateDE_8(evnt.EventDate?evnt.EventDate:"","EventDate");
	tmp.EventTime=csvValidateDE_40(evnt.EventTime?evnt.EventTime:"","EventTime");
	tmp.TotalVehicleMiles=csvValidateDE_43(evnt.vehicle_miles?evnt.vehicle_miles:"","vehicle_miles");
	tmp.TotalEngineHours=csvValidateDE_19(evnt.engine_hours?evnt.engine_hours:"","engine_hours");
	tmp.EventLatitude=csvValidateDE_31(evnt.EventLatitude?evnt.EventLatitude:"","EventLatitude");
	tmp.EventLongitude=csvValidateDE_33(evnt.EventLongitude?evnt.EventLongitude:"","EventLongitude");
	tmp.CMVPowerUnitNumber=csvValidateDE_4(evnt.CMVPowerUnitNumber?evnt.CMVPowerUnitNumber:"","CMVPowerUnitNumber");
	tmp.CMVVIN=csvValidateDE_5(evnt.CMVVIN?evnt.CMVVIN:"","CMVVIN");
	tmp.TrailerNumber=csvValidateDE_42(evnt.TrailerNumber?evnt.TrailerNumber:"","TrailerNumber");
	tmp.ShippingDocumentNumber=csvValidateDE_39(evnt.ShippingDocumentNumber?evnt.ShippingDocumentNumber:"","ShippingDocumentNumber");
	CMVEnginePowerUpAndShutDownActivity.push(tmp)

}

//****************** End 4.8.2.1.9  *****************
 


//complete section missing
//****************** Start 4.8.2.1.10 ****************
ELDEventLogListForTheUnidentifiedDriverProfile=[]
 
 
 
   var tmp;
 var evnt;
for(var i=0;i<data.length;i++){
	tmp={}
	if(data[i].events)
	evnt=_.find(data[i].events,function(n){return (n.EventCode===1 || n.EventCode===2) && n.EventType===5})
	if(!evnt)
	break
	tmp.EventSequenceIDNumber=csvValidateDE_24(evnt.EventSequenceIDNumber?evnt.EventSequenceIDNumber:"","EventSequenceIDNumber")
	tmp.EventRecordStatus=csvValidateDE_23(evnt.csvValidateDE_23?evnt.csvValidateDE_23:"","csvValidateDE_23");
	tmp.EventRecordOrigin=csvValidateDE_22(evnt.EventRecordOrigin?evnt.EventRecordOrigin:"","EventRecordOrigin");
	tmp.EventType=csvValidateDE_25(evnt.EventType?evnt.EventType:"","EventType");
	tmp.EventCode=csvValidateDE_20(evnt.EventCode?evnt.EventCode:"","EventCode");
	tmp.EventDate=csvValidateDE_8(evnt.EventDate?evnt.EventDate:"","EventDate");
	tmp.EventTime=csvValidateDE_40(evnt.EventTime?evnt.EventTime:"","EventTime");
	tmp.AccumulatedVehicleMiles=csvValidateDE_43(evnt.AccumulatedVehicleMiles?evnt.AccumulatedVehicleMiles:"","AccumulatedVehicleMiles");
	tmp.ElapsedEngineHours=csvValidateDE_19(evnt.ElapsedEngineHours?evnt.ElapsedEngineHours:"","ElapsedEngineHours");
	tmp.EventLatitude=csvValidateDE_31(evnt.EventLatitude?evnt.EventLatitude:"","EventLatitude");
	tmp.EventLongitude=csvValidateDE_33(evnt.EventLongitude?evnt.EventLongitude:"","EventLongitude");
	tmp.DistanceSinceLastValidCoordinates=csvValidateDE_9(evnt.DistanceSinceLastValidCoordinates?evnt.DistanceSinceLastValidCoordinates:"","DistanceSinceLastValidCoordinates");
	tmp.CorrespondingCMVOrderNumber=csvValidateDE_37(evnt.CorrespondingCMVOrderNumber?evnt.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber");
	tmp.MalfunctionIndicatorStatusForELD=csvValidateDE_35(evnt.MalfunctionIndicatorStatusForELD?evnt.MalfunctionIndicatorStatusForELD:"","MalfunctionIndicatorStatusForELD");
	ELDEventLogListForTheUnidentifiedDriverProfile.push(tmp)

}


//****************** End 4.8.2.1.10  *****************
}