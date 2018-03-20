Template.individal_day_form_dvir_record.helpers({
"data":function(){
return this.data
},
"record_date":function(){
var data=this.data
if(data)
if(data.dvir.date)
date=data.dvir.date
console.log(date)
return moment(date).format('MMM DD,YYYY');
},
"company_driver_profile":function(){
if(Meteor.userId())
var data=CompanyDriverList.findOne({driver_id:Meteor.userId(),company_id:Session.get("company_id_to_subscribe")})
else
var data=CompanyDriverList.findOne({driver_id:Session.get("login_user")._id,company_id:Session.get("company_id_to_subscribe")})
if(data)
return data
},
"state":function(){
if(Meteor.userId())
var data=CompanyDriverList.findOne({driver_id:Meteor.userId(),company_id:Session.get("company_id_to_subscribe")})
else
var data=CompanyDriverList.findOne({driver_id:Session.get("login_user")._id,company_id:Session.get("company_id_to_subscribe")})
if(data)
{
var data2= StateList.findOne({_id:data.driver_profile.state_id})
return data2.state
}
}
})
