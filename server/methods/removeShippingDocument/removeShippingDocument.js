Meteor.methods({
    removeShippingDocument: function(_id) {
        return  FormDocument.remove({_id:_id})
    }
});
