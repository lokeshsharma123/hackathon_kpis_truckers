CR="<br>";
Template.csv_screen.events({
"click .btn2":function(e,tpl){
/*
if (Meteor.isCordova) {
document.addEventListener("deviceready", function(){
window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(dir) {
	dir.getFile("myfile.txt", {create:true}, function(fileEntry) {
            // The file has been succesfully created. Use fileEntry to read the content or delete the file
	});
});
});
}
*/
},
"click .btn1":function(e,tpl){


//============================================================================================
var data=Session.get("reportData")



//****************** Start 4.8.2.1.1 ****************
DriverLastName=csvValidateDE_30(data[0].user?data[0].user.last_name:"","DriverLastName")
DriverFirstName=csvValidateDE_28(data[0].user?data[0].user.first_name:"","DriverFirstName")
/*adjusted*/ELDUsernameForDriver=csvValidateDE_18(data[0].user?data[0].user.username:"","ELDUsernameForDriver")
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var state
if(data[0].cdp)
state=StateList.findOne({_id:data[0].cdp.state_id})
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
DriverLicenseIssuingState=csvValidateDE_10(data[0].cdp?data[0].cdp.driver_profile.state_name.split("(")[0]:"","DriverLicenseIssuingState")
DriverLicenseNumber=csvValidateDE_11(data[0].cdp?data[0].cdp.driver_licence_no:"","DriverLicenseNumber")

CoDriverLastName=csvValidateDE_30(data[0].form?data[0].form.co_drivers.split(" ")[1]:"","CoDriverLastName")
CoDriverFirstName=csvValidateDE_28(data[0].form?data[0].form.co_drivers.split(" ")[0]:"","CoDriverFirstName")
ELDUsernameForCoDriver=csvValidateDE_18(data[0].form?data[0].form.co_drivers.split(" ")[0]:"","ELDUsernameForCoDriver")//doubt

CMVPowerUnitNumber=csvValidateDE_4(data[0].dvir?data[0].dvir.vehicle_no:"","CMVPowerUnitNumber");//missing
CMVVIN=csvValidateDE_5(data[0].dvir?data[0].dvir.vin_no:"","CMVVIN");//missing
var trailer_no1=data[0].dvir?data[0].dvir.trailer_no:"";
var trailer_no2=data[0].dvir?data[0].dvir.trailer_no2:"";
var trailer_no3=data[0].dvir?data[0].dvir.trailer_no3:"";
var trailNumber=trailer_no1+" "+trailer_no2+" "+trailer_no3;
TrailerNumber=csvValidateDE_42(trailNumber.trim()?trailNumber.trim():"","TrailerNumber")

CarrierUSDOTNumber=csvValidateDE_3(data[0].cdp?data[0].cdp.company_profile.usdot_no:"","CarrierUSDOTNumber")//missing
CarrierName=csvValidateDE_2(data[0].cdp?data[0].cdp.company_profile.company_name:"","CarrierName")
MultidayBasisUsed=csvValidateDE_36(data[0].cdp?data[0].cdp.company_profile.day:"","MultidayBasisUsed")//missing
TwentyFourHourPeriodStartingTime=csvValidateDE_1("000000","TwentyFourHourPeriodStartingTime")//missing
TimeZoneOffsetFromUTC=csvValidateDE_41("","TimeZoneOffsetFromUTC")//doubt

ShippingDocumentNumber=csvValidateDE_39(data[0].form?data[0].form.shipping_documents:"","ShippingDocumentNumber")//doubt
ExemptDriverConfiguration=csvValidateDE_26(data[0].cdp?data[0].cdp.profile_by_company.exempt_driver_configuration:"","ExemptDriverConfiguration")

Current_Date=csvValidateDE_8(getDate(),"Current_Date")
Current_Time=csvValidateDE_40(getTime(),"Current_Time");
var latitude1,longitude1;
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (p) {
// 		latitude1=Math.round(p.coords.latitude*1000)/1000;
// 		longitude1=Math.round(p.coords.longitude*1000)/1000;
       
        
//     });
// } 



if(data[0].events)
vehicleMiles=_.find(data[0].events,function(n){return n.vehicleMiles})


latitude1=Math.round(_lat.current*1000)/1000;
longitude1=Math.round(_lon.current*1000)/1000;
console.log("in csv screen:"+_lat.current);
console.log("in csv screen2:"+_lon.current);
CurrentLatitude=csvValidateDE_31(latitude1?latitude1:"","CurrentLatitude")//missing
CurrentLongitude=csvValidateDE_33(longitude1?longitude1:"","CurrentLongitude")//missing
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
	tmp.AssignedUserOrderNumber=i+1;
	tmp.UserELDAccountType='D';
	tmp.UserLastName=DriverLastName;
	tmp.UserFirstName=DriverFirstName;
	UserList.push(tmp)
	
	tmp={}
	
	tmp.AssignedUserOrderNumber=i+2;
	tmp.UserELDAccountType='S';
	tmp.UserLastName=data[i].form?data[i].form.co_drivers.split(" ")[1]:"";
	tmp.UserFirstName=data[i].form?data[i].form.co_drivers.split(" ")[0]:"";;
	UserList.push(tmp)
}
 

//****************** End 4.8.2.1.2  *****************


//****************** Start 4.8.2.1.3 ****************


CMVList=[];
if(data[0].CMVList && data[0].CMVList.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].CMVList.length;i++)
		{
			var e=data[0].CMVList[i]

		
			obj={
				AssignedCMVOrderNumber:i+1,//missing
				CMVPowerUnitNumber:csvValidateDE_4(e.vehicle_no?e.vehicle_no:"","CMVPowerUnitNumber"),//missing
				CMVVIN:csvValidateDE_5(e.vin_no?e.vin_no:"","CMVVIN")}
			eld_array.push(obj)
		
		}
		CMVList=eld_array;
			
	}
 

//****************** End 4.8.2.1.3  *****************


//****************** Start 4.8.2.1.4 ****************

ELDEventList=[]
if(data[0].events && data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]

			if(e.eventType==1||e.eventType==2||e.eventType==3)
		{
			var latitude1=Math.round(e.latitude.current*1000)/1000;
			var longitude1=Math.round(e.longitude.current*1000)/1000;
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
				EventRecordStatus:csvValidateDE_23(e.recordStatus?e.recordStatus:"","EventRecordStatus"),
				EventRecordOrigin:csvValidateDE_22(e.recordOrigin?e.recordOrigin:"","EventRecordOrigin"),
				EventType:csvValidateDE_25(e.eventType?e.eventType:"","EventType"),
				EventCode:csvValidateDE_20(e.eventCode?e.eventCode:"","EventCode"),
				EventDate:csvValidateDE_8(e.date?getDate(e.date):"","EventDate"),
				EventTime:csvValidateDE_40(e.time?getTime(e.time):"","EventTime"),
				AccumulatedVehicleMiles:csvValidateDE_43(e.vehicleMiles?e.vehicleMiles:"","AccumulatedVehicleMiles"),
				ElapsedEngineHours:csvValidateDE_19(e.engineHour?e.engineHour:"","ElapsedEngineHours"),
				EventLatitude:csvValidateDE_31(e.latitude?latitude1:"","EventLatitude"),
				EventLongitude:csvValidateDE_33(e.longitude?longitude1:"","EventLongitude"),
				DistanceSinceLastValidCoordinates:csvValidateDE_9(e.DistanceSinceLastValidCoordinates?e.DistanceSinceLastValidCoordinates:"","DistanceSinceLastValidCoordinates"),//missing
				CorrespondingCMVOrderNumber:csvValidateDE_37(e.CorrespondingCMVOrderNumber?e.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber"),//missing
				UserOrderNumberForRecordOriginator:csvValidateDE_37(e.UserOrderNumberForRecordOriginator?e.UserOrderNumberForRecordOriginator:"","UserOrderNumberForRecordOriginator"),//missing
				MalfunctionIndicatorStatusForELD:csvValidateDE_35(e.MalfunctionIndicatorStatusForELD?e.MalfunctionIndicatorStatusForELD:"","MalfunctionIndicatorStatusForELD"),//missing
				DataDiagnosticEventIndicatorStatusForDriver:csvValidateDE_7(e.DataDiagnosticEventIndicatorStatusForDriver?e.DataDiagnosticEventIndicatorStatusForDriver:"","DataDiagnosticEventIndicatorStatusForDriver")//missing
				}
			eld_array.push(obj)
		}
		}
		ELDEventList=eld_array;
			
	}

 


 
 

