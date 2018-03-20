Template.popover.helpers({
"profile":function(){
if(Users.findOne())
return Users.findOne().profile
},
"company_id":function(){
return Session.get("company_id_to_subscribe")
}
})