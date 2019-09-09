import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-home-royalsundaram',
  templateUrl: './home-royalsundaram.component.html',
  styleUrls: ['./home-royalsundaram.component.css']
})
export class HomeRoyalsundaramComponent implements OnInit {
  public imagePath = IMAGE_URL;
  public otpRetires: number = 0;
  public failedStatus: boolean = false;
  public successStatus:boolean=false;
  public ressuccessStatus:boolean=false;
  public tcview:boolean=false;
  public proposalInput = <any>{};
  public policyArea=<any>{};
  public currentArea=<any>{};
  public loading:boolean = true;
  public insurerMaster = <any> [];
  public formats=<any>[];
  public format=<any>[];
  public altInputFormats=<any>[];
  public requestData = <any>{};
  public applicationData= <any>{};
  public proposalError = <any>{};
  public active=0;
  public showError='';
  public items = <any>[];
  public buildingAgeList=[{"id" :"0 to 5", "value" : "Up to 5 Years"},{"id" :"5 to 10", "value" : "5 to 10 Years"},{"id" :"10 to 15", "value" : "10 to 15 Years"},{"id" :"16 to 20", "value" : "15 to 20 Years"},{"id" :"20 to 25", "value" : "20 to 25 Years"},{"id" :"25 to 30", "value" : "25 to 30 Years"}];
  public tabStatus= <any> {
    firstComplete : 'indone',
    secondComplete : 'indone',
    thirdComplete : 'indone',
    fourthOpen :[],
    fourthDisabled :[],
    fourthComplete:[],
    fifthDisabled : true,
    seventhComplete:"indone"
}
public pageErrors = {
  buildingError: false,
  buildingErrorText: "",
  wcerrorText:"",
  paerrorText:"",
  wcerror:false,
  paerror:false
 
}
  public polState={};
	public polCity={};
	public corState={};
	public corCity={};
  public polCities = [];
  public areasPolicy = []; 
  public areasCorr = []; 
  public corCities = [];
  public policyCity = null;
  public policyState = null;
  public employeeData = <any>{};
  public employeePAData = <any> {};
  public otpInput = <any> {};
  public otpError: boolean = false;
  public errCall: boolean = false;
  public errCallls: boolean = false;
  public errormsg=null;
  public errormsgls=null;
  public maxDateOption = <any>{};
  public userName = null;
  public firstName= null;
  public lastName= null;
  
  constructor(private shared: SharedService, private datepipe: DatePipe, private router: Router) { }