//****************** End 4.8.2.1.4  *****************


//complete section missing
//****************** Start 4.8.2.1.5 ****************
  EventAnnotationsCommentsDriverLocationDescription=[];
 

 
 var tmp;
 var evnt;
	/* for (var i = 0; i < data.length; i++) {
		tmp = {}
		if (data[i].events)
			evnt = _.find(data[i].events, function (n) { return n.EventCode === 1 && n.EventType === 4 })
		if (!evnt)
			break
		tmp.EventSequenceIDNumber = csvValidateDE_24(evnt.EventSequenceIDNumber ? evnt.EventSequenceIDNumber : "", "EventSequenceIDNumber")
		tmp.ELDUsernameOfTheRecordOriginator = csvValidateDE_18(evnt.eld_username ? evnt.eld_username : "", "ELDUsernameOfTheRecordOriginator");
		tmp.EventCommentTextOrAnnotation = csvValidateDE_6(evnt.EventCommentTextOrAnnotation ? evnt.EventCommentTextOrAnnotation : "", "EventCommentTextOrAnnotation")
		tmp.EventDate = csvValidateDE_8(evnt.EventDate ? evnt.EventDate : "", "EventDate");
		tmp.EventTime = csvValidateDE_40(evnt.EventTime ? evnt.EventTime : "", "EventTime");
		tmp.DriverLocationDescription = csvValidateDE_12(evnt.DriverLocationDescription ? evnt.DriverLocationDescription : "", "DriverLocationDescription");
		EventAnnotationsCommentsDriverLocationDescription.push(tmp)

	} */

	if(data[0].events && data[0].events.length){
		var obj={}
		var eld_array=[]
			for(var i=0;i<data[0].events.length;i++)
			{
				var e=data[0].events[i]
	
				if(e.eventType==1||e.eventType==2||e.eventType==3)
			{
				obj={
					EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
					EventCommentTextOrAnnotation:csvValidateDE_6(e.comment?e.comment:"","EventCommentTextOrAnnotation"),
					ELDUsernameOfTheRecordOriginator:csvValidateDE_18(e.userId?e.userId:"","EventRecordOrigin"),
					EventDate:csvValidateDE_8(e.date?getDate(e.date):"","EventDate"),
					EventTime:csvValidateDE_40(e.time?getTime(e.time):"","EventTime"),
					DriverLocationDescription:csvValidateDE_12(e.location?e.location:"","DriverLocationDescription")
					}
				eld_array.push(obj)
			}
			}
			EventAnnotationsCommentsDriverLocationDescription=eld_array;
				
		}
	
	
