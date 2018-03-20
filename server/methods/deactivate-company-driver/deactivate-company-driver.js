Meteor.methods({
    deactivateCompanyDriver: function(id) {
        return  CompanyDriverList.update({_id:id,isActive:true},{$set: {isActive:false}});
		
    }
});
