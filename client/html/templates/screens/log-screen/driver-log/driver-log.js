

Template.driver_log.onRendered(function () {
  
    livemode = document.getElementById("livemode");
    range = document.getElementById("rangediv");
    remainingTimeViolation = document.getElementById('remainingTimeViolation');
    remainingTimeViolation1 = document.getElementById('remainingTimeViolation1');
    remainingTimeViolation2 = document.getElementById('remainingTimeViolation2');
    remainingTimeViolation3 = document.getElementById('remainingTimeViolation3');
    remainingTimeViolation4 = document.getElementById('remainingTimeViolation4');
    personalduty = $('#personalduty');
    yardmove = $('#yardmove');
    sel1 = document.getElementById("sel1");
    sel2 = document.getElementById("sel2");
    speedinput = document.getElementById('speed');
    confirm_popup = document.getElementById('confirm_popup');
    NotesEdit = document.getElementById('NotesEdit');
    autocomplete = document.getElementById('autocomplete');
    offDutyButton = $('#offDutyButton');
    sbDutyButton = $('#sbDutyButton');
    dDutyButton = $('#dDutyButton');
    onDutyButton = $('#onDutyButton');
    tCountOff = document.getElementById('tCountOff');
    tCountOn = document.getElementById('tCountOn');
    tCountD = document.getElementById('tCountD');
    tCountSb = document.getElementById('tCountSb');
    dLimitError = document.getElementById('dLimitError');
    dDriveLimitError = document.getElementById('dDriveLimitError');
    dBreakError = document.getElementById('dBreakError');
    dWeekLimitError = document.getElementById('dWeekLimitError');
    $('.modal').modal();
        $(".edit-btn").show();
        $(".location-div").hide();
        $(".live-btn").hide();
/*  $('.timepickermeterial').pickatime({up
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: false, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
    }); */
	currentGraphDate = getTodayDate();
     if (isEdit)
    {
    
            var currentMintues = Math.round(getCurrentTimeValue().split(".")[1]*0.6);

        currentMintues = currentMintues > 9 ? currentMintues : "0"+currentMintues;
     $('#sel1').timepicker({
         defaultTime: '00:00',
    
     });
     $('#sel2').timepicker({
         defaultTime: 'now'

     
     });
}
    
    _today = getTodayDate();
    // ***note*** sensor  senserUserId = CompanyId
    // need to create variable for BTsensorID
   // Session.set("senserUserId",Meteor.userId());
   // Session.set("companyId",Meteor.userId());
    
    if (Session.get("senserUserId")) {
        sensorUserId = Session.get("senserUserId");
    }
    if (Session.get("companyId")) {
        companyId = Session.get("companyId");
    }
    if(Session.get("CurrentDate")){
        currentGraphDate = getCurrentSessionDate();
    }
    else {
        currentGraphDate = _today;
    }
    //alert(Session.get("CurrentDate")+" "+sensorUserId)
   // if (fromDriver()) {
        initUI();
  //  }
    initData();
    //executepython();
    if (fromDriver()) {
    addZeroTimeEvents()

}

})
Template.driver_log.onDestroyed(function () {
    // deregister from some central store
   if(fromDriver()){
      saveCurrentSignFlag(Session.get("CurrentDate").toDateString());   
    saveData();
    
   }
   chart = null;
    clearInterval(timer);
});

var stripes = [];
var dataset = [];
var dummydataset = [];
var locDataset = [];
var gridDataset1 = [];
var gridDataset2 = [];
var gridDataset3 = [];
var gridDataset4 = [];
var jsonData = {};
var shadowDataset = [];
var eventDataset = [];
var isEdit = false;
var lastVaue = 0;
var timer;
var hourlyTimer;
var chart;
var latestStaus = 3.5;
var statusMap = {3.5: "Off Duty", 2.5: "Sleeper", 1.5: "Driving", 0.5: "ON Duty", 4.5: "yardmove", 5.5: "personalduty"};
var buttonMap = {3.5: "offDutyButton", 2.5: "sbDutyButton", 1.5: "dDutyButton", 0.5: "onDutyButton", 4.5: "yardmove", 5.5: "personalduty"};
var orignalStatus = 3.5;
var currentGraphDate;
var isFirstTime = true;
var ZeroSpeedCounter = 0;
var sensorUserId = 0;
var companyId ;
var _today;


//constant 
var vehicle_miles ;
var engine_hours ;
var cmv_vin;
var engine_status = 1;
var isCoDriver = false;
var team_drivers = 0;
var exempt_driver = 0;
var pc_allowed = 1;
var ym_allowed = 2;
var multidayTotalHour = 70;
var multiDaysTotalDays = 8;
var multiDaysRestartHours = 34;
var restBreakHour = 0.50;
var speedZeroPrompt;

var livemode;
var range;
var remainingTimeViolation,remainingTimeViolation1,remainingTimeViolation2,remainingTimeViolation3,remainingTimeViolation4;
var personalduty;
var yardmove;
var sel1;
var sel2;
var speedinput;
var confirm_popup;
var NotesEdit;
var autocomplete;
var offDutyButton;
var sbDutyButton;
var dDutyButton;
var onDutyButton;
var tCountOff;
var tCountOn;
var tCountD;
var tCountSb;
var dLimitError;
var dDriveLimitError;
var dBreakError;
var dWeekLimitError;
var dutyStatus = "offDutyButton";

//constant of bluethooth code
var speedCode =  "00FEF1 4";
var milesDrivenCode = "00feb 1"; 
var odometerCode = "00FEC1 4" ;
var engineTimeCode = "00feb 4"; 
var vinCode =  "00FEEC";
var engineHourCode = "00FEE5 4"

function initData() {
    lastVaue = 0;
    var oneDayBeforeData = getDaysBeforedata(1);

    if (oneDayBeforeData.length > 0) {
       
        var temp = JSON.parse(oneDayBeforeData[0].Details);
       // console.log(temp);
        if (temp.length > 0) {
            latestStaus = temp[temp.length - 1].y;
            orignalStatus = latestStaus
        }
    }
    if (isEdit) {
        livemode.style.display = 'none';
        $(".edit-btn").hide();
        $(".location-div").show();
        $(".live-btn").show();
        

    } else {
        dataset = [];
        // alert(sensorUserId+"  "+currentGraphDate);
        
        var todaysData = Data.findOne({DateOFDataSaving: currentGraphDate, userId: sensorUserId,companyId:companyId});
         //console.log(Data.find({}).fetch());
        
        if (todaysData) {
            var temp = JSON.parse(todaysData.Details);
            if (temp.length > 0) {
                dataset = temp;
                eventDataset = getEventsWIthData(currentGraphDate);
                latestStaus = dataset[dataset.length - 1].y;
                orignalStatus = latestStaus
                lastVaue = dataset[dataset.length - 1].x;
//                   if(dataset.length>1){
//                          lastVaue = dataset[dataset.length-2].y
//                      }
            }
             updateTimer();
        } else {
           
            if (currentGraphDate != _today) {
                dataset.push({x: 0, y: 3.5, lineColor: "green"});
                dataset.push({x: 24, y: 3.5, lineColor: "green"});
            } else{
                
                updateTimer();
            }
        }
        livemode.style.display = 'block';
        $(".edit-btn").show();
        $(".location-div").hide();
        $(".live-btn").hide();
        // dataset.push({x: 0, y: 3.5});
        //  dataset.push({x: 24, y: 3.5});
        timer = setInterval(updateTimer, 60000);
    }
    // console.log(dataset);
    if (!isFirstTime) {
        isEdit = false;

        livemode.style.display = 'block';
        $(".edit-btn").show();
        $(".location-div").hide();
        $(".live-btn").hide();
        // dataset.push({x: 0, y: 3.5});
        //  dataset.push({x: 24, y: 3.5});

        timer = setInterval(updateTimer, 60000);
        updateTimer();
    }
    if(fromDriver()){
     showCurrentStatus(orignalStatus);
 }
    var frmData = Form.find({}).fetch();
    if (frmData.length > 0 && frmData[0].co_drivers.length > 0) {
        isCoDriver = true;
        team_drivers = 1;
    } else {
        isCoDriver = false;
        team_drivers = 0;
    }

    var userData = CompanyDriverList.findOne({company_id:Session.get("company_id_to_subscribe"),driver_id:sensorUserId})
   // console.log(userData);
   
    var profile;
    if (userData) {
        profile = userData.company_profile;
    }
    // console.log(profile);
    if (profile) {
        if (profile.cycle_rule) {
            var cycleRule = CycleRuleList.find({_id: profile.cycle_rule}).fetch();
            if (cycleRule.length > 0 && cycleRule[0].hour) {
                multidayTotalHour = cycleRule[0].hour;
                multiDaysTotalDays = cycleRule[0].day;
            }
           // console.log(cycleRule);
        }


        if (profile.rest_break) {
            var restRule = RestBreakList.find({_id: profile.cycle_rule}).fetch();
            if (restRule.length > 0 && restRule[0].hour) {
                restBreakHour = restRule[0].hour;
            }
        }
        if (profile.restart) {
            var restartRule = RestartRuleList.find({_id: profile.cycle_rule}).fetch();
            if (restartRule.length > 0 && restartRule[0].hour) {
                multiDaysRestartHours = restartRule[0].hour;
            }

        }
    }
    // console.log(frmData);

    if (exempt_driver == 1) {
        remainingTimeViolation.style.display = 'none';
    }
    if (pc_allowed == 0) {
        personalduty.style.display = 'none';
    }
    if (ym_allowed == 0) {
        yardmove.style.display = 'none';
    }

    plotGraph();
}

