Template.register_company.helpers({
    option: function() {
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
                var email = $("#email").val();
                var password = $("#password").val();
                var company_name = $("#company_name").val();
				var usdot_no = $("#usdot_no").val();
				var mainoffice = $("#mainoffice").val();
                var terminal = $("#terminal").val();
				var phone = $("#phone").val();
				var cargo_type = $("#cargo_type").val();
                var httz = $("#httz").val();
				var cycle_rule = $("#cycle_rule").val();
				var restart = $("#restart").val();
				var rest_break = $("#rest_break").val();
				var short_haul_exception = $("#short_haul_exception").val();
				
              //  var driver_id = $("#driver_id").val();
                
             //   var careername = $("#careername").val();
				
                //var odometer = $("#odometer").val();
               
                var profile = {
					email: email,
					password:password,
					company_name: company_name,
					usdot_no:usdot_no,
					mainoffice:mainoffice,
					terminal:terminal,
                    phone: phone,
					cargo_type:cargo_type,
					httz:httz,
					cycle_rule:cycle_rule,
					restart:restart,
					rest_break:rest_break,
					short_haul_exception:short_haul_exception,
					
					//mainoffice: mainoffice,
                    //terminal: terminal,
					//cargo_type: cargo_type,
                    //httz: httz,
                   
					type:"company"
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
				if(profile.company_name=="")
				{
					show_toast("Please Enter Company Name");
					$("#company_name").focus();
					return
				}
				if(profile.usdot_no=="")
				{
					show_toast("Please Enter USDOT No.");
					$("#usdot_no").focus();
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
				if(!validateMobile(profile.phone))
				{
					show_toast("Please Enter Valid Phone No.");
					$("#phone").focus();
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
				if(profile.cycle_rule==null)
				{
					show_toast("Please Select Cycle Rule");
					$("#cycle_rule").focus();
					return
				}
				if(profile.restart==null)
				{
					show_toast("Please Select value of Restart");
					$("#restart").focus();
					return
				}
				if(profile.rest_break==null)
				{
					show_toast("Please Select value of Rest Break");
					$("#rest_break").focus();
					return
				}
				if(profile.short_haul_exception==null)
				{
					show_toast("Please Select value of Short Haul Exception");
					$("#short_haul_exception").focus();
					return
				}
					
				 show_loader();
				 setTimeout(function(){
				Meteor.call('createUserAccount', {email: email, password: password, profile: profile }, function(err,result) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
						console.log("complany ID...."+ result)
						console.log("profile...."+ profile)
	if (CompanyTimeZone.find({companyId:result}).count() == 0)
    {
        CompanyTimeZone.insert({companyId:result,timeZone:profile.httz});
    }

					//show_toast("Account created successfully. We have sent an account verification email on your email account");

                        Meteor.loginWithPassword(email, password,function(err) {
            
            if (err)
                show_toast('wrong credentials');
            else {
            	 Session.set("isLogin",true);
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


Template.register_company.events({
"blur #mainoffice":function(){
$("#terminal").val($("#mainoffice").val());
$("#terminal").focus()
}
})

Template.register_company.helpers({
"httz_list":function(){
var array=HTTZList.find().fetch();
if(array.length>0)
return array
},
"cargo_type_list":function(){
var array=CargoTypeList.find().fetch();
if(array.length>0)
return array
}
})


Template.register_company.onRendered(function() {
    $('select').material_select();
})
