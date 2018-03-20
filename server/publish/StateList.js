Meteor.publish('StateList', function() {
    return StateList.find();
  });