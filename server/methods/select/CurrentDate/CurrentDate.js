Meteor.methods({
    "CurrentDate": function(date) {
	if(!date)
    return new Date();
	else
	{
	console.log("Asdsasa")
	console.log(date)
       var v=new Date(date);
	   v.setDate(v.getDate()-1);
	   return v
	}
	}

});