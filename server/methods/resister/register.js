Meteor.methods({
    createUserAccount: function(user) {
	 
	 console.log("enter create user");
	if(user.profile.type==="driver" && Meteor.users.findOne(
    {'profile.driver_licence_no':user.profile.driver_licence_no,
	'profile.state_id':user.profile.state_id
	}
  ))
  throw new Meteor.Error('Registration Error', 'Licence No and State Combination Already exists');
		
	if(user.profile.type==="company" && Meteor.users.findOne(
    {'profile.usdot_no':user.profile.usdot_no}
	
  ))
  throw new Meteor.Error('Registration Error', 'USDOT No. Already exists');

 console.log("validate user");
     var hour,day;
	 if(user.profile.cycle_rule)
	 {
		var cr=CycleRuleList.findOne({_id:user.profile.cycle_rule});
		if(cr && cr.rule==="USA 70HR/8DAY")
		{hour=70;day=8}
		else
		if(cr && cr.rule==="USA 60HR/7DAY")
		{hour=60;day=7}
		
	 }
	  console.log("inster into database  user");
	 user.profile.day=day;
	 user.profile.hour=hour;
user.profile.username=user.profile.email.split("@")[0]+user.profile.email.split("@")[1].split(".")[0]
	 var v= Accounts.createUser(user);
	   if(user.profile.type==="company")
	   CompanyList.insert({_id:v,company_name:user.profile.company_name})
	   if(user.profile.type==="driver")
		{	
			CompanyDriverList.update({driver_licence_no:user.profile.driver_licence_no,state_id:user.profile.state_id,isActive:true},{$set: {driver_id:v,driver_profile: user.profile}}, {multi: true});
			/*
			if(user.profile.company_id && user.profile.company_id!==null)
			{
			var profile=Users.findOne({_id:user.profile.company_id}).profile
			if(!profile.drivers)
				profile.drivers=[]
			profile.drivers.push({driver_licence_no:v,addedAt:new Date(),profile:user.profile})
			Meteor.users.update(user.profile.company_id, {$set: {profile: profile}})
			}
			*/
		}
	   return v
    }
});