//****************** End 4.8.2.1.5  *****************


//complete section missing
//****************** Start 4.8.2.1.6 ****************
 
 ELDEventListForDriverCertificationOfOwnRecords=[];
 
 if(data[0].events && data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]

			if(e.eventType==4)
		{
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
				EventCode:csvValidateDE_20(e.eventCode ? e.eventCode : "", "EventCode"),
				EventDate:csvValidateDE_8(e.eventDate?getDate(e.eventDate):"","EventDate"),
				EventTime:csvValidateDE_40(e.eventTime?getTime(e.eventTime):"","EventTime"),
				DateOfTheCertifiedRecord:csvValidateDE_8(e.DateOfTheCertifiedRecord ? e.DateOfTheCertifiedRecord : "", "DateOfTheCertifiedRecord"),
				CorrespondingCMVOrderNumber:csvValidateDE_37(e.CorrespondingCMVOrderNumber?e.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber")//missing
				}
			eld_array.push(obj)
		}
		}
		ELDEventListForDriverCertificationOfOwnRecords=eld_array;
			
	}

//complete section missing
//****************** End 4.8.2.1.6  *****************


//complete section missing
//****************** Start 4.8.2.1.7 ****************
MalfunctionAndDiagnosticEventRecords=[]
 
if(data[0].events && data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]

			if(e.eventType==7)
		{
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
				EventCode:csvValidateDE_20(e.eventCode?e.eventCode:"","EventCode"),
				MalfunctionDiagnosticCode:csvValidateDE_34(e.malfunctionCode?e.malfunctionCode:"","MalfunctionDiagnosticCode"),
				EventDate:csvValidateDE_8(e.date?getDate(e.date):"","EventDate"),
				EventTime:csvValidateDE_40(e.time?getTime(e.time):"","EventTime"),
				TotalVehicleMiles:csvValidateDE_43(e.vehicleMiles?e.vehicleMiles:"","vehicleMiles"),
				TotalEngineHours:csvValidateDE_19(e.engineHour?e.engineHour:"","engineHour"),
				CorrespondingCMVOrderNumber:csvValidateDE_19(e.CorrespondingCMVOrderNumber?e.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber")
				}
			eld_array.push(obj)
		}
		}
		MalfunctionAndDiagnosticEventRecords=eld_array;
			
	}

