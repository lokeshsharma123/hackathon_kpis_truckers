Template.form_screen.helpers({
    option2: function() {
		var _this=this
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
			var is_completely_filled=true;
                var vehicles = $("#vehicles").val();
                var trailers = $("#trailers").val();
                var distance = $("#distance").val();
                var odometers = $("#odometers").val();
                var shipping_documents = $("#shipping_documents").val();
                var driver = $("#driver").val();
                var carrier = $("#carrier").val();
                var main_office_address = $("#main_office_address").val();
                var home_terminal_address = $("#home_terminal_address").val();
				var co_drivers = $("#co_drivers").val();
                var from = $("#from").val();
				var to = $("#to").val();
				var notes = $("#notes").val();
				if(vehicles=="")
				{
				$("#error_vehicles").removeClass("hidden");
				is_completely_filled=false;
				}
            if(trailers=="")
                {
				$("#error_trailers").removeClass("hidden");
				is_completely_filled=false;
				}
             if(distance=="")
                {
				$("#error_distance").removeClass("hidden");
				is_completely_filled=false;
				}
            if(odometers=="")
                {
				$("#error_odometers").removeClass("hidden");
				is_completely_filled=false;
				}
            if(shipping_documents=="")
                {
				$("#error_shipping_documents").removeClass("hidden");
				is_completely_filled=false;
				}
              if(driver=="")
                {
				$("#error_driver").removeClass("hidden");
				is_completely_filled=false;
				}
              if(carrier=="")
                {
				$("#error_carrier").removeClass("hidden");
				is_completely_filled=false;
				}
              if(main_office_address=="")
                {
				$("#error_main_office_address").removeClass("hidden");
				is_completely_filled=false;
				}
              if(home_terminal_address=="")
                {
				$("#error_home_terminal_address").removeClass("hidden");
				is_completely_filled=false;
				}
				if(co_drivers=="")
				{
				$("#error_codrivers").removeClass("hidden");
				is_completely_filled=false;
				}
              if(from=="")
                {
				$("#error_from").removeClass("hidden");
				is_completely_filled=false;
				}
              if(to=="")
                {
				$("#error_to").removeClass("hidden");
				is_completely_filled=false;
				}
              if(notes=="")
                {
				$("#error_notes").removeClass("hidden");
				is_completely_filled=false;
				}
                  var obj = {
                    vehicles: vehicles,
                    trailers: trailers,
                    distance: distance,
                    odometers: odometers,
                    shipping_documents: shipping_documents,
                    driver: driver,
                    carrier: carrier,
                    main_office_address: main_office_address,
					home_terminal_address:home_terminal_address,
					from:from,
					co_drivers:co_drivers,
					to:to,
					notes:notes,
					date_of_entry:Session.get("CurrentDate"),
					//shipping_document_file:Session.get("shipping_document_array"),//Session.get("input_file")
					company_id:_this.company_id,
					is_completely_filled:is_completely_filled
                }
				
				obj.userid=Meteor.userId();
	obj.timestamp=localDateTime(Session.get("companyLocationOffset"));
	obj.date=obj.date_of_entry.toDateString();
	show_toast("Saved Successfully");
	Form.insert(obj);
         Session.set("Data_change",true);
         saveCurrentSignFlag(Session.get("CurrentDate").toDateString());
				return
                Meteor.call('insert_form', obj, function(err,res) {
                   if(err)
                   {
                    show_toast(err);
                    return;
                   }
                  // $("form").trigger("reset");
				  
                    show_toast("Saved successfully");
				   clear_form_sessions();
				   //SubsManager.subscribe("Form",{date:Session.get("CurrentDate"),company_id:Session.get("company_id_to_subscribe")});
				   /*setTimeout(function(){
				   	Session.set("tabbar1_active_tab","tab3")
				   },2000);
				   */
				  /* setTimeout(function(){
				   	Session.set("tabbar1_active_tab","tab3")
				   },2000);
				   */
                });
            }
			
        }
    },
    option3: function() {
	var _this=this
        return {
            string: function() {
                return "SAVE"
            },
           save: function() {
			var is_completely_filled=true;
                var vehicle_no = $("#vehicle_no").val();
				var vin_no = $("#vin_no").val();
                var trailer_no=$("#trailer_no").val();
				var trailer_no2=$("#trailer_no2").val();
				var trailer_no3=$("#trailer_no3").val();
                var vehicle_defects_array=Session.get("vehicle_defects_array")
                var trailer_defects_array=Session.get("trailer_defects_array");
				
				if(vehicle_no=="")
				{
				$("#error_vehicle_no").removeClass("hidden");
				is_completely_filled=false
				}
				if(trailer_no=="")
				{
				$("#error_trailer_no").removeClass("hidden");
				is_completely_filled=false
				}
				if(trailer_no2=="")
				{
				$("#error_trailer_no2").removeClass("hidden");
				is_completely_filled=false
				}
				if(trailer_no3=="")
				{
				$("#error_trailer_no3").removeClass("hidden");
				is_completely_filled=false
				}
				if(vin_no=="")
				{
				$("#error_vin_no").removeClass("hidden");
				is_completely_filled=false
				}

				
                var obj = {
                    vehicle_no: vehicle_no,
                    trailer_no:trailer_no,
					trailer_no2:trailer_no2,
					trailer_no3:trailer_no3,
					vin_no:vin_no,
                   // vehicle_defects_array:vehicle_defects_array,
                   // trailer_defects_array:trailer_defects_array,
					date_of_entry:Session.get("CurrentDate"),
					company_id:_this.company_id,
					is_completely_filled:is_completely_filled

                }
				obj.userid=Meteor.userId();
	obj.timestamp=localDateTime(Session.get("companyLocationOffset"));
	obj.date=obj.date_of_entry.toDateString();
  DVIRLog.insert(obj);
   Session.set("Data_change",true);
   saveCurrentSignFlag(Session.get("CurrentDate").toDateString());
  show_toast("Saved Successfully")
 
				return
                Meteor.call('insert_dvir_log', obj, function(err,res) {
                   if(err)
                   {
                    show_toast(err);
                    return;
                   }
                   //$("form").trigger("reset");
                  
                   show_toast("Saved successfully");
				   clear_dvir_sessions()
				  // SubsManager.subscribe("DVIRLog",{date:Session.get("CurrentDate"),company_id:Session.get("company_id_to_subscribe")});
				   /*setTimeout(function(){
				   	Session.set("tabbar1_active_tab","tab4")
				   },2000);
				   */
                });
            }
      
        }
    },
    option4: function() {
		var _this=this
        return {
            string: function() {
                return "SAVE"
            },
            save: function() {
              if(!$("#test5:checked").length)
			   {
				   show_toast("Please agree the condition");
				   return
			   }
			   var output_file_comment=$("#output_file_comment").val();
			   
			   if(output_file_comment=="")
				$("#error_output_file_comment").removeClass("hidden");
			   
              /* var binaryString=$('.js-signature').jqSignature('getDataURL');
binaryString=binaryString.split("base64,")[1];
      */
                var obj = {
        //            signature_file:binaryString,
					company_id:_this.company_id,
					date_of_entry:Session.get("CurrentDate"),
					output_file_comment:output_file_comment
                }
                 Session.set("Data_change",false);
                 saveCurrentSignFlag(Session.get("CurrentDate").toDateString());
                 Blaze._globalHelpers.addCommonEvent(4,1,2,"sign");
                Meteor.call('insert_sign', obj, function(err,res) {
                   if(err)
                   {
                    show_toast(err);
                    return;
                   }
				    $("form").trigger("reset");
                 // Session.set("display_canvas",false);
                   show_toast("Saved successfully");
				//    SubsManager.subscribe("SignLog",{date:Session.get("CurrentDate"),company_id:Session.get("company_id_to_subscribe")});
				//	SubsManager.subscribe("Sign",{date:Session.get("CurrentDate"),company_id:Session.get("company_id_to_subscribe")});
				  // Session.set("tabbar1_active_tab","tab1")
				   
                });
				
            }
      
        }
    }
});

