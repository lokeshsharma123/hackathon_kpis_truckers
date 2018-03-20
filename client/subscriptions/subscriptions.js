Meteor.subscribe("HTTZList");
Meteor.subscribe("UTCoffset");
Meteor.subscribe("CargoTypeList");
Tracker.autorun(function(){
if(Meteor.userId())
{
if(Session.get("company_id_to_subscribe"))
{
//Meteor.subscribe("DVIRLog",{company_id:Session.get("company_id_to_subscribe")});
DVIRLogSubsManager.subscribe("DVIRLog",{company_id:Session.get("company_id_to_subscribe")});
FormSubsManager.subscribe("Form",{company_id:Session.get("company_id_to_subscribe")});
FormDocumentSubsManager.subscribe("FormDocument",{company_id:Session.get("company_id_to_subscribe")});
DVIRVehicleDefectSubsManager.subscribe("DVIRVehicleDefect",{company_id:Session.get("company_id_to_subscribe")});
DVIRTrailerDefectSubsManager.subscribe("DVIRTrailerDefect",{company_id:Session.get("company_id_to_subscribe")});
SignSubsManager.subscribe("Sign",{company_id:Session.get("company_id_to_subscribe")});
SignLogSubsManager.subscribe("SignLog",{company_id:Session.get("company_id_to_subscribe")});
Meteor.subscribe("ProfileList");
}
Meteor.subscribe("CurrentDate");
Meteor.subscribe("CompanyDriverList");
Meteor.subscribe("DocumentCategoryList");
Meteor.subscribe("TrailerDefects");
Meteor.subscribe("TrailerDefectsList");
Meteor.subscribe("VehicleDefectsList");
Meteor.subscribe("CompanyList");
Meteor.subscribe("Truck");
}
});

Meteor.subscribe("CycleRuleList");
Meteor.subscribe("RestartRuleList");
Meteor.subscribe("RestBreakList");
Meteor.subscribe("ShortHaulExceptionList");
Meteor.subscribe("StateList");
Meteor.subscribe("Data");
Meteor.subscribe("Days");
Meteor.subscribe("Events");
Meteor.subscribe("BTlog");
Meteor.subscribe("DriverFlags");
Meteor.subscribe("CompanyTimeZone");
Meteor.subscribe("CityLocation");
Meteor.subscribe("CompanyMacAddress");

DVIRLogSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
});
FormSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
});
FormDocumentSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
});
DVIRVehicleDefectSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
});
DVIRTrailerDefectSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
}); 
SignSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
}); 
SignLogSubsManager = new SubsManager({
    cacheLimit: 14,
    expireIn: 15
}); 
