Meteor.methods({
    AddDriver: function(obj) {
			var driver_profile=Users.findOne({'profile.driver_licence_no':obj.driver_licence_no,'profile.state_id':obj.state_id})
			if(driver_profile)
			{
			if(CompanyDriverList.findOne({company_id:Meteor.userId(),driver_id:driver_profile._id}))
			throw new Meteor.Error('Registration Error', 'The Driver Already Exists in your Company');
			driver_profile=driver_profile
			CompanyDriverList.insert({profile_by_company:obj,company_id:Meteor.userId(),driver_id:driver_profile._id,driver_licence_no:obj.driver_licence_no,state_id:obj.state_id,addedAt:new Date(),isActive:true,driver_profile:driver_profile.profile,company_profile:Users.findOne({_id:Meteor.userId()}).profile})
			}
			else{
			if(CompanyDriverList.findOne({company_id:Meteor.userId(),driver_licence_no:obj.driver_licence_no,state_id:obj.state_id}))
			throw new Meteor.Error('Registration Error', 'The Driver Already Exists in your Company');
			CompanyDriverList.insert({profile_by_company:obj,company_id:Meteor.userId(),driver_licence_no:obj.driver_licence_no,state_id:obj.state_id,addedAt:new Date(),isActive:true,company_profile:Users.findOne({_id:Meteor.userId()}).profile})
			}
			/*var profile=Users.findOne({_id:Meteor.userId()}).profile
			if(!profile.drivers)
				profile.drivers=[]
        	profile.drivers.push({driver_licence_no:obj.driver_licence_no,state_id:obj.state_id,addedAt:new Date(),driver_profile:driver_profile})
			Meteor.users.update(Meteor.userId(), {$set: {profile: profile}})
*/
  
  }
});
