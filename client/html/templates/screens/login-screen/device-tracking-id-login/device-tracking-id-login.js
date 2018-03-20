Template.device_tracking_id_login.events({
"submit form":function(e,tpl){
e.preventDefault();
var dti=$("#dti").val();
var password=$("#password").val();
var obj={dti:dti,password:password,company_id:Session.get("company_id_to_subscribe")}
console.log(obj)
show_loader();
setTimeout(function(){
Meteor.call("registerDeviceTrackingID",obj,function(err,res){
 hide_loader();

 
            if(err)
                show_toast(err.message);
});
},1000);
}
})