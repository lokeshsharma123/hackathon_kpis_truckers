Template.edit_driver.helpers({
    option: function() {
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
                var first_name = $("#first_name").val();
                var last_name = $("#last_name").val();
                var driver_id = $("#driver_id").val();
                var phone = $("#phone").val();
				var company_id = $("#company_id").val();	
				var mainoffice = $("#mainoffice").val();
                var terminal = $("#terminal").val();
				var cargo_type = $("#cargo_type").val();
                var httz = $("#httz").val();
                //var odometer = $("#odometer").val();
                
                var profile = {
                    first_name: first_name,
                    last_name: last_name,
                    driver_id: driver_id,
                    phone: phone,
					 
                    //careername: careername,
					mainoffice: mainoffice,
                    terminal: terminal,
					cargo_type: cargo_type,
                    httz: httz,
					company_id:company_id
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
				
				if(profile.driver_id=="")
				{
					show_toast("Please Enter Driver ID");
					$("#driver_id").focus();
					return
				}
				
				if(profile.phone=="")
				{
					show_toast("Please Enter Phone");
					$("#phone").focus();
					return
				}
				
				 
				
				 
				if(profile.mainoffice=="")
				{
					show_toast("Please Enter Main Office Address");
					$("#mainoffice").focus();
					return
				}
				if(profile.terminal=="")
				{
					show_toast("Please Enter Terminal Address");
					$("#terminal").focus();
					return
				}
				if(profile.cargo_type==null)
				{
					show_toast("Please Select Cargo Type");
					$("#cargo_type").focus();
					return
				}
				if(profile.httz==null)
				{
					show_toast("Please Select Home Terminal Time Zone");
					$("#httz").focus();
					return
				}
				 show_loader();
				 setTimeout(function(){
				Meteor.call('editProfile', profile, function(err) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
show_toast("Profile Updated Successfully");
setTimeout(function(){
                        Router.go("/dashboard");
},2000);

}
                });
				},1000);
            }
        }
    }
});


Template.edit_driver.events({
"blur #mainoffice":function(){
$("#terminal").val($("#mainoffice").val());
$("#terminal").focus()
}
})

Template.edit_driver.helpers({
"user":function(){
 if(!Users.findOne())
return ;
var drivers=Users.findOne().profile.drivers;
var _this=this
var user=_.find(drivers, function(n){ return n.driver_id===_this.driver_id; });
if(user)
return user.profile;
},
"company_id":function(){
 if(!Users.findOne())
return ;
var drivers=Users.findOne().profile.drivers;
var _this=this
var user=_.find(drivers, function(n){ return n.driver_id===_this.driver_id; });
if(user)
return user.profile.company_id;
},
"httz":function(){
 if(!Users.findOne())
return ;
var drivers=Users.findOne().profile.drivers;
var _this=this
var user=_.find(drivers, function(n){ return n.driver_id===_this.driver_id; });
if(user)
return user.profile.httz;
},
"cargo_type":function(){
 if(!Users.findOne())
return ;
var drivers=Users.findOne().profile.drivers;
var _this=this
var user=_.find(drivers, function(n){ return n.driver_id===_this.driver_id; });
if(user)
return user.profile.cargo_type;
},
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
}
})
 