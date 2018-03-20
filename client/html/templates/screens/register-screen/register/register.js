Template.register.helpers({
    option: function() {
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
				var email = $("#email").val();
				var password = $("#password").val();               
				var first_name = $("#first_name").val();
                var last_name = $("#last_name").val();
                var driver_licence_no = $("#driver_licence_no").val();
				var state_id = $("#state_id").val();
				var state_name = $("#state_id option:selected").text(); 
                var classs = $("#class").val();
				var expiration = ""//$("#expiration").val();
				var phone = $("#phone").val();
				var home_address = $("#home_address").val();
				
               // var company_id = $("#company_id").val();
			//	var mainoffice = $("#mainoffice").val();
             //   var terminal = $("#terminal").val();
			//	var cargo_type = $("#cargo_type").val();
             //   var httz = $("#httz").val();
                //var odometer = $("#odometer").val();
                var profile = {
                    email: email,
					password:password,
					first_name: first_name,
                    last_name: last_name,
                    driver_licence_no: driver_licence_no,
					state_id:state_id,
					state_name:state_name,
					classs:classs,
					expiration:expiration,
                    phone: phone,
					home_address:home_address,
					//mainoffice: mainoffice,
                    //terminal: terminal,
					//cargo_type: cargo_type,
                    //httz: httz,
                    //company_id:company_id,
					type:"driver"
                }
				if(!validateEmail(profile.email))
				{
					show_toast("Please Enter Valid Email Address");
					$("#email").focus();
					return
				}
				
				if(profile.password=="" || profile.password.length<6)
				{
					show_toast("Please Enter Valid Password<br />(Min length required is 6)");
					$("#password").focus();
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
				
				if(profile.driver_licence_no=="")
				{
					show_toast("Please Enter Licence No.");
					$("#driver_licence_no").focus();
					return
				}
				
				if(profile.state_id==null)
				{
					show_toast("Please Select State");
					$("#state_id").focus();
					return
				}
				
				if(profile.classs=="")
				{
					show_toast("Please Enter Class");
					$("#class").focus();
					return
				}
				/*if(!validateExpirationDate(profile.expiration))
				{
					show_toast("Please Enter Expiration Date of Licence (mm-dd-yy format)");
					$("#expiration").focus();
					return
				}
				*/
				if(!validateMobile(profile.phone))
				{
					show_toast("Please Enter Valid Phone No.");
					$("#phone").focus();
					return
				}
				if(profile.home_address=="")
				{
					show_toast("Please Enter Home Address");
					$("#home_address").focus();
					return
				}
				
				/*if(profile.mainoffice=="")
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
				*/
				 show_loader();
				 setTimeout(function(){
				Meteor.call('createUserAccount', { email: email, password: password, profile: profile }, function(err) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
							//show_toast("Account Created.<br />Verification mail has been sent to your email account.");
                        Meteor.loginWithPassword(email, password,function(err) {
          
            if (err)
                show_toast('wrong credentials');
            else {
                //window.location.reload();
				Router.go("/dashboard");
            }
        });
		
}
                });
				},1000);
            }
        }
    }
});


Template.register.events({
"blur #mainoffice":function(){
$("#terminal").val($("#mainoffice").val());
$("#terminal").focus()
}
})

Template.register.helpers({
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
"state_list":function(){
var array=StateList.find().fetch();
if(array.length>0)
return array
}
})


Template.register.onRendered(function() {
    $('select').material_select();
})
