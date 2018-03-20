Meteor.methods({
    setPassword: function(obj) {
        return  Accounts.setPassword(Meteor.userId(), obj.new_password)
    }
});
