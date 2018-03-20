Meteor.methods({
    createNewSignature: function(obj) {
	var profile=Meteor.user().profile;
	profile.signature=obj.binaryString
	    return  Meteor.users.update(this.userId, {
                $set: {
                    
                    profile
                }
            });
    }
});
