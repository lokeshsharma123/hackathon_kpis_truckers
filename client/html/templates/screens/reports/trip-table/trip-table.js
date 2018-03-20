/*Template.trip_table.onRendered(function(){
Meteor.call("getReportData",{no_of_days:1,company_id:Session.get("company_id_to_subscribe")},function(err,res){
hide_loader()
if(!err)
Session.set("tripData",res);
else
show_toast(err)
});
})
*/
Template.trip_table.helpers({
"data":function(){
   var data=this.data
  // console.log(data)
   data.location = Blaze._globalHelpers.getLocationString();
   
return data
},
"current_date":function(){
return localDateTime(Session.get("companyLocationOffset")).toDateString()
}
})