function initUI() {
    var isFirstTime = true;
    if (dataset.length > 0) {
        isFirstTime = false;
        updateLabel();
    }


/*     $("#sel1").empty()
    $("#sel2").empty() */
//         dataset.push({x: 0, y: 0})
    for (i = 0; i <= 24; i++) {
        if (isFirstTime) {
            stripes.push({
                value: i,
                color: "#bbbbbb"
            })
        }
        for (var j = 0; j < 4; j++) {
            if (i == 24 && j > 0) {
                break;
            }
/*             var opt = document.createElement("option");

            opt.innerHTML = i + ":" + (15 * j); // whatever property it has

            // then append it to the select element

            var opt1 = document.createElement("option");

            opt1.innerHTML = i + ":" + (15 * j);

            sel1.appendChild(opt);
            sel2.appendChild(opt1); */
            if (isFirstTime == false) {
                continue;
            }
            var xValue = i + j * 0.25;
            dataset.push({x: xValue, y: 3.5, lineColor: "green"})
            locDataset.push({x: xValue, lat: "", lng: "", address: ""})

            //for grid
            if (j == 1 || j == 3) {
                gridDataset1.push({x: xValue, y: [0, 0.25]});
                gridDataset2.push({x: xValue, y: [1, 1.25]});
                gridDataset3.push({x: xValue, y: [2, 2.25]});
                gridDataset4.push({x: xValue, y: [3, 3.25]});
            } else if (j == 2) {
                gridDataset1.push({x: xValue, y: [0, 0.5]});
                gridDataset2.push({x: xValue, y: [1, 1.5]});
                gridDataset3.push({x: xValue, y: [2, 2.5]});
                gridDataset4.push({x: xValue, y: [3, 3.5]});
            }
        }
    }

/*     $("#range").ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 0,
        max: 24,
        from: 0,
        to: 24,
        type: 'double',
        step: 0.25,
        prefix: "",
        grid: true,
        min_interval: 0.25,
        prettify: function (num) {
            if ((num + '').includes(".")) {
                var decPart = parseInt((num + "").split(".")[1]);
                var intPart = parseInt((num + "").split(".")[0]);
                decPart = (decPart) * 0.6;
                while ((decPart + '').length < 2) {
                    decPart = decPart + '0'
                }
                num = intPart + ':' + decPart;
            }

            return num;
        },
        onFinish: function (data) {
            //console.log(data["from"]);
            var from = data["from"];
            var to = data["to"];
            if (currentGraphDate == _today) {
                if (from > getCurrentTimeValue()) {
                    from = 0;
                }
                if (to > getCurrentTimeValue()) {
                    to = getCurrentHour();
                    var slider = $("#range").data("ionRangeSlider");

                    slider.update({
                        min: 0,
                        max: 24,
                        to: getCurrentHour()

                                // etc.
                    });
                }
            }

            sel1.selectedIndex = from * 4;
            sel2.selectedIndex = to * 4;
            shadow()
            plotGraph()
        },
    }); */
}


function plotGraph() {
    console.log(dataset);

    if (!chart) {
        chart = new CanvasJS.Chart("chartContainer", {
            toolTip:{
              enabled: false,
            },
            axisX2: {
                labelFontColor: "black",
                stripLines: stripes,
                interval: 0.25,
                minimum: 0,
                maximum: 24,
                includeZero: false,
                labelFormatter: function (e) {
                    if (e.value % 1 == 0) {
                        if (e.value == 0 || e.value == 24) {
                            return "M";
                        } else if (e.value > 12) {
                            return (e.value - 12);
                        }
                        return e.value
                    }
                    return "";
                }
            },
            axisY: {
                labelFontColor: "black",
                labelFontWeight: "bold",
                interval: 1,
                maximum: 4,
                minimun: 0,
                labelFormatter: function (e) {
                        if (e.value == 0) {
                            return  "ON";
                        } else if (e.value == 1) {
                            return  "D";
                        } else if (e.value == 2) {
                            return  "SB";
                        } else if (e.value == 3){
                            return  "OFF";
                        }
                        else 
                    {
                        return '';
                    }
                }
                // move comma to change formattingprefix: "$"
            },
            dataPointWidth: 1,
            data: [
                
                {
                    type: "line",
                    axisXType: "secondary",
                    lineThickness: 3,
                    markerSize: 0,
                    tickLength: 10,
                    dataPoints: dataset
                },
                {
                    axisXType: "secondary",
                    type: "rangeColumn",
                    color: "#bbbbbb",
                    dataPoints: gridDataset1
                }
                ,
                {
                    axisXType: "secondary",
                    type: "rangeColumn",
                    color: "#bbbbbb",
                    dataPoints: gridDataset2
                }
                ,
                {
                    axisXType: "secondary",
                    type: "rangeColumn",
                    color: "#bbbbbb",
                    dataPoints: gridDataset3
                },
                {
                    axisXType: "secondary",
                    type: "rangeColumn",
                    color: "#bbbbbb",
                    dataPoints: gridDataset4
                }

            ]
        });
    }


    //if update 
    else {
        chart.options.data[0].dataPoints = dataset;
        //chart.options.data[1].dataPoints = shadowDataset;
//    chart.options.data[2].dataPoints = gridDataset1;
//    chart.options.data[3].dataPoints = gridDataset2;
//    chart.options.data[4].dataPoints = gridDataset3;
//    chart.options.data[5].dataPoints = gridDataset4;
    }
    chart.render();
}

//function changeGraph1() {
//
//    shadow()
//    plotGraph()
//}
//
//function changeGraph2() {
// 
//    shadow()
//    plotGraph()
//}

function shadow() {
/*  var max = [sel2.selectedIndex] / 4;
    var min = [sel1.selectedIndex] / 4; */
        var endTime = $('#sel2').val().split(":");
        var startTime = $('#sel1').val().split(":");
        endTime[1] = Math.round(endTime[1]/0.6);
        startTime[1] = Math.round(startTime[1]/0.6);
        var max = Number(endTime.join("."));
        var min = Number(startTime.join("."));
        console.log("max==="+max)
        console.log("min==="+min)
    shadowDataset = [];
    shadowDataset.push({x: max, y: 4})
    shadowDataset.push({x: min, y: 4})
//    for (i = 0; i < dataset.length; i++) {
//
//        if (dataset[i].x <= max && dataset[i].x >= min) {
//            shadowDataset.push({x: dataset[i].x, y: 4})
//        } else {
//
//
//        }
//    }

}

function updateTimer() {
   
  
    if (!fromDriver()) {
         plotGraph();
    updateLabel();
         clearInterval(timer);
        return;
    }
    if (currentGraphDate !== _today) {
        clearInterval(timer);
        return;

    }
   if(_today !== getTodayDate()){
    saveData();
    _today = getTodayDate();
     Session.set("CurrentDate",localDateTime(Session.get("companyLocationOffset")));
     return;
    }
    
    var current_value = getCurrentTimeValue();

 
    getLocation();
    var speed = speedinput.value;
    Blaze._globalHelpers.getBluetoothDATA();
	Meteor.setTimeout(function(){
		speed = Blaze._globalHelpers.getSpeed();
		vehicle_miles = Blaze._globalHelpers.getOdometer();
		cmv_vin = Blaze._globalHelpers.getVin();
		engine_hours = Blaze._globalHelpers.getEngineHour( );
		},1000);
    if(Blaze._globalHelpers.isBleConnecte()){
    speed = Blaze._globalHelpers.getSpeed();
    Meteor.setTimeout(function(){vehicle_miles = Blaze._globalHelpers.getOdometer();},4000);
   
   Meteor.setTimeout(function(){cmv_vin = Blaze._globalHelpers.getVin();},8000);
  
   Meteor.setTimeout(function(){
           engine_hours = Blaze._globalHelpers.getEngineHour( );
       },12000);
   console.log("odometer "+vehicle_miles+" vin "+cmv_vin+" engineHour "+engine_hours);
    }
        //alert(speed);
    if (sensorUserId == '0') {
        if (speed) {
            if (speed >= 5) {
                alert('Please login first')
                //go to blank

            } else if (speed == 0) {
                //go to login
            }
        }
        
        return;
    }
    var isUpdate = false;
    if (orignalStatus != 4.5 && orignalStatus != 5.5) {
        if (speed) {
            if (speed >= 5 && latestStaus !== 1.5) {
                latestStaus = 1.5;
                isUpdate = true;
                speedZeroPrompt = 0;
            } else if (speed < 5 && speed > 0 && latestStaus !== 0.5) {
                latestStaus = 0.5;
                isUpdate = true;
                speedZeroPrompt = 0;
            } else if (speed == 0 && latestStaus === 1.5) {
                ZeroSpeedCounter++;
                if (ZeroSpeedCounter == 4) {
                        $('#confirm_popup').modal('open');
                } else if (ZeroSpeedCounter > 4) {
                        $('#confirm_popup').modal('close');
                    latestStaus = 0.5;
                    isUpdate = true;
                    ZeroSpeedCounter = 0;
                }

            }
            showCurrentStatus(latestStaus);
        } else {
            speedZeroPrompt = 0;
        }
    } else {
        speedZeroPrompt = 0;
    }


    //alert(latestStaus+" "+Number(lastVaue));
    
    updateGraph(Number(current_value), Number(lastVaue), latestStaus);
    //updateLabel();
    if (latestStaus === 1.5) {
        var intPart = Number((current_value + "").split(".")[0]);
        var decPart = Number((current_value + "").split(".")[1]);
       
      
        // var decimals = current_value - Math.floor(current_value);
        // var addedHourlyEvents
        var addedHourlyEvents = Events.find({date: currentGraphDate, userId: sensorUserId,companyId:companyId, hourlyEvent: intPart}).fetch();
        if (addedHourlyEvents.length == 0 && decPart<7) {
            addEvent(current_value, current_value, current_value, Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get()), latestStaus, 'auto', 1, 1, 0, intPart);
           saveData();
        }
    }
    if (isUpdate) {
        addEvent(current_value, current_value, current_value, Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get()), latestStaus, 'auto', 1, 1, 0);
        saveData();
    }// eventDataset.push({time: current_value, start_time: current_value,end_time:current_value,location:address,status:statusMap[orignalStatus],origin:'driver',notes:document.getElementById('NotesEdit').innerHTML});

    lastVaue = current_value;
    // console.log("current value" + current_value);

}


