  Meteor.publish('Data', function() {
    return Data.find();
  });