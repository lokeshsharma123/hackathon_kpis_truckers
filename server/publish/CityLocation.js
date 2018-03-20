  Meteor.publish('CityLocation', function() {
    return CityLocation.find();
  });