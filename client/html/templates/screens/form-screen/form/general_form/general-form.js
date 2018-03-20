Template.general_form.helpers({
"user":function(){
return Meteor.user();
},
"vehicle_number":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").vehicles;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.vehicles;
},
"trailer_number":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").trailers;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.trailers;
},
"shipping_documents_text":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").shipping_documents;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.shipping_documents;
},
"distance":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").distance;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.distance;
},
"odometers":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").odometers;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.odometers;
},
"driver":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").driver;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.driver;
var user=Users.findOne({_id:Meteor.userId()});
if(user)
return user.profile.first_name+" " +user.profile.last_name;
}
})

Template.general_form.events({
	         'change .file_input': function(event, template) {
    var file = event.target.files[0];
	console.log(file)
	 var regex = new RegExp("(.*?)\.(pdf|docx|doc|jpeg|jpg|png)$");
  if(!file)
  return
    if(!(regex.test(file)))
	{
		show_toast("Only pdf/docx/doc/jpeg/jpg/png extensions are allowed");
	}
  var reader = new FileReader();

        reader.onload = function(readerEvt) {
		
            var binaryString = readerEvt.target.result;
			
			binaryString=binaryString.split("base64,")[1];
			
		
           Session.set("input_file",binaryString);
        };

        reader.readAsDataURL(file);
  
  },
  "click .delete_button":function(e,tpl){
	var _id=this.document._id;
	var arr=_.reject(Session.get("shipping_document_array"), function(n){ return n.document._id == _id; });
	Session.set("shipping_document_array",arr)
	},

"click .modal-trigger":function(e,tpl){
$('#driver_name_edit_indicator_modal').modal('open');
}
})

Template.general_form.onRendered(function(){
this.autorun(function(){
//if(!(Session.get("shipping_document_array") && Session.get("shipping_document_array").length>0))
if(typeof Session.get("shipping_document_array")==="undefined")
{
var form_array=Form.find({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()}).fetch()
if(form_array.length>0)
{
form_array=_.sortBy(form_array,function(n){return -1*n.timestamp})
console.log(form_array);
Session.set("shipping_document_array",form_array[0].shipping_document_file);
}
}
});
/*
this.autorun(function(){
var data=Form.findOne({date:Session.get("CurrentDate").toDateString()});
if(!data)
{
Session.set("vehicle_number","");
Session.set("trailer_number","");
Session.set("shipping_documents",[]);
Session.set("distance","");
Session.set("odometers","");
Session.set("driver","");
}
else if(data)
{
Session.set("vehicle_number",data.vehicles);
Session.set("trailer_number",data.trailers);
Session.set("shipping_documents",data.shipping_documents)
Session.set("distance",data.distance)
Session.set("odometers",data.odometers)
Session.set("driver",data.driver)
}
 
});
 $('.modal').modal();
 */
 });
