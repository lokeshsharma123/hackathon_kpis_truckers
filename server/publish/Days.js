  Meteor.publish('Days', function() {
    return Days.find();
  });