//****************** End 4.8.2.1.7  *****************
//complete section missing

//****************** Start 4.8.2.1.8 ****************
ELDLoginLogoutReport=[]


if(data[0].events && data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]

			if(e.eventType==5)
		{
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
				EventCode:csvValidateDE_20(e.eventCode?e.eventCode:"","EventCode"),
				ELDUsername:csvValidateDE_18(e.eld_username?e.eld_username:"","eld_username"),
				EventDate:csvValidateDE_8(e.date?getDate(e.date):"","EventDate"),
				EventTime:csvValidateDE_40(e.time?getTime(e.time):"","EventTime"),
				TotalVehicleMiles:csvValidateDE_43(e.vehicleMiles?e.vehicleMiles:"","vehicleMiles"),
				TotalEngineHours:csvValidateDE_19(e.engineHour?e.engineHour:"","engineHour")
				}
			eld_array.push(obj)
		}
		}
		ELDLoginLogoutReport=eld_array;
			
	}

//****************** End 4.8.2.1.8  *****************

//complete section missing
//****************** Start 4.8.2.1.9 ****************
CMVEnginePowerUpAndShutDownActivity=[]
 
if(data[0].events && data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]

			if(e.eventType==6)  	 	
		{
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
				EventCode:csvValidateDE_20(e.eventCode?e.eventCode:"","EventCode"),
				EventDate:csvValidateDE_8(e.date?getDate(e.date):"","EventDate"),
				EventTime:csvValidateDE_40(e.time?getTime(e.time):"","EventTime"),
				TotalVehicleMiles:csvValidateDE_43(e.vehicleMiles?e.vehicleMiles:"","vehicleMiles"),
				TotalEngineHours:csvValidateDE_19(e.engineHour?e.engineHour:"","engineHour"),
				EventLatitude:csvValidateDE_31(e.latitude?e.latitude.current:"","EventLatitude"),
				EventLongitude:csvValidateDE_33(e.longitude?e.longitude.current:"","EventLongitude"),
				CMVPowerUnitNumber:csvValidateDE_4("","CMVPowerUnitNumber"),//missing
				TrailerNumber:csvValidateDE_42(trailNumber.trim()?trailNumber.trim():"","TrailerNumber"),
				ShippingDocumentNumber:csvValidateDE_39(data[0].form?data[0].form.shipping_documents:"","ShippingDocumentNumber")
				
				}
			eld_array.push(obj)
		}
		}
		CMVEnginePowerUpAndShutDownActivity=eld_array;
			
	}



//****************** End 4.8.2.1.9  *****************
 


//complete section missing
//****************** Start 4.8.2.1.10 ****************
ELDEventLogListForTheUnidentifiedDriverProfile=[]
if(data[0].events && data[0].events.length){
	var obj={}
	var eld_array=[]
		for(var i=0;i<data[0].events.length;i++)
		{
			var e=data[0].events[i]

			//if(e.eventType==1||e.eventType==2||e.eventType==6)
			if(e.userId == 0)
		{
			obj={
				EventSequenceIDNumber:csvValidateDE_24(e.seqId?e.seqId:(e.seqId==0?"0":""),"EventSequenceIDNumber"),
				EventRecordStatus:csvValidateDE_23(e.recordStatus?e.recordStatus:"","EventRecordStatus"),
				EventRecordOrigin:csvValidateDE_22(e.recordOrigin?e.recordOrigin:"","EventRecordOrigin"),
				EventType:csvValidateDE_25(e.eventType?e.eventType:"","EventType"),
				EventCode:csvValidateDE_20(e.eventCode?e.eventCode:"","EventCode"),
				EventDate:csvValidateDE_8(e.date?getDate(e.date):"","EventDate"),
				EventTime:csvValidateDE_40(e.time?getTime(e.time):"","EventTime"),
				EventCode:csvValidateDE_20(e.eventCode?e.eventCode:"","EventCode"),
				EventDate:csvValidateDE_8(e.date?e.date:"","EventDate"),
				EventTime:csvValidateDE_40(e.time?e.time:"","EventTime"),
				TotalVehicleMiles:csvValidateDE_43(e.vehicleMiles?e.vehicleMiles:"","vehicleMiles"),
				TotalEngineHours:csvValidateDE_19(e.engineHour?e.engineHour:"","engineHour"),
				EventLatitude:csvValidateDE_31(e.latitude?e.latitude.current:"","EventLatitude"),
				EventLongitude:csvValidateDE_33(e.longitude?e.longitude.current:"","EventLongitude"),
				CorrespondingCMVOrderNumber:csvValidateDE_37(e.CorrespondingCMVOrderNumber?e.CorrespondingCMVOrderNumber:"","CorrespondingCMVOrderNumber"),//missing
				MalfunctionIndicatorStatusForELD:csvValidateDE_35(e.malfunctionCode?e.malfunctionCode:"","MalfunctionIndicatorStatusForELD"),//missing
				DistanceSinceLastValidCoordinates:csvValidateDE_9(e.DistanceSinceLastValidCoordinates?e.DistanceSinceLastValidCoordinates:"","DistanceSinceLastValidCoordinates"),//missing
				}
			eld_array.push(obj)
		}
		}
		ELDEventLogListForTheUnidentifiedDriverProfile=eld_array;
			
	}
 


