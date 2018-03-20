Template.change_password_screen.helpers({
    option: function() {
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
                var current_password = $("#current_password").val();
                 var new_password = $("#new_password").val();
                if(current_password=="" || current_password.length<6)
				{
					show_toast("Please Enter Current Password");
					$("#current_password").focus();
					return
				}
				
				if(new_password=="" || new_password.length<6)
				{
					show_toast("Please Enter New Password (min length 6)");
					$("#new_password").focus();
					return
				}
				 show_loader();
				 setTimeout(function(){
				Accounts.changePassword(current_password, new_password, function(err) {
				 hide_loader();
  if(err) {
    alert('Current Password is Wrong');
		return
  }
  show_toast("Password Changed Successfully");
  Meteor.logout();
})
				},1000);
            }
        }
    }
});

 
 