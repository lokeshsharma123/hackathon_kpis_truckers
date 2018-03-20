 Meteor.publish('CompanyList', function() {
    return CompanyList.find();
  });