Meteor.methods({
    "save_trailer_defects": function(arr) {
    	var new_arr=[];
    	var obj={}
    	for(var i=0;i<arr.length;i++){
    		obj.defect_id=arr[i];
    		obj.user_id=Meteor.userId();
    		obj.timestamp=new Date();

    		 
    		TrailerDefects.insert(obj);
    	}
	  
    return true
	}

});
