Meteor.methods({
    deactivateDriver: function(id) {
        return  CompanyDriverList.update({company_id:Meteor.userId(),driver_id:id,isActive:true},{$set: {isActive:false}});
		
    }
});
