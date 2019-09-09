import { Component, OnInit,ElementRef} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../../../sharedServices/shared.service';
import { AlertService } from '../../../../sharedServices/alert.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
import { OrderByPipeAIA } from '../../../../sharedServices/orderBy';
import { element } from 'protractor';
import { variable } from '@angular/compiler/src/output/output_ast';
import { uploadURL, accessKey, secretKey } from '../../../../sharedServices/config';
//import { RoundProp } from '../../../../sharedServices/mathRound';

const URL = 'https://dbsuat-207905.appspot.com/fileUpload'
declare var jquery:any;
declare var $;

export interface State {
  id;
  value;
}

@Component({
  selector: 'app-aia',
  templateUrl: './aia.component.html',
  styleUrls: ['./aia.component.css']
})
export class AiaComponent implements OnInit {
  public accessKey = accessKey;
  public secretKey = secretKey;
  public otpRetires: number = 0;
  public failedStatus: boolean = false;
  public errLoad: boolean = false;
  public otpError: boolean = false;
  public otpInput = <any> {};
  public payVisible:boolean = false;
  public stateCtrl = new FormControl();
  public bankCtrl = new FormControl();
  public renewalbankCtrl = new FormControl();
  public nriBankCtrl = new FormControl();
  public userName = null;
  public firstName= null;
  public lastName= null;
  public docCount:number = 0;
  public allowSubmit: boolean = false;
  public showCanvas: boolean = false;
  public mergeImg = <any>[];
  public showPreview = <any>[];
  public addressDetails = <any>[];
  public addedDocs = <any>[];
  public errorCall:boolean = false;
  public errMessage = null; 
  public addressType = null;
  public resstate = null;
  public city = '';
  public docLogs = <any>{};
  public NarcoticType = '';
  public AlcoholType = '';
  public TobaccoType = '';
  public relationshipWithInsured = '';

  public others: boolean = false;
  public URL = uploadURL;
  public formDataInput = {
                      url: null,
                      params: null
              };
  public formBuild: boolean = false;            
  public imagePath = IMAGE_URL;
  public proposalInput = <any>{};
  public loading:boolean = true;
  public insurerMaster = <any> [];
  public nomineeTitle = <any> [];
  public healthstates = [];
  public requestData = <any>{};
  public applicationData= <any>{};
  public family= <any>{};
  public nomineeData = <any> [];
  public bi = <any>{};
  public errMessageNRI = null;
  public errorCallNRI: boolean = false;
  public illustrationViewed: boolean = false;
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
public pageErrors = <any> {
  insuredError: false,
  notAllowedError: false,
  medicalError: false,
  insuredErrorText : "",
  medicalErrorText : "",
  notAllowedErrorText: ""
}
  public masterLoaded: boolean = false;
  public menuLoaded: boolean = false;
  public formLoaded: boolean = false;
  public familyHealthStatus:boolean = true;
  public natureofWorkMaster = [];
  public designationMaster = [];
  public KYCMaster = <any>[];
  public uploadList = {};
  public lifestyleDisplay = {};
  public pastDateOptions = <any>{};
  public fpfValidityOptions = <any>{};
  public futureDateOptions = <any> {};
  public nowList = [];
  public designationList = [];
  public appInput = <any>{};
  public ageProofIN = {};
  public identityProofIN = {};
  public addressProofIN = {};
  public incomeProofIN = {};
  public ageProofPR = {};
  public identityProofPR = {};
  public addressProofPR = {};
  public incomeProofPR = {};
  public filesUploaded: Array<any> = [];
  public docPages = <any>[];
  public count: number = 0;
  public filesToUpload = <any>[
     {"docId" : "1014010650", "fileType": "CDF","displayName" : "CDF",  "fileName": ""}
    ,{"docId" : "6033010334", "fileType": "CCR","displayName" : "CCR",  "fileName": ""}
    ,{"docId" : "1015010665", "fileType": "FTF","displayName" : "Financial Transaction Form",  "fileName": ""}
    ,{"docId" : "1022010142", "fileType": "insuredPhoto","displayName" : "Photograph",  "fileName": ""}
    ,{"docId" : "1032010696", "fileType": "chequeleaf","displayName" : "NEFT Cancelled Cheque Copy",  "fileName": ""}
    ,{"docId" : "2028010409", "fileType": "NACH form","displayName" : "Renewal Premium NACH Form",  "fileName": ""}
  ];
 public occupations = [
		{"id" : 1, "value" : "Climbing and Mountaineering"},
		{"id" : 2, "value" : "Diving"},
		{"id" : 3, "value" : "Gliding"},
		{"id" : 4, "value" : "Hazardous Sports"},
		{"id" : 5, "value" : "Microlighting"},
		{"id" : 6, "value" : "Parachuting"},
		{"id" : 7, "value" : "Scuba Diving"},
		{"id" : 8, "value" : "Yachting"},
		{"id" : 9, "value" : "Hazardous Occupation"}
    ];
  public isArmedForcesDetails = <any> {
      "branch": "",
      "rank": "",
      "location" : "",
      "job": "",
      "activities": "",
      "serving":"",
      "weapon":""
        
    };
  public isOccupationHazardous = <any> {
      "type": ""
    };
  public fileDocs = <any>{};  
  public disableUpload = true;
  public proposalError = <any>{};
  public documentError = <any>{};
  public illustration = <any>{};
  public addressList = <any> {};
	public address = <any>{};
  public selectedAddress = {};
  public inputAddress = <any>{};
  public dateOptions = <any>{};
  public nomineeDobOptions = <any> {};
  public checkDateOptions = <any>{};
  public isTravelOutsidesDetails = <any> {};
  public isOutsideIndiaVacc180daysDetails = <any>{};
  public isNarcoticDetails = <any>{};
  public isAlcoholicDetails = <any> {};
  public isTobaccoDetails = <any>{};
  public isDeclinedInsu = <any>{};
  public policy = <any> [];
  public adultDobOptions = <any>{};
  public question = <any>[];
  public medicalOption = <any>{};
  public uploadingDoc:boolean= false;
  public tcVisible:boolean = false;
  public qIndex = 0;
  form: FormGroup;
  public years = [];
  public showDetails:boolean = false;
  public nomineeDone: boolean = false;
  public docUploaded: boolean = false;
  public readytoUpload: boolean = false;
  public Uploadnumber: number = 0;
  public insuItem = '';
  public viewedBi:boolean = false;
  public isAllow: boolean = true;
  public tcAgree: boolean = false;
  public resultPromise;
  public iterations = 0;
  public proposalResuestId;
  public getAppForm: boolean = false;
  public pdfLoader: boolean = false;
  public addlflag: boolean = false;
  public signedUrls = <any>{};
  public addlDocs = [];
  public documentNumber: number = 0;
  bankMaster : State[];
  myBankMaster: State [];
  renewalBankMaster: State [];
  nriBankMaster: State [];

  public filteredStates: Observable<State[]>;
  public filteredBanks: Observable<State[]>;
  public renewalBanks: Observable<State[]>;
  public nriBanks: Observable<State[]>; 
  public AgeProof = null;
  public IdProof = null;
  public IncomeProof = null;
  public AddProof = null;
  public nriDetails = <any>{};
  constructor(private shared: SharedService, private datepipe: DatePipe, private el: ElementRef, private router: Router, private alertservice: AlertService) {
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
     
      map(state => state ? this._filterStates(state) : this.bankMaster)
    );

