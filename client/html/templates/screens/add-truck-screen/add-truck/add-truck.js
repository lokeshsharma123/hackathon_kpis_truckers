Template.add_truck.helpers({
    option: function() {
        return {
            string: function() {
                return "ADD"
            },
            save: function() {
                var truck_no = $("#truck_no").val()
				var year = $("#year").val()
				var ride_type = $("#ride_type").val()
				var type = $("#type").val()
				var length = $("#length").val()
				var doors = $("#doors").val();
				
               if(truck_no=="")
				{
					show_toast("Please Enter Truck No");
					$("#truck_no").focus();
					return
				}
				if(year=="")
				{
					show_toast("Please Enter Year");
					$("#year").focus();
					return
				}
				if(ride_type==null)
				{
					show_toast("Please Select Ride Type");
					$("#ride_type").focus();
					return
				}
				if(type==null)
				{
					show_toast("Please Select Type");
					$("#type").focus();
					return
				}
				if(length==null)
				{
					show_toast("Please Select Length");
					$("#length").focus();
					return
				}
				if(doors==null)
				{
					show_toast("Please Select Doors");
					$("#doors").focus();
					return
				}
				 	 show_loader();
			 
				Meteor.call('AddTruck', {vehicle_no:truck_no,year:year,ride_type:ride_type,type:type,length:length,doors:doors}, function(err) {
 hide_loader();                   
				   if (err)
                        show_toast(err.message);
                    else {
						show_toast("Truck Added Successfully");
						$("form")[0].reset();
					 
						Router.go("/view-trucks");
}
                });
				 
       
    }
	}
	}
});

 