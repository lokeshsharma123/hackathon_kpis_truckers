Meteor.methods({
    removeDVIRVehicleDefect: function(_id) {
        return  DVIRVehicleDefect.remove({_id:_id})
    }
});
