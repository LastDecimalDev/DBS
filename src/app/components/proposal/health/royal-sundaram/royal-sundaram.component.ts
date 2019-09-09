import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
import { Router } from '@angular/router';
import { THIS_EXPR } from '../../../../../../node_modules/@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';

declare var jquery:any;
declare var $;
@Component({
  selector: 'app-royal-sundaram',
  templateUrl: './royal-sundaram.component.html',
  styleUrls: ['./royal-sundaram.component.css']
})
export class HealthroyalSundaramComponent implements OnInit {
  public imagePath = IMAGE_URL;
  public inputAddress = <any>{};
  public qnsInsuredId = <any>{};
  public lifestylemandate=<any>{};
  public proposalInput = <any>{};
  public qIndex = 0;
  public applicationData= <any>{};
  public loading:boolean = true;
  public isProposerInsured:boolean = false;
  public heightFlagerror=[];
  public weightFlagerror=[];
  public heighterror=[];
  public weighterror=[];
  public medicalQuestions = [];
  public insurerMaster = <any> [];
  public nomCities = [];
  public polCities = [];
  public items = <any>[];
  public polState= <any>{};
	public polCity=<any>{};
	public nomState=<any>{};
	public nomCity=<any>{};
  public active=0;
  public medicalerror = <any>{};
  public opened= <any>{
    proposerDob : false,
    nomineeDob : false,
    appointeeDob : false,
    policyStartDate : false
};
  public proposalError = <any>{};
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
  seventhComplete:"indone"
}
public lifeStyleQuestions=[
    {"id" : "alcohol", "q": "Do You consume alcohol?","exists":"N","details":[]},
    {"id" : "smoking", "q": "Do you consume tobacco?","exists":"N","details":[]},
    {"id" : "narcotics", "q": "Do you consume or have you ever consumed any narcotic substance?","exists":"N","details":[]},
    {"id" : "anyOtherSubstance", "q": "Do you consume or have you ever consumed any other substance?","exists":"N","details":[]}
  ]