  ngOnInit() {
    $('#loader').hide();
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
    this.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    this.format = this.formats[0];
    this.altInputFormats = ['M!/d!/yyyy'];
    this.maxDateOption={
      maxDate: new Date()
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
            this.loading = false;
          
            this.applicationData = JSON.parse(data.result);
            this.applicationData.proposalData.authentication = {"accesskey":"DBS","secretkey":"DBS"}; // remove it
            this.proposalInput= this.applicationData.proposalData;
            console.log(this.proposalInput);
            this.getMaster(this.proposalInput.productId,"State");
		        this.getMaster(this.proposalInput.productId,"Occupation");
		        this.getMaster(this.proposalInput.productId,"NomineeRel");
            this.getMaster(this.proposalInput.productId,"Relationship");
          //  getAreasFromPincode('P',this.proposalInput.proposer.policyPincode);
          //getAreasFromPincode('C', this.proposalInput.proposer.corrPincode);
              this.currentArea=this.proposalInput.proposer.corrArea;
              this.policyArea=this.proposalInput.proposer.policyArea;
             if(this.proposalInput.structure.builtByConcrete=='N')
             {
              this.pageErrors.buildingError = true;
              this.pageErrors.buildingErrorText = "Please select Is the Building made of Concrete as YES";
             }
             else
             {
              this.pageErrors.buildingError = false;
              this.pageErrors.buildingErrorText = "";
             }
            this.proposalInput.contents.forEach(value => {
              if(value.contentType == "CASH"){
                switch (this.proposalInput.productId){
                case "102FI03H01":
                  value.contentValue = 5000;
                  break;
                case "102FI03H02":
                case "102FI03H03":
                  value.contentValue = 15000;
                  break;
                case "102FI03H04":
                case "102FI03H05":
                  value.contentValue = 25000;
                  break;
                }
              }		
            })
          }
        });
      }
    /*public filterValue(event){
        if(isNaN(String.fromCharCode(event.keyCode))){
            event.preventDefault();
        }
     }*/
     getMaster(productId, masterId){
      this.insurerMaster[masterId] = [];
      this.shared.getMastersforProd(productId, masterId)
      .subscribe(
        data =>{
          var masterName = masterId + "List";
			    this.insurerMaster[masterName] =  data.result;
        });
     }   
    getProposerAge(dob){
      this.proposalInput.proposer.custage = this.shared.calculateAge(dob);
    }
    getNomineeAge(dob){
      this.proposalInput.proposer.nomineeAge = this.shared.calculateAge(dob);
    }
   nextSection (section) {
    $('#loader').show();
      switch (section){
      case "1":
        this.active=1;
        this.tabStatus.firstComplete = 'done';
        //this.tabStatus.secondDisabled = false;
        this.proposalError={key:"",errorPirnt:[]};
        $('#SecondTab').removeClass('tabdisable');
        if(this.proposalInput.proposer.policyPincode!="")
        {
        this.shared.getCityFromPin(this.proposalInput.insurerId,this.proposalInput.proposer.policyPincode)
  .subscribe(
    data =>{
      if (data.hasOwnProperty("result")){
       this.areasPolicy = data.result;
         } 
        });
      
       }
       if(this.proposalInput.proposer.corrPincode!="")
        {
        this.shared.getCityFromPin(this.proposalInput.insurerId,this.proposalInput.proposer.corrPincode)
  .subscribe(
    data =>{
      if (data.hasOwnProperty("result")){
       this.areasCorr = data.result;
         } 
        });
      
       }
       
        break;
      case "2":
        this.active =2;
        this.tabStatus.secondComplete = 'done';
        //this.tabStatus.thirdDisabled= false;
        this.proposalError={key:"",errorPirnt:[]};
        console.log(this.proposalInput);
        if(this.proposalInput.proposer.policyStatecode!="")
        {
        this.shared.getCityForState(this.proposalInput.insurerId, this.proposalInput.proposer.policyStatecode, 'homeRoyal')
        .subscribe(data =>{
          this.insurerMaster.CityList=data.result;
        });
      }
      if(this.proposalInput.proposer.corrStatecode!="")
      {
      this.shared.getCityForState(this.proposalInput.insurerId, this.proposalInput.proposer.corrStatecode, 'homeRoyal')
      .subscribe(data =>{
        this.insurerMaster.CityList1=data.result;
      });
    }
        $('#thirdTab').removeClass('tabdisable');
        break;
      case "3":
                
          this.active =3;
          this.tabStatus.thirdComplete='done';
         // this.tabStatus.fourthDisabled= false;
          this.proposalError={key:"",errorPirnt:[]};
          $('#forthTab').removeClass('tabdisable');	
        break;
      
      case "4":
        this.active =4;
        this.tabStatus.fourthComplete='done';
        this.proposalError={key:"",errorPirnt:[]};
        $('#fifthTab').removeClass('tabdisable');
        break;
      case "5":
        this.showError='true';
        this.active =5;
        //this.tabStatus.fifthOpen = false;
        this.tabStatus.fifthComplete = 'done';
        //this.tabStatus.sixthOpen = true;
        this.tabStatus.sixthDisabled = false;
        this.correspondAddress();
      
       
        this.proposalError={key:"",errorPirnt:[]}
        break;
      }
      this.setpolicyAddress();
      this.applicationData.proposalData = this.proposalInput;
      console.log("saved data",JSON.stringify(this.proposalInput));
      this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
     .subscribe(
       data =>{
        $('#loader').hide();
        $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) + 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+section+')').removeClass('active');
    $('li:nth-child('+nextSec+')').addClass('active');
       }
     );
    }
  correspondAddress() {
    this.proposalInput.proposer.corrAddress1 = this.proposalInput.proposer.policyAddress1;
    this.proposalInput.proposer.corrAddress2 = this.proposalInput.proposer.policyAddress2;
    this.proposalInput.proposer.corrAddress3 = this.proposalInput.proposer.policyAddress3;
    this.proposalInput.proposer.corrCity = this.proposalInput.proposer.policyCity;
    this.proposalInput.proposer.corrCitycode = this.proposalInput.proposer.policyCitycode;
    this.proposalInput.proposer.corrState = this.proposalInput.proposer.policyState;
    this.proposalInput.proposer.corrStatecode = this.proposalInput.proposer.policyStatecode;
    this.proposalInput.proposer.corrPincode = this.proposalInput.proposer.policyPincode;
    this.proposalInput.proposer.corrDistrict = this.proposalInput.proposer.policyDistrict;
    this.proposalInput.proposer.corrArea = this.proposalInput.proposer.policyArea;
    this.proposalInput.proposer.corrAreaCode = this.proposalInput.proposer.policyArea;
    
   
        
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
        this.proposalInput.proposer.corrDistrict = this.proposalInput.proposer.policyDistrict;
        this.proposalInput.proposer.corrArea = this.proposalInput.proposer.policyArea;
        this.proposalInput.proposer.corrAreaCode = this.proposalInput.proposer.policyArea;
  		}
  		

		var addresses = [];
		var address = <any> {}
		address.addressType = "C";
 		address.addressLine1 = this.proposalInput.proposer.corrAddress1;
		address.addressLine2 = this.proposalInput.proposer.corrAddress2;
		address.addressLine3 = this.proposalInput.proposer.corrAddress3
		address.city = this.proposalInput.proposer.corrCity;
		address.cityCode = this.proposalInput.proposer.corrCityCode;
		address.state = this.proposalInput.proposer.corrState;
		address.stateCode = this.proposalInput.proposer.corrStateCode;
    address.pincode = this.proposalInput.proposer.corrPincode;
    address.district = this.proposalInput.proposer.corrDistrict;
    address.area = this.proposalInput.proposer.corrArea;
    address.corrAreaCode=this.proposalInput.proposer.corrArea;
		addresses.push(address);
		
		address = {};
		address.addressType = "P";
 		address.addressLine1 = this.proposalInput.proposer.policyAddress1;
		address.addressLine2 = this.proposalInput.proposer.policyAddress2;
		address.addressLine3 = this.proposalInput.proposer.policyAddress3;
		address.city = this.proposalInput.proposer.policyCity;
		address.cityCode = this.proposalInput.proposer.policyCityCode;
		address.state = this.proposalInput.proposer.policyState;
		address.stateCode = this.proposalInput.proposer.policyStateCode;
    address.pincode = this.proposalInput.proposer.policyPincode;
    address.district = this.proposalInput.proposer.policyDistrict;
    address.area = this.proposalInput.proposer.policyArea;
    address.policyAreaCode=this.proposalInput.proposer.policyArea;
		addresses.push(address);
		this.proposalInput.proposer.address = addresses;
		
		var contacts = []
		var contact = <any>{};
		contact.contactType = "mobile";
		contact.contactText = this.proposalInput.proposer.mobile;
		contacts.push(contact);
		contact = {};
		contact.contactType = "email";
		contact.contactText = this.proposalInput.proposer.email;
		contacts.push(contact);
		this.proposalInput.proposer.contacts = contacts;
    }  
  
  getCity(state,name){
    this.shared.getCityForState(this.proposalInput.insurerId, state, 'homeRoyal')
    .subscribe(data =>{
      
					if(name == 'Policy')
					{
            this.insurerMaster.CityList=data.result;
             for(var i=0;i<this.insurerMaster.StateList.length;i++)
            {
              if(this.insurerMaster.StateList[i].id==state)
              {
                this.proposalInput.proposer.policyState=this.insurerMaster.StateList[i].value;
              }
            }
           //this.proposalInput.proposer.policyStatecode=state.id;
				 	 
					} else{
            //this.proposalInput.proposer.corrStatecode=state.id;
            //this.proposalInput.proposer.corrState=state.value;
            this.insurerMaster.CityList1=data.result;
             for(var i=0;i<this.insurerMaster.StateList.length;i++)
            {
              if(this.insurerMaster.StateList[i].id==state)
              {
                this.proposalInput.proposer.corrState=this.insurerMaster.StateList[i].value;
              }
            }
          }
			});
    }
    selectCity(city, name){
      if(name=='Policy'){
            for(var i=0;i<this.insurerMaster.CityList.length;i++)
            {
              if(this.insurerMaster.CityList[i].id==city)
              {
                this.proposalInput.proposer.policyCity=this.insurerMaster.CityList[i].value;
              }
            }
        //this.proposalInput.proposer.policyCitycode=city.id;
      //  this.proposalInput.proposer.policyCity=city.value;
      }else{
            for(var i=0;i<this.insurerMaster.CityList1.length;i++)
            {
              if(this.insurerMaster.CityList1[i].id==city)
              {
                this.proposalInput.proposer.corrCity=this.insurerMaster.CityList1[i].value;
              }
            }
       // this.proposalInput.proposer.corrCitycode=city.id;
       // this.proposalInput.proposer.corrCity=city.value;
      }

   }
  remiumAdd(premium) {	
    this.proposalInput.policy.premiumPayable= this.proposalInput.policy.premiumPayable+premium;
    this.updateWCPremium();
    }
  updateWCPremium() {
    	this.proposalInput.policy.displayPremium = this.proposalInput.policy.premiumPayable;
    	this.proposalInput.wcList.forEach(val => {
    		var premium = Math.round(1.18*0.0049*val.annualWages) ;
    		this.proposalInput.policy.displayPremium = Number(this.proposalInput.policy.displayPremium) + Number(premium);
    		
    	});
    	
    }
  calculateemployeeAge(dob){

    }
  paemployeeAge(dob){
    
  }
  addWC() {
    this.employeeData = {};
    $('#addwcmodal').modal('show');
  } 
  editFields(index, section)
  {
   $('#panel'+index).addClass('in active');
   $('#panel'+section).removeClass('in active');
   $('li:nth-child('+index+')').addClass('active');
   $('li:nth-child('+section+')').removeClass('active');
  }  
  populateCoverData(){
		
		this.proposalInput.covers = [];
		this.proposalInput.addons.forEach(value => {
			if(value.isSelected == "Y")
				{
				 var cover = <any>{};
				 cover.name = value.coverId;
				 this.proposalInput.covers.push(cover);
				}
			
		})
		
  } 
  backSection(section){
    $('#panel'+section).removeClass('in active');
     var nextSec = Number(section) - 1;
     $('#panel'+nextSec).addClass('in active');
     $('li:nth-child('+section+')').removeClass('active');
     $('li:nth-child('+nextSec+')').addClass('active');
  }
  makePayment(){
    $('#loader').show();
     this.populateCoverData();
      this.setpolicyAddress();
      this.proposalInput.policy.basePremium = Math.round(this.proposalInput.policy.premiumPayable/1.18);
 		  this.proposalInput.policy.serviceTax = this.proposalInput.policy.premiumPayable - this.proposalInput.policy.basePremium;
       this.proposalError.errorPirnt = [];
 		  var homeProposal= this.proposalInput;
      console.log(JSON.stringify(homeProposal));
     this.shared.submitProposalHome(homeProposal, this.proposalInput.insurerId, this.proposalInput.productId)
     .subscribe(
      data =>{
        console.log("MAKE PAYMENT RESPONSE", data);
        if(data.hasOwnProperty("error")){
          $('#loader').hide();
          var str=data.error;
          this.proposalError.errorPirnt = this.cleanArray(str.split(";"));
          if(data.error =="Premium Mismatch")
          this.newPreMiumMismatch({"premiumPayable":data.premiumPayable,"premiumPassed":data.premiumPassed})
        }
        else{
         this.proposalError={key:"",errorPirnt:[]};
					console.log(data);
          var payUrl = data.payUrl 
          + '?agentId='+data.paymentInput.agentId
          + '&premium='+data.paymentInput.premium
          + '&apikey='+data.paymentInput.apikey
          + '&quoteId='+data.paymentInput.quoteId
          + '&version_no='+data.paymentInput.version_no
          + '&strFirstName='+data.paymentInput.strFirstName
          + '&strEmail='+data.paymentInput.strEmail
          + '&isQuickRenew='+data.paymentInput.isQuickRenew
          + '&crossSellProduct='+data.paymentInput.crossSellProduct
          + '&crossSellQuoteid='+data.paymentInput.crossSellQuoteid
          + '&returnUrl='+data.paymentInput.returnUrl
          + '&vehicleSubLine='+data.paymentInput.vehicleSubLine
          + '&elc_value='+data.paymentInput.elc_value
          + '&paymentType='+data.paymentInput.paymentType;
        // Check for OTP and Then Transfer control to the PG
          var otpInput = <any> {};
          otpInput.appNo = data.paymentInput.quoteId;
          otpInput.productId = this.proposalInput.productId
          otpInput.mobile = this.proposalInput.proposer.mobile;
          otpInput.pgUrl = payUrl;
          this.otp(otpInput);
        }
      }
     );
    
  }
  otp(otpInput){
      this.otpInput = otpInput;
      var productName="Gruh Suraksha";
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
  cleanArray(actual){
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
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
  agreeTC(terms){
    if(terms=='agree')
    {
      this.tcview=true;
    }
    else
    {
      this.tcview=false;
    }
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
setgender(value)
{
  if(value=='MS'||value=='MRS')
  {
    this.proposalInput.proposer.gender='F';
  }
  else if(value=='MR')
  {
    this.proposalInput.proposer.gender='M'; 
  }
}
  checkOTP(OTP){
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
  validateWC(value)
  {
    this.pageErrors.wcerror=false;
    if(value=='0')
    {
      this.proposalInput.wcList=[];
      this.pageErrors.wcerror=false;
      this.pageErrors.wcerrorText=""
    }
  
    if(value =='1' &&  this.proposalInput.wcList.length==0)
    {
      this.pageErrors.wcerror=true;
      this.pageErrors.wcerrorText="please fill Worker's compensation for your employees details"
      
    }
   
  }

  validatePA(value)
  {
    this.pageErrors.paerror=false;
    if(value=='0')
    {
      this.proposalInput.paList=[];
      this.pageErrors.paerror=false;
      this.pageErrors.paerrorText=""
    }
  
    if(value =='1' &&  this.proposalInput.paList.length==0)
    {
      this.pageErrors.paerror=true;
      this.pageErrors.paerrorText="please fill Personal Accident Cover for your employees details"
      
    }
   
  }
  
  submitWC(){
    console.log(this.employeeData);
    this.employeeData.dob = this.datepipe.transform(this.employeeData.dob, "yyyy-MM-dd");
    if(this.employeeData!=undefined) {
      this.proposalInput.wcList.push(this.employeeData);
      this.pageErrors.wcerror=false;
      this.pageErrors.wcerrorText="";
      this.updateWCPremium();
    }
		$('#addwcmodal').modal('hide');
  }
  addPA() {
    this.employeePAData = {};
    $('#addPAmodal').modal('show');
  }
  submitPA(){
    console.log(this.employeePAData);
    this.employeePAData.dob = this.datepipe.transform(this.employeePAData.dob, "yyyy-MM-dd");
    if(this.employeePAData!=undefined) {
      this.proposalInput.paList.push(this.employeePAData);
      this.pageErrors.paerror=false;
      this.pageErrors.paerrorText="";
      this.updateWCPremium();
    }
		$('#addPAmodal').modal('hide');
  } 
 deleteWC(i){
    this.proposalInput.wcList.splice(i,1);
    this.updateWCPremium();
  }
 deletePA(i){
    this.proposalInput.paList.splice(i,1);
    this.updatePAPremium();
  } 
  updatePAPremium() {	
    this.proposalInput.policy.displayPremium = this.proposalInput.policy.premiumPayable;
    this.proposalInput.paList.array.forEach(val => {
      var premium = Math.round(1.18*0.0049*val.annualWages) ;
      this.proposalInput.policy.displayPremium = Number(this.proposalInput.policy.displayPremium) + Number(premium);
      
    });
    
  }


  compoundSI(e)
  {
    this.errCall=false;
   var minSI= 0.1*(this.proposalInput.structure.buildingSI);
   var maxSI= 0.2*(this.proposalInput.structure.buildingSI);
   if(e.target.value<minSI || e.target.value>maxSI)
   {
   this.errCall=true;
   this.errormsg="Please enter the valid compound wall Sum Insured. The minimum should be 10% and the maximum should be 20% of the building sum insured amount."
   }
  }
  landscapeSI(e)
  {
    this.errCallls=false;
    var minSI= 0.1*(this.proposalInput.structure.buildingSI);
    var maxSI= 0.2*(this.proposalInput.structure.buildingSI);
    if(e.target.value<minSI || e.target.value>maxSI)
    {
    this.errCallls=true;
    this.errormsgls="Please enter the valid compound wall Sum Insured. The minimum should be 10% and the maximum should be 20% of the building sum insured amount."
    }
  }


  premiumAdd(premium) {
		
		this.proposalInput.policy.premiumPayable=this.proposalInput.policy.premiumPayable+premium;
		this.updateWCPremium()
	}

	
	premiumSubtract(premium) {
		this.proposalInput.policy.premiumPayable= this.proposalInput.policy.premiumPayable-premium;
		this.updateWCPremium();
  }

  policypincode (type, pincode){
 
  this.shared.getCityFromPin(this.proposalInput.insurerId,pincode)
  .subscribe(
    data =>{
      if (data.hasOwnProperty("result")){
        if (type == "P"){
          this.areasPolicy = data.result;
          //$scope.getCity(data.result[0].stateId);
         // $scope.setCityState("P", $scope.polArea)
        } else
        {
          this.areasCorr = data.result; 
          //$scope.getCity(data.result[0].stateId);
          //$scope.setCityState("C", $scope.corArea)
        }
     }
    });
 }

setCityState(type, area){
		
  var areas = []
  if (typeof(area) != "undefined"){
     if (type == "P"){
       for(var i=0;i<this.areasPolicy.length;i++)
       {
         if(this.areasPolicy[i].area==area)
         {
          this.proposalInput.proposer.policyDistrict = this.areasPolicy[i].district;
         }
   
       }
       this.proposalInput.proposer.policyArea = area;
       this.proposalInput.proposer.policyAreaCode = area;
       //$scope.getCity(area.stateId);
       
     } else
     {
      for(var i=0;i<this.areasCorr.length;i++)
      {
        if(this.areasCorr[i].area==area)
        {
         this.proposalInput.proposer.corrDistrict = this.areasCorr[i].district;
        }
  
      }
       this.proposalInput.proposer.corrArea=area;
       this.proposalInput.proposer.corrAreaCode = area;
       //$scope.getCity(area.stateId);
     }
  }
}
validatebuildingconcrete(value)
{
  if(value=='N')
  {
    this.pageErrors.buildingError = true;
    this.pageErrors.buildingErrorText = "Please select Is the Building made of Concrete as YES";
  }
  else
  {
    this.pageErrors.buildingError = false;
    this.pageErrors.buildingErrorText = "";
  }
}
validatedata(value)
{
if(value=='N')
{
  this.proposalInput.proposer.corrAddress1 = "";
  this.proposalInput.proposer.corrAddress2 = "";
  this.proposalInput.proposer.corrAddress3 = "";
  this.proposalInput.proposer.corrCity = "";
  this.proposalInput.proposer.corrCitycode = "";
  this.proposalInput.proposer.corrState = "";
  this.proposalInput.proposer.corrStatecode = "";
  this.proposalInput.proposer.corrPincode = "";
  this.proposalInput.proposer.corrDistrict = "";
  this.proposalInput.proposer.corrArea = "";
  this.proposalInput.proposer.corrAreaCode = "";
  
}
}
  
 
	
}
