Template.navbar.onRendered(function() {
   
if(!Session.get("CurrentDate"))
Session.set("CurrentDate",localDateTime(Session.get("companyLocationOffset")));
    $('.button-collapse').sideNav({
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: true // Stops event propagation
    }
  );
})


Template.navbar.events({
    "click .right": function(e, template) {
        if (template.data.right && template.data.right.save) {
            // execute the custom function with proper context

            template.data.right.save.call(template);
        }
    }
})

Template.navbar.events({
    "click .left": function(e, template) {
	if(Session.get("show_trailer_defect_screen") || Session.get("show_vehicle_defect_screen") || Session.get("show_upload_document_screen"))
        {
			Session.set("show_trailer_defect_screen",false)
		Session.set("show_vehicle_defect_screen",false);
		Session.set("show_upload_document_screen",false)
		}
		else
		history.go(-1);
		
    }
})
