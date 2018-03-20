var totalWorkingHours = 0;
var stripes = [];

var dataset = [];
var gridDataset1 = [];
var gridDataset2 = [];
var gridDataset3 = [];
var gridDataset4 = [];
var jsonData = {};

var changeStatusData = [];
var statusMap = {3.5: "Off Duty", 2.5: "Sleeper", 1.5: "Driving", 0.5: "ON Duty",4.5:"yardmove",5.5:"personalduty"};
var pdf = new jsPDF('', 'pt', 'a4');
var chart;
var companyId ;

var loc = [];

    for (i = 0; i <= 24; i++) {

        stripes.push({
            value: i,
            color: "#bbbbbb"
        })

        for (var j = 0; j < 4; j++) {
            if (i == 24 && j > 0) {
                break;
            }
var xvalue_is = i + j * 0.25;
            dataset.push({x: xvalue_is, y: 3.5})

            //for grid
            if (j == 1 || j == 3) {
                gridDataset1.push({x: xvalue_is, y: [0, 0.25]});
                gridDataset2.push({x: xvalue_is, y: [1, 1.25]});
                gridDataset3.push({x: xvalue_is, y: [2, 2.25]});
                gridDataset4.push({x: xvalue_is, y: [3, 3.25]});
            } else if (j == 2) {
                gridDataset1.push({x: xvalue_is, y: [0, 0.5]});
                gridDataset2.push({x: xvalue_is, y: [1, 1.5]});
                gridDataset3.push({x: xvalue_is, y: [2, 2.5]});
                gridDataset4.push({x: xvalue_is, y: [3, 3.5]});
            }
        }

    }



Template.reports_screen_by_graph_developer.onRendered(function () {

   companyId=Session.get("company_id_to_subscribe")
   var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
   var today2 = localDateTime(Session.get("companyLocationOffset"));
   var _today = today2.toLocaleDateString("en-US", dateFormat);
	   ret = this.data.graph_statuses;
 if(this.data.date===_today){
 findTodaysData(_today,this.data.canvas_counter);
 setStatus(this.data.canvas_counter,this.data.date);
 }
 else
 setDaysBeforeData(this.data.date,this.data.canvas_counter);
	
    Session.set("counter", ret);
	
});


function findTodaysData(_today,canvas_counter)
{
   var userId = Meteor.userId();
 if(Session.get("isFromCompany")){
     userId =  Session.get("senserUserId")
 }
    var todaysData = Data.findOne({DateOFDataSaving: _today,userId:userId,companyId:companyId});
     console.log(todaysData);
    if(todaysData){
    dataset = JSON.parse(todaysData.Details);
 
   // console.log(loc);
    }
    else{
         dataset = [];
            dataset.push({x: 0, y: 3.5,lineColor: "green"});
            dataset.push({x: 24, y: 3.5,lineColor: "green"});
    }

    plotGraph(canvas_counter);

    // updateLabel();
    // console.log(changeStatusData);
}

function setDaysBeforeData(i,canvas_counter) {

  var userId = Meteor.userId();
 if(Session.get("isFromCompany")){
     userId =  Session.get("senserUserId")
 }
    var _yesterday = getdaysBeforedate(i);
    var oneDayBeforeData = Data.findOne({DateOFDataSaving: i,userId:userId,companyId:companyId});
    //  var oneDayBeforeData = Data.find().fetch();
//     console.log(_yesterday+'    '+i);
//    console.log(oneDayBeforeData);
    if (oneDayBeforeData) {

        dataset = JSON.parse(oneDayBeforeData.Details);
        if (dataset[dataset.length - 1].x != 24) {
            dataset.push({x: 24, y: dataset[dataset.length - 1].y,lineColor: "green"})
        }
        loc = JSON.parse(oneDayBeforeData.Location);
        //console.log(loc);

    } else {
        dataset = [];
        dataset.push({x: 0, y: 3.5,lineColor: "green"});
        dataset.push({x: 24, y: 3.5,lineColor: "green"});
    }
 
   setStatus(canvas_counter,_yesterday);
      plotGraph(canvas_counter);
   Session.set("counter", ret);
}

function getdaysBeforedate(i){
         var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};

     var yesterday = localDateTime(Session.get("companyLocationOffset"));
    yesterday.setDate(yesterday.getDate() - i);
    var _yesterday = yesterday.toLocaleDateString("en-US", dateFormat);
    return _yesterday;
}


