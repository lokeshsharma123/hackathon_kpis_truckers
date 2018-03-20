Meteor.methods({
    removeDVIRTrailerDefect: function(_id) {
        return  DVIRTrailerDefect.remove({_id:_id})
    }
});
