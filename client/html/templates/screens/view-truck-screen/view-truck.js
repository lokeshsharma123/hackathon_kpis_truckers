Template.view_truck_screen.helpers({
"truck":function(){
var truck=Truck.findOne({company_id:Meteor.userId()});
if(truck)
return truck 
} 
});

Template.view_truck_screen.helpers({
    option: function() {
	var _this=this;
        return {
            string: function() {
                return "DEACTIVATE"
            },
            save: function() { 
			 show_loader();
			  setTimeout(function(){
			Meteor.call('deactivateTruck', _this.truck_id, function(err) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
						show_toast("Deactivated Successfully");
                    Router.go("/view-trucks")
		
}
                });
				},1000);
			
}
}
}
})