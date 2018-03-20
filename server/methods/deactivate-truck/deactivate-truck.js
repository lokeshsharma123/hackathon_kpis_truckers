Meteor.methods({
    deactivateTruck: function(id) {
        return  Truck.update({_id:id,isActive:true},{$set: {isActive:false}});
		
    }
});
