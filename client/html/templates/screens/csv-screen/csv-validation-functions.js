csvValidateDE_1=function csvValidateDE_1(n,f){
	var name="csvValidateDE_1"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(n.length!==6)
	return csv_error_push("Error in "+f+" : Length must be 6")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Must only contain numbers")
	
	var intN=parseInt(n)
	if(!(intN>=0 && intN<=235959))
	return csv_error_push("Error in "+f+" : Range must be in 000000-235959")
	
	var hh=parseInt(n.substring(0, 2))
	if(!(hh>=0 && hh<=23))
	return csv_error_push("Error in "+f+" : HH must be in the range 00-23")
	
	var mm=parseInt(n.substring(2, 4))
	if(!(mm>=0 && mm<=59))
	return csv_error_push("Error in "+f+" : MM must be in the range 00-59")
	
	var ss=parseInt(n.substring(4, 6))
	if(!(ss>=0 && ss<=59))
	return csv_error_push("Error in "+f+" : SS must be in the range 00-59")
	
	return n
	}
	
	
	
	csvValidateDE_2=function csvValidateDE_2(n,f){
	var name="csvValidateDE_2"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=4 && n.length<=120))
	return csv_error_push("Error in "+f+" : Length must be between 4 and 120")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is allowed")
	
	return n
	}
	
	csvValidateDE_3=function csvValidateDE_3(n,f){
	var name="csvValidateDE_3"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=1 && n.length<=9))
	return csv_error_push("Error in "+f+" : Length must be between 1 and 9")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Must only contain a number")
	
	return n
	}
	
	csvValidateDE_4=function csvValidateDE_4(n,f){
	var name="csvValidateDE_4"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=1 && n.length<=10))
	return csv_error_push("Error in "+f+" : Length must be between 1 and 10")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is allowed")
	
	return n
	}
	
	csvValidateDE_5=function csvValidateDE_5(n,f){
	
	var name="csvValidateDE_5"
	if(typeof n === "undefined")
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==17 || n.length==18 || n.length==0) )
	return csv_error_push("Error in "+f+" : Length must be  either 0 or 17 or 18.")
	
	if(!validateAlphanumeric(n))// VIN validation to be applied
	return csv_error_push("Error in "+f+" : Only Alphanumeric is allowed")
	
	return n
	}
	
	csvValidateDE_6=function csvValidateDE_6(n,f){
	
	var name="csvValidateDE_6"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!n)//: 0–60 characters if optionally entered; 4–60 characters if annotation 
	return csv_error_push("Error in "+f+" : Length must be  either 0 or 17 or 18.")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is allowed")
	
	return n
	}
	
	csvValidateDE_7=function csvValidateDE_7(n,f){
	
	var name="csvValidateDE_7"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==1))
	return csv_error_push("Error in "+f+" : Length must be 1")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Only Integer is allowed")
	
	if( !(n===0 || n ===1)) 
	return csv_error_push("Error in "+f+" : Value must be either 0 or 1.")
	
	return n
	}
	
	csvValidateDE_8=function csvValidateDE_8(n,f){
	
	var name="csvValidateDE_8"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==6))
	return csv_error_push("Error in "+f+" : Length must be 6")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Only Integer is allowed")
	
	var mm=parseInt(n.substring(0, 2))
	if(!(mm>=01 && mm<=12))
	return csv_error_push("Error in "+f+" : MM must be in the range 01-12")
	
	var dd=parseInt(n.substring(2, 4))
	if(!(dd>=1 && dd<=31))
	return csv_error_push("Error in "+f+" : DD must be in the range 01-31")
	
	var yy=parseInt(n.substring(4, 6))
	if(!(yy>00 && yy<=99))
	return csv_error_push("Error in "+f+" : YY must be in the range 00-99")
	
	return n
	}
	
	csvValidateDE_9=function csvValidateDE_9(n,f){
	
	var name="csvValidateDE_9"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==1))
	return csv_error_push("Error in "+f+" : Length must be 1")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Only Integer is allowed")
	
	if( !(n===0 || n ===1 || n ===2 || n ===3|| n ===4|| n ===5 || n ===6)) 
	return csv_error_push("Error in "+f+" : Value must be either 0 or 1 or 2 or 3 or 4 or 5 or 6.")
	
	return n
	}
	
	
	csvValidateDE_10=function csvValidateDE_10(n,f){
	
	var name="csvValidateDE_10"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==2))
	return csv_error_push("Error in "+f+" : Length must be 2")
	
	if(!validateCharacter(n))
	return csv_error_push("Error in "+f+" : Only Character is allowed")
	
	
	return n
	}
	
	csvValidateDE_11=function csvValidateDE_11(n,f){
	
	var name="csvValidateDE_11"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=1 && n.length<=20))
	return csv_error_push("Error in "+f+" : Length must be 1 to 20")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Character is allowed")
	
	
	return n
	}
	
	csvValidateDE_12=function csvValidateDE_12(n,f){
	
	var name="csvValidateDE_12"
	/* if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	 */
	if(!(n.length>=5 && n.length<=60))
	return csv_error_push("Error in "+f+" : Length must be 5 to 60")
	
	 if(!validateAlphanumericWithComma(n))
	return csv_error_push("Error in "+f+" : Only Character is allowed")
	 
	
	return n
	}
	
	csvValidateDE_13=function csvValidateDE_13(n,f){
	
	var name="csvValidateDE_13"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==1))
	return csv_error_push("Error in "+f+" : Length must be 1")
	
	if(!validateCapitalCharacter(n))
	return csv_error_push("Error in "+f+" : Only Character is Capital A to Z allowed")
	
	
	return n
	}
	
	
	csvValidateDE_14=function csvValidateDE_14(n,f){
	
	var name="csvValidateDE_14"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=16 && n.length<=32))
	return csv_error_push("Error in "+f+" : Length must be 16 to 32")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Character Alphanumeric is allowed")
	
	
	return n
	}
	
	csvValidateDE_15=function csvValidateDE_15(n,f){
	
	var name="csvValidateDE_15"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==6 ))
	return csv_error_push("Error in "+f+" : Length must be 6")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is  allowed")
	
	
	return n
	}
	
	csvValidateDE_16=function csvValidateDE_16(n,f){
	
	var name="csvValidateDE_16"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=4 && n.length<=120))
	return csv_error_push("Error in "+f+" : Length must be 4 to 120")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is  allowed")
	
	
	return n
	}
	
	csvValidateDE_17=function csvValidateDE_17(n,f){
	
	var name="csvValidateDE_17"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length==4 ))
	return csv_error_push("Error in "+f+" : Length must be 4")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is  allowed")
	
	
	return n
	}
	
	csvValidateDE_18=function csvValidateDE_18(n,f){
	
	var name="csvValidateDE_18"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length>=4 && n.length<=60))
	return csv_error_push("Error in "+f+" : Length must be 4 to 60")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Only Alphanumeric is  allowed")
	
	
	return n
	}
	
	csvValidateDE_19=function csvValidateDE_19(n,f){
	
	var name="csvValidateDE_19"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.toString().length>=3 && n.toString().length<=7))
	return csv_error_push("Error in "+f+" : Length must be 3 to 7")
	
	if(!validateDecimal(n))
	return csv_error_push("Error in "+f+" : Only Decimal Number are allowed")
	
	
	return n
	}
	csvValidateDE_20=function csvValidateDE_20(n,f){
	
	var name="csvValidateDE_20"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Only Integer Number are allowed")
	
	if(!(n.toString().length==1 ))
	return csv_error_push("Error in "+f+" : Length must be 1")
	
	return n
	}
	
	csvValidateDE_21=function csvValidateDE_21(n,f){
	
	var name="csvValidateDE_21"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!validateHexaDecimal(n))
	return csv_error_push("Error in "+f+" : Only Hexadecimal Number are allowed")
	
	if(!(n.length==2 ))
	return csv_error_push("Error in "+f+" : Length must be 2")
	
	return n
	}
	
	csvValidateDE_22=function csvValidateDE_22(n,f){
	
	var name="csvValidateDE_22"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Only Integer Number are allowed")
	
	if(!(n.toString().length==1 ))
	return csv_error_push("Error in "+f+" : Length must be 1")
	
	return n
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//========================================
	csvValidateDE_23=function csvValidateDE_23(n,f){
	var name="csvValidateDE_23"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.toString().length==1))
	return csv_error_push("Error in "+f+" : Length must be 1")
	var intN=parseInt(n)
	if(!(intN>=1 && intN<=4))
	return csv_error_push("Error in "+f+" : Range must be in 1-4")
	return n;
	}
	
	csvValidateDE_24=function csvValidateDE_24(n,f){
	var name="csvValidateDE_24"
	if(!n && n!=0 )
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.toString().length<=4 && n.toString().length>=1))
	return csv_error_push("Error in "+f+" : Length must be 1-4")
	var intN=parseInt(n)
	if(!validateHexaDecimal(n))
	return csv_error_push("Error in "+f+" : Range must be in 0-ffff")  //Doubt
	return n;
	}
	
	csvValidateDE_25=function csvValidateDE_25(n,f){
	var name="csvValidateDE_25"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.toString().length==1))
	return csv_error_push("Error in "+f+" : Length must be 1")
	var intN=parseInt(n)
	if(!(intN>=1 && intN<=7))
	return csv_error_push("Error in "+f+" : Range must be in 1-7")
	return n;
	}
	
	csvValidateDE_26=function csvValidateDE_26(n,f){
	var name="csvValidateDE_26"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==1))
	return csv_error_push("Error in "+f+" : Length must be 1")
	var intN=parseInt(n)
	if(!(intN=="0" || n=="E"))
	return csv_error_push("Error in "+f+" : Input Must be 0 or E")
	return n;
	}
	
	csvValidateDE_27=function csvValidateDE_27(n,f){
	var name="csvValidateDE_27"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==4))
	return csv_error_push("Error in "+f+" : Length must be 4")
	if(!validateHexaDecimal(n))
	return csv_error_push("Error in "+f+" : Range must be in 0-ffff")  //Doubt
	return n;
	}
	
	csvValidateDE_28=function csvValidateDE_28(n,f){
	var name="csvValidateDE_28"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length>=2 && n.length<=30))
	return csv_error_push("Error in "+f+" : Length must be Minimum 2 & Maximum 30")
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	return n;
	}
	
	csvValidateDE_29=function csvValidateDE_29(n,f){
	var name="csvValidateDE_29"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length>=5 && n.length<=60))
	return csv_error_push("Error in "+f+" : Length must be Minimum 5 & Maximum 60")     //Doubt
	return n;
	}
	
	csvValidateDE_30=function csvValidateDE_30(n,f){
	var name="csvValidateDE_30"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length>=2 && n.length<=30))
	return csv_error_push("Error in "+f+" : Length must be Minimum 2 & Maximum 30")
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	return n;
	}
	
	csvValidateDE_31=function csvValidateDE_31(n,f){
		var name="csvValidateDE_31"
		if(!n)
		return csv_error_push("Error in "+f+" : Input is empty")
		if(!(n.toString().length>=3 && n.toString().length<=6))
		return csv_error_push("Error in "+f+" : Length must be Minimum 3 & Maximum 6")
		if(!validateDecimalLatLong(n))
		return csv_error_push("Error in "+f+" : Input must be Decimal value")
		if(!(Math.round(-90.00 * 100) < Math.round(n * 100) && Math.round(90.00 * 100) > Math.round(n * 100)))
		return csv_error_push("Error in "+f+" : Length must be Minimum -90.00 & Maximum 90.00");
		return n;
		}
		
		csvValidateDE_32=function csvValidateDE_32(n,f){debugger;
		var name="csvValidateDE_32"
		if(!n)
		return csv_error_push("Error in "+f+" : Input is empty")
		if(!(n.length==2))
		return csv_error_push("Error in "+f+" : Length must be 2")
		if(!validateHexaDecimal(n))
		return csv_error_push("Error in "+f+" : Range must be in 00-ff")  //Doubt
		return n;
		}
		
		csvValidateDE_33=function csvValidateDE_33(n,f){
		var name="csvValidateDE_33"
		if(!n)
		return csv_error_push("Error in "+f+" : Input is empty")
		if(!(n.toString().length>=3 && n.toString().length<=7))
		return csv_error_push("Error in "+f+" : Length must be Minimum 3 & Maximum 7")
		if(!validateDecimalLatLong(n))
		return csv_error_push("Error in "+f+" : Input must be Decimal value")
		if(!(Math.round(-179.99 * 100) < Math.round(n * 100) && Math.round(180.00 * 100) > Math.round(n * 100)))
		return csv_error_push("Error in "+f+" : Length must be Minimum -179.00 & Maximum 180.00");
		return n;
		}
	csvValidateDE_34=function csvValidateDE_34(n,f){
	var name="csvValidateDE_34"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==1))
	return csv_error_push("Error in "+f+" : Length must be 1 Only")
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	return n;
	}
	
	csvValidateDE_35=function csvValidateDE_35(n,f){
	var name="csvValidateDE_35"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==1))
	return csv_error_push("Error in "+f+" : Length must be 1 Only")
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Input must be Integer")
	var intN=parseInt(n) 
	if(!(intN==0 || intN==1))
	return csv_error_push("Error in "+f+" : Input must be 0 or 1")
	return n;
	}
	
	csvValidateDE_36=function csvValidateDE_36(n,f){
	var name="csvValidateDE_36"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.toString().length==1))
	return csv_error_push("Error in "+f+" : Length must be 1 Only")
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Input must be Integer")
	var intN=parseInt(n) 
	if(!(intN==7 || intN==8))
	return csv_error_push("Error in "+f+" : Input must be 7 or 8")
	return n;
	}
	
	csvValidateDE_37=function csvValidateDE_37(n,f){
	var name="csvValidateDE_37"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==1 || n.length==2))
	return csv_error_push("Error in "+f+" : Length must be 1 to 2")
	if(!validateInteger(n))
	return csv_error_push("Error in "+f+" : Input must be Integer")
	var intN=parseInt(n) 
	if(!(intN>=1 && intN<=99))
	return csv_error_push("Error in "+f+" : Input must be between 1 to 99")
	return n;
	}
	
	csvValidateDE_38=function csvValidateDE_38(n,f){
	var name="csvValidateDE_38"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length>=0 && n.length<=60))
	return csv_error_push("Error in "+f+" : Length must be 0 to 60")
	var intN=parseInt(n) 
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	return n;
	}
	
	csvValidateDE_39=function csvValidateDE_39(n,f){
	var name="csvValidateDE_39"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length>=0 && n.length<=40))
	return csv_error_push("Error in "+f+" : Length must be 0 to 40")
	var intN=parseInt(n) 
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	return n;
	}
	
	csvValidateDE_40=function csvValidateDE_40(n,f){
	var name="csvValidateDE_40"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==6))
	return csv_error_push("Error in "+f+" : Length must be 6")
	
	var hh=parseInt(n.substring(0, 2))
	if(!(hh>=0 && hh<=23))
	return csv_error_push("Error in "+f+" : HH must be in the range 00-23")
	
	var mm=parseInt(n.substring(2, 4))
	if(!(mm>=0 && mm<=59))
	return csv_error_push("Error in "+f+" : MM must be in the range 00-23")
	
	var ss=parseInt(n.substring(4, 6))
	if(!(ss>=0 && ss<=59))
	return csv_error_push("Error in "+f+" : SS must be in the range 00-23")
	return n
	}
	
	csvValidateDE_41=function csvValidateDE_41(n,f){
	var name="csvValidateDE_41"
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	if(!(n.length==2))
	return csv_error_push("Error in "+f+" : Length must be 2")
	
	if(!(n==='04' || n==='05' || n==='06' || n==='07' || n==='08' || n==='09' || n==='10' || n==='11'))
	return csv_error_push("Error in "+f+" : Range must be 04 to 11")
	return n
	}
	
	csvValidateDE_42=function csvValidateDE_42(n,f){
	var name="csvValidateDE_42"
	
	if(typeof n === "undefined")
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.length<=32))
	return csv_error_push("Error in "+f+" : Max Length must be 2")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	 
	return n
	}
	
	csvValidateDE_43=function csvValidateDE_43(n,f){
	var name="csvValidateDE_43"
	
	if(!n)
	return csv_error_push("Error in "+f+" : Input is empty")
	
	if(!(n.toString().length<=7))
	return csv_error_push("Error in "+f+" : Max Length must be 7")
	
	if(!validateAlphanumeric(n))
	return csv_error_push("Error in "+f+" : Input must be AlphaNumeric value")
	 
	return n
	}
	//========================================
	
	function validateDecimalLatLong(n){
		var regex= new RegExp('^-?\\d{1,9}(\\.\\d{1,3})?$');
		return regex.test(n);
	}
	function validateAlphanumeric(n){
		var regex = /^[a-z0-9 ]+$/i;
		return regex.test(n);
		}
		function validateAlphanumericWithComma(n){
			var regex=/^[a-zA-Z0-9.,()':; ]+$/;
			return regex.test(n);
		}
	function validateInteger(n){
		var regex = /^\d+$/;
		return regex.test(n);
	}
	
	function validateHexaDecimal(n){
		var regex = /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/;
		return regex.test(n);
	}
	function validateCharacter(n){
		var regex = /^[a-z]+$/i;
		return regex.test(n);
		}
	
	function validateCapitalCharacter(n,f){
		var regex = /^[A-Z]+$/;
		return regex.test(n);
		}
	
	function validateDecimal(n){
		var regex = /^\d+(\.\d{1,2})?$/i;
		return regex.test(n);
		}	
	
	
	function csv_error_push(str){
	var list=Session.get("csv_error_array")
	if(!list)
	list=[]
	list.push(str);
	Session.set("csv_error_array",list)
	}	