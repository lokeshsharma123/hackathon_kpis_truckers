Template.layout.onRendered(function() {
    $(document).ready(function() {
        $('.modal-trigger').modal({dismissible: false});
    });
	
})
Template.layout.helpers({
"profile":function(){
var profile = {type:""};
if(Users.findOne())
return Users.findOne().profile
else
	return profile;
}

});
Template.layout.helpers({
"isloginpage":function(){
		var current_route = Router.current().route.getName();
        var allowed = false;
        var arr = allowed_path_array;
        if (_.indexOf(arr, current_route) > -1)
            return true;
		else
		return
		false
	},
security_check:function(){
	var current_route=Router.current().route.getName();
	var current_user=Meteor.user();
	if(current_user)
	{
	var profile=ProfileList.findOne({type:current_user.profile.type});
	if(profile)
	{
	var routes=profile.routes
	var cond=_.find(routes,function(n){return n===current_route})
	if(cond)
	Router.go("/un-authorize-access");
	}
	}
},
    resetPassword: function() {
        return Session.get('resetPassword');
    },
    traker: function() {
        var current_route = Router.current().route.getName();
        var allowed = false;
        var arr = ['login_screen', 'forgot_password_screen', 'ResetPassword', 'register_screen'];
        if (_.indexOf(arr, current_route) > -1)
            allowed = true;
        else if (!Meteor.user() && allowed) {
            Router.go('/');

        }
    }
});
