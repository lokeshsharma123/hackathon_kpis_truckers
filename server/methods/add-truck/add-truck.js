Meteor.methods({
    AddTruck: function(obj) {
	obj.company_id=this.userId
	obj.isActive=true
	if(Truck.findOne({vehicle_no:obj.vehicle_no,isActive:true}))
	throw new Meteor.Error('Error', 'The Truck Already Exists in your Company');
			
			Truck.insert(obj)
			 
  }
});
