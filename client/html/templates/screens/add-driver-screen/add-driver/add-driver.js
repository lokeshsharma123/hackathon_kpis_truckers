Template.add_driver.helpers({
    option: function() {
        return {
            string: function() {
                return "ADD"
            },
            save: function() {
                var driver_licence_no = $("#driver_licence_no").val()
                var state_id = $("#state_id").val();
				var state_name = $("#state_id option:selected").text(); 
                var first_name = $("#first_name").val();
                var last_name = $("#last_name").val();
				var phone = $("#phone").val();
				var exempt_driver_configuration=$("#test1:checked").length?'E':'0'
				var special_driving_situation_permission=$("[name=group2]:checked").val();
				var ex_reason=$("#ex_reason").val();
                var profile = {
                    driver_licence_no: driver_licence_no,
                    state_id: state_id,
					state_name:state_name,
                    first_name: first_name,
                    last_name: last_name,
					phone:phone,
					type:"driver",
					exempt_driver_configuration:exempt_driver_configuration,
					ex_reason:ex_reason,
					special_driving_situation_permission:special_driving_situation_permission
                }
				
				if(profile.driver_licence_no=="")
				{
					show_toast("Please Enter Licence No");
					$("#driver_licence_no").focus();
					return
				}
				
				if(profile.state_id==null)
				{
					show_toast("Please Select State");
					$("#state_id").focus();
					return
				}
				
				if(profile.first_name=="")
				{
					show_toast("Please Enter First Name");
					$("#first_name").focus();
					return
				}
				
				if(profile.last_name=="")
				{
					show_toast("Please Enter Last Name");
					$("#last_name").focus();
					return
				}
				
				if(profile.phone=="")
				{
					show_toast("Please Enter Phone");
					$("#phone").focus();
					return
				}
				 
				
				
				 
				 show_loader();
				 setTimeout(function(){
				Meteor.call('AddDriver', profile, function(err) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
						show_toast("Driver Added Successfully");
						$("form")[0].reset();
						Meteor.subscribe("CompanyDriverList");
						Session.set("driver_profile",null);
						setTimeout(function(){
						Router.go("/view-drivers");
						},100);
}
                });
				},1000);
            }
        }
    }
});


Template.add_driver.events({
"click #test1":function(){
$("#ex_reason").show();
},
"click #test2":function(){
$("#ex_reason").hide();
},
"blur #mainoffice":function(){
$("#terminal").val($("#mainoffice").val());
$("#terminal").focus()
},
"blur #driver_licence_no":function(){
var driver_licence_no=$("#driver_licence_no").val();
var state_id=$("#state_id").val();
if(driver_licence_no!=="" && state_id!==null)
	{
		show_loader();
		Meteor.call("FetchDriverDetails",{driver_licence_no:driver_licence_no,state_id:state_id},function(err,res){
		hide_loader();
		Session.set("driver_profile",res);
		});
	}
},
"change #state_id":function(){
var driver_licence_no=$("#driver_licence_no").val();
var state_id=$("#state_id").val();
if(driver_licence_no!=="" && state_id!==null)
	{
		show_loader();
		Meteor.call("FetchDriverDetails",{driver_licence_no:driver_licence_no,state_id:state_id},function(err,res){
		hide_loader();
		Session.set("driver_profile",res);
		});
	}
}
})

Template.add_driver.helpers({
"httz_list":function(){
var array=HTTZList.find().fetch();
if(array.length>0)
return array
},
"cargo_type_list":function(){
var array=CargoTypeList.find().fetch();
if(array.length>0)
return array
},
"company_name_list":function(){
var array=CompanyList.find().fetch();
if(array.length>0)
return array
},
company_name:function(){
if(Users.findOne())
return Users.findOne().profile.company_name
},
"state_list":function(){
var array=StateList.find().fetch();
if(array.length>0)
return array
},
"driver_profile":function(){
return Session.get("driver_profile");
}
})


Template.add_driver.onRendered(function() {
    $('select').material_select();
})