    this.filteredBanks = this.bankCtrl.valueChanges
    .pipe(
     
      map(state => state ? this._filterBanks(state) : this.bankMaster)
    );
    this.renewalBanks = this.renewalbankCtrl.valueChanges
    .pipe(
     
      map(state => state ? this._filterRenewalBanks(state) : this.bankMaster)
    );
    this.nriBanks = this.nriBankCtrl.valueChanges
    .pipe(
     
      map(state => state ? this._filterNriBanks(state) : this.bankMaster)
    );
    }

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
    this.fpfValidityOptions = {
      minDate: new Date(yearMax, monthToday, dayToday+15),
      maxDate: new Date(yearMax+1, monthToday, dayToday),
    }
    this.checkDateOptions = {
      maxDate: new Date(),
      minDate: new Date(yearMax, monthToday-3, dayToday)
    }
    this.pastDateOptions = {
                      maxDate: new Date()
      };
    this.futureDateOptions = {
                      minDate: new Date()
    }; 
    this.dateOptions = {
      maxDate: new Date(yearMax, monthToday, dayToday),
      minDate: new Date(yearMin, monthToday, dayToday),
  };
  this.nomineeDobOptions = { 
      maxDate: new Date(yearMax, monthToday-3, dayToday),
      minDate: new Date(yearMin-100, monthToday, dayToday)	
  }; 
  this.adultDobOptions = { maxDate : new Date(newYearMax-18, newMaxMonthToday, newdayToday),
    minDate: new Date(newYearMin-100, monthToday, newdayToday)
  };
  this.medicalOption={
    maxDate: new Date(yearMax, monthToday, dayToday)
  };
    var currYear = (new Date()).getFullYear();
    
    for (var i=0; i<10; i++){
      this.years.push(currYear-i);
    }
     
    this.getthePage();
  }
  ngDoCheck(){
    if($('.modal-dialog').is(':visible') && this.detectmob()){
     $('body').css('position','fixed');
     }else{
       $('body').css('position','relative');
     }
   }
    detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }
	getthePage(){
    $('#loader').hide();
    let strUrl = window.location.href.split("=")[1];
    let decodeUriData =  decodeURIComponent(strUrl);
    //this.proposalInput = JSON.parse(atob(decodeUriData));
    //console.log(this.proposalInput);
    this.requestData.productId = decodeUriData.split('/')[2];
    this.requestData.rmId = decodeUriData.split('/')[3];
    this.requestData.customerId = decodeUriData.split('/')[4];
    this.requestData.appNo = decodeUriData.split('/')[5];
    if(this.requestData.productId != undefined || this.requestData.rmId != undefined || this.requestData.customerId !=undefined || this.requestData.appNo != undefined){
    this.shared.getApplicationData(this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
    .subscribe(
        data =>{
          if (data.hasOwnProperty("result")){
            this.applicationData = JSON.parse(data.result);
            this.applicationData.authentication = {"accesskey": this.accessKey,"secretkey": this.secretKey};
            if(this.applicationData.rmId && this.applicationData.customerId){
              this.applicationData.proposalData.policy.rmId = this.applicationData.rmId;
              this.applicationData.proposalData.policy.customerId = this.applicationData.customerId;
            }else{
              this.alertservice.error("Cannot find RM and Customer Identity!");
            }
            this.proposalInput= this.applicationData.proposalData;
         
              for(var i=0;i<this.proposalInput.covers.length;i++)
              {
              if(this.proposalInput.covers[i].coverId=='ADD' && this.proposalInput.covers[i].isSelected=='Y')
              {
                this.addlflag = true;
              }
            }
            this.proposalInput.insured.dominantHand = '';
            console.log(this.proposalInput);
            this.loading = false;
            this.insuItem = this.proposalInput.insured.maritalStatusTitle;
            this.loadMasterData(this.proposalInput.insurerId);
           // this.getRequirements();   
            this.getbank(this.proposalInput.insurerId);

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
      } else{
        this.loading = false;
        this.errLoad = true;
	      this.alertservice.error("Failed to create form, Please check the url!");
      }
      } 
      
  getbank(insurerId){
       this.shared.getBankName(insurerId)
       .subscribe(data=>{
        this.bankMaster = data.result;
        this.myBankMaster = data.result;
        this.renewalBankMaster = data.result;
        this.nriBankMaster = data.result;
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
  private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase();
    
        return this.bankMaster.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
      }
  private _filterBanks(value: string): State[] {
        const filterValue = value.toLowerCase();
    
        return this.myBankMaster.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
      }
  private _filterRenewalBanks(value: string): State[] {
        const filterValue = value.toLowerCase();
    
        return this.renewalBankMaster.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
      } 
  private _filterNriBanks(value: string): State[] {
        const filterValue = value.toLowerCase();
    
        return this.nriBankMaster.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
      }          
 getPincode(pincode){  
  this.errMessage ="";
  this.errorCall = false;   
      this.shared.getPincodeaia(this.proposalInput.insurerId, pincode) 
      .subscribe(data=>{
        if(data.result.length==0){
          this.errMessage ="Please enter pinocde again";
          this.errorCall= true;
          }else {
           this.errMessage="";
           this.errorCall= false;
          this.address.state = data.result[0].stateName;
         this.address.stateCode = data.result[0].stateId; 
          this.getCities(this.address.stateCode);
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
    getPincodeforNri(pincode){  
      this.errMessageNRI ="";
      this.errorCallNRI = false;   
          this.shared.getPincodeaia(this.proposalInput.insurerId, pincode) 
          .subscribe(data=>{
            if(data.result.length==0){
              this.errMessageNRI ="Please enter pinocde again";
              this.errorCallNRI= true;
              }else {
               this.errMessageNRI="";
               this.errorCallNRI= false;
              this.nriDetails.state = data.result[0].stateName;
             this.nriDetails.stateCode = data.result[0].stateId; 
              this.getCities(this.nriDetails.stateCode);
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
calculateNomineeAge(dob){
  this.nomineeData.age = this.shared.calculateAge(dob);
}         
loadMasterData(insurerId){
    this.shared.getInsuMaster(insurerId)
    .subscribe(data =>{
      for(var k in data)  {
        var masterId = k;
        var master = [];
        var output = [];
        master = data[k];
        //console.log("get Masters for :" + masterId);
        $.each(master, function(key, value){
        var item = <any> {};
        item.id = key;
        item.value = value;
        output.push(item);
      });
      if (output.length>0){
        this.insurerMaster[masterId] = output;
        if(masterId=='AddressType') this.addressDetails = output;
      }
      //this.setMaster(this.insurerMaster);
		 // this.states = lifefactory.getMasters("State");
		 // this.cities = this.getCity();
				this.loadNOWData();
        this.loadKYCMaster();
        this.loadDesignation();
				
		    	//console.log(this.insurerMaster);
		    	this.masterLoaded = true;
		    	if (this.menuLoaded && this.masterLoaded && this.formLoaded){
		    		
		    		this.loading = false;
		    	}
    }
    //this.setAppInput(this.applicationData);
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
loadDesignation(){
  this.shared.getDesignMaster(this.proposalInput.insurerId)
  .subscribe(data=>{
    this.designationMaster = data;
    this.getDesignation(this.proposalInput.insured.employmentDetails.occupation);
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
getDesignationValue(masterID){
  var masterValue = '';
  var values = this.designationMaster;
  if (typeof(values) != "undefined"){
  for (var i = 0; i<values.length; i++){
      
    if (values[i].DESIGNATION_CODE == masterID){
      masterValue = values[i].APP_DESIGNATION;
      break;
      }
    }
  }
return masterValue;
}
loadNOWData(){
  this.shared.getNowData(this.proposalInput.insurerId)
  .subscribe(data=>{
    this.natureofWorkMaster = data;
    this.getNowList(this.proposalInput.insured.employmentDetails.industryCode);
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
getNowlistValue(masterID){
  var masterValue = '';
  var values = this.natureofWorkMaster;
  if (typeof(values) != "undefined"){
  for (var i = 0; i<values.length; i++){
      
    if (values[i].OCCUPATION_CODE == masterID){
      masterValue = values[i].APP_NATURE_OF_WORK;
      break;
      }
    }
  }
return masterValue;
}
loadKYCMaster(){
  this.shared.getKYCmaster(this.proposalInput.insurerId)
  .subscribe(data=>{
    this.KYCMaster = data;
    this.KYCMaster.AgeProof = this.KYCMaster.AgeProof.filter(item => item.CUSTOMER_CATEGORY =="IN");
    this.KYCMaster.IdentityProof = this.KYCMaster.IdentityProof.filter(item => item.CUSTOMER_CATEGORY =="IN");
    this.KYCMaster.IncomeProof = this.KYCMaster.IncomeProof.filter(item => item.CUSTOMER_CATEGORY =="IN");
    this.KYCMaster.PermAddressProof = this.KYCMaster.PermAddressProof.filter(item => item.CUSTOMER_CATEGORY =="IN");
    this.KYCMaster.ResAddressProof = this.KYCMaster.ResAddressProof.filter(item => item.CUSTOMER_CATEGORY =="IN");
    this.setAppInput(this.applicationData);
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
addFPFtoDocs(action){
  if(action == 'add'){
  var obj = <any>[];
  obj.displayName =  "Financial Profile Form"; 
  obj.fileType = "FPF";
  obj.docId = "201201777";
  obj.fileName = "FPF";
  if (!this.itemExists(this.filesToUpload, obj.fileName))
  this.filesToUpload.push(obj);
  //else this.filesToUpload[10].displayName = obj.displayName;
  }else{
    for(var i=0; i< this.filesToUpload.length; i++){
      if(this.filesToUpload[i].fileType=='FPF')
      this.filesToUpload.splice(i,1);
    }
  }
}
addDocumentToUploadList(attribute, proofType) {

  proofType = this.getKYCId(attribute, "IN", proofType);
  //if(!this.docExists(this.addedDocs, proofType.MPPROOF_DESC)){
    //this.addedDocs.push(proofType);
  this.filesToUpload = this.filesToUpload.filter(item => item.fileType != attribute);
   var obj = <any>{};
   var DOCID = null;
    switch(attribute){
          case 'AgeProof':  
                            DOCID = this.KYCMaster.AgeProof.filter(item => item.MPDOC_DESCRIPTION == 'Age Proof' && item.MPPROOF_DESC == proofType.MPPROOF_DESC)[0].DOC_ID;
                            obj.displayName =  "Insured - "+proofType.MPPROOF_DESC+"(Age Proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            obj.fileName = proofType.MPPROOF_DESC;
                            this.AgeProof = proofType.MPPROOF_DESC;
                            if (!this.itemExists(this.filesToUpload, attribute))
                            this.filesToUpload.push(obj);
                           /* else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }*/
                          break;
          case 'IdentityProof':  
                            DOCID = this.KYCMaster.IdentityProof.filter(item => item.MPDOC_DESCRIPTION == 'Identity Proof' && item.MPPROOF_DESC == proofType.MPPROOF_DESC)[0].DOC_ID;
                            obj.displayName =  "Insured - "+proofType.MPPROOF_DESC+"(Identity Proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            obj.fileName = proofType.MPPROOF_DESC;
                            this.IdProof = proofType.MPPROOF_DESC;
                            if (!this.itemExists(this.filesToUpload, attribute))
                            this.filesToUpload.push(obj); 
                           /* else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }*/
                          break;
          case 'IncomeProof':  
                            DOCID = this.KYCMaster.IncomeProof.filter(item => item.MPDOC_DESCRIPTION == 'Income Proof' && item.MPPROOF_DESC == proofType.MPPROOF_DESC)[0].DOC_ID;
                            obj.displayName =  "Insured - "+proofType.MPPROOF_DESC+"(Income Proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            obj.fileName = proofType.MPPROOF_DESC;
                            this.IncomeProof = proofType.MPPROOF_DESC;
                            if (!this.itemExists(this.filesToUpload, attribute))
                            this.filesToUpload.push(obj); 
                           /* else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }*/
                          break;
          case 'PermAddressProof':  
                            DOCID = this.KYCMaster.PermAddressProof.filter(item => item.MPDOC_DESCRIPTION == 'Permanent Address Proof' && item.MPPROOF_DESC == proofType.MPPROOF_DESC)[0].DOC_ID;
                            obj.displayName =  "Insured - "+proofType.MPPROOF_DESC+"(Permanent Address Proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            obj.fileName = proofType.MPPROOF_DESC;
                            this.AddProof = proofType.MPPROOF_DESC;
                            if (!this.itemExists(this.filesToUpload, attribute))
                            this.filesToUpload.push(obj); 
                           /* else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }*/
                          break;
          case 'ResAddressProof':  
                            DOCID = this.KYCMaster.ResAddressProof.filter(item => item.MPDOC_DESCRIPTION == 'Residential Address Proof' && item.MPPROOF_DESC == proofType.MPPROOF_DESC)[0].DOC_ID;
                            obj.displayName =  "Insured - "+proofType.MPPROOF_DESC+"(Residential Address proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            obj.fileName = proofType.MPPROOF_DESC;
                            this.AddProof = proofType.MPPROOF_DESC;
                            if (!this.itemExists(this.filesToUpload, attribute))
                            this.filesToUpload.push(obj); 
                           /* else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }*/
                          break; 
         case 'Nationality':  
                            DOCID = this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'FATCA form')[0].DOC_ID;
                            obj.fileName =  this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'FATCA form')[0].MPPROOF_DESC;
                            obj.displayName =  "Insured - "+ obj.fileName+"(NRI proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            if (!this.itemExists(this.filesToUpload, obj.fileName ))
                            this.filesToUpload.push(obj); 
                            else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }
                            obj = <any>{};
                            DOCID = this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'Visa Copy')[0].DOC_ID;
                            obj.fileName =  this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'Visa Copy')[0].MPPROOF_DESC;
                            obj.displayName =  "Insured - "+ obj.fileName+"(NRI proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            if (!this.itemExists(this.filesToUpload, obj.fileName ))
                            this.filesToUpload.push(obj); 
                            else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }
                            obj = <any>{};
                            DOCID = this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'Passport Copy')[0].DOC_ID;
                            obj.fileName =  this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'Passport Copy')[0].MPPROOF_DESC;
                            obj.displayName =  "Insured - "+ obj.fileName+"(NRI proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            if (!this.itemExists(this.filesToUpload, obj.fileName ))
                            this.filesToUpload.push(obj); 
                            else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }
                            obj = <any>{};
                            DOCID = this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'Proof of Employment')[0].DOC_ID;
                            obj.fileName =  this.KYCMaster.Nationality.filter(item => item.MPPROOF_DESC == 'Proof of Employment')[0].MPPROOF_DESC;
                            obj.displayName =  "Insured - "+ obj.fileName+"(NRI proof)"; 
                            obj.fileType = attribute;
                            obj.docId = DOCID;
                            if (!this.itemExists(this.filesToUpload, obj.fileName ))
                            this.filesToUpload.push(obj); 
                            else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == DOCID)
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }
                          break;                                                                                 
    }
   /* for(var i=0; i< this.filesToUpload.length; i++){
      if(this.filesToUpload[i].displayName.indexOf(proofType.MPPROOF_DESC) >= 0){
      this.filesToUpload.splice(++i,1);
      break;
      }
    }*/
  //}	 
}
itemExists(array, item){
  var exists= false;
  for (var i = 0; i< array.length; i++){
    if (array[i].fileType == item){
      exists= true;
      break;
    }
  }  
  return exists;
}
docExists(array, item){
  var exists= false;
  for (var i = 0; i< array.length; i++){
    if (array[i].MPPROOF_DESC == item){
      exists= true;
      break;
    }
  }  
  return exists;
}
SetIndian(type){
  if(type=='RI'){
  this.proposalInput.insured.nationality = "IN";
  for(var i=this.filesToUpload.length-1 ; i >= 0; i--){
    if(this.filesToUpload[i].fileType=='Nationality')
    this.filesToUpload.splice(i,1);
  }
  }else{
  this.proposalInput.insured.nationality = "";
  this.NRImandateChange(type);
  this.addDocumentToUploadList('Nationality', type);
  }
}
setNationality(){
  this.proposalInput.insured.nationality = this.proposalInput.insured.residenceCountry;
}
NRImandateChange(type){
  this.nriDetails.type = this.getMasterValue('Nationality', type);
  this.nriDetails.name = this.proposalInput.insured.firstName + ' ' + this.proposalInput.insured.lastName;
  this.nriDetails.dob = this.proposalInput.insured.dob;
  $('#NRImodal').show();
}
cancelActionNRI(){
  $('#NRImodal').hide();
  
}
setNOW(type, value){
			
  if (typeof(value) != "undefined" && type == "I"){
     this.proposalInput.insured.employmentDetails.occupation = value.OCCUPATION_CODE;
     this.proposalInput.insured.employmentDetails.industry = value.APP_INDUSTRY;
     this.proposalInput.insured.employmentDetails.industryCode = value.APP_INDUSTRY_NBFE_CODE;
     this.proposalInput.insured.employmentDetails.natureOfDuties = value.APP_NOW_NBFE_CODE;
     this.proposalInput.insured.employmentDetails.natureOfDutiesDesc = value.APP_NATURE_OF_WORK;
  }
  
  if (typeof(value) != "undefined" && type == "P"){
    this.proposalInput.proposer.employmentDetails.occupation = value.OCCUPATION_CODE;
     this.proposalInput.proposer.employmentDetails.industry = value.APP_INDUSTRY;
     this.proposalInput.proposer.employmentDetails.industryCode = value.APP_INDUSTRY_NBFE_CODE;
     this.proposalInput.proposer.employmentDetails.natureOfDuties = value.APP_NOW_NBFE_CODE;
     this.proposalInput.proposer.employmentDetails.natureOfDutiesDesc = value.APP_NATURE_OF_WORK;
  }
}
validateInsuredData() {
			
  this.pageErrors.insuredError = false;
  this.pageErrors.notAllowedError = false;
  this.pageErrors.notAllowedErrorText = "";
  this.pageErrors.insuredErrorText = "";

  var resAddressFilter = {addressType : "R"};
  var perAddressFilter = {addressType : "P"};
  if (typeof(this.proposalInput.insured) != "undefined"){
    if (this.proposalInput.insured.address.filter(item=> item.addressType == resAddressFilter.addressType).length != 1
      ||this.proposalInput.insured.address.filter(item=> item.addressType == perAddressFilter.addressType).length != 1
        
    ){	
      this.pageErrors.insuredError = true;
      this.pageErrors.insuredErrorText = "At least one Permanent Address and One Residential Address for Insured is required";
    } 
  }
  
  
  if (this.appInput.productType == "Term") {
    if (this.proposalInput.insured.employmentDetails.occupation == "4"
    || this.proposalInput.insured.employmentDetails.occupation == "5"
    || this.proposalInput.insured.employmentDetails.occupation == "6"
    || this.proposalInput.insured.employmentDetails.occupation == "7"
    || this.proposalInput.insured.employmentDetails.earning=='N'){
      this.pageErrors.notAllowedError = true;
      this.pageErrors.notAllowedErrorText = "Insured is not allowed to buy Term Policy";
    }
    
    
  }
  
  if (typeof(this.proposalInput.insured) != "undefined" && this.proposalInput.insured.employmentDetails.occupation == "Student/Juvenile" && this.proposalInput.insured.age > 25){
    this.pageErrors.insuredError = true;
    this.pageErrors.insuredErrorText = "Age of insured cannot be more than 25";
    
  }
} 
getNowList(industryCode) {
  this.proposalInput.insured.employmentDetails.industryCode = industryCode;
  var filter = <any> {};
  filter.APP_INDUSTRY_NBFE_CODE = industryCode;
  if (this.requestData.productType == "Term"){
    filter.TERM_FLAG = "Y";
  }
  this.nowList = this.natureofWorkMaster.filter(item => item.APP_INDUSTRY_NBFE_CODE ==filter.APP_INDUSTRY_NBFE_CODE);
 }

getDesignation(occupation){
  this.proposalInput.insured.employmentDetails.occupation = occupation; 
  var filter = <any> {};
  filter.APP_OCCUPATION_NBFE_CODE = occupation;
  if (this.requestData.productType == "Term"){
    filter.TERM_FLAG = "Y";
  }
  this.designationList = this.designationMaster.filter(item => item.APP_OCCUPATION_NBFE_CODE ==filter.APP_OCCUPATION_NBFE_CODE);
}
setAppInput(data){
  this.appInput = data;
  // console.log("Data Updated at: " + new Date(this.appInput.lastUpdateTs));
  this.proposalInput = this.appInput.proposalData;
  this.proposalInput.policy.modalPremium = this.proposalInput.policy.policyPremium;
  this.proposalInput.policy.applicationNumber = data.applicationNumber;
  this.proposalInput.policy.policyNo = data.applicationNumber;
  //this.proposalInput.insured.dob = new Date(this.proposalInput.insured.dob);
  //this.proposalInput.proposer.dob = new Date(this.proposalInput.proposer.dob);
 /* if (this.proposalInput.policy.productType == "ULIP"){
    this.proposalInput.policy.policyNo = "U988316434";
  }else
  {
    this.proposalInput.policy.policyNo = "C999083484";
  }*/
  if(this.proposalInput.insured.hasOwnProperty('nriDetails'))
    this.nriDetails =  this.proposalInput.insured.nriDetails;
  else
    this.proposalInput.insured.nriDetails = <any>{};
  
  this.proposalInput.policy.spCode = "4606688";
  
  this.formLoaded = true;
  if (this.appInput.productType == "Term") {
    this.proposalInput.proposer.isProposerInsuredSame = 'Y';
    this.proposalInput.insured.isProposerSameInsured = 'Y';				
  }
  this.proposalInput.insured.personalQuestions.forEach(value => {
    this.lifestyleDisplay[value.id] = [];
    this.getLifeStyleAnswers(value.id);
    
  });
  this.validateInsuredData();
  this.validateProposerData();
  this.nomineeComplete();
  this.validateFundDetails();
  this.validateHealthPage();
  this.populateKYCIds ();
}
getLifeStyleAnswers(questionId){
			
  var rows = [];
  for (var i=0; i<this.proposalInput.insured.personalQuestions.length; i++){
    var item = this.proposalInput.insured.personalQuestions[i];
    if (item.id == questionId){
      if (this.formNeeded(questionId)){
        item.formNeeded = "Y";
      } else
      {
        item.formNeeded = "N";
      }
      if(questionId=="IsTobaccoConsumed"){
        if(this.proposalInput.policy.rating=="NS"){
          this.proposalInput.insured.personalQuestions[i].isYesNo ="N";
        }else{
          this.proposalInput.insured.personalQuestions[i].isYesNo ="Y";
        }
      }
      rows = item.details;
      break;
    }
  }
  
  var answers = [];
  var headers = this.lifeStyleHeaders(questionId);
  for (var i=0; i<rows.length; i++){
    var tags = [];
    for (var j = 0; j<headers.length; j++){
      /*if(headers[0].id =="occupation"){
        var item = rows[i].occupation;
      }else{ */
      var item = rows[i][headers[j].id];
     // }
      if (typeof(item) =='undefined'){
        item = "";
      }
      tags.push(item);
    }
    answers.push(tags);
  }
  //console.log(questionId);
  //console.log(answers);
  this.lifestyleDisplay[questionId] = answers;
} 
formNeeded(questionId){
			
  //console.log(questionId);
  var needed = false;
  if (questionId == "IsAlcoholic"
  || questionId == "IsArmedForces"
  || questionId == "IsOccupationHazardous"
  || questionId == "IsOutsideIndiaVacc180days"
  || questionId == "IsNarcotic"
  || questionId == "IsTobaccoConsumed"
  || questionId == "IsAnyDeclinedInsurance"){
    needed = true;
  }
  //console.log(needed);
  return needed;
}
lifeStyleHeaders (questionId){
  //console.log(questionId);
  var rows = this.insurerMaster[questionId + "Hdr"];
  var headers = [];
  if (typeof(rows) != 'undefined'){
    for (var i=0; i<rows.length; i++){
      headers.push(rows[i]);
    }
  }
  
  //console.log(headers);
  return headers;
}
validateProposerData () {
			
  this.pageErrors.proposerError = false;
  this.pageErrors.proposerdErrorText = "";
  
  var resAddressFilter = {addressType : "R"};
  var perAddressFilter = {addressType : "P"};
  if (typeof(this.proposalInput.insured) != "undefined"){
    if (this.proposalInput.proposer.address.filter(item=>item.addressType == resAddressFilter.addressType).length != 1
      || this.proposalInput.proposer.address.filter(item=>item.addressType == perAddressFilter.addressType).length != 1
        
    ){	
      this.pageErrors.proposerError = true;
      this.pageErrors.proposerErrorText = "At least one Permanent Address and One Residential Address for Proposer is required";
    } 
  }
  
}
nomineeComplete(){
			
  this.pageErrors.nomineeError = false;
  
  if (this.proposalInput.proposer.isProposerInsuredSame == "Y") {

     this.pageErrors.nomineeError = true;
    
    var total = 0;
    if (typeof(this.proposalInput.nominee) != "undefined"){
      this.proposalInput.nominee.forEach(value => {
        total = total + Number(value.sharePercent);
      })
    }
    if ( Number(total) == 100){
      this.pageErrors.nomineeError = false;
      this.nomineeDone = true;
    }else
    {
      this.nomineeDone = false;
      this.pageErrors.nomineeErrorText = "Total Share of Nominee's must add upto 100%";
    }
  }
  
}
validateFundDetails (){
  this.pageErrors.fundError = false;
  this.pageErrors.fundErrorText = "";
  if (this.proposalInput.policy.productType=='ULIP'){
    var fundTotal = 0;
    this.proposalInput.funds.forEach(value => {
      fundTotal = fundTotal + Number(value.fundAllocation);
    });
    if (fundTotal != 100){
      this.pageErrors.fundError = true;
      this.pageErrors.fundErrorText = "Total Fund allocation must be 100%";
    }
  }
}

validateHealthPage() {
			
  this.pageErrors.healthError = false;
  this.proposalInput.insured.personalQuestions.forEach(value => {
    if (value.isYesNo == "Y") {
      if (value.formNeeded == 'N' && value.details == ""){
        this.pageErrors.healthError = true;
      }
      if (value.formNeeded == 'Y' && value.details.length == 0){
        this.pageErrors.healthError = true;
      }
    }else
    {
      if (value.formNeeded == 'N'){
        value.details = "";
      }
      if (value.formNeeded == 'Y'){
        value.details = [];
      }
    }
  });
}
populateKYCIds (){
  if(this.proposalInput.insured.hasOwnProperty('cifNo'))
  {
    
 // console.log("tabSucStatus");
  }
 else
  {
    this.proposalInput.insured.cifNo="";
  }
  
  if (typeof(this.proposalInput.insured) != "undefined"){
    if (typeof(this.proposalInput.insured.ageProofType) != "undefined" && this.proposalInput.insured.ageProofType != ""){
     // this.ageProofIN = this.getKYCId("AgeProof", "IN", this.proposalInput.insured.ageProofType);
      this.addDocumentToUploadList('AgeProof',this.proposalInput.insured.ageProofType);
    }
    if (typeof(this.proposalInput.insured.idProofType) != "undefined" && this.proposalInput.insured.idProofType != ""){
     // this.identityProofIN = this.getKYCId("IdentityProof", "IN", this.proposalInput.insured.idProofType);
      this.addDocumentToUploadList('IdentityProof', this.proposalInput.insured.idProofType);
    }
    if (typeof(this.proposalInput.insured.incomeProofType) != "undefined" && this.proposalInput.insured.incomeProofType != ""){
     // this.incomeProofIN = this.getKYCId("IncomeProof", "IN", this.proposalInput.insured.incomeProofType);
      this.addDocumentToUploadList('IncomeProof',this.proposalInput.insured.incomeProofType);
    }
    if (typeof(this.proposalInput.insured.addressProofType) != "undefined" && this.proposalInput.insured.addressProofType != ""){
      if (this.proposalInput.insured.addressForComm == "P"){
       // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
        this.addDocumentToUploadList('PermAddressProof',this.proposalInput.insured.addressProofType);	
      } else
      {
        //this.addressProofIN = this.getKYCId("ResAddressProof", "IN", this.proposalInput.insured.addressProofType);
        this.addDocumentToUploadList('ResAddressProof',this.proposalInput.insured.addressProofType);
        
      }
      
    }			
    if(this.proposalInput.insured.residentStatus != "undefined" && this.proposalInput.insured.residentStatus != ""){
     if(this.proposalInput.insured.residentStatus != 'RI')
      this.addDocumentToUploadList('Nationality', this.proposalInput.insured.residentStatus);
    }
    if (typeof(this.proposalInput.proposer.ageProofType) != "undefined" && this.proposalInput.proposer.ageProofType != ""){
      this.ageProofPR = this.getKYCId("AgeProof", "PR", this.proposalInput.proposer.ageProofType);
     // this.addDocumentToUploadList(this.ageProofPR);
    }
    if (typeof(this.proposalInput.proposer.idProofType) != "undefined" && this.proposalInput.proposer.idProofType != ""){
      this.identityProofPR = this.getKYCId("IdentityProof", "PR", this.proposalInput.proposer.idProofType);
     // this.addDocumentToUploadList(this.identityProofPR);
    }
    if (typeof(this.proposalInput.proposer.incomeProofType) != "undefined" && this.proposalInput.proposer.incomeProofType != ""){
      this.incomeProofPR = this.getKYCId("IncomeProof", "PR", this.proposalInput.proposer.incomeProofType);
      //this.addDocumentToUploadList(this.incomeProofPR);
    }
    
    if (typeof(this.proposalInput.proposer.addressProofType) != "undefined" && this.proposalInput.proposer.addressProofType != ""){
      if (this.proposalInput.proposer.addressForComm == "P"){
        this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.proposer.addressProofType);
        //this.addDocumentToUploadList(this.addressProofIN);	
      } else
      {
        this.addressProofIN = this.getKYCId("ResAddressProof", "IN", this.proposalInput.proposer.addressProofType);
        //this.addDocumentToUploadList(this.addressProofIN);
        
      }
      
    }
  }
}
getKYCId (type, category, id){
  var obj = {};
  if ( Object.keys(this.KYCMaster).length > 0 ){
    var ary = this.KYCMaster[type];
    ary.forEach(value => {
      if (value.CUSTOMER_CATEGORY == category && value.DOC_ID == id) {
        obj = value;
      }
    });
  }

  return obj;
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
    this.proposalInput.insured.employmentDetails.natureOfDutiesDesc = this.getNowlistValue(this.proposalInput.insured.employmentDetails.natureOfDuties);
    if(this.proposalInput.insured.isValidFPF == 'N')
    this.addFPFtoDocs('add');
    $('#SecondTab').removeClass('tabdisable');
    break;
  case "2":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.secondComplete = 'done';
    console.log("NAME OF DOCS", this.uploadList);
    $('#thirdTab').removeClass('tabdisable');
    break;
  case "3":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.thirdComplete='done';
    this.proposalInput.policy.mode = '12';
    this.proposalInput.policy.modeTitle = "Annual";
    this.proposalInput.policy.insurancePurpose = 'Protection';
    this.proposalInput.payment.renewalPayMode = 'NACH';
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
    this.getApplicationForm();
    break;
  case "6":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.sixthComplete = 'done';
    $('#seventhTab').removeClass('tabdisable');
    var obj = <any> {};
    obj.displayName =  "Others - (Optional)"; 
    obj.fileType = "OTHER";
    obj.docId = "2023010220";
    obj.fileName = "OTHER";
    if (!this.itemExists(this.filesToUpload, obj.fileName))
    this.filesToUpload.push(obj);
    break; 
  case "7":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.seventhComplete = 'done';
    $('#eighthTab').removeClass('tabdisable');
    
    break; 
  case "8":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.eighthComplete = 'done';
    $('#ninethTab').removeClass('tabdisable');
    break;     
  }
  this.isProposerSameInsureds("Y");
  if(section == '1')
  this.getRequirements();
  this.populateConcat();
 this.applicationData.proposalData = this.proposalInput;
 console.log("saved data",JSON.stringify(this.proposalInput));
 this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
.subscribe(
  data =>{
    console.log('Saved Data');
    $('#loader').hide();
    if(section == '6'){
     this.otpInput.appNo = this.proposalInput.policy.applicationNumber;
     this.otpInput.mobile = this.proposalInput.insured.mobile;
     this.otpInput.section = section;
     $('#aiaOTPModal').modal('show');
    /* $('#eighthTab').removeClass('tabdisable');
     $('#panel'+this.otpInput.section).removeClass('in active');
     var nextSec = Number(this.otpInput.section) + 1;
     $('#panel'+nextSec).addClass('in active');
     $('li:nth-child('+this.otpInput.section+')').removeClass('active');
     $('li:nth-child('+nextSec+')').addClass('active');*/
    }else{
    $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) + 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+section+')').removeClass('active');
    $('li:nth-child('+nextSec+')').addClass('active');
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
  }
);
}

checkOTP(OTP){
  this.shared.verifyOTP(this.proposalInput.policy.applicationNumber, this.proposalInput.policy.productId, OTP)
  .subscribe(data =>{
    if(data.result == 'true'){
      $('#aiaOTPModal').modal('hide');
      $('#eighthTab').removeClass('tabdisable');
      $('#panel'+this.otpInput.section).removeClass('in active');
      var nextSec = Number(this.otpInput.section) + 1;
      $('#panel'+nextSec).addClass('in active');
      $('li:nth-child('+this.otpInput.section+')').removeClass('active');
      $('li:nth-child('+nextSec+')').addClass('active');
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
  this.shared.generateOTP(this.proposalInput.policy.applicationNumber, this.proposalInput.policy.productId, this.proposalInput.policy.productName, this.proposalInput.insured.mobile)
  .subscribe(data =>{
    this.otpRetires++;
    $('#loader').hide();
    if(data.result==0)
    $('#successOTPSentM').modal('show');
    else this.failedStatus= true;
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
isRenewalPaymentSame(){
  if(this.proposalInput.payment.isRenewalPaymentSame =='Y') {
    this.proposalInput.payment.renewalBankName = this.proposalInput.payment.payoutBankName;
    this.proposalInput.payment.renewalBankBranch = this.proposalInput.payment.payoutBankBranch;
    this.proposalInput.payment.renewalIFSCCode = this.proposalInput.payment.payoutIFSCCode;
    this.proposalInput.payment.renewalAccType = this.proposalInput.payment.payoutAccType;
    this.proposalInput.payment.renewalAccNo = this.proposalInput.payment.payoutAccNo;
    this.proposalInput.payment.renewalAccHolderName = this.proposalInput.payment.accountHolderName; 
  
   } else if (this.proposalInput.payment.isRenewalPaymentSame =='N'){
    this.proposalInput.payment.renewalBankName = '';
    this.proposalInput.payment.renewalBankBranch = '';
    this.proposalInput.payment.renewalIFSCCode = '';
    this.proposalInput.payment.renewalAccType = '';
    this.proposalInput.payment.renewalAccNo = '';
    this.proposalInput.payment.renewalAccHolderName = this.proposalInput.payment.accountHolderName; 
   }
}
isProposerSameInsureds(value) {
			
  console.log(value);
  if(value=='Y') {
    //console.log(this.proposalInput.proposer);
    this.proposalInput.proposer.isProposerInsuredSame ="Y";
    this.proposalInput.insured.isProposerInsuredSame ="Y";
    this.proposalInput.proposer = this.proposalInput.insured;
    this.proposalInput.proposer.relationshipWithLi = "20";
    this.proposalInput.insured.relationshipWithLi = "20";
    this.proposalInput.payment.accountHolderName =  this.proposalInput.proposer.firstName + " " + this.proposalInput.proposer.lastName;
    //this.proposalInput.payment.renewalAccHolderName =  this.proposalInput.proposer.firstName + " " + this.proposalInput.proposer.lastName;
  }
  else if(value=='N')
  {
    this.proposalInput.proposer.isProposerInsuredSame ="N";
    this.proposalInput.insured.isProposerInsuredSame ="N";
    this.proposalInput.proposer.title="";
    this.proposalInput.proposer.firstName="";
    this.proposalInput.proposer.middleName="";
    this.proposalInput.proposer.lastName="";
    this.proposalInput.proposer.dob="";
    this.proposalInput.proposer.ageProofType="";
    this.proposalInput.proposer.idProofType="";
    this.proposalInput.proposer.addressProofType="";
    this.proposalInput.proposer.gender="";
    this.proposalInput.proposer.nationality="";
    this.proposalInput.proposer.otherNationality="";
    this.proposalInput.proposer.isOtherCitizenship="";
    this.proposalInput.proposer.otherCitizenshipCountry="";
    this.proposalInput.proposer.isOtherCountryTaxResi="";
    this.proposalInput.proposer.otherCountryTaxNo="";
    this.proposalInput.proposer.contacts=[];
    this.proposalInput.proposer.pan="";
    this.proposalInput.proposer.relationshipWithLi = "";
    this.proposalInput.insured.relationshipWithLi = "";
    this.proposalInput.proposer.isExistingPolicyHolder="N";
    this.proposalInput.proposer.existingPolicyNo =  "N";
       this.proposalInput.proposer.age= "";
       this.proposalInput.proposer.birthCity =  "";
       this.proposalInput.proposer.birthState =  "";
       this.proposalInput.proposer.fatherSpouseFirstName =  "";
       this.proposalInput.proposer.fatherSpouseLastName =  "";
       this.proposalInput.proposer.maritalStatus =  "";			    
       this.proposalInput.proposer.pan = "";
       this.proposalInput.proposer.isOtherCountryTaxResi =  "";
       this.proposalInput.proposer.isReqForPromoOffers =  "";
       this.proposalInput.proposer.isReqForEDocument =  "";
       this.proposalInput.proposer.isReqForEPolicyInfo =  "";
       this.proposalInput.proposer.incomeProofType =  "";
       this.proposalInput.proposer.insurancePurpose =  "";
       this.proposalInput.proposer.isPEP= "";
       this.proposalInput.proposer.isAadhaarAuthenticated =  "";
       this.proposalInput.proposer.isAadhaarAddressChanged =  "";
       this.proposalInput.insured.isProposerSameInsured = "N";
    this.proposalInput.proposer.employmentDetails = {};
    this.proposalInput.proposer.address = [];
    this.proposalInput.proposer.contacts = [];
    this.proposalInput.proposer.nationality="";
    this.proposalInput.proposer.pan="";
    this.proposalInput.proposer.ageProofType = "";
    this.proposalInput.proposer.addressProofType = "";
    this.proposalInput.proposer.incomeProof="";
    this.proposalInput.proposer.aadhar = "";
  }
  this.validateProposerData();
  console.log(this.proposalInput.proposer);
  console.log(this.proposalInput.insured);
}
populateConcat(){
			
  this.proposalInput.proposer.contacts = [];
  if (this.proposalInput.proposer.email != "" && this.proposalInput.proposer.email != null){
    var contact =<any> {}
    contact.contactType = "email";
    contact.contactText = this.proposalInput.proposer.email;
    this.proposalInput.proposer.contacts.push(contact);
  }
  if (this.proposalInput.proposer.mobile != "" && this.proposalInput.proposer.mobile != null){
    var contact =<any> {}
    contact.contactType = "mobile";
    contact.contactText = this.proposalInput.proposer.mobile;
    this.proposalInput.proposer.contacts.push(contact);
  }
  
  this.proposalInput.insured.contacts = [];
  if (this.proposalInput.insured.email != "" && this.proposalInput.insured.email != null){
    var contact = <any>{}
    contact.contactType = "email";
    contact.contactText = this.proposalInput.insured.email;
    this.proposalInput.insured.contacts.push(contact);
  }
  if (this.proposalInput.insured.mobile != "" && this.proposalInput.insured.mobile != null){
    var contact =<any> {}
    contact.contactType = "mobile";
    contact.contactText = this.proposalInput.insured.mobile;
    this.proposalInput.insured.contacts.push(contact);
  }
}
addEditAddress(type , action, i, address)
		{
      this.selectedAddress = {};
        	this.addressList = this.proposalInput.insured.address;
        	
        	if (type == "proposer"){
        		this.addressList = this.proposalInput.proposer.address;
        	}
			//console.log(address);
			if (action == "Add") {
        this.address = {};
        this.addressType = '';
        this.inputAddress.action= action;
        this.inputAddress.type= type;
        this.address.index=i;
          $('#newAddressModal').modal('show');
      }else
			{
				if (type == "proposer"){
					this.proposalInput.proposer.address.splice(i,1);
					this.validateProposerData();
	        	} else
	        	{
              this.addressDetails = this.insurerMaster.AddressType;
	        		this.proposalInput.insured.address.splice(i,1);
              this.validateInsuredData();
              this.addressList = this.proposalInput.insured.address;
	        	}
				
			}
    }
getCities(state){
  this.shared.getCityForState(this.proposalInput.insurerId, state, '')
  .subscribe(data =>{
    this.insurerMaster.City=data.result;
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
setAddress(address){
  this.address.addressLine1 =  this.proposalInput.insured.address[0].addressLine1;
  this.address.addressLine2 =  this.proposalInput.insured.address[0].addressLine2;
  this.address.addressLine3 =  this.proposalInput.insured.address[0].addressLine3;
  this.address.landmark =  this.proposalInput.insured.address[0].landmark;
  //this.address.area =  this.proposalInput.insured.address[0].area;
  //this.address.country =  this.proposalInput.insured.address[0].country;
  this.address.countryCode =  this.proposalInput.insured.address[0].countryCode;
  //this.address.district =  this.proposalInput.insured.address[0].district;
  //this.address.city =  this.proposalInput.insured.address[0].city;
  this.address.cityCode =  this.proposalInput.insured.address[0].cityCode;
  this.address.state =  this.proposalInput.insured.address[0].state;
  this.address.stateCode =  this.proposalInput.insured.address[0].stateCode;
  this.address.pincode =  this.proposalInput.insured.address[0].pincode;
} 
submitNewAddress(){
  if(this.address!=undefined){
    $('#newAddressModal').modal('hide');
    if (this.inputAddress.action == "Add"){
      this.address.country = this.getMasterValue('Country', this.address.countryCode);
      this.address.city = this.getMasterValue('City', this.address.cityCode);
      if (this.inputAddress.type == "proposer"){
        this.proposalInput.proposer.address.push(this.address);
        this.validateProposerData();
          } else
          {
            this.proposalInput.insured.address.push(this.address);
            this.validateInsuredData();
             this.addressDetails = this.insurerMaster.AddressType.filter(item => item.value != this.addressType.value);
          }
      
      
    }else
    {
      // find out the address index and then substitute
      this.proposalInput.insured.address[this.address.index]= this.address;
    }
    //console.log(this.proposalInput.proposer.address);
  }
}  
addEditFamilyMember(action, i, member){
  if (action == "Add"){
    this.family = member;
    this.insurerMaster.HealthCode.forEach(value => {
      if (value.id != "A"){
        this.healthstates.push(value);
      }
    });
    $('#healthHistoryModal').modal('show');
  }else if (action == "delete")
  {
    this.proposalInput.familyHealth.splice(i,1);
  }
  this.validateHealthPage();
}
submitHealth(family){
  if(family!=undefined){
  this.proposalInput.familyHealth.push(family);
  $('#healthHistoryModal').modal('hide');
  }
} 
familyHealthComplete(){
			
  if (this.loading){
    return false;
  }
  var fatherCount = 0;
  var motherCount = 0;
  var healthComplete = false;
  var hasFather = false;
  var hasMother = false;
  var index= 0;
  for(var i=0; i<this.proposalInput.insured.medicalQuestions.length; i++){
        if(this.proposalInput.insured.medicalQuestions[i].id == 'IsFamily60'){
          index = i;
        }
  }
  if(this.proposalInput.insured.medicalQuestions[index].details != ''){
  this.proposalInput.insured.medicalQuestions[index].details.forEach(element => {
    if(element.member=="96") {
      hasFather = true;
      fatherCount++;
    }
    if(element.member=="97") {
      hasMother = true;
      motherCount++;
    }
  })
}
  if (hasFather && hasMother){
    healthComplete = true;
    this.familyHealthStatus = true;
  }
  
  if(motherCount !=1 || fatherCount != 1){
    healthComplete = false;
    this.familyHealthStatus = false;
  }
  return healthComplete;
}
lsComplete(){
			
  if (this.loading || typeof(this.proposalInput.insured) == "undefined"){
    return false;
  }
  var valid = true;
  this.pageErrors.healthError = false;
  var questionId = 0;
  
  for (var i =0; i<this.proposalInput.insured.personalQuestions.length; i++){
    var question = this.proposalInput.insured.personalQuestions[i];
    if (question.isYesNo == "Y" ){
      if (question.hasOwnProperty("details") && question.details.length>0){
        continue;
      }else
      {
        this.pageErrors.healthError = true;
        valid = false;
        break;
      }
    }
  }
  return valid;
}
addEditLifeStyleMember (questionId, action ,i, data){
  this.qIndex = 0;
  this.inputAddress.action = action;
  this.inputAddress.questionId = questionId;
			for (var k=0; k<this.proposalInput.insured.personalQuestions.length; k++){
				var item = this.proposalInput.insured.personalQuestions[k];
				if (item.id == questionId){
					this.qIndex = k;
				}
			}	
			console.log(this.qIndex);
			
			var currTemplate = "";
      var currCtrl = "";
      if (action == "Add") {
        switch (questionId){
          case "IsArmedForces":
              this.isArmedForcesDetails = {};
              $('#defenceModal').modal('show');
              currCtrl = "defenceCtrlAia";
              break;
          case "IsOccupationHazardous":
              this.isOccupationHazardous = {};
              $('#occupationHazardousModal').modal('show');
              currCtrl = "occupationhazardousCtrlAia";
              break;
          case "IsOutsideIndiaVacc180days":
              this.isTravelOutsidesDetails = {}
              $('#traveloutsideModal').modal('show');
              currCtrl = "traveloutsideCtrlAia";
              break;
          case "IsNarcotic":
              this.isNarcoticDetails = {};
              $('#narcoticModal').modal('show');
              currCtrl = "narcoticCtrlAia";
              break;
          case "IsAlcoholic":
              this.isAlcoholicDetails = {};
              $('#alcoholicModal').modal('show');
              currCtrl = "alcoholicCtrlAia";
              break;
          case "IsTobaccoConsumed":
              this.isTobaccoDetails = {};
              $('#tobacoModal').modal('show');
              currCtrl = "tobaccoCtrlAia";
              break;
            case "IsAnyDeclinedInsurance":
                this.isDeclinedInsu = {};
                $('#declinedInsuranceModal').modal('show');
                currCtrl = "declinedInsuranceCtrlbsli";
                break;    
          }
      }else
      {
      this.proposalInput.insured.personalQuestions[this.qIndex].details.splice(i, 1);
      this.getLifeStyleAnswers(questionId);
      

  }
}
/*setOccupHaza(occupHaza){
    this.isOccupationHazardous.occupation
  }*/
addEditExistingInsurance(action, i, item) {

        if (action == "Add"){ 
          this.policy = item;
          $('#conInsuranceModal').modal('show');
        }else if (action == "delete")
        {
          this.proposalInput.existingInsurance.splice(i, 1);
        }
}
submitPrePolicy(){
  if(this.policy!=undefined)
  {
    $('#conInsuranceModal').modal('hide');
    this.proposalInput.existingInsurance.push(this.policy);
    
  }
}
addEditNominee(action, i, nominee)
{
  if (action == "Add") {
    this.inputAddress.action = action;
      if (this.proposalInput.insured.isProposerSameInsured=='Y'){
        nominee.isNominee = true;
        nominee.header = "Nominee";
      } else
      {
        nominee.isNominee = false;
        nominee.header = "Contingent Policy Holder";
      }
      this.nomineeData = nominee;
      this.relationshipWithInsured = '';
      $('#nomineeDataModal').modal('show');
    }else
    {
      this.proposalInput.nominee.splice(i,1);
      this.nomineeComplete();
    }
  }
  submitNomineeData(){
    if(this.nomineeData!=undefined)
  {
    if (this.inputAddress.action == "Add"){
      $('#nomineeDataModal').modal('hide');
      this.proposalInput.nominee.push(this.nomineeData);
      this.nomineeComplete();
    }
    
  }
  } 

  addEditMedical(questionId, action, qindex, qdetails){
   // if(action=='Add'){
      this.inputAddress.modalName = this.getMedicalHtml(this.proposalInput.insured.medicalQuestions[questionId].id);
      this.question = qdetails;
      this.inputAddress.id = questionId;
      $('#'+ this.inputAddress.modalName).modal('show');
      if(this.inputAddress.modalName == 'healthHistoryModal'){
      this.proposalInput.insured.medicalQuestions[questionId].details.splice(qindex, 1);
      this.familyHealthComplete();
      }
    //}
  }
  addEditFemaleMedical(questionId, action, qindex, qdetails){
    this.inputAddress.modalName = this.getMedicalHtml(this.proposalInput.insured.femaleHealthQuestions[questionId].id);
    this.question = qdetails;
    this.inputAddress.id = questionId;
    $('#'+ this.inputAddress.modalName).modal('show');
  }
  getMedicalHtml(quesId){
			
    var output = <any>{};
    switch(quesId) {
    case "IsPhysicalyDeformed":
      output.name = "PolioModal";
      break;
    case "IsAdvisedSurgicalOperation":
      output.name = "MedicalCheckupModal";
      break;
    case "IsFamily60":
      output.name = "healthHistoryModal";
      break;   
    case "IsAnyDeclinedInsurance":
      output.name = "declinedInsuranceModal";
      break;
    case "IsCancer":
      output.name = "TumorModal";
      break;
   /* case "IsUndergoneTreatment":
      output.name = "";
      break;*/
    case "IsHormonal":
      output.name = "DiabetesModal";
      break;
    /*case "IsBP":
      output.name = "HypertensionModal";
      break;*/
    case "IsCardio":
      output.name = "HeartDisorderModal";
      break;
    /*case "IsENT":
      output.name = "";
      break;*/
    case "IsMentalDisorder":
      output.name = "MentalHealthModal";
      break;
    case "IsRespiratory":
      output.name = "RespHealthModal";
      break;
    /*case "IsAnaemicOrBloodDisorderP":
      output.name = "";
      break;*/
    case "IsArthritisOrBoneDisorder":
      output.name = "SkeletalModal";
      break;
    case "IsHIV":
      output.name = "HIVModal";
      break;
    case "IsKidneyDisorder":
      output.name = "RenalModal";
      break;
    case "IsDigestive":
      output.name = "";
      break;
    case "IsWeightChange":
      output.name = "";
      break;
    case "IsOtherIllness":
      output.name = "";
      break;
    case "IsHeartSurgery":
      output.name = "";
      break;
    case "IsGoodHealth":
      output.name = "";
      break;
    case "IsAbsentWork":
      output.name = "";
      break;
    case 'IsFamily60':
      output.name = "";
      break;  
    case "IsPregnant":
      output.name = "PregnancyModal";
      break;
    case "IsGynInvest":
    case "IsComplications":
    case "IsSufferingGynaecologicalPrblms":
      output.name = "GynecologicalModal";
      break;
      
    }
    
    return output.name;
  } 
  checkMedical(i, value, questionId){
    if (value == "Y" && questionId !='IsGoodHealth'){
      this.proposalInput.insured.medicalQuestions[i].details = [];
      this.isAllow = false;
      if(questionId == 'IsFamily60')
      this.familyHealthComplete();
      //this.familyHealthStatus = true;
      //console.log()
    }else if (value == "Y" && questionId =='IsGoodHealth'){
      this.proposalInput.insured.medicalQuestions[i].details = [];
      this.isAllow = true;
    }
    else 
    {
      this.proposalInput.insured.medicalQuestions[i].details = [];
      this.isAllow = true;
      //this.familyHealthStatus = false;
    }
  }
  checkFemaleMedical(i, value){
    if (value == "Y"){
      this.proposalInput.insured.femaleHealthQuestions[i].details = [];
      this.isAllow = false;
      //console.log()
    }
    else
    {
      this.proposalInput.insured.femaleHealthQuestions[i].details = [];
      this.isAllow = true;
    }
  }
  submitMedicalQnsForm(question, modalName){
    if(question !=undefined){
      this.proposalInput.insured.medicalQuestions[this.inputAddress.id ].details.push(question);
      //this.proposalInput.insured.medicalQuestions[this.inputAddress.id ].type = questionType;
      this.showDetails = true;
      console.log(this.proposalInput.insured.medicalQuestions);
      this.isAllow = true;
      if(modalName == 'healthHistoryModal')
      this.familyHealthComplete();
      $('#'+modalName).modal('hide');
    }
  }
  submitFemaleMedicalQnsForm(question, modalName){
    if(question !=undefined){
      this.proposalInput.insured.femaleHealthQuestions[this.inputAddress.id ].details.push(question);
      //this.proposalInput.insured.medicalQuestions[this.inputAddress.id ].type = questionType;
      this.showDetails = true;
      console.log(this.proposalInput.insured.femaleHealthQuestions);
      this.isAllow = true;
      $('#'+modalName).modal('hide');
    }
  }
  allowFun(index, qnsDetail){
    this.proposalInput.insured.medicalQuestions[index].details = qnsDetail;
    this.isAllow = true;
  }
  isFormNeeded(quesId) {
    var needed = false;
    switch(quesId) {
    case "IsPhysicalyDeformed":
    case "IsAdvisedSurgicalOperation":
    case "IsCancer":
    case "IsHormonal":
    case "IsBP":
    case "IsCardio":
    case "IsMentalDisorder":
    case "IsRespiratory":
    case "IsArthritisOrBoneDisorder":
    case "IsHIV":
    case "IsKidneyDisorder":
    case "IsFamily60":
    case "IsAnyDeclinedInsurance":
      needed= true;
      break;
    }
    
    return needed;
  }
  AddFundRow (){
    var fund = <any> {};
    fund.fundId = "";
    fund.fundAllocation = 0;
    this.proposalInput.funds.push(fund);
  }
  
  DeleteFundRow (i){
    this.proposalInput.funds.splice(i);
    this.validateFundDetails();
  } 
  showIllustration (){
    //this.illustrationViewed = true;
    //this.checkDocumentStatus();
    window.open(this.bi.illusUrl);
    
  }
  checkDocumentStatus(index){
    this.docPages[index].status = '';
    this.docPages[index].errorText = '';
    this.readytoUpload = true;
    var tobeUploaded = <any>[];
    tobeUploaded[index] = (<HTMLInputElement> document.getElementById("file"+index));
   
    var start = tobeUploaded[index].files[0].name.indexOf(".");
    var ext = tobeUploaded[index].files[0].name.substr(Number(start)+1);
    
      if (tobeUploaded[index].files[0].size > 1024 * 1024 * 2){
      this.docPages[index].status = 3;
      this.docPages[index].errorText = "File too large";
      this.readytoUpload = false;
      }else if (ext != "pdf" && ext != "png" && ext != "jpg" && ext != "jpeg"){
      this.docPages[index].status = 3;
      this.docPages[index].errorText = "Invalid file type";
      this.readytoUpload = false;
      }else if(this.fileDocs.displayName == 'Photograph' && ext != "png" && ext != "jpg" && ext != "jpeg"){
        this.docPages[index].status = 3;
        this.docPages[index].errorText = "Invalid file type for photograph";
        this.readytoUpload = false;
      }else{
        this.filesUploaded[index] =  tobeUploaded[index].files[0];
      }
      if(ext == 'png' || ext == 'jpg' || ext == 'jpeg'){
        if ( tobeUploaded[index].files &&  tobeUploaded[index].files[0]) {
          this.showCanvas = true;
         // var offset = 10;
          var reader = new FileReader();
          
          reader.onload = (e: Event & { target: { result: string } }) =>{
              $('#blah'+index).attr('src', e.target.result);
              this.mergeImg.push(e.target.result);
          }

          reader.onloadend = () =>{
            var img;
            var imgHeight = null;
            var canvas =<HTMLCanvasElement> document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");

          for(var i=0; i<this.mergeImg.length; i++){
              img = document.getElementById("blah"+i);
              //canvas.width = (<HTMLInputElement> document.getElementById("blah0")).width;
              if(i>0){
              imgHeight =  (<HTMLInputElement> document.getElementById("blah"+(i-1))).height;
              }
              ctx.drawImage(img, 100,  imgHeight+20);
              //ctx.globalAlpha = 0.5;
            }
           
          }
        
          reader.readAsDataURL( tobeUploaded[index].files[0]);
          this.showPreview[index] = true;

        }
      }

 }
 dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = decodeURI(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}
 
 uploadDocs(docNumber){
  this.documentError={key:"",errorPirnt:[]};
   this.docUploaded = true;
   this.count = 0;
  //$('#loader').show();
  //locate the file element meant for the file upload.
  let inputEl;
  if(this.showCanvas){
    var canvas = <HTMLCanvasElement> document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL("image/png");
    inputEl = this.dataURItoBlob(dataURL);
  }else{
    inputEl = this.filesUploaded[0];
  }
 
  //get the total amount of files attached to the file input.
     // let fileCount: number = inputEl.length;
      //let countDocs = fileCount;
  //create a new fromdata instance
  //check if the filecount is greater than zero, to be sure a file was selected.
     // if (fileCount > 0) { // a file was selected
      //for(var i=0; i< fileCount; i++){
      //var index = i;
      this.shared.uploadUrl(this.URL, inputEl, this.docPages[0], this.proposalInput)
     .subscribe(data=>{
      this.docUploaded = false;
      this.readytoUpload = false;
      this.showPreview = false; 
      if (!data.hasOwnProperty("error")){
        console.log(data);
        $('#uploadModal').modal('hide');
        $("#successfullUpload").modal('show');
       
        document.getElementById('sucessStatus'+docNumber).innerHTML = "Uploaded";
        document.getElementById('sucessStatus'+docNumber).style.color = "green";
        this.docCount++;
        if(this.docCount >= this.filesToUpload.length-1)
          this.allowSubmit = true;
        else 
          this.allowSubmit = false;  
      } else
      {
        this.documentError={key:"The document can't be uploaded due to following error(s)",errorPrint:[]}
        var str=data['error'];
        this.documentError.errorPrint=str.split(";");
      }
  
    },
    error => {
      if(error.status == 401)
      {
      let rtnUrl = window.location.href.split("=")[1];
      this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/aiaLifeProposal?proposalKeys='+rtnUrl }});
      }else{
      this.docUploaded = false;
      //this.showPreview = false;
      this.documentError={key:"Server Down, we are unable to upload the document. Please try after sometime!", errorPrint:[]}
      }  
    });
 //}
  //}
   /* this.inputAddress.key = Object.keys(value)
    if (typeof(item.fileName) != "undefined" && item.fileName != ""){
         // fd.file = item.fileName;
          //var filename = item.fileName.replace(/\\/g, "\\\\");
          formData.append("file",item.fileName)  
          formData.append('insurerId',this.proposalInput.insurerId);
          formData.append('docId',item.docId);
          formData.append('appId', this.proposalInput.policy.applicationNumber);
          formData.append('agentId',"DBS");
          formData.append('policyNo',this.proposalInput.policy.policyNo);
          formData.append('spCode',"004588531");
          /*var start = item.fileName.indexOf(".");
          var FileExt = item.fileName.substr(Number(start)+1);
          switch(FileExt){
            case 'pdf': fileType = 'application/pdf';
                        break;
            case 'png': fileType = 'image/png';
                          break;
            case 'jpg': fileType = 'image/jpeg';
                          break;
            case 'jpeg': fileType = 'image/jpeg';
                          break;                                 
          }
          fd.append("type",fileType);
          this.uploadingDoc = true;
          this.shared.uploadUrl(formData)
          .subscribe(data=>{
           console.log(data.fileUrl);
          });
    }*/ 
  
        
}
checkUploadCompletion() {
			
  var complete =true;
  var error =false;
  /*this.filesToUpload.forEach(value => {
    if (value.status != 2 ){
      complete =false;
    }
    
    if (value.status == 3 ){
      error = true;
    }
    
    if (value.status == 1 ){
      this.uploadingDoc = true;
    }
  })*/
  
  if (complete && !error) {
    // Check if there is an error				
    this.submitProposal();
  }
  
  if (error) {
    this.uploadingDoc = false;
  }
  
}
submitProposal(){
  $('#loader').show();
  $(document).ready(function(){
   $(this).scrollTop(0);
  });
  if (this.proposalInput.insured.isProposerSameInsured == "Y"){
    this.proposalInput.proposer.relationshipWithLi = "20";
    this.proposalInput.insured.relationshipWithLi = "20";
    this.proposalInput.proposer = this.proposalInput.insured;
  }
 // $("#successfullUpload").modal('show');
  var healthProposal = this.proposalInput;
  console.log(JSON.stringify(healthProposal));
  this.shared.submitProposalLife(healthProposal, this.proposalInput.insurerId, this.proposalInput.productId)
  .subscribe(
    data =>{
    this.proposalError={key:"",errorPrint:[]}
   if (!data.hasOwnProperty("error")){
       // $('#loader').hide();
       this.proposalResuestId = data.requestId;
      
      this.iterations = 0;
       this.resultPromise = setInterval(() => {
         this.getProposalSubmissionResults(); 
       }, 5000);
        
      //$('li:nth-child(9)').addClass('active');
      } else
      {
      $('#loader').hide();
      this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
      var str=data.error;
      this.proposalError.errorPrint=str.split(";")
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
      $('#loader').hide();
     if(data.hasOwnProperty("error")) {
        clearInterval(this.resultPromise);
        this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
        var str=data.error;
        this.proposalError.errorPrint=this.cleanArray(str.split(";"))
        console.log(this.proposalError)
      
      } else if(data.hasOwnProperty('PolicyNo'))
      { 
        this.proposalInput.policy.insurerPolicyNo = data.PolicyNo;
        if(data.hasOwnProperty('payUrl')){
        this.proposalInput.policy.payUrl = data.payUrl;
        this.payVisible = true;
        }else {
          this.payVisible = false;
        }
        clearInterval(this.resultPromise);
        this.proposalError={key:"",errorPirnt:[]}
        this.tabStatus.eighthComplete = 'done';
       // $('#ninethTab').removeClass('tabdisable');
        $('#panel7').removeClass('in active');
        $('#panel8').addClass('in active');
        $('li:nth-child(7)').removeClass('active');
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
    }
  );
}
showTC() {
			
  if (this.tcVisible){
    this.tcVisible = false;
  } else
  {
    this.tcVisible = true;
  }
  //this.checkDocumentStatus()
}
getRequirements(){
			
  //this.loading = true;
    
              
  var biInput = <any>{};
  
  biInput.productType = this.proposalInput.policy.productType;
  biInput.productId = this.proposalInput.policy.productId;
  biInput.appNo = this.proposalInput.policy.applicationNumber;
  biInput.planId =  this.proposalInput.policy.planId;
  biInput.pt = this.proposalInput.policy.pt;
  biInput.ppt = this.proposalInput.policy.ppt;
  biInput.mode = "1" //this.proposalInput.policy.mode;
  biInput.ap = this.proposalInput.policy.policyPremium;
  biInput.sa = this.proposalInput.policy.basicSumAssured;
  if (biInput.productType == "ULIP") {
    biInput.premiumMultiple = Number(biInput.sa)/Number(biInput.ap);
  }
  biInput.ownage = this.proposalInput.proposer.age;
  biInput.insage = this.proposalInput.insured.age;
  biInput.DOB = this.proposalInput.insured.dob;
  biInput.owngender = this.proposalInput.proposer.gender;
  biInput.insgender = this.proposalInput.insured.gender;
  biInput.ownname = this.proposalInput.proposer.firstName + " " + this.proposalInput.proposer.lastName;
  biInput.insname = this.proposalInput.insured.firstName + " " + this.proposalInput.insured.lastName;;
  biInput.nrv = this.proposalInput.insured.nrv;
  biInput.relPeriod = this.proposalInput.insured.relPeriod;
  biInput.rating = this.proposalInput.policy.rating;
  if ( this.proposalInput.insured.employmentDetails.occupation == "Salaried"
  || this.proposalInput.insured.employmentDetails.occupation == "Self Employed"){
    biInput.occupationCode = "1";
  } else
  {
    biInput.occupationCode = "3";
  }
  
  // add Riders
  biInput.riders = this.addRiders();
  //
  
  if (this.proposalInput.policy.productType=='ULIP'){
    biInput.funds = this.proposalInput.funds;
  }
  
  console.log(biInput);

  this.shared.getBI(biInput)
  .subscribe(data=>{
      this.illustration={key:"",errorPrint:[]};
      if (!data.hasOwnProperty("error")){
        this.bi = data;
        this.proposalInput.illustrationUrl = this.bi.illusUrl;
        this.illustrationViewed = true;
        // Check the premium and populate. will uncomment once it get sorted out, no rider availbale
        //this.proposalInput.policy.totalPremium = Math.round(this.bi.installmentPremiumPayable);
        //this.proposalInput.policy.modalPremium = Math.round(this.bi.modalPremium);
        this.proposalInput.policy.riderPremium = 0;
        if (this.bi.riderPremium) {
          this.proposalInput.policy.riderPremium = this.bi.riderPremium;
        }
        
        //this.proposalInput.policy.annualPremium = Math.round(this.bi.annualPremium);
        //this.proposalInput.policy.serviceTax = Math.round(this.bi.serviceTax);
        
        //
        if (this.bi.medicalReq.length > 0) {
          this.bi.isMedical = true
        } else
        {
          this.bi.isMedical = false
        }
       // this.active = 6;
      }else{
        this.illustration={key:"Illustration couldn't be viewed due to the following errors",errorPrint:[]}
        var str=data.error;
        this.illustration.errorPrint=this.cleanArray(str.split(";"))
      }
     // this.loading = false;
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
addRiders(){
			
  var riders = [];
  
  var rider = <any>{};
  
  if (this.proposalInput.insured.age < 18) {
    rider.name = "WOP";
    riders.push(rider);
  } else
  {
    rider.name = "ADD";
    rider.sa = "5000000";
    riders.push(rider);rider = {};
    rider.name = "HOC";
    rider.sa = "1500000";
    riders.push(rider);rider = {};
    rider.name = "SC";
    rider.sa = "1500000";
    riders.push(rider);rider = {};
    rider.name = "CI";
    rider.sa = "5000000";
    riders.push(rider);rider = {};
  }
  
  return riders;
  
}
submitPersonalQns(output, modalName){
  	if(typeof(output)!=undefined) {
							if (this.inputAddress.action == "Add")
							{
								if (this.inputAddress.questionId == "IsOutsideIndiaVacc180days"){
									output.seq = "Questionaire-" + Number(this.proposalInput.insured.personalQuestions[this.qIndex].details.length + 1);
								}
								this.proposalInput.insured.personalQuestions[this.qIndex].details.push(output);
								this.validateHealthPage();
                this.getLifeStyleAnswers(this.inputAddress.questionId);
                $('#'+modalName).modal('hide');
							}
}
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

editFields(index, section)
{
 $('#panel'+index).addClass('in active');
 $('#panel'+section).removeClass('in active');
 $('li:nth-child('+index+')').addClass('active');
 $('li:nth-child('+section+')').removeClass('active');
}


setAddressTypeID(addrsTypeObj){
  this.address.addressType = addrsTypeObj.id;
  this.address.addressTypeTitle = addrsTypeObj.value;
}
setRelationShip(reltnObj){
  this.nomineeData.relationshipWithInsured = reltnObj.id;
  this.nomineeData.reltnWithInsuredTitle = reltnObj.value;
  this.nomineeTitle = [];
  switch(reltnObj.value){
        case 'Father':
        case 'Grand Father': this.nomineeTitle.Title = this.insurerMaster.Title.filter(item => item.id !="Mrs" && item.id !="Ms." && item.id !='Master.');
                             this.nomineeData.gender='M';
                             break;
        case 'Mother':
        case 'Grand Mother':
                             this.nomineeTitle.Title = this.insurerMaster.Title.filter(item => item.id !="Mr." && item.id !="Ms." && item.id !='Master.');
                             this.nomineeData.gender='F';
                             break;
        case 'Daughter': 
        case 'Sister':      this.nomineeTitle.Title = this.insurerMaster.Title.filter(item => item.id !="Mr." && item.id !='Master.');
                             this.nomineeData.gender='F'; 
                             break;
        case 'Son':
        case 'Brother':
        case 'Grand Son':   this.nomineeTitle.Title = this.insurerMaster.Title.filter(item => item.id !="Ms." && item.id !='Mrs');
                             this.nomineeData.gender='M'; 
                             break;
        case 'Spouse':       if(this.proposalInput.insured.gender == 'M'){
                              this.nomineeTitle.Title = this.insurerMaster.Title.filter(item => item.id !="Master." && item.id !='Ms.' && item.id !='Mr.');
                              this.nomineeData.gender='F';
                              }else{
                              this.nomineeTitle.Title = this.insurerMaster.Title.filter(item => item.id !="Master." && item.id !='Ms.' && item.id !='Mrs');
                              this.nomineeData.gender='M';
                              }
                              break;                     
        default:             this.nomineeTitle.Title = this.insurerMaster.Title;
                             this.nomineeData.gender='';
                             break;                                                                               
  }
}
setTobacco(TobaccoType){
  this.isTobaccoDetails.TobaccoType = TobaccoType.value;
  this.isTobaccoDetails.TobaccoTypeId = TobaccoType.id;
}
setFamilymember(member){
  this.question.member = member.id;
  this.question.memberText = member.value;
}
setCity(city){
  this.address.city = city.value;
  this.address.cityCode = city.id;
}
setAlcoholType(AlcoholType){
  this.isAlcoholicDetails.AlcoholType = AlcoholType.value;
  this.isAlcoholicDetails.AlcoholTypeId = AlcoholType.id;
}
setNarcotic(NarcoticType){
  this.isNarcoticDetails.NarcoticType = NarcoticType.value;
  this.isNarcoticDetails.NarcoticTypeId = NarcoticType.id;
}
biViewed(e){
  if(e.target.checked)
    this.viewedBi = true;
    else this.viewedBi = false;
}
agreeTC(agree){
    if( typeof(agree) != 'undefined')
    {
      if(agree == 'agree')
      this.tcAgree = true;
      else this.tcAgree = false;
      $('#termsCondModal').modal('hide');
  //  this.proposalError.errorPirnt=[];
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
   getApplicationForm(){
    $(document).ready(function(){
      $(this).scrollTop(0);
    });
    $('#loader').show();
    this.pdfLoader = true;
    this.signedUrls = <any>{};
    this.addlDocs = [];
    this.shared.getPdfRequestId(this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo, this.proposalInput)
    .subscribe(data =>{
      if(data.hasOwnProperty("error")) {
        $('#loader').hide();
        this.pdfLoader = false;
        this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
        var str=data.error;
        this.proposalError.errorPrint=this.cleanArray(str.split(";"))
        console.log(this.proposalError)
      }else
      {
      console.log("Signed URL", data);
      this.iterations = 0;
      this.resultPromise = setInterval(() => {
        this.getPropSignedUrl(data.requestId); 
      }, 5000);
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

   getPropSignedUrl(requestId){
    this.iterations++;
		if (this.iterations >24) {
      $('#loader').hide();
      this.pdfLoader = false;
      this.proposalError={key:"Generating Application form couldn't be completed, the server didn't respond within 2 minutes. Please Retry!",errorPrint:[]}
			var str="";
			this.proposalError.errorPrint=this.cleanArray(str.split(";"));
      clearInterval(this.resultPromise);
    }
    this.shared.getSignedURL(requestId)
    .subscribe(data=>{
      $('#loader').hide();
      if(data.hasOwnProperty("error") || data.length ==0) {
        this.loading = false;
        this.pdfLoader = false;
        clearInterval(this.resultPromise);
        this.proposalError={key:"Generating Application form couldn't be completed due to the following errors",errorPrint:[]}
        var str=data.error;
        this.proposalError.errorPrint=this.cleanArray(str.split(";"));
      
      } else if(data.hasOwnProperty('result'))
      {
        clearInterval(this.resultPromise);
        this.proposalError={key:"",errorPrint:[]};
        this.signedUrls = data.result;
        var getValue;
        for (var i=0; i< data.result.addlDocs.length;i++) {
          getValue = Object.keys(data.result.addlDocs[i])[0];
          this.addlDocs.push({key: getValue, value: data.result.addlDocs[i][getValue]});
        }
        this.getAppForm = true;
        this.pdfLoader = false;
       // window.open(data.result, '_blank');
       /*var fileName = data.result.slice(data.result.lastIndexOf("/")+1, data.result.indexOf("?"));
       var save = document.createElement('a');
       save.href = data.result;
       save.target = '_blank';
       save.download = fileName || data.result;
        save.click();
      var evt = new MouseEvent('click', {
           'view': window,
           'bubbles': true,
           'cancelable': true
       });
       save.dispatchEvent(evt);

       (window.URL).revokeObjectURL(save.href);*/
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
  addDoc(document, number){
    if(this.showCanvas){
      this.showCanvas = false;
    }
    this.documentNumber = number;
    this.count = 0;
    this.docPages = <any> [];
    this.showPreview = <any> [];
    this.fileDocs = document;
    //this.fileDocs.docName = document.displayName;
    this.documentError={key:"",errorPirnt:[]};
    $('#uploadModal').modal('show');
  }
  addPage() {
    var doc = <any>{};
    ++ this.count;
    this.showPreview[this.count-1] = false;
    doc.displayName = this.fileDocs.docType;
    doc.docId =  this.fileDocs.docId;
    doc.fileType = this.fileDocs.fileType;
    this.docPages.push(doc);
    console.log("Files to upload goes here", this.docPages);

  }
  deleteDoc(index){
    this.docPages.splice(index,1);
    this.showPreview.splice(index, 1);
    this.readytoUpload = true;
  }
  makePayment(){
   // window.open(this.proposalInput.policy.payUrl,'_blank');
   this.formBuild= true;
    setTimeout(function() {
      var myForm = <HTMLFormElement>document.getElementById('payUrlSubmit');
      myForm.submit();
    }, 3000);
  }
  userSignout(){
    this.router.navigate(['home/login']);
    sessionStorage.clear();
   
  }
  changePass(){
    let oldPwd = (<HTMLInputElement>document.getElementById('Old-Password')).value;
    let newPwd = (<HTMLInputElement>document.getElementById('New-Password')).value;
    let passwordOld=atob(sessionStorage.getItem("paswrd"))
    if(oldPwd != passwordOld)
    {
      var pass = document.getElementById('messageTouser');
        pass.innerHTML = "The old password entered is incorrect.";
         $('#resultModal').modal('show');
        
    }
    if(oldPwd == newPwd)
    {
      console.log('password not correct')
      var pass = document.getElementById('messageTouser');
        pass.innerHTML = "The new password should not be same as the old password";
         $('#resultModal').modal('show');     
    }
   
    this.shared.getchangePwd(this.userName, oldPwd, newPwd)
    .subscribe(
      data => {
       // console.log('dataoldpass::',oldPwd);
        
        if(data.result == "success"){
        var pass = document.getElementById('messageTouser');
        pass.innerHTML = "Password has been changed successfully";
         $('#resultModal').modal('show');
        $('#exampleModal').modal('hide');
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
  reportIssue(reportAnIssue:NgForm)
  {
   let rmId = sessionStorage.getItem("rmId");
   let currentUrl = window.location.href;
   let desc =  (<HTMLInputElement>document.getElementById('issueReport')).value;
   console.log('report value::',rmId+" "+desc+" "+currentUrl);

   this.shared.reportIssueService(rmId, currentUrl,desc)
 .subscribe(data =>{
 if(data.error)
 {
   console.log('error occured',data.error);
 }
 else{
   alert('Report Issue successfully sent to the authorized person.')
   console.log('Success service', data);
   reportAnIssue.form.reset();
   console.log('clear::',reportAnIssue.form.reset());
   
 }
 })
  }
  getCountryForadd(country){
    this.address.countryCode = country.id;
    this.address.country = country.value;
  }
  getPepDetails(){
    this.proposalInput.insured.pepDetails = <any> {};
  }
  getPepDetailsNri(){
    this.proposalInput.insured.nriDetails.pepDetails = <any> {};
  }
  submitNRIForm(){
    if(this.nriDetails!=undefined){
      this.nriDetails.country = this.getMasterValue('Country', this.nriDetails.countryCode);
      //this.nriDetails.city = this.getMasterValue('City', this.nriDetails.cityCode);
      this.proposalInput.insured.nriDetails = this.nriDetails;
      this.proposalInput.insured.residenceCountry = this.nriDetails.countryCode;
      this.setNationality();
      this.cancelActionNRI();

    }

  }
}

