Template.facebook_login_button.events({
    "click .facebook_login_button": function() {
        Meteor.loginWithFacebook({}, function(err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }

/*            var obj = Users.findOne({ _id: Meteor.userId() });
            var email = obj.services.facebook.email;
            var first_name = obj.services.facebook.first_name;
            var last_name = obj.services.facebook.last_name;
            Users.update({ _id: Meteor.userId() }, { $set: { 'profile.email': email, 'profile.first_name': first_name, 'profile.last_name': last_name } });
*/        });
    }
})
