Meteor.methods({
    editProfile: function(profile) {

	 Meteor.users.update(this.userId, {
                $set: {
                  'profile.email':profile.email,
                  'profile.company_name':profile.company_name,
                  'profile.usdot_no':profile.usdot_no,
                  'profile.mainoffice':profile.mainoffice,
                  'profile.terminal':profile.terminal,
                  'profile.phone':profile.phone,
                  'profile.cargo_type':profile.cargo_type,
                  'profile.httz':profile.httz,
                  'profile.cycle_rule':profile.cycle_rule,
                  'profile.restart':profile.restart,
                  'profile.rest_break':profile.rest_break,
                  'profile.short_haul_exception':profile.short_haul_exception
                }
            });

	 CompanyDriverList.update({company_id:{$in:[this.userId]}}, {$set:{company_profile:Users.findOne({_id:Meteor.userId()}).profile}}, {multi:true});
	return this.userId;
    }
});
