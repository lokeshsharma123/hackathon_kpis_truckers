Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
show_toast = function show_toast(text) {
    $("[id=toast-container]").remove();
     Materialize.toast(text, 3000);
    //alert(text)
}

show_loader = function show_loader() {
    $('#preloader_modal').modal('open');
}
hide_loader = function hide_loader() {
    $('#preloader_modal').modal('close');
}
validateEmail = function validateEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);

}
validateExpirationDate = function validateExpirationDate(str) {
if(str==="")
return false;
  return str.match(/^([0-9]{2})-([0-9]{2})-([0-9]{2})$/);
}

validatePassword = function validatePassword(password) {
    if (password == "" || password.length < 6)
        return false;
    return true;
}
validateMobile = function validateMobile(mobile) {
    if (mobile == "" || isNaN(mobile) || mobile.length !== 10)
        return false;
    return true;
}
getPrevDate = function getPrevDate(date) {
   var v=new Date(date);
   v.setDate(v.getDate()-1);
   return v
}

getNextDate = function getNextDate(date) {
   var v=new Date(date);
   v.setDate(v.getDate()+1);
   return v
}

setSignFlag = function setSignFlag(old_date,date){
  // alert(old_date+"   "+date);
 if(!Session.get("isFromCompany")){
    saveCurrentSignFlag(old_date);
    var flagRecord = DriverFlags.findOne({userId:Meteor.userId(), date: date,companyId:Session.get("company_id_to_subscribe")});
    if(flagRecord){
      
       Session.set("Data_change",flagRecord.signFlag) 
      
    }else{
      DriverFlags.insert({userId:Meteor.userId(), date: date,companyId:Session.get("company_id_to_subscribe"),signFlag: false});
      Session.set("Data_change",false); 
    }
}
}

saveCurrentSignFlag = function saveCurrentSignFlag(date){
       var flagRecord = DriverFlags.findOne({userId:Meteor.userId(), date: date,companyId:Session.get("company_id_to_subscribe")});
 if(flagRecord){
    
    DriverFlags.update({_id:flagRecord._id},{userId:Meteor.userId(), date: date,companyId:Session.get("company_id_to_subscribe"),signFlag: Session.get("Data_change")});
 }else{
   DriverFlags.insert({userId:Meteor.userId(), date: date,companyId:Session.get("company_id_to_subscribe"),signFlag: Session.get("Data_change"),signFlag: false});
 }
}
convertToNavBarDate=function convertToNavBarDate(date){
var date=moment(date).format("ddd | MMM DD")
	return date=date.toString();
}
clear_dvir_sessions=function clear_dvir_sessions(){
	 Session.set("trailer_no","")
	 Session.set("vehicle_no")
	 Session.set("trailer_defects_array",[])
	 Session.set("vehicle_defects_array",[])
}
clear_form_sessions=function clear_dvir_sessions(){
Session.set("form_resume_object","")
	 Session.set("vehicle_number","")
	 Session.set("trailer_number")
	 Session.set("shipping_documents_text","")
	 Session.set("shipping_documents",[])
	 Session.set("shipping_document_array",[])
	 Session.set("distance","")
	 Session.set("odometers","")
	 Session.set("driver","")
	 Session.set("carrier","")
	 Session.set("main_office_address","")
	 Session.set("home_terminal_address","")
	 Session.set("co_drivers","")
	 Session.set("from","")
	 Session.set("to","")
	 Session.set("notes","")
}

utcDateTime = function() {
    var d = new Date(TimeSync.serverTime());
    var utcDT = d.getTime() + (d.getTimezoneOffset() * 60000);
	return utcDT;
}


localDateTime = function(offset){
	localDate = "";
	if(!!offset){
	var utc = utcDateTime();
	var localDate = new Date(utc + (3600000*offset));
	}
	return localDate;
}

daylightUpdate = function(){
   var utc = utcDateTime();
   var today = new Date(utc);
   if (today.dst()) {
	   Session.set("daylight","daylight1");
   }
   else{
	   Session.set("daylight","daylight2");
   }
}


setCompanyOffset = function(company_Id){
	var companyDetails = CompanyTimeZone.find({companyId:company_Id}).fetch();
if(companyDetails.length > 0){
	var companyTimeZone = companyDetails[0].timeZone;
	daylightUpdate();
	var utcOffsetDetails = UTCoffset.find({daylight:Session.get("daylight"), locationID : companyTimeZone}).fetch();
	Session.set("companyLocationOffset","5.30");	
	Session.set("CurrentDate",localDateTime(Session.get("companyLocationOffset")));
}
}