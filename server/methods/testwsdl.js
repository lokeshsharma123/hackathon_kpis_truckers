Meteor.methods({
  //'testwsdl' () {
  testwsdl: function() {
   //var url = 'http://www.webservicex.com/CurrencyConvertor.asmx?wsdl';
   var url = 'https://www.kpis.in/xml/ELDSubmissionService.xml?wsdl';
   var args = {
     //FromCurrency: 'USD',
    // ToCurrency: 'INR'
	 
	 
	 ELDIdentifier:'TESTXX',
	 ELDRegistrationId:'TEST',
	 OutputFileBody:'ELD File Header Segment:'+
        ';,;,;,AL,4,1F'+
        ';,;,;,undefined'+
        ';,;,;,undefined'+
        '1,;,;,000000,;,9E'+
        ';,0,undefined'+
        '111117,085640,;,;,;,;,8F'+
        ';,;,;,;,undefined'+
        'User List:'+
        ';,D,;,;,36'+
        '1,S,;,;,B7'+
        'CMV List:'+
        ';,;,;,undefined'+
        ';,;,;,undefined'+
        'ELD Event List:'+
        'ELD Event Annotations or Comments:'+
        'Driver’s Certification/Recertification Actions:'+
        'Malfunctions and Data Diagnostic Events:'+
        'ELD Login/Logout Report:'+
        'CMV Engine Power-Up and Shut Down Activity:'+
        'Unidentified Driver Profile Records:'+
        'End of File:',
	 OutputFileComment:'TEST',
	 OutputFilename:'testing3.csv',
	 Test:true,
	 Version:1
   };

   try {
     var client = Soap.createClient(url);
     //var result = client.ConversionRate(args);
	 console.log(args);
	 var result = client.Submit(args);
     console.log(result);
   } catch (err) {
	   console.log(err);
     if (err.error === 'soap-creation') {
       console.log('SOAP Client creation failed');
     } else if (err.error === 'soap-method') {
       console.log('SOAP Method call failed');
     }

   }
   return result;
 }
});