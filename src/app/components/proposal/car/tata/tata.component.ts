import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef  } from '@angular/core';
import { DatePipe } from '@angular/common';

import { KeysPipe } from '../../../../sharedServices/keyValuePipe';
import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-tata',
  templateUrl: './tata.component.html',
  styleUrls: ['./tata.component.css']
})
export class TataComponent implements OnInit {
  
  public imagePath = IMAGE_URL;
  public proposalInput = <any>{};
  public applicationData= <any>{};
  public requestData = <any>{};
  public loading:boolean = true;
  public insurerMaster = {};
  public polCity = <any>{};
	public corCity = <any>{}
	public nomCity=<any>{};
	public polCities = [];
  public corCities = [];
  public covers = [];
  public output = <any>[];
  public accessory = <any> [];
  public active=0;
  public showError='';
  public tabStatus= <any>{
    firstDisabled : false,
    firstComplete : 'indone',
    secondDisabled : true,
    secondComplete : 'indone',
    thirdDisabled : true,
    thirdComplete : 'indone',
    fourthOpen :[],
    fourthDisabled :[],
    fourthComplete:[],
    fifthDisabled : true,
    fifthComplete : 'indone',
    sixthDisabled:true,
    sixthComplete:'indone',
}
public proposalError={key:"",errorPirnt:[]};
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
  public premiumMilageError="";
  public policyPremiumError="";
  public policyTypeError = "";
  public resultPromise;
  public proposalResuestId;
  public iterations = 0;
  public pageErrors = {
    proposerError: false,
    vehicleError: false,
    vehicleErrorText : "",
    proposerErrorText : ""
}
public items = <any>[];
public policyStartDateOptions = <any> {};
public adultDobOptions = <any> {};
public nomineeDobOptions = <any> {};
public  paymentInput = {
                        url: null,
                        params: null
                      };
 public formBuild: boolean = false;                      
  constructor(private shared: SharedService, private datepipe: DatePipe) { }

