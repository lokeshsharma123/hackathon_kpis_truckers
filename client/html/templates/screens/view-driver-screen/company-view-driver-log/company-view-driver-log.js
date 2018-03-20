Template.company_view_driver_log.onRendered(function(){
 Session.set("driver_id_to_fetch",this.data.driver_id);
/*show_loader();
document.getElementById('driver_report_iframe').onerror = function() {
  alert();
};
document.getElementById('driver_report_iframe').onload = function(e) {
console.log(e)
  hide_loader()
};
*/
Session.set("reportData",[])
show_loader()
 console.log("eerwrwer")
	fetch_data();
 


});
Template.company_view_driver_log.events({
"change #no_of_days_input":function(){
var val=$("#no_of_days_input").val()
Template.instance().no_of_days.set(val)
fetch_data();
}
});
Template.company_view_driver_log.helpers({
"array":function(){
return Session.get("reportData");
},
"no_of_days":function(){
 return Template.instance().no_of_days.get();
}
})
Template.company_view_driver_log.onCreated(function(){
 this.no_of_days = new ReactiveVar("8");
})
 

function fetch_data(){
var driver_id= Session.get("driver_id_to_fetch")
Meteor.call("getReportData",{no_of_days:Template.instance().no_of_days.get(),company_id:Meteor.userId(),driver_id:driver_id},function(err,res){
setTimeout(function(){hide_loader()},1000)
if(!err)
{
	setTimeout(function(){Session.set("reportData",res);},1000);
}
else
show_toast(err)
});
 
}