//****************** End 4.8.2.1.10  *****************


//============================================================================================


var csv_string="ELD File Header Segment:"+CR;
var str="";
var str1="";
var str2="";
var lineDataCheckArray=[];


/********************** 4.8.2.1.1 ***************************************/
str=clean(DriverLastName)+","+clean(DriverFirstName)+","+clean(ELDUsernameForDriver)
		+","+clean(DriverLicenseIssuingState)+","+clean(DriverLicenseNumber);
	var ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);


str=clean(CoDriverLastName)+","+clean(CoDriverFirstName)+","+clean(ELDUsernameForCoDriver)

ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);


str=clean(CMVPowerUnitNumber)+","+clean(CMVVIN)+","+clean(TrailerNumber)

ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);

 

str=clean(CarrierUSDOTNumber)+","+clean(CarrierName)+","+clean(MultidayBasisUsed)
	+","+clean(TwentyFourHourPeriodStartingTime)+","+clean(TimeZoneOffsetFromUTC)
	

ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);



str=clean(ShippingDocumentNumber)+","+clean(ExemptDriverConfiguration)

ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);




str=clean(Current_Date)+","+clean(Current_Time)+","+clean(CurrentLatitude)+","+clean(CurrentLongitude)
	+","+clean(CurrentTotalVehicleMiles)+","+clean(CurrentTotalEngineHours)
	
ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);




str=clean(ELDRegistrationID)+","+clean(ELDIdentifier)
	+","+clean(ELDAuthenticationValue)+","+clean(OutputFileComment)
ldc=getLineDataCheck(str);	
csv_string=csv_string+str+","+ldc+CR;
lineDataCheckArray.push(ldc);


/****************28****** end 4.8.2.1.1 ***************************************/


/********************** start 4.8.2.1.2***************************************/

str="User List:"+CR
for(var i=0;i<UserList.length;i++)
{
 
str1=clean(UserList[i].AssignedUserOrderNumber)+","+clean(UserList[i].UserELDAccountType)+","+clean(UserList[i].UserLastName)
		+","+clean(UserList[i].UserFirstName)	
ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);
}		
csv_string=csv_string+str+str2
str2="";

/********************** end 4.8.2.1.2 ***************************************/

/********************** start 4.8.2.1.3***************************************/

str="CMV List:"+CR
for(var i=0;i<CMVList.length;i++)
{
str1=clean(CMVList[i].AssignedCMVOrderNumber)+","+clean(CMVList[i].CMVPowerUnitNumber)+","
	+clean(CMVList[i].CMVVIN)
ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);


}		
csv_string=csv_string+str+str2
str2="";
/********************** end 4.8.2.1.3 ***************************************/

/********************** start 4.8.2.1.4***************************************/

