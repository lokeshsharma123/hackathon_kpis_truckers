Meteor.methods({
FetchDriverDetails: function(obj) {
var user=Meteor.users.findOne(
    {'profile.driver_licence_no':obj.driver_licence_no,
	'profile.state_id':obj.state_id
	}
  )
return user?user.profile:{}
}
});