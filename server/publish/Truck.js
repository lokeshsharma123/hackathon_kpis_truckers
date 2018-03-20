 Meteor.publish('Truck', function() {
    return Truck.find({company_id:this.userId});
  });