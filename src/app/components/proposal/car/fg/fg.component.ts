import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
import { AlertService } from '../../../../sharedServices/alert.service';
import { OrderByPipe } from '../../../../sharedServices/orderBy';

declare var jquery:any;
declare var $;

@Component({
  selector: 'app-fg',
  templateUrl: './fg.component.html',
  styleUrls: ['./fg.component.css']
})
export class FgComponent implements OnInit {
  public otpRetires: number = 0;
  public failedStatus: boolean = false;
  public otpError: boolean = false;
  public otpInput = <any> {};
  public requestData = <any>{};
  public loading:boolean = true;
  public errLoad: boolean = false;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public tcAgree: boolean = false;
  public imagePath = IMAGE_URL;
  public proposalInput = <any>{};
  public insurerMaster = <any> [];
  public applicationData= <any>{};
  public proposalError = <any>{};
  public items = <any>[];
  public resultPromise;
  public iterations = 0;
  public proposalResuestId;
  public tabStatus= <any> {
    firstComplete : 'indone',
    secondComplete : 'indone',
    thirdComplete : 'indone',
    fourthOpen :[],
    fourthDisabled :[],
    fourthComplete:[],
    fifthDisabled : true,
    fifthComplete : 'indone',
    sixthComplete:'indone',
    seventhComplete:"indone"
}
  public Months  = [
    {"id" : "1", "value" : "January"},
    {"id" : "2", "value" :  "February"},
    {"id" : "3", "value" :  "March"},
    {"id" : "4", "value" :  "April"},
    {"id" : "5", "value" :  "May"},
    {"id" : "6", "value" :  "June"},
    {"id" : "7", "value" :  "July"},
    {"id" : "8", "value" :  "August"},
    {"id" : "9", "value" :  "September"},
    {"id" : "10", "value" :  "October"},
    {"id" : "11", "value" :  "November"},
    {"id" : "12", "value" :  "December"}
  ];
  public pageErrors = <any> {
    vehicleError: false,
    vehicleText : ""
  }
  public premiumMilageError="";
  public polState= <any>{};
	public polCity=<any> [];
	public polArea=<any>{};
	public corState=<any>{};
	public corCity=<any> [];
	public corArea=<any>{};
  public showError='';
  public policyTypeError = '';
  public policyStartDateError = '';
  public policyPremiumError = '';
  public minDate:any;
  public maxDate:any;
  public coverValue = null;
  public coverId = null;
  public areasPolicy = [];
  public areasCorr = [];
  public adultDobOptions = <any>{};
  public nomineeDobOptions = <any> {};
  public polCities = <any> [];
  public corCities = <any> [];
  public paymentInput = <any>{};
  public paymentUrl = null;
  public formBuild: boolean = false;
  constructor(private shared: SharedService, private router: Router,  private datepipe: DatePipe, private alertservice: AlertService) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
    var dateToday=new Date();
    var yearMax=dateToday.getFullYear();
    var monthToday=dateToday.getMonth();
    var dayToday=dateToday.getDate();
    var yearMin=dateToday.getFullYear();
    var newYearMin=dateToday.getFullYear();
    var newYearMax=dateToday.getFullYear();
    var newMaxMonthToday=dateToday.getMonth();
    var newdayToday = dateToday.getDate();
    this.adultDobOptions = { maxDate : new Date(newYearMax-18, newMaxMonthToday, newdayToday),
      minDate: new Date(newYearMin-70, monthToday, newdayToday)
    };
    this.nomineeDobOptions = { 
      maxDate: new Date(yearMax, monthToday-3, dayToday),
      minDate: new Date(yearMin-100, monthToday, dayToday)	
  };
    this.getthePage();
  }
  getthePage(){
    $('#loader').hide();
    let strUrl = window.location.href.split("=")[1];
    let decodeUriData =  decodeURIComponent(strUrl);
    this.requestData.productId = decodeUriData.split('/')[2];
    this.requestData.rmId = decodeUriData.split('/')[3];
    this.requestData.customerId = decodeUriData.split('/')[4];
    this.requestData.appNo = decodeUriData.split('/')[5];
    if(this.requestData.productId != undefined || this.requestData.rmId != undefined || this.requestData.customerId !=undefined || this.requestData.appNo != undefined){
    this.shared.getApplicationData(this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
    .subscribe(
        data =>{
          if (data.hasOwnProperty("result")){
            this.loading = false;
            this.applicationData = JSON.parse(data.result);
            this.applicationData.proposalData.authentication = {"accesskey":"Manas","secretkey":"Manas"}; // remove it
            this.proposalInput= this.applicationData.proposalData;
            this.proposalInput.premiumBreakup = this.applicationData.premiumBreakup;
            var date=new Date(this.proposalInput.policy.policyStartdate);
            if (this.proposalInput.policy.typeOfBusiness == "Rollover"){
              this.proposalInput.policy.policyEnddate= this.datepipe.transform(new Date(date.getFullYear()+1,date.getMonth(),date.getDate()-1),'yyyy-MM-dd');
            } else
            {
              this.proposalInput.policy.policyEnddate= this.datepipe.transform(new Date(date.getFullYear()+3,date.getMonth(),date.getDate()-1),'yyyy-MM-dd');
            }
             this.getMaster("Occupation");
             this.getMaster("VehicleBody");
             this.getMaster("MaritalStatus");
             this.getMaster("NomineeRelationship");
             this.getMaster("Insurer");
             this.getMaster("Title");
             this.getMaster("Gender");
            this.formatApplication();
           // this.proposalInput.proposer.custType = "I";
          }
  },
  error => {
  if(error.status == 401)
    {
   let rtnUrl = window.location.href.split("=")[1];
   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/go-digitProposal?proposalKeys='+rtnUrl }});
   }else{
   this.alertservice.error("Something broken, try again!");
    }
  });
} else{
  this.loading = false;
  this.errLoad = true;
  this.alertservice.error("Failed to create form, Please check the url!");
}
}
nextSection(section)
{
  $(document).ready(function(){
    $(this).scrollTop(0);
  });
  $('#loader').show();
  switch (section){
  case "1":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.firstComplete = 'done';
    //this.getRequirements();
    $('#SecondTab').removeClass('tabdisable');
    break;
  case "2":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.secondComplete = 'done';
    $('#thirdTab').removeClass('tabdisable');
    break;
  case "3":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.thirdComplete='done';
    this.proposalInput.covers = this.proposalInput.covers.filter(item => item.applicable == 'Y')
    $('#forthTab').removeClass('tabdisable');			
    break;
  case "4":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.fourthComplete='done';
    $('#fifthTab').removeClass('tabdisable');
    break;
  case "5":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.fifthComplete = 'done';
    $('#sixthTab').removeClass('tabdisable');
    break;
  case "6":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.sixthComplete = 'done';
    $('#seventhTab').removeClass('tabdisable');
    break; 
  case "7":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.seventhComplete = 'done';
    break;
    }
    this.applicationData.proposalData = this.proposalInput;
 console.log("saved data",JSON.stringify(this.proposalInput));
 this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
.subscribe(
  data =>{
    console.log('Saved Data');
    $('#loader').hide();
    $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) + 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+section+')').removeClass('active');
    $('li:nth-child('+nextSec+')').addClass('active');
  },
  error => {
  if(error.status == 401)
    {
   let rtnUrl = window.location.href.split("=")[1];
   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/go-digitProposal?proposalKeys='+rtnUrl }});
   }else{
   this.alertservice.error("Something broken, try again!");
      }
      }
    );
  }

  checkAnualMilage(val) {
		
    this.premiumMilageError="";
  if(val>=1000 && val<=50000)
  {
    //form.annualMilleage.$setValidity('required',true);
    this.premiumMilageError=""
  }
  else
  {
    //form.annualMilleage.$setValidity('required',false);
    this.premiumMilageError="Minimum value 1000 and Max value 50000"
  }
}
  backSection(section){
    $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) - 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+section+')').removeClass('active');
    $('li:nth-child('+nextSec+')').addClass('active');
  }
  kitType()
	{
		if(this.proposalInput.vehicle.lpgcngKit=='N') {
			this.proposalInput.vehicle.biKitType='';
		} else
		{
			if (this.proposalInput.vehicle.fuelType == "L" || this.proposalInput.vehicle.fuelType == "C"){
				this.proposalInput.vehicle.biKitType = "I";
			} else
			{
				this.proposalInput.vehicle.biKitType = "E";
			}
			
		}
		
  }
  resetNCB(){
		
		this.proposalInput.prevpolicy.currNcb = 0;
		var i = 0;
		for (i = 0; i<this.proposalInput.covers.length; i++){
			if (this.proposalInput.covers[i].coverId == "NCBPROTECT"){
				this.proposalInput.covers[i].applicable = "N";
				this.proposalInput.covers[i].isSelected = "N";
			}
		}
	}
	
   checkPolicyType(val) {
		
		this.policyTypeError="";
		if(val == "C")
		{
			//form.prevPolicyType.$setValidity('required',true);
			this.policyTypeError=""
		}
		else
		{
		//	form.policyPremium.$setValidity('required',false);
			this.policyTypeError="Renewal of Liability only policy online is not allowed"
		}
  }
  previousPolicyLastDate(prevStart)
	{
		console.log(prevStart);
		var date=new Date(prevStart);
		this.proposalInput.prevpolicy.prePolicyenddate= this.datepipe.transform(new Date(date.getFullYear()+1,date.getMonth(),date.getDate()-1),'yyyy-MM-dd');
	}
  getMaster(masterId){
    this.shared.getMastersforProd(this.proposalInput.productId, masterId)
    .subscribe(data =>{
      if (data.hasOwnProperty("result"))
			this.insurerMaster[masterId] = data.result;
    });
  }
 formatStrToDate (){
		
		this.proposalInput.policy.policyStartdate = this.datepipe.transform(this.proposalInput.policy.policyStartdate,'yyyy-MM-dd');
		this.proposalInput.prevpolicy.prePolicystartdate = this.datepipe.transform(this.proposalInput.prevpolicy.prePolicystartdate,'yyyy-MM-dd');
		this.proposalInput.proposer.proposerDob = this.datepipe.transform(this.proposalInput.proposer.proposerDob,'yyyy-MM-dd');	
		this.proposalInput.proposer.nomineeDob = this.datepipe.transform(this.proposalInput.proposer.nomineeDob,'yyyy-MM-dd');
		this.proposalInput.proposer.appointeeDOB = this.datepipe.transform(this.proposalInput.proposer.appointeeDOB,'yyyy-MM-dd');
		this.proposalInput.vehicle.youngestDriverDob = this.datepipe.transform(this.proposalInput.vehicle.youngestDriverDob,'yyyy-MM-dd');
		
		
	}
  formatApplication(){
		this.formatStrToDate();
		this.setSelectBoxes();
		
		// Set Internal Bi-Fuel Kit for fuelType of CNG or LPG from Master
		if (this.proposalInput.vehicle.fuelType == "L" || this.proposalInput.vehicle.fuelType == "C"){
			this.proposalInput.vehicle.biKitValue = "0";
			this.proposalInput.vehicle.biKitType = "I";
			this.proposalInput.vehicle.lpgcngKit = "Y";
			if (this.proposalInput.vehicle.fuelType == "L"){
				this.proposalInput.vehicle.biKitFuel = "LPG"
			}else
			{
				this.proposalInput.vehicle.biKitFuel = "CNG"
			}
		}
	}
	checkPolicyPremium(val) {
		
		this.policyPremiumError="";
		if(val>=2000 && val<=100000)
		{
			this.policyPremiumError=""
		}
		else
		{
			this.policyPremiumError="Minimum value 2000 and Max value 100000"
		}
	} 
		
 validatePolicyStartDate (startData) {
    var ok;
    if (typeof(startData) == undefined) {
     return ok;
    }
    
    if(this.proposalInput.policy.typeOfBusiness=='New Business')
   {
      
   
       this.minDate=new Date(this.proposalInput.vehicle.vehicleRegistrationDate);
       this.maxDate=new Date(this.minDate.getFullYear(), this.minDate.getMonth(),this.minDate.getDate()+10);
       if(new Date(startData)>=new Date(this.minDate)&& new Date(startData)<=new Date(this.maxDate))
      {
            if(new Date()<=new Date(startData))
          {
            ok=true;
            this.policyStartDateError=""
          }
          else
          {
            ok=false;
            this.policyStartDateError="Policy Start date can not be a Past Date of current date"
          }
      }
       else
      {
         ok=false;
        this.policyStartDateError="Policy Start date cannot be greater than the Purchase Registration Date by 10 days for New Business"
      }
   }
    else
      {
         this.minDate=new Date(this.proposalInput.vehicle.vehicleRegistrationDate);
         var date=new Date()
        this.maxDate=new Date(date.getFullYear(),date.getMonth(),date.getDate()+45);
         console.log(this.maxDate);
         if(new Date(startData)>new Date()&& new Date(startData)<=new Date(this.maxDate))
         {
             
            ok=true;
            this.policyStartDateError="";
         }
         else
         {
            ok=false;
          this.policyStartDateError="Policy Start date cannot be a Past Date and cannot be greater than 45 days from current date"
         }
        
      }
    return ok;
}
getAge(dob, type){
  if(type == 'PROP')
  this.proposalInput.proposer.age = this.shared.calculateAge(dob);
  else if(type == 'NOMIN')
  this.proposalInput.proposer.nomineeAge = this.shared.calculateAge(dob);
  else if(type == 'APPOINTEE')
  this.proposalInput.proposer.appointeeAge = this.shared.calculateAge(dob);
  else if(type == 'YOUNG')
  this.proposalInput.vehicle.youngestDriverAge = this.shared.calculateAge(dob);
}
  premiumAdd(coverId,val, premiumVal) {
    if(val != this.coverValue || this.coverId != coverId){
      this.coverValue = val;
      this.coverId = coverId;
      console.log(coverId);
      var cover = <any>{};
      cover.name = coverId;
      if(val=='Y')
      {
        this.proposalInput.policy.premiumPayable= Number(this.proposalInput.policy.premiumPayable)+ Number(Math.round(premiumVal)); 
      }
      else
      {
        this.proposalInput.policy.premiumPayable= Number(this.proposalInput.policy.premiumPayable) -  Number(Math.round(premiumVal));
      }
    }else{
      this.coverValue = val;
      this.coverId = coverId;
    }
  }
  getAreasFromPincode(type, pincode){
		
		var re = new RegExp("^[0-9]{6}$");
		if (re.test(pincode)){
        this.shared.getCityFromPin(this.proposalInput.insurerId, pincode)
        .subscribe( data =>{
				if (data.hasOwnProperty("result")){
          if (type == "P"){
           this.polCities = data.result;
            if (this.polCities.length == 1){
             this.polCity =this.polCities;
             this.setCityState("P",this.polCity[0]); // This is needed to set the city and state id.
            }
          } else
          {
           this.corCities = data.result;
            if (this.corCities.length == 1){
             this.corCity =this.corCities;
             this.setCityState("C",this.polCity[0]); // This is needed to set the city and state id.
            } 
          }
				}
      });
				
		}
  }
  setCityState(type, area){
		
		var areas = [];
		 if (type == "P"){
			this.proposalInput.proposer.policyCity = area.cityName;
			this.proposalInput.proposer.policyState = area.stateName;
			this.proposalInput.proposer.policyStatecode = area.stateId;
			this.proposalInput.proposer.policyArea = area.areaName;
			 
		 } else
		 {
			this.proposalInput.proposer.corrCity = area.cityName;
			this.proposalInput.proposer.corrState = area.stateName;
			this.proposalInput.proposer.corrStatecode = area.stateId;
			this.proposalInput.proposer.corrArea = area.areaName;
		 }
  }
  samePolicyCorrAddress(flag ) {
		if (flag == "Y") {

			this.proposalInput.proposer.corrAddress1=this.proposalInput.proposer.policyAddress1;
			this.proposalInput.proposer.corrAddress2=this.proposalInput.proposer.policyAddress2;
			this.proposalInput.proposer.corrAddress3=this.proposalInput.proposer.policyAddress3;
			this.proposalInput.proposer.corrStatecode=this.proposalInput.proposer.policyStatecode;
			this.proposalInput.proposer.corrState =this.proposalInput.proposer.policyState;
			this.proposalInput.proposer.corrCitycode =this.proposalInput.proposer.policyCitycode;
			this.proposalInput.proposer.corrCity =this.proposalInput.proposer.policyCity;
			this.proposalInput.proposer.corrPincode =this.proposalInput.proposer.policyPincode;
		} else
		{

			this.proposalInput.proposer.corrAddress1="";
			this.proposalInput.proposer.corrAddress2="";
			this.proposalInput.proposer.corrAddress3="";
			this.proposalInput.proposer.corrStatecode="";
			this.proposalInput.proposer.corrState ="";
			this.proposalInput.proposer.corrCitycode ="";
			this.proposalInput.proposer.corrCity ="";
			this.proposalInput.proposer.corrPincode ="";
		}
	 	 
  }