function plotGraph(canvas_counter) {
//console.log("chartContainer"+canvas_counter)
     console.log(stripes);
     console.log(dataset);
	chart = null;
    chart = new CanvasJS.Chart("chartContainer"+canvas_counter, {
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
    chart.render();
}

function updateLabel(canvas_counter) {
  
    jsonData = {};
    jsonData[3.5] = 0;
    jsonData[0.5] = 0;
    jsonData[1.5] = 0;
    jsonData[2.5] = 0;
    var contDriveTime = 0;
    var contBreakTime = 0;
    var isContDrive = false;
    var DataOfWeekk = [];
    var totalWorkingHours = 0;
    var last_change = 0;
    changeStatusData = [];
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};

    for (var i = 0; i < 7; i++)
    {
        var yesterday = localDateTime(Session.get("companyLocationOffset"));
        yesterday.setDate(yesterday.getDate() - 0);
        var _yesterday = yesterday.toLocaleDateString("en-US", dateFormat);
        var oneDayBeforeData = Data.find({DateOFDataSaving: _yesterday,userId:Meteor.userId(),companyId:companyId}).fetch();
        if (oneDayBeforeData.length > 0) {
            var drivedata = oneDayBeforeData[0].EmployeeTimeSheet;
            //console.log((drivedata.ON.split('"').join('')));
            var dTime = Number(drivedata.Driving.split('"').join('')) + Number(drivedata.ON.split('"').join(''));
            totalWorkingHours = totalWorkingHours + dTime;
        }
    }


    //totalWorkingHours = totalWorkingHours+jsonData[0.5] + jsonData[1.5];
    //console.log("totalWorkingHours " + totalWorkingHours);
   //console.log(dataset);
   for (i = 0; i < dataset.length ; i++) {
        if (i == dataset.length - 1) {
            //jsonData[dataset[i].y] = jsonData[dataset[i].y] + 1;
             if(dataset[i].y == 1.5 || dataset[i].y == 0.5){
            lastTime = dataset[i].x;
        }
            jsonData[dataset[i].y] = jsonData[dataset[i].y]+dataset[i].x-last_change;
            //console.log("final value "+jsonData[dataset[i].y]+"  for "+dataset[i].y +" and counter is "+canvas_counter);
            break;
        } else if (dataset[i].x == dataset[i + 1].x) {

        } else {
           
        }
        if(dataset[i].y == 1.5 || dataset[i].y == 0.5){
            
            lastTime = dataset[i].x;
        }
      
        //chcek continue driving voilence 
        
      
         if (dataset[i].y != dataset[i + 1].y) {
		      jsonData[dataset[i].y] = jsonData[dataset[i].y]+dataset[i].x-last_change;	
                     last_change = dataset[i].x;
          }
         
   
    dataset[i] = {x: dataset[i].x, y: dataset[i].y, lineColor: "green"};
    console.log(ret);
//    if(ret){
//       for(var k = 0;k<ret.length;k++){
//            
//        if(dataset[i].x == Number(ret[k].time_number) && ret[k].type == 3){
//          
//            dataset[i] = {x: dataset[i].x, y: dataset[i].y, lineColor: "red"};
//            break;
//        }
//    }
//      
//    }
      console.log(dataset[i])
    
   }
    document.getElementById('tCountOff'+canvas_counter).innerHTML = changeNumToTime(jsonData[3.5]);
    document.getElementById('tCountOn'+canvas_counter).innerHTML = changeNumToTime(jsonData[0.5]);
    document.getElementById('tCountD'+canvas_counter).innerHTML = changeNumToTime(jsonData[1.5]);
    document.getElementById('tCountSb'+canvas_counter).innerHTML = changeNumToTime(jsonData[2.5]);

}

function changeNumToTime(num) {

    if ((num + '').includes(".")) {
        var decPart = ((num + "").split(".")[1]);
        var intPart = parseInt((num + "").split(".")[0]);
        var str = '';
        for (var i = 0, len = decPart.length; i < len; i++) {
            if (decPart[i] == '0') {
                str = str + '0';
            } else {
                break;
            }
        }
        decPart = (decPart) * 0.6;
        decPart = Math.round(decPart);
        decPart = str + decPart;
        while ((decPart + '').length < 2) {
            decPart = decPart + '0'
        }
        if ((decPart + '').length > 2) {

            decPart = (decPart + '').substring(0, 2);
        }
        num = intPart + ':' + decPart;

    }
    return num;
}

function getLocationWithX(x) {

    for (var i = 0; i < loc.length; i++) {

        if (x == loc[i].x) {
            console.log("asssss" + loc[i].address);
            return loc[i].address;
        }
    }
}


Template.reports_screen_by_graph_developer.events({
    "click [exportpdf]": function (e, tpl) {
//        setDaysBeforeData(1);
//         Session.set("counter",ret);
//        return;
        var i = 0;
        getSinglePdfPage(i)
    },
     "change #dates": function(evt) {
         var element = document.getElementById('dates');
         setDaysBeforeData(element.selectedIndex);
     }
})

function getSinglePdfPage(i) {
    html2canvas(document.body, {
        onrendered: function (canvas) {

            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            //The height of the canvas which one pdf page can show;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //the height of canvas that haven't render to pdf
            var leftHeight = contentHeight;
            //addImage y-axial offset
            var position = 0;
            //a4 format [595.28,841.89]	      
            var imgWidth = 595.28;
            var imgHeight = 592.28 / contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/png', 1.0);
            // alert(i);
            console.log(i);

            pdf.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.addPage();
            i++;
            if (i == 1) {
                pdf.save('content.pdf');
               // findTodaysData();
            } else {
                setDaysBeforeData(i)
                setStatus(i);
                Session.set("counter", ret);
                getSinglePdfPage(i);
            }
        }
    })
}

 
    Session.setDefault("counter", ret);
    Template.reports_screen_by_graph_developer.helpers({
        dataComings: function ()
        {
            var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
            var x = 1;
            var DataOfWeekk = [];
            totalWorkingHours = 0;
            for (var i = 0; i < 7; i++)
            {
                var yesterday = localDateTime(Session.get("companyLocationOffset"));
                yesterday.setDate(yesterday.getDate() - 0);
                var _yesterday = yesterday.toLocaleDateString("en-US", dateFormat);
                var oneDayBeforeData = Data.find({DateOFDataSaving: _yesterday,userId:Meteor.userId(),companyId:companyId}).fetch();
                var drivedata = oneDayBeforeData[0].EmployeeTimeSheet;
                var dTime = Number(drivedata.Driving.split('"').join('')) + Number(drivedata.ON.split('"').join(''));
                totalWorkingHours = totalWorkingHours + dTime;
                var onDuty = {duty: dTime};
                DataOfWeekk.push(onDuty);
                x++;
            }

            console.log(DataOfWeekk);
            return DataOfWeekk;

        },
        statuses: function () {
 
            Session.set("counter", ret);
            return this.graph_statuses
        },
		labels: function () {
 
           
            return this.labels
        },
    })
 

function setStatus(daysB,graph_date) {
    
     updateLabel(daysB);
    var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var today2 = localDateTime(Session.get("companyLocationOffset"));
    today2.setDate(today2.getDate() - daysB);
    var _today = today2.toLocaleDateString("en-US", dateFormat);
    var todaysData = Data.findOne({DateOFDataSaving: graph_date,userId:Meteor.userId()});
    ret = [];
    if (!todaysData) {
        return;
    }
    //console.log(todaysData);
   

   


//    for (i = 1; i < changeStatusData.length; i++) {
//        var address = "";
//        var time;
//        var origin = "driver";
//        var status = statusMap[changeStatusData[i].status];
//        var notes = "";
//        for (var j = 0; j < todaysData.Events.length; j++) {
//            if (changeStatusData[i].start == 0) {
//                if (changeStatusData[i].start + changeStatusData[i].duration == todaysData.Events[j].start_time) {
//                    address = todaysData.Events[j].location;
//                    time = todaysData.Events[j].time;
//                    origin = todaysData.Events[j].origin;
//                    // status = todaysData.Events[j].status;
//                    notes = todaysData.Events[j].notes;
//                    break;
//                }
//            }
//            if (changeStatusData[i].start == todaysData.Events[j].start_time) {
//                address = todaysData.Events[j].location;
//                time = todaysData.Events[j].time;
//                origin = todaysData.Events[j].origin;
//                status = todaysData.Events[j].status;
//                notes = todaysData.Events[j].notes;
//                break;
//            }
//
//        }
//
//        ret.push({
//            index: (i + 1),
//            status: status,
//            start_time: changeNumToTime(changeStatusData[i].duration),
//            duration: changeStatusData[i].duration,
//            location: address,
//            time: changeNumToTime(changeStatusData[i].start),
//            origin: origin,
//            notes: notes
//        });
//    }
    
    var recordEvents = Events.find({date:_today,userId:Meteor.userId(),companyId:companyId},{sort:{start_time:1}}).fetch();
    console.log(recordEvents);
    for(var i = 0;i<recordEvents.length;i++){
        if(recordEvents[i].recordStatus == 2){
            
            continue;
        }
        var status  = "";
        var origin = "driver";
        
         if(recordEvents[i].type == 1){
           var code = 4.5-recordEvents[i].code;
           status = statusMap[code];
          // alert(status);
        }
        else if(recordEvents[i].type == 3){
            var code = 3.5+recordEvents[i].code;
              status = statusMap[code];
        }
         else{//for other events
             continue;
         }
       
        if(recordEvents[i].recordOrigin == 1){
            origin = "auto";
        }
         ret.push({
            start_time: changeNumToTime(recordEvents[i].start_time),
            location: recordEvents[i].location,
            odometer: recordEvents[i].vehicleMiles,
            engine_hour: recordEvents[i].engineHour,
            status: status,
            origin: origin,
            
        });
    }
    //     updateLabel();
//        changeStatusData.push({'status':1});
//        changeStatusData.push({'status':1});

    console.log(ret);
    return ret;
}


var oldData = [];
var checkBoxState = [];
var ret = [];