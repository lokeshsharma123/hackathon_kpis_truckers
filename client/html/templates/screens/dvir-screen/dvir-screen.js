/*Template.dvir_screen.helpers({
    option: function() {
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
               
                var vehicle_no = $("#vehicle_no").val();
                var trailer_no=$("#trailer_no").val();
                var vehicle_defects_array=Session.get("vehicle_defects_array")
                var trailer_defects_array=Session.get("trailer_defects_array");

                var obj = {
                    vehicle_no: vehicle_no,
                    trailer_no:trailer_no,
                    vehicle_defects_array:vehicle_defects_array,
                    trailer_defects_array:trailer_defects_array

                }
                console.log(obj);
               
             //   Meteor.call('insert_dvir_form', obj, function(err,res) {
             //      if(err)
             //      {
             //       show_toast(err);
             //       return;
             //      }
             //      $("form").trigger("reset");
             //      show_toast("Saved successfully")
             //   });
               
            }
			
        }
    }
});
*/
Template.dvir_screen.helpers({
"current_date":function(){
			return convertToNavBarDate(Session.get("CurrentDate"));
			}
})

Template.dvir_screen.onRendered(function() {
  //  $('select').material_select();
})