function getCurrentHour() {
    var d = localDateTime(Session.get("companyLocationOffset"));

    return d.getHours();
}

function getCurrentTimeValue() {
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var d = localDateTime(Session.get("companyLocationOffset"));
    var t = d.getTime();
    var x = d.getHours();
    var y = d.getMinutes();
    //console.log("prevoius" + y);
    y = parseInt(y / 0.6);
    while ((y + '').length < 2) {
        y = '0' + y;
    }
    //console.log("after" + y);

    var current_value = x + '.' + y;
    return current_value;
}
function update(s) {
/*     var max = [sel2.selectedIndex] / 4;
    var min = [sel1.selectedIndex] / 4; */


    var current_value = getCurrentTimeValue();
    if (currentGraphDate != _today && !isEdit) {
        return;
    }

    if (isEdit) {
        var endTime = $('#sel2').val().split(":");
        var startTime = $('#sel1').val().split(":");
        endTime[1] = Math.round(endTime[1]/0.6);
        startTime[1] = Math.round(startTime[1]/0.6);
        var max = Number(endTime.join("."));
        var min = Number(startTime.join("."));
        console.log("max==="+max)
        console.log("min==="+min)
        
        if(max<=min){
            return;
        }

        if (s != 4.5 && s != 5.5 ){ 
        if (!checkEditValidate(min, max)) {
            return;
        }
        if (!checkSensorDrivingValidate(min, max)) {
            return;
        }
    }
    
    if(currentGraphDate == _today && max >= Number(getCurrentTimeValue()) )
    {
        latestStaus = s;
        orignalStatus = s;
    }
        var notes = NotesEdit.value;
//        if (!notes) {
//            alert('Please enter notes ');
//            $('#NotesEdit').focus();
//            return
//        }
    } else {
       if (s != 4.5 && s != 5.5 ){ 
        if (!checkEditValidate(current_value, current_value)) {
            return;
        }
        if (!checkSensorDrivingValidate(current_value, current_value)) {
            return;
        }
    }
    }

    var status = s;
    shadowDataset = [];

    getLocation();
    showCurrentStatus(s)

    if (s === 4.5) {
        s = 0.5;
    } else if (s === 5.5) {
        s = 3.5;
    }

    //alert(max+"fs"+min);
    if (isEdit) {
        updateGraph(max, min, s);
        
        var textAddress = autocomplete.value;
        var modified = 1;
       /*  if (!textAddress) {
            textAddress = Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get());//address;
            modified = 0;
        } */
        // alert(textAddress);


        addEvent(current_value, min, max, textAddress, status, 'driver', 1, 2, modified);
        var nextstatus;
        for (i = 0; i < dataset.length; i++) {
            if (dataset[i].x > max) {
                nextstatus = dataset[i].y;
                break;
            }
        }
        if (!nextstatus) {
            nextstatus = status;
        }
        addEvent(current_value, max, max, "", nextstatus, 'driver', 1, 2, modified);
        

        //eventDataset.push({time: current_value, start_time: min,end_time:max,location:address,status:statusMap[status],origin:'driver',notes:document.getElementById('NotesEdit').innerHTML});
        // eventDataset.push({time: current_value, start_time: max,end_time:max,location:address,status:statusMap[status],origin:'driver'});
    } else {
        latestStaus = s;
        updateGraph(Number(current_value), Number(lastVaue), latestStaus);
         orignalStatus = status;
        addEvent(current_value, current_value, current_value, Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get()), status, 'driver', 1, 2, 0);

    }
    saveData();
      Session.set("Data_change",true);
    //
}

function checkEditValidate(startTimeValue, endTimeValue) {

//    for (var j = 0; j < eventDataset.length; j++) {
//        if (eventDataset[j].start_time === startTimeValue) {
//            if (eventDataset[j].recordOrigin == 1) {
//                alert('can not update auto generated event')
//                return false;
//            }
//
//        } else if (eventDataset[j].start_time >= startTimeValue && eventDataset[j].start_time <= endTimeValue) {
//
//            if (eventDataset[j].recordOrigin == 1) {
//                alert('can not update auto generated event')
//                return false;
//            }
//
//        }
//
//
//    }
    return true;
}
function checkSensorDrivingValidate(startTimeValue, endTimeValue) {
//    for (var j = 0; j < eventDataset.length; j++) {
//        if (eventDataset[j].start_time === startTimeValue) {
//            if (eventDataset[j].recordOrigin == 1 && eventDataset[j].status == 1.5) {
//                alert('can not update sensor generated driving event')
//                return false;
//            }
//
//        } else if (eventDataset[j].start_time >= startTimeValue && eventDataset[j].start_time <= endTimeValue) {
//            if (eventDataset[j].recordOrigin == 1 && eventDataset[j].status == 1.5) {
//                alert('can not sensor generated driving event')
//                return false;
//            }
//
//        }
//
//
//    }
    return true;
}

function addEvent(timeValue, startTimeValue, endTimeValue, location, status, origenValue, eventTypeValue, eventRecordOriginValue, modified, hourlyEvent) {
    if(_lat && _lat.get() != 0){
        //alert('Sec');
        event.distanceSinceLastValidCoodinates = 0;
       }else{
        event.distanceSinceLastValidCoodinates = 5;
       }
    DataDiagnosticEventIndicator = Events.find({eventType:7,  $or : [ { malfunctionCode : "1" }, { malfunctionCode : "2" }, { malfunctionCode : "3" }, { malfunctionCode : "4" }, { malfunctionCode : "5" }, { malfunctionCode : "6" } ] ,date:getTodayDate()},{sort:{time:-1}}).fetch();
    
     MalFunctionStatusIndicator = Events.find({eventType:7, $or : [ { malfunctionCode : "P" }, { malfunctionCode : "E" }, { malfunctionCode : "L" }, { malfunctionCode : "T" }, { malfunctionCode : "R" }, { malfunctionCode : "S" } ],date:getTodayDate()},{sort:{time:-1}}).fetch(); 
     
     event.malFunctionStatusIndicator = MalFunctionStatusIndicator.length>0?1:0;
     event.dataDiagnosticEventIndicator = DataDiagnosticEventIndicator.length>0?1:0;
    var tempEventDataset = [];
    for (var j = 0; j < eventDataset.length; j++) {
        if (eventDataset[j].start_time === startTimeValue ) {
            eventDataset[j].recordStatus = 2
            tempEventDataset.push(eventDataset[j]);
        } else if (eventDataset[j].start_time >= startTimeValue && eventDataset[j].start_time <= endTimeValue) {

            eventDataset[j].recordStatus = 2
            tempEventDataset.push(eventDataset[j]);
        } else {
            tempEventDataset.push(eventDataset[j]);
        }

    }

    eventDataset = tempEventDataset;
    //alert(eventDataset.length);
    var event = {};
    event.start_time = Number(startTimeValue);
    event.time = timeValue;
    if (status == 4.5 || status == 5.5) {
        event.eventType = 3;
    } else {
        event.eventType = eventTypeValue;
        
    }
    if (event.eventType == 1) {
        event.eventCode = 4.5 - status;
        // alert(status);
    } else if (event.eventType == 3) {
        event.eventCode = status - 3.5;
    } else if (event.eventType == 2) {
        event.eventCode = 1;
    }

            //alert(event.type);
    var userId = sensorUserId;

    event.status = status;
    event.recordStatus = 1;
    event.recordOrigin = eventRecordOriginValue;
		   if(!fromDriver()){
         event.recordOrigin = 3;
    }
     if(Blaze._globalHelpers.isBleConnecte()){
      Meteor.setTimeout(function(){vehicle_miles = Blaze._globalHelpers.getOdometer( );},4000);
    
    Meteor.setTimeout(function(){
    engine_hours = Blaze._globalHelpers.getEngineHour();
        },12000);
    if(!cmv_vin && cmv_vin !== '')
    Meteor.setTimeout(function(){cmv_vin = Blaze._globalHelpers.getVin();},8000);

    //cmv_vin
    //console.log("odometer "+vehicle_miles+" vin "+vinNo+" engineHour "+engine_hours);
     event.vehicleStatus = engine_status;
    event.vehicleMiles = vehicle_miles
     event.engineHour = engine_hours;
     event.vin = cmv_vin;
    }
    
   
    if (modified == 0) {
        if (event.eventType == 3) {
            if(_lat){
            event.latitude = Math.round( _lat.get() * 10 ) / 10;
            event.longitude = Math.round( _lon.get() * 10 ) / 10;
        }
        } else {
  event.latitude = _lat.current;
  event.longitude = _lon.current;
        }
    }
    else{
    event.latitude = 'M';
    event.longitude = 'M';
    }
    event.location = location;
    event.comment = NotesEdit.value;
    event.userId = userId;
    event.companyId = companyId;
    
    event.modified = modified;
    event.updateDate = localDateTime(Session.get("companyLocationOffset"));
    
    if (hourlyEvent) {
        //alert("hourly"+hourlyEvent);
        event.hourlyEvent = hourlyEvent;
        eventDataset.push(event);
        saveData();
    } else {
        eventDataset.push(event);
    }

}

