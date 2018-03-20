Meteor.methods({
    "insertFormDocument": function(obj) {
	 var path_array=[];
	 obj.userid=Meteor.userId();
	obj.timestamp=new Date();
	obj.date=obj.date_of_entry.toDateString();
	  return FormDocument.insert(obj);
	}

});
