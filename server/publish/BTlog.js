  Meteor.publish('BTlog', function() {
    return BTlog.find();
  });