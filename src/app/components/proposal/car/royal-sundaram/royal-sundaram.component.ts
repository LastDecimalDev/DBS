import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
import { Router } from '@angular/router';
import { THIS_EXPR } from '../../../../../../node_modules/@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertService } from '../../../../sharedServices/alert.service';




declare var jquery:any;
declare var $;
@Component({
  selector: 'app-royal-sundaram',
  templateUrl: './royal-sundaram.component.html',
  styleUrls: ['./royal-sundaram.component.css']
})
export class RoyalSundaramComponent implements OnInit {
  public requestData = <any>{};
  public loading:boolean = true;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public imagePath = IMAGE_URL;
  public proposalInput = <any>{};
  public insurerMaster = <any> [];
  public applicationData= <any>{};
  public proposalError = <any>{};
  public drivingExpr="";
	public polState=<any>{};
	public polCity=<any>{};
	public corState=<any>{};
	public corCity=<any>{};
	public showError='';
	public covers=[];
	public min=1000;
	public max=100000;
	public policyPremiumError="";
	public premiumMilageError="";
	public coversData=[];
	public polCities = [];
	public corCities = [];
  public policyRegAddressSame = "N";
  public accessoryDetails = <any>{};
	
  public active=0;
  public tabStatus= <any>{
    firstComplete : 'indone',
    secondComplete : 'indone',
    thirdComplete : 'indone',
    fourthOpen :[],
    fourthDisabled :[],
    fourthComplete:[],
    fifthDisabled : true,
    fifthComplete : 'indone',
    sixthComplete:'indone',
  }
public ftfUploaded :boolean = false;
	public fpfUploaded:boolean =  false;
	public resultPromise;
    public iterations = 0;
    public pastDateOptions =<any>{};
    public futureDateOptions = <any>{};
    public nomineeDobOptions = <any>{};
    public adultDobOptions = <any>{}; 
    public policyStartDateOptions = <any>{};  
    public opened= <any>{
      proposerDob : false,
      nomineeDob : false,
      appointeeDob : false,
      policyStartDate : false,
      youngestDriverDob : false,
      prePolicystartdate : false

  };    public formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    public format = this.formats[0];
    public altInputFormats = ['M!/d!/yyyy'];
  	public pageErrors = {
			insuredError : false,
			insuredErrorText : "",
			proposerError : false,
			proposerErrorText : "",
			uploadError : true,
			uploadErrorText : "Please upload Required Documents"
	}
  public healthProposalInput: any;
  public show_error:boolean =false;
  public error_text =null;
  public menuLoaded: boolean = false;
  public masterLoaded: boolean = false;
  public addressDetails = <any>[];
  public formLoaded: boolean = false;  
  public qIndex = 0;
  public policyTypeError = null;
  public errMessage: string = null;
  public errorCall:boolean = false;
  public policyState = null; 
  public corrState = null;
  public tcAgree: boolean = false;
  public items = <any>[];
  public otpInput = <any> {};
  public otpError: boolean = false;
  public failedStatus: boolean = false;
  public successStatus: boolean = false;
  public otpRetires: number = 0;
  public ressuccessStatus:boolean=false;


backPreviousPage()
	{
		window.history.back();
	}
	
  constructor(private shared: SharedService, private datepipe: DatePipe,private router: Router, private alertservice: AlertService) { }

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
           
      // oldPolicyEndDateOption
       this.pastDateOptions = {
          maxDate: new Date(yearMax, monthToday, dayToday),
          minDate: new Date(yearMin-100, monthToday, dayToday)	
      }
      
      this.futureDateOptions = {
          maxDate: new Date(yearMax+10, monthToday, dayToday),
          minDate: new Date()	
      }
      
       this.nomineeDobOptions = {
          maxDate: new Date(yearMax, monthToday-3, dayToday),
          minDate: new Date(yearMin-100, monthToday, dayToday)	
      }
  
