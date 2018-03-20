
Template.login.onRendered(function () {
  //alert(Session.get("isLogin"));
  var obj = {};
  obj.CompanyId = 'uHdbqcAf3poJBm6ZD';
  obj.MacAddress = '00:1D:AE:40:87:72';
  CompanyMacAddress.insert(obj);
  
  if (Meteor.isCordova) {
	var ap = Blaze._globalHelpers.getBleApp();
	ap.initialize();
	
	setInterval(function(){
		speed = Blaze._globalHelpers.getSpeed();
		if(speed){
			if(speed>=5){
			  Router.go("/Warn_Unauthorizer");  
			}
		}
	}, 60000);
  }
    if(Session.get("isLogin")){
        Router.go("/dashboard");
    }
       }
);

Template.login.events({
    'submit [name=login]': function(e, tpl) {
        e.preventDefault();
        var email = tpl.$("[name=email]").val();
        var password = tpl.$("[name=password]").val();
        if (!validateEmail(email)) {
            show_toast("Please Enter Valid Email Address");
            return;
        }
        if (!validatePassword(password)) {
            show_toast("Please Enter Valid Password");
            return;
        }
        show_loader();


setTimeout(function(){
        Meteor.loginWithPassword(email, password, function(err) {
            hide_loader();
            if (err)
                show_toast(err.message);
            else {
              //  Blaze._globalHelpers.appLoginEvent();
                var eldID = 1 ;//should get from bluthooth
                var vehicleMiles = 10233// should get from 
                var events = Events.find({sort:{date: 1}}, {sort:{time: 1}},{eldId:eldID}).fetch();
                console.log(events);
                if(events.length>0){
                    var event  = events[events.length-1];
                    if(event.vehicleMiles<vehicleMiles){
                                //enter odometer mal function 
                    }
                    
                }
                //window.location.reload();
                Session.set("companyLocationOffset",-7);
                Session.set("isLogin",true);
				Router.go("/dashboard");
            }
        });
		},1000);

    }
});
