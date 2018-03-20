Template.view_notifications_screen.onRendered(function(){
show_loader();
Meteor.call("getCSVData",{no_of_days:8,company_id:Session.get("company_id_to_subscribe")},function(err,res){
hide_loader();
validate_csv_fields(res);
});
})
Template.view_notifications_screen.helpers({
"error_list":function(){
return Session.get("csv_error_array")
}
})

