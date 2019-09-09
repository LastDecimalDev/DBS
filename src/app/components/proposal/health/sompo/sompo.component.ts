import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-sompo',
  templateUrl: './sompo.component.html',
  styleUrls: ['./sompo.component.css']
})
export class HealthsompoComponent implements OnInit {
  public imagePath = IMAGE_URL;
  public proposalInput = <any>{};
  public loading:boolean = true;
  public insurerMaster = <any> [];
  public requestData = <any>{};
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
public covers = [];
public proposalError = <any>{};
public active=0;
public isProposerInsured:boolean = false;
public medicalQuestions = [];
public insureds = [];
public polCities = [];
public corCities = [];  
public polCity = <any> {};
public corCity =<any> {}
public nomCity= <any>{};
public items = <any>[];
public polState=<any>{};
public parentIncluded: boolean = false;
public nomCities =<any> {};
  constructor(private shared: SharedService, private datepipe:DatePipe) { }

  ngOnInit() {
    this.getthePage();
    $('#availDisc label').click(function(){
      $('.selected').removeClass('selected');
      $(this).addClass('selected');
    });
    
  }
  getNomineeAge(dob){
    this.proposalInput.proposer.nomineeAge = this.shared.calculateAge(dob);
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
          this.covers = [];
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
				value.corrAddressLine3 = this.proposalInput.proposer.corrArea = value.addressLine3;
				this.proposalInput.proposer.corrCity = value.city;
				this.proposalInput.proposer.corrCitycode = value.citycode;
				this.proposalInput.proposer.corrState = value.state;
				this.proposalInput.proposer.corrStatecode = value.statecode;
				this.proposalInput.proposer.corrPincode = value.pincode;
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
		
		//formatDates ();
		this.getMaster(this.proposalInput.productId, "Title");
		this.getMaster(this.proposalInput.productId, "Occupation");
		this.getMaster(this.proposalInput.productId, "NomineeRel");
		this.getMaster(this.proposalInput.productId, "State");
		this.getMaster(this.proposalInput.productId, "Relationship"); // Keep the misspelling
		this.getQuestions(this.proposalInput.productId, "PedList");		

		this.polState.id = this.proposalInput.proposer.corrStateCode;
		this.polState.value = this.proposalInput.proposer.corrState;
		//this.getCity(this.polState,'policy');
		this.polCity.id = this.proposalInput.proposer.corrCityCode;
		this.polCity.value = this.proposalInput.proposer.corrCity;
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
initializeMedicalQuestions(){
		
  for(var i=0; i<this.medicalQuestions.length; i++){
    this.medicalQuestions[i].details = [];
    this.medicalQuestions[i].exists = "";
  }
  this.insureds = [];
  this.proposalInput.insured.forEach(insured => {
    
    var insuredId = insured.insuredId;
    var insuredName = insured.firstName + " " + insured.lastName;
    
    insured.pedList.forEach(item => {
      var code = item.pedCode;
      for(var i=0; i<this.medicalQuestions.length; i++){
        if (this.medicalQuestions[i].code == code){
          if (this.medicalQuestions[i].exists == ""){
            this.medicalQuestions[i].exists = item.exists;
          }
          if (item.exists == 'Y'){
            this.medicalQuestions[i].exists = "Y";
          item.pedData.forEach(illness => {
              var detail = <any> {};
              detail.insuredId = insuredId.toString();
              detail.insuredName = insuredName;
              detail.code = code;
              detail.conditionSince = new Date(illness.conditionSince + "-01")
              this.medicalQuestions[i].details.push(detail);
            });
            
          }
        }
      }
      
    })
  })
  console.log(this.medicalQuestions);
} 
getMaster(productId, masterId){
  this.insurerMaster[masterId] = [];
  this.shared.getMastersforProd(productId, masterId)
  .subscribe(
    data =>{
      this.insurerMaster[masterId] = data.result;
      if(masterId == "Relationship"){
        this.addGendertoRel();
      }
    }
  );
}
addGendertoRel(){
  var records = [];
  this.insurerMaster.Relationship.forEach(element => {
    var record = element;
    record.gender = this.getRelGender(element.elementue);
    records.push(record);
  });
  this.insurerMaster.Relationship = records;
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
public calulateBmi()
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
    setRelationship(){

      this.proposalInput.insured.forEach(element => {
        
        if (element.relationshipId == "SELF"){
          
          this.proposalInput.proposer.title= element.title;
          this.proposalInput.proposer.firstName = element.firstName;
          this.proposalInput.proposer.middleName = element.middleName;
          this.proposalInput.proposer.lastName= element.lastName;
          this.proposalInput.proposer.gender = element.gender;
          this.proposalInput.proposer.proposerDob = new Date(element.dob);
          this.proposalInput.proposer.occupationType=element.occupationType;
          this.proposalInput.proposer.maritalStatus=element.maritalStatus;
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
      item.pedData = []; // Use an array even if there is only one item
      item.exists = "N";
    })
  });
  
  // Populate details into each insurer.
  this.medicalQuestions.forEach(question => {
    if (question.exists == "Y"){
      question.details.forEach(medDetail => {
         var code = question.code;
         var insuredId = medDetail.insuredId;
         // Check the insured and the question to which the detail belongs
         this.proposalInput.insured.forEach(insured => {
           if (insured.insuredId == insuredId) {
             // check for question
             insured.pedList.forEach(item => {
               if (item.pedCode == code){
                 item.exists = "Y";
                 var pedDetails = <any>{};
                     pedDetails.conditionSince =  this.datepipe.transform(new Date(medDetail.conditionSince),'yyyy-MM');
                     item.pedData.push(pedDetails);								 
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
  address.citycode = this.proposalInput.proposer.corrCitycode;
  address.state = this.proposalInput.proposer.corrState;
  address.statecode = this.proposalInput.proposer.corrStatecode;
  address.pincode = this.proposalInput.proposer.corrPincode;
  addresses.push(address);
  this.proposalInput.proposer.address = addresses;
  
  var contacts = []
  var contact = <any> {};
  contact.contactType = "mobile";
  contact.contactText = this.proposalInput.proposer.mobile;
  contacts.push(contact);
  var contact = <any>{};
  contact.contactType = "email";
  contact.contactText = this.proposalInput.proposer.email;
  contacts.push(contact);
  this.proposalInput.proposer.contacts = contacts;
  
 }
 backSection(section){
  $('#panel'+section).removeClass('in active');
   var nextSec = Number(section) - 1;
   $('#panel'+nextSec).addClass('in active');
   $('li:nth-child('+section+')').removeClass('active');
   $('li:nth-child('+nextSec+')').addClass('active');
}
checkRelationShip(){
  this.pageErrors.insuredError= false;
  this.pageErrors.insuredErrorText = "";
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
    var adultRels = [];
  this.proposalInput.insured.forEach(val => {
    var rel = val.relationshipId;
    
    if (val.type == "A"){
      if (rel == "GDAU" || rel == "GSON" || rel == "NEPH" || rel == "NIEC"|| rel == "SONM"|| rel == "UDTR" || rel == "NBON"){
        this.pageErrors.insuredError= true;
           this.pageErrors.insuredErrorText = "Invalid Adult RelationShip";
      }
      
      if (this.proposalInput.policy.numAdults == 2){
        if (val.maritalStatus == "SINGLE"){
          this.pageErrors.insuredError= true;
          this.pageErrors.insuredErrorText = "Adults Must be Married";
        }
      }
      
      adultRels.push(rel);
    } else
      
    {
      if (rel != "GDAU" && rel != "GSON" && rel != "NEPH" && rel != "NIEC" && rel != "SON" && rel != "UDTR" && rel != "NBON"){
        this.pageErrors.insuredError= true;
           this.pageErrors.insuredErrorText = "Child can only be Daughter, Grand Daughter, Grand Son & Son";
      }
      if (val.maritalStatus != "SINGLE"){
        this.pageErrors.insuredErrorText = "Children must be Unmarried";
      }
    }
    
       switch (rel) {
       case "SELF":
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
        if (val.type == "C"){ // Proposer cannot be a child.
          this.pageErrors.insuredError= true;
          this.pageErrors.insuredErrorText = "Child cannot be a proposer";
        }
        selfCount++;
        this.isProposerInsured = true;
        console.log(this.proposalInput.proposer);
         break;
       case "FATH":
       case "MOTH":
         this.parentIncluded = true;	   			
         break;
       }	   
    });
    if (selfCount>1) {
    this.pageErrors.insuredError= true;
    this.pageErrors.insuredErrorText = "Multiple Self Relations not allowed";
    }
    
     /* Self not needed for Cigna
     if (this.proposalInput.policy.numChildren > 0){
       if (selfCount==0) {
         this.pageErrors.insuredError= true;
      this.pageErrors.insuredErrorText = "One Adult must be Self";
       }
       
     }*/
     
   //	adultRels = $filter('orderBy')(adultRels);
     if (!this.pageErrors.insuredError && this.proposalInput.policy.numAdults == 2){
       
       
       this.pageErrors.insuredError= true;
    this.pageErrors.insuredErrorText = "Adults Must be Husband/Wife";
    
    
    if (adultRels[0] == "SELF" && (adultRels[1] == "WIFE")) {
      this.pageErrors.insuredError= false;
      this.pageErrors.insuredErrorText = "";
    }
    
    if (adultRels[1] == "SELF" && (adultRels[0] == "WIFE")) {
      this.pageErrors.insuredError= false;
      this.pageErrors.insuredErrorText = "";
    }
 
    if (adultRels[0] == "FATH"  && adultRels[1] == "MOTH" )
      {
        this.pageErrors.insuredError= false;
        this.pageErrors.insuredErrorText = "";
      }
 
    if (adultRels[0] == "FLAW"  && adultRels[1] == "MLAW" )
      {
        this.pageErrors.insuredError= false;
        this.pageErrors.insuredErrorText = "";
      }
 
    if (adultRels[0] == "MDTR"  && adultRels[1] == "SIST" )
      {
        this.pageErrors.insuredError= false;
        this.pageErrors.insuredErrorText = "";
      }
 
    if (adultRels[0] == "BOTH"  && adultRels[1] == "MMBR" )
      {
        this.pageErrors.insuredError= false;
        this.pageErrors.insuredErrorText = "";
      }
 
    if (adultRels[0] == "MANT"  && adultRels[1] == "MUNC" )
      {
        this.pageErrors.insuredError= false;
        this.pageErrors.insuredErrorText = "";
      }
    
    if (adultRels[1] == "FATH"  && adultRels[0] == "MOTH" )
    {
      this.pageErrors.insuredError= false;
      this.pageErrors.insuredErrorText = "";
    }
 
  if (adultRels[1] == "FLAW"  && adultRels[0] == "MLAW" )
    {
      this.pageErrors.insuredError= false;
      this.pageErrors.insuredErrorText = "";
    }
     }	    	
    
   }
   checkMedicalStatus (){
		
		this.pageErrors.medicalError = false;
		this.pageErrors.medicalErrorText = "";
		
		for (var i =0; i<this.medicalQuestions.length; i++){
			if (this.medicalQuestions[i].exists == "Y"){
				this.pageErrors.medicalError = true;
				this.pageErrors.medicalErrorText = "Cannot buy this policy online";
				break;
			}
			
		};
		
  }

  getCity(state,name){
    this.shared.getCityForState(this.proposalInput.insurerId, state.id, 'healthSompo')
    .subscribe(data =>{
      this.insurerMaster.CityList=data.result;
					if(name == 'Policy')
					{
           this.proposalInput.proposer.policyStatecode=state.id;
				 	 this.proposalInput.proposer.policyState=state.value;
					} else{
          this.proposalInput.proposer.corrStatecode=state.id;
				 	 this.proposalInput.proposer.corrState=state.value;
          }
			});
    }
    selectCity(city, name){
      if(name=='Policy'){
        this.proposalInput.proposer.policyCitycode=city.id;
        this.proposalInput.proposer.policyCity=city.value;
      }else{
        this.proposalInput.proposer.corrCitycode=city.id;
        this.proposalInput.proposer.corrCity=city.value;
      }

   }
  editFields(index, section)
      {
       $('#panel'+index).addClass('in active');
       $('#panel'+section).removeClass('in active');
       $('li:nth-child('+index+')').addClass('active');
       $('li:nth-child('+section+')').removeClass('active');
      }  
 agreeTC(agree){
  if( typeof(agree) != 'undefined')
  {
  this.proposalInput.policy.tcAgree = agree;
  this.proposalError.errorPirnt=[];
  }
 }
 makePayment(){
  if(this.proposalInput.policy.tcAgree == "agree"){
  if (this.proposalInput.policy.floater == 'N'){
    this.proposalInput.policy.floaterSi = this.proposalInput.policy.sumInsured;
  }
  this.setpolicyAddress();
  this.loading= true;
  this.proposalError.errorPirnt = [];
  var healthProposal =this.proposalInput;
  healthProposal.proposer.proposerDob = this.datepipe.transform(new Date(healthProposal.proposer.proposerDob),'yyyy-MM-dd');
  healthProposal.proposer.nomineeDob =this.datepipe.transform(new Date(healthProposal.proposer.nomineeDob),'yyyy-MM-dd');
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
        var url = data.payUrl;
        window.location.href =url;
        
      } else
      {
        this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPirnt:[]}
        str="Unexpected Error while submitting proposal";
        this.proposalError.errorPirnt=this.cleanArray(str.split(";"))
        console.log(this.proposalError)
      }
    
      this.loading = false;
     } );
  }else{ 
  var str = "Please accept the Terms and Conditions before make payment";
  this.proposalError.errorPirnt = this.cleanArray(str.split(";"));
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
}
