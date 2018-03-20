//var fs = Npm.require('fs')
//var path = require('path')

	
Meteor.methods({
    "insert_sign": function(obj) {
	var name;
	var datee=new Date();
	
	/*if(!obj.esu)
	{
	var signature_file=new Buffer(obj.signature_file, 'base64')
	name=Meteor.userId()+"_"+new Date().toDateString().split(' ').join('_')+"_"+Math.floor((Math.random() * 1000000) + 1)+".jpg"
	fs.writeFileSync("../../../../../public/signatures/"+name, signature_file)
	var obj_f={userid:Meteor.userId(),date:new Date().toDateString(),timestamp:new Date(),signature_file:name}
	Sign.insert(obj_f)
	}
	*/
	var obj_f={userid:Meteor.userId(),date:obj.date_of_entry.toDateString(),company_id : obj.company_id,timestamp:new Date(),signature_file:Meteor.user().profile.signature}
	/*if(obj.esu)
	{
	var v=Sign.findOne({userid:this.userId},{sort: {timestamp: -1}}).signature_file
	obj.signature_file=v
	obj_f.signature_file=v
	}
	*/
	if (Sign.find({userid:Meteor.userId(),company_id : obj.company_id}).count() > 0)
    {
		Sign.update({userid:Meteor.userId(), company_id : obj.company_id},{userid:Meteor.userId(),date:obj.date_of_entry.toDateString(),company_id : obj.company_id,timestamp:new Date(),signature_file:Meteor.user().profile.signature});
	}
	else{
		Sign.insert(obj_f);
	}
	 
	obj.userid=Meteor.userId()
	obj.timestamp=new Date()
	obj.signature_file=Meteor.user().profile.signature
	//obj.date=new Date().toDateString()
	//if(!obj.date)
	//obj.date=new Date().toDateString()
	//else
	obj.date=obj.date_of_entry.toDateString();
	obj.esu=obj.esu?obj.esu:false
	//==========================
	var new_obj={}
	var seqId=0;
	var doc=Events.findOne({userId:this.userId},{limit: 1, sort: {seqId: -1}});
	if(doc)
	seqId=doc.seqId;
	
	new_obj.seqId=seqId+1
	new_obj.EventSequenceIDNumber=seqId+1;
new_obj.eventCode=1;
new_obj.eventType=4;
new_obj.eventDate=getDate()
new_obj.eventTime=getTime()
new_obj.DateOfTheCertifiedRecord=getDate(obj.date_of_entry.toDateString())
new_obj.CorrespondingCMVOrderNumber=""
new_obj.date=datee.toLocaleDateString("en-US", dateFormat)
new_obj.userId=this.userId;
Events.insert(new_obj)
	//==========================
function getDate(d) {
		if(d)
		var today = new Date(d);
		else
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear()%100;
		
		if(dd<10) {
			dd='0'+dd
		} 
		
		if(mm<10) {
			mm='0'+mm
		} 
		return mm.toString()+dd.toString()+yyyy.toString();
	}
	function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

		function getTime() {
			var today = new Date(),
				h = checkTime(today.getHours()),
				m = checkTime(today.getMinutes()),
				s = checkTime(today.getSeconds());
			return h.toString() + m.toString() + s.toString()
		}
    return SignLog.insert(obj)
	}

})

