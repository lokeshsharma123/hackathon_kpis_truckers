Meteor.methods({
    "getLocationData": function() {
         return (Assets.getText('city_location.json'));
	}
});