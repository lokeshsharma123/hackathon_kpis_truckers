var company_routes=[];
var driver_routes=['view_drivers_screen'];
var profile_list=[
{'type':'company',routes:company_routes},
{'type':'driver',routes:driver_routes},
];

var document_cateogory_list=[{'category':'Log Books Attachment'},{'category':'PODs'},{'category':'Expenses'},{'category':'Fuel'},{'category':'Lumper Receipts'},{'category':'Misc'}];

// var state_list=[{'state':'State1'},{'state':'State2'},{'state':'State3'},{'state':'State4'}];
var state_list=[
{'state':'AN(Andaman and Nicobar Islands)'},
{'state':'AD(Andhra Pradesh)'},
{'state':'AR(Arunachal Pradesh)'},
{'state':'AS(Assam)'},
{'state':'BR(Bihar)'},
{'state':'CH(Chandigarh)'},
{'state':'CG(Chattisgarh)'},
{'state':'DN(Dadra and Nagar Haveli)'},
{'state':'DD(Daman and Diu)'},
{'state':'DL(Delhi)'},
{'state':'GA(Goa)'},
{'state':'GJ(Gujarat)'},
{'state':'HR(Haryana)'},
{'state':'HP(Himachal Pradesh)'},
{'state':'JK(Jammu and Kashmir)'},
{'state':'JH(Jharkhand)'},
{'state':'KA(Karnataka)'},
{'state':'KL(Kerala)'},
{'state':'LD(Lakshadweep Islands)'},
{'state':'MP(Madhya Pradesh)'},
{'state':'MH(Maharashtra)'},
{'state':'MN(Manipur)'},
{'state':'ML(Meghalaya)'},
{'state':'MZ(Mizoram)'},
{'state':'NL(Nagaland)'},
{'state':'OD(Odisha)'},
{'state':'PY(Pondicherry)'},
{'state':'PB(Punjab)'},
{'state':'RJ(Rajasthan)'},
{'state':'SK(Sikkim)'},
{'state':'TN(Tamil Nadu)'},
{'state':'TS(Telangana)'},
{'state':'TR(Tripura)'},
{'state':'UP(Uttar Pradesh)'},
{'state':'UK(Uttarakhand)'},
{'state':'WB(West Bengal)'},
{'state':'OT(All Others not covered above)'}
];



var trailer_defects_list=[
{'defect':'Brake Connections'},
{'defect':'Brakes'},
{'defect':'Coupling Devices'},
{'defect':'Coupling King Pin'},
{'defect':'Doors'},
{'defect':'Hitch'},
{'defect':'Landing Gears'},
{'defect':'Lights'},
{'defect':'Reflectors'},
{'defect':'Roof'},
{'defect':'Straps'},
{'defect':'Suspension System'},
{'defect':'Tires'},
{'defect':'Wheel and Rims'},
{'defect':'Other'}
];

var vehicle_defects_list=[
{'defect':'Air Compressor'},
{'defect':'Air Lines'},
{'defect':'Battery'},
{'defect':'Belts & Hoses'},
{'defect':'Body'},
{'defect':'Brake Accessories'},
{'defect':'Clutch'},
{'defect':'Coupling Devices'},
{'defect':'Defroster'},
{'defect':'Drive Line'},
{'defect':'Engine'},
{'defect':'Exhaust'},
{'defect':'Fifth Wheel'},
{'defect':'Fire Extinguisher'},
{'defect':'Horn'},
{'defect':'Lights'},
{'defect':'Mirrors'},
{'defect':'Oil Pressure'},
{'defect':'Radiator'},
{'defect':'Rear End'},
{'defect':'Reflectors'},
{'defect':'Steering'},
{'defect':'Tires'},
{'defect':'Transmission'},
{'defect':'Warning Triangles'},
{'defect':'Wheels and Rims'},
{'defect':'Windows'},
{'defect':'Windshield wipers'},
{'defect':'Other'}
];
var httz_list=[
{'timezone':'India Standard Time(IST)','locationID':'tm1'}
];
var locationUTCoffset=[
{'daylight':'daylight1','utc':'utc+5.30','utcOffset':'+5.30','locationID':'tm1'}
];