function getTodayDate() {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var today2 = new Date();
    var _today = today2.toLocaleDateString("en-US", dateFormat);
    return _today;
}

function getDistanceLastValidCoordinates(){
   // alert('Second');
    lastEvent = db.Events.find({userId :sensorUserId , companyId:companyId,vehicleMiles:{ $ne: null}, $or :[{eventType:1},{eventType:2},{eventType:3},{eventType:4}]},{sort: {date :1}}).fetch();
    var distance = 0;
    if(lastEvent.length > 0){
     distance = vehicle_miles - lastEvent.vehicleMiles;
     if(distance > 6){
      distance = 6;
      return distance;
     }else{
      return distance;
     }
     
    }else{
     return distance;
    }
   }
function updateEvent(startTimeValue, location) {
    for (var j = 0; j < eventDataset.length; j++) {
        if (eventDataset[j].start_time === startTimeValue) {
            eventDataset[j].comment = NotesEdit.value;
            eventDataset[j].location = location;
            eventDataset[j].modified = 1;
        }

    }
}

function showCurrentStatus(s) {

    clearStatus();
if(!fromDriver() && isEdit){
    $("#"+buttonMap[s]).removeClass("black-text lighten-5");
    $("#"+buttonMap[s]).addClass("white-text");
}
else if(fromDriver()){
	dutyStatus = buttonMap[s];
     $("#"+buttonMap[s]).removeClass("black-text lighten-5");
    $("#"+buttonMap[s]).addClass("white-text");
}
}

