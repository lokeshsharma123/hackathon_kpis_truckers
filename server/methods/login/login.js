Meteor.methods({
    validate_user: function(obj) {
        return Users.findOne(obj);
    }
});
