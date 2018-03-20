Meteor.methods({
    "getReportData": function(obj) {
	var company_id=obj.company_id
	var no_of_days=parseInt(obj.no_of_days)
	
	 
	 var array=[];
	 
	 var date_to_find
	 for(var ii=1;ii<=no_of_days;ii++){
	 var datee=new Date()
	 var ob={}
	 datee.setDate(datee.getDate()-ii+1);
	 date_to_find=datee.toDateString()
	 //******************************************************************************************************************
	 var dateFormat = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    var today2 = datee;
    var _today = today2.toLocaleDateString("en-US", dateFormat);
	 //******************************************************************************************************************
	 ob.dvir=DVIRLog.findOne({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}});
	 ob.form=Form.findOne({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}});
	 ob.sign=SignLog.findOne({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}});
	 ob.dt=DVIRTrailerDefect.find({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	 ob.dv=DVIRVehicleDefect.find({userid:this.userId,date:date_to_find,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	 ob.date=date_to_find
         
 
	 ob.user=Meteor.user().profile
	 ob.graph_date=_today
	 ob.canvas_counter=ii
	 //***********************************************Suresh********************************************
	 var statusMap = {3.5: "Off Duty", 2.5: "Sleeper", 1.5: "Driving", 0.5: "ON Duty",4.5:"yardmove",5.5:"personalduty"};
	var recordEvents= Events.find({date:_today,userId:this.userId},{sort:{start_time:1}}).fetch();
var ret=[]
 
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
	 //*******************************************************************************************
var dataset=[]	
var loc =[]
var tmp_data=Data.findOne({DateOFDataSaving: _today,userId:this.userId});
if(tmp_data)
{
dataset = JSON.parse(tmp_data.Details);
       loc = JSON.parse(tmp_data.Location);
}
	   for (h = 0; h <= 24; h++) {

        

        for (var l = 0; l < 4; l++) {
            if (h == 24 && l > 0) {
                break;
            }

            dataset.push({x: i + l * 0.25, y: 3.5})
			
			}
	}
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

    for (var k = 0; k < 7; k++)
    {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 0);
        var _yesterday = yesterday.toLocaleDateString("en-US", dateFormat);
        var oneDayBeforeData = Data.find({DateOFDataSaving: _yesterday,userId:Meteor.userId()}).fetch();
        if (oneDayBeforeData.length > 0) {
            var drivedata = oneDayBeforeData[0].EmployeeTimeSheet;
            console.log((drivedata.ON.split('"').join('')));
            var dTime = Number(drivedata.Driving.split('"').join('')) + Number(drivedata.ON.split('"').join(''));
            totalWorkingHours = totalWorkingHours + dTime;
        }
    }


    //totalWorkingHours = totalWorkingHours+jsonData[0.5] + jsonData[1.5];
    console.log("totalWorkingHours " + totalWorkingHours);
   console.log(dataset);
    for (k = 0; k < dataset.length; k++) {
        if (k == dataset.length - 1) {
            //jsonData[dataset[k].y] = jsonData[dataset[k].y] + 1;
            jsonData[dataset[k].y] = jsonData[dataset[k].y] + dataset[k].x - last_change;
            changeStatusData.push({
                status: dataset[k].y,
                start: last_change,
                duration: (dataset[k].x - last_change),
                address: getLocationWithX(dataset[k].x,loc)
            });
            break;
        } else if (dataset[k].x == dataset[k + 1].x) {

        } else {

        }

        if (dataset[k].y != dataset[k + 1].y) {
            jsonData[dataset[k].y] = jsonData[dataset[k].y] + dataset[k].x - last_change;
            changeStatusData.push({
                status: dataset[k].y,
                start: last_change,
                duration: (dataset[k].x - last_change),
                address: getLocationWithX(dataset[k].x,loc)
            });
            last_change = dataset[k].x;
        }
        else if(dataset[k].y == 1.5) {
            
            var start =  dataset[k].x+1;
            var last_val = dataset[k].x;
            start = Number(((start+"").split(".")[0])+'.00');
            //alert(dataset[k + 1].x+'  '+start);
            while(start<dataset[k + 1].x){
               
                changeStatusData.push({
                status: dataset[k].y,
                start: last_val,
                duration: (start - last_val),
                address: getLocationWithX(dataset[k].x,loc)
            });
            last_change = start;
            last_val = start;
                start = start+1;
               
            }
            
        }
//       
        //chcek continue driving voilence 
        if (dataset[k].y == 1.5 && (dataset[k].x - last_change) > 8) {
            isContDrive = true;

        }

        if ((jsonData[0.5] + jsonData[1.5] > 56 || jsonData[1.5] > 44) && (dataset[k].y == 1.5) && (dataset[k + 1].y == 1.5)) {
            dataset[k] = {x: dataset[k].x, y: dataset[k].y, lineColor: "green"};
        } else if (isContDrive && (dataset[k].y == 1.5) && (dataset[k + 1].y == 1.5)) {
            dataset[k] = {x: dataset[k].x, y: dataset[k].y, lineColor: "green"};
        } else if (totalWorkingHours > 70 && (((dataset[k].y == 1.5) && (dataset[k + 1].y == 1.5)))) {
            dataset[k] = {x: dataset[k].x, y: dataset[k].y, lineColor: "green"};
        } else {
            dataset[k] = {x: dataset[k].x, y: dataset[k].y, lineColor: "green"};
        }

        //console.log(dataset[k])
    }
	 
	 //*******************************************************************************************
	 ob.graph_statuses=ret
	 ob.labels={
					tCountOff:changeNumToTime(jsonData[3.5]),
					tCountOn:changeNumToTime(jsonData[0.5]),
					tCountD:changeNumToTime(jsonData[1.5]),
					tCountSb: changeNumToTime(jsonData[2.5])
			   }
	
	 ob.cdp=CompanyDriverList.findOne({company_id:obj.company_id,driver_id:this.userId})
 
	 array.push(ob)
	 }
	
/*	datee.setDate(datee.getDate());
	 date1=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-1);
	 date2=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-2);
	 date3=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-3);
	 date4=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-4);
	 date5=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-5);
	 date6=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-6);
	 date7=datee.toDateString()
	 
	 datee=new Date()
	 datee.setDate(datee.getDate()-7);
	 date8=datee.toDateString()

	 
	 
	var d1=DVIRLog.findOne({userid:this.userId,date:date1,company_id:company_id},{sort: {timestamp: -1}});
	var d2=DVIRLog.findOne({userid:this.userId,date:date2,company_id:company_id},{sort: {timestamp: -1}})
	var d3=DVIRLog.findOne({userid:this.userId,date:date3,company_id:company_id},{sort: {timestamp: -1}})
	var d4=DVIRLog.findOne({userid:this.userId,date:date4,company_id:company_id},{sort: {timestamp: -1}})
	var d5=DVIRLog.findOne({userid:this.userId,date:date5,company_id:company_id},{sort: {timestamp: -1}})
	var d6=DVIRLog.findOne({userid:this.userId,date:date6,company_id:company_id},{sort: {timestamp: -1}})
	var d7=DVIRLog.findOne({userid:this.userId,date:date7,company_id:company_id},{sort: {timestamp: -1}})
	var d8=DVIRLog.findOne({userid:this.userId,date:date8,company_id:company_id},{sort: {timestamp: -1}})
	
	var dt1=DVIRTrailerDefect.find({userid:this.userId,date:date1,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt2=DVIRTrailerDefect.find({userid:this.userId,date:date2,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt3=DVIRTrailerDefect.find({userid:this.userId,date:date3,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt4=DVIRTrailerDefect.find({userid:this.userId,date:date4,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt5=DVIRTrailerDefect.find({userid:this.userId,date:date5,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt6=DVIRTrailerDefect.find({userid:this.userId,date:date6,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt7=DVIRTrailerDefect.find({userid:this.userId,date:date7,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dt8=DVIRTrailerDefect.find({userid:this.userId,date:date8,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	
	var dv1=DVIRVehicleDefect.find({userid:this.userId,date:date1,company_id:company_id},{sort: {timestamp: -1}}).fetch();;
	var dv2=DVIRVehicleDefect.find({userid:this.userId,date:date2,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dv3=DVIRVehicleDefect.find({userid:this.userId,date:date3,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dv4=DVIRVehicleDefect.find({userid:this.userId,date:date4,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dv5=DVIRVehicleDefect.find({userid:this.userId,date:date5,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dv6=DVIRVehicleDefect.find({userid:this.userId,date:date6,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dv7=DVIRVehicleDefect.find({userid:this.userId,date:date7,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	var dv8=DVIRVehicleDefect.find({userid:this.userId,date:date8,company_id:company_id},{sort: {timestamp: -1}}).fetch();
	
	
	var f1=Form.findOne({userid:this.userId,date:date1,company_id:company_id},{sort: {timestamp: -1}});
	var f2=Form.findOne({userid:this.userId,date:date2,company_id:company_id},{sort: {timestamp: -1}})
	var f3=Form.findOne({userid:this.userId,date:date3,company_id:company_id},{sort: {timestamp: -1}})
	var f4=Form.findOne({userid:this.userId,date:date4,company_id:company_id},{sort: {timestamp: -1}})
	var f5=Form.findOne({userid:this.userId,date:date5,company_id:company_id},{sort: {timestamp: -1}})
	var f6=Form.findOne({userid:this.userId,date:date6,company_id:company_id},{sort: {timestamp: -1}})
	var f7=Form.findOne({userid:this.userId,date:date7,company_id:company_id},{sort: {timestamp: -1}})
	var f8=Form.findOne({userid:this.userId,date:date8,company_id:company_id},{sort: {timestamp: -1}})
	
	var s1=SignLog.findOne({userid:this.userId,date:date1,company_id:company_id},{sort: {timestamp: -1}});
	var s2=SignLog.findOne({userid:this.userId,date:date2,company_id:company_id},{sort: {timestamp: -1}})
	var s3=SignLog.findOne({userid:this.userId,date:date3,company_id:company_id},{sort: {timestamp: -1}})
	var s4=SignLog.findOne({userid:this.userId,date:date4,company_id:company_id},{sort: {timestamp: -1}})
	var s5=SignLog.findOne({userid:this.userId,date:date5,company_id:company_id},{sort: {timestamp: -1}})
	var s6=SignLog.findOne({userid:this.userId,date:date6,company_id:company_id},{sort: {timestamp: -1}})
	var s7=SignLog.findOne({userid:this.userId,date:date7,company_id:company_id},{sort: {timestamp: -1}})
	var s8=SignLog.findOne({userid:this.userId,date:date8,company_id:company_id},{sort: {timestamp: -1}})
	

	var array=[{dvir:d1,form:f1,sign:s1,dt:dt1,dv:dv1,date:date1},{dvir:d2,form:f2,sign:s2,dt:dt2,dv:dv2,date:date2},
			   {dvir:d3,form:f3,sign:s3,dt:dt3,dv:dv3,date:date3},{dvir:d4,form:f4,sign:s4,dt:dt4,dv:dv4,date:date4},
			   {dvir:d5,form:f5,sign:s5,dt:dt5,dv:dv5,date:date5},{dvir:d6,form:f6,sign:s6,dt:dt6,dv:dv6,date:date6},
			   {dvir:d7,form:f7,sign:s7,dt:dt7,dv:dv7,date:date7},{dvir:d8,form:f8,sign:s8,dt:dt8,dv:dv8,date:date8}]
 	*/
	
	return array
	}
	

});


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

function getLocationWithX(x,loc) {

    for (var i = 0; i < loc.length; i++) {

        if (x == loc[i].x) {
            return loc[i].address;
        }
    }
}

Meteor.methods({
  "sendEmail":function(to, from, subject, text,attachment) {
    // Make sure that all arguments are strings.
     process.env.MAIL_URL = 
         "smtp://postmaster@sandboxd37d12ee05dc48acae058aaad370bc3f.mailgun.org:487cc786f2cf3595b0bf0865a3411f06@smtp.mailgun.org:587";

    Email.send({
  to: to,
  from: from,
  subject: subject,
  text: text,
  attachments:attachment
});
  }
});