 Meteor.publish('ProfileList', function(date) {
      	return ProfileList.find({type:Users.findOne({_id:this.userId}).profile.type});
	 
  });