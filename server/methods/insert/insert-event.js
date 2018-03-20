Meteor.methods({
    "insert_event": function(obj) {
	
	
	  var new_obj=obj;
	var doc=Events.findOne({},{limit: 1, sort: {seqId: -1}});
	var seqId=0;
	if(doc && doc.seqId)
	seqId=doc.seqId;
	
	new_obj.seqId=seqId+1
	new_obj.EventSequenceIDNumber=seqId+1;
new_obj.userId=this.userId;
new_obj.eld_username=Users.findOne({_id:this.userId}).profile.username
new_obj.date=new Date().toLocaleDateString("en-US", dateFormat)
return Events.insert(new_obj)
	

	}

});