function clearStatus(){
    if($("#offDutyButton").hasClass("white-text"))
    $("#offDutyButton").removeClass("white-text").addClass("lighten-5 black-text");

else if($("#sbDutyButton").hasClass("white-text"))
    $("#sbDutyButton").removeClass("white-text").addClass("lighten-5 black-text");

else if($("#dDutyButton").hasClass("white-text"))
    $("#dDutyButton").removeClass("white-text").addClass("lighten-5 black-text");

else if($("#onDutyButton").hasClass("white-text"))
    $("#onDutyButton").removeClass("white-text").addClass("lighten-5 black-text");

else if($("#yardmove").hasClass("white-text"))
    $("#yardmove").removeClass("white-text").addClass("lighten-5 black-text");

else if($("#personalduty").hasClass("white-text"))
    $("#personalduty").removeClass("white-text").addClass("lighten-5 black-text");

}
function updateGraph(max, min, s) {
   
    var isStart = false;
    var tempDataset = dataset
    //dataset= [];

    var newArray = [];
    var arrR = [];
    var isSecond = false;
    var isFirst = false;
   if(!isEdit){
       if(dataset.length>0){
           if(dataset[dataset.length-1].y == s){
               dataset[dataset.length-1].x = max;
              
           }
           else{
           dataset.push({x: max, y: dataset[dataset.length-1].y, lineColor: "green"});
            dataset.push({x: max, y: s, lineColor: "green"});
          dataset.push({x: max, y: s, lineColor: "green"});
      }
               updateLabel();
                plotGraph()
                return;
       }
      
     
           
   }

    for (i = 0; i < dataset.length; i++) {
        if (i < dataset.length - 1 && dataset[i + 1].x >= min && !isFirst && isEdit) {
            //alert(dataset[i].y);
            newArray.push({x: min, y: dataset[i].y, lineColor: "green"});
            isFirst = true;
        }

        if (dataset[i].x <= max && dataset[i].x >= min) {
            if (!isEdit) {
                newArray.push(dataset[i])
            } else if (i == dataset.length - 1) {
                newArray.push({x: max, y: s, lineColor: "green"})
                // newArray.push(dataset[i])
            }

        }
        //console.log(i);

        else {
            if (isEdit && !isSecond && dataset[i].x >= max) {
                newArray.push({x: max, y: s, lineColor: "green"})
                newArray.push({x: max, y: dataset[i].y, lineColor: "green"});
                isSecond = true;
            }
            newArray.push(dataset[i])
//        else

            //console.log(dataset[i])
        }

    }

    // console.log(newArray);
    dataset = newArray;
    tempDataset = dataset;
    var len = dataset.length - 1;

    dataset.push({x: min, y: s, lineColor: "green"})
    if (!isEdit) {

        dataset.push({x: max, y: s, lineColor: "green"})

    }


    for (var i = 0; i < dataset.length; i++) { //Number of passes
        for (var j = 0; j < (dataset.length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if (dataset[j].x > dataset[j + 1].x) {
                //Swap the numbers
                var tmp = dataset[j];  //Temporary variable to hold the current number
                dataset[j] = dataset[j + 1]; //Replace current number with adjacent number
                dataset[j + 1] = tmp; //Replace adjacent number with current number
            }
        }
    }
    dataset = validateData(dataset);
    updateLabel();
    //console.log(jsonData);
    plotGraph()
}
//by suresh for check validate graph data 
function validateData(dataset){
      for (var i = 0; i < dataset.length-1; i++) { 
          if(dataset[i].x == dataset[i+1].x || dataset[i].y == dataset[i+1].y){
             
          }
          else{
             //  alert(dataset[i].x);
               if(i<dataset.length-2){
                   if(dataset[i].y == dataset[i+2].y){
                   //    alert("y is "+dataset[i].y);
                   var tmp = dataset[i+1];  //Temporary variable to hold the current number
                   dataset[i+1] = dataset[i + 2]; //Replace current number with adjacent number
                   dataset[i + 2] = tmp; 
                   }
               }
          }
      }
      return dataset;
}

function updateLabel() {
    jsonData = {};
    jsonData[3.5] = 0;
    jsonData[0.5] = 0;
    jsonData[1.5] = 0;
    jsonData[2.5] = 0;
    var contDriveTime = 0;
    var contBreakTime = 0;
    var isContDrive = false;
    var isDutyStarted = false;
    var isForteenHourViolation = false;
    var dutyStarttime = -500;
    var last_change = 0;
    var DataOfWeekk = [];
    var totalWorkingHours = checkWeekrule();
    var lastTime = 0;
    var lastDay =  checkForteenHourRule();
  
    if(lastDay !== -500)
     dutyStarttime = lastDay;
   // alert(lastDay);
    //saveData();
    //totalWorkingHours = totalWorkingHours+jsonData[0.5] + jsonData[1.5];
    //console.log("totalWorkingHours "+totalWorkingHours);
    for (i = 0; i < dataset.length; i++) {
        if (i == dataset.length - 1) {
            //jsonData[dataset[i].y] = jsonData[dataset[i].y] + 1;
            if (dataset[i].y == 1.5 || dataset[i].y == 0.5) {
                lastTime = dataset[i].x;
            }
            jsonData[dataset[i].y] = jsonData[dataset[i].y] + dataset[i].x - last_change;
            break;
        } 
          if (dataset[i].y == 1.5 || dataset[i].y == 0.5) {  
            if (!isDutyStarted) {
               
               // if(lastDay>0){
                  
//                }
//                else  {
//                dutyStarttime = dataset[i].x;
//            }
                isDutyStarted = true;
            } else if (dataset[i].x > dutyStarttime + 14) {
                isForteenHourViolation = true;
            }
        
            lastTime = dataset[i].x;
        }

        //chcek continue driving voilence 

        if (dataset[i].y == 1.5 && dataset[i + 1].y != 1.5) {
            contBreakTime = 0;
            // contDriveTime++;

            contDriveTime = contDriveTime + dataset[i].x - last_change;
            //console.log(' drive time is ' + contDriveTime);
        } else if (dataset[i].y == 0.5 && dataset[i + 1].y != 0.5) {
            contBreakTime = 0;
            // contDriveTime++;

            contDriveTime = contDriveTime + dataset[i].x - last_change;
            //console.log(' drive time is ' + contDriveTime);
        } else if (dataset[i].y != dataset[i + 1].y) {
            contBreakTime = contBreakTime + dataset[i].x - last_change;
            //console.log(' break time is ' + contBreakTime);
        }
        if (contBreakTime >= 0.5) {
            //  alert(contBreakTime);
            contDriveTime = 0;
        }
        if (contDriveTime > 8) {
            // console.log(' final drive time is ' + contDriveTime);
            isContDrive = true;
        }
        if (dataset[i].y != dataset[i + 1].y) {
            jsonData[dataset[i].y] = jsonData[dataset[i].y] + dataset[i].x - last_change;
            last_change = dataset[i].x;
        }
        if (i == dataset.length - 2) {
            if (dataset[i + 1].y == 1.5 || dataset[i + 1].y == 0.5) {
                contBreakTime = 0;
                // contDriveTime++;

                contDriveTime = contDriveTime + dataset[i + 1].x - last_change;
                // console.log(' drive time is ' + contDriveTime);
            } else {
                contBreakTime = contBreakTime + dataset[i + 1].x - last_change;
                // console.log(' break time is ' + contBreakTime);
            }
            if (contBreakTime >= restBreakHour) {
                //  alert(contBreakTime);
                contDriveTime = 0;
            }
            if (contDriveTime > 8) {
                // console.log(' final drive time is ' + contDriveTime);
                isContDrive = true;
            }
        }

       // dataset[i] = {x: dataset[i].x, y: dataset[i].y, lineColor: "green"};

        //console.log(dataset[i])
    }
    totalWorkingHours = totalWorkingHours + jsonData[1.5] + jsonData[0.5];

    tCountOff.innerHTML = changeNumToTime(jsonData[3.5]);
    tCountOn.innerHTML = changeNumToTime(jsonData[0.5]);
    tCountD.innerHTML = changeNumToTime(jsonData[1.5]);
    tCountSb.innerHTML = changeNumToTime(jsonData[2.5]);
	

    tCountOff.value = (jsonData[3.5]);
    tCountOn.value = (jsonData[0.5]);
    tCountD.value = (jsonData[1.5]);
    tCountSb.value = (jsonData[2.5]);
    //alert("OFF:" + jsonData[0] + ",ON:" + jsonData[1] + ",D:" + jsonData[2] + ",SB:" + jsonData[3]);
    dLimitError.style.display = 'none';
    dBreakError.style.display = 'none';
    dDriveLimitError.style.display = 'none';
    document.getElementById('dWeekLimitError').style.display = 'none';
    var violName = '';
    var historyVoilName = '';
    var temp = dutyStarttime + 14 -  dataset[dataset.length - 1].x;
   // alert(changeNumToTime(temp));
    if (dutyStarttime == -500) {
        temp = 14;
    }
   // var temp = dutyStarttime ;
    var min = temp;
//    var forMin = dutyStarttime + 14 - dataset[dataset.length - 1].x;
//    
//    if (forMin < 0) {
//        temp = 0;
//        min = 0;
//    }
    violName = violName + '14 hour rule rule remaining = ' + changeNumToTime(temp);
    temp = 11 - jsonData[1.5];
    violName = violName + ' ,total driving rule remaining = ' + changeNumToTime(temp);
    if (temp < min) {
        min = temp

    }
    // alert()
    temp = multidayTotalHour - totalWorkingHours;
    violName = violName + ' ,MULTI DAY rule remaining = ' + changeNumToTime(temp);
    historyVoilName = 'MULTI DAY rule remaining = ' + changeNumToTime(temp);
    if (temp < min) {
        min = temp;
    }
    temp = 8 - contDriveTime;

    if (temp < min) {
        min = temp;
    }
    if (isContDrive) {
        min = -1;
        violName = violName + ' ,rest break rule remaining = In violation';
    } else {
        violName = violName + ' ,rest break rule remaining = ' + changeNumToTime(temp);
    }
    if (isForteenHourViolation) {
        min = -1;
    }

    if (jsonData[0.5] + jsonData[1.5] > 14) {
        dLimitError.style.display = '';
    }
    if (isForteenHourViolation) {
        dLimitError.style.display = '';
    }
    if (jsonData[1.5] > 11) {
        dDriveLimitError.style.display = '';
    }
    if (isContDrive) {
        dBreakError.style.display = '';
    }
    if (totalWorkingHours > multidayTotalHour) {
        document.getElementById('dWeekLimitError').style.display = '';
    }
    if (min >= 0) {
        if (currentGraphDate == _today) {
            $("#violation-msg").show();
            $("#previour_day_violation").hide();
            remainingTimeViolation.innerHTML = changeNumToTime(min) + ' hour remaining in next VIOLATION';
            remainingTimeViolation1.innerHTML = violName.split(",")[0] || "";
            remainingTimeViolation2.innerHTML = violName.split(",")[1] || "";
            remainingTimeViolation3.innerHTML = violName.split(",")[2] || "";
            remainingTimeViolation4.innerHTML = violName.split(",")[3] || "";
            
        } else {
            $("#violation-msg").hide();
            $("#previour_day_violation").show();
            $("#previour_day_violation").html("<b>"+historyVoilName+"</b>").show();
        }
    } else {
            $("#violation-msg").show();
            $("#previour_day_violation").hide();
            remainingTimeViolation.innerHTML = 'you are in VIOLATION';
            remainingTimeViolation1.innerHTML = violName.split(",")[0] || "";
            remainingTimeViolation2.innerHTML = violName.split(",")[1] || "";
            remainingTimeViolation3.innerHTML = violName.split(",")[2] || "";
            remainingTimeViolation4.innerHTML = violName.split(",")[3] || "";
    }
}

function checkWeekrule() {
    var totalWorkingHours = 0;
    var daysCount = 0;
    var contOff = 0;
    var isSleepNewSet = false;
    var oneDayBeforeData = getDaysBeforeDatafromdate(currentGraphDate, 1);
    var currentData = getDaysAfterDatafromdate(currentGraphDate, 0);
    if (oneDayBeforeData.length > 0) {

        daysCount = oneDayBeforeData[0].DayCount;
        //alert(daysCount);
    } else if (currentData.length > 0) {
        daysCount = currentData[0].DayCount - 1;

    } else {

        return 0;
    }
    for (var j = 0; j < 2; j++) {
        var tempDataset = [];

        if (j == 0) {
            tempDataset = dataset;
        } else if (oneDayBeforeData.length > 0) {
            tempDataset = JSON.parse(oneDayBeforeData[0].Details);
        } else {
            tempDataset.push({x: 0, y: 3.5, lineColor: "green"});
            tempDataset.push({x: 24, y: 3.5, lineColor: "green"});
        }

        for (var i = tempDataset.length - 1; i > 0; i--) {
            if ((tempDataset[i].y == 3.5 || tempDataset[i].y == 2.5) && (tempDataset[i - 1].y == 3.5 || tempDataset[i - 1].y == 2.5)) {
                contOff = contOff + tempDataset[i].x - tempDataset[i - 1].x;
                //console.log('count is'+contOff);
            } else {
                contOff = 0;
            }
            if (contOff >= multiDaysRestartHours) {
                isSleepNewSet = true;
            }
        }
    }

    if (isSleepNewSet) {

        return 0;
    }

    for (var i = 1; i <= daysCount; i++)
    {
        var oneDayBeforeData = getDaysBeforeDatafromdate(currentGraphDate, i)

        if (oneDayBeforeData.length > 0) {
            var drivedata = oneDayBeforeData[0].EmployeeTimeSheet;
//    console.log('---------------day before data');
//    console.log(oneDayBeforeData[0].EmployeeTimeSheet)
            //console.log((drivedata.ON.split('"').join('')));
            // alert(drivedata.ON)
            if (drivedata.ON) {
                var dTime = Number(drivedata.Driving.split('"').join('')) + Number(drivedata.ON.split('"').join(''));
                totalWorkingHours = totalWorkingHours + dTime;
            }
        }
    }
    //alert('days count'+daysCount);

    return totalWorkingHours;
}

function checkForteenHourRule(){
    var contBreakTime = 0;
    var startTime = -500;
   
    var last_change = dataset[dataset.length-1].x;
    for(var i = dataset.length-1;i>=0;i--){
        if(dataset[i].y == 2.5 || dataset[i].y == 3.5){
        
         contBreakTime = contBreakTime + last_change-dataset[i].x ;
         
         console.log("contBreaktime"+contBreakTime+"last change"+last_change+"current x"+dataset[i].x )
         if(contBreakTime>=10){
           
             return startTime;
         }
     }
     
     else{
         startTime = dataset[i].x;
         contBreakTime = 0;
     }
     if(i>0 && (dataset[i].y != dataset[i-1].y || dataset[i].x == dataset[i-1].x)){
         last_change = dataset[i].x;
     }
    }
  
      var oneDayBeforeData = getDaysBeforedata(1);

    if (oneDayBeforeData.length > 0) {
       
        var temp = JSON.parse(oneDayBeforeData[0].Details);
          last_change = temp[temp.length-1].x;
     for(var i = temp.length-1;i>=0 ;i--){
       
        if(temp[i].y == 2.5 || temp[i].y == 3.5){
           
         contBreakTime = contBreakTime + last_change-temp[i].x ;
         if(contBreakTime>=10){
             return startTime;
         }
        
     }
     else{
        
          startTime = temp[i].x-24 ;
         contBreakTime = 0;
     }
      if(i>0 && (temp[i].y != temp[i-1].y || temp[i].x == temp[i-1].x)){
         last_change = temp[i].x;
     }
     if(  temp[i].x<dataset[dataset.length-1].x){
         break;
     }
    }
   }
   //alert(startTime);
   return startTime
    //alert(startTime);
}

function calculateDayNo() {
    var daysCount = 1;
    var contOff = 0;
    var isSleepNewSet = false;
    var oneDayBeforeData = getDaysBeforeDatafromdate(currentGraphDate, 1);
    var oneDayAfterData = getDaysAfterDatafromdate(currentGraphDate, 1);
    if (oneDayBeforeData.length > 0) {

        daysCount = oneDayBeforeData[0].DayCount;
        // console.log(oneDayBeforeData[0].DayCount)

        if (daysCount > multiDaysTotalDays - 1) {
            return 1;
        }

        for (var j = 0; j < 2; j++) {
            var tempDataset = JSON.parse(oneDayBeforeData[0].Details);

            if (j == 0) {
                tempDataset = dataset;
            }


            for (var i = tempDataset.length - 1; i > 0; i--) {
                if ((tempDataset[i].y == 3.5 || tempDataset[i].y == 2.5) && (tempDataset[i - 1].y == 3.5 || tempDataset[i - 1].y == 2.5)) {
                    contOff = contOff + tempDataset[i].x - tempDataset[i - 1].x;
                    //  console.log('count is'+contOff);
                } else {
                    contOff = 0;
                }
                if (contOff >= multiDaysRestartHours) {
                    isSleepNewSet = true;
                }
            }
        }
        if (isSleepNewSet) {
            return 1;
        }

        daysCount = daysCount + 1;

    } else if (oneDayAfterData.length > 0) {
        daysCount = oneDayAfterData[0].DayCount;
        if (daysCount == 1) {
            return multiDaysTotalDays;
        }
        daysCount = daysCount - 1;
    }
    //alert(daysCount);
    return daysCount;
}
function updateForwardDaysCount(date, daysCount) {
    var date1 = new Date(_today);
    var date2 = new Date(date);
    var diff = parseInt((date1 - date2) / (1000 * 60 * 60 * 24));
    //alert(diff);
    for (var i = 1; i < diff; i++) {
        var obj = getDaysAfterDatafromdate(currentGraphDate, i);
        if (obj.length > 0) {
            var ID = obj[0]._id;

            // console.log(obj);
            Data.update(
                    {_id: ID},
                    {
                        Details: obj[0].Details,
                        EmployeeTimeSheet: obj[0].EmployeeTimeSheet,
                        //DateOFDataSaving: "Friday, June 16, 2017"
                        Location: obj[0].Location,
                        DateOFDataSaving: obj[0].DateOFDataSaving,
                        Events: obj[0].Events,
                        DayCount: daysCount + i,
                        userId: sensorUserId,
                        companyId:companyId
                    }
            )
        } else {
            break;
        }
    }
    // console.log(Data.find().fetch());
}


function changeNumToTime(num) {
     
  if ((num + '').includes(".")) {
      
        var decPart = ((num + "").split(".")[1]);
        var dec1 = "."+decPart;
        
        dec1 = Number(dec1)*0.6 ;
        dec1 = dec1.toFixed(10);
        dec1 = (dec1+"").replace('0.','');
        while ((dec1 + '').length < 2) {
            dec1 =  dec1 +'0'
        }
        dec1 = dec1.substr(0, 2) + '.' + dec1.substr(2);
        dec1 = Math.round(dec1);
        while ((dec1 + '').length < 2) {
            dec1 = '0' + dec1
        }
        var intPart = parseInt((num + "").split(".")[0]);
        if((num + '').includes("-")){
            intPart = (num + "").split(".")[0];
        }
         num =  ( intPart+":"+ dec1);
    }
    else {
        num = num + ':00';
    }
    return num;
}



function sortEvent() {
    for (var i = 0; i < eventDataset.length; i++) { //Number of passes
        for (var j = 0; j < (eventDataset.length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions

            if (eventDataset[j].start_time > eventDataset[j + 1].start_time) {
                //Swap the numbers

                var tmp = eventDataset[j];  //Temporary variable to hold the current number
                eventDataset[j] = eventDataset[j + 1]; //Replace current number with adjacent number
                eventDataset[j + 1] = tmp; //Replace adjacent number with current number
            }
        }
    }
}

function getLatestEventIndex() {
    var max = eventDataset[0].updateDate;

    var index = 0;
    for (var i = 1; i < eventDataset.length; i++) {
        if (max <= eventDataset[i].updateDate) {
            max = eventDataset[i].time;
            index = i;
        }
    }

    return index;
}

function addEventIntoDB() {
    var recordDel = getEventsWIthData(currentGraphDate);
    for (var i = 0; i < recordDel.length; i++) {
        Events.remove({_id: recordDel[i]._id});
    }
    var lastrecord = Events.find({sort: {seqId: 1}}).fetch();
    // console.log(lastrecord);
    var lastId = 0;
    if (lastrecord.length > 0) {
        lastId = lastrecord[lastrecord.length - 1].seqId + 1;
    }

    for (var i = 0; i < eventDataset.length; i++) {
        eventDataset[i].date = currentGraphDate;
        eventDataset[i].seqId = lastId + i;
        Events.insert(eventDataset[i]);
    }
//    var zeroTimeEvents = Events.find({start_time: 0,date: currentGraphDate, userId: sensorUserId,companyId:companyId}).fetch();
//   
//    if(zeroTimeEvents.length==0 && dataset.length>0){
//    addEvent(getCurrentTimeValue(), 0 , 0, Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get()), dataset[0].y, 'driver', 1, 2, 0);
//     eventDataset[eventDataset.length-1].date = currentGraphDate;
//     eventDataset[eventDataset.length-1].seqId = lastId + eventDataset.length+1;
//        Events.insert(eventDataset[eventDataset.length-1]);
//    }
}

function addZeroTimeEvents(){
    
    var lastrecord = Events.find({sort: {seqId: 1}}).fetch();
    // console.log(lastrecord);
    var lastId = 0;
    if (lastrecord.length > 0) {
        lastId = lastrecord[lastrecord.length - 1].seqId + 1;
    }
  var zeroTimeEvents = Events.find({start_time: 0,date: currentGraphDate, userId: sensorUserId,companyId:companyId}).fetch();
   console.log("BEFORE CONDTION ZeroTIME EVENT---");
    if(zeroTimeEvents.length==0 && dataset.length>0){
        console.log("ZERO TIME EVENT CONSTION ---");
    addEvent(getCurrentTimeValue(), 0 , 0, Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get()), dataset[0].y, 'driver', 1, 2, 0);
     eventDataset[eventDataset.length-1].date = currentGraphDate;
     eventDataset[eventDataset.length-1].seqId = lastId +1;
        Events.insert(eventDataset[eventDataset.length-1]);
    }  
}

function saveData() {
    
    sortEvent();
    console.log(eventDataset);
    var date1 = new Date(_today);
    var date2 = new Date(currentGraphDate);
    var diff = parseInt((date1 - date2) / (1000 * 60 * 60 * 24));
    var daysCount = calculateDayNo();
    if (diff < multiDaysTotalDays - 1) {

        if (currentGraphDate != _today && daysCount < multiDaysTotalDays - 1) {
            updateForwardDaysCount(currentGraphDate, daysCount);
        }
    }
   
    // var today = localDateTime(Session.get("companyLocationOffset"));
    //var today = currentGraphDate;
    //today.setDate(today.getDate()-7);

    var dataset1 = JSON.stringify(dataset);
    var datasetLoc = JSON.stringify(locDataset);
    //var today2 = currentGraphDate;
    //today2.setDate(today2.getDate()-7);



    var onDutyHours = tCountOn.value;
    let
    onDutyHours1 = JSON.stringify(onDutyHours);
    var drivingHours = tCountD.value;
    let
    drivingHours1 = JSON.stringify(drivingHours);
    var sleeperHours = tCountSb.value;
    let
    sleeperHours1 = JSON.stringify(sleeperHours);
    var OffDutyHours = tCountOff.value;
    let
    OffDutyHours1 = JSON.stringify(OffDutyHours);
    var json = {"OFF": OffDutyHours1, "ON": onDutyHours1, "Sleeper": sleeperHours1, Driving: drivingHours1};
if(!!sensorUserId){
    if (Data.find({DateOFDataSaving: currentGraphDate, userId: sensorUserId,companyId:companyId}, {Details: 0, _id: 0}).count() == 0)
    {
        // alert("In if block.");
        Data.insert({Details: dataset1, Location: datasetLoc, EmployeeTimeSheet: json, DateOFDataSaving: currentGraphDate, Events: eventDataset, DayCount: daysCount, userId: sensorUserId,companyId:companyId});
    } 
    else
    {
        // alert("In else block.");

        var obj = Data.findOne({DateOFDataSaving: currentGraphDate, userId: sensorUserId,companyId:companyId}, {Details: 0, EmployeeTimeSheet: 0, DateOFDataSaving: 0});

        var ID = obj._id;

        // console.log(ID);
        Data.update(
                {_id: ID},
                {
                    Details: dataset1,
                    EmployeeTimeSheet: json,
                    //DateOFDataSaving: "Thursday, December 21, 2017",
                    Location: datasetLoc,
                    DateOFDataSaving: currentGraphDate,
                    Events: eventDataset,
                    DayCount: daysCount,
                    userId: sensorUserId,
                    companyId:companyId
                }
        )
    }
    
        setNextDayZero();
}
//else{
//    
//    alert("sensor ID not getting from session");
//}
//
//
//
    addEventIntoDB();
     //alert("save")
    //console.log(Events);
}
function setNextDayZero(){
    if(dataset.length>0){
     var data = getDaysAfterDatafromdate(currentGraphDate, 1);
    
      if(data.length>0){
           var tempDataset = JSON.parse(data[0].Details);
           if(tempDataset.length>0){
               if(tempDataset[0].x !== dataset[dataset.length-1].x){
                   var numberOfZeroPoint = 0;
                   for(var i =0;i<3 && i<tempDataset.length  ;i++){
                       if(tempDataset[i].x == 0){
                           numberOfZeroPoint++;
                       }
                       else{
                           break;
                       }
                   }
                   if(numberOfZeroPoint > 1){
                       tempDataset[0].y = dataset[dataset.length-1].y
                   }
                   else{
                     tempDataset.insert(0,{x: 0, y: dataset[dataset.length-1].y, lineColor: "green"});
                     //tempDataset.insert(1,{x: 0, y: tempDataset[1].y, lineColor: "green"});
                   }
             Data.update(
                {_id: data[0]._id},
                {
                    Details:  JSON.stringify(tempDataset),
                    EmployeeTimeSheet: data[0].EmployeeTimeSheet,
                    //DateOFDataSaving: "Friday, June 16, 2017"
                    Location: data[0].Location,
                    DateOFDataSaving: data[0].DateOFDataSaving,
                    Events    : data[0]. Events   ,
                    DayCount  : data[0]. DayCount ,
                    userId    : data[0]. userId   ,
                    companyId : data[0]. companyId
                }
        )
                   
               }
           }
      }
  }
      
}
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

function findTodaysData()
{

    var todaysData = Data.findOne({DateOFDataSaving: _today, userId: sensorUserId,companyId:companyId});

    dataset = JSON.parse(todaysData.Details);


    plotGraph();
    updateLabel();
    // console.log(changeStatusData);
}

function getTodayDate() {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var today2 = localDateTime(Session.get("companyLocationOffset"));
    var _today = today2.toLocaleDateString("en-US", dateFormat);
    return _today;
}

function getDaysBeforedata(i) {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};

    var yesterday = localDateTime(Session.get("companyLocationOffset"));
    yesterday.setDate(yesterday.getDate() - i);
    var _yesterday = yesterday.toLocaleDateString("en-US", dateFormat);
    var oneDayBeforeData = Data.find({DateOFDataSaving: _yesterday, userId: sensorUserId,companyId:companyId}).fetch();
    return oneDayBeforeData;
}

