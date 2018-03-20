Template.logout_link.events({
    "click a": function() {
//        alert('');
	Meteor.call("logout_event",function(err,res){
	setTimeout(function(){
		Meteor.logout();
        var recordEvents= Events.find({userId:Meteor.userId(), type: 5,companyId:Session.get("company_id_to_subscribe"),recordOrigin:2 } ,{sort:{dateTime:-1}}).fetch();
console.log(recordEvents);
if(recordEvents.length>0){
    if(recordEvents[0].code == 1){
       
        Blaze._globalHelpers.appLogoutEvent();
    }
   
}
                Session.set("isLogin",false);
		Object.keys(Session.keys).forEach(function(key){
        Session.set(key, undefined);
        delete Session.keys[key];
      });

      Session.keys = {}; // remove session keys
     // alert("logout  "+Session.get("isLogin"));
      Router.go("/")
	},1000);
	
	});
 
    	
    }
})