str="ELD Event List:"+CR
for(var i=0;i<ELDEventList.length;i++)
{
str1=clean(ELDEventList[i].EventSequenceIDNumber)+","+clean(ELDEventList[i].EventRecordStatus)
	+","+clean(ELDEventList[i].EventRecordOrigin)+","+clean(ELDEventList[i].EventType)
	+","+clean(ELDEventList[i].EventCode)+","+clean(ELDEventList[i].EventDate)
	+","+clean(ELDEventList[i].EventTime)+","+clean(ELDEventList[i].AccumulatedVehicleMiles)
	+","+clean(ELDEventList[i].ElapsedEngineHours)+","+clean(ELDEventList[i].EventLatitude)
	+","+clean(ELDEventList[i].EventLongitude)+","+clean(ELDEventList[i].DistanceSinceLastValidCoordinates)
	+","+clean(ELDEventList[i].CorrespondingCMVOrderNumber)+","+clean(ELDEventList[i].UserOrderNumberForRecordOriginator)
	+","+clean(ELDEventList[i].MalfunctionIndicatorStatusForELD)+","+clean(ELDEventList[i].DataDiagnosticEventIndicatorStatusForDriver)
//-------------------------------------------------------------------------

var EventType=clean(ELDEventList[i].EventType);
var EventCode=clean(ELDEventList[i].EventCode);
var EventDate=clean(ELDEventList[i].EventDate);
var EventTime=clean(ELDEventList[i].EventTime);
var VehicleMiles=clean(ELDEventList[i].AccumulatedVehicleMiles);
var EngineHours=clean(ELDEventList[i].ElapsedEngineHours);
var EventLatitude=clean(ELDEventList[i].EventLatitude);
var EventLongitude=clean(ELDEventList[i].EventLongitude);
var CmvNumber=clean(ELDEventList[i].CorrespondingCMVOrderNumber);
var EldUsername=clean(ELDUsernameForDriver);
var dstr=EventType+EventCode+EventDate+EventTime+VehicleMiles+EngineHours+
		+EventLatitude+EventLongitude+CmvNumber+EldUsername
//-------------------------------------------------------------------------

ldc=getLineDataCheck(str1+getEventDataCheck(dstr));	
str2=str2+str1+","+getEventDataCheck(dstr)+","+ldc+CR;
lineDataCheckArray.push(ldc);
}		
csv_string=csv_string+str+str2
str2="";
/********************** end 4.8.2.1.4 ***************************************/


/********************** start 4.8.2.1.5***************************************/
//EventAnnotationsCommentsDriverLocationDescription=[]
str="ELD Event Annotations or Comments:"+CR
for(var i=0;i<EventAnnotationsCommentsDriverLocationDescription.length;i++)
{
str1=clean(EventAnnotationsCommentsDriverLocationDescription[i].EventSequenceIDNumber)
	+","+clean(EventAnnotationsCommentsDriverLocationDescription[i].ELDUsernameOfTheRecordOriginator)
	+","+clean(EventAnnotationsCommentsDriverLocationDescription[i].EventCommentTextOrAnnotation)
	+","+clean(EventAnnotationsCommentsDriverLocationDescription[i].EventDate)
	+","+clean(EventAnnotationsCommentsDriverLocationDescription[i].EventTime)
	+","+clean(EventAnnotationsCommentsDriverLocationDescription[i].DriverLocationDescription)

ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);	

}		
csv_string=csv_string+str+str2
str2="";

/********************** end 4.8.2.1.5 ***************************************/


/********************** start 4.8.2.1.6***************************************/
 
str="Driver's Certification/Recertification Actions:"+CR
for(var i=0;i<ELDEventListForDriverCertificationOfOwnRecords.length;i++)
{
str1=clean(ELDEventListForDriverCertificationOfOwnRecords[i].EventSequenceIDNumber)
	+","+clean(ELDEventListForDriverCertificationOfOwnRecords[i].EventCode)
	+","+clean(ELDEventListForDriverCertificationOfOwnRecords[i].EventDate)
	+","+clean(ELDEventListForDriverCertificationOfOwnRecords[i].EventTime)
	+","+clean(ELDEventListForDriverCertificationOfOwnRecords[i].DateOfTheCertifiedRecord)
	+","+clean(ELDEventListForDriverCertificationOfOwnRecords[i].CorrespondingCMVOrderNumber)
ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);

}		
csv_string=csv_string+str+str2
str2="";
 
/********************** end 4.8.2.1.6 ***************************************/


/********************** start 4.8.2.1.7***************************************/
 
str="Malfunctions and Data Diagnostic Events:"+CR
for(var i=0;i<MalfunctionAndDiagnosticEventRecords.length;i++)
{
str1=clean(MalfunctionAndDiagnosticEventRecords[i].EventSequenceIDNumber)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].EventCode)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].MalfunctionDiagnosticCode)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].EventDate)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].EventTime)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].TotalVehicleMiles)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].TotalEngineHours)
	+","+clean(MalfunctionAndDiagnosticEventRecords[i].CorrespondingCMVOrderNumber)
ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);

}		
csv_string=csv_string+str+str2
str2="";
 