function getDaysBeforeDatafromdate(dateString, i) {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};

    var mydate = new Date(dateString);

    mydate.setDate(mydate.getDate() - i);

    var _yesterday = mydate.toLocaleDateString("en-US", dateFormat);

    var oneDayBeforeData = Data.find({DateOFDataSaving: _yesterday, userId: sensorUserId,companyId:companyId}).fetch();

    return oneDayBeforeData;
}

function getDaysAfterDatafromdate(dateString, i) {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};

    var mydate = new Date(dateString);

    mydate.setDate(mydate.getDate() + i);

    var _yesterday = mydate.toLocaleDateString("en-US", dateFormat);

    var oneDayBeforeData = Data.find({DateOFDataSaving: _yesterday, userId: sensorUserId,companyId:companyId}).fetch();

    return oneDayBeforeData;
}

function getEventsWIthData(currentGraphDate){
   return Events.find({date: currentGraphDate, userId: sensorUserId,companyId:companyId}).fetch();

}

function setLive() {
    disableEditMode();
    clearInterval(timer);
    timer = setInterval(updateTimer, 60000);
}

function disableEditMode() {
    showCurrentStatus(orignalStatus);

    livemode.style.display = '';
    $(".edit-btn").show();
    $(".location-div").hide();
    $(".live-btn").hide();
    isEdit = false;
}

