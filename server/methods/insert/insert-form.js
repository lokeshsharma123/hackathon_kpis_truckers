var fs = Npm.require('fs');
Meteor.methods({
    "insert_form": function(obj) {
	
	var path_array=[];
	 
	try{
	/*if(obj.shipping_document_file && obj.shipping_document_file.length>0)
	{
	for(var i=0;i<obj.shipping_document_file.length;i++)
	{
		var file=new Buffer(obj.shipping_document_file[i].document, 'base64');
		var name=Meteor.userId()+"_"+new Date().toDateString()+"_"+(i+1)+".jpg"
		fs.writeFileSync("../../../../../public/shipping-documents/"+name, file);
		path_array.push(name);
	}
	}
	*/
	obj.userid=Meteor.userId();
	obj.timestamp=new Date();
	obj.date=obj.date_of_entry.toDateString();
	//obj.shipping_document_file=path_array
	 
	}
	catch(e){
	 
	}
    return Form.insert(obj);
	}

});
