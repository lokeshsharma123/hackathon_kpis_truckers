Template.use_prev_sign.helpers({
"sign":function(){
var log=SignLog.findOne({userid:Meteor.userId(),company_id:Session.get("company_id_to_subscribe"),date:Session.get("CurrentDate").toDateString()})
	if(log)
	return log
//var log=Sign.findOne({userid:Meteor.userId()});
//return log
}
});

Template.use_prev_sign.events({
	"click #use_signature_button":function(e,tpl){
		   Meteor.call('insert_sign', {esu:true}, function(err,res) {
                   if(err)
                   {
                    show_toast(err);
                    return;
                   }
                   show_toast("Saved successfully");
				 
				  // Session.set("tabbar1_active_tab","tab1")
                });
	}
});