function getCurrentSessionDate() {
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var mydate = new Date(Session.get("CurrentDate"));
    mydate.setDate(mydate.getDate());
    var _yesterday = mydate.toLocaleDateString("en-US", dateFormat);
    return _yesterday;
}

Template.driver_log.events({
    "click [offdut]": function (e, tpl) {
		var resultis = validateEditTime();
		if(!resultis)
			return false;
        if(!fromDriver() && isEdit){
        if(dutyStatus !="offDutyButton" || isEdit){
        dutyStatus = "offDutyButton";
        update(3.5);
        }
    }
    
    else if(fromDriver()){
        if(dutyStatus !="offDutyButton" || isEdit){
        dutyStatus = "offDutyButton";
        update(3.5);
        }
    }
    }
})
Template.driver_log.events({
    "click [sleeper]": function (e, tpl) {
		var resultis = validateEditTime();
		console.log(resultis)
		if(!resultis)
			return false;
        if(!fromDriver() && isEdit){
        if(dutyStatus !="sbDutyButton" || isEdit){
        dutyStatus = "sbDutyButton";
        update(2.5);
        }
    }
    
    else if(fromDriver()){
        if(dutyStatus !="sbDutyButton" || isEdit){
        dutyStatus = "sbDutyButton";
        update(2.5);
        }
    }
    }
})
Template.driver_log.events({
    "click [driving]": function (e, tpl) {
		var resultis = validateEditTime();
		if(!resultis)
			return false;
        if(!fromDriver() && isEdit){
        if(dutyStatus !="dDutyButton" || isEdit){
        dutyStatus = "dDutyButton";
        update(1.5);
        }
    }
    
    else if(fromDriver()){
        if(dutyStatus !="dDutyButton" || isEdit){
        dutyStatus = "dDutyButton";
        update(1.5);
        }
    }
    }
})
Template.driver_log.events({
    "click [onduty]": function (e, tpl) {
		var resultis = validateEditTime();
		if(!resultis)
			return false;
        if(!fromDriver() && isEdit){
        if(dutyStatus !="onDutyButton" || isEdit){
        dutyStatus = "onDutyButton";
        update(0.5);
        }
    }
    
    else if(fromDriver()){
        if(dutyStatus !="onDutyButton" || isEdit){
        dutyStatus = "onDutyButton";
        update(0.5);
        }
    }
    }
})

Template.driver_log.events({
    "click [yardmove]": function (e, tpl) {
		var resultis = validateEditTime();
		if(!resultis)
			return false;
		if(!fromDriver() && isEdit){
        if(dutyStatus !="yardmove" || isEdit){
			dutyStatus = "yardmove";
			update(4.5);
        }
    }
    
    else if(fromDriver()){
        if(dutyStatus !="yardmove" || isEdit){
			dutyStatus = "yardmove";
			update(4.5);
        }
    }
    }
})

Template.driver_log.events({
    "click [personalduty]": function (e, tpl) {
		var resultis = validateEditTime();
		if(!resultis)
			return false;
		if(!fromDriver() && isEdit){
        if(dutyStatus !="personalduty" || isEdit){
         dutyStatus = "personalduty";
        update(5.5);
        }
    }
    
    else if(fromDriver()){
        if(dutyStatus !="personalduty" || isEdit){
        dutyStatus = "personalduty";
        update(5.5);
        }
    }

    }
})



Template.driver_log.events({
    "keypress .timepickermeterial": function (e, tpl) {
            var charCode;
            if (e.keyCode > 0) {
                charCode = e.which || e.keyCode;
            }
            else if (typeof (e.charCode) != "undefined") {
                charCode = e.which || e.keyCode;
            }
            if (charCode == 58)
                return true
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
    }
})



/*
 Template.driver_log.events({
 "click [Save]": function (e, tpl) {
 
 // alert("Calling saveData() function ");
 if(eventDataset.length>0){
 var textAddress = document.getElementById('autocomplete').value;
 if(!textAddress){
 textAddress = address;
 }
 var last_element = eventDataset[eventDataset.length-1];
 
 addEvent(getCurrentTimeValue(),last_element.start_time,last_element.end_time,textAddress,last_element.status);
 console.log(eventDataset);
 if(isEdit ){
 if(eventDataset.length>1){
 var last_element = eventDataset[eventDataset.length-2]; 
 addEvent(getCurrentTimeValue(),last_element.start_time,last_element.end_time,textAddress,last_element.status);
 }
 }
 }
 saveData();
 if(currentGraphDate ==getTodayDate()){
 setLive();
 }
 // console.log(data.find({}).fetch());
 

 }
 })
 */
Template.driver_log.events({
    "click [edit]": function (e, tpl) {

        //  alert("Calling saveData() function ");
        // saveData();
         isEdit = true;
        var speed = speedinput.value
        if (speed > 0 && isCoDriver == false) {
            alert('you can not edit while driving ');
            return;
        }
/*         var slider = $("#range").data("ionRangeSlider");
        slider.update({
            min: 0,
            max: 24,
            to: getCurrentHour(),
            from: 0

                    // etc.
        }); */
        var currentMintues = Math.round(getCurrentTimeValue().split(".")[1]*0.6);

        currentMintues = currentMintues > 9 ? currentMintues : "0"+currentMintues;
     $('#sel1').timepicker({
         defaultTime: '00:00',
    
     });
     $('#sel2').timepicker({
         defaultTime: 'now'
     });
/*         sel1.selectedIndex = 0;
        sel2.selectedIndex = getCurrentHour() * 4; */
      //  shadow()
       // plotGraph()

        livemode.style.display = 'none';
        $(".edit-btn").hide();
        $(".location-div").show();
        $(".live-btn").show();
       // range.style.display = '';
        clearStatus();
        clearInterval(timer);
    }
})

Template.driver_log.events({
    "click [live]": function (e, tpl) {
        isEdit = false;
        if (currentGraphDate == _today) {
            if(dataset.length>0){
                lastVaue = dataset[dataset.length-1].x;
            }
            updateTimer();
           // alert("calling from button")
            setLive();
        } else {
            disableEditMode();
        }
        // clearInterval(timer);
    }
})


Template.driver_log.events({
    "click [Cancel]": function (e, tpl) {

     // alert("Calling cancel function ");
        findTodaysData();
        setLive();

    }
})

Template.driver_log.events({
    "click [form]": function (e, tpl) {

        showCurrentStatus(orignalStatus);
        if (currentGraphDate === _today) {
            saveData();
        }
    }
})

Template.driver_log.events({
    "click [form]": function (e, tpl) {

        showCurrentStatus(orignalStatus);
        if (currentGraphDate === _today) {
            saveData();
        }
    }
})

Template.driver_log.events({
    "click #confirmOk": function (e, tpl) {
            $('#confirm_popup').modal('close');
        latestStaus = 3.5;
        NotesEdit.value = "";
        ZeroSpeedCounter = 0;
        updateTimer();
    }
}
)

/* Template.driver_log.events({
    "click #confirmCancel": function (e, tpl) {
            $('#confirm_popup').modal('close');

    }
}
) */

