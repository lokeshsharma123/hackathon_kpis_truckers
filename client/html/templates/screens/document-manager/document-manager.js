Template.document_manager.helpers({
"show_upload_document_screen":function(){
return  Session.get("show_upload_document_screen");
},
"date":function(){
return Session.get("CurrentDate").toDateString()
},
"selected_company_id":function(){
return Session.get("company_id_to_subscribe")
},
"company_list":function(){
var company_list=CompanyDriverList.find({driver_id:Meteor.userId()}).fetch()
if(company_list.length)
return company_list
},
"profile":function(){
if(Users.findOne())
return Users.findOne().profile
},
"category_list": function() {
        var category = DocumentCategoryList.find().fetch();
		if(category.length)
   return category
},
"display_documents":function(){
 return Template.instance().display_documents.get();
}
})
Template.document_manager.events({
"click #search":function(e,tpl){
e.preventDefault();
var company_id=$("#company_id").val();
if(company_id===null)
{
show_toast("Please Select Company");
return
}
var date=$("#date").val()
if(date=="")
{
show_toast("Please Select Date");
return
}
 
date=new Date(date)

Session.set("company_id_to_subscribe",company_id)
Session.set("CurrentDate",date);
if(!FormDocument.findOne({date:Session.get("CurrentDate").toDateString()}))
{
FormDocumentSubsManager.subscribe("FormDocument",{date:Session.get("CurrentDate"),company_id:Session.get("company_id_to_subscribe")});
}
Template.instance().display_documents.set(true);
}
});
Template.document_manager.onRendered(function(){
 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  });
  
Template.document_manager.onCreated(function(){
 this.display_documents = new ReactiveVar(false);
})