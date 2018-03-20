//CR="\\r";
CR="<br />";


var data=Session.get("CSVData");
if(!data)
return
//****************** Start 4.8.2.1.1 ****************
DriverLastName=data[0].form?data[0].form.driver.split(" ")[0]:"null"
DriverFirstName=data[0].form?data[0].form.driver.split(" ")[1]:"null"
ELDUsernameForDriver=data[0].user?data[0].user.email:"null"
DriverLicenseIssuingState="null"
DriverLicenseNumber="null"

CoDriverLastName="null"
CoDriverFirstName="null"
ELDUsernameForCoDriver="null"

CMVPowerUnitNumber="null";
CMVVIN="null";
TrailerNumber="null"

CarrierUSDOTNumber="null"
CarrierName="null"
MultidayBasisUsed="null"
TwentyFourHourPeriodStartingTime="null"
TimeZoneOffsetFromUTC="null"

ShippingDocumentNumber="null"
ExemptDriverConfiguration="null"

Current_Date="null"
Current_Time="null"
CurrentLatitude="null"
CurrentLongitude="null"
CurrentTotalVehicleMiles="null"
CurrentTotalEngineHours="null"

ELDRegistrationID="null"
ELDIdentifier="null"
ELDAuthenticationValue="null"
OutputFileComment="null"


//****************** End 4.8.2.1.1  ****************



//****************** Start 4.8.2.1.2 ****************

UserList=[
{
AssignedUserOrderNumber:"null",
UserELDAccountType:"null",
UserLastName:"null",
UserFirstName:"null"
},
{
AssignedUserOrderNumber:"null",
UserELDAccountType:"null",
UserLastName:"null",
UserFirstName:"null"
}]

 

//****************** End 4.8.2.1.2  *****************


//****************** Start 4.8.2.1.3 ****************

CMVList=[
{
AssignedCMVOrderNumber:"null",
CMVPowerUnitNumber:"null",
CMVVIN:"null"
},
{
AssignedCMVOrderNumber:"null",
CMVPowerUnitNumber:"null",
CMVVIN:"null"
}]

 

//****************** End 4.8.2.1.3  *****************


//****************** Start 4.8.2.1.4 ****************

ELDEventList=[
{
EventSequenceIDNumber:"null",
EventRecordStatus:"null",
EventRecordOrigin:"null",
EventType:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
AccumulatedVehicleMiles:"null",
ElapsedEngineHours:"null",
EventLatitude:"null",
EventLongitude:"null",
DistanceSinceLastValidCoordinates:"null",
CorrespondingCMVOrderNumber:"null",
UserOrderNumberForRecordOriginator:"null",
MalfunctionIndicatorStatusForELD:"null",
DataDiagnosticEventIndicatorStatusForDriver:"null"
},
{
EventSequenceIDNumber:"null",
EventRecordStatus:"null",
EventRecordOrigin:"null",
EventType:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
AccumulatedVehicleMiles:"null",
ElapsedEngineHours:"null",
EventLatitude:"null",
EventLongitude:"null",
DistanceSinceLastValidCoordinates:"null",
CorrespondingCMVOrderNumber:"null",
UserOrderNumberForRecordOriginator:"null",
MalfunctionIndicatorStatusForELD:"null",
DataDiagnosticEventIndicatorStatusForDriver:"null"
}]


 
 

//****************** End 4.8.2.1.4  *****************



//****************** Start 4.8.2.1.5 ****************
EventAnnotationsCommentsDriverLocationDescription=[
{
EventSequenceIDNumber:"null",
ELDUsernameOfTheRecordOriginator:"null",
EventCommentTextOrAnnotation:"null",
EventDate:"null",
EventTime:"null",
DriverLocationDescription:"null"
},
{
EventSequenceIDNumber:"null",
ELDUsernameOfTheRecordOriginator:"null",
EventCommentTextOrAnnotation:"null",
EventDate:"null",
EventTime:"null",
DriverLocationDescription:"null"
}]

 

//****************** End 4.8.2.1.5  *****************



//****************** Start 4.8.2.1.6 ****************
ELDEventListForDriverCertificationOfOwnRecords=[
{
EventSequenceIDNumber:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
DateOfTheCertifiedRecord:"null",
CorrespondingCMVOrderNumber:"null"
},
{
EventSequenceIDNumber:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
DateOfTheCertifiedRecord:"null",
CorrespondingCMVOrderNumber:"null"
}]

 

//****************** End 4.8.2.1.6  *****************



//****************** Start 4.8.2.1.7 ****************
MalfunctionAndDiagnosticEventRecords=[
{
EventSequenceIDNumber:"null",
EventCode:"null",
MalfunctionDiagnosticCode:"null",
EventDate:"null",
EventTime:"null",
TotalVehicleMiles:"null",
TotalEngineHours:"null",
CorrespondingCMVOrderNumber:"null"
},
{
EventSequenceIDNumber:"null",
EventCode:"null",
MalfunctionDiagnosticCode:"null",
EventDate:"null",
EventTime:"null",
TotalVehicleMiles:"null",
TotalEngineHours:"null",
CorrespondingCMVOrderNumber:"null"
}]

 

//****************** End 4.8.2.1.7  *****************


//****************** Start 4.8.2.1.8 ****************

ELDLoginLogoutReport=[
{
EventSequenceIDNumber:"null",
EventCode:"null",
ELDUsername:"null",
EventDate:"null",
EventTime:"null",
TotalVehicleMiles:"null",
TotalEngineHours:"null"
},
{
EventSequenceIDNumber:"null",
EventCode:"null",
ELDUsername:"null",
EventDate:"null",
EventTime:"null",
TotalVehicleMiles:"null",
TotalEngineHours:"null"
}]

 

//****************** End 4.8.2.1.8  *****************


//****************** Start 4.8.2.1.9 ****************
CMVEnginePowerUpAndShutDownActivity=[
{
EventSequenceIDNumber:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
TotalVehicleMiles:"null",
TotalEngineHours:"null",
EventLatitude:"null",
EventLongitude:"null",
CMVPowerUnitNumber:"null",
CMVVIN:"null",
TrailerNumber:"null",
ShippingDocumentNumber:"null"
},
{
EventSequenceIDNumber:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
TotalVehicleMiles:"null",
TotalEngineHours:"null",
EventLatitude:"null",
EventLongitude:"null",
CMVPowerUnitNumber:"null",
CMVVIN:"null",
TrailerNumber:"null",
ShippingDocumentNumber:"null"
}]

 

//****************** End 4.8.2.1.9  *****************
 



//****************** Start 4.8.2.1.10 ****************
ELDEventLogListForTheUnidentifiedDriverProfile=[
{
EventSequenceIDNumber:"null",
EventRecordStatus:"null",
EventRecordOrigin:"null",
EventType:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
AccumulatedVehicleMiles:"null",
ElapsedEngineHours:"null",
EventLatitude:"null",
EventLongitude:"null",
DistanceSinceLastValidCoordinates:"null",
CorrespondingCMVOrderNumber:"null",
MalfunctionIndicatorStatusForELD:"null"
},
{
EventSequenceIDNumber:"null",
EventRecordStatus:"null",
EventRecordOrigin:"null",
EventType:"null",
EventCode:"null",
EventDate:"null",
EventTime:"null",
AccumulatedVehicleMiles:"null",
ElapsedEngineHours:"null",
EventLatitude:"null",
EventLongitude:"null",
DistanceSinceLastValidCoordinates:"null",
CorrespondingCMVOrderNumber:"null",
MalfunctionIndicatorStatusForELD:"null"
}]

 

//****************** End 4.8.2.1.10  *****************
 