Template.log_screen.events({
    "click #gotoReport" : function(){
        if(fromDriver()){
        saveCurrentSignFlag(Session.get("CurrentDate").toDateString());
    if(Session.get("Data_change")){
       
    var r = confirm("Would you like to certify your changes ?");
    if (r == true) {
       Session.set("tabbar1_active_tab","tab4");
       Router.go("/form/"+Session.get("company_id_to_subscribe"));
       return;
    } else {
      
    }
    }
        }   
        Router.go("/reports/"+this.company_id);
    }
});

Template.driver_log.events({
    "change #sel1": function (evt) {
        shadow()
        plotGraph()

        //changeGraph2();

    }
})

Template.driver_log.events({
    "change #sel2": function (evt) {
        //changeGraph1();
/*         var slider = $("#range").data("ionRangeSlider");
        slider.update({
            min: 0,
            max: 24,
            to: sel2.selectedIndex / 4,
            // etc.
        }); */
        shadow()
        plotGraph()

    }
})

Template.driver_log.events({
    'input #speed': function (event, template) {
        updateTimer();
        saveData();
    }
});

if (Meteor.isServer) {
    Meteor.startup(function () {


        // code to run on server at startup
        ListView.publish(data);

    });
}

Template.driver_log.helpers({
    tasks: function ()
    {

        var count = Data.find({}).count();
        var dataRec = Data.find({}).fetch();
        return dataRec;


        //  console.log(Days.find({}).fetch());
    }
})


var oldData = [];
var checkBoxState = [];

// ---------Location code-----------------

import { Tracker } from
'meteor/tracker'

        var zeitInterval;
_lat = {
    current: 0,
    dep: new Deps.Dependency,
    get: function () {
        this.dep.depend();
        console.log('_lat');
//zeitInterval = Meteor.setInterval(getLocation, 30000000);
        if (this.current === 0) {
            getLocation();
        }

        return this.current;
    },
    set: function (value) {
        this.current = value;
        this.dep.changed();
        //Deps.flush();
        return this.current;
    }
};

_lon = {
    current: 0,
    dep: new Deps.Dependency,
    get: function () {
        this.dep.depend();

        if (this.current === 0) {
            getLocation();
        }

        return this.current;
    },
    set: function (value) {
        this.current = value;
        this.dep.changed();
        //Deps.flush();
        return this.current;
    }
};

function getLocation() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition, showError);

    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

var address = "";
//-------------Lokesh -----------------
var timeint=0;
//-------------Lokesh -----------------
function showPosition(position)
{
    //-------------Lokesh -----------------
    timeint = getCurrentTimeValue();
    //-------------Lokesh -----------------
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);
    _lat.set(position.coords.latitude);
    _lon.set(position.coords.longitude);

    address = Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get());

    var date = localDateTime(Session.get("companyLocationOffset"))
    var begun = moment(date).format("HH.mm");
    //console.log("Time---"+begun);

    if ((begun + '').includes(".")) {
        var decPart = parseInt((begun + "").split(".")[1]);
        var intPart = parseInt((begun + "").split(".")[0]);
        decPart = Math.floor((decPart) / 0.6);

        while ((decPart + '').length < 2) {
            decPart = decPart + '0'
        }
    }

    //console.log(locDataset);
}

function showError(error) {
        //-------------Lokesh -----------------
    if(timeint === 0){
    //  console.log(timeint);
        timeint = getCurrentTimeValue();
    }
    //alert(getCurrentTimeValue()-timeint);
    if(getCurrentTimeValue()-timeint > 1.0){
        timeint = getCurrentTimeValue();
        Blaze._globalHelpers.insertMalfunctionStatus("L");
    }
    Blaze._globalHelpers.insertMalfunctionEventStatus("3");
    //-------------Lokesh -----------------
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}


Template.location.helpers({
    lat: _lat.get(),
    lon: _lon.get()

});

function getTodayDateWithGivenTime(time) {
    var todayDate = moment(localDateTime(Session.get("companyLocationOffset"))).format('MM-DD-YYYY');
    return todayDate + " " + time;
}

Template.driver_log.helpers({
    "isFromDriver": function () {
        if (Session.get("isFromCompany")) {
            return false
        } else {
            return true;
        }
    }
});

function fromDriver() {
    return !Session.get("isFromCompany");
}
























//**********************************anurag***********************************//
Template.driver_log.helpers({
    "current_date": function () {
        if(currentGraphDate == getCurrentSessionDate()){
	            return convertToNavBarDate(Session.get("CurrentDate"));
	        }
        //alert("calling from changedate");
        //  alert(Session.get("CurrentDate"));
        var data = getDaysBeforeDatafromdate(Session.get("CurrentDate"), 0);
        //alert(Session.get("CurrentDate"));
        clearInterval(timer);

        var _yesterday = getCurrentSessionDate();

        //  console.log(data);
        if (data.length > 0) {
            
            currentGraphDate = data[0].DateOFDataSaving;


            if (currentGraphDate !== _today) {
                 if (gridDataset1.length > 0 && document.getElementById('tCountOff') != null) {
                clearInterval(timer);
                dataset = JSON.parse(data[0].Details);
                if (dataset[dataset.length - 1].x != 24) {
                    dataset.push({x: 24, y: dataset[dataset.length - 1].y, lineColor: "green"})
                    saveData();
                }
                // console.log(dataset);
                updateLabel();
                plotGraph();
                eventDataset = getEventsWIthData(currentGraphDate);
                }
            } else {
                
                if (gridDataset1.length > 0 && document.getElementById('tCountOff') != null ) {
                      dataset = JSON.parse(data[0].Details);
                    if(fromDriver()){
                      
                    setLive();
                    latestStaus = dataset[dataset.length - 1].y
                    lastVaue = dataset[dataset.length - 1].x
                    updateTimer();
                    eventDataset =getEventsWIthData(currentGraphDate);
                }
                else{
                     updateLabel();
                     plotGraph();
                }
                }
            }

            return convertToNavBarDate(Session.get("CurrentDate"));
        } else {

            // alert('No Data Found');

            currentGraphDate = _yesterday;
            if (gridDataset1.length > 0 && document.getElementById('tCountOff') != null) {
                dataset = [];
                if (currentGraphDate !== _today) {
                    dataset.push({x: 0, y: 3.5, lineColor: "green"});
                    dataset.push({x: 24, y: 3.5, lineColor: "green"});
                    updateLabel();
                    plotGraph();
                } else {
                  
                    isEdit = false;

                    initData();
                }
            }
              
            return convertToNavBarDate(Session.get("CurrentDate"));
        }

    }
})
Template.driver_log.helpers({
    option: function () {
        var _this = this
        return {
            string: function () {
                return "SAVE"
            },
            save: function () {

                //  alert("Calling saveData() function ");
                getLocation();
                if (eventDataset.length > 0) {
                    var textAddress = autocomplete.value;
                    /* if (!textAddress) {
                        textAddress = Blaze._globalHelpers.getMinimumDistance(_lat.get(),_lon.get());
                    } */



                    var last_element = eventDataset[getLatestEventIndex()];
                   // updateEvent(last_element.start_time, textAddress);


                    // addEvent(getCurrentTimeValue(),last_element.start_time,last_element.end_time,textAddress,last_element.status,'driver',1,2);
                    // console.log(eventDataset);
                    if (isEdit) {
                        if (eventDataset.length > 1 && (getLatestEventIndex() - 1) > -1) {
                            var last_element = eventDataset[getLatestEventIndex() - 1];
                            updateEvent(last_element.start_time, textAddress);
                            // addEvent(getCurrentTimeValue(),last_element.start_time,last_element.end_time,textAddress,last_element.status,'driver',1,2);
                        }
                    }
                }

                NotesEdit.value = "";
                saveData();
                if (currentGraphDate == _today) {
                   // alert("calling from save button")
                    setLive();
                } else {
                    disableEditMode();
                }
            }
        }
    }
});


function validateEditTime(){
	if(isEdit){
			var startTime = $("#sel1").val();
			var endTime = $("#sel2").val();
			if( startTime.length < 1 || startTime.indexOf(":") < 0 || Number(startTime.split(":")[0]) < 0 || Number(startTime.split(":")[1]) < 0 ||   Number(startTime.replace(":",".")) < 0 || Number(startTime.split(":")[0]) > 24 || Number(startTime.split(":")[1]) > 59 || isNaN(startTime.replace(":",".")) ){
				show_toast("Invalid Start Time");
				return false;
			}
			else if( endTime.length < 1 || endTime.indexOf(":") < 0 || Number(endTime.split(":")[0]) < 0 || Number(endTime.split(":")[1]) < 0 ||  Number(endTime.replace(":",".")) < 0 || Number(endTime.split(":")[0]) > 24 || Number(endTime.split(":")[1]) > 59 || isNaN(endTime.replace(":",".")) ){
				show_toast("Invalid End Time");
				return false;
			}
			else if(Number(startTime.replace(":",".")) >= Number(endTime.replace(":","."))){
				show_toast("Start Time should be less than End Time");
				return false;
			}
			/* else if((Number(startTime.split(":")[0]) == Number(endTime.split(":")[0])) && (Number(startTime.split(":")[1]) > Number(endTime.split(":")[1]))){
				show_toast("Start Time should be less than End Time");
				return false;
			} */
			/* else if(Number(startTime.replace(":",".")) == Number(endTime.replace(":","."))){
				show_toast("Start Time and End Time should not be same");
				return false;
			} */
			else if (currentGraphDate == _today){
				if(Number(endTime.replace(":",".")) >= getCurrentTimeValue()){
				show_toast("End time should not be greater than current time for today");
				return false;
				}
			}
			
		}
		
		return( true );
}
