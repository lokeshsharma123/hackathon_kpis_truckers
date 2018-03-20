Meteor.publish('CargoTypeList', function() {
    return CargoTypeList.find();
  });