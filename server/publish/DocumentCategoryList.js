 Meteor.publish('DocumentCategoryList', function() {
    return DocumentCategoryList.find();
  });