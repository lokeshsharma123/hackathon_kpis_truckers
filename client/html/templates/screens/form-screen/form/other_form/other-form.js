Template.other_form.helpers({
"co_drivers":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").co_drivers;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.co_drivers;
},
"from":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").from;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.from;
},
"to":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").to;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.to;
},
"notes":function(){
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").notes;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.notes;
}
})