/********************** end 4.8.2.1.7 ***************************************/


/********************** start 4.8.2.1.8***************************************/
 
str="ELD Login/Logout Report:"+CR
for(var i=0;i<ELDLoginLogoutReport.length;i++)
{
str1=clean(ELDLoginLogoutReport[i].EventSequenceIDNumber)
	+","+clean(ELDLoginLogoutReport[i].EventCode)
	+","+clean(ELDLoginLogoutReport[i].ELDUsername)
	+","+clean(ELDLoginLogoutReport[i].EventDate)
	+","+clean(ELDLoginLogoutReport[i].EventTime)
	+","+clean(ELDLoginLogoutReport[i].TotalVehicleMiles)
	+","+clean(ELDLoginLogoutReport[i].TotalEngineHours)
ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);

}		
csv_string=csv_string+str+str2
str2="";
 
/********************** end 4.8.2.1.8 ***************************************/


/********************** start 4.8.2.1.9***************************************/
 
str="CMV Engine Power-Up and Shut Down Activity:"+CR
for(var i=0;i<CMVEnginePowerUpAndShutDownActivity.length;i++)
{
str1=clean(CMVEnginePowerUpAndShutDownActivity[i].EventSequenceIDNumber)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].EventCode)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].EventDate)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].EventTime)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].TotalVehicleMiles)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].TotalEngineHours)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].EventLatitude)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].EventLongitude)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].CMVPowerUnitNumber)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].CMVVIN)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].TrailerNumber)
	+","+clean(CMVEnginePowerUpAndShutDownActivity[i].ShippingDocumentNumber)
ldc=getLineDataCheck(str1);	
str2=str2+str1+","+ldc+CR;
lineDataCheckArray.push(ldc);

}		
csv_string=csv_string+str+str2
str2="";
 
/********************** end 4.8.2.1.9 ***************************************/


/********************** start 4.8.2.1.10***************************************/

str="Unidentified Driver Profile Records:"+CR
 
for(var i=0;i<ELDEventLogListForTheUnidentifiedDriverProfile.length;i++)
{
str1=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventSequenceIDNumber)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventRecordStatus)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventRecordOrigin)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventType)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventCode)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventDate)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventTime)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].AccumulatedVehicleMiles)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].ElapsedEngineHours)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventLatitude)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventLongitude)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].DistanceSinceLastValidCoordinates)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].CorrespondingCMVOrderNumber)
	+","+clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].MalfunctionIndicatorStatusForELD)
	
//-------------------------------------------------------------------------
var EventType=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventType);
var EventCode=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventCode);
var EventDate=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventDate);
var EventTime=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventTime);
var VehicleMiles=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].AccumulatedVehicleMiles);
var EngineHours=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].ElapsedEngineHours);
var EventLatitude=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventLatitude);
var EventLongitude=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].EventLongitude);
var CmvNumber=clean(ELDEventLogListForTheUnidentifiedDriverProfile[i].CorrespondingCMVOrderNumber);
var EldUsername=clean(Session.get("ELDUsername"));
var dstr=EventType+EventCode+EventDate+EventTime+VehicleMiles+EngineHours+
		+EventLatitude+EventLongitude+CmvNumber+EldUsername
//-------------------------------------------------------------------------

ldc=getLineDataCheck(str1+getEventDataCheck(dstr));	
str2=str2+str1+","+getEventDataCheck(dstr)+","+ldc+CR;
lineDataCheckArray.push(ldc);

}		
csv_string=csv_string+str+str2
str2="";
 
/********************** end 4.8.2.1.10 ***************************************/


/********************** start 4.8.2.1.11 ***************************************/
var sum=addHex(lineDataCheckArray);
str="End of File:"+CR

str=str+getFileDataCheck(sum)+CR

csv_string=csv_string+str
/********************** end 4.8.2.1.11 ***************************************/
document.getElementById("div").innerHTML=csv_string;
Session.set("csv_string",csv_string);
 
}
})

Template.csv_screen.helpers({
"csv_string":function(){
return Session.get("csv_string");
},
"error_list":function(){
return Session.get("csv_error_array")
}
 
})
