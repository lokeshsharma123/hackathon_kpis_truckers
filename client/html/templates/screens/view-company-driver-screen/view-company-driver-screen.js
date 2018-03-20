Template.view_company_driver.helpers({
"profile":function(){
var profile=CompanyDriverList.findOne({_id:this.company_driver_id});
if(profile)
return profile
},
"state":function(){
var profile_by_company=CompanyDriverList.findOne({_id:this.company_driver_id});
if(profile_by_company)
{
var state=StateList.findOne({_id:profile_by_company.state_id});
if(state)
return state.state
}
}
});

Template.view_company_driver.helpers({
    option: function() {
	var _this=this;
        return {
            string: function() {
                return "DEACTIVATE"
            },
            save: function() { 
			 show_loader();
			  setTimeout(function(){
			Meteor.call('deactivateCompanyDriver', _this.company_driver_id, function(err) {
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