Template.upload_shipping_documents.helpers({
    "category_list": function() {
        var category = DocumentCategoryList.find().fetch();
		if(category.length)
        return category
    }
})

Template.upload_shipping_documents.events({
      'change .file_input': function(event, template) {
	  var template=Template.instance();
    var file = event.target.files[0];
  if(!file)
  return
	 var regex = new RegExp("(.*?)\.(pdf|docx|doc|jpeg|jpg|png|PNG|JPG|DOCX|JPEG|DOC|PDF)$");
  if(!file)
  return
    if(!(regex.test(file.name)))
	{
		show_toast("Only pdf/docx/doc/jpeg/jpg/png extensions are allowed");
		return false
	}
  var reader = new FileReader();

        reader.onload = function(readerEvt) {
		
            var binaryString = readerEvt.target.result;
			
			binaryString=binaryString.split("base64,")[1];
			
		
		template.document.set({_id: Meteor.uuid(),image:binaryString,name:file.name});
		
			
        };

        reader.readAsDataURL(file);
  
  }
})
Template.upload_shipping_documents.helpers({
    option: function() {
	var template=Template.instance();
        return {
            string: function() {
                return "DONE"
            },
            save: function() {
			 var category_array=[]
		 $(".category").each(function(){
		 var _this=this;
                if(this.checked)
                category_array.push({_id:this.id,category:$(this).attr("category")});
              })
			  

			  Meteor.call("insertFormDocument",{date_of_entry:Session.get("CurrentDate"),document:template.document.get(),category:category_array,company_id:Session.get("company_id_to_subscribe")},function(err,res){
			    Session.set("show_upload_document_screen",false);
				//history.go(-1)
			  })
			 /* 
			if(template.document.get())
			{
			var array=Session.get("shipping_document_array");
		if(typeof array==="undefined")
		{
		array=[];
		}
		
		array.push({document:template.document.get(),category:category_array})
		console.log(array)
			Session.set("shipping_document_array",array);
			console.log(Session.get("shipping_document_array"))
			}
			*/

             
            }
        }
    }
});
Template.upload_shipping_documents.onCreated(function() {
    this.document = new ReactiveVar("");
});