public ocupationError ="";
public requestData = <any>{};
public showRelation: boolean = false;
 
   public question = <any> {}; 
   public adultDobOptions = <any> {};
   public nomineeDobOptions = <any> {};
   public policyStartDateOptions = <any> {};
   public medicalTabledispaly:boolean = false;
  public insuredname: any;
  public lifeDetSubmit1:boolean = false;
  public errMessage: string = null;
  public errorCall:boolean = false;
  public age:any;
  public errorMessageforagemonth=null;
  public errorMessageforage =null;
  public month:any;
  public errorMessageformin = null;
  public errorCall5:boolean = false;
  public showAnnualupto: boolean = false;
  public annualSixty: boolean = false;
  public tcAgree: boolean = false;
  public state = null;
  public nomineeState = null; 
  public otpInput = <any> {};
  public otpError: boolean = false;
  public failedStatus: boolean = false;
  public successStatus: boolean = false;
  public otpRetires: number = 0;
  public ressuccessStatus:boolean=false;

  constructor(private shared: SharedService, private datepipe: DatePipe,private router: Router) { }

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
  open(name){
    this.opened[name] = true;

  }
  calculateAge(Dob){
    var calAge = this.shared.calculateAge(Dob);
    this.proposalInput.proposer.nomineeAge = calAge.toString();
  }
  /*calculateAgeofAppointee(dob){
    this.proposalInput.proposer.appointeeAge = this.shared.calculateAge(dob);
  }*/
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
            this.proposalInput= this.applicationData.proposalData;
            console.log('proposal input',this.proposalInput);
            this.loading = false;
            this.getMaster(this.requestData.productId, "Occupation");
            this.getMaster(this.requestData.productId, "State");
            this.getMaster(this.requestData.productId, "city");

            this.getMaster(this.requestData.productId, "AppointeeRel");
            this.getMaster(this.requestData.productId, "Relationship");
            this.getMaster(this.requestData.productId, "Qualification");
            this.getMaster(this.requestData.productId, "Nationality");
            this.getQuestions(this.requestData.productId, "PedList");
            this.polState.id = this.proposalInput.proposer.address[0].stateCode;
            this.polState.value = this.proposalInput.proposer.address[0].state;
            this.getCity(this.polState.id,'policy');
            this.nomState.id = this.proposalInput.proposer.nomineeStateCode;
            this.nomState.value = this.proposalInput.proposer.nomineeState;
            this.getCity(this.nomState.id,'nomadd');
            this.polCity.id = this.proposalInput.proposer.address[0].cityCode;
            this.polCity.value = this.proposalInput.proposer.address[0].city;
            this.nomCity.id = this.proposalInput.proposer.nomineeCityCode;
            this.nomCity.value = this.proposalInput.proposer.nomineeCity;
            this.proposalInput.policy.tcAgree = "N";
            this.state = this.proposalInput.proposer.address[0].stateCode;
            this.nomineeState = this.proposalInput.proposer.nomineeStateCode
          }
        }
    );
    //this.proposalInput.policy.serviceTax = Number(this.proposalInput.policy.CGST) + Number(this.proposalInput.policy.SGST);		


  }
  backSection(section){
       $('#panel'+section).removeClass('in active');
        var nextSec = Number(section) - 1;
        $('#panel'+nextSec).addClass('in active');
        $('li:nth-child('+section+')').removeClass('active');
        $('li:nth-child('+nextSec+')').addClass('active');
  }
  getMasterValue(masterName, masterId){
			
    var masterValue = "";
    var values = this.insurerMaster[masterName];
    
    if (typeof(values) != "undefined"){
      for (var i = 0; i<values.length; i++){
        
        if (values[i].id == masterId){
          masterValue = values[i].value;
          //console.log(masterValue)
          break;
        }
      }
      
    }

    return masterValue; 
  }

  addmedicalDetails(pedname,i,medicalDetails:NgForm){
    medicalDetails.form.reset();
    this.qIndex = 0;
			for (var k=0; k<this.proposalInput.insured[0].pedList.length; k++){
				var item = this.proposalInput.insured[0].pedList[k].pedName;
				if (item == pedname){
					this.qIndex = k;
        }
        console.log('addmedicaldetails',this.proposalInput.insured[0].pedList);

      }    
    $("#medicalQnsDetails").modal('show');
    
  }
  lifeStyleDetails(questionId,action,i,LifeStyleform:NgForm){
    LifeStyleform.form.reset();
    this.qIndex = 0;
    this.inputAddress.action = action;
    this.inputAddress.questionId = questionId;
    if(this.inputAddress.action=='Add')
    for (var k=0; k<this.lifeStyleQuestions.length; k++){
      var item = this.lifeStyleQuestions[k];
      if (item.id == questionId){
        this.qIndex = k;
      }
  }
  console.log('lifestyle',this.lifeStyleQuestions)
    $("#lifeStyleModal").modal('show');
  }
  nextSection(section)
	{
    //this.loading =true;
	switch (section){
		case "1":
			this.proposalError={key:"",errorPirnt:[]}
      this.tabStatus.firstComplete = 'done';
      $('#SecondTab').removeClass('tabdisable');
      
			break;
    case "2":
      this.calulateBmi();
      this.setRelationship();
      console.log('setre',this.setRelationship());
			this.proposalError={key:"",errorPirnt:[]}
			this.active =2;
      this.tabStatus.secondComplete = 'done';
      $('#thirdTab').removeClass('tabdisable');
			break;
		case "3":
			this.proposalError={key:"",errorPirnt:[]}
      this.tabStatus.thirdComplete='done';
      $('#forthTab').removeClass('tabdisable');			
			break;
		case "4":
			this.proposalError={key:"",errorPirnt:[]}
      this.tabStatus.fourthComplete = 'done';
      $('#fifthTab').removeClass('tabdisable');
			break;
		case "5":
			this.proposalError={key:"",errorPirnt:[]}
      this.tabStatus.fifthComplete = 'done';
      $('#sixthTab').removeClass('tabdisable');
			break;
		case "6":
			this.proposalError={key:"",errorPirnt:[]}
		//	this.proposalInput.policy.policyStartdate=new Date(this.proposalInput.policy.policyStartdate);
      this.tabStatus.sixthComplete='done';
      $('#seventhTab').removeClass('tabdisable');
      
			break;
		case "7":
			this.proposalError={key:"",errorPirnt:[]}
			console.log(this.proposalInput);
      this.tabStatus.seventhComplete='done';
      $('#eighthTab').removeClass('tabdisable');
      
      break;
    }
    //this.ProcessLSList();
    this.applicationData.proposalData = this.proposalInput;
    console.log('dataaa',JSON.stringify(this.applicationData));
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
  getMaster(productId, masterId){
    this.insurerMaster[masterId] = [];
    this.shared.getMastersforProd(productId, masterId)
    .subscribe(
      data =>{
        this.insurerMaster[masterId] = data.result;
        console.log('getmaster', this.insurerMaster[masterId]);
        if(masterId == "Relationship"){
          this.addGendertoRel();
        }
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
  
   setRelationship() {
		
    this.proposalInput.insured.forEach(element => {
      
      if (element.relationshipId == "Self"){
        var dob1= new Date(element.dob);
        this.proposalInput.proposer.title= element.title;
        this.proposalInput.proposer.firstName = element.firstName;
        this.proposalInput.proposer.middleName = element.middleName;
        this.proposalInput.proposer.lastName= element.lastName;
        this.proposalInput.proposer.gender = element.gender;
        this.proposalInput.proposer.proposerDob = this.datepipe.transform(dob1,'yyyy-MM-dd');
        console.log('proposal dob:',this.proposalInput.proposer.proposerDob);
        this.proposalInput.proposer.occupationType=element.occupationType;
        this.proposalInput.proposer.maritalStatus=element.maritalStatus;
        this.proposalInput.proposer.isPrimaryInsured = "Y";
        this.proposalInput.proposer.IsProposerInsured = "Y";
        if(element.occupationType=='SALARIED'||element.occupationType=='OTHERS')
        {
          this.proposalInput.proposer.designation =element.designation;
        
        }
        else if(element.occupationType=='SELF EMPLOYED')
        {
      
          this.proposalInput.proposer.business =element.business;
        }
        this.isProposerInsured = true;
        console.log(this.proposalInput.proposer);
      }
    });
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
  
  getQuestions(productId, type){
      this.shared.getMedicalQns(productId, type)
      .subscribe(
        data =>{
          if (data.hasOwnProperty("result")){
            if (type == "PedList"){
              this.medicalQuestions = data.result;
              this.initializeMedicalQuestions();
              this.initializeLSQuestions();
            }
          }
        }
      );
  }
 initializeLSQuestions()
  {
    for(var i=0; i<this.lifeStyleQuestions.length; i++){
			this.lifeStyleQuestions[i].details =[];
		}
		
    this.proposalInput.insured.forEach(insured => {
			var insuredId = insured.insuredId;
			var insuredName = insured.firstName + " " + insured.lastName;
			insured.lifestyleInfo.forEach(item=>{
				var id = item.name;
				for(var i=0; i<this.lifeStyleQuestions.length; i++){
					
					if (this.lifeStyleQuestions[i].id == id){
						if (item.exists == "Y"){
							this.lifeStyleQuestions[i].exists = item.exists;
							item.lsData.forEach(ls=>{
								var detail = ls;
								detail.insuredId = insuredId;
								detail.insuredName = insuredName;
								detail.questionId = id;
								this.lifeStyleQuestions[i].details.push(detail);
							});
						}else{
              item.lsData = [];
            }
					}
				}
				
			});
		});
		 
  }
 ProcessLSList(){
		
		// initialize the medical detail Array
		
		this.proposalInput.insured.forEach(insured=>{
			insured.lifestyleInfo.forEach(item=>{
				item.lsData = [];
				item.exists = "N";
			})
		});
		// Populate details into each insurer.
		this.lifeStyleQuestions.forEach(question=>{
			if (question.exists == "Y"){
        console.log('this.ProcessLSList',this.lifeStyleQuestions);

				question.details.forEach(lsDetail=>{
					 var questionId = lsDetail.questionId;
					 var insuredId = lsDetail.insuredId;
					 // Check the insured and the question to which the detail belongs
					 this.proposalInput.insured.forEach(insured=>{
						 if (insured.insuredId == insuredId) {
							 // check for question
							 insured.lifestyleInfo.forEach(item=>{
								 if (item.name == questionId){
									 item.exists = "Y";
									 var detail =<any>{};
						    	 detail.quantity = lsDetail.quantity;
									 detail.noOfYears = lsDetail.noOfYears;
									 item.lsData.push(detail);
								 }
							 })
						 }
					 })			
				})
				console.log('processlist',this.proposalInput.insured)
			}
		})
		
	}
	 ProcessMedicalList(){
		
		// initialize the medical detail Array
		
    this.proposalInput.insured.forEach(insured =>
    {
      insured.pedList.forEach(item =>
      {
        item.pedData = [];
				item.exists = "N";
			
      })
    });
			
		// Populate details into each insurer.
    this.medicalQuestions.forEach(question=>
    {
			if (question.exists == "Y"){
        question.details.forEach(medDetail=>{
          var questionId = medDetail.questionId;
					 var insuredId = medDetail.insuredId;
					 this.proposalInput.insured.forEach(insured=>{
            if (insured.insuredId == insuredId) {
              insured.pedList.forEach(item=>{
                if (item.pedCode == questionId){
                  item.exists = "Y";
									 var pedDetails = {};
						    	 item.pedData.push(pedDetails);
								  
                }
              })
            }
           });
        })
      }

    })
		
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
      
  initializeMedicalQuestions(){
    for(var i=0; i<this.medicalQuestions.length; i++){
			this.medicalQuestions[i].details = [];
    }
    this.proposalInput.insured.forEach(insured => {
      var insuredId = insured.insuredId;
      var insuredName = insured.firstName + " " + insured.lastName;
      insured.pedList.forEach(item => {
        var code = item.pedCode;
				for(var i=0; i<this.medicalQuestions.length; i++){
					if (this.medicalQuestions[i].code == code){
						this.medicalQuestions[i].exists = item.exists;
						item.pedData.forEach(illness => {
							var detail = illness;
							detail.insuredId = insuredId;
							detail.insuredName = insuredName;
							detail.questionId = code;
              this.medicalQuestions[i].details.push(detail);
              console.log('initial medical::',this.medicalQuestions[i].details);

						});
					}
        }
        
      });
    });

  }
  
  checkRelationShip(){
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
      this.proposalInput.insured.forEach(element => {
        if(element.relationshipId == "Self"){
          var proposalDb= new Date(element.dob);
          this.proposalInput.proposer.title= element.title;
    			this.proposalInput.proposer.firstName = element.firstName;
    			this.proposalInput.proposer.middleName = element.middleName;
    			this.proposalInput.proposer.lastName= element.lastName;
    			this.proposalInput.proposer.gender = element.gender;
          this.proposalInput.proposer.proposerDob =this.datepipe.transform(proposalDb,'yyyy-MM-dd');
          console.log('dobbb',this.proposalInput.proposer.proposerDob);

    			this.proposalInput.proposer.occupationType=element.occupationType;
          this.proposalInput.proposer.maritalStatus=element.maritalStatus;
          console.log('martial status',this.proposalInput.proposer.maritalStatus);
    			this.proposalInput.proposer.isPrimaryInsured = "Y";
    			this.proposalInput.proposer.IsProposerInsured = "Y";
    			if(element.occupationType=='SALARIED'||element.occupationType=='OTHERS')
    			{
    				this.proposalInput.proposer.designation =element.designation;
    			
    			}
    			else if(element.occupationType=='SELF EMPLOYED')
    			{
    		
    				this.proposalInput.proposer.business =element.business;
    			}
    			if (element.type == "C"){ // Proposer cannot be a child.
    				//form.relaInsured.$setelementidity('required',false);
    			}
    			selfCount++;
    			this.isProposerInsured = true;
    			console.log('propodal tab',this.proposalInput.proposer);
        }
      });
      if (selfCount>1) {
    		//form.relaInsured.$setValidity('required',false);
    	}
  }
  getCity(state,name){
   
    var cities = [];
    if (typeof(state) != "undefined"){
    this.shared.getCityForState(this.proposalInput.insurerId, state, name)
      .subscribe(
        data =>{
          cities = data.result;
          if(name=='nomadd')
				{
					this.proposalInput.proposer.nomineeStateCode= state;
          this.proposalInput.proposer.nomineeState=  this.getMasterValue('State', this.proposalInput.proposer.nomineeStateCode);         
          this.nomCities = cities;
          console.log('nomcities',this.nomCities)
				}else if(name=="policy") {
					this.proposalInput.proposer.address[0].stateCode = state;
				  this.proposalInput.proposer.address[0].state = this.getMasterValue('State', this.proposalInput.proposer.address[0].stateCode);  
          this.polCities = cities;
          console.log('polCities',this.polCities)

         


				}
        });

    }
  }
  changeCity(city,name) {
		if(name=="policy") {
          this.proposalInput.proposer.address[0].cityCode = city;			
		}else if(name=="nomadd") {
          this.proposalInput.proposer.nomineeCityCode = city;

		} 
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

  makePayment(){
    this.loading =false;
    var healthProposal = this.proposalInput;
    console.log(JSON.stringify(healthProposal));
    this.shared.submitProposal(healthProposal, this.proposalInput.insurerId, this.proposalInput.productId)
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
                 + '&process='+data.process
                 + '&premium='+data.premium
                 + '&apikey='+data.apikey
							   + '&quoteId='+data.quoteId
							   + '&version_no='+data.version_no
							   + '&strFirstName='+data.strFirstName
							   + '&strEmail='+data.strEmail
							   + '&isQuickRenew='+data.isQuickRenew
							   + '&crossSellProduct='+data.crossSellProduct
							   + '&crossSellQuoteid='+data.crossSellQuoteid
							   + '&returnUrl='+data.returnUrl
                 + '&paymentType='+data.paymentType
                 + '&ReferralStatus='+data.ReferralStatus;

                 	
                 // Check for OTP and Then Transfer control to the PG
          var otpInput = <any> {};
          otpInput.appNo = data.quoteId;
          otpInput.productId = this.proposalInput.productId;
          if(this.proposalInput.proposer.contacts[0].contactType == "mobile")
          {
            otpInput.mobile = this.proposalInput.proposer.contacts[0].contactText;
            console.log('mobile::',otpInput.mobile)

          }
          else if(this.proposalInput.proposer.contacts[1].contactType == "mobile")
          {
            otpInput.mobile = this.proposalInput.proposer.contacts[1].contactText;
            console.log('mobile1::',otpInput.mobile)

          }
          otpInput.pgUrl = payUrl;
          this.otp(otpInput);	
        }
      }
    );
  }
  otp(otpInput){
    this.otpInput = otpInput;
    console.log('opt',this.otpInput);
    var productName="LifeLine - Supreme";
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
  validateOcupation(){
    if(this.proposalInput.proposer.occupationType=='POLITICIAN')
		{
			this.ocupationError="Please contact our nearest branch or kindly chat with our online representative or call us at 1860 425 0000 for more information.";
		}
		else
			{
			this.ocupationError="";
			}
  } 

  ageCount() {
    var date1 = new Date();
    var dob = (<HTMLInputElement>document.getElementById("DOTreatment")).value;
    console.log('databitrh::',dob)
    var date2 = new Date(dob);      
      var y1 = date1.getFullYear();
      var y1month = date1.getMonth();
      var y1date = date1.getDate();
  
      //getting current year            
      var y2 = date2.getFullYear();
      var y2month = date2.getMonth();
      var y2date = date2.getDate();     
      //getting dob year            
      this.age = y1 - y2;
      console.log('age::',this.age);
      if ((y1month < y2month) || (y1month == y2month && y1date<y2date)){
        this.age--;
        console.log('ageeee',this.age);
        
       }
   
      if(this.age>5)
      {
        this.errorMessageforage = 'Invalid date';
        this.errorCall5= true;
        console.log('max age');
      }
      else
      {
        this.errorMessageforage = "" ;
        this.errorCall5= false;
      }  
      
     
  }
  editFields(index, section)
  {
   $('#panel'+index).addClass('in active');
   $('#panel'+section).removeClass('in active');
   $('li:nth-child('+index+')').addClass('active');
   $('li:nth-child('+section+')').removeClass('active');
  }
  getInsuredName(insuredname){
    this.question.insuredId = insuredname.insuredId;
    this.question.insuredName = insuredname.firstName +" "+ insuredname.lastName;
  }
  submitMedicalQnsForm(qnsDetails,medicalDetails:NgForm){
    var indexInsu = this.question.insuredId -1;
    var output = <any>{};
    var dottreatment =new Date(this.question.DOTreatment);
    var outyear = dottreatment.getFullYear();
      var outmonth= dottreatment.getMonth()+1;  
      output.insuredName =  this.question.insuredName;
    output.monthOfDiagnosis = outmonth;
    output.yearOfDiagnosis =outyear;
		output.nameOfIllness = this.question.nameOfIllness;
		output.medicationDetail = this.question.medicationDetail;
    output.treatmentOutCome = this.question.treatmentOutCome;
    console.log('medicallll',output);

    this.proposalInput.insured[indexInsu].pedList[this.qIndex].pedData.push(output);
    this.proposalInput.insured[indexInsu].pedList[this.qIndex].exists = 'Y';
    this.medicalQuestions[this.qIndex].details.push(output);
    this.medicalQuestions[this.qIndex].exists = 'Y'; 
    console.log('medicallll proposalInput.insured',this.proposalInput.insured);


              $("#medicalQnsDetails").modal('hide');
            }
           
  
 lifeDetSubmit(lifestylemandate){ 
 // this.lifeDetSubmit1 =false;
  var indexInsu = this.question.insuredId -1;
 var output = <any>{};
		
		console.log(this.question.text1);
		//output.insuredId = this.lifestylemandate.insuredId;
		output.insuredName =  this.question.insuredName;
		output.quantity = this.lifestylemandate.quantity;
		output.noOfYears = this.lifestylemandate.noOfYears;
    //output.action = "add";
    console.log('lifeout',output);
    this.proposalInput.insured[indexInsu].lifestyleInfo[this.qIndex].lsData.push(output); 
    this.proposalInput.insured[indexInsu].lifestyleInfo[this.qIndex].exists = 'Y'; 
    this.lifeStyleQuestions[this.qIndex].details.push(output);
    this.lifeStyleQuestions[this.qIndex].exists = 'Y';
    console.log('lifestyle',this.lifeStyleQuestions);
    $("#lifeStyleModal").modal('hide');
   // this.lifeDetSubmit1 =true;


 }
 cancelevent1()
{
  
  $('#lifeStyleModal').hide();
}
 calculateHeight(e,index)
 {
    this.heightFlagerror[index]=false;
    this.heighterror[index]="";
    if(e.target.value>300 || e.target.value<20)
    {
      this.heightFlagerror[index]=true;
      this.heighterror[index]="Invalid Height";
    }
 }
 calculateWeight(e,index)
 {
    this.weightFlagerror[index]=false;
    this.weighterror[index]="";
    if(e.target.value>300 || e.target.value<2)
    {
      this.weightFlagerror[index]=true;
      this.weighterror[index]="Invalid Weight";
    }
 }
 getPolicyEndDate(policyDate){
  if ((typeof policyDate != "undefined")&& (policyDate != "")) {
     
    var date=new Date(policyDate);
  this.proposalInput.policy.policyEnddate=this.datepipe.transform(new Date(date.getFullYear()+ Number(this.proposalInput.policy.tenure),date.getMonth(),date.getDate()-1),'yyyy-MM-dd');
console.log('policyenddate',this.proposalInput.policy.policyEnddate)  
}
}

}