     this.adultDobOptions={
          maxDate: new Date(newYearMax-18, newMaxMonthToday, newdayToday),
          minDate: new Date(newYearMin-100, monthToday, newdayToday)
    }  
       this.policyStartDateOptions={
        maxDate: new Date(newYearMax, newMaxMonthToday, newdayToday+44),
          minDate: new Date(newYearMin, monthToday, newdayToday)
      }
      
  
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
    this.getthePage();
  }
  open(name){
    this.opened[name] = true;

  }
  calculateAge(Dob){
    var calAge = this.shared.calculateAge(Dob);
    this.proposalInput.proposer.nomineeAge = calAge.toString();
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
            this.applicationData.proposalData.authentication = {"accesskey":"DBS","secretkey":"DBS"}; // remove it
            this.proposalInput= this.applicationData.proposalData;
            this.loading = false;
            console.log('proposal input',this.proposalInput);
            this.loadMasterData(this.proposalInput.insurerId);
            this.getMaster(this.requestData.productId, "State");

            this.formatApplication();
            this.setpolicyAddress();
            this.polState.id = this.proposalInput.proposer.policyStatecode;
            this.polState.value = this.proposalInput.proposer.policyState;
            if(this.polState.id != ""){
           this.getCity(this.polState.id,'Registration');

            }

            this.corState.id = this.proposalInput.proposer.corrStatecode;
           this.corState.value = this.proposalInput.proposer.corrState;
           if(this.corState.id != ""){

            this.getCity(this.corState.id,'Mailing');
           }
            this.polCity.id = this.proposalInput.proposer.policyCitycode;
            this.polCity.value = this.proposalInput.proposer.policyCity;
            this.corCity.id = this.proposalInput.proposer.corrCitycode;
            this.corCity.value = this.proposalInput.proposer.corrCity;

            this.corrState = this.proposalInput.proposer.corrStatecode;
            this.policyState = this.proposalInput.proposer.policyStatecode;
            console.log('proposal state',this.policyState+" "+this.corrState);


            this.covers = [];
				this.proposalInput.covers.forEach(value=>{
          //this.proposalInput.addons = value;
					var cover =value;
          var id = value.coverId;
          // Temporary Assignment of Display Names

          switch(id){
            case "ZERODEP":
              cover.displayName = "Depreciation Waiver";
              break;
            case "LOSSUSE":
              cover.displayName = "Spare Car";
              break;
            case "LOBL":
              cover.displayName = "Loss Of Baggage(₹50,000)";
              break;
            case "NCBPROTECT":
              cover.displayName = "NCB Protector";
              break;
            case "KEYREPL":
              cover.displayName = "Key Replacement";
              break;
            case "EP":
              cover.displayName = "Engine Protector";
              break;
              
            }
            this.covers.push(cover);				

        });
        if (this.proposalInput.vehicle.isOwnershipChanged == "Y"){
					this.resetNCB();
				}
			 else
			{
        console.log(this.proposalInput);

				// Show an error pag	
				
      }
     // this.loading = false;			

          }
  });
}
backSection(section){
  $('#panel'+section).removeClass('in active');
   var nextSec = Number(section) - 1;
   $('#panel'+nextSec).addClass('in active');
   $('li:nth-child('+section+')').removeClass('active');
   $('li:nth-child('+nextSec+')').addClass('active');
}
loadMasterData(insurerId){
  
  this.shared.getInsuMaster(insurerId)
  .subscribe(data =>{
    for(var k in data)  {
      var masterId = k;
      var master = [];
      var output = [];
      master = data[k];
      master.forEach(key=>{
        var item = <any> {};
        item.id = key.id;
        item.value = key.value;
        output.push(item);
  
    
    });
    if (output.length>0){
      this.insurerMaster[masterId] = output;
      if(masterId=='AddressType') this.addressDetails = output;
    }
   
      
        console.log('addressDetails',this.insurerMaster);
        this.masterLoaded = true;
        if (this.menuLoaded && this.masterLoaded && this.formLoaded){
          
          this.loading = false;
        }
  }
  //this.setAppInput(this.applicationData);
  }
 );
  
}

 setSelectBoxes(){
		
  this.polState.id = this.proposalInput.proposer.policyStatecode;
  this.polState.value = this.proposalInput.proposer.policyState;
  this.polCity.id = this.proposalInput.proposer.policyCitycode;
  this.polCity.value = this.proposalInput.proposer.policyCity;
  this.corState.id = this.proposalInput.proposer.corrStatecode;
  this.corState.value = this.proposalInput.proposer.corrState;
  this.corCity.id = this.proposalInput.proposer.corrCitycode;
  this.corCity.value = this.proposalInput.proposer.corrCity;
}


     formatApplication(){
      if (this.proposalInput.policy.typeOfBusiness == "New Business"){
        this.proposalInput.vehicle.isOwnershipChanged = "N";
        this.proposalInput.policy.policyStartdate =(this.proposalInput.vehicle.vehicleRegistrationDate,'yyyy-MM-dd');
      }
      this.setSelectBoxes();

     }
     getMaster(productId, masterId){
      this.insurerMaster[masterId] = [];
      this.shared.getMastersforProd(productId, masterId)
      .subscribe(
        data =>{
          this.insurerMaster[masterId] =  data.result;
          console.log('master',this.insurerMaster);
          
        });
     } 
     getMasterValue(masterName, masterId){
			
      var masterValue = "";
      var values = this.insurerMaster[masterName];
      
      if (typeof(values) != "undefined"){
        for (var i = 0; i<values.length; i++){
          
          if (values[i].id == masterId){
            masterValue = values[i].value;
          console.log(masterValue)
            break;
          }
        }
        
      }
  
      return masterValue; 
    }    
     resetNCB (){
      console.log(this.covers);
      this.proposalInput.prevpolicy.currNcb = 0;
      var premium = 0;
      var i = 0;
      for (i = 0; i<this.covers.length; i++){
        if (this.covers[i].coverId == "NCBPROTECT" && this.covers[i].isSelected == "Y"){
          premium = this.covers[i].premium;
          this.premiumAdd("NCBPROTECT",'N', premium);
          break;
        }
      }
      
      console.log(i);
      if (i<this.covers.length){
        this.covers.splice(i,1);
      }
      
      console.log(this.covers);
    }

    setGender(val)
    {
      if(val=='Mr') {
        this.proposalInput.proposer.gender='M';
      }
      else
      {
        this.proposalInput.proposer.gender = "F";
      }
    }

    ChangClaimAmount(previousClaim){
      this.resetNCB();
      if(previousClaim=='N'){
        this.proposalInput.prevpolicy.claimAmount=0
        this.proposalInput.prevpolicy.numberClaims = 0;
      }else
      {
        this.proposalInput.prevpolicy.claimAmount="";
      }
    }

    samePolicyCorrAddress()
	{
		this.proposalInput.proposer.corrAddress1=this.proposalInput.proposer.policyAddress1;
		this.proposalInput.proposer.corrAddress2=this.proposalInput.proposer.policyAddress2;
		this.proposalInput.proposer.corrAddress3=this.proposalInput.proposer.policyAddress3;
		this.proposalInput.proposer.corrStatecode=this.proposalInput.proposer.policyStatecode;
		this.proposalInput.proposer.corrState =this.proposalInput.proposer.policyState;
		this.proposalInput.proposer.corrCitycode =this.proposalInput.proposer.policyCitycode;
		this.proposalInput.proposer.corrCity =this.proposalInput.proposer.policyCity;
		this.proposalInput.proposer.corrPincode =this.proposalInput.proposer.policyPincode;
	 	 
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
		  
		  this.proposalInput.covers.push(cover);
		  this.proposalInput.policy.premiumPayable= Number(this.proposalInput.policy.premiumPayable)+ Number(Math.round(premiumVal));
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
     
    
    
  getCity(state,name) {
		var cities = [];
    if (typeof(state) != "undefined"){
      this.shared.getCityForState(this.proposalInput.insurerId,state, name)
        .subscribe(
          data =>{
            cities = data.result;
            if(name=="Registration") {
            this.proposalInput.proposer.policyStatecode = state;
            this.proposalInput.proposer.policyState = this.getMasterValue('State', this.proposalInput.proposer.policyStatecode);
            this.polCities = cities;
            console.log('pol citiess',this.polCities);
  
          }
          else if(name=="Mailing") {
            this.corCities = cities;
            console.log('corCities citiess',this.corCities);
            this.proposalInput.proposer.corrStatecode = state;
            this.proposalInput.proposer.corrState = this.getMasterValue('State', this.proposalInput.proposer.corrStatecode);
        }
      
    });
  }
	}
  cityChange(city,name) {
		if(name=="Registration") {
			this.proposalInput.proposer.policyCitycode = city;
			
		}else if(name=="Mailing") {
			this.proposalInput.proposer.corrCitycode = city;
		} 
  } 

  // Validation Functions
	
	checkAnualMilage(val) {
		console.log('va;',val);
		this.premiumMilageError="";
		if(val>=1000 && val<=50000)
		{
			this.premiumMilageError="";
		}
		else
		{
      this.premiumMilageError="Minimum value 1000 and Max value 50000";
      console.log('error;',this.premiumMilageError);

		}
	}
   
  nextSection(section){
    console.log('nextsection');
      switch (section){
        case "1":
          this.proposalError={key:"",errorPirnt:[]};
          this.tabStatus.firstComplete = 'done';
          $('#SecondTab').removeClass('tabdisable');
         
          break;
          case "2":
          this.proposalError={key:"",errorPirnt:[]}
          this.tabStatus.secondComplete = 'done';
          this.active =2;
          $('#thirdTab').removeClass('tabdisable');
          console.log(this.proposalInput)
          break;
        case "3":
            this.proposalError={key:"",errorPirnt:[]}
            this.tabStatus.thirdComplete='done';
            this.active =3;
            $('#forthTab').removeClass('tabdisable');
          
          break;
        
        case "4":
        this.proposalError={key:"",errorPirnt:[]}
        this.tabStatus.fourthComplete='done';
          this.active =4;
          $('#fifthTab').removeClass('tabdisable');
          
          break;
        case "5":
          this.showError='true';
             this.active =5;
          this.tabStatus.fifthComplete = 'done';
          this.proposalError={key:"",errorPirnt:[]}
          $('#sixthTab').removeClass('tabdisable');
          if (this.proposalInput.proposer.policyRegAddressSame =='Y'){
            this.setpolicyAddress();
            }
          break;
        case "6":
          
          this.active =6;
          this.tabStatus.sixthComplete='done';
          this.proposalError={key:"",errorPirnt:[]}
         $('#seventhTab').removeClass('tabdisable');
          break;
        
    }
    
    this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
         .subscribe(
           data =>{
            $('#panel'+section).removeClass('in active');
        var nextSec = Number(section) + 1;
        $('#panel'+nextSec).addClass('in active');
        $('li:nth-child('+section+')').removeClass('active');
        $('li:nth-child('+nextSec+')').addClass('active');
           }
         );
        }
        editFields(index, section)
        {
         $('#panel'+index).addClass('in active');
         $('#panel'+section).removeClass('in active');
         $('li:nth-child('+index+')').addClass('active');
         $('li:nth-child('+section+')').removeClass('active');
        }
        //pincode validation
    getPincode(e){
      this.errMessage ="";
      this.errorCall = false;
       if(e.target.value =="")
         this.errMessage ="Pincode field can not blank";
      else{
        this.shared.getPincode(e.target.value)
        .subscribe(
        data =>{
          if(Object.keys(data).length==0){
          this.errMessage ="Pincode is not valid";
          this.errorCall= true;
          }else {
           this.errMessage="";
           this.errorCall= false;
          // $('#errorCall').removeClass('has-error');
          // $('#errorCall').addClass('validity');
          }
        
        }
        );
      }   
     } 
    

        checkAccessories(){
		
          var valid = true;
          
          if (this.proposalInput.vehicle.nonElectricalAccessoryFlag=='Y' && this.proposalInput.vehicle.nonElectricalAccList.length == 0){
            valid = false;
          }
          
          if (this.proposalInput.vehicle.nonElectricalAccessoryFlag=='N') {
            this.proposalInput.vehicle.nonElectricalAccList = [];
          }
          
      
          if (this.proposalInput.vehicle.electricalAccessoryFlag=='Y' && this.proposalInput.vehicle.electricalAccList.length == 0){
            valid = false;
          }
          
          if (this.proposalInput.vehicle.electricalAccessoryFlag=='N') {
            this.proposalInput.vehicle.electricalAccList = [];
          }
          
          
          return valid;
        }
        
        validateOldPolicy(value,form)
	    {
		console.log(form)
		var myDate = new Date(value);
		var today=new Date();
		//add a day to the date
		myDate.setDate(value.getDate() + 1);
		if( myDate>=new Date(this.proposalInput.policy.policyStartDate)|| myDate<today)
		{
			 form.OldPolicyEndDate.$setValidity("uniq", false);
	    	this.show_error=true;
	    	this.error_text='The Start date of New Policy must be the day after this date.';	
	    	console.log(this.error_text)
		}
		else
		{
			form.OldPolicyEndDate.$setValidity("uniq", true);
			
		}
  }
  checkPolicyType(form,val) {
		
		this.policyPremiumError="";
		if(val == "C")
		{
			
			this.policyTypeError=""
		}
		else if(val == 'L')
		{
			
      this.policyTypeError="Renewal of Liability only policy online is not allowed";
      console.log("this.policyTypeError");
		}
  }
  checkPolicyPremium(form,val) {
		
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

    previousPolicyLastDate=function(prevStart)
	{
		console.log(prevStart);
		var date=new Date(prevStart);
		this.proposalInput.prevpolicy.prePolicyenddate=(new Date(date.getFullYear()+1,date.getMonth(),date.getDate()-1),'yyyy-MM-dd');
	}
	
	addEditAccessory(type, action, qIndex,Accessoryform:NgForm){
    qIndex =this.qIndex;
    Accessoryform.form.reset();
    var input =<any>{};
    input.type = type;
    input.action = action;

    if(input.action == "Add" && input.type=="Elec")
    {
      $('#AccessoryModel').show();

    }
    if(input.action == "Delete")
  {	
  if (input.type == "Elec"){
    this.proposalInput.vehicle.electricalAccList.splice(this.qIndex,1);
  }else
  {
    this.proposalInput.vehicle.nonElectricalAccList.splice(this.qIndex,1);
  }
  }
 
    
}
addEditAccessory1(type, action, qindex,NonAccessoryform:NgForm){

  NonAccessoryform.form.reset();
  qindex = this.qIndex;
  var input =<any>{};
  input.type = type;
  input.action = action;

  if(input.action == "Add" && input.type=="NonElec")
  {
    $('#NonAccessoryModel').show();

  }
  if(input.action == "Delete")
  {	
    if (input.type == "NonElec"){
      this.proposalInput.vehicle.nonElectricalAccList.splice(this.qIndex,1);
    }else 
    {
      this.proposalInput.vehicle.electricalAccList.splice(this.qIndex,1);
    }
    }
}
  
  accessorySubmit(type)
  {
    var output = <any>{};

      output.type =type;
      output.make = this.accessoryDetails.make;
      output.name = this.accessoryDetails.name;
      output.value = this.accessoryDetails.value;
      console.log('output::',output);
      if(output!=undefined)
      {	
      if (output.type == "Elec"){
        this.proposalInput.vehicle.electricalAccList.push(output);
      }else
      {
        this.proposalInput.vehicle.nonElectricalAccList.push(output);
      }
    } 
  

  $("#AccessoryModel").hide();

}
nonAccessorySubmit(type)
  {
    var output = <any>{};

      output.type =type;
      output.make = this.accessoryDetails.make;
      output.name = this.accessoryDetails.name;
      output.value = this.accessoryDetails.value;
      console.log('output::',output);
      if(output!=undefined)
      {	
      if (output.type == "NonElec"){
        this.proposalInput.vehicle.nonElectricalAccList.push(output);
      }else
      {
        this.proposalInput.vehicle.electricalAccList.push(output);
      }

    } 
  


  $('#NonAccessoryModel').hide();

}
cancelevent2(){
  $('#NonAccessoryModel').hide();


}
	cancelevent1(){
    $('#AccessoryModel').hide();


  }
	filterValue($event){
        //if(isNaN(String.fromCharCode($event.keyCode))){
          //  $event.preventDefault();
        //}
     };
	//check validation policy


     cleanArray(actual) {
		  var newArray = new Array();
		  for (var i = 0; i < actual.length; i++) {
		    if (actual[i]) {
		      newArray.push(actual[i]);
		    }
		  }
		  return newArray;
	}
  populateCoverData(){
 		
    this.covers.forEach(value=>{
      if(value.isSelected == "Y")
      {
       var cover =<any> {};
       cover.name = value.coverId;
       
       if (cover.name == "PAPASS" ){
         cover.num = 5;
       }
       this.proposalInput.covers.push(cover);
      }
   
    });
    
  }   
   setpolicyAddress(){
 		
    if (this.proposalInput.proposer.policyRegAddressSame =='Y'){
      this.proposalInput.proposer.corrAddress1 = this.proposalInput.proposer.policyAddress1;
      this.proposalInput.proposer.corrAddress2 = this.proposalInput.proposer.policyAddress2;
      this.proposalInput.proposer.corrAddress3 = this.proposalInput.proposer.policyAddress3;
      this.proposalInput.proposer.corrCity = this.proposalInput.proposer.policyCity;
      this.proposalInput.proposer.corrCitycode = this.proposalInput.proposer.policyCitycode;
      this.proposalInput.proposer.corrState = this.proposalInput.proposer.policyState;
      this.proposalInput.proposer.corrStatecode = this.proposalInput.proposer.policyStatecode;
      this.proposalInput.proposer.corrPincode = this.proposalInput.proposer.policyPincode;
      console.log('corradree same',this.proposalInput.proposer.corrCitycode)
    }
  }
  clearformcontact(e,contactDetail:NgForm)
  {
    if (this.proposalInput.proposer.policyRegAddressSame =='N'){
      contactDetail.form.reset();
    }
  }
  
   getAccessoryValue() {
    
    this.proposalInput.vehicle.electricalAcc = 0;		
    this.proposalInput.vehicle.electricalAccList.forEach(acc=>{
      this.proposalInput.vehicle.electricalAcc = this.proposalInput.vehicle.electricalAcc + acc.value;

    }) 
    
    
    this.proposalInput.vehicle.nonElectricalAcc = 0;		
    this.proposalInput.vehicle.nonElectricalAccList.forEach(acc=>{
      this.proposalInput.vehicle.nonElectricalAcc = this.proposalInput.vehicle.nonElectricalAcc + acc.value;

    });
  }
  agreeTC(agree){
    if( typeof(agree) != 'undefined')
    {
      if(agree = 'Y')
      this.tcAgree = true;
      else {
        this.tcAgree = false;
      }
    }
   }
   disagree(disagree)
   {
      this.tcAgree = false;
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
  makePayment()
  {
    this.loading =false;
    var motorProposal = this.proposalInput;
    console.log(JSON.stringify(motorProposal));
    this.shared.submitProposalMotor(motorProposal, this.proposalInput.insurerId, this.proposalInput.productId)
    .subscribe(
      data =>{
        if(data.error){
          this.loading =false;

          var str=data.error;
          this.proposalError.errorPirnt = this.cleanArray(str.split(";"));
          if(data.error =="Premium Mismatch")
          this.newPreMiumMismatch({"premiumPayable":data.premiumPayable,"premiumPassed":data.premiumPassed})
          console.log("errorPirnt", this.proposalError.errorPirnt);

        }
        else{
          this.loading =true;

          this.proposalError={key:"",errorPirnt:[]};
					console.log(data);
          var payUrl = data.payUrl 
                 + '?agentId='+data.agentId
                 + '&premium='+data.premium
                 + '&apikey='+data.apikey
                 +  '&quoteId='+data.quoteId
                 + '&version_no='+data.version_no
                 + '&strFirstName='+data.strFirstName
                 + '&strEmail='+data.strEmail
                 + '&returnUrl='+data.returnUrl
                 + '&vehicleSubLine='+data.vehicleSubLine
                 + '&paymentType='+data.paymentType
                 + '&reqType='+data.reqType
                 + '&process='+data.process
                 + '&clientCODE='+data.clientCODE
                 + '&isQuickRenew=null&crossSellProduct=null&crossSellQuoteid=null&elc_value=""&nonelc_value=null';
                 var otpInput = <any> {};
                 otpInput.appNo = data.quoteId;
                 otpInput.productId = this.proposalInput.productId;
                 otpInput.mobile = this.proposalInput.proposer.mobile;
                 otpInput.pgUrl = payUrl;
                 this.otp(otpInput);	



        }
      }
    )

  }

otp(otpInput){
  this.otpInput = otpInput;
  console.log('opt',this.otpInput);
  var productName="Private Car";
  this.otpError = false;
  $('#otpModal').modal('show');
  $('#loader').hide();
this.failedStatus = false;
this.shared.generateOTP(this.otpInput.appNo, this.otpInput.productId,productName, this.otpInput.mobile)
.subscribe(data =>{

  if(data.result==0)
  {
    this.successStatus=true;
  }
  else
  {
  this.failedStatus= true;
  this.successStatus=false;
  }
}, error =>{
  $('#loader').hide();
  this.failedStatus= true;
  this.successStatus=false;
});

}
checkOTP(OTP){
  console.log('otppp',OTP);
  this.shared.verifyOTP(this.otpInput.appNo, this.otpInput.productId, OTP)
  .subscribe(data =>{
    if(data.result == 'true'){
     $('#otpModal').modal('hide');
      this.proposalInput.payurl= this.otpInput.pgUrl;
      window.open(this.proposalInput.payurl);
    } else
    {
      this.otpError = true;
    }
    
  });
}
resend(){
  var productName="Gruh Suraksha";
  this.otpError = false;
  this.failedStatus = false; 
this.shared.generateOTP(this.otpInput.appNo, this.otpInput.productId,productName, this.otpInput.mobile)
.subscribe(data =>{
  this.otpRetires++;
  if(data.result==0)
  {
    $('#otpModal').modal('show');
    this.ressuccessStatus=true;
    this.successStatus=false;
  }
  else
  {
    $('#otpModal').modal('show');
  this.failedStatus= true;
  this.ressuccessStatus=false;
  this.successStatus=false;
  }
}, error =>{
  $('#loader').hide();
  this.failedStatus= true;
  this.ressuccessStatus=false;
  this.successStatus=false;
});

}
}