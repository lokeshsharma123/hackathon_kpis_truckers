Template.shipping_documents_list.helpers({
"shipping_documents":function(){
var arr=FormDocument.find({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()}).fetch()
if(arr.length)
return arr
}
})
Template.shipping_documents_list.events({
"click .delete_button":function(e,tpl){
Meteor.call("removeShippingDocument",this._id,function(err,res){
});
},
  "click .add_remove_document_link":function(e,tpl){
   var vehicles=$("#vehicles").val();
  var trailers=$("#trailers").val();
  var distance=$("#distance").val();
  var odometers=$("#odometers").val();
  var shipping_documents=$("#shipping_documents").val();
  var driver=$("#driver").val();
  var carrier=$("#carrier").val();
  var main_office_address=$("#main_office_address").val();
  var home_terminal_address=$("#home_terminal_address").val();
  var from=$("#from").val();
  var to=$("#to").val();
  var notes=$("#notes").val();
  var resume_obj={vehicles:vehicles,trailers:trailers,distance:distance,
				  odometers:odometers,shipping_documents:shipping_documents,
				  driver:driver,carrier:carrier,main_office_address:main_office_address,
				  home_terminal_address:home_terminal_address,from:from,to:to,notes:notes
					}
Session.set("form_resume_object",resume_obj);
  
 // Router.go("/upload-shipping-documents");
 

  Session.set("show_upload_document_screen",true);
  }
});