editFields(index, section)
  {
    $('#panel'+index).addClass('in active');
    $('#panel'+section).removeClass('in active');
    $('li:nth-child('+index+')').addClass('active');
    $('li:nth-child('+section+')').removeClass('active');
 }
 getMasterValue (masterName, masterId){
		
  var values = <any>[];
  if (this.insurerMaster.hasOwnProperty(masterName)){
    var values = this.insurerMaster[masterName];
    var masterValue = "";
    for (var i = 0; i<values.length; i++){
      if (values[i].id == masterId){
        masterValue = values[i].value;
      }
    }
  }
  return masterValue;
  
}
agreeTC(agree){
  if( typeof(agree) != 'undefined')
  {
    if(agree == 'agree')
    this.tcAgree = true;
    else this.tcAgree = false;
    $('#termsCondModal').modal('hide');
  }
 }
 makePayment(){
    $('#loader').show();
    $(document).ready(function(){
    $(this).scrollTop(0);
    });
 		if (this.proposalInput.vehicle.isOwnershipChanged == "Y"){
 			this.proposalInput.prevpolicy.previousNcb = 0;
 			this.proposalInput.prevpolicy.currNcb = 0;
     }
     this.setpolicyAddress();
 		
 		this.proposalInput.vehicle.youngestDriverAge = this.shared.calculateAge(this.proposalInput.vehicle.youngestDriverDob);
 		var carProposal = this.proposalInput;
 		carProposal.policy.policyStartdate = this.datepipe.transform(carProposal.policy.policyStartdate,'yyyy-MM-dd');
 		carProposal.prevpolicy.prePolicystartdate = this.datepipe.transform(carProposal.prevpolicy.prePolicystartdate,'yyyy-MM-dd');
 		carProposal.proposer.proposerDob = this.datepipe.transform(carProposal.proposer.proposerDob,'yyyy-MM-dd');	
 		carProposal.proposer.nomineeDob = this.datepipe.transform(carProposal.proposer.nomineeDob,'yyyy-MM-dd');
 		carProposal.proposer.appointeeDOB = this.datepipe.transform(carProposal.proposer.appointeeDOB,'yyyy-MM-dd');
 		carProposal.vehicle.youngestDriverDob = this.datepipe.transform(carProposal.vehicle.youngestDriverDob,'yyyy-MM-dd');
		
     console.log(JSON.stringify(carProposal));
     this.shared.submitProposalMotor(carProposal, this.proposalInput.insurerId, this.proposalInput.productId)
     .subscribe( data=>{
      this.proposalError={key:"",errorPrint:[]}
      if(data.hasOwnProperty("error")) {
        $('#loader').hide();
				this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
				var str=data['error'];
				this.proposalError.errorPrint= this.cleanArray(str.split(";"))
				console.log(this.proposalError)			
				
			}else
			{
				// Proposal request Submitted to BEASYNC
				this.proposalResuestId = data.requestId;
        this.iterations = 0;
        this.resultPromise = setInterval(() => {
          this.getProposalSubmissionResults(); 
        }, 5000);
				
			}
     });

 }
 getProposalSubmissionResults(){
  this.iterations++;
  
  if (this.iterations >24) {
    this.proposalError={key:"Proposal Submission couldn't be completed, the insurer didn't respond within 2 minutes. Please Retry!",errorPrint:[]}
    var str="";
    this.proposalError.errorPrint=this.cleanArray(str.split(";"));
    $('#loader').hide();
    clearInterval(this.resultPromise);
  }
  this.shared.getProposalSumbit(this.proposalResuestId)
  .subscribe(
    data =>{
     if(data.hasOwnProperty("error")) {
        clearInterval(this.resultPromise);
        $('#loader').hide();
        this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
        var str=data.error;
        this.proposalError.errorPrint=this.cleanArray(str.split(";"))
        console.log(this.proposalError);
        
				if(data['error']=="Premium Mismatch")
				{
				 if (data.idv) { // If IDV changes this will be returned with Premium Mismatch.
					 this.proposalInput.vehicle.idv = data.idv;
				 }
				 this.proposalInput.premiumBreakup = data.premiumBreakup;
				 this.proposalInput.policy.premiumPayable = data.premiumPayable;
				 this.newPreMiumMismatch({"premiumPayable":data["premiumPayable"],"premiumPassed":data["premiumPassed"],"basePremium":data["Total Premium"],"ServiceTax":data["Service Tax"]})
				}
      
      } else if(data.payUrl)
      { 
        this.proposalError={key:"",errorPirnt:[]}
        console.log(data);
        this.paymentInput= {};
        this.paymentUrl = data.payUrl;
        this.paymentInput.UserId = data.UserId;
				this.paymentInput.Email = data.Email;
				this.paymentInput.Mobile = data.Mobile;
				this.paymentInput.LastName = data.LastName;
				this.paymentInput.FirstName = data.FirstName;
				this.paymentInput.PremiumAmount = data.PremiumAmount;
				this.paymentInput.PaymentOption = data.PaymentOption;
				this.paymentInput.ProposalNumber = data.ProposalNumber;
				this.paymentInput.ResponseURL = data.ResponseURL
				this.paymentInput.TransactionID = data.TransactionID;
				this.paymentInput.UserIdentifier = data.UserIdentifier;
				this.paymentInput.CheckSum = data.CheckSum;
        this.formBuild = true;
        setTimeout(function() {
          var myForm = <HTMLFormElement>document.getElementById('payUrlSubmit');
          myForm.submit();
         }, 5000);
				
      }
    },
    error => {
    if(error.status == 401)
      {
     let rtnUrl = window.location.href.split("=")[1];
     this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/go-digitProposal?proposalKeys='+rtnUrl }});
     }else{
     this.alertservice.error("Something broken, try again!");
      }
    }
  );
}
checkOTP(OTP){
  this.shared.verifyOTP(this.otpInput.appNo, this.otpInput.productId, OTP)
  .subscribe(data =>{
    if(data.result == 'true'){
      window.location.href = this.otpInput.pgUrl;
    }else{
      this.otpError = true;
    }
  },
  error => {
  if(error.status == 401)
    {
   let rtnUrl = window.location.href.split("=")[1];
   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/aiaLifeProposal?proposalKeys='+rtnUrl }});
   }else{
   this.alertservice.error("Something broken, try again!");
    }
  });
}
resend(){
  this.shared.generateOTP(this.proposalInput.policy.applicationNumber, this.proposalInput.productId, this.proposalInput.productName, this.proposalInput.proposer.mobile)
  .subscribe(data =>{
    this.otpRetires++;
    $('#loader').hide();
    if(data.result==0){
    $('#successOTPSentM').modal('show');
    $('#aiaOTPModal').modal('show');
    }else this.failedStatus= true;
  }, error =>{
    $('#loader').hide();
    this.failedStatus= true;
    if(error.status == 401)
    {
    let rtnUrl = window.location.href.split("=")[1];
    this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/aiaLifeProposal?proposalKeys='+rtnUrl }});
    }
  });
}
newPreMiumMismatch(item){
  this.items = item;
  $('#newPremiumModal').modal('show');
}
submitNewPrem()
{
  this.items.userChoice = "Yes";
  this.proposalInput.policy.premiumPayable = this.items.premiumPayable;
  $('#newPremiumModal').modal('hide');
  this.makePayment();
 
}
 cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
 setpolicyAddress(){
 		
  if (this.proposalInput.proposer.policyRegAddressSame =='Y'){
    this.proposalInput.proposer.corrAddress1 = this.proposalInput.proposer.policyAddress1;
    this.proposalInput.proposer.corrAddress2 = this.proposalInput.proposer.policyAddress2;
    this.proposalInput.proposer.corrLandmark = this.proposalInput.proposer.policyLandmark;
    this.proposalInput.proposer.corrCity = this.proposalInput.proposer.policyCity;
    this.proposalInput.proposer.corrCitycode = this.proposalInput.proposer.policyCitycode;
    this.proposalInput.proposer.corrState = this.proposalInput.proposer.policyState;
    this.proposalInput.proposer.corrStatecode = this.proposalInput.proposer.policyStatecode;
    this.proposalInput.proposer.corrDistrict = this.proposalInput.proposer.policyDistrict;
    this.proposalInput.proposer.corrDistrictId = this.proposalInput.proposer.policyDistrictId;
    this.proposalInput.proposer.corrArea = this.proposalInput.proposer.policyArea;
    this.proposalInput.proposer.corrAreaId = this.proposalInput.proposer.policyAreaId;
    this.proposalInput.proposer.corrPincode = this.proposalInput.proposer.policyPincode;
  }
}
  getCity(state,name){
    this.shared.getCityFromState(this.proposalInput.insurerId, state.id)
    .subscribe(data =>{
      if(data['result']){
        if(name=='nominee')
        {
        this.proposalInput.proposer.nomineeState=state.id;
        this.getCity(state.id,name);
      }else if(name=="Registration") {
          this.proposalInput.proposer.policyStatecode = state.id;
          this.proposalInput.proposer.policyState = state.value;
          this.polCities = data['result'];
      }else if(name=="Mailing") {
          this.corCities = data['result'];
          this.proposalInput.proposer.corrStatecode = state.id;
          this.proposalInput.proposer.corrState = state.value;
      }
      }
    });

  }
 setSelectBoxes(){
		
		this.polCity.cityId = this.proposalInput.proposer.policyCitycode;
		this.polCity.cityName = this.proposalInput.proposer.policyCity;
		this.polCity.stateId = this.proposalInput.proposer.policyStatecode;
		this.polCity.state = this.proposalInput.proposer.policyState;
		this.getAreasFromPincode('P', this.proposalInput.proposer.policyPincode);
		
		this.corCity.cityId = this.proposalInput.proposer.corrCitycode;
		this.corCity.cityName = this.proposalInput.proposer.corrCity;
		this.corCity.stateId = this.proposalInput.proposer.corrStatecode;
		this.corCity.state = this.proposalInput.proposer.corrState;
		this.getAreasFromPincode('C', this.proposalInput.proposer.corrPincode);
		this.proposalInput.policy.tcAgree = "N";
	}
	

}
