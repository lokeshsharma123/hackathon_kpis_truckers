Template.view_driver_screen.helpers({
"profile":function(){
var driver_profile=CompanyDriverList.findOne({company_id:Meteor.userId(),driver_id:this.driver_id});
if(driver_profile)
return driver_profile
},
"state":function(){
var driver_profile=CompanyDriverList.findOne({company_id:Meteor.userId(),driver_id:this.driver_id});
if(driver_profile)
{
driver_profile=driver_profile.driver_profile
var state=StateList.findOne({_id:driver_profile.state_id});
if(state)
return state.state
}
}
});

Template.driver_log.events({
    "click #viewLog": function (e, tpl) {
       
      
         }
    }
)

Template.view_driver_screen.helpers({
    option: function() {
	var _this=this;
        return {
            string: function() {
			var d=CompanyDriverList.findOne({driver_id:_this.driver_id})
			if(d && d.isActive)
			return "DEACTIVATE"
			else
			return " "
            },
            save: function() { 
			 show_loader();
			  setTimeout(function(){
			Meteor.call('deactivateDriver', _this.driver_id, function(err) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
						show_toast("Deactivated Successfully");
                    Router.go("/view-drivers")
		
}
                });
				},1000);
			
}
}
}
})

Template.view_driver_screen.events({
  'click #viewLog': function (event, template) {
      Session.set("isFromCompany",true);
        Session.set("senserUserId",this.driver_id);
      Session.set("companyId",Meteor.userId());
	  setCompanyOffset(Meteor.userId());

  Router.go("/company_log_screen")
  }
});