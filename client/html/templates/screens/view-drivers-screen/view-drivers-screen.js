Template.view_drivers_screen.helpers({
"driver_list":function(){
var driver_list=CompanyDriverList.find({company_id:Meteor.userId()}).fetch();
if(driver_list.length>0)
return driver_list
}
});
Template.view_drivers_screen.events({
"click .row_link":function(){
//Router.go("/edit-driver/"+this.driver_id);
if(!this.driver_id)
//show_toast("This driver has not created his account yet.");
Router.go("/view-company-driver/"+this._id);
else
Router.go("/view-driver/"+this.driver_id);
Session.set("senserUserId",this.driver_id);
}
});

Template.view_drivers_screen.events({
"click [viewReport]":function(event, template){
 //   alert('');
//Router.go("/edit-driver/"+this.driver_id);
if(!this.driver_id)
//show_toast("This driver has not created his account yet.");
Router.go("/view-company-driver/"+this._id);
else{
    Session.set("isFromCompany",true);
    Session.set("senserUserId",this.driver_id);
   Router.go("/company_log_screen")  
}
event.stopPropagation();
}

});