Template.form_screen.helpers({
"current_date":function(){
	return convertToNavBarDate(Session.get("CurrentDate"));
			},
"active_tab":function(){
  return Session.get("tabbar1_active_tab")?Session.get("tabbar1_active_tab"):"tab1";
},
"show_sign_save_button":function(){
if(!Sign.findOne())
return true;
if(Sign.findOne() && Session.get("show_sign_save_button"))
return true;
return false;
},
"wrapper_condition":function(){
if(Session.get("show_vehicle_defect_screen") || Session.get("show_trailer_defect_screen") || Session.get("show_upload_document_screen"))
return true;
else
return false;
},
"show_vehicle_defect_screen":function(){
return Session.get("show_vehicle_defect_screen")
},
"show_trailer_defect_screen":function(){
return Session.get("show_trailer_defect_screen")
},
"show_upload_document_screen":function(){
return Session.get("show_upload_document_screen")
},
"is_logged_in_with_tracking_id":function(){
var data=CompanyDriverList.findOne({driver_id:Meteor.userId(),company_id:Session.get("company_id_to_subscribe")})
if(!data)
return false;
if(!data.is_logged_in)
return false;
else
return true
}
})

Template.form_screen.onRendered(function() {
   // $('select').material_select();
	if(!Session.get("tabbar1_active_tab"))
	Session.set("tabbar1_active_tab","tab1")
})