/*var httz_list=[
{'timezone':'Eastern Time(US & Canada)','locationID':'tm1'},
{'timezone':'Atlantic Time(US & Canada)','locationID':'tm2'},
{'timezone':'Central Time(US & Canada)','locationID':'tm3'},
{'timezone':'Mountain Time(US & Canada)','locationID':'tm4'},
{'timezone':'Pacific Time(US & Canada)','locationID':'tm5'},
{'timezone':'Alaska Time(US)','locationID':'tm6'},
{'timezone':'New Foundland Time(Canada)','locationID':'tm7'},
{'timezone':'Hawaii-Aleutian Time(US)','locationID':'tm8'},
{'timezone':'Chamorro Time(US)','locationID':'tm9'},
{'timezone':'Samoa Time(US)','locationID':'tm10'}
];
var locationUTCoffset=[
{'daylight':'daylight1','utc':'utc-4','utcOffset':-4,'locationID':'tm1'},
{'daylight':'daylight1','utc':'utc-3','utcOffset':-3,'locationID':'tm2'},
{'daylight':'daylight1','utc':'utc-5','utcOffset':-5,'locationID':'tm3'},
{'daylight':'daylight1','utc':'utc-6','utcOffset':-6,'locationID':'tm4'},
{'daylight':'daylight1','utc':'utc-7','utcOffset':-7,'locationID':'tm5'},
{'daylight':'daylight1','utc':'utc-8','utcOffset':-8,'locationID':'tm6'},
{'daylight':'daylight1','utc':'utc-2.30','utcOffset':-2.30,'locationID':'tm7'},
{'daylight':'daylight1','utc':'utc-9','utcOffset':-9,'locationID':'tm8'},
{'daylight':'daylight1','utc':'utc-10','utcOffset':-10,'locationID':'tm9'},
{'daylight':'daylight1','utc':'utc-11','utcOffset':-11,'locationID':'tm10'},
{'daylight':'daylight2','utc':'utc-5','utcOffset':-5,'locationID':'tm1'},
{'daylight':'daylight2','utc':'utc-4','utcOffset':-4,'locationID':'tm2'},
{'daylight':'daylight2','utc':'utc-6','utcOffset':-6,'locationID':'tm3'},
{'daylight':'daylight2','utc':'utc-7','utcOffset':-7,'locationID':'tm4'},
{'daylight':'daylight2','utc':'utc-8','utcOffset':-8,'locationID':'tm5'},
{'daylight':'daylight2','utc':'utc-9','utcOffset':-9,'locationID':'tm6'},
{'daylight':'daylight2','utc':'utc-3.30','utcOffset':-3.30,'locationID':'tm7'},
{'daylight':'daylight2','utc':'utc-10','utcOffset':-10,'locationID':'tm8'},
{'daylight':'daylight2','utc':'utc-10','utcOffset':-10,'locationID':'tm9'},
{'daylight':'daylight2','utc':'utc-11','utcOffset':-11,'locationID':'tm10'}
];*/



var cycle_rule_list=[

{'rule':'IND 70HR/8DAY',hour:70,day:8},
{'rule':'IND 60HR/7DAY',hour:60,day:7}
/*
{'rule':'TEXAS 70/7',hour:70,day:7},
{'rule':'ALASKA 70/7',hour:70,day:7},
{'rule':'ALASKA 80/8',hour:80,day:8},
{'rule':'CANADA SOUTH 70/7',hour:70,day:7},
{'rule':'CANADA 120/14',hour:120,day:14},
{'rule':'CANADA SOUTH OIL AND GAS'},
{'rule':'CANADA NORTH 80/7',hour:80,day:7}

*/
];

var cartgo_type_list=[
{'cargo_type':'Property'},
{'cargo_type':'Passenger'}
];
var restart_rule_list=[
{'rule':'34 Hour Restart',hour:34}
];

var rest_break_list=[
{'rule':'30 MIN',hour:0.5},
{'rule':'NO REST BREAK',hour:0}
];
var short_haul_exception_list=[
{'rule':'No Exception'},
{'rule':'16HR SHORT HAUL EXCEPTION'}
];



var device_tracking_id_list=[
{'tracking_id':"sample",'password':'sample',allotted:true},
{'tracking_id':"ti1",'password':'abc123',allotted:false},
{'tracking_id':"ti2",'password':'abc123',allotted:false},
{'tracking_id':"ti3",'password':'abc123',allotted:false},
{'tracking_id':"ti4",'password':'abc123',allotted:true}
 
];

Meteor.startup(function() {
if (DeviceTrackingIDList.find().count() === 0) {
        device_tracking_id_list.forEach(function(data) {
            return DeviceTrackingIDList.insert(data);
        });

    }
if (StateList.find().count() === 0) {
        state_list.forEach(function(data) {
            return StateList.insert(data);
        });

    }
	if (CycleRuleList.find().count() === 0) {
        cycle_rule_list.forEach(function(data) {
            return CycleRuleList.insert(data);
        });
    }
	if (ShortHaulExceptionList.find().count() === 0) {
        short_haul_exception_list.forEach(function(data) {
            return ShortHaulExceptionList.insert(data);
        });
    }
	
	if (RestBreakList.find().count() === 0) {
        rest_break_list.forEach(function(data) {
            return RestBreakList.insert(data);
        });
    }
	if (RestartRuleList.find().count() === 0) {
        restart_rule_list.forEach(function(data) {
            return RestartRuleList.insert(data);
        });
    }
 

 if (DocumentCategoryList.find().count() === 0) {
        document_cateogory_list.forEach(function(data) {
            return DocumentCategoryList.insert(data);
        });

    }
 if (ProfileList.find().count() === 0) {
        profile_list.forEach(function(data) {
            return ProfileList.insert(data);
        });

    }
    if (TrailerDefectsList.find().count() === 0) {
        trailer_defects_list.forEach(function(data) {
            return TrailerDefectsList.insert(data);
        });

    }
    if (VehicleDefectsList.find().count() === 0) {
        vehicle_defects_list.forEach(function(data) {
            return VehicleDefectsList.insert(data);
        });

    }
	 if (HTTZList.find().count() === 0) {
        httz_list.forEach(function(data) {
            return HTTZList.insert(data);
        });

    }
	if (CargoTypeList.find().count() === 0) {
        cartgo_type_list.forEach(function(data) {
            return CargoTypeList.insert(data);
        });

    }
	if (UTCoffset.find().count() === 0) {
        locationUTCoffset.forEach(function(data) {
            return UTCoffset.insert(data);
        });

    }
});