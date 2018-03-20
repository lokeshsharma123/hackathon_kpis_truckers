Template.company_list.helpers({
"company_list":function(){
if(Meteor.userId())
var company_list=CompanyDriverList.find({driver_id:Meteor.userId()}).fetch()
else
var company_list=CompanyDriverList.find({driver_id:Session.get("login_user")._id}).fetch()
if(company_list.length)
return company_list
}
})
Template.company_list.events({
"click .row_link":function(){
	var company_list;
if(Meteor.userId())
	company_list=CompanyDriverList.find({company_id:this.company_id,driver_id:Meteor.userId()}).fetch();
else
	company_list=CompanyDriverList.find({company_id:this.company_id,driver_id:Session.get("login_user")._id}).fetch();
if(! (company_list[0].isActive)){
	show_toast("You are already Deactivated from this Company");
	return false;
}



var route=Router.current().route.getName();
if(Session.get("CurrentDate")){
var flagRecord = DriverFlags.findOne({userId:Meteor.userId(), date: Session.get("CurrentDate").toDateString(),companyId:this.company_id});
if(flagRecord){
   
    Session.set("Data_change",flagRecord.signFlag);
}
else{
      Session.set("Data_change",false);
}
}
if(route=="dashboard_screen")
{
if(!this.company_id)
show_toast("This driver has not created his account yet.");
else
{
   
//if(!this.driver_profile.device_tracking_id)
//Router.go("/form/"+this.company_id);
//else
//{
 Session.set("isFromCompany",false);
Session.set("tabbar1_active_tab","tab1")
Session.set("senserUserId",Meteor.userId());
Session.set("companyId",this.company_id);
Session.set("company_id_to_subscribe",this.company_id);

setCompanyOffset(Session.get("companyId"));

var recordEvents= Events.find({userId:Meteor.userId(), type: 5,companyId:this.company_id,recordOrigin:2,recordStatus:1 } ,{sort:{dateTime:-1}}).fetch();
console.log(recordEvents);
if(recordEvents.length>0){
    if(recordEvents[0].code == 2){
        Blaze._globalHelpers.appLoginEvent();
    }
}
else{
      
Blaze._globalHelpers.appLoginEvent();
}

Router.go("/form/"+this.company_id);


//}
}
}
else if(route=="reports")
{
    
    if(Session.get("Data_change")){
       
    var r = confirm("Would you like to sign and certify your changes ?");
    if (r == true) {
       Session.set("tabbar1_active_tab","tab4");
       Router.go("/form/"+Session.get("company_id_to_subscribe"));
       return;
    } else {
      
    }
    }
	Session.set("isFromCompany",false);
	Session.set("tabbar1_active_tab","tab1")
	Session.set("senserUserId",Meteor.userId());
	Session.set("companyId",this.company_id);
	Session.set("company_id_to_subscribe",this.company_id);
	setCompanyOffset(this.company_id);
	Router.go("/reports/"+this.company_id);
}

}
});