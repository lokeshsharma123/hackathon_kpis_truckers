Template.carrier_form.helpers({
"user":function(){
return Meteor.user();
},
"carrier":function(){
var user=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
if(user) 
return user.company_profile.company_name 
/*
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").carrier;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.carrier;
if(Session.get("carrier"))
return Session.get("carrier");
var user=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
if(user) 
return user.company_profile.company_name
*/
},
"main_office_address":function(){
var user=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
if(user) 
return user.company_profile.mainoffice 
/*
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").main_office_address;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.main_office_address;
if(Session.get("main_office_address"))
return Session.get("main_office_address");
var user=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
if(user) 
return user.company_profile.mainoffice
*/
},
"home_terminal_address":function(){
var user=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
if(user) 
return user.company_profile.terminal 
/*
if(Session.get("form_resume_object"))
return Session.get("form_resume_object").home_terminal_address;
var data=Form.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
if(data)
return data.home_terminal_address;
if(Session.get("home_terminal_address"))
return Session.get("home_terminal_address");
var user=CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:Meteor.userId()});
if(user) 
return user.company_profile.terminal
*/
}
})

/*
Template.carrier_form.onRendered(function(){
this.autorun(function(){
var data=Form.findOne({date:Session.get("CurrentDate").toDateString()});
if(!data)
{
Session.set("main_office_address","");
Session.set("home_terminal_address","");
Session.set("carrier","")
}
else if(data)
{
Session.set("main_office_address",data.main_office_address);
Session.set("home_terminal_address",data.home_terminal_address);
Session.set("carrier",data.carrier)
}
 
});
})
*/