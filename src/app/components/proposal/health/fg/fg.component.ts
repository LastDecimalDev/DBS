import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { KeysPipe } from '../../../../sharedServices/keyValuePipe';
import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-fg',
  templateUrl: './fg.component.html',
  styleUrls: ['./fg.component.css']
})
export class HealthfgComponent implements OnInit {
  public imagePath = IMAGE_URL;
  public proposalInput = <any>{};
  public loading:boolean = true;
  public insurerMaster = <any> [];
  public requestData = <any>{};
  public polCities = [];
  public corCities = [];
  public formBuild: boolean = false;
  public applicationData= <any>{};
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
  public pageErrors = {
    insuredError: false,
    medicalError: false,
    insuredErrorText : "",
    medicalErrorText : ""
  }
  public corrCity = null;
  public corrState = null;
  public items = <any>[];
  public covers = [];
  public proposalError = <any>{};
  public active=0;
  public isProposerInsured:boolean = false;
  public medicalQuestions = [];
  public insureds = [];
  public adultDobOptions = <any> {};
  public nomineeDobOptions = <any> {};
  public policyStartDateOptions = <any> {};
  public  paymentInput = {
                  url: null,
                  params: null
          };
  public paymenturl = null; 
  public corCity = <any> [];
  public polCity = <any> [];
  public corArea ;
  public polArea;
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
    //this.proposalInput = JSON.parse(atob(decodeUriData));
    //console.log(this.proposalInput);
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
            console.log(this.proposalInput);
            this.loading = false;
            this.proposalInput.policy.serviceTax = Number(this.proposalInput.policy.CGST) + Number(this.proposalInput.policy.SGST);		
            this.proposalInput.medicalDetails = [];
            this.covers = [];
            this.proposalInput.policy.paymentMode = "CC";
            this.proposalInput.addons.forEach(value => {
              var cover = value;
              this.covers.push(cover);				
            })
            
            this.proposalInput.proposer.address.forEach(value => {
              var addressType = value.addressType;
              switch (addressType){
              case "C":
                this.proposalInput.proposer.corrAddressLine1 = value.addressLine1;
                this.proposalInput.proposer.corrAddressLine2 = value.addressLine2 ;
                this.proposalInput.proposer.corrCity = value.city;
                this.proposalInput.proposer.corrCityCode = value.cityCode;
                this.proposalInput.proposer.corrState = value.state;
                this.proposalInput.proposer.corrStateCode = value.stateCode;
                this.proposalInput.proposer.corrPincode = value.pincode;
                this.corCity.cityName = this.proposalInput.proposer.corrCity;
                this.corCity.cityId = this.proposalInput.proposer.corrCityCode;
                this.corCity.stateName = this.proposalInput.proposer.corrState ;
                this.corCity.stateId =  this.proposalInput.proposer.corrStateCode;
                this.setCityState("C", this.corCity)
                break;
              case "P":
                this.proposalInput.proposer.policyAddressLine1 = value.addressLine1;
                this.proposalInput.proposer.policyAddressLine2 = value.addressLine2 ;
                this.proposalInput.proposer.policyCity = value.city;
                this.proposalInput.proposer.policyCityCode = value.cityCode;
                this.proposalInput.proposer.policyState = value.state;
                this.proposalInput.proposer.policyStateCode = value.stateCode;
                this.proposalInput.proposer.policyPincode = value.pincode;
                this.polCity.cityName = this.proposalInput.proposer.policyCity;
                this.polCity.cityId = this.proposalInput.proposer.policyCityCode;
                this.polCity.stateName = this.proposalInput.proposer.policyState ;
                this.polCity.stateId =  this.proposalInput.proposer.policyStateCode;
                this.setCityState("P", this.polCity)
                break;
              }
            });
            
            this.proposalInput.proposer.contacts.forEach(value => {
              var contactType = value.contactType;
              switch(contactType){
              case "mobile":
                this.proposalInput.proposer.mobile = value.contactText;
                break;
              case "email":
                this.proposalInput.proposer.email = value.contactText;
                break;
              }
            });
            