  ngOnInit() {
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
                             minDate: new Date(newYearMin-100, monthToday, newdayToday)
    };
    this.policyStartDateOptions = { maxDate : new Date(newYearMax, newMaxMonthToday, newdayToday+44),
                                    minDate: new Date(newYearMin, monthToday, newdayToday)
    };
    this.nomineeDobOptions = { maxDate: new Date(yearMax, monthToday-3, dayToday),
                               minDate: new Date(yearMin-100, monthToday, dayToday)	
    };
    this.getthePage();
  }
  getthePage(){
    let strUrl = window.location.href.split("=")[1];
    let decodeUriData =  decodeURIComponent(strUrl);
    this.requestData.productId = decodeUriData.split('/')[2];
    this.requestData.rmId = decodeUriData.split('/')[3];
    this.requestData.customerId = decodeUriData.split('/')[4];
    this.requestData.appNo = decodeUriData.split('/')[5];
    this.shared.getApplicationData(this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
    .subscribe(
        data =>{
          if (data.hasOwnProperty("result")){
            this.applicationData = JSON.parse(data.result);
            this.proposalInput= this.applicationData.proposalData;
            console.log(this.proposalInput);
            this.loading = false;
            this.getMaster("NomineeRel");
            this.getMaster("Insurer");
            this.getMaster("Title");
            this.getMaster("Gender");
            this.getMaster("DrivingExp");
            this.getMaster("LoanType");
            this.setSelectBoxes();
            this.covers = [];
            this.proposalInput.addons.forEach(element => {
                var cover = element;
					      if (cover.coverId != "PA") {
						    this.covers.push(cover);
					}	
            });
          }
        }
    );
  }
  getMaster(masterId){
    this.shared.getMastersforProd(this.proposalInput.productId, masterId)
    .subscribe(
      data => {
        if (data.hasOwnProperty("result"))
        this.insurerMaster[masterId] = data.result;
      }
    );
  }
 
 setSelectBoxes(){
      this.polCity.cityId = this.proposalInput.proposer.policyCityCode;
      this.polCity.cityName = this.proposalInput.proposer.policyCity;
      this.polCity.stateId = this.proposalInput.proposer.policyStateCode;
      this.polCity.state = this.proposalInput.proposer.policyState;
      this.getCityFromPincode('P', this.proposalInput.proposer.policyPincode);
      
      this.corCity.cityId = this.proposalInput.proposer.corrCityCode;
      this.corCity.cityName = this.proposalInput.proposer.corrCity;
      this.corCity.stateId = this.proposalInput.proposer.corrStateCode;
      this.corCity.state = this.proposalInput.proposer.corrState;
      this.getCityFromPincode('C', this.proposalInput.proposer.corrPincode);
      this.proposalInput.policy.tcAgree = "N";
	
  }
  getCityFromPincode (type, pincode){
    var re = new RegExp("^[0-9]{6}$");
		if (re.test(pincode)){
      this.shared.getCityFromPin(this.proposalInput.insurerId, pincode)
      .subscribe(
        data =>{
          if (data.hasOwnProperty("result")){
					
            if (type == "P"){
              this.polCities = data.result;
              if (this.polCities.length == 1){
                var city = this.polCities[0];
                this.setCityState("P", city);
              }
            } else
            {
              this.corCities = data.result;
              this.corCities = data.result;
              if (this.corCities.length == 1){
                var city = this.corCities[0];
                this.setCityState("C", city);
              } 
            }
         }
        });
    }
  }
  setCityState(type, city){
    var areas = []
		if (typeof(city) != 'undefined') {
			 if (type == "P"){
				 this.proposalInput.proposer.policyCity = city.cityName;
				 this.proposalInput.proposer.policyCityCode = city.cityId;
				 this.proposalInput.proposer.policyState = city.stateName;
				 this.proposalInput.proposer.policyStatecode = city.stateId;
				 
			 } else
			 {
				 this.proposalInput.proposer.corrCity = city.cityName;
				 this.proposalInput.proposer.corrCityCode = city.cityId;
				 this.proposalInput.proposer.corrState = city.stateName;
				 this.proposalInput.proposer.corrStatecode = city.stateId;
			 }
		}
  }
  getProposerAge(dob){
    this.proposalInput.proposer.custage = this.shared.calculateAge(dob);
  }
  getAge(dob){
    this.proposalInput.proposer.nomineeAge = this.shared.calculateAge(dob);
  }
  appointeeAge(dob){
    this.proposalInput.proposer.appointeeAge = this.shared.calculateAge(dob);
  }

  checkAnualMilage (form,val) {
		
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
checkAccessories(){
		
  this.pageErrors.vehicleError = false;
  
  if (!this.proposalInput.vehicle.electricalAccList) {
      this.proposalInput.vehicle.electricalAccList = [];
    }
    
    if (!this.proposalInput.vehicle.nonElectricalAccList) {
      this.proposalInput.vehicle.nonElectricalAccList = [];
    }
    
  if (this.proposalInput.vehicle.nonElectricalAccessoryFlag=='Y' && this.proposalInput.vehicle.nonElectricalAccList.length == 0){
    this.pageErrors.vehicleError = true;
    this.pageErrors.vehicleErrorText = "Please add Non Electrical Accesorries";
  }
  
  if (this.proposalInput.vehicle.nonElectricalAccessoryFlag=='N') {
    this.proposalInput.vehicle.nonElectricalAccList = [];
  }
  

  if (this.proposalInput.vehicle.electricalAccessoryFlag=='Y' && this.proposalInput.vehicle.electricalAccList.length == 0){
    this.pageErrors.vehicleError = true;
    this.pageErrors.vehicleErrorText = "Please add Electrical Accesorries";
  }
  
  if (this.proposalInput.vehicle.electricalAccessoryFlag=='N') {
    this.proposalInput.vehicle.electricalAccList = [];
  }
  
}
addEditAccessory(type, action, qindex){
  if (action == "Add"){
    this.accessory = <any> [];
    this.output.type = type;
    this.output.action = action;
    this.output.qindex = qindex;
    $('#accessoriesModal').modal('show');
  }else if(action == "Delete")
    {	
      if (type == "Elec"){
        this.proposalInput.vehicle.electricalAccList.splice(qindex,1);
      }else
      {
        this.proposalInput.vehicle.nonElectricalAccList.splice(qindex,1);
      }
      this.checkAccessories();
    }

}
submitAccessory(){
  $('#accessoriesModal').modal('hide');
  if (this.output.type == "Elec"){
    this.proposalInput.vehicle.electricalAccList.push(this.accessory);
  }else
  {
    this.proposalInput.vehicle.nonElectricalAccList.push(this.accessory);
  }
  this.checkAccessories();
}
backSection(section){
  $('#panel'+section).removeClass('in active');
   var nextSec = Number(section) - 1;
   $('#panel'+nextSec).addClass('in active');
   $('li:nth-child('+section+')').removeClass('active');
   $('li:nth-child('+nextSec+')').addClass('active');
}
nextSection(section)
	{
		
		switch (section){
		case "1":
			
			this.active=1;
			this.tabStatus.firstComplete = 'done';
			this.tabStatus.secondDisabled = false;
      this.proposalError={key:"",errorPirnt:[]};
      $('#SecondTab').removeClass('tabdisable');
			break;
		case "2":
			this.active =2;
			this.tabStatus.secondComplete = 'done';
			this.tabStatus.thirdDisabled= false;
      this.proposalError={key:"",errorPirnt:[]};
      $('#thirdTab').removeClass('tabdisable');
			console.log(this.proposalInput)
			break;
		case "3":
				this.active =3;
				this.tabStatus.thirdComplete='done';
				this.tabStatus.fourthDisabled= false;
				this.proposalError={key:"",errorPirnt:[]};
        $('#forthTab').removeClass('tabdisable');
			break;
		
		case "4":
			this.active =4;
			this.tabStatus.fourthComplete='done';
			this.tabStatus.fifthDisabled= false;
      this.proposalError={key:"",errorPirnt:[]};
      $('#fifthTab').removeClass('tabdisable');
			break;
		case "5":
			this.showError='true';
	   		this.active =5;
			this.tabStatus.fifthOpen = false;
			this.tabStatus.fifthComplete = 'done';
			this.tabStatus.sixthOpen = true;
			this.tabStatus.sixthDisabled = false;
      this.proposalError={key:"",errorPirnt:[]};
      $('#sixthTab').removeClass('tabdisable');
			break;
		case "6":
			
			this.active=6;
			this.tabStatus.sixthComplete='done';
			this.tabStatus.fifthDisabled= false;
      this.proposalError={key:"",errorPirnt:[]};
      $('#seventhTab').removeClass('tabdisable');
			break;
    }
    this.populateCoverData();
    this.applicationData.proposalData = this.proposalInput;
    console.log(JSON.stringify(this.applicationData));
	  this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
    .subscribe(
      data =>{
        console.log('Saved Data');
        $('#panel'+section).removeClass('in active');
        var nextSec = Number(section) + 1;
        $('#panel'+nextSec).addClass('in active');
        $('li:nth-child('+section+')').removeClass('active');
        $('li:nth-child('+nextSec+')').addClass('active');
      }
    );
  }
  populateCoverData(){
 		
    this.covers.forEach(element => {
      
      if(element.isSelected == "Y") {
        
        if (!this.isCoverPresent(element.coverId)){

            var cover = <any> {};
            cover.name = element.coverId;
            this.proposalInput.covers.push(cover);
        }
      }
      
     this.proposalInput.addons.forEach(item => {
       if (element.coverId == item.coverId){
         item.isSelected = element.isSelected;
       }
       
     });
      
    })
  }
  checkPolicyType(form,val) {
		
		this.policyPremiumError="";
		if(val == "C")
		{
			//form.prevPolicyType.$setValidity('required',true);
			this.policyTypeError="";
		}
		else
		{
			//form.policyPremium.$setValidity('required',false);
			this.policyTypeError="Renewal of Liability only policy online is not allowed";
		}
  }
  samePolicyCorrAddress(flag)
	{
		if (flag == "Y") {
			this.proposalInput.proposer.corrAddress1=this.proposalInput.proposer.policyAddress1;
			this.proposalInput.proposer.corrAddress2=this.proposalInput.proposer.policyAddress2;
			this.proposalInput.proposer.corrAddress3=this.proposalInput.proposer.policyAddress3;
			this.proposalInput.proposer.corrStatecode=this.proposalInput.proposer.policyStatecode;
			this.proposalInput.proposer.corrState =this.proposalInput.proposer.policyState;
			this.proposalInput.proposer.corrCityCode =this.proposalInput.proposer.policyCityCode;
			this.proposalInput.proposer.corrCity =this.proposalInput.proposer.policyCity;
			this.proposalInput.proposer.corrPincode =this.proposalInput.proposer.policyPincode;
		} else
		{
			this.proposalInput.proposer.corrAddress1 = "";
			this.proposalInput.proposer.corrAddress2 = "";
			this.proposalInput.proposer.corrAddress3 = "";
			this.proposalInput.proposer.corrStatecode= "";
			this.proposalInput.proposer.corrState = "";
			this.proposalInput.proposer.corrCityCode = "";
			this.proposalInput.proposer.corrCity = "";
			this.proposalInput.proposer.corrPincode = "";
		} 
  }
  premiumAdd(coverId,val, premiumVal)
	{
		console.log(coverId);
		var cover = <any>{};
		cover.name = coverId;
		if(val=='Y')
		{
		  if (coverId == "PAPASS"){
			  cover.si = "100000";
			  cover.num = 5;
		  }
		  if (!this.isCoverPresent(coverId)){
			  this.proposalInput.covers.push(cover);
			  this.proposalInput.policy.premiumPayable= Number(this.proposalInput.policy.premiumPayable)+ Number(Math.round(premiumVal)); 
		  }
		}
		else
		{
			var i = 0;
			for (i=0; i<this.proposalInput.covers.length; i++){
				if (this.proposalInput.covers[i].coverId == coverId){
					break;
				}
			}
			this.proposalInput.covers.splice(i, 1);
			this.proposalInput.policy.premiumPayable= Number(this.proposalInput.policy.premiumPayable) -  Number(Math.round(premiumVal));
		}
  }
  isCoverPresent(coverId) {
 		
    var present = false;
    this.covers.forEach(element => {
      if (element.name == element.coverId){
        present = true;
      }
    })
    
    return present;
  }
  editFields(index, section)
	{
	 $('#panel'+index).addClass('in active');
   $('#panel'+section).removeClass('in active');
   $('li:nth-child('+index+')').addClass('active');
   $('li:nth-child('+section+')').removeClass('active');
  }
  previousPolicyLastDate(prevStart)
	{
		console.log(prevStart);
		var date=new Date(prevStart);
		this.proposalInput.prevpolicy.prePolicyenddate=this.datepipe.transform(new Date(date.getFullYear()+1,date.getMonth(),date.getDate()-1), 'yyyy-MM-dd');
  }

   setpolicyAddress(){
 		
    if (this.proposalInput.proposer.policyRegAddressSame =='Y'){
      this.proposalInput.proposer.corrAddress1 = this.proposalInput.proposer.policyAddress1;
      this.proposalInput.proposer.corrAddress2 = this.proposalInput.proposer.policyAddress2;
      this.proposalInput.proposer.corrAddress3 = this.proposalInput.proposer.policyAddress3;
      this.proposalInput.proposer.corrCity = this.proposalInput.proposer.policyCity;
      this.proposalInput.proposer.corrCityCode = this.proposalInput.proposer.policyCityCode;
      this.proposalInput.proposer.corrState = this.proposalInput.proposer.policyState;
      this.proposalInput.proposer.corrStatecode = this.proposalInput.proposer.policyStatecode;
      this.proposalInput.proposer.corrDistrict = this.proposalInput.proposer.policyDistrict;
      this.proposalInput.proposer.corrDistrictId = this.proposalInput.proposer.policyDistrictId;
      this.proposalInput.proposer.corrArea = this.proposalInput.proposer.policyArea;
      this.proposalInput.proposer.corrAreaId = this.proposalInput.proposer.policyAreaId;
      this.proposalInput.proposer.corrPincode = this.proposalInput.proposer.policyPincode;
    }
  }


   getAccessoryValue() {
 		
    this.proposalInput.vehicle.electricalAcc = 0;		
    this.proposalInput.vehicle.electricalAccList.forEach(element => {
      this.proposalInput.vehicle.electricalAcc = Number(this.proposalInput.vehicle.electricalAcc) + Number(element);
    });
    
    this.proposalInput.vehicle.nonElectricalAcc = 0;		
    this.proposalInput.vehicle.nonElectricalAccList.forEach(element => {
      this.proposalInput.vehicle.nonElectricalAcc = Number(this.proposalInput.vehicle.nonElectricalAcc) + Number(element);
    });
  }
  makePayment(){
    this.getAccessoryValue();
 		this.populateCoverData();
 		this.setpolicyAddress();
 		if (this.proposalInput.vehicle.isOwnershipChanged == "Y"){
 			this.proposalInput.prevpolicy.previousNcb = 0;
       this.proposalInput.prevpolicy.currNcb = 0;
     }   
       this.proposalInput.vehicle.youngestDriverAge = this.shared.calculateAge(this.proposalInput.vehicle.youngestDriverDob);
       var carProposal= this.proposalInput;
       carProposal.prevpolicy.currNcb = "" +carProposal.prevpolicy.currNcb;
       carProposal.policy.policyStartdate =  this.datepipe.transform(carProposal.policy.policyStartdate, 'yyyy-MM-dd');
       carProposal.prevpolicy.prePolicystartdate = this.datepipe.transform(carProposal.prevpolicy.prePolicystartdate, 'yyyy-MM-dd');
       carProposal.prevpolicy.prePolicyenddate = this.datepipe.transform(carProposal.prevpolicy.prePolicyenddate, 'yyyy-MM-dd');
       carProposal.proposer.proposerDob = this.datepipe.transform(carProposal.proposer.proposerDob, 'yyyy-MM-dd');
       carProposal.proposer.nomineeDob = this.datepipe.transform(carProposal.proposer.nomineeDob, 'yyyy-MM-dd');
       carProposal.proposer.appointeeDOB = this.datepipe.transform(carProposal.proposer.appointeeDOB,'yyyy-MM-dd');
       carProposal.vehicle.youngestDriverDob = this.datepipe.transform(carProposal.vehicle.youngestDriverDob, 'yyyy-MM-dd');
        carProposal.covers = [];
       // carProposal.prevpolicy.numberClaims ="0";
       console.log(JSON.stringify(carProposal));
       this.shared.submitProposalMotor(carProposal, '108', '108MO01PC7')
      .subscribe(
        data=>{
          if(data.hasOwnProperty("error")) {
            this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPirnt:[]}
            var str=data.error;
            this.proposalError.errorPirnt=this.cleanArray(str.split(";"))
            console.log(this.proposalError)
          }else
          {
            // Proposal request Submitted to BEASYNC
            this.proposalResuestId = data.requestId;
            this.loading = true;
           this.iterations = 0;
           this.formBuild= true;
            this.resultPromise = setInterval(() => {
              this.getProposalSubmissionResults(); 
            }, 5000);
          }

        }
      );
     }

  getProposalSubmissionResults(){
    this.iterations++;
		
		if (this.iterations >24) {
			this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPirnt:[]}
			var str="The insurer didn't respond within 2 minutes. Please Retry";
			this.proposalError.errorPirnt=this.cleanArray(str.split(";"));
			this.loading = false;
      clearInterval(this.resultPromise);
			this.loading = false;
    }
    this.shared.getProposalSumbit(this.proposalResuestId)
    .subscribe(
      data =>{
        if(data.hasOwnProperty("error")) {
          this.loading = false;
          clearInterval(this.resultPromise);
          this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPirnt:[]}
          var str=data.error;
          this.proposalError.errorPirnt=this.cleanArray(str.split(";"))
          console.log(this.proposalError)
          if(data.error =="Premium mismatch")
          this.newPreMiumMismatch({"premiumPayable":data.premiumPayable,"premiumPassed":data.premiumPassed})
        
        } else if(data.hasOwnProperty('payUrl'))
        {
          this.loading = false;
          clearInterval(this.resultPromise);
          this.proposalError={key:"",errorPirnt:[]}
          console.log(data);
          this.paymentInput= {url: null, params: null};
          this.paymentInput.url = data.payUrl;
          this.paymentInput.params = {};
          setTimeout(function() {
            var myForm = <HTMLFormElement>document.getElementById('payUrlSubmit');
            myForm.submit();
           }, 5000);

          }
      }
    );
  }
  getPolicyEndDate(policyDate){
    if ((typeof policyDate != "undefined")&& (policyDate != "")) {
       
      var date=new Date(policyDate);
      this.proposalInput.policy.policyEnddate= this.datepipe.transform(new Date(date.getFullYear()+1,date.getMonth(),date.getDate()-1),'yyyy-MM-dd');

    }
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
  }