            this.getMaster(this.proposalInput.productId, "Occupation");
            this.getMaster(this.proposalInput.productId, "Title");
            this.getMaster(this.proposalInput.productId, "MaritalStatus");
            this.getMaster(this.proposalInput.productId, "Relationship");
            this.getMaster(this.proposalInput.productId, "NomineeRel");
            this.getQuestions(this.proposalInput.productId, "PedList");
            
            this.getCityFromPincode('P', this.proposalInput.proposer.policyPincode);
            this.setCityState('P',this.polArea);
            this.getCityFromPincode('C', this.proposalInput.proposer.corrPincode);
            this.setCityState('C',this.corArea);
            this.proposalInput.policy.tcAgree = "N";
          }
        });
      }
 getQuestions(productId, type){
        this.shared.getMedicalQns(productId, type)
        .subscribe(
          data =>{
            if (data.hasOwnProperty("result")){
              if (type == "PedList"){
                this.medicalQuestions = data.result;
                this.initializeMedicalQuestions();
              }
            }
          }
        );
      }
calculateNomineeAge(dob){
  this.proposalInput.proposer.nomineeAge= this.shared.calculateAge(dob);
}
populateCoverData(){
		
  this.covers.forEach(value => {
    if(value.isSelected == "Y")
      {
       var cover = <any>{};
       cover.name = value.displayName;
       this.proposalInput.covers.push(cover);
      }
    
  })
  
  // if Product is comprehensive force a PA cover
  if (this.proposalInput.policy.productId == "129HL01F01"){
    this.proposalInput.covers = [];
    var cover = <any>{};
    cover.name = "PA";
    this.proposalInput.covers.push(cover);
    
  }
  
  
}
makePayment(){
  if(this.proposalInput.policy.tcAgree == "agree"){
		// Populate Medical and LifeStyle data
    this.setpolicyAddress();
    this.populateCoverData();
    this.loading= true;
    this.proposalError.errorPirnt = [];
    var healthProposal =this.proposalInput;
    healthProposal.proposer.nomineeName = healthProposal.proposer.nomineeFirstName + " " + healthProposal.proposer.nomineeLastName;
    healthProposal.proposer.proposerDob = this.datepipe.transform(new Date(healthProposal.proposer.proposerDob),'yyyy-MM-dd');
   // healthProposal.proposer.nomineeDob =this.datepipe.transform(new Date(healthProposal.proposer.nomineeDob),'yyyy-MM-dd');
    this.shared.submitProposal(healthProposal, this.proposalInput.insurerId, this.proposalInput.productId)
    .subscribe(
      data =>{
        console.log("MAKE PAYMENT RESPONSE", data);
        if(data.error){
          var str=data.error;
          this.proposalError.errorPirnt = this.cleanArray(str.split(";"));
          if(data.error =="Premium Mismatch")
          this.newPreMiumMismatch({"premiumPayable":data.premiumPayable,"premiumPassed":data.premiumPassed})
        }else if (data.hasOwnProperty("payUrl"))
        {
          this.proposalError={key:"",errorPirnt:[]}
          console.log(data);
          
          this.paymentInput= {url: null, params: null};
          this.paymentInput.url = data.payUrl;
         
          var formData = <any>{};
          formData.CheckSum = data.CheckSum;
          formData.Email = data.Email;
          formData.Mobile = data.Mobile;
          formData.LastName = data.LastName;
          formData.FirstName = data.FirstName;
          formData.PremiumAmount = data.PremiumAmount;
          formData.PaymentOption = data.PaymentOption;
          formData.ProposalNumber = data.ProposalNumber;
          formData.ResponseURL = data.ResponseURL;
          formData.TransactionID = data.TransactionID;
          formData.UserIdentifier = data.UserIdentifier;
          this.paymentInput.params = formData;
          this.formBuild= true;
        console.log(this.paymentInput);
          setTimeout(function() {
            var myForm = <HTMLFormElement>document.getElementById('payUrlSubmit');
            myForm.submit();
           }, 5000);
        }
      });
  }else{ 
    var str = "Please accept the Terms and Conditions before make payment";
    this.proposalError.errorPirnt = this.cleanArray(str.split(";"));
    }

}
agreeTC(agree){
  if( typeof(agree) != 'undefined')
  {
  this.proposalInput.policy.tcAgree = agree;
  this.proposalError.errorPirnt=[];
  }
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
 getCityFromPincode (type, pincode){
        var re = new RegExp("^[0-9]{6}$");
        if (re.test(pincode)){
          this.shared.getCityFromPin(this.proposalInput.insurerId, pincode)
          .subscribe(
            data =>{
              if (data.hasOwnProperty("result")){
              
                if (type == "P"){
                  this.proposalInput.proposer.policyCity = data.result[0].cityName;
                  this.proposalInput.proposer.policyState = data.result[0].stateName;
                } else
                {
                 this.proposalInput.proposer.corrCity = data.result[0].cityName;
                 this.proposalInput.proposer.corrState = data.result[0].stateName;
                }
             }
            });
        }
      }      
initializeMedicalQuestions(){
		
        for(var i=0; i<this.medicalQuestions.length; i++){
          this.medicalQuestions[i].details = [];
        }
        
        this.proposalInput.insured.forEach(insured => {
          var insuredId = insured.insuredId;
          var insuredName = insured.firstName + " " + insured.lastName;
          insured.ped = "";
          insured.pedList.forEach(item => {
            var code = item.pedCode;
            for(var i=0; i<this.medicalQuestions.length; i++){
              if (this.medicalQuestions[i].code == code){
                this.medicalQuestions[i].exists = item.exists;
                item.pedText.forEach(illness => {
                  var detail = illness;
                  detail.insuredId = insuredId;
                  detail.insuredName = insuredName;
                  detail.questionId = code;
                  this.medicalQuestions[i].details.push(detail);
                })
              }
            }
          })
        });
      }         
 setCityState (type, city){
		
        var areas = []
        if (typeof(city) != 'undefined') {
           if (type == "P"){
             this.proposalInput.proposer.policyCity = city.cityName;
             this.proposalInput.proposer.policyCityCode = city.cityId;
             this.proposalInput.proposer.policyState = city.stateName;
             this.proposalInput.proposer.policyStateCode = city.stateId;
             
           } else
           {
             this.proposalInput.proposer.corrCity = city.cityName;
             this.proposalInput.proposer.corrCityCode = city.cityId;
             this.proposalInput.proposer.corrState = city.stateName;
             this.proposalInput.proposer.corrStateCode = city.stateId;
           }
        }
      }	
   getMaster(productId, masterId){
		this.insurerMaster[masterId] = [];
    this.shared.getMastersforProd(productId, masterId)
    .subscribe(
      data =>{
			this.insurerMaster[masterId]= data.result;
			if (masterId == "Relationship" || masterId == "NomineeRel" || masterId == "AppointeeRel"){
				this.addGendertoRel(masterId);
			}
		});
  }
  editFields(index, section)
  {
   $('#panel'+index).addClass('in active');
   $('#panel'+section).removeClass('in active');
   $('li:nth-child('+index+')').addClass('active');
   $('li:nth-child('+section+')').removeClass('active');
  }
  addGendertoRel (masterId){
		var records = [];
		this.insurerMaster[masterId].forEach(val => {
			var record = val;
			record.gender = this.getRelGender(val.value);
			records.push(record);
		});
		this.insurerMaster[masterId] = records;
	}
  getRelGender(rel){
    var gender = "MF";
    if(rel=='Wife'  || rel=='Aunt'  || rel=='Daughter'  || rel=='Daughter in law'  || rel=='Grand Daughter'  || rel=='Grand Mother'  || rel=='Mother in law'  || rel=='Mother'   || rel=='Niece'  || rel=='Sister in law'  || rel=='Sister'){
      gender = "F";
        
    } else if (rel=='Brother in law'  || rel=='Brother'  || rel=='Father in law'  || rel=='Father'  || rel=='Grand Father'  || rel=='Grand Son'  || rel=='Husband'  || rel=='Nephew'   || rel=='Son in law'  || rel=='Son'  || rel=='Uncle'){
      gender = "M";
    }
    return gender;
  }   
  nextSection(section)
      {
        
        switch (section){
        case "1":
          this.proposalError={key:"",errorPirnt:[]}
          this.active=1;
          this.tabStatus.firstComplete = 'done';
          $('#SecondTab').removeClass('tabdisable');
          break;
        case "2":
          this.calulateBmi();
          this.setRelationship();
          this.proposalError={key:"",errorPirnt:[]}
          this.active =2;
          this.tabStatus.secondComplete = 'done';
          $('#thirdTab').removeClass('tabdisable');
          break;
        case "3":
          this.proposalError={key:"",errorPirnt:[]}
          this.active =3;
          this.tabStatus.thirdComplete='done';
          $('#forthTab').removeClass('tabdisable');			
          break;
        case "4":
          this.proposalError={key:"",errorPirnt:[]}
          this.active =4;
          this.tabStatus.fourthComplete='done';
          $('#fifthTab').removeClass('tabdisable');
          break;
        case "5":
          this.proposalError={key:"",errorPirnt:[]}
          this.active =5;
          this.tabStatus.fifthComplete = 'done';
          $('#sixthTab').removeClass('tabdisable');
          break;
        }
       this.ProcessMedicalQuestions();
       this.setpolicyAddress();
       this.applicationData.proposalData = this.proposalInput;
       console.log("saved data",JSON.stringify(this.proposalInput));
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
   getPolicyEndDate(policyDate){
        if ((typeof policyDate != "undefined")&& (policyDate != "")) {
         	
          var date=new Date(policyDate);
        this.proposalInput.policy.policyEnddate=this.datepipe.transform(new Date(date.getFullYear()+ Number(this.proposalInput.policy.tenure),date.getMonth(),date.getDate()-1),'yyyy-MM-dd');
        }
      }    
  calulateBmi()
      {
        this.proposalInput.insured.forEach(element => {
          
          if(element.type=='A')
            {
            var heighttm= Number(element.height)*0.01;
            var bmi= element.weight/(heighttm*heighttm);
            element.bmi= Math.round(bmi);
            }
          
        });
      }
setRelationship() {
		
        this.proposalInput.insured.forEach(val => {
          if (val.relationshipId == "SELF"){
            
            this.proposalInput.proposer.title= val.title;
            this.proposalInput.proposer.firstName = val.firstName;
            this.proposalInput.proposer.middleName = val.middleName;
            this.proposalInput.proposer.lastName= val.lastName;
            this.proposalInput.proposer.gender = val.gender;
            this.proposalInput.proposer.proposerDob = new Date(val.dob);
            this.proposalInput.proposer.occupationType=val.occupationType;
            this.proposalInput.proposer.maritalStatus=val.maritalStatus;
            this.proposalInput.proposer.isPrimaryInsured = "Y";
            this.proposalInput.proposer.IsProposerInsured = "Y";
            this.isProposerInsured = true;
            console.log(this.proposalInput.proposer);
          }
        });
    }  
    ProcessMedicalQuestions(){
		
      // initialize the medical detail Array
      
      this.proposalInput.insured.forEach(insured => {
      insured.pedList.forEach(item => {
          item.pedText = [];
          item.exists = "N";
        })
      });
      
      // Populate details into each insurer.
      this.medicalQuestions.forEach(question => {
        if (question.exists == "Y"){
          question.details.forEach(medDetail => {
             var questionId = medDetail.questionId;
             var insuredId = medDetail.insuredId;
             // Check the insured and the question to which the detail belongs
             this.proposalInput.insured.forEach(insured => {
               if (insured.insuredId == insuredId) {
                 // check for question
                insured.pedList.forEach(item => {
                   if (item.pedCode == questionId){
                     item.exists = "Y";
                     var pedDetails = <any>{}
                         pedDetails.monthOfDiagnosis = medDetail.monthOfDiagnosis;
                     pedDetails.yearOfDiagnosis = medDetail.yearOfDiagnosis;
                     pedDetails.nameOfIllness = medDetail.nameOfIllness;
                     pedDetails.medicationDetail = medDetail.medicationDetail;
                     pedDetails.treatmentOutCome = medDetail.treatmentOutCome;
                     pedDetails.nameOfIllness = medDetail.nameOfIllness;
                     item.pedText.push(pedDetails);
                   }
                 })
               }
             })			
          })
          console.log(this.proposalInput.insured)
        }
      })
      
    } 
    setpolicyAddress(){
 		
      var addresses = [];
      var address = <any> {}
      address.addressType = "C";
       address.addressLine1 = this.proposalInput.proposer.corrAddressLine1;
      address.addressLine2 = this.proposalInput.proposer.corrAddressLine2;
      address.addressLine3 = this.proposalInput.proposer.corrArea;
      address.city = this.proposalInput.proposer.corrCity;
      address.citycode = this.proposalInput.proposer.corrCityCode;
      address.state = this.proposalInput.proposer.corrState;
      address.statecode = this.proposalInput.proposer.corrStateCode;
      address.pincode = this.proposalInput.proposer.corrPincode;
      addresses.push(address);
      this.proposalInput.proposer.address = addresses;
      
      var contacts = []
      var contact = <any> {};
      contact.contactType = "mobile";
      contact.contactText = this.proposalInput.proposer.mobile;
      contacts.push(contact);
      contact = {};
      contact.contactType = "email";
      contact.contactText = this.proposalInput.proposer.email;
      contacts.push(contact);
      this.proposalInput.proposer.contacts = contacts;
      
     } 
     checkRelationShip()
     {
    	
      this.proposalInput.proposer.title= "";
      this.proposalInput.proposer.firstName = "";
      this.proposalInput.proposer.middleName = "";
      this.proposalInput.proposer.lastName= "";
      this.proposalInput.proposer.gender = "";
      this.proposalInput.proposer.proposerDob =  "";
      this.proposalInput.proposer.occupationType= "";
      this.proposalInput.proposer.maritalStatus= "";
      this.proposalInput.proposer.designation = "";
      this.proposalInput.proposer.business = "";
      this.isProposerInsured = false;
      this.proposalInput.proposer.isPrimaryInsured = "N";
      this.proposalInput.proposer.IsProposerInsured = "N";
        var selfCount = 0;
      this.proposalInput.insured.forEach(val => {
          if (val.relationshipId == "SELF"){
            
            this.proposalInput.proposer.title= val.title;
            this.proposalInput.proposer.firstName = val.firstName;
            this.proposalInput.proposer.middleName = val.middleName;
            this.proposalInput.proposer.lastName= val.lastName;
            this.proposalInput.proposer.gender = val.gender;
            this.proposalInput.proposer.proposerDob = this.datepipe.transform(val.dob, 'yyyy-MM-dd');
            this.proposalInput.proposer.occupationType=val.occupationType;
            this.proposalInput.proposer.maritalStatus=val.maritalStatus;
            this.proposalInput.proposer.isPrimaryInsured = "Y";
            this.proposalInput.proposer.IsProposerInsured = "Y";
            if (val.type == "C"){ // Proposer cannot be a child.
              this.pageErrors.insuredError= true;
              this.pageErrors.insuredErrorText = "Child cannot be a proposer";
            }
            selfCount++;
            this.isProposerInsured = true;
            console.log(this.proposalInput.proposer);
          }
        });
        if (selfCount>1) {
        this.pageErrors.insuredError= true;
        this.pageErrors.insuredErrorText = "Multiple Self Relations not allowed";
        }
        if (selfCount==0) {
          this.pageErrors.insuredError= true;
        this.pageErrors.insuredErrorText = "Proposer Must be insured";
        }
        
       }
     backSection(section){
     $('#panel'+section).removeClass('in active');
      var nextSec = Number(section) - 1;
      $('#panel'+nextSec).addClass('in active');
      $('li:nth-child('+section+')').removeClass('active');
      $('li:nth-child('+nextSec+')').addClass('active');
   }

   AddMedicalRow(code) {
		
		var detail = <any>{};
		detail.insuredId = "";
		detail.conditionSince = "";
		for (var i = 0; i<this.medicalQuestions.length;i++){
			if (this.medicalQuestions[i].code == code){
				this.medicalQuestions[i].details.push(detail);
				break;
			}
		}
		
	}
	
	DeleteMedicalRow (code, j){
		
		for (var i = 0; i<this.medicalQuestions.length;i++){
			if (this.medicalQuestions[i].code == code){
				this.medicalQuestions[i].details.splice(j);
				break;
			}
		}
  }  
  samePolicyCorrAddress( flag)
	{
		if (flag == "Y"){
			this.proposalInput.proposer.corrAddressLine1=this.proposalInput.proposer.policyAddressLine1;
			this.proposalInput.proposer.corrAddressLine2=this.proposalInput.proposer.policyAddressLine2;
			this.proposalInput.proposer.corrAddressLine3=this.proposalInput.proposer.policyArea;
			this.proposalInput.proposer.corrLandmark=this.proposalInput.proposer.policyLandmark;
			this.proposalInput.proposer.corrStateCode=this.proposalInput.proposer.policyStateCode;
			this.proposalInput.proposer.corrState =this.proposalInput.proposer.policyState;
			this.proposalInput.proposer.corrCityCode =this.proposalInput.proposer.policyCityCode;
			this.proposalInput.proposer.corrCity =this.proposalInput.proposer.policyCity;
			this.proposalInput.proposer.corrPincode =this.proposalInput.proposer.policyPincode;
		} else
		{
			this.proposalInput.proposer.corrAddressLine1= "";
			this.proposalInput.proposer.corrAddressLine2= "";
			this.proposalInput.proposer.corrAddressLine3= "";
			this.proposalInput.proposer.corrLandmark= "";
			this.proposalInput.proposer.corrStatecode= "";
			this.proposalInput.proposer.corrState = "";
			this.proposalInput.proposer.corrCitycode = "";
			this.proposalInput.proposer.corrCity = "";
			this.proposalInput.proposer.corrPincode = "";
		}
		
		 
	}
	
  CopyPolicyAddress(){

		this.proposalInput.proposer.corrAddressLine1=this.proposalInput.proposer.policyAddressLine1;
		this.proposalInput.proposer.corrAddressLine2=this.proposalInput.proposer.policyAddressLine2;
		this.proposalInput.proposer.corrAddressLine3=this.proposalInput.proposer.policyArea;
		this.proposalInput.proposer.corrLandmark=this.proposalInput.proposer.policyLandmark;
		this.proposalInput.proposer.corrStateCode=this.proposalInput.proposer.policyStateCode;
		this.proposalInput.proposer.corrState =this.proposalInput.proposer.policyState;
		this.proposalInput.proposer.corrCityCode =this.proposalInput.proposer.policyCityCode;
		this.proposalInput.proposer.corrCity =this.proposalInput.proposer.policyCity;
		this.proposalInput.proposer.corrAreaCode =this.proposalInput.proposer.policyAreaCode;
		this.proposalInput.proposer.corrArea =this.proposalInput.proposer.policyArea;
		this.proposalInput.proposer.corrPincode =this.proposalInput.proposer.policyPincode;
	}                
}
