import { Component, OnInit,ElementRef} from '@angular/core';
import { DatePipe } from '@angular/common'; 
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SharedService } from '../../../../sharedServices/shared.service';
import { AlertService } from '../../../../sharedServices/alert.service';
import { IMAGE_URL, uploadURL, accessKey, secretKey } from '../../../../sharedServices/config';
import { OrderByPipe } from '../../../../sharedServices/orderBy';
import { FormControl } from '@angular/forms';
import { Headers, Http, HttpModule, Response,RequestOptions, Request, RequestMethod} from '@angular/http';
import { RoundProp } from '../../../../sharedServices/mathRound';
import { NgForm } from '@angular/forms';
const URL = 'https://dbsuat-207905.appspot.com/fileUpload'
declare var jquery:any;
declare var $;


export interface State {
  id;
  value;
}
export interface City {
  id;
  value;
}



@Component({
  selector: 'app-bsli',
  templateUrl: './bsli.component.html',
  styleUrls: ['./bsli.component.css']
})
export class BsliComponent implements OnInit {
  public accessKey = accessKey;
  public secretKey = secretKey;
  public errLoad: boolean = false;
  public pdfLoader: boolean = false;
  public nomineeFlag: boolean = false;
  public uploadbutton: boolean = false;
  public nomineFlag: boolean = false;
  public alreadysubmittedProposal: boolean=false;
  public getAppForm:boolean=false;
  public signedUrl = null;
  public signedUrJointLife=null;
  public IsPregnant: boolean = false;
  public otpRetires: number = 0;
  public failedStatus: boolean = false;
  public successStatus: boolean = false;
  public otpError: boolean = false;
  public Viewillus: boolean = false;
  public otpInput = <any> {};
  public userName = null;
  public insurancePurpose=<any>[];
  public insurancePurposearray=<any>[];
  public download1=null;
  public firstName= null;
  public lastName= null;
  public IREmailaddress=null;
  public resultPromise;
  public iterations = 0;
  public proposalResuestId;
  public docCount:number = 0;
  public allowSubmit: boolean = false;
  public allowSubmitproposal: boolean = false;
  public showCanvas: boolean = false;
  public showPreview= <any>[];
  public payVisible:boolean = false;
  public fileDocs = <any>{}; 
  public docPages = <any>[];
  public countcertificate: number = 0;
  public count: number = 0;
  public documentNumber: number = 0;
  public mergeImg = <any>[];
  public mySelections=<any>[];
  public birthdate:any;
  public birthdatesecondaryinsured:any;
  public driver={};
  public driversec={};
  public InsNRIdetails=<any>{};
  public InsNRIdetailsaddressind=<any>{};
  public InsNRIdetailsaddressothr=<any>{};
  public InsNRIdetailscontact=<any>{};
  public InsNRIdetailssecarray=<any>[];
  public InsNRIOtherdetails=<any>{};
  public InsFNIOdetails=<any>{};
  public InsNRIForeigndetails=<any>{};
  public diver={};
  public driverdetils=<any>[];
  public driverdetilssec=<any>[];
  public tabstatus=<any>{}
  //public tabSucStatus=<any>[];
  public travelPlandetails=<any>{};
  public travelPlandetailssec=<any>{};
  public travelplanarray=<any>[];
  public travelplanarrayforsec=<any>[]
  public travelplanarrayforsec1=<any>[]
  public travelplanarray1=<any>[];
  public travelPlandetailsoveryr=<any>{};
  public travelPlandetailsoveryrsec=<any>{};
  public fullname=<any>{};
  public armedForces=<any>{};
  public armedForcessec=<any>{};
  public traveldetails=<any>{};
  public commondetails=<any>{};
  public commondetailssec=<any>{};
  public DocumentRefresh=<any>{};
  public traveldetailssec=<any>{};
  public totlatraveldetails=<any>[];
  public totlatraveldetailssec=<any>[];
  public totaldivingdetails=<any>[];
  public totaldivingdetailssec=<any>[];
  public addressType = null;
  public nriaddressstate=null;
  public appointeeRelationWithNominee=null;
  public disState="";
  public policyType=null;
  public addressSubType=null;
  public ridersumAssured=null;
  //public policyTypeTitle=null;
  public imagePath = IMAGE_URL;
  public URL = uploadURL;
  public proposalInput = <any>{};
  public covers=<any>[];
  public illustration = <any>{};
  public applicationError=<any>{};
  public pdfError=<any>{};
  public loading:boolean = true;
  public ABGvalue:boolean = false;
  public FNIOmandate:boolean=false;
  public countrycodeflag:boolean=false;
  public countrycodeflagsec:boolean=false;
  public coverFlag:boolean=false;
  public PIOmandate:boolean=false;
  public Othpersonalermandate:boolean=false;
  public illustrationbuttonflag:boolean=true;
  public viewillustrationflag:boolean=false;
  public inputTravel = <any>{};
  public inputDriver=<any>{};
  public inputNRI=<any>{};
  public inputDiving = <any>{};
  public insurerMaster = <any> [];
  public address1 = <any> [];
 // public fileuploadsecondaryIns=<any>[];
  public filesToUploadIns=<any>[];
  public healthstates = [];
  public requestData = <any>{};
  public applicationData= <any>{};
  public applicationDatasave= <any>{};
  public addressList = <any> {};
  public address = <any>{};
  public inputAddress = <any>{};
  public nomineeData = <any> [];
  public divercertification=<any>{};
  public divercertificationarray=[];
  public divercertificationarraysec=<any>[];
  public lifestyleDisplay = {};
  public lifestyleDisplaySec = {};
  public minorfamily = <any>{};
  public healthState = "";
  public deathCause = "";
  public biInputTag:boolean = false;
  public permaddressvar:boolean=false;
  public addFlag:boolean=false;
  public adbflag:boolean=false;
  public adbbothflag:boolean=false;
  public selectedAddress = {};
  public nomineeTitle = <any> [];
  public permaddresssec:boolean=false;
  public illustrationViewed: boolean = false;
  public armedforceflag:boolean=false;
  public tabStatus= <any> {
    firstComplete : 'indone',
    secondComplete : 'indone',
    thirdComplete : 'indone',
    fourthOpen :[],
    fourthDisabled :[],
   // fourthComplete:[],
   fourthComplete:'indone',
    fifthDisabled : true,
    fifthComplete : 'indone',
    sixthComplete:'indone',
    seventhComplete:'indone'
  }
  public pageErrors = <any> {
    insuredError: false,
    notAllowedError: false,
    medicalError: false,
    dateofdepartureError:false,
    insuredErrorText : "",
    medicalErrorText : "",
    notAllowedErrorText: "",
    dateofdepartureText:"",
    healthErrortravel:false,
     NRImandateComplete:false,
     NRImandateText:""
    

  };
  public coverstest=[
{
"applicable": "Y",
"coverId": "PAPASS",
"displayName": "UnNamed PA",
"isSelected": "N",
"netPremium": "750",
"premium":"885",
"sa":"10000"
},
{
  "applicable": "Y",
  "coverId": "PAPASS",
  "displayName": "UnNamed PA",
  "isSelected": "N",
  "netPremium": "750",
  "premium":"885",
  "sa":"10000"
  }
  ]
  public riders = [
    {"id" : "ADD",
     "name" : "ADB PLUS" ,
     "sa" : 0,
     "selected" : false,
     "display" : true
    },
    {"id" : "CI",
     "name" : "Critical Illness" ,
     "sa" : "",
     "selected" : false,
     "display" : false
    },
    {"id" : "SC",
     "name" : "Surgical Care" ,
     "sa" : "",
     "selected" : false,
     "display" : false
    },
    {"id" : "HOC",
     "name" : "Hospital Care" ,
     "sa" : "",
     "selected" : false,
     "display" : false
    }
  ];
     
  public filesToUpload = [	
    {"fileType": "CDF","displayName" : "CDF",  "docId": "121212", "fileName": ""}
    ,{"fileType": "CCR","displayName" : "CCR",  "docId": "13102", "fileName": ""}
    ,{"fileType": "FPF","displayName" : "Financial Profile Form",  "docId": "13103", "fileName": ""}
    ,{"fileType": "FTF","displayName" : "Financial Transaction Form",  "docId": "13103", "fileName": ""}
    ,{"fileType": "insuredPhoto","displayName" : "Insured Photograph", "docId": "121210",  "fileName": ""}
    ,{"fileType": "chequeleaf","displayName" : "Cancelled Cheque Leaf",  "docId": "111047", "fileName": ""}
  ];
  public fileuploadsecondaryIns = [
    {"fileType": "Secondary InsuredPhoto","displayName" : "Secondary Insured Photograph", "docId": "121154",  "fileName": ""}	
    ];
    public cityMaster:City[]=[
      {value:'Abohar',id:'1'},
      {value:'Agartala',id:'2'	},
      {value:'Agra',id:'3'	},
      {value:'Ahmedabad',id:'4'},
      {value:'Ahmednagar',id:'5'},
      {value:'Ajmer',id:'6'},
      {value:'Alapuzha',id:'7'},
      {value:'Allahabad',id:'8'	},
      {value:'Aluva',	id:'9'	},
      {value:'Alwar',	id:'10'	},
      {value:'Ambala',id:'11'	},
      {value:'Amravati',id:'12'	},
      {value:'Amritsar',id:'13'	},
      {value:'Anand',	id:'14'	},
      {value:'Anantapur',	id:'15'	},
      {value:'Angul',	id:'16'	},
      {value:'Ankleshwar',id:'17'	},
      {value:'Asansol',	id:'18'	},
      {value:'Aurangabad',id:'19'	},
      {value:'Balhotra (Rajasthan)',id:'20'	},
      {value:'Bangalore',id:'21'	},
      {value:'Bardoli',	id:'22'	},
      {value:'Bareilly',id:'23'	},
      {value:'Baroda',	id:'24'	},
      {value:'Bayad',	id:'25'	},
      {value:'Gujrat',	id:'26'	},
      {value:'Beawar'	,	id:'27'	},
      {value:'Bhagalpur',	id:'28'	},
      {value:'Bharatpur',	id:'29'	},
      {value:'Bharuch',	id:'30'	},
      {value:'Bhilai',	id:'31'	},
      {value:'Bhilwara',	id:'32'	},
      {value:'Bhopal',	id:'33'	},
      {value:'Bhubaneshwar',id:'34'	},
      {value:'Bhuj',	id:'35'	},
      {value:'Bikaner',	id:'36'	},
      {value:'Bilaspur',	id:'37'	},
      {value:'Bokaro',	id:'38'	},
      {value:'Bulandshashr',id:'39'	},
      {value:'Burdwan',	id:'40'	},
      {value:'Calicut',	id:'41'	},
      {value:'Chandigarh',	id:'42'	},
      {value:'Chennai',	id:'43'	},
      {value:'Chhindwara',id:'44'	},
      {value:'Cochin',	id:'45'	},
      {value:'Coimbatore',id:'46'	},
      {value:'Contai',	id:'47'	},
      {value:'Cuttak',	id:'48'	},
      {value:'Davangere',	id:'49'	},
      {value:'Dehradun', id:'50'	},
      {value:'Delhi',	id:'51'	},
      {value:'Dhanbad',	id:'52'	},
      {value:'Dibrugarh',	id:'53'	},
      {value:'Duliajan',	id:'54'	},
      {value:'Durgapur',	id:'55'	},
      {value:'Erode',	id:'56'	},
      {value:'Faridabad',	id:'57'	},
      {value:'Faridkot',	id:'58'	},
      {value:'Gandhinagar',	id:'59'	},
      {value:'Gandidham',	id:'60'	},
      {value:'Gangtok',	id:'61'	},
      {value:'Ghaziabad',	id:'62'	},
      {value:'Goa',	id:'63'	},
      {value:'Gorakhpur',	id:'64'	},
      {value:'Guntur',	id:'65'	},
      {value:'Gurdaspur',	id:'66'	},
      {value:'Gurgaon'	,	id:'67'	},
      {value:'Guwahati',	id:'68'	},
      {value:'Gwalior',	id:'69'	},
      {value:'Haldwani',	id:'70'	},
      {value:'Hapur',	id:'71'	},
      {value:'Hoshangabad',	id:'72'	},
      {value:'Hosur',	id:'73'	},
      {value:'Howrah',	id:'74'	},
      {value:'Hubli'	,	id:'75'	},
      {value:'Hyderabad',	id:'76'	},
      {value:'Ichalkaranji',	id:'77'	},
      {value:'Indore',	id:'78'	},
      {value:'Jabalpur'	,	id:'79'	},
      {value:'Jaipur'	,	id:'80'	},
      {value:'Jalandhar'	,	id:'81'	},
      {value:'Jammu'	,	id:'82'	},
      {value:'Jamnagar'	,	id:'83'	},
      {value:'Jamshedpur'	,	id:'84'	},
      {value:'Jaunpur'	,	id:	'85'	},
      {value:'Jhansi'	,	id:'86'	},
      {value:'Jodhpur'	,	id:'87'	},
      {value:'Kakinada'	,	id:'88'	},
      {value:'Kalyan'	,	id:'89'	},
      {value:'Kannur'	,	id:'90'	},
      {value:'Kanpur',	id:'91'	},
      {value:'Kapurthala'	,	id:'92'	},
      {value:'Karad'	,	id:'93'	},
      {value:'Karimnagar'	,	id:'94'	},
      {value:'Karnal'	,	id:'95'	},
      {value:'Karur'	,	id:'96'	},
      {value:'Kashipur',	id:'97'	},
      {value:'Khanna'	,	id:'98'	},
      {value:'Kishangarh'	,	id:'99'	},
      {value:'Rajasthan'	,	id:'100'	},
      {value:'Kolhapur'	,	id:'101'	},
      {value:'Kolkata',	id:'102'	},
      {value:'Kollam',	id:'103'	},
      {value:'Kota'	,	id:'104'	},
      {value:'Kurnool',	id:'105'	},
      {value:'Kurukshetra'	,	id:'106'	},
      {value:'Lucknow'	,	id:	 '107'	},
      {value:	 'Ludhiana'	,	id:	 '108'	},
      {value:	 'Madurai'	,	id:	 '109'	},
      {value:	 'Malappuram'	,	id:	 '110'	},
      {value:	 'Malegaon'	,	id:	 '111'	},
      {value:	 'Malkapur'	,	id:	 '112'	},
      {value:	 'Malout'	,	id:	 '113'	},
      {value:	 'Mandi H.P.'	,	id:	 '114'	},
      {value:	 'Mandigobindgarh'	,	id:	 '115'	},
      {value:	 'Mandsaur'	,	id:	 '116'	},
      {value:	 'Mangalore'	,	id:	 '117'	},
      {value:	 'Meerut'	,	id:	 '118'	},
      {value:	 'Mirayalguda'	,	id:	 '119'	},
      {value:	 'Mohali',	id:	 '120'	},
      {value:	 'Moradabad'	,	id:	 '121'	},
      {value:	 'Morbi'	,	id:	 '122'	},
      {value:	 'Mumbai'	,	id:	 '123'	},
      {value:	 'Murshidabad'	,	id:	 '124'	},
      {value:	 'Mysore',	id:	 '125'	},
      {value:	 'Nadia',	id:	 '126'	},
      {value:	 'Nagpur'	,	id:	 '127'	},
      {value:	 'Namakkal'	,	id:	 '128'	},
      {value:	 'Nanded'	,	id:	 '129'	},
      {value:	 'Nashik'	,	id:	 '130'	},
      {value:	 'Navsari'	,	id:	 '131'	},
      {value:	 'Neemuch'	,	id:	 '132'	},
      {value:	 'Nellore'	,	id:	 '133'	},
      {value:	 'Noida'	,	id:	 '134'	},
      {value:	 'Ongole'	,	id:	 '135'	},
      {value:	 'Pala'	,	id:	 '136'	},
      {value:	 'Panipat'	,	id:	 '137'	},
      {value:	 'Pathankot'	,	id:	 '138'	},
      {value:	 'Patiala'	,	id:	 '139'	},
      {value:	 'Patna'	,	id:	 '140'	},
      {value:	 'Phagwara'	,	id:	 '141'	},
      {value:	 'Pondicherry'	,	id:	 '142'	},
      {value:	 'Porbandar'	,	id:	 '143'	},
      {value:	 'Pune'	,	id:	 '144'	},
      {value:	 'Raipur'	,	id:	 '145'	},
      {value:	 'Rajamundry'	,	id:	 '146'	},
      {value:	 'Rajkot'	,	id:	 '147'	},
      {value:	 'Ratlam'	,	id:	 '148'	},
      {value:	 'Rewari'	,	id:	 '149'	},
      {value:	 'Rohtak'	,	id:	 '150'	},
      {value:	 'Ropar'	,	id:	 '151'	},
      {value:	 'Saharanpur'	,	id:	 '152'	},
      {value:	 'Salem'	,	id:	 '153'	},
      {value:	 'Sambalpur'	,	id:	 '154'	},
      {value:	 'Secunderabad'	,	id:	 '155'	},
      {value:	 'Shimoga'	,	id:	 '156'	},
      {value:	 'Silliguri'	,	id:'157'	},
      {value:	 'Sirsa'	,	id:	 '158'	},
      {value:	 'Solapur'	,	id:	 '159'	},
      {value:	 'Sonepat'	,	id:	 '160'	},
      {value:	 'Sriganganagar'	,	id:	 '161'	},
      {value:	 'Surat'	,	id:	 '162'	},
      {value:	 'Tezpur'	,	id:	 '163'	},
      {value:	 'Thane'	,	id:	 '164'	},
      {value:	 'Thiruvalla'	,	id:	 '165'	},
      {value:	 'Tinsukia'	,	id:	 '166'	},
      {value:	 'Tirunelveli'	,	id:	 '167'	},
      {value:	 'Tirupur'	,	id:	 '168'	},
      {value:	 'Trichy'	,	id:	 '169'	},
      {value:	 'Trivandrum'	,	id:	 '170'	},
      {value:	 'Udaipur'	,	id:	 '171'	},
      {value:	 'Ujjain'	,	id:	 '172'	},
      {value:	 'Valsad'	,	id:	 '173'	},
      {value:	 'Vapi'	,	id:	 '174'	},
      {value:	 'Varanasi'	,	id:	 '175'	},
      {value:	 'Vellore'	,	id:	 '176'	},
      {value:	 'Vijayawada'	,	id:	 '177'	},
      {value:	 'Yamuna Nagar'	,	id:	 '178'	},
                
    ];

  
  public masterLoaded: boolean = false;
  public menuLoaded: boolean = false;
  public formLoaded: boolean = false;
  public uploadList = {};
  public dateOptions = <any>{};
  public nomineeDobOptions =<any> {};
  public checkDateOptions = <any>{};
  public pastDateOptions = <any>{};
  public pastYearOptions=<any>{};
  public futureDateOptions = <any> {};
  public adultDobOptions = <any>{};
  public medicalOption = <any>{};
  public proposalError = <any>{};
  public illustrationError = <any>{};
  public documentError=<any>{};
  public application = <any>{};
  public family = <any>{};
  public isAlcoholicDetails = <any> {};
  public isTobaccoDetails = <any>{};
  public isTravelOutsidesDetails = <any> {};
  public policy = <any>{};
  public qIndex = 0;
  public appInput = <any>{};
  public disableRelSelect:boolean = false;
  public bi = <any>{};
  public question = <any>{};
  public filesUploaded: Array<any> = [];
  public filesToUpload1:Array<any>=[];
  public docUploaded: boolean = false;
  public readytoUpload: boolean = false;
  public uploadDocvalue:boolean=false;
  public Uploadbuttonenabled: boolean = false;
 // public uploadbuttonenabled: boolean = false;
  public uploadingDoc:boolean= false;
  public tcVisible:boolean = false;
  public appVisible:boolean=false;
  public jopintappVisible:boolean=false;
  public secInsuredHealthqns: boolean = false;
  public countryCode = [];
  public biAccepted: boolean = false;
  public eiaccountholdid: boolean = false;
  public termInput = <any>{};
  public fullname1:any;
  public middlename:any;
  public lastname:any;
  public secfirstname:any;
  public secmiddleName:any;
  public seclastName:any;
  public jointlife1:any;
  public appNo:any;
  public firstnamestorage:any;
  public firstnamestorage1:any;
  public middlenamestorage:any;
  public middlenamestorage1:any;
  public lastnamestorage:any;
  public lastnamestorage1:any;
  public errMessage1 = null;
  public errMessagepincode=null;
  public errMessageadbflag=null;
  public errMessage2 = null;
  public errMessage3 = null;
  public errMessage4= null;
  public errMessage5= null;
  public errMessage6= null;
  public errMessage7= null;
  public errMsgmedical1=null;
  public errMsgmedical2=null;
  public errMsgmedical3=null;
  public errMsgmedical4=null;
  public relationshipWithInsured = '';
  public errorCall:boolean = false;
  public errorCallpincode:boolean = false;
  public errorCall1:boolean = false;
  public errorCall2:boolean = false;
  public errorCall3:boolean = false;
  public errorCallmedical1:boolean = false;
  public errorCallmedical2:boolean = false;
  public errorCallmedical3:boolean = false;
  public errorCallmedical4:boolean = false;
  
  public errorCall6:boolean = false;

  //public errorCall4:boolean = false;
  public errorCal = [];
  public errorCalmin = [];
  public errorCalblank=[];
  public sumassuredflag:boolean=false;

  stateMaster: State[] = [

    {value:'ANDHRA PRADESH',id:'1'},
    {value:'ARUNACHAL PRADESH',	id:'2'},
    {value:'ASSAM',	id:'3'},
    {value:'BIHAR',	id:'4'},
    {value:'CHHATTISGARH',	id:'5'},
    {value:'DELHI',	id:'6'},
    {value:'GOA',	id:'7'},
    {value:'GUJARAT',id:'8'},
    {value:'HARYANA',id:'9'},
    {value:'HIMACHAL PRADESH',id:'10'},
    {value:'JAMMU & KASHMIR',	id:'11'},
    {value:'JHARKHAND',	id:'12'},
    {value:'KARNATAKA',	id:'13'},
    {value:'KERALA',id:'14'},
    {value:'MADHYA PRADESH',id:'15'},
    {value:'MAHARASHTRA',id:'16'},
    {value:'MANIPUR',id:'17'},
    {value:'MEGHALAYA',id:'18'},
    {value:'MIZORAM',id:'19'},
    {value:'NAGALAND',id:'20'},
    {value:'ORISSA',id:'21'},
    {value:'PUNJAB',id:'22'},
    {value:'RAJASTHAN',id:'23'},
    {value:'SIKKIM',id:'24'},
    {value:'TAMIL NADU',id:'25'},
    {value:'TRIPURA',id:'26'},
    {value:'UTTAR PRADESH',id:'27'},
    {value:'UTTARANCHAL',id:'28'},
    {value:'WEST BENGAL',id:'29'},
    {value:'ANDAMAN & NICOBAR ISLANDS',id:'31'},
    {value:'SILVASSA',id:'32'},
    {value:'CHANDIGARH',id:'33'},
    {value:'DADRA AND NAGAR HAVELI',id:'34'},
    {value:'PONDICHERRY',id:'35'},
    {value:'DIU AND DAMAN',id:'36'},
    {value:'UTTARAKHAND',id:'53'},
    {value:'TELANGANA',id:'78'}	
    
 ];
 
 public filteredCities: Observable<City[]>;
 public filteredStates: Observable<State[]>;  
 stateCtrl = new FormControl();
 public cityCtrl=new FormControl();
public errMesg = [];
public errMesgmin = [];
public errMesgblank=[];
 toppings = new FormControl();
//toppingList: Object[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

toppingList: Object[] = [
 
  {value:'Risk',id:'R'},
  {value:'Savings',	id:'S'},
  {value:'Childs Education',id:'E'},
  {value:'Childs Marriage',	id:'M'},
  {value:'Retirement Planning',id:'A'},
  {value:'Legacy Planning',	id:'L'},
  {value:'Family Protection',id:'F'},
  {value:'Protection against Health',	id:'H'},
  {value:'Wealth Creation',id:'W'},
  {value:'Cover Outstanding Loans',	id:'O'},
  {value:'Business Continuity',id:'B'},
  {value:'Tax Planning',id:'T'}
];

    
 constructor(private shared: SharedService, public http: Http, private datepipe: DatePipe, private router: Router, private alertservice: AlertService) { 
  
      this.filteredCities = this.cityCtrl.valueChanges.pipe( map(city => city ? this._filterCities(city) : this.cityMaster)
      );

      this.filteredStates = this.stateCtrl.valueChanges.pipe( map(state => state ? this._filterStates(state) : this.stateMaster)
      );
      

    
  //console.log("this.filteredStates",this.filteredStates)

  }
  
ngOnInit() {
  //this.proposalInput.insured.insuredDivingdetails=<any>[];
  //this.firstComplete();
  
  this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
 
    $('#traveldetails').hide();
    $('#traveldetailsjointLife').hide();
    $('#armedforcemodal').hide();
    $('#drivermodal').hide();
    $('#drivermodalsec').hide();
 $('#loader').hide();
    var dateToday=new Date();
    var yearMax=dateToday.getFullYear();
    var monthToday=dateToday.getMonth();
    var dayToday=dateToday.getDate();
    var yearMin=dateToday.getFullYear();
    var newYearMin=dateToday.getFullYear();
    var newYearMax=dateToday.getFullYear();
    var newMaxMonthToday=dateToday.getMonth();
    var newdayToday = dateToday.getDate();
   // console.log("dayToday",dayToday);
    this.checkDateOptions = {
      maxDate: new Date(),
      minDate: new Date(yearMax, monthToday-3, dayToday)
    }
    this.pastDateOptions = {
      maxDate: new Date()
      }
      this.pastYearOptions = {
       
        maxDate: new Date(yearMax, monthToday)
       }
    
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
      maxDate: new Date()
    };
    
    this.getthePage();
    
    
   
  }

  
  
 ngDoCheck(){
 
    if($('.modal-dialog').is(':visible')){
     $('body').css('position','fixed');
     }else{
       $('body').css('position','relative');
     }
   
    /* $('select > option').each(function()
     {
     $('<option class="dummy"></option>').insertBefore()
     });*/
    
     var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
     if (isiPad)
     {
    
      $('input').keydown( function(e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if(key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq( inputs.index(this)+ 1 ).focus();
        }
    });
        
     }
     
   } 
 
  
   getthePage(){
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
          this.applicationError={key:"",errorPrint:[]};
          if (data.hasOwnProperty("result")){
            this.applicationData = JSON.parse(data.result);
            console.log("this.applicationData",this.applicationData)
            this.applicationData.authentication = {"accesskey": this.accessKey,"secretkey": this.secretKey};
            this.proposalInput= this.applicationData.proposalData;
            this.covers=this.applicationData.proposalData.covers;
         
           this.covers=this.covers.sort(function(a,b) {return (a.displayName.toLowerCase() > b.displayName.toLowerCase()) ? 1 : ((b.displayName.toLowerCase() > a.displayName.toLowerCase()) ? -1 : 0);} );
           for(var i=0;i<this.covers.length;i++)
           {
            if(this.covers[i].coverId=='ADDP'&& this.covers[i].isSelected=='Y')
            {
              this.adbflag=true;
            }
            if(this.covers[i].coverId=='ADD'&& this.covers[i].isSelected=='Y')
            {
              this.addFlag=true;
            }
            if(this.adbflag==true &&  this.addFlag==true)
            {
              this.adbbothflag=true;
              this.errMessageadbflag="ADB Plus and ADD rider cant be select together please set one field to NO";
            }
            else
            {
              this.adbbothflag=false;
              this.errMessageadbflag="";
            }
           }
        
            this.proposalInput.policy.annualPremium = this.proposalInput.policy.basePremium;
           // console.log("this.proposalInput.insured.medicalQuestions",this.proposalInput.insured.medicalQuestions)
            sessionStorage.setItem('appNo',this.proposalInput.policy.applicationNumber);
            sessionStorage.setItem('birthdate',this.proposalInput.insured.dob);
            sessionStorage.setItem('jointlife1',this.proposalInput.policy.jointLife);
            sessionStorage.setItem('firstnamestorage',this.proposalInput.insured.firstName);
            sessionStorage.setItem('middlenamestorage',this.proposalInput.insured.middleName);
            sessionStorage.setItem('lastnamestorage',this.proposalInput.insured.lastName);
            if(this.proposalInput.insured.nationality=='IND')
            {
             
              this.countrycodeflag=true;
            }
            if(this.proposalInput.policy.jointLife)
            {
            if(this.proposalInput.secInsured.nationality=='IND')
            {
              this.countrycodeflagsec=true;
            }
          }
          
           
            if(this.proposalInput.policy.jointLife==true)
            {
              sessionStorage.setItem('jointlife1',this.proposalInput.policy.jointLife);
              sessionStorage.setItem('appNo',this.proposalInput.policy.applicationNumber);
              sessionStorage.setItem('firstnamestorage1',this.proposalInput.secInsured.firstName);
              sessionStorage.setItem('middlenamestorage1',this.proposalInput.secInsured.middleName);
              sessionStorage.setItem('lastnamestorage1',this.proposalInput.secInsured.lastName);
              sessionStorage.setItem('birthdatesecondaryinsured',this.proposalInput.secInsured.dob);
             
            }
            

             this.shared.getCountryCode()
            .subscribe(
              data =>{
                this.countryCode = data;
              }
            );
           /* var obj = <any>{};
            if(!this.proposalInput.policy.jointLife){
                obj.displayName =  "Insured - Age Proof"; 
                obj.fileType = "AgeProof";
                obj.docId = "11101";
                obj.fileName = "";
              this.filesToUpload.push(obj);			
                obj = {};
                obj.displayName =  "Insured - Identity Proof";
                obj.fileType = "IDProof";
                obj.docId = "11102";
                obj.fileName = "";
              this.filesToUpload.push(obj);			
                obj = {};
                obj.displayName =  "Insured - Address Proof";
                obj.fileType = "AddressProof";
                obj.docId = "11103";
                obj.fileName = "";
              this.filesToUpload.push(obj);			
                obj = {};
                obj.displayName =  "Insured -Income Proof";
                obj.fileType = "IncomeProof";
                obj.docId = "11104";
                obj.fileName = "";
              this.filesToUpload.push(obj);
            }else{
              obj = {};
              obj.displayName =  "Insured - Age Proof"; 
              obj.fileType = "AgeProof";
              obj.docId = "11101";
              obj.fileName = "";
            this.filesToUpload.push(obj);			
              obj = {};
              obj.displayName =  "Insured - Identity Proof";
              obj.fileType = "IDProof";
              obj.docId = "11102";
              obj.fileName = "";
            this.filesToUpload.push(obj);			
              obj = {};
              obj.displayName =  "Insured - Address Proof";
              obj.fileType = "AddressProof";
              obj.docId = "11103";
              obj.fileName = "";
            this.filesToUpload.push(obj);			
              obj = {};
              obj.displayName =  "Insured -Income Proof";
              obj.fileType = "IncomeProof";
              obj.docId = "11104";
              obj.fileName = "";
            this.filesToUpload.push(obj);
              obj = {};
              obj.displayName =  "Secondary Insured - Age Proof"; 
              obj.fileType = "AgeProof";
              obj.docId = "11101";
              obj.fileName = "";
            this.filesToUpload.push(obj);			
              obj = {};
              obj.displayName =  "Secondary Insured - Identity Proof";
              obj.fileType = "IDProof";
              obj.docId = "11102";
              obj.fileName = "";
            this.filesToUpload.push(obj);			
              obj = {};
              obj.displayName =  "Secondary Insured - Address Proof";
              obj.fileType = "AddressProof";
              obj.docId = "11103";
              obj.fileName = "";
            this.filesToUpload.push(obj);			
              obj = {};
              obj.displayName =  "Secondary Insured -Income Proof";
              obj.fileType = "IncomeProof";
              obj.docId = "11104";
              obj.fileName = "";
            this.filesToUpload.push(obj);
            }*/
           
            console.log(this.proposalInput);
            this.loading = false;
            this.loadMasterData(this.proposalInput.insurerId);
          }
          else{
            this.applicationError={key:"Something Went Wrong Please Try After Sometime",errorPrint:[]}
            var str=data.error;
            this.applicationError.errorPrint=this.cleanArray(str.split(";"))
          }
        },
        error => {
          if(error.status == 401)
            {
           let rtnUrl = window.location.href.split("=")[1];
           this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
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
      }
		    	this.masterLoaded = true;
		    	if (this.menuLoaded && this.masterLoaded && this.formLoaded){
		    		
		    		this.loading = false;
		    	}
    }
    this.setAppInput(this.applicationData);
    },
    error => {
      if(error.status == 401 )
        {
       let rtnUrl = window.location.href.split("=")[1];
       this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
       }else{
       this.alertservice.error("Something broken, try again!");
        }
      });
    }
   
   
    validateInsuredData () {
			
      this.pageErrors.insuredError = false;
      this.pageErrors.notAllowedError = false;
      this.pageErrors.notAllowedErrorText = "";
      this.pageErrors.insuredErrorText = "";
      this.pageErrors.mandatoryerrorText = ""; 
      this.pageErrors.mandatoryerror = ""; 
    
			if (this.proposalInput.policy.productType == "Term") {
				if (this.proposalInput.insured.employmentDetails.earning=='N' || this.proposalInput.insured.employmentDetails.occupation == "98" || this.proposalInput.insured.employmentDetails.occupation == "99" ||this.proposalInput.insured.employmentDetails.occupation == "94"){
					this.pageErrors.notAllowedError = true;
					this.pageErrors.notAllowedErrorText = "Insured is not allowed to buy Term Policy";
        }
       /* if(this.proposalInput.policy.jointLife)
        {
        if (this.proposalInput.secInsured.employmentDetails.earning=='N' || this.proposalInput.secInsured.employmentDetails.occupation == "98" || this.proposalInput.secInsured.employmentDetails.occupation == "99" ||this.proposalInput.secInsured.employmentDetails.occupation == "94"){
					this.pageErrors.notAllowedError = true;
					this.pageErrors.notAllowedErrorText = "Insured is not allowed to buy Term Policy";
        }
      }*/
     	}
     
			if (!this.pageErrors.insuredError) {
				if (typeof(this.proposalInput.insured) != "undefined" && this.proposalInput.insured.employmentDetails.occupation == "98" && this.proposalInput.insured.age > 25){
					this.pageErrors.insuredErrorText = "Age of insured cannot be more than 25";
					this.pageErrors.insuredError = true;
				}
      }	
      
     /*   if (this.proposalInput.insured.employmentDetails.occupation != "90"||this.proposalInput.insured.nationality=="IND"||this.proposalInput.insured.birthState!="2"||this.proposalInput.insured.birthState!="3"||this.proposalInput.insured.birthState!="11"||this.proposalInput.insured.birthState!="18"||this.proposalInput.insured.birthState!="19"||this.proposalInput.insured.birthState!="20"||this.proposalInput.insured.birthState!="24"||this.proposalInput.insured.birthState!="26")
        {
          this.pageErrors.mandatoryerrorText = "pan number is mandatory";
					this.pageErrors.mandatoryerror = true;
        }*/
    }
  addEditAddress(type , action, i, address)
		{
     
      this.selectedAddress = {};
      if(type=='insured')
      {
     
          this.addressList = this.proposalInput.insured.address;
      }
      else if(type=='secInsured')
      {
        this.addressList = this.proposalInput.secInsured.address;
       // console.log("addressList secinsured",this.addressList);
      }
    	if (type == "proposer"){
            this.addressList = this.proposalInput.proposer.address;
       }

			//console.log(address);
			if (action == "Add") {
        this.address = {};
        this.addressType="";
        this.inputAddress.action= action;
        this.inputAddress.type= type;
        this.address.index=i;
        if (type == "insured"){
         $('#newAddressModal').modal('show');
        }
        if (type == "secInsured"){
          $('#newAddressModal').modal('show');
        }
      }else
			{
				if (type == "proposer"){
          this.proposalInput.proposer.address.splice(i,1);
          this.proposalInput.proposer.selectedAddress="";
          this.contactComplete();
            } 
            if (type == "insured"){
              this.proposalInput.insured.address.splice(i,1);
              this.proposalInput.insured.selectedAddress="";
              this.contactComplete();
            }   
            else if(type == "secInsured")
           {
           this.proposalInput.secInsured.address.splice(i,1);
           this.contactComplete();
           }  
           
			}
    }
    contactComplete(){
			
			if (this.loading){
				return false;
			}
      this.pageErrors.contactError = true;
      var resAddressFilter = {addressType : "R"};
			var perAddressFilter = {addressType : "P"};
			//console.log($filter('filter')(this.proposalInput.proposer.address, resAddressFilter));
			//console.log($filter('filter')(this.proposalInput.proposer.address, perAddressFilter));
			if (typeof(this.proposalInput.insured) != "undefined"){
				if (this.proposalInput.insured.address.filter(item=> item.addressType == resAddressFilter.addressType).length == 1
      &&this.proposalInput.insured.address.filter(item=> item.addressType == perAddressFilter.addressType).length == 1
    ){
      this.pageErrors.contactError = false;
				}
				
      }
   
    this.pageErrors.contactErrorsec = false;
    
     /* if(this.inputAddress.type == "secInsured")
      {
      if (typeof(this.proposalInput.secInsured) != "undefined"){
				if (this.proposalInput.secInsured.address.filter(item=> item.addressType == resAddressFilter.addressType).length == 1
      &&this.proposalInput.secInsured.address.filter(item=> item.addressType == perAddressFilter.addressType).length == 1
    ){
						
					this.pageErrors.contactErrorsec = false;
					
				}
				
      }
    }*/
      if(this.proposalInput.policy.jointLife)
      {
      this.nomineeComplete();
      }
      if(!this.proposalInput.policy.jointLife)
      {
      this.nomineeComplete();
      }
    
    } 

smoke(data)
{
  data.smoke="Yess";
  console.log('datasmoke',data.smoke)
}


    setAddress(address){
      if(this.inputAddress.type == "insured")
      {
      this.proposalInput.insured.selectedAddress="same";
      this.address.addressLine1 =  this.proposalInput.insured.address[0].addressLine1;
      this.address.addressLine2 =  this.proposalInput.insured.address[0].addressLine2;
      this.address.addressLine3 =  this.proposalInput.insured.address[0].addressLine3;
      this.address.landmark =  this.proposalInput.insured.address[0].landmark;
      this.address.area =  this.proposalInput.insured.address[0].area;
      this.address.district =  this.proposalInput.insured.address[0].district;
      this.address.city =  this.proposalInput.insured.address[0].city;
      this.address.state =  this.proposalInput.insured.address[0].state;
      this.address.disState =  this.proposalInput.insured.address[0].disState;
      this.inputAddress.disState =  this.proposalInput.insured.address[0].state;
      this.address.pincode =  this.proposalInput.insured.address[0].pincode;
      this.address.mobileNo =  this.proposalInput.insured.address[0].mobileNo;
     // console.log("mobilenumber",this.address.admobile);
        this.address.altMobileNo =  this.proposalInput.insured.address[0].altMobileNo;
        this.address.telephoneNo =  this.proposalInput.insured.address[0].telephoneNo;
        this.address.addressSubType =  this.proposalInput.insured.address[0].addressSubType;
        this.address.addressSubtypeTitle=this.proposalInput.insured.address[0].addressSubtypeTitle;
      }
     //  console.log("this.inputAddress.type",this.inputAddress.type)
        if(this.inputAddress.type == "secInsured")
      {
      
        this.address.addressLine1 =  this.proposalInput.secInsured.address[0].addressLine1;
      this.address.addressLine2 =  this.proposalInput.secInsured.address[0].addressLine2;
      this.address.addressLine3 =  this.proposalInput.secInsured.address[0].addressLine3;
      this.address.landmark =  this.proposalInput.secInsured.address[0].landmark;
      this.address.area =  this.proposalInput.secInsured.address[0].area;
      this.address.district =  this.proposalInput.secInsured.address[0].district;
      this.address.city =  this.proposalInput.secInsured.address[0].city;
      this.address.state =  this.proposalInput.secInsured.address[0].disState;
      this.address.disState =  this.proposalInput.secInsured.address[0].disState;
      this.inputAddress.disState =  this.proposalInput.secInsured.address[0].state;
      this.address.pincode =  this.proposalInput.secInsured.address[0].pincode;
      this.address.mobileNo =  this.proposalInput.secInsured.address[0].mobileNo;
     // console.log("mobilenumber",this.address.admobile);
        this.address.altMobileNo =  this.proposalInput.secInsured.address[0].altMobileNo;
        this.address.telephoneNo =  this.proposalInput.secInsured.address[0].telephoneNo;
        this.address.addressSubType =  this.proposalInput.secInsured.address[0].addressSubType;
        console.log("this.address.addressSubType",this.address.addressSubType)
        this.address.addressSubtypeTitle=this.proposalInput.insured.address[0].addressSubtypeTitle;
      
      }
        
    } 
  
addEditNominee(action, i, nominee)
    {
      if (action == "Add") {
        this.relationshipWithInsured= null;
        this.appointeeRelationWithNominee=null;
        this.inputAddress.action = action;
          if (this.proposalInput.insured.isProposerInsuredSame=='Y'){
            nominee.isNominee = true;
            nominee.header = "Nominee";
          } else
          {
            nominee.isNominee = false;
            nominee.header = "Contingent Policy Holder";
          }
         
          this.nomineeData = nominee;
          this.nomineeFlag=false;
          $('#nomineeDataModal').modal('show');
        }else
        {
          this.proposalInput.nominee.splice(i,1);
        
          this.nomineeComplete();
        }
      }  

      
submitNewAddress(){
    if(typeof(this.address)!='undefined'){
      $('#newAddressModal').modal('hide');
      if (this.inputAddress.action == "Add"){
        
        //if(typeof(this.inputAddress.disState)!='undefined')
       // this.address.disState =  this.inputAddress.disState;
        if (this.inputAddress.type == "proposer"){
         this.address.addressLine1.trim();
          
            /*  this.address.addressLine2.trim();
              this.address.addressLine3.trim();
              this.address.landmark.trim();*/
            
          this.proposalInput.proposer.address.push(this.address);
          this.contactComplete();
            } else
            {
              if(this.inputAddress.type == "insured")
              {
              this.address.addressLine1.trim();
             /* this.address.addressLine2.trim();
              this.address.addressLine3.trim();
              this.address.landmark.trim();*/
              console.log("this.address",this.address);
              this.proposalInput.insured.address.push(this.address);
              this.contactComplete();
              }
              else if(this.proposalInput.policy.jointLife && this.inputAddress.type == "secInsured")
              {
              this.proposalInput.secInsured.address.push(this.address);
              console.log("this.proposalInput.secInsured.address",this.proposalInput.secInsured.address);
              this.contactComplete();
              }
              
            }
      }else
      {
        // find out the address index and then substitute
        if(this.inputAddress.type == "insured")
        {
        this.proposalInput.insured.address[this.address.index]= this.address;
        }
        else if(this.proposalInput.policy.jointLife && this.inputAddress.type == "secInsured")
        {
        this.proposalInput.secInsured.address[this.address.index]= this.address;
      
        }
      }
      //console.log(this.proposalInput.proposer.address);
    }
  } 
  
 
nomineeComplete(){
    this.pageErrors.nomineeError = true;
   if (this.loading){
     return false;
   }
   var total = 0;
   if (typeof(this.proposalInput.nominee) != "undefined"){
     this.proposalInput.nominee.forEach(value => {
       total = total + Number(value.sharePercent);
     })
   }
   if ( Number(total) == 100){
     this.pageErrors.nomineeError = false;
   }
   /*if(this.proposalInput.policy.jointLife){
    this.pageErrors.nomineeError = true;
   }*/
 }  
 submitNomineeData(){
  // console.log("this.nomineeData",this.nomineeData);
  if(this.nomineeData!=undefined)
{
  if (this.inputAddress.action == "Add"){
    $('#nomineeDataModal').modal('hide');
  
    if(this.proposalInput.nominee.length > 0 && this.nomineeData.age<18)
    {
      for(var i=0;i< this.proposalInput.nominee.length;i++)
      {
      if(this.proposalInput.nominee[i].hasOwnProperty('appointeeFirstName'))
      {
        this.nomineeData.appointeeFirstName=this.proposalInput.nominee[i].appointeeFirstName;
        this.nomineeData.appointeeLastName=this.proposalInput.nominee[i].appointeeLastName;
        this.nomineeData.appointeeRelationWithNominee=this.proposalInput.nominee[i].appointeeRelationWithNominee;
        this.nomineeData.appointeeRelationWithNomineeTitle=this.proposalInput.nominee[i].appointeeRelationWithNomineeTitle
        this.nomineeData.appointeeDOB=this.proposalInput.nominee[i].appointeeDOB;
        this.nomineeData.appointeemobile=this.proposalInput.nominee[i].appointeemobile;
     }
  }
  }
  
  this.proposalInput.nominee.push(this.nomineeData);

    this.nomineeComplete();
  }  
  }
}
/*calculateNomineeAge(dob)
{
  this.nomineeData.age = this.shared.calculateAge(dob);
}*/
calculateNomineeAge(dob){
  this.nomineeFlag=false;
  this.errorCall6 = false;
 var n=dob.match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
  if(n!=null)
  {
    this.nomineeData.age = this.shared.calculateAge(dob);
    if(this.proposalInput.nominee.length==0)
    {
      if(this.nomineeData.age<18)
      {
         this.nomineeFlag=true;
         this.errorCall6 = false;
      }
    }
    else if(this.proposalInput.nominee.length>0)
    {
    for(var i=0;i<this.proposalInput.nominee.length;i++)
    {
    var a=this.proposalInput.nominee[i].hasOwnProperty('appointeeFirstName')
    if((this.nomineeData.age<18)&&(a==false)){
    this.nomineeFlag=true;
    this.errorCall6 = false;
     }
     else if((this.nomineeData.age<18)&&(a==true))
     {
      this.errorCall6 = false;
    
      this.nomineeFlag=false;
     }
}
}
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
 
   $('#SecondTab').removeClass('tabdisable');
    this.isProposerSameInsureds("Y");
    this.pageErrors.contactErrorsec=false;
   if(this.proposalInput.insured.nationality=='IND')
   {
     this.proposalInput.insured.isOtherCountryTaxResi='N';
     this.proposalInput.insured.isOtherCitizenship='N';
   }
   this.insurancePurpose=this.insurancePurpose.sort();
   this.insurancePurposearray=this.insurancePurpose;
   this.proposalInput.policy.insurancePurpose=this.insurancePurpose.toString().replace (/,/g, "");
  var appointee=<any>[];
  appointee=this.proposalInput.nominee;
  
  if(this.proposalInput.nominee.length==2)
  {
  if(appointee[0].hasOwnProperty('appointeeFirstName') && appointee[1].hasOwnProperty('appointeeFirstName') )
  {
  this.nomineFlag=true;
  this.proposalInput.insured.appointeeFlag=true;

  }
  else
  {
    this.nomineFlag=false;
    this.proposalInput.insured.appointeeFlag=false;
  }
}
 break;
  case "2":

    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.secondComplete = 'done';
     if(this.proposalInput.secInsured.nationality=='NRI'||this.proposalInput.secInsured.isOtherCountryTaxResi=='Y'||this.proposalInput.secInsured.isOtherCitizenship=='Y')
   {
   // this.proposalInput.policy.policyType='N';
    this.proposalInput.advisorReport.policyType='N';
    //this.proposalInput.policy.policyTypeTitle='NRI';
   }
   if(this.proposalInput.secInsured.nationality=='IND')
   {
     this.proposalInput.secInsured.isOtherCountryTaxResi='N';
     this.proposalInput.secInsured.isOtherCitizenship='N';
   }
   if(this.proposalInput.insured.isProposerInsuredSame=='Y')
   {
   this.proposalInput.secInsured.address=this.proposalInput.insured.address;
   }
   else
   {
    this.proposalInput.secInsured.address=this.proposalInput.proposer.address; 
   }
   if(this.proposalInput.secInsured.isPEP=='Y')
   {
    this.proposalInput.secInsured.pepDetails=this.proposalInput.secInsured.pepDetails;
   }
 

    $('#thirdTab').removeClass('tabdisable');
    break;
  case "3":
    this.proposalError={key:"",errorPirnt:[]};
    this.proposalInput.policy.mode = '12';
    this.proposalInput.policy.modeTitle = "Annual";
    this.tabStatus.thirdComplete='done';
    $('#thirdTab').removeClass('tabdisable');			
    break;
  case "4":
 // console.log("case 4");
    this.proposalError={key:"",errorPirnt:[]};
    for (var i =0; i<this.proposalInput.insured.personalQuestions.length; i++){
      var question = this.proposalInput.insured.personalQuestions[i];
    
      if (question.isYesNo == "Y" && question.id=='IsOutsideIndiaVacc180days'){
        question.details="Travelmandateform";
      }
      if (question.isYesNo == "Y" && question.id=='IsOccupationHazardous'){
        question.details="Occupationmandateform";
      }
      
    }
  
    if(this.proposalInput.insured.isProposerInsuredSame=='N')
    {
    for (var i =0; i<this.proposalInput.proposer.personalQuestions.length; i++){
      var question = this.proposalInput.proposer.personalQuestions[i];
    
      if (question.isYesNo == "Y" && question.id=='IsOutsideIndiaVacc180days'){
        question.details="Travelmandateform";
      }
      if (question.isYesNo == "Y" && question.id=='IsOccupationHazardous'){
        question.details="Occupationmandateform";
      }
     
    }
  }
   if(this.proposalInput.policy.jointLife)
   {
    for (var i =0; i<this.proposalInput.secInsured.personalQuestions.length; i++){
      var question = this.proposalInput.secInsured.personalQuestions[i];
    
      if (question.isYesNo == "Y" && question.id=='IsOutsideIndiaVacc180days'){
        question.details="Travelmandateform";
      } 
      if (question.isYesNo == "Y" && question.id=='IsOccupationHazardous'){
        question.details="Occupationmandateform";
      }
      
    }
  }
  this.tabStatus.fourthComplete='done';
 
    $('#forthTab').removeClass('tabdisable');
    
    break;
  case "5":
   this.proposalError={key:"",errorPirnt:[]};
   this.tabStatus.fifthComplete = 'done';
    //this.getRequirements();
    $('#fifthTab').removeClass('tabdisable');
   break;
  case "6":

this.proposalInput.policy.isABGEmployee='N';
this.tabStatus.sixthComplete = 'done';
this.proposalError={key:"",errorPirnt:[]};

console.log("this.tabStatus.sixthComplete",this.tabStatus.sixthComplete);
$('#sixthTab').removeClass('tabdisable');

break; 
  case "7":
 this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.seventhComplete = 'done';
    $('#seventhTab').removeClass('tabdisable');
  break; 
  case "8":
    this.proposalError={key:"",errorPirnt:[]};
    this.tabStatus.eighthComplete = 'done';
    $('#eighthTab').removeClass('tabdisable');
    break;     

  }
  this.populateConcat();
  
  
 this.applicationData.proposalData = this.proposalInput;
this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
.subscribe(
  data =>{
    console.log('Saved Data',this.applicationData.proposalData);
    console.log(JSON.stringify(this.applicationData.proposalData));
    $('#loader').hide();
    
    if(!this.proposalInput.policy.jointLife ){
    if(section=='1'){
      $('#panel'+section).removeClass('in active');
      $('#panel3').addClass('in active');
      $('li:nth-child('+section+')').removeClass('active');
      $('li:nth-child(2)').addClass('active');
    }else if(section=='3'){
      $('#panel'+section).removeClass('in active');
      $('#panel4').addClass('in active');
      $('li:nth-child(2)').removeClass('active');
      $('li:nth-child(3)').addClass('active');
    }
    else if(section == '6')
    {
    this.getApplicationForm();
    $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) + 1;
    var prevSec = Number(section) - 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+prevSec+')').removeClass('active');
    $('li:nth-child('+section+')').addClass('active');
    }
   else  if(section == '7'){
    this.otpInput.appNo = this.proposalInput.policy.applicationNumber;
    this.otpInput.mobile = this.proposalInput.insured.address[0].mobileNo;
    this.otpInput.section = section;
    $('#bsliOTPModal').modal('show');
 
   }
     else{
      $('#panel'+section).removeClass('in active');
      var nextSec = Number(section) + 1;
      var prevSec = Number(section) - 1;
      
      $('#panel'+nextSec).addClass('in active');
      $('li:nth-child('+prevSec+')').removeClass('active');
      $('li:nth-child('+section+')').addClass('active');
    }
  }else{
   if(section == '6')
    {
    this.getApplicationForm();
    $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) + 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+section+')').removeClass('active');
    $('li:nth-child('+nextSec+')').addClass('active');
   
    }
    else if(section == '7'){
      this.otpInput.appNo = this.proposalInput.policy.applicationNumber;
      this.otpInput.mobile = this.proposalInput.insured.address[0].mobileNo;
      this.otpInput.section = section;
      $('#bsliOTPModal').modal('show');
    }
     else
     {
     $('#panel'+section).removeClass('in active');
      var nextSec = Number(section) + 1;
      $('#panel'+nextSec).addClass('in active');
      $('li:nth-child('+section+')').removeClass('active');
      $('li:nth-child('+nextSec+')').addClass('active');
     }
    }
  
   
  },
  error => {
    $('#loader').hide();
    if(error.status == 401)
      {
     let rtnUrl = window.location.href.split("=")[1];
     this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
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
      $('#bsliOTPModal').modal('hide');
      $('#aadharNotifyModal').modal('show');
      if(!this.proposalInput.policy.jointLife )
      {
        $('#panel'+this.otpInput.section).removeClass('in active');
      var nextSec = Number(this.otpInput.section) + 1;
      var prevSec = Number(this.otpInput.section) - 1;
      $('#panel'+nextSec).addClass('in active');
      $('li:nth-child('+prevSec+')').removeClass('active');
      $('li:nth-child('+this.otpInput.section+')').addClass('active');
      }
      else
      {
        $('#panel'+this.otpInput.section).removeClass('in active');
        var nextSec = Number(this.otpInput.section) + 1;
        $('#panel'+nextSec).addClass('in active');
        $('li:nth-child('+this.otpInput.section+')').removeClass('active');
        $('li:nth-child('+nextSec+')').addClass('active');
      }

    }else{
      this.otpError = true;
    }
  },
  error => {
  if(error.status == 401)
    {
   let rtnUrl = window.location.href.split("=")[1];
   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
   }else{
   this.alertservice.error("Something broken, try again!");
    }
  });
}
resend(){
  this.shared.generateOTP(this.proposalInput.policy.applicationNumber, this.proposalInput.policy.productId, this.proposalInput.policy.productName, this.proposalInput.insured.address[0].mobileNo)
  .subscribe(data =>{
    this.otpRetires++;
    $('#loader').hide();
    $('#bsliOTPModal').modal('show');
    this.successStatus= false;
    if(data.result==0)
    {
    this.successStatus= true;
    }
    else
    {
       this.failedStatus= true;
    }
  }, error =>{
    $('#loader').hide();
    this.failedStatus= true;
    if(error.status == 401)
    {
    let rtnUrl = window.location.href.split("=")[1];
    this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
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
  populateConcat(){
			
    this.proposalInput.proposer.contacts = [];
    if (this.proposalInput.proposer.email != "" && this.proposalInput.proposer.email != null){
      var contact = <any>{};
      contact.contactType = "email";
      contact.contactText = this.proposalInput.proposer.email;
      this.proposalInput.proposer.contacts.push(contact);
    }
    if (this.proposalInput.proposer.mobile != "" && this.proposalInput.proposer.mobile != null){
      var contact = <any>{};
      contact.contactType = "mobile";
      contact.contactText = this.proposalInput.proposer.mobile;
      this.proposalInput.proposer.contacts.push(contact);
    }
    
    this.proposalInput.insured.contacts = [];
    if (this.proposalInput.insured.email != "" && this.proposalInput.insured.email != null){
      var contact = <any>{};
     // console.log("Adding email")
      contact.contactType = "email";
      contact.contactText = this.proposalInput.insured.email;
      //console.log("Adding email");
      console.log(contact);
      this.proposalInput.insured.contacts.push(contact);
    }
    if (this.proposalInput.insured.mobile != "" && this.proposalInput.insured.mobile != null){
      var contact = <any>{};
      contact.contactType = "mobile";
      contact.contactText = this.proposalInput.insured.mobile;
      this.proposalInput.insured.contacts.push(contact);
    }
  } 
  getCities(state){
    this.shared.getCityForState(this.proposalInput.insurerId, state.id, '')
    .subscribe(data =>{
      this.insurerMaster.City=data.result;
      this.address.state = state.value;
    },
    error => {
      if(error.status == 401)
        {
       let rtnUrl = window.location.href.split("=")[1];
       this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
       }else{
       this.alertservice.error("Something broken, try again!");
        }
      });
    
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
  private _filterStates(value: string): State[] {
    const filterValue1 = value.toLowerCase();
 console.log("filterValue",this.stateMaster.filter(state => state.value.toLowerCase().indexOf(filterValue1.toLowerCase()) === 0))
    return this.stateMaster.filter(state => state.value.toLowerCase().indexOf(filterValue1.toLowerCase()) === 0);
  }
  private _filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();
     return this.cityMaster.filter(city => city.value.toLowerCase().indexOf(filterValue.toLowerCase()) === 0);
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
  addEditLifeStyleMember (questionId, action, i, type){
    this.qIndex = 0;
    this.inputAddress.action = action;
    this.inputAddress.type = type;
    this.inputAddress.questionId = questionId;
    if(this.inputAddress.action=='Add'&& this.inputAddress.type=='2')
    for (var k=0; k<this.proposalInput.secInsured.personalQuestions.length; k++){
      var item = this.proposalInput.secInsured.personalQuestions[k];
      if (item.id == questionId){
        this.qIndex = k;
      }
    
  }
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
            case "IsAnyDeclinedInsurance":
                this.application = {};
                $('#declinedInsuranceModal').modal('show');
                currCtrl = "declinedInsuranceCtrlbsli";
                break;
            case "IsFamilyMemDiagnosedBefore60":
                this.family = {};
                this.healthState = "";
                this.deathCause = "";
                $('#familyMemberModal').modal('show');
                currCtrl = "familyHealthCtrlbsli";
                break;
            case "IsAlcoholic":
                this.isAlcoholicDetails = {};
                $('#alcoholicModal').modal('show');
                currCtrl = "alcoholicCtrlbsli";
                break;
            case "IsTobaccoConsumed":
                this.isTobaccoDetails = {};
               this.isTobaccoDetails.tobaccoType='';
                $('#tobacoModal').modal('show');
                currCtrl = "tobaccoCtrlbsli";
                break;
            case "IsAnyConcurrentInsurance":
                this.policy = {};
                $('#concurrentInsuranceModal').modal('show');
                currCtrl = "concurrentInsuranceCtrlbsli";
                break;     
            }
        }else if(action == 'Delete'){ 
        if(type==1){
        this.proposalInput.insured.personalQuestions[this.qIndex].details.splice(i, 1);
        this.getLifeStyleAnswers(questionId);
        }else  
        {
          this.proposalInput.secInsured.personalQuestions[this.qIndex].details.splice(i, 1);
          this.getLifeStyleAnswersSec(questionId);
        }
    }
  }  
  setAppInput(data){
			
    this.appInput = data;
    this.proposalInput = this.appInput.proposalData;
    console.log(this.proposalInput);
    this.proposalInput.policy.vendorUID = "11"; // for DBS
    this.proposalInput.policy.illustrationID = "qwewqewq354353";
    this.proposalInput.policy.spCode = "004588531";
    if (this.proposalInput.policy.isMinor) {
      this.disableRelSelect = true;
      this.proposalInput.insured.isProposerInsuredSame = "N";
    }

    if (this.proposalInput.policy.productType == "Term") {
      this.disableRelSelect = true;
      this.proposalInput.insured.isProposerInsuredSame = "Y";
      this.proposalInput.proposer.isProposerInsuredSame = "Y";
      this.proposalInput.insured.relationshipWithLi = "SAME";
      this.proposalInput.proposer.relationshipWithLi = "SAME";
    }
    
    this.proposalInput.insured.personalQuestions.forEach(value => {
      this.lifestyleDisplay[value.id] = [];
      this.getLifeStyleAnswers(value.id);
    });
    if(this.proposalInput.policy.jointLife){
    this.proposalInput.secInsured.personalQuestions.forEach(value => {
      this.lifestyleDisplaySec[value.id] = [];
      this.getLifeStyleAnswersSec(value.id);
    });
  } 
    if (!this.proposalInput.hasOwnProperty("funds")){
      this.proposalInput.funds = [];
    }
    this.validateHealthPage();
  //  this.validateHealthPageSec();
    this.validateMedicalPage();
    this.contactComplete();
    this.setRiderSA(); 
    this.populateDocuments();
   // this.documentspopulate();
   this.formLoaded = true;
   if(this.proposalInput.policy.insurancePurpose!="")
   {
     this.insurancePurpose = this.proposalInput.policy.insurancePurpose.split('');
 
   }
    
  }
  getLifeStyleAnswers(questionId){
			
    var rows = [];
    var persnalQns = <any>[];
    persnalQns = this.proposalInput.insured.personalQuestions;
    for (var i=0; i<persnalQns.length; i++){
      var item = persnalQns[i];
      if (item.id == questionId){
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
        if(headers[0].id =="occupation"){
          var item = rows[i].type;
        }
      else{
        var item = rows[i][headers[j].id];
        }
        if (typeof(item) =='undefined'){
          item = "";
        }
        tags.push(item);
      }
      answers.push(tags);
     }
 
    

 this.lifestyleDisplay[questionId]= answers;
 //console.log("this.lifestyleDisplay[questionId]", this.lifestyleDisplay[questionId]);
  }
  getLifeStyleAnswersSec(questionId){
			
    var rows = [];
    var persnalQns = <any>[];
    persnalQns = this.proposalInput.secInsured.personalQuestions;
    for (var i=0; i<persnalQns.length; i++){
      var item = persnalQns[i];
      if (item.id == questionId){
        //item.formNeeded = formNeeded(questionId);
        if(questionId=="IsTobaccoConsumed"){
          if(this.proposalInput.policy.secrating=="NS"){
            this.proposalInput.secInsured.personalQuestions[i].isYesNo ="N";
          }else{
            this.proposalInput.secInsured.personalQuestions[i].isYesNo ="Y";
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
        if(headers[0].id =="occupation"){
          var item = rows[i].type;
        }else{
        var item = rows[i][headers[j].id];
        }
        if (typeof(item) =='undefined'){
          item = "";
        }
        tags.push(item);
      }
      answers.push(tags);
    }
    //console.log(questionId);
    //console.log(answers);
    this.lifestyleDisplaySec[questionId] = answers;
    //console.log(this.lifestyleDisplay);
  }

  validateHealthPage (){
   
   this.pageErrors.healthError = false;
  this.pageErrors.healthErrorsec=false;
   this.pageErrors.healthErrorisoutsideVAcc=false;
   this.pageErrors.healthErrorTexsect="";
   // this.pageErrors.healthErrortravelsec=false;
   this.pageErrors.healthErrorTexsectisoutsideVAcc = "";
  // this.pageErrors.healthErrortravel=false;
    this.pageErrors.healthErrorText = "";
    
    this.proposalInput.insured.personalQuestions.forEach(value => {
     if (value.isYesNo == "Y" && value.id!='IsOutsideIndiaVacc180days' && value.id!='IsOccupationHazardous') {
       
        if (value.formNeeded == 'N' && value.details == ""){
         this.pageErrors.healthError = true;
        }
        if (value.formNeeded == 'Y' && value.details.length == 0){
         this.pageErrors.healthError = true;
         this.pageErrors.healthErrorText = "Please Complete the LifeStyle Details"
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
      
      // Must have atleast one Family Health Record
      if (value.id == "IsFamilyMemDiagnosedBefore60" && value.details.length == 0) {
       this.pageErrors.healthError = true;
       this.pageErrors.healthErrorText = "Need Health Details of atleast one family member"
      }

     /* if (value.isYesNo=='Y'&& value.formNeeded == 'N' && value.id=='IsOutsideIndiaVacc180days'&& this.totlatraveldetails.length==0){
        this.pageErrors.healthErrortravel = true;
       }*/
      
    });
   
    if (this.proposalInput.policy.jointLife)
    {
    this.proposalInput.secInsured.personalQuestions.forEach(value => {
    /*  if (value.isYesNo == "Y" && value.id=='IsOutsideIndiaVacc180days' && this.totlatraveldetails.length==0){
        this.pageErrors.healthErrorsec = true;
      }*/
      if (value.isYesNo == "Y" && value.id!='IsOutsideIndiaVacc180days'&& value.id!='IsOccupationHazardous') {
        if (value.formNeeded == 'N' && value.details == ""){
         this.pageErrors.healthErrorsec = true;
        }
        if (value.formNeeded == 'Y' && value.details.length == 0){
         this.pageErrors.healthErrorsec = true;
         this.pageErrors.healthErrorTexsect = "Please Complete the LifeStyle Details of secondary Insured"
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
    
      // Must have atleast one Family Health Record
      if (value.id == "IsFamilyMemDiagnosedBefore60" && value.details.length == 0) {
       this.pageErrors.healthErrorsec = true;
       this.pageErrors.healthErrorTexsect = "Need Health Details of atleast one family member"
      }
    
    });
  }
   
    if (this.proposalInput.proposer.isProposerInsuredSame=='N'){
      this.proposalInput.proposer.personalQuestions.forEach(value => {
        if (value.isYesNo == "Y" && value.id!='IsOutsideIndiaVacc180days' &&value.id!='IsOccupationHazardous' ) {
        
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

        if (value.id == "IsFamilyMemDiagnosedBefore60" && value.details.length == 0) {
          this.pageErrors.healthError = true;
          this.pageErrors.healthErrorText = "Need Health Details of atleast one family member"
         }
        
      });
    }
  
  }

 validateHealthPageSec()
  {
    this.pageErrors.healthErrorsec=false;
    this.pageErrors.healthErrortravelsec=false;
    this.pageErrors.healthErrorTexsect = "";
    if (this.proposalInput.policy.jointLife)
    {
      this.proposalInput.secInsured.personalQuestions.forEach(value => {
        if (value.isYesNo == "Y" && value.id=='IsOutsideIndiaVacc180days' && this.proposalInput.secInsured.traveldetails.length==0){
          this.pageErrors.healthErrortravelsec = true;
        }
        else
        {
       //   this.traveldetails.reasonforTravel=false;
  //this.traveldetails.dob="";
  this.traveldetails.nationality="";
  this.traveldetails.asset="";
  this.traveldetails.typeofres="";
  this.traveldetails.address="";
  this.traveldetails.medfacility="";
  this.traveldetails.nameofbus="";
  this.traveldetails.natureofBus="";
  this.traveldetails.duties="";
  this.traveldetails.dateOfcommensement="";
  this.traveldetails.annualrem="";
  this.traveldetails.modeoftravel="";
  this.traveldetails.saftyPrecaction="";
  this.traveldetails.agreement="";
  this.traveldetails.additionalinfodetails="";
 
          this.pageErrors.healthErrortravelsec = false;
        }
      
        if (value.isYesNo == "Y" && value.id!='IsOutsideIndiaVacc180days' && value.id!='IsOccupationHazardous') {
          if (value.formNeeded == 'N' && value.details == ""){
           this.pageErrors.healthErrorsec = true;
          }
          if (value.formNeeded == 'Y' && value.details.length == 0){
           this.pageErrors.healthErrorsec = true;
           this.pageErrors.healthErrorTexsect = "Please Complete the LifeStyle Details"
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
        if (value.id == "IsFamilyMemDiagnosedBefore60" && value.details.length == 0) {
          this.pageErrors.healthErrorsec = true;
          this.pageErrors.healthErrorTexsect = "Father and Mother are required and must appear only once For SecondaryInsured"
         }
      });
    }
  }
  validateMedicalPage = function(){
    this.pageErrors.medicalError = false;
    
    this.proposalInput.insured.medicalQuestions.forEach(value => {
      if (value.isYesNo == "Y") {
        if (value.details.length == 0) {
          this.pageErrors.medicalError = true;
        }
        
      }
     else
      {
        value.details = [];
      }
    });
    
    if (this.proposalInput.policy.jointLife){
      this.proposalInput.secInsured.medicalQuestions.forEach(value => {
        if (value.isYesNo == "Y") {
          if (value.details.length == 0) {
            this.pageErrors.medicalError = true;
          }
          
        } else
        {
          value.details = [];
        }
      });
    }
    if (this.proposalInput.policy.jointLife && this.proposalInput.secInsured.gender=='F')
    {
      this.proposalInput.secInsured.femaleHealthQuestions.forEach(value => {
        if (value.isYesNo == "Y") {
          if (value.details.length == 0) {
            this.pageErrors.medicalError = true;
          }
          
        } else
        {
          value.details = [];
        }
      });
    }
  }
  setRiderSA() {
			
    if (typeof(this.proposalInput.policy.mode) != "undefined") {

      var maxSA = Math.round(0.3* this.proposalInput.policy.basicSumAssured*Number(this.proposalInput.policy.mode)/12);
      if (maxSA > 5000000) {
        maxSA = 5000000;
      }
      for (var i=0; i<this.riders.length; i++){
        if (this.riders[i].id == "ADD") {
          this.riders[i].sa  = maxSA;
        }
        
      }
    }
  } 
  submitPersonalQns(output, modalName){
    if(typeof(output)!= "undefined") {
   if (this.inputAddress.action == "Add")
      {
        if (this.inputAddress.type == 1) {
          if(modalName=='familyMemberModal')
          {
            if(output.alive=='Y')
            {
              output.deathAge="";
              output.deathCauseTitle="";
              output.deathCause="";
            }
            else
            {
              output.age="";
              output.healthState="";
              output.healthStateTitle="";
            }
          
          }
          this.proposalInput.insured.personalQuestions[this.qIndex].details.push(output);
          this.validateHealthPage();
          this.getLifeStyleAnswers(this.inputAddress.questionId);
        } else if (this.inputAddress.type == 2) {
          if(modalName=='familyMemberModal')
          {
            if(output.alive=='Y')
            {
              output.deathAge="";
              output.deathCauseTitle="";
              output.deathCause="";
            }
            else
            {
              output.age="";
              output.healthState="";
              output.healthStateTitle="";
            }
          
          }
         
          this.proposalInput.secInsured.personalQuestions[this.qIndex].details.push(output);
          console.log("output",this.proposalInput.secInsured.personalQuestions[this.qIndex].details);
          
          this.validateHealthPage();
          this.getLifeStyleAnswersSec(this.inputAddress.questionId);
        } else
        {
          this.proposalInput.proposer.personalQuestions[this.qIndex].details.push(output);
        }
        $('#'+modalName).modal('hide');
      } 
      
    }
  }
  addEditMinorInsurance=function(action, i, member)
		{
        if (!this.proposalInput.hasOwnProperty("minorInsurance")){
        		this.proposalInput.minorInsurance = [];
        	}
        	if (action == "Add"){
            this.minorfamily = {};
            $('#minorInsuModal').modal('show');
          }else if (action == "delete")
        	{
        		this.proposalInput.minorInsurance.splice(i,1);
        	}
        }
 submitMinorInsuQns(minorfamily){
  if(minorfamily!=undefined)
  {
    this.proposalInput.minorInsurance.push(minorfamily);
  }
 }  
 
 bigetIllustration()
 {
  $('#loader').show();
  var biInput = <any>{};
  var ad=<any>{};
  this.viewillustrationflag=true;
 // biInput.isABGvalue=this.proposalInput.payment.isABGvalue;
 this.illustrationbuttonflag = true;
 var ad=this.proposalInput.insured.address;

 for(var i=0;i<ad.length;i++)
 {
  if(ad[i].addressType=="R")
  {
    biInput.mobile =  this.proposalInput.insured.address[0].mobileNo;
   // console.log("biInput.mobile",biInput.mobile);
  }
  else
  {
    biInput.mobile =  this.proposalInput.insured.address[1].mobileNo;
   // console.log("biInput.mobile",biInput.mobile);
  }
 }
  
if(this.proposalInput.insured.nationality!='IND')
   {
    biInput.isNRIflagins='Y';
   }
   else{
    biInput.isNRIflagins='N';
   }

   if(this.proposalInput.insured.nationality!='IND')
   {
    biInput.isNRIflagpro='Y';
   }
   else{
    biInput.isNRIflagpro='N';
   }
   
  biInput.biDate = new Date();
  biInput.productName = this.proposalInput.policy.productName;
  biInput.appNo = this.proposalInput.policy.applicationNumber;
  biInput.genOTP = "Y";
        
  //
  biInput.type = "P";
  biInput.productType = this.proposalInput.policy.productType;
  biInput.productId = this.proposalInput.policy.productId;
  biInput.planId = this.proposalInput.policy.planId;
  
  if(this.proposalInput.policy.jointLife== false){
    biInput.isJointlife = "N";
    biInput.secdob =  this.proposalInput.insured.dob;
    biInput.secage = this.proposalInput.insured.age;
    biInput.secgender= this.proposalInput.insured.gender;
    biInput.secrating =this.proposalInput.policy.rating;
  }else{ 
    biInput.isJointlife = "Y";
   // biInput.secownname= this.proposalInput.secInsured.title+". "+ this.proposalInput.secInsured.firstName + " " + this.proposalInput.secInsured.lastName;
    biInput.secTitle=this.proposalInput.secInsured.title;
    biInput.secFirstName=this.proposalInput.secInsured.firstName;
    biInput.secLastName=this.proposalInput.secInsured.lastName;

    biInput.secdob =  this.proposalInput.secInsured.dob;
    biInput.secage = this.proposalInput.secInsured.age;
    biInput.secgender= this.proposalInput.secInsured.gender;
    biInput.secrating =this.proposalInput.policy.secrating;
    if(this.proposalInput.secInsured.nationality!='IND')
   {
    biInput.isNRIflagsec='Y';
   }
   else{
    biInput.isNRIflagsec='N';
   }
  }
  biInput.PremiumMultiple = '10';
  biInput.mode = "1";
  biInput.pt = this.proposalInput.policy.pt;
  biInput.ppt = this.proposalInput.policy.ppt;
  biInput.ap = this.proposalInput.policy.basePremium;
  biInput.sa = this.proposalInput.policy.basicSumAssured;
  biInput.totalPremium = this.proposalInput.policy.totalPremium;
  biInput.serviceTax = this.proposalInput.policy.serviceTax;
  biInput.ownage = this.proposalInput.proposer.age;
  biInput.insage = this.proposalInput.insured.age;
  biInput.dob = this.proposalInput.insured.dob;
  biInput.owngender = this.proposalInput.proposer.gender;
  biInput.gender = this.proposalInput.insured.gender;
  biInput.insTitle=this.proposalInput.insured.title;
  biInput.insFirstName = this.proposalInput.insured.firstName; 
  biInput.insLastName=this.proposalInput.insured.lastName;
  biInput.ownTitle=this.proposalInput.proposer.title;
  biInput.ownFirstName = this.proposalInput.proposer.firstName; 
  biInput.ownLastName=this.proposalInput.proposer.lastName;
  biInput.nrv = this.proposalInput.insured.nrv;
  biInput.relPeriod = this.proposalInput.insured.relPeriod;
  biInput.rating = this.proposalInput.policy.rating;
  if(this.proposalInput.proposer.isPEP=='Y')
  {
  biInput.pepDetails = this.proposalInput.insured.pepDetails;
  }
  biInput.occupationCode = this.proposalInput.insured.employmentDetails.occupation;
  biInput.riders = this.addRiders();
  
  if (this.proposalInput.policy.productType=='ULIP'){
    biInput.funds = this.proposalInput.funds;
  }
  console.log(biInput);

  this.shared.getBI(biInput)
  .subscribe(data=>{

    this.illustration={key:"",errorPrint:[]};
    if (!data.hasOwnProperty("error")){
      this.bi = data;
      this.bi.biInput = biInput;
      this.biInputTag = true;
      // Check the premium and populate.
     // this.proposalInput.policy.totalPremium = Math.round(this.bi.installmentPremiumPayableWtRider);
     // this.proposalInput.policy.netPremium = Math.round(this.bi.mpWtRider);
      this.iterations = 0;
     this.resultPromise = setInterval(() => {
        this.getillustrationURL(this.bi.requestId); 
      },3000);
    } else{
      this.illustration={key:"Illustration couldn't be viewed due to the following errors",errorPrint:[]}
      var str=data.error;
      this.illustration.errorPrint=this.cleanArray(str.split(";"))
    }
  },
  error => {
    if(error.status == 401 )
      {
     let rtnUrl = window.location.href.split("=")[1];
     this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
     }else{
     this.alertservice.error("Something broken, try again!");
      }
    
  });
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
addRiders(){
			
  var riders = [];
  var rider = <any>{};
for (var i=0; i<this.covers.length; i++){
    rider = {};
    
  if(this.covers[i].isSelected=='Y'){
      rider.sa = this.covers[i].sa;
      rider.coverId = this.covers[i].coverId;
      riders.push(rider);
    } 
  
  }
  return riders;
}

otp(otpInput) {
  var pgUrl = otpInput.pgUrl;

}  
addEditMedical(questionId, action, i, type, genderType)
		{
      this.IsPregnant=false;
      if(questionId=='IsPregnant')
      {
        this.IsPregnant=true;
      }
       this.qIndex = 0;
    if(type == 1 && genderType ==''){  	
			for (var k=0; k<this.proposalInput.insured.medicalQuestions.length; k++){
				var item = this.proposalInput.insured.medicalQuestions[k].id;
				if (item == questionId){
					this.qIndex = k;
				}
      }
    }
    if(type == 2 && genderType ==''){  	
			for (var k=0; k<this.proposalInput.secInsured.medicalQuestions.length; k++){
				var item = this.proposalInput.secInsured.medicalQuestions[k].id;
				if (item == questionId){
					this.qIndex = k;
				}
      }
    }
    if(type == 1 && genderType =='F'){  	
			for (var k=0; k<this.proposalInput.insured.femaleHealthQuestions.length; k++){
				var item = this.proposalInput.insured.femaleHealthQuestions[k].id;
				if (item == questionId){
					this.qIndex = k;
				}
      }
    }
    if(type == 2 && genderType =='F'){  	
			for (var k=0; k<this.proposalInput.secInsured.femaleHealthQuestions.length; k++){
				var item = this.proposalInput.secInsured.femaleHealthQuestions[k].id;
				if (item == questionId){
					this.qIndex = k;
				}
      }
    }
			console.log(this.qIndex);
      if (action == "Add") {
        this.question = {};
        this.inputAddress.action = action;
        this.inputAddress.type  = type;
        this.inputAddress.genderType = genderType;
        $('#medicalQnsModal').modal('show');

      }else if(action == "Delete")
      {
      if (type == 1 && genderType =='F') 
      this.proposalInput.insured.femaleHealthQuestions[this.qIndex].details.splice(i, 1); 
      if(type == 1 && genderType =="") 
      this.proposalInput.insured.medicalQuestions[this.qIndex].details.splice(i, 1);

      if(type == 2 && genderType =='F' )
      this.proposalInput.secInsured.femaleHealthQuestions[this.qIndex].details.splice(i, 1);
      if(type == 2 && genderType =="") 
      this.proposalInput.secInsured.medicalQuestions[this.qIndex].details.splice(i, 1);
        this.validateMedicalPage();
      }
      
    }
    
submitMedicalQnsForm(qnsDetails){
	if(qnsDetails!="undefined")
					{
						if (this.inputAddress.action == "Add"){
							if (this.inputAddress.type  == 1 &&  this.inputAddress.genderType=='F' ) 
								this.proposalInput.insured.femaleHealthQuestions[this.qIndex].details.push(qnsDetails);
              if (this.inputAddress.type  == 1 &&  this.inputAddress.genderType=='' )
                this.proposalInput.insured.medicalQuestions[this.qIndex].details.push(qnsDetails);
              if (this.inputAddress.type  == 2 &&  this.inputAddress.genderType=='F' ) 
								this.proposalInput.secInsured.femaleHealthQuestions[this.qIndex].details.push(qnsDetails);
              if (this.inputAddress.type  == 2 &&  this.inputAddress.genderType=='' )
                this.proposalInput.secInsured.medicalQuestions[this.qIndex].details.push(qnsDetails);
							
              this.validateMedicalPage();
              $('#medicalQnsModal').modal('hide');
						}
					}
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
    }else if (ext != "pdf" && ext != "tif" && ext != "tiff"  && ext != "jpeg" && ext != "jpg"){
    this.docPages[index].status = 3;
    this.docPages[index].errorText = "Invalid file type";
    this.readytoUpload = false;
    }else if(this.fileDocs.displayName == 'Insured Photograph' && ext != "jpeg" && ext != "tif" && ext != "tiff" && ext != "jpg"){
      this.docPages[index].status = 3;
      this.docPages[index].errorText = "Invalid file type for photograph";
      this.readytoUpload = false;
    }else{
      this.filesUploaded[index] =  tobeUploaded[index].files[0];
    }
    if(ext == "tiff"  || ext == 'jpeg' || ext == 'jpg' ||ext == "tif" ){
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
            ctx.drawImage(img, 100,imgHeight+20);
     
            //ctx.globalAlpha = 0.5;
          }
         
        }
       reader.readAsDataURL( tobeUploaded[index].files[0]);
        this.showPreview[index] = true;

      }
    }

}

documentspopulate()
{
  if((typeof(this.proposalInput.documents) != "undefined" ))
  {
  for(let i=0;i< this.proposalInput.documents.length;i++)
  {
   var a="9";
   console.log("this.proposalInput.documents[i].docNum",this.proposalInput.documents[i].docNum);
   document.getElementById('sucessStatus'+a).innerHTML = "Uploaded";
   document.getElementById('sucessStatus'+a).style.color = "green";
  
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
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

uploadDocs(docNumber){
  this.readytoUpload=false;
 this.documentError={key:"",errorPirnt:[]};
  this.docUploaded = true;
  this.count = 0;
  //$('#loader').show();
  //locate the file element meant for the file upload.
  let inputEl;
  if(this.showCanvas){
    var canvas = <HTMLCanvasElement> document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL("image/jpeg");
    inputEl = this.dataURItoBlob(dataURL);
   }else{
    inputEl = this.filesUploaded[0];
  }
    this.proposalInput.policy.appId = this.proposalInput.policy.applicationNumber;
    this.proposalInput.policy.policyNo = this.proposalInput.policy.applicationNumber;
     this.shared.uploadUrl(this.URL, inputEl, this.docPages[0], this.proposalInput)
     .subscribe(data=>{
      
      this.docUploaded = false;
      this.readytoUpload = false;
      this.showPreview = false; 
     if (!data.hasOwnProperty("error")){
       var getData = <any>[];
         data=JSON.parse(data)
          getData = data;
          getData.docNum = docNumber;
          var documentId=getData.docId;
          var arr=<any>[];
          arr=documentId.split('-Page-1');
          getData.docId=arr[0];
       this.proposalInput.documents.push(getData);
         console.log(data);
        $('#uploadModal').modal('hide');
        $("#successfullUpload").modal('show');
        var docIdoffile=null;
        this.docCount++;
        if(this.proposalInput.documents.length>=this.filesToUpload.length)
        {
          this.allowSubmit = true;
        }
        else 
        {
          this.allowSubmit = false;  
        }
        
     let strUrl = window.location.href.split("=")[1];
    let decodeUriData =  decodeURIComponent(strUrl);
    this.requestData.productId = decodeUriData.split('/')[2];
    this.requestData.rmId = decodeUriData.split('/')[3];
    this.requestData.customerId = decodeUriData.split('/')[4];
    this.requestData.appNo = decodeUriData.split('/')[5];
    this.applicationData.proposalData = this.proposalInput;
          this.shared.saveApplicationData(this.applicationData, this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo)
          .subscribe(
            data =>{
        });
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
     this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
     }else{
      this.docUploaded = false;
      //this.showPreview = false;
      this.documentError={key:"Server Down, we are unable to upload the document. Please try after sometime!", errorPrint:[]}
      } 
    });
  
} 

submitProposal(){
  this.allowSubmitproposal = true; 
  $('#loader').show();
  $(document).ready(function(){
    $(this).scrollTop(0);
   });
  var healthProposal = this.proposalInput;
   console.log(JSON.stringify(healthProposal));
  this.shared.submitProposalLife(healthProposal, this.proposalInput.insurerId, this.proposalInput.productId)
  .subscribe(
    data =>{
     
    this.proposalError={key:"",errorPrint:[]};
    if (!data.hasOwnProperty("error")){
      this.allowSubmitproposal=false;
      console.log("proposaldata inside submit",data);
          $('#loader').hide();
        this.proposalResuestId = data.requestId;
        this.iterations = 0;
        this.resultPromise = setInterval(() => {
        this.getProposalSubmissionResults(); 
        }, 5000);
       

     } else
      {
        $('#loader').hide();
      this.allowSubmitproposal=false;
      var str=data.error;
      if(str=='Proposal Data Already Submitted')
      {
        this.proposalInput.submittedpayurl=data.payUrl;
      }
      else
      {
        this.allowSubmitproposal = false; 
        this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
        this.proposalError.errorPrint=str.split(";")
        console.log("this.proposalError.errorPrint",this.proposalError.errorPrint);
      }
     
      }
    },
    error => {
      if(error.status == 401)
        {
       let rtnUrl = window.location.href.split("=")[1];
       this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
       }else{
       this.alertservice.error("Something broken, try again!");
        }
             
  });
  
}
getProposalSubmissionResults(){
  $('#loader').show();
  this.iterations++;
  
  if (this.iterations >24) {
    this.allowSubmitproposal = false; 
    this.proposalError={key:"Proposal Submission couldn't be completed, the insurer didn't respond within 2 minutes. Please Retry!",errorPrint:[]}
    var str="";
    this.proposalError.errorPrint=this.cleanArray(str.split(";"));
    clearInterval(this.resultPromise);
    $('#loader').hide();
  }
  this.shared.getProposalSumbit(this.proposalResuestId)
  .subscribe(
    data =>{
      console.log("data",data);
      $('#loader').hide();
     if(data.hasOwnProperty("error")) {
      this.allowSubmitproposal = false; 
      this.alreadysubmittedProposal=false;
        clearInterval(this.resultPromise);
        var str=data.error;
      
        if(str=='Proposal Data Already Submitted')
        {
          this.allowSubmitproposal = false; 
          this.proposalInput.submittedpayurl=data.payUrl;
          this.proposalInput.SubmittedpolicyNumber=data.policyNo;
          this.tabStatus.eighthComplete='done';
          this.alreadysubmittedProposal=true;
          this.payVisible = false;
          $('#eighthTab').removeClass('tabdisable');
          $('#panel8').removeClass('in active');
          $('#panel9').addClass('in active');
          $('li:nth-child(8)').removeClass('active');
          $('li:nth-child(9)').addClass('active');
        }
        else
        {
          this.allowSubmitproposal=false;
        this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
        this.proposalError.errorPrint=this.cleanArray(str.split(";"))
        console.log(this.proposalError)
        }
       } 
       else if(data.hasOwnProperty('policyNo'))
       {
        this.allowSubmitproposal=false;
         this.proposalInput.policy.insurerPolicyNo = data.policyNo;
         console.log("this.proposalInput.policy.insurerPolicyNo",this.proposalInput.policy.insurerPolicyNo);
         if(data.hasOwnProperty('payUrl')){
         
         this.proposalInput.policy.payUrl = data.payUrl;
         this.payVisible = true;
         }
         else {
         
           this.payVisible = false;
         } // console.log("this.proposalInput.policy.payUrl",this.proposalInput.policy.payUrl);
        clearInterval(this.resultPromise);
        this.proposalError={key:"",errorPirnt:[]};
        this.tabStatus.eighthComplete='done';
        $('#eighthTab').removeClass('tabdisable');
        $('#panel8').removeClass('in active');
        $('#panel9').addClass('in active');
        $('li:nth-child(8)').removeClass('active');
        $('li:nth-child(9)').addClass('active');
        }
      
    },
    error => {
      if(error.status == 401)
        {
          this.allowSubmitproposal=false;
       let rtnUrl = window.location.href.split("=")[1];
       this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
       }else{
       this.alertservice.error("Something broken, try again!");
        }
      }
  );
}

agreeTC(agree) {
  if( typeof(agree) != 'undefined')
  {
    if(agree == 'agree')
    this.tcVisible = true;
    else this.tcVisible = false;
    $('#termsCondModal').modal('hide');
//  this.proposalError.errorPirnt=[];
  }
  //this.checkDocumentStatus()
}
showapp()
{
  if (this.appVisible){
    this.appVisible = false;
  } else
  {
    this.appVisible = true;
  } 
}
showappforjointLife()
{
  if (this.jopintappVisible){
    this.jopintappVisible = false;
  } else
  {
    this.jopintappVisible = true;
  } 
}

editFields(index, section)
{
  console.log("indexvalue",index)
 
 $('#panel'+index).addClass('in active');
 $('#panel'+section).removeClass('in active');
 if(index==1 || index==2)
 {
  $('li:nth-child('+index+')').addClass('active');
  $('li:nth-child('+section+')').removeClass('active');
 }
 else
 {
  if(this.proposalInput.policy.jointLife==true)
  {
    $('li:nth-child('+index+')').addClass('active');
    $('li:nth-child('+section+')').removeClass('active');
  }
  else
  {
 index=index-1;
 $('li:nth-child('+index+')').addClass('active');
 $('li:nth-child('+section+')').removeClass('active');
 }
}
}

lsCompletesec(){
			
  if (this.loading || typeof(this.proposalInput.secInsured) == "undefined"){
    return false;
  }
  var valid = true;
  this.pageErrors.healthErrorsec=false;
  this.pageErrors.healthErrortravelsec=false;
  this.pageErrors.healthoccupationerrorsec=false;
  var questionId = 0;
  
  for (var i =0; i<this.proposalInput.secInsured.personalQuestions.length; i++){
    var question = this.proposalInput.secInsured.personalQuestions[i];
  
    if (question.isYesNo == "Y" && question.id=='IsOutsideIndiaVacc180days' && this.proposalInput.secInsured.traveldetails.length==0 && this.proposalInput.secInsured.travelplandetailsfornextyr.length==0 && this.proposalInput.secInsured.travelplandetailsoveryr.length==0){
      this.pageErrors.healthErrortravelsec = true;
    }
    if (question.isYesNo == "N" && question.id=='IsOutsideIndiaVacc180days')
    {
      this.proposalInput.secInsured.traveldetails=[];
      this.proposalInput.secInsured.travelplandetailsfornextyr=[];
      this.proposalInput.secInsured.travelplandetailsoveryr=[];
    }
    if (question.isYesNo == "Y" && question.id=='IsOccupationHazardous' && this.proposalInput.secInsured.insuredDivingdetails.length==0){
      this.pageErrors.healthoccupationerrorsec = true;
    }
    if (question.isYesNo == "N" && question.id=='IsOccupationHazardous' ){
      this.proposalInput.secInsured.insuredDivingdetails=[];
    }
    if (question.isYesNo == "Y" && question.id!='IsOutsideIndiaVacc180days' && question.id!='IsOccupationHazardous'){
      
      if (question.hasOwnProperty("details") && question.details.length>0){
        continue;
      }else
      {
        this.pageErrors.healthErrorsec = true;
        valid = false;
        break;
      }
    }
  }
  return valid;
}
lsComplete(){
			
  if (this.loading || typeof(this.proposalInput.insured) == "undefined"){
    return false;
  }
  var valid = true;
  this.pageErrors.healthError = false;
  this.pageErrors.healthErrortravel = false;
  this.pageErrors.healthoccupationerror = false; 
  
  var questionId = 0;
  
  for (var i =0; i<this.proposalInput.insured.personalQuestions.length; i++){
    var question = this.proposalInput.insured.personalQuestions[i];
   if (question.isYesNo == "Y" && question.id=='IsOutsideIndiaVacc180days' && this.proposalInput.insured.traveldetails.length==0 && this.travelplanarray.length==0 && this.proposalInput.insured.travelplandetailsoveryr.length==0){
      this.pageErrors.healthErrortravel = true;
    }
    if (question.isYesNo == "Y" && question.id=='IsOccupationHazardous' && this.proposalInput.insured.insuredDivingdetails.length==0){
      this.pageErrors.healthoccupationerror = true;
    }
    if (question.isYesNo == "N" && question.id=='IsOccupationHazardous' ){
      this.proposalInput.insured.insuredDivingdetails=[];
    }
 if (question.isYesNo == "N" && question.id=='IsOutsideIndiaVacc180days')
    {
      this.proposalInput.insured.traveldetails=[];
      this.proposalInput.insured.travelplandetailsfornextyr=[];
      this.proposalInput.insured.travelplandetailsoveryr=[];
    }
  if (question.isYesNo == "Y" && question.id!='IsOutsideIndiaVacc180days'&& question.id!='IsOccupationHazardous'){
      
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
isProposerSameInsureds(value) {
			
  console.log(value);
  if(value=='Y') {
    this.proposalInput.insured.isProposerInsuredSame = "Y";
    this.proposalInput.insured.relationshipWithLi = "SAME";
    this.proposalInput.proposer.pepDetails=this.proposalInput.insured.pepDetails;
   if(this.proposalInput.insured.nationality=='IND')
   {
 
    this.proposalInput.insured.isOtherCountryTaxResi='N';
    this.proposalInput.insured.isOtherCitizenship='N';
   }
   if(this.proposalInput.insured.nationality=='NRI'||this.proposalInput.insured.isOtherCountryTaxResi=='Y'||this.proposalInput.insured.isOtherCitizenship=='Y')
  {
    
   // this.proposalInput.policy.policyType='N';
   this.proposalInput.advisorReport.policyType='N';
    //this.proposalInput.policy.policyTypeTitle='NRI';
  }

    this.proposalInput.proposer = this.proposalInput.insured;
  }
  else if(value=='N')
  {
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
       this.proposalInput.proposer.pepDetails= "";
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
    this.proposalInput.proposer.isProposerInsuredSame ="N";
    this.proposalInput.insured.isProposerInsuredSame ="N";
    this.proposalInput.proposer.IsEIAAccountHolder = "";
    this.proposalInput.proposer.EIAAccountNumber = "";
    this.proposalInput.proposer.IsGstReg = "";
    this.proposalInput.proposer.GstRegNo = "";
    this.proposalInput.proposer.isReqForEDocument="";
    this.proposalInput.proposer.IsReqForPromoOffers = "";
    this.proposalInput.proposer.IsReqForEPolicyInfo = "";
    }
  console.log(this.proposalInput.proposer);
  console.log(this.proposalInput.insured);
}
showIllustration()
		{
			
			var template = "";
			
			switch (this.proposalInput.policy.productId){
			case "109N091V01":
      case "109N108V01":
      case "109N108V02":
      
       // this.download();
				break
			case "109N089V03":
			case "109N102V01":
			case "109N095V01":
				//template = "./templates/proposal/life/bsli/modal/biTrad.html";
				break
			case "109N092V01":
			case "109N093V01":
			case "109N096V01":
				//template = "./templates/proposal/life/bsli/modal/biTradPar.html";
				break
			case "109L090V01":
			case "109L078V02":
			case "109L100V02":
			case "109L073V03":
				//template = "./templates/proposal/life/bsli/modal/biUlip.html";
				break
			}
        	

    }
   

 setABGvalue(ABGval)
 {
  this.proposalInput.payment.isABGvalue=ABGval.value;
 }

setStateforAdrforNRI(stateObj){
  this.InsNRIdetailsaddressind.state = stateObj.id;

}
setStateforAdrOthers(stateobj)
{
  this.InsNRIdetails.stateothr = stateobj.id; 
}
/*setStateforAdrforForeign(stateObj){
  this.InsNRIForeigndetails.state = stateObj.id;
}*/


setnationalityforpolicy()
{
if(this.proposalInput.insured.nationality=='NRI')
{
  this.proposalInput.advisorReport.policyType='NRI';
}
}
setpolicytype(policyobj){
  
this.proposalInput.advisorReport.policyType=policyobj.id;
//this.proposalInput.policy.policyTypeTitle=policyobj.value;
}

setNationality(reltnObj){
  this.proposalInput.insured.nationality = reltnObj.id;
 //  this.proposalInput.insured.nationality = reltnObj.value;
}


setOthercitizenship(obj)
{

  this.proposalInput.insured.otherCitizenshipCountry=obj.id;
  this.proposalInput.insured.otherCitizenshipCountryTitle=obj.value;
}

setRelationShipwithapp(relwithNomin)
{

  this.nomineeData.appointeeRelationWithNominee = relwithNomin.id;
  this.nomineeData.appointeeRelationWithNomineeTitle = relwithNomin.value;

}
setRelationShip(reltnObj){
  this.nomineeData.relationshipWithInsured = reltnObj.id;
  this.nomineeData.reltnWithInsuredTitle = reltnObj.value;
  switch(reltnObj.value)
  {
    case 'Grandfather':
    case 'Brother':
    case 'Son':
    case 'Husband':this.nomineeData.gender='M';
    break;
    case 'Grandmother':
    case 'Wife':
    case 'Daughter':
    case 'Father':
    case 'Sister':this.nomineeData.gender='F';
    break;
   

  }



}



setAddressTypeID(addrsTypeObj){
  this.address.addressType = addrsTypeObj.id;
  this.address.addressTypeTitle = addrsTypeObj.value;
}
setStateforAdr(stateObj){
  var mastervaluestate=this.getMasterValue("State", stateObj)
  this.address.disState = mastervaluestate;
  
   }
setCommuAddressTypeID(addressobj)
{
  if(this.inputAddress.type == "insured")
  {
  //this.address.addressSubType = addressobj.id;
  var mastervalue=this.getMasterValue("CommAddressType", addressobj)
  this.address.addressSubtypeTitle = mastervalue;

  }
  else
  {
   // this.address.addressSubType = addressobj.id;
    this.address.addressSubtypeTitle = addressobj.value;
  }
 }
 SetTravelCountry(obj)
 {
  this.travelPlandetails.country = obj.id;
  this.travelPlandetails.countryTitle = obj.value;
 }
 SetTravelCountrySec(obj)
 {
  this.travelPlandetailssec.country = obj.id;
  this.travelPlandetailssec.countryTitle = obj.value;
 }
 
 SetTravelCountryOveryrs(Obj1)
 {
   this.travelPlandetailsoveryr.country=Obj1.id;
   this.travelPlandetailsoveryr.countryTitle=Obj1.value;
 }
 SetTravelCountryOveryrsSec(Obj1)
 {
   this.travelPlandetailsoveryrsec.country=Obj1.id;
   this.travelPlandetailsoveryrsec.countryTitle=Obj1.value;
 }


setHealthState(healthState){
  this.family.healthState = healthState.id;
  this.family.healthStateTitle = healthState.value;
}
setDeathCause(deathCause){
  this.family.deathCause = deathCause.id;
  this.family.deathCauseTitle = deathCause.value;
}
familyHealthCompletesec()
{
  if (this.loading){
    return false;
  }
  var fatherCount = 0;
  var motherCount = 0;
  var healthCompletesec = false;
  var hasFather = false;
  var hasMother = false;
  if(this.proposalInput.policy.jointLife)
  {
  this.proposalInput.secInsured.personalQuestions.forEach(element => {
    if(element.id=="IsFamilyMemDiagnosedBefore60"){
    element.details.forEach(value => {
    if(value.member=="Father") {
      hasFather = true;
      fatherCount++;
    }
    if(value.member=="Mother") {
      hasMother = true;
      motherCount++;
    }
  })
  }

  })
 
  if (hasFather && hasMother){
    healthCompletesec = true;
  }
  
  if(motherCount !=1 || fatherCount != 1){
    healthCompletesec = false;
  }
  return healthCompletesec;
  }
}

NRIComplete()
{
  var NRIcomplete = false;
  //this.pageErrors.NRImandateComplete=false;

  if(this.proposalInput.insured.nationality!="" && this.proposalInput.insured.nationality!='IND'&& this.proposalInput.insured.nriMandate.address.length==0)
  {
   NRIcomplete=true;
  }
  else
  {
    NRIcomplete=false;
  
}
  return NRIcomplete
}
NRICompleteSec()
{
   var NRIcompletesec = false;
  //this.pageErrors.NRImandateComplete=false;
 
   if(this.proposalInput.secInsured.nationality!="" && this.proposalInput.secInsured.nationality!='IND'&& this.proposalInput.secInsured.nriMandate.address.length ==0)
  {
    NRIcompletesec=true;
  }
  else
  {
    NRIcompletesec=false;
  }

  return NRIcompletesec;
}
DriverComplete()
{
  var driverMandate = false;
  //this.pageErrors.NRImandateComplete=false;
  if(this.proposalInput.insured.employmentDetails.hasOwnProperty('insdriverdetils'))
  {
   if(this.proposalInput.insured.employmentDetails.occupation=="93"&& this.proposalInput.insured.employmentDetails.insdriverdetils.length==0)
  {
    driverMandate=true;
  }
  else
  {
    driverMandate=false;
  }
}
  return driverMandate;
}
DriverCompleteSec()
{
  var driverMandatesec = false;
  //this.pageErrors.NRImandateComplete=false;
  if(this.proposalInput.secInsured.employmentDetails.hasOwnProperty('insdriverdetils'))
  {
   if(this.proposalInput.secInsured.employmentDetails.occupation=="93"&& this.proposalInput.secInsured.employmentDetails.insdriverdetils.length==0)
  {
    driverMandatesec=true;
  }
  else
  {
    driverMandatesec=false;
  }
}
  return driverMandatesec;
}

ArmedForceComplete()
{
  var armedMandate = false;
  //this.pageErrors.NRImandateComplete=false;
  if(this.proposalInput.insured.employmentDetails.hasOwnProperty('insarmedforcedetils'))
  {
   if(this.proposalInput.insured.employmentDetails.occupation=="91"&& this.proposalInput.insured.employmentDetails.insarmedforcedetils.length==0)
  {
    armedMandate=true;
  }
  else
  {
    armedMandate=false;
  }
}
  return armedMandate;
}
ArmedForceCompleteSec()
{
  var armedMandatesec = false;
  //this.pageErrors.NRImandateComplete=false;
  if(this.proposalInput.secInsured.employmentDetails.hasOwnProperty('insarmedforcedetils'))
  {
   if(this.proposalInput.secInsured.employmentDetails.occupation=="91"&& this.proposalInput.secInsured.employmentDetails.insarmedforcedetils.length==0)
  {
    armedMandatesec=true;
  }
  else
  {
    armedMandatesec=false;
  }
}
  return armedMandatesec;
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
  this.proposalInput.insured.personalQuestions.forEach(element => {
    if(element.id=="IsFamilyMemDiagnosedBefore60"){
    element.details.forEach(value => {
    if(value.member=="Father") {
      hasFather = true;
      fatherCount++;
    }
    if(value.member=="Mother") {
      hasMother = true;
      motherCount++;
    }
  })
  }
  })
 
  if (hasFather && hasMother){
    healthComplete = true;
  }
  
  if(motherCount !=1 || fatherCount != 1){
    healthComplete = false;
  }
  return healthComplete;
}

populateDocuments(){
 
  if(this.proposalInput.hasOwnProperty('tabSucStatus'))
  {
    
 // console.log("tabSucStatus");
  }
 else
  {
    this.proposalInput.tabSucStatus=<any>[];
  }
  if(this.proposalInput.hasOwnProperty('submittedpayurl'))
  {
    
 // console.log("tabSucStatus");
  }
 else
  {
    this.proposalInput.submittedpayurl="";

  }
  if(this.proposalInput.hasOwnProperty('SubmittedpolicyNumber'))
  {
    
 // console.log("tabSucStatus");
  }
 else
  {
    this.proposalInput.SubmittedpolicyNumber="";

  }
  
  if(this.proposalInput.hasOwnProperty('appUrl'))
  {
    
  console.log("appUrl");
  }
 else
  {
    this.proposalInput.appUrl="";
  }
  if(this.proposalInput.insured.hasOwnProperty('pepDetails'))
  {
    
  console.log("pepDetails");
  }
 else
  {
    this.proposalInput.insured.pepDetails="";
  }
  if(this.proposalInput.policy.hasOwnProperty('insurancePurpose'))
  {
    
  console.log("insurancePurpose");
  }
 else
  {
    this.proposalInput.policy.insurancePurpose="";
  }
  if(this.proposalInput.insured.hasOwnProperty('selectedAddress'))
  {
    
  }
 else
  {
    this.proposalInput.insured.selectedAddress="";
  }
  if(this.proposalInput.proposer.hasOwnProperty('selectedAddress'))
  {
    
  }
 else
  {
    this.proposalInput.proposer.selectedAddress="";
  }
  
  if(this.proposalInput.policy.jointLife)
  {
    if(this.proposalInput.secInsured.hasOwnProperty('pepDetails'))
    {
      
    console.log("pepDetail");
    }
   else
    {
      this.proposalInput.secInsured.pepDetails="";
    }
    
   
 
  if(this.proposalInput.secInsured.employmentDetails.hasOwnProperty('insdriverdetils'))
  {

  }
  else
  {
    this.proposalInput.secInsured.employmentDetails.insdriverdetils=<any>[];
  }
  if(this.proposalInput.secInsured.employmentDetails.hasOwnProperty('insarmedforcedetils'))
  {

  }
  else
  {
    this.proposalInput.secInsured.employmentDetails.insarmedforcedetils=<any>[];
  }
}
if(this.proposalInput.insured.employmentDetails.hasOwnProperty('insdriverdetils'))
{

}

else
{
  this.proposalInput.insured.employmentDetails.insdriverdetils=<any>[];
}
if(this.proposalInput.insured.employmentDetails.hasOwnProperty('insarmedforcedetils'))
  {

  }
  else
  {
    this.proposalInput.insured.employmentDetails.insarmedforcedetils=<any>[];
  }
  if(this.proposalInput.hasOwnProperty('documents'))
  {
  console.log("document");
  }
  else
  {
    this.proposalInput.documents=<any>[];
  }
  if(this.proposalInput.hasOwnProperty('illustrationurl'))
  {
  console.log("illustrationurl");
  }
  else
  {
    this.proposalInput.illustrationurl="";
  }
  
  if(this.proposalInput.hasOwnProperty('jointLifeappUrl'))
  {
  console.log("jointLifeappUrl");
  }
  else
  {
    this.proposalInput.jointLifeappUrl="";
  }
  
  
  if (typeof(this.proposalInput.insured) != "undefined"){
    if (typeof(this.proposalInput.insured.ageProofType) != "undefined" && this.proposalInput.insured.ageProofType != ""){
     // this.ageProofIN = this.getKYCId("AgeProof", "IN", this.proposalInput.insured.ageProofType);
      this.addDocumentToUploadList('IN','AGEPROOF',this.proposalInput.insured.ageProofType);
    }
    if (typeof(this.proposalInput.insured.idProofType) != "undefined" && this.proposalInput.insured.idProofType != ""){
     // this.identityProofIN = this.getKYCId("IdentityProof", "IN", this.proposalInput.insured.idProofType);
      this.addDocumentToUploadList('IN','IDPROOF', this.proposalInput.insured.idProofType);
    }
    if (typeof(this.proposalInput.insured.incomeProofType) != "undefined" && this.proposalInput.insured.incomeProofType != ""){
     // this.incomeProofIN = this.getKYCId("IncomeProof", "IN", this.proposalInput.insured.incomeProofType);
      this.addDocumentToUploadList('IN','INCOMEPROOF',this.proposalInput.insured.incomeProofType);
    }
    if (typeof(this.proposalInput.insured.addressProofType) != "undefined" && this.proposalInput.insured.addressProofType != ""){
       // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
        this.addDocumentToUploadList('IN','RESPROOF',this.proposalInput.insured.addressProofType);	
       
    }
   if (typeof(this.proposalInput.payment.paymentMethod) != "undefined" && this.proposalInput.payment.paymentMethod != ""){
      // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
       this.addDocumentToUploadList('IN','PaymentMethod',this.proposalInput.payment.paymentMethod);	
      
   }
   if (typeof(this.proposalInput.advisorReport.policyType) != "undefined" && this.proposalInput.advisorReport.policyType != ""){
    // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
     this.addDocumentToUploadList('IN','PolicyType',this.proposalInput.advisorReport.policyType);	
    
 }
 if (typeof(this.proposalInput.insured.nationality) != "undefined" && this.proposalInput.insured.nationality != ""){
  // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
   this.addDocumentToUploadList('IN','Nationality',this.proposalInput.insured.nationality);	
  
}
  }

  if (this.proposalInput.policy.jointLife){
    if (typeof(this.proposalInput.secInsured) != "undefined")
    {
    if (typeof(this.proposalInput.secInsured.ageProofType) != "undefined" && this.proposalInput.secInsured.ageProofType != ""){
     // this.ageProofIN = this.getKYCId("AgeProof", "IN", this.proposalInput.insured.ageProofType);
      this.addDocumentToUploadList('SECIN','AGEPROOF',this.proposalInput.secInsured.ageProofType);
    }
  
    if (typeof(this.proposalInput.secInsured.incomeProofType) != "undefined" && this.proposalInput.secInsured.incomeProofType != ""){
     // this.incomeProofIN = this.getKYCId("IncomeProof", "IN", this.proposalInput.insured.incomeProofType);
      this.addDocumentToUploadList('SECIN','INCOMEPROOF',this.proposalInput.secInsured.incomeProofType);
    }
   
     if (typeof(this.proposalInput.secInsured.nationality) != "undefined" && this.proposalInput.secInsured.nationality != ""){
      // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
       this.addDocumentToUploadList('SECIN','Nationality',this.proposalInput.secInsured.nationality);	
      
    }
     this.filesToUpload=this.filesToUpload.concat(this.fileuploadsecondaryIns);


    }
    
  }
  if(this.proposalInput.documents.length>=this.filesToUpload.length)
  {
    this.allowSubmit = true;

  }
  else 
  {
    this.allowSubmit = false; 
   
  }
 
}
addDocumentToUploadList(insuredType,attribute, proofType){
  
  proofType = this.getMasterValue(attribute, proofType);
  var obj = <any>[];
 
  if(proofType!='Credit Card/ Debit Card/ Net Banking'|| proofType=='MWP' || proofType!='Indian')
  {
  if(insuredType == 'IN'){
    this.filesToUpload = this.filesToUpload.filter(item => !item.displayName.includes(proofType));
    switch(attribute){
          case 'AGEPROOF':  
                            obj.displayName =  "Insured - "+proofType+"(Age Proof)"; 
                            obj.fileType = "CDF";
                            obj.docId = "121111";
                            obj.fileName = "";
                           if (!this.itemExists(this.filesToUpload, obj.docId))
                            this.filesToUpload.push(obj);
                          else {
                          for(var i=0; i<this.filesToUpload.length;i++){
                            if(this.filesToUpload[i].docId == "121111")
                            this.filesToUpload[i].displayName = obj.displayName;
                          }
                        }
                          break;
          case 'IDPROOF':   
                            obj.displayName =  "Insured - "+proofType+"(Identity Proof)"; 
                            obj.fileType = "CDF";
                            obj.docId = "2023010113";
                            obj.fileName = "";
                          
                            if (!this.itemExists(this.filesToUpload, obj.docId))
                            this.filesToUpload.push(obj);
                            else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == "2023010113")
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }
                          break;
          case 'INCOMEPROOF':  
                            obj.displayName =  "Insured - "+proofType+"(Income Proof)"; 
                            obj.fileType = "CDF";
                            obj.docId = "121102";
                            obj.fileName = "";
                            
                            if (!this.itemExists(this.filesToUpload, obj.docId))
                        
                            this.filesToUpload.push(obj);	
                            else {
                              for(var i=0; i<this.filesToUpload.length;i++){
                                if(this.filesToUpload[i].docId == "121102")
                                this.filesToUpload[i].displayName = obj.displayName;
                              }
                            }
                          break;
          case 'RESPROOF':  
                            obj.displayName =  "Insured - "+proofType+"(Address Proof)"; 
                            obj.fileType = "CDF";
                            obj.docId = "111214";
                            obj.fileName = "";
                           
                           // console.log("displayName",obj.displayName);
                            if (!this.itemExists(this.filesToUpload, obj.docId))
                            this.filesToUpload.push(obj);
                         else {
                          for(var i=0; i<this.filesToUpload.length;i++){
                            if(this.filesToUpload[i].docId == "111214")
                            this.filesToUpload[i].displayName = obj.displayName;
                          }
                        }
                          break;  
             case 'PaymentMethod':  
           
                          obj.displayName =  "Cheque Image"; 
                          obj.fileType = "CHQ";
                          obj.docId = "111116";
                          obj.fileName = "";
                         
                         // console.log("displayName",obj.displayName);
                          if (!this.itemExists(this.filesToUpload, obj.docId))
                          this.filesToUpload.push(obj);
                       else {
                        for(var i=0; i<this.filesToUpload.length;i++){
                          if(this.filesToUpload[i].docId == "111116")
                          this.filesToUpload[i].displayName = obj.displayName;
                        }
                      }
                        break;  

               case 'PolicyType':  
           
                        obj.displayName =  "Policy Type-MWP"; 
                        obj.fileType = "MWP";
                        obj.docId = "2023010118";
                        obj.fileName = "";
                       
                       // console.log("displayName",obj.displayName);
                        if (!this.itemExists(this.filesToUpload, obj.docId))
                        this.filesToUpload.push(obj);
                     else {
                      for(var i=0; i<this.filesToUpload.length;i++){
                        if(this.filesToUpload[i].docId == "2023010118")
                        this.filesToUpload[i].displayName = obj.displayName;
                      }
                    }
                      break;  

            case 'Nationality':  
           
                      obj.displayName =  "Insured -NRI (Passport)"; 
                      obj.fileType = "NRI";
                      obj.docId = "2023010119";
                      obj.fileName = "";
                     
                     // console.log("displayName",obj.displayName);
                      if (!this.itemExists(this.filesToUpload, obj.docId))
                      this.filesToUpload.push(obj);
                   else {
                    for(var i=0; i<this.filesToUpload.length;i++){
                      if(this.filesToUpload[i].docId == "2023010119")
                      this.filesToUpload[i].displayName = obj.displayName;
                    }
                  }
                    break;  
                          
                      }
                    }
  
  
  else{
    this.fileuploadsecondaryIns = this.fileuploadsecondaryIns.filter(item => !item.displayName.includes(proofType));
    switch(attribute){
      case 'AGEPROOF':  
                        obj.displayName =  "Secondary Insured - "+proofType+"(Age Proof)"; 
                        obj.fileType = "CDF";
                        obj.docId = "121153";
                        obj.fileName = "";
                        if (!this.itemExists(this.fileuploadsecondaryIns, obj.docId))
                        this.fileuploadsecondaryIns.push(obj);
                        else {
                          for(var i=0; i<this.fileuploadsecondaryIns.length;i++){
                            if(this.fileuploadsecondaryIns[i].docId == "121153")
                            this.fileuploadsecondaryIns[i].displayName = obj.displayName;
                          }
                        }
                         break;
         
      case 'INCOMEPROOF':  
                       
                        obj.displayName =  "Secondary Insured - "+proofType+"(Income Proof)"; 
                        obj.fileType = "CDF";
                        obj.docId = "121152";
                        obj.fileName = "";
                        if (!this.itemExists(this.fileuploadsecondaryIns, obj.docId))
                        this.fileuploadsecondaryIns.push(obj);	
                        else {
                          for(var i=0; i<this.fileuploadsecondaryIns.length;i++){
                            if(this.fileuploadsecondaryIns[i].docId == "121152")
                            this.fileuploadsecondaryIns[i].displayName = obj.displayName;
                          }
                        }
                      break;

              case 'Nationality':  
                       
                      obj.displayName =  "Secondary Insured -NRI (Passport)"; 
                      obj.fileType = "CDF";
                      obj.docId = "2023010120";
                      obj.fileName = "";
                      if (!this.itemExists(this.fileuploadsecondaryIns, obj.docId))
                      this.fileuploadsecondaryIns.push(obj);	
                      else {
                        for(var i=0; i<this.fileuploadsecondaryIns.length;i++){
                          if(this.fileuploadsecondaryIns[i].docId == "2023010120")
                          this.fileuploadsecondaryIns[i].displayName = obj.displayName;
                        }
                      }
                    break;
                      
    }

  /*for(var i=0; i< this.filesToUpload.length; i++){

      if(this.filesToUpload[i].displayName.indexOf(proofType) >= 0){
      //  console.log("Hiiiii",this.filesToUpload[i].displayName);
      this.filesToUpload.splice(++i,1);
      break;
      }
  }*/
}
  }
  if(proofType=='General'|| proofType=='NRI')
  {
    for(var i=0; i< this.filesToUpload.length; i++){
      if (this.itemExists(this.filesToUpload,"2023010118"))
      {
      if(this.filesToUpload[i].docId == "2023010118")
      {
        this.filesToUpload.splice(i,1);
      }
    }
    }
  }
  if(insuredType == 'IN' && proofType=='Indian')
  {
  for(var i=0; i< this.filesToUpload.length; i++){
    if (this.itemExists(this.filesToUpload,"2023010119"))
    {
    if(this.filesToUpload[i].docId == "2023010119")
    {
      this.filesToUpload.splice(i,1);
    }
  }
  }
  }
  if(insuredType == 'SECIN' && proofType=='Indian')
  {
  for(var i=0; i< this.fileuploadsecondaryIns.length; i++){
    if (this.itemExists(this.fileuploadsecondaryIns,"2023010120"))
    {
    if(this.fileuploadsecondaryIns[i].docId == "2023010120")
    {
      this.fileuploadsecondaryIns.splice(i,1);
    }
  }
 
  }
  }


  if(proofType=='Credit Card/ Debit Card/ Net Banking')
  {
  for(var i=0; i< this.filesToUpload.length; i++){
    if (this.itemExists(this.filesToUpload,"111116"))
    {
    if(this.filesToUpload[i].docId == "111116")
    {
      this.filesToUpload.splice(i,1);
    }
  }
  if (this.itemExists(this.filesToUpload,"111047"))
  {
    if(this.filesToUpload[i].docId == "111047")
    {
      this.filesToUpload.splice(i,1);
    }
  }
  }
  }
  else if(proofType=='Cheque')
  {
    var obj1 = <any>[];
    obj1.displayName =  "Cancelled Cheque Leaf"; 
    obj1.fileType = "chequeleaf";
    obj1.docId = "111047";
    obj1.fileName = "";
 
    if (!this.itemExists(this.filesToUpload, obj1.docId))
                        this.filesToUpload.push(obj1);	
                        else {
                          for(var i=0; i<this.filesToUpload.length;i++){
                            if(this.filesToUpload[i].docId == "111047")
                            this.filesToUpload[i].displayName = obj1.displayName;
                          }
                        }
  
  }

 
  
}
itemExists(array, item){
  var exists= false;
  for (var i = 0; i< array.length; i++){
    if (array[i].docId == item){
      exists= true;
      break;
    }
  }  
  return exists;
}

additional(e)
{
  console.log('presee');
}

submitDriverDetails()
{
 
  if(this.inputDriver.type=='2')
  {
    $('#drivermodalsec').hide();
    if(typeof(this.driversec)!='undefined'){
  this.proposalInput.secInsured.employmentDetails.insdriverdetils.push(this.driversec);
 // this.driversec=JSON.stringify(this.driversec);
 
 // this.proposalInput.secInsured.employmentDetails.insdriverdetils.push(this.driversec);
  }
  }
  else
  {
    $('#drivermodal').hide();
  if(typeof(this.driver)!='undefined'){
 //this.driverdetils.push(this.driver);
 this.proposalInput.insured.employmentDetails.insdriverdetils.push(this.driver);
 //this.driverdetils.push(this.proposalInput.insured.employmentDetails.insdriverdetils);
}
  }
}
/*validateunusualhazards(e)
{
if(e.value=='Y')
{
  if((<HTMLInputElement>document.getElementById('insaircrew')).required && (<HTMLInputElement>document.getElementById('insordanance')).required){
    this.armedforceflag=true;
    }
}
}*/

SubmitArmedforce()
{
  $('#armedforcemodalsec').hide();
  if(this.inputDriver.type=='2')
  {
    
    if(typeof(this.armedForcessec)!='undefined'){
      //this.armedForcessec=JSON.stringify(this.armedForcessec);
      this.proposalInput.secInsured.employmentDetails.insarmedforcedetils.push(this.armedForcessec);
    }
  }
  else
  {
    $('#armedforcemodal').hide();

  if(typeof(this.armedForces)!='undefined'){
     this.proposalInput.insured.employmentDetails.insarmedforcedetils.push(this.armedForces);
    
   }
  }
}

cancelAction()
{
  $('#drivermodal').hide();
  $('#divingModal').hide();
  $('#drivermodalsec').hide();
  $('#biTermModel').hide();
  
  
}
cancelevent1()
{
  $('#armedforcemodal').hide();
  $('#armedforcemodalsec').hide();
}
cancelevent2()
{
  this.traveldetails="";
  $('#traveldetails').hide(); 
  $('#traveldetailsjointLife').hide(); 
  
}
submitDiverDetails()
{
  if(this.inputDiving.type=="insured")
  {
    this.appNo=sessionStorage.getItem('appNo');
    this.proposalInput.insured.insuredDivingdetails.push(this.diver);
  console.log("this.totaldivingdetails",this.totaldivingdetails);
    $('#divingModal').hide();
}
else
{
  this.appNo=sessionStorage.getItem('appNo');
  this.proposalInput.secInsured.insuredDivingdetails.push(this.diver);
  $('#divingModal').hide();
}
}
submitNRIDetails()
{
  
  if(this.inputNRI.type=='insured')
 {
  this.InsNRIdetails.NRIQheader="NRI Mandate";
  var tdyDate="";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  tdyDate = yyyy+'/'+mm+'/'+dd;

  this.InsNRIdetails.signDate="";
   this.InsNRIdetails.signCode="";
   this.InsNRIdetails.otherCountryCode="";
   this.InsNRIdetails.taxIdentificationNo="";
   /*this.InsNRIdetails.durationStayIndia="";
   this.InsNRIdetails.isStayIndia="";
   this.InsNRIdetails.purposeOfStayIndia="";
   this.InsNRIdetails.natureOfVisa="";*/
   this.InsNRIdetails.firstName= this.proposalInput.insured.firstName;
   this.InsNRIdetails.middleName=this.proposalInput.insured.middleName;
   this.InsNRIdetails.lastName=this.proposalInput.insured.lastName;
   
  this.InsNRIdetails.fatherSpouseName=this.InsNRIdetails.fatherfirstname+""+this.InsNRIdetails.fatherlastName;
  this.proposalInput.insured.nriMandate=this.InsNRIdetails;
  this.proposalInput.insured.nriMandate.contacts = [];
  this.proposalInput.insured.nriMandate.address = [];
    if (this.InsNRIdetailscontact.emailothr != "" && this.InsNRIdetailscontact.emailothr!= null)
    {
       var contact = <any>{};
        contact.contactType = "email";
        contact.contactText = this.InsNRIdetailscontact.emailothr;
        this.proposalInput.insured.nriMandate.contacts.push(contact);
      }
  
    
    if (this.InsNRIdetailscontact.mobilenumberforeignothr != "" && this.InsNRIdetailscontact.mobilenumberforeignothr!= null){
      var contact = <any>{};
        contact.contactType = "residence";
        contact.contactText = this.InsNRIdetailscontact.mobilenumberforeignothr;
        this.proposalInput.insured.nriMandate.contacts.push(contact);
     
  }
    if (this.InsNRIdetailscontact.officenumberforeignothr != "" && this.InsNRIdetailscontact.officenumberforeignothr!= null){
      var contact = <any>{};
      contact.contactType = "office";
      contact.contactText = this.InsNRIdetailscontact.officenumberforeignothr;
      this.proposalInput.insured.nriMandate.contacts.push(contact);
     }
    if (this.InsNRIdetailscontact.mobiletelephonenumberforeignothr != "" && this.InsNRIdetailscontact.mobiletelephonenumberforeignothr!= null){
      var contact = <any>{};
      contact.contactType = "mobileAbroad";
      contact.contactText = this.InsNRIdetailscontact.mobiletelephonenumberforeignothr;
      this.proposalInput.insured.nriMandate.contacts.push(contact);
     
    }
 
    if (typeof(this.InsNRIdetailsaddressind)!='undefined'){
      this.InsNRIdetailsaddressind.addressType="I"
      this.proposalInput.insured.nriMandate.address.push(this.InsNRIdetailsaddressind);
    }
    if (typeof(this.InsNRIdetailsaddressothr)!='undefined'){
      this.InsNRIdetailsaddressothr.addressType="A"
      this.proposalInput.insured.nriMandate.address.push(this.InsNRIdetailsaddressothr);
    }


  

 
 //this.InsNRIdetailsarray.push(this.InsNRIdetails);
  console.log("InsNRIdetails",this.InsNRIdetails);
  $('#NRImodal').hide();
 }
 else
 {
 
  this.InsNRIdetails.NRIQheader="NRI Mandate";
  var tdyDate="";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  tdyDate = yyyy+'/'+mm+'/'+dd;

  this.InsNRIdetails.signDate="";
   this.InsNRIdetails.signCode="";
   this.InsNRIdetails.otherCountryCode="";
   this.InsNRIdetails.taxIdentificationNo="";
  /* this.InsNRIdetails.durationStayIndia="";
   this.InsNRIdetails.isStayIndia="";
   this.InsNRIdetails.purposeOfStayIndia="";
   this.InsNRIdetails.natureOfVisa="";*/
   this.InsNRIdetails.firstName= this.proposalInput.secInsured.firstName;
   this.InsNRIdetails.middleName=this.proposalInput.secInsured.middleName;
   this.InsNRIdetails.lastName=this.proposalInput.secInsured.lastName;
  
   
  this.InsNRIdetails.fatherSpouseName=this.InsNRIdetails.fatherfirstname+""+this.InsNRIdetails.fatherlastName;
  this.proposalInput.secInsured.nriMandate=this.InsNRIdetails;
  this.proposalInput.secInsured.nriMandate.contacts = [];
  this.proposalInput.secInsured.nriMandate.address = [];
    if (this.InsNRIdetailscontact.emailothr != "" && this.InsNRIdetailscontact.emailothr!= null)
    {
       var contact = <any>{};
        contact.contactType = "email";
        contact.contactText = this.InsNRIdetailscontact.emailothr;
        this.proposalInput.secInsured.nriMandate.contacts.push(contact);
      }
  
    
    if (this.InsNRIdetailscontact.mobilenumberforeignothr != "" && this.InsNRIdetailscontact.mobilenumberforeignothr!= null){
      var contact = <any>{};
        contact.contactType = "residence";
        contact.contactText = this.InsNRIdetailscontact.mobilenumberforeignothr;
        this.proposalInput.secInsured.nriMandate.contacts.push(contact);
     
  }
    if (this.InsNRIdetailscontact.officenumberforeignothr != "" && this.InsNRIdetailscontact.officenumberforeignothr!= null){
      var contact = <any>{};
      contact.contactType = "office";
      contact.contactText = this.InsNRIdetailscontact.officenumberforeignothr;
      this.proposalInput.secInsured.nriMandate.contacts.push(contact);
     }
    if (this.InsNRIdetailscontact.mobiletelephonenumberforeignothr != "" && this.InsNRIdetailscontact.mobiletelephonenumberforeignothr!= null){
      var contact = <any>{};
      contact.contactType = "mobileAbroad";
      contact.contactText = this.InsNRIdetailscontact.mobiletelephonenumberforeignothr;
      this.proposalInput.secInsured.nriMandate.contacts.push(contact);
     
    }
 
    if (typeof(this.InsNRIdetailsaddressind)!='undefined'){
      this.InsNRIdetailsaddressind.addressType="I"
      this.proposalInput.secInsured.nriMandate.address.push(this.InsNRIdetailsaddressind);
    }
    if (typeof(this.InsNRIdetailsaddressothr)!='undefined'){
      this.InsNRIdetailsaddressothr.addressType="A"
      this.proposalInput.secInsured.nriMandate.address.push(this.InsNRIdetailsaddressothr);
    }


  

  $('#NRImodal').hide();
 }

  
  $('#NRImodal').hide();
}
cancelActionNRI()
{
  $('#NRImodal').hide();
  
}
submitTravelDetails()
{

  if(this.inputTravel.type=='insured')
  {
    this.appNo=sessionStorage.getItem('appNo');
    this.proposalInput.insured.traveldetails.push(this.traveldetails);
    
    $('#traveldetails').hide();

  }
  $('#traveldetails').hide();
  if(this.inputTravel.type=='secInsured')
  {
  this.proposalInput.secInsured.traveldetails.push(this.traveldetailssec);
     $('#traveldetailsjointLife').hide();
  } 
  $('#traveldetailsjointLife').hide();
 }
submitTravelPlanDetails()
{
 console.log("this.inputTravel.type",this.inputTravel.type);
 if(this.inputTravel.type=='1')
 {
  
  this.pageErrors.dateofdepartureError =false;
  this.pageErrors.dateofdepartureText="";
 
 /* if(this.travelPlandetails.dateOfarriving<this.travelPlandetails.dateOfDeparting)
  {
    console.log("this.pageErrors.dateofdepartureError",this.pageErrors.dateofdepartureError);
    this.pageErrors.dateofdepartureError = true;
    this.pageErrors.dateofdepartureText = "Date of Departure should be lesser than Date of Arrival";

  }*/
 //this.proposalInput.insured.travelplandetailsfornextyr=this.travelPlandetails;
 this.proposalInput.insured.travelplandetailsfornextyr.push(this.travelPlandetails);
 
  this.travelplanarray.push(this.travelPlandetails);
 console.log("this.traveldetails",this.travelplanarray);
$('#travelPlanData').hide();
 }
 else if(this.inputTravel.type=='2')
 {
   $('#travelPlanDataSec').hide();
  this.pageErrors.dateofdepartureError =false;
  this.pageErrors.dateofdepartureText="";
 
   this.proposalInput.secInsured.travelplandetailsfornextyr.push(this.travelPlandetailssec);
   this.travelplanarrayforsec.push(this.travelPlandetailssec);
 }
 }
submitTravelPlanDetails1()
{
 
  if(this.inputTravel.type=='1')
  {
    this.pageErrors.dateofdepartureError =false;
    this.pageErrors.dateofdepartureText="";
   
   /* if(this.travelPlandetailsoveryr.dateOfDeparting>this.travelPlandetailsoveryr.dateOfarriving)
    {
      this.pageErrors.dateofdepartureError = true;
      this.pageErrors.dateofdepartureText = "Date of Departure should be lesser than Date of Arrival";
   }
   else
   {*/
     this.proposalInput.insured.travelplandetailsoveryr.push(this.travelPlandetailsoveryr);
     this.travelplanarray1.push(this.travelPlandetailsoveryr);
  
    $('#travelPlanData1').hide();
   }
  
  else if(this.inputTravel.type=='2')
 {
  this.pageErrors.dateofdepartureError =false;
  this.pageErrors.dateofdepartureText="";
 
  /*if(this.travelPlandetailsoveryrsec.dateOfDeparting>this.travelPlandetailsoveryrsec.dateOfarriving)
  {
    this.pageErrors.dateofdepartureError = true;
    this.pageErrors.dateofdepartureText = "Date of Departure should be lesser than Date of Arrival";
 }
 else
 {*/
 
 this.proposalInput.secInsured.travelplandetailsoveryr.push(this.travelPlandetailsoveryrsec);
 this.travelplanarrayforsec1.push(this.travelPlandetailsoveryrsec);
 
  $('#travelPlanData1sec').hide();
 
 }
 
 }


cancelevent3()
{
  $('#travelPlanData').hide();
  $('#travelPlanDataSec').hide();
  $('#traveldetailsjointLife').hide();
  $('#travelPlanData1').hide();
  $('#travelPlanData1sec').hide();
  
}
NRImandateChange(type)
{
  this.errorCall1 = false;
  this.countrycodeflag=false;
this.inputNRI.type=type;

 if(this.inputNRI.type=='insured')
 {
 
  this.proposalInput.insured.countryCode='';
  if(this.proposalInput.insured.nationality=='IND')
  {
    this.proposalInput.advisorReport.policyType='G';
    this.countrycodeflag=true;
    this.proposalInput.insured.countryCode='91';
    
  }
  if(this.proposalInput.insured.nationality=='FNIO')
  {
    this.proposalInput.advisorReport.policyType='N';
    this.countrycodeflag=false;
   
    this.FNIOmandate=true;
    this.Othpersonalermandate=false;
    this.PIOmandate=false;
   
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
     //this.InsNRIForeigndetails={};
    //this.InsNRIOtherdetails={};
    this.nriaddressstate="";
    $('#NRImodal').show();
  }
  if(this.proposalInput.insured.nationality=='PIO')
  {
    this.proposalInput.advisorReport.policyType='N';
    this.countrycodeflag=false;
    this.PIOmandate=true;
    this.Othpersonalermandate=false;
    this.FNIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
    $('#NRImodal').show();
  }
  if(this.proposalInput.insured.nationality=="OTH")
  {
    this.proposalInput.advisorReport.policyType='N';
    this.countrycodeflag=false;
    this.PIOmandate=false;
    this.Othpersonalermandate=true;
    this.FNIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
  $('#NRImodal').show();
  }
  if(this.proposalInput.insured.nationality=="NRI")
  {
    this.proposalInput.advisorReport.policyType='N';
    this.countrycodeflag=false;
    this.PIOmandate=false;
    this.Othpersonalermandate=false;
    this.FNIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
    $('#NRImodal').show();
  }
  
}
else if(this.inputNRI.type=='secInsured')
{
  this.countrycodeflagsec=false;
  this.proposalInput.secInsured.countryCode='';
  if(this.proposalInput.secInsured.nationality=='IND')
  {
    this.proposalInput.secInsured.countryCode='91';
    this.countrycodeflagsec=true;
  }
  if(this.proposalInput.secInsured.nationality=='FNIO')
  {
    this.countrycodeflagsec=false;
    this.FNIOmandate=true;
    this.Othpersonalermandate=false;
    this.PIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
    $('#NRImodal').show();
  }
  if(this.proposalInput.secInsured.nationality=='PIO')
  {
    this.countrycodeflagsec=false;
    this.PIOmandate=true;
    this.Othpersonalermandate=false;
    this.FNIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
    $('#NRImodal').show();
  }
  if(this.proposalInput.secInsured.nationality=="OTH")
  {
    this.countrycodeflagsec=false;
    this.PIOmandate=false;
    this.Othpersonalermandate=true;
    this.FNIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
  $('#NRImodal').show();
  }
  if(this.proposalInput.secInsured.nationality=="NRI")
  {
    this.countrycodeflag=false;
    this.countrycodeflagsec=false;
    this.PIOmandate=false;
    this.Othpersonalermandate=false;
    this.FNIOmandate=false;
    this.InsNRIdetails={};
    this.InsNRIdetailscontact={};
    this.InsNRIdetailsaddressothr={};
    this.InsNRIdetailsaddressind={};
    this.nriaddressstate="";
    $('#NRImodal').show();
  }
  
}
}
 mandateChange()
    {
      
     // this.jointlife1=sessionStorage.getItem('jointlife1');
      this.appNo=sessionStorage.getItem('appNo');
      this.firstnamestorage=sessionStorage.getItem('firstnamestorage');
      this.middlenamestorage=sessionStorage.getItem('middlenamestorage');
      this.lastnamestorage=sessionStorage.getItem('lastnamestorage');
      this.fullname1=this.proposalInput.insured.firstName + " " + this.proposalInput.insured.lastName;
      this.commondetails.nameofapplicant=this.fullname1;
      this.commondetails.nameofapplicant=this.fullname1;
    if(this.proposalInput.insured.employmentDetails.occupation=="93")
      {
     
     if(typeof(this.proposalInput.insured.employmentDetails.insdriverdetils)!='undefined')
      {
        this.proposalInput.insured.employmentDetails.insdriverdetils=[];
        this.driver={};
      $('#drivermodal').show();
     }
       else
        {
          this.proposalInput.insured.employmentDetails.insdriverdetils=[];
          this.driver={};
         $('#drivermodal').show();
        }
      }
    if(this.proposalInput.insured.employmentDetails.occupation=="91")
      {
      //  this.proposalInput.insured.employmentDetails.insarmedforcedetils=<any>{};
        if(typeof(this.proposalInput.insured.employmentDetails.insarmedforcedetils)!='undefined')
       {
        this.proposalInput.insured.employmentDetails.insarmedforcedetils=[];
        this.armedForces={};
      $('#armedforcemodal').show();
       }
       else
       {
       this.proposalInput.insured.employmentDetails.insarmedforcedetils=[];
       this.armedForces={};
       $('#armedforcemodal').show();
       }
      }
    }
 travelPlanDetail(type)
  {
  
 this.inputTravel.type=type;
 if(this.inputTravel.type=='1')
 {
  this.proposalInput.insured.travelplandetailsfornextyr=<any>[];
  if(typeof(this.proposalInput.insured.travelplandetailsfornextyr)!='undefined')
  {
    this.travelPlandetails={};
     $('#travelPlanData').show();
  }
  else{
    this.travelPlandetails={};
    $('#travelPlanData').show();
  }
}
else
  {
    this.proposalInput.secInsured.travelplandetailsfornextyr=<any>[];
    if(typeof(this.proposalInput.secInsured.travelplandetailsfornextyr)!='undefined')
    {
      this.travelPlandetailssec={};
        $('#travelPlanDataSec').show();
    }
    else
    {
      this.travelPlandetailssec={};
      $('#travelPlanDataSec').show();
    }
  }
}
firstComplete(section)
{

if(this.tabStatus.firstComplete =='done')
{
  var tabstatus1=<any>{};
  tabstatus1.id="firstComplete";
  tabstatus1.value="done";
  this.proposalInput.tabSucStatus.push(tabstatus1);
}
}
travelPlanDetail1(type)
  {
   
    this.inputTravel.type=type;
    if(this.inputTravel.type=='1')
    {
      this.proposalInput.insured.travelplandetailsoveryr=<any>[];
      if(typeof( this.proposalInput.insured.travelplandetailsoveryr)!='undefined')
      {
        this.travelPlandetailsoveryr={};
         $('#travelPlanData1').show();
      }
      else
      {
        this.travelPlandetailsoveryr={};
        $('#travelPlanData1').show();
      }
    
    }
    else{
      this.proposalInput.secInsured.travelplandetailsoveryr=<any>[];
      if(typeof(this.proposalInput.secInsured.travelplandetailsoveryr)!='undefined')
      {
        this.travelPlandetailsoveryrsec={};
        $('#travelPlanData1sec').show();
      }
      else
      {
        this.travelPlandetailsoveryrsec={};
        $('#travelPlanData1sec').show();
      }
     
    }

  
  }
    mandateChange1(type)
    {
     
     //this.driver={};
      this.inputDriver.type=type;
     this.jointlife1=sessionStorage.getItem('jointlife1');
      this.appNo=sessionStorage.getItem('appNo');
      this.firstnamestorage1=sessionStorage.getItem('firstnamestorage1');
      this.middlenamestorage1=sessionStorage.getItem('middlenamestorage1');
      this.lastnamestorage1=sessionStorage.getItem('lastnamestorage1');
      this.fullname1= this.proposalInput.secInsured.firstName + " " + this.proposalInput.secInsured.lastName;
      this.commondetailssec.nameofapplicant=this.fullname1;
      this.commondetailssec.nameofapplicant=this.fullname1;

  if(this.proposalInput.policy.jointLife)
  {
   if(this.proposalInput.secInsured.employmentDetails.occupation=="93")
       {
      
        if(typeof(this.proposalInput.secInsured.employmentDetails.insdriverdetils)!='undefined')
        {
          this.driversec={};
          this.proposalInput.secInsured.employmentDetails.insdriverdetils=[];
      
         $('#drivermodalsec').show();
        }
        else
        {
          this.driversec={};
          this.proposalInput.secInsured.employmentDetails.insdriverdetils=[]
          $('#drivermodalsec').show();
        }
      }
       if(this.proposalInput.secInsured.employmentDetails.occupation=="91")
       {
       // this.proposalInput.secInsured.employmentDetails.insarmedforcedetils=<any>[];
        if(typeof(this.proposalInput.secInsured.employmentDetails.insarmedforcedetils)!='undefined')
        {
          this.proposalInput.secInsured.employmentDetails.insarmedforcedetils=[];
          this.armedForcessec={};
              $('#armedforcemodalsec').show();
        }
        else
        {
          this.proposalInput.secInsured.employmentDetails.insarmedforcedetils=[];
          this.armedForcessec={};
          $('#armedforcemodalsec').show();
        }
      }
    }
    
  }
  AddCertificationdetails()
  {
    this.divercertification={};
   // this.divercertificationarray=[];
   $('#Certificationmodal').show();
   
  }
  cancelActionCertificate()
  {
    $('#Certificationmodal').hide();
  }
 
  submitCertificationDetails()
  {
   
    if(typeof(this.divercertification)!='undefined')
    {
     console.log("divercertification.qualificationdate",this.divercertification.qualificationdate);
    this.divercertificationarray.push(this.divercertification);
 
    }
    $('#Certificationmodal').hide();
  }

getApplicationForm(){
  $(document).ready(function(){
    $(this).scrollTop(0);
  });
  $('#loader').show();
 this.pdfLoader = true;

  this.shared.getPdfRequestId(this.requestData.productId, this.requestData.rmId, this.requestData.customerId, this.requestData.appNo,this.proposalInput)
  .subscribe(data =>{
    this.pdfError={key:"",errorPirnt:[]};
    if(data.hasOwnProperty("error")) {
      $('#loader').hide();
      this.pdfLoader = false;
      this.pdfError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
      var str=data.error;
      this.pdfError.errorPrint=this.cleanArray(str.split(";"))
      console.log(this.pdfError)
    }else
    {
  
    this.iterations = 0;
    this.resultPromise = setInterval(() => {
     this.getPropSignedUrl(data.requestId); 
    },5000);
  }
  },
  error => {
  if(error.status == 401)
    {
   let rtnUrl = window.location.href.split("=")[1];
   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
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
    this.pdfError={key:"Generating Application form couldn't be completed, the server didn't respond within 2 minutes. Please Retry!",errorPrint:[]}
    var str="";
    this.pdfError.errorPrint=this.cleanArray(str.split(";"));
    clearInterval(this.resultPromise);
  }
  this.shared.getSignedURL(requestId)
  .subscribe(data=>{
    $('#loader').hide();
    if(data.hasOwnProperty("error") || data.length ==0) {
      this.loading = false;
      this.pdfLoader = false;
      clearInterval(this.resultPromise);
      this.pdfError={key:"Generating Application form couldn't be completed due to the following errors",errorPrint:[]}
      var str=data.error;
      this.pdfError.errorPrint=this.cleanArray(str.split(";"));
    
    } else if(data.hasOwnProperty('result'))
    {
      clearInterval(this.resultPromise);
      this.pdfError={key:"",errorPrint:[]};
      this.signedUrl = data.result.pdfUrl;
      if(this.proposalInput.policy.jointLife)
      {
      this.signedUrJointLife=data.result.jlPdfUrl;
      }
      this.getAppForm = true;
      this.pdfLoader = false;
    }
  },
  error => {
  if(error.status == 401)
    {
   let rtnUrl = window.location.href.split("=")[1];
   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
   }else{
   this.alertservice.error("Something broken, try again!");
    }
  });
 }


 getillustrationURL(requestId){
  this.iterations++;
  if (this.iterations >24) {
    $('#loader').hide();
    this.pdfLoader = false;
      this.illustration={key:"Illustration couldn't be viewed due to the following errors",errorPrint:[]}
      var str="";
      this.illustration.errorPrint=this.cleanArray(str.split(";"))
      clearInterval(this.resultPromise);
   
      
  }
  this.shared.gettheResults(requestId)
  .subscribe(data=>{
    $('#loader').hide();
    if(data.hasOwnProperty("error") || data.length ==0) {
      clearInterval(this.resultPromise);
      this.loading = false;
      this.pdfLoader = false;
      this.illustration={key:"Illustration couldn't be viewed due to the following errors",errorPrint:[]}
      var str=data.error;
      this.illustration.errorPrint=this.cleanArray(str.split(";"))
    
    } 
    else if(data.hasOwnProperty('result'))
    {
     
     this.illustration={key:"",errorPrint:[]};
     if(data.result.length!=0)
      {
      clearInterval(this.resultPromise);
      this.bi = data.result[0];
      this.proposalInput.illustrationurl = this.bi.illustrationUrl;
      this.proposalInput.policy.totalPremium = this.bi.installmentPremiumPayableWtRider;
      this.proposalInput.policy.netPremium = this.bi.mpWtRider;
      
      this.proposalInput.payment.totalAmtPaid= this.bi.installmentPremiumPayableWtRider;
      this.proposalInput.payment.initialPremium= this.bi.mpWtRider;
      this.proposalInput.policy.serviceTax = this.bi.serviceTax;
      this.proposalInput.policy.basePremium = this.bi.mpWtRider;
      if(this.bi.premiumBreakup.addon.length!=0)
     {
       for(var i=0;i<this.bi.premiumBreakup.addon.length;i++)
       {
       
        for(var j=0;j< this.covers.length;j++)
        {
         var totalcovers=<any>[];
         totalcovers=this.covers[j];
        if(this.bi.premiumBreakup.addon[i].coverId== this.covers[j].coverId)
        {
          
           this.covers[j].sa=this.bi.premiumBreakup.addon[i].sa;
           this.covers[j].premium=this.bi.premiumBreakup.addon[i].premium;
           this.covers[j].netPremium=this.bi.premiumBreakup.addon[i].netPremium;
           this.covers[j].minSA=this.bi.premiumBreakup.addon[i].minSA;
           this.covers[j].maxSA=this.bi.premiumBreakup.addon[i].maxSA;
           this.covers[j].pt=this.bi.premiumBreakup.addon[i].pt;
          
         }
       }
     }

    }
     
      if (this.bi.Requirements.length > 0) {
        this.bi.isMedical = true
      } else
      {
        this.bi.isMedical = false
      }
      if(this.proposalInput.illustrationurl!="") 
      {
         window.open(this.proposalInput.illustrationurl,'_blank');
      }
      this.illustrationbuttonflag=false;
      this.viewillustrationflag=false;
    }
 }
 else

 {
   this.alertservice.error("Illustration couldn't be viewed, please try after sometime!");
   this.illustrationbuttonflag=true;
 }
  },
  error => {
    if(error.status == 401)
      {
     let rtnUrl = window.location.href.split("=")[1];
     this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
     }else{
     this.alertservice.error("Something broken, try again!");
      }
    }
  );
 }


addDivingDetails(type)
{

  this.inputDiving.type=type;
  if(this.inputDiving.type=="insured")
  {
    this.proposalInput.insured.insuredDivingdetails=<any>[];
    //this.divercertification={};
    this.appNo=sessionStorage.getItem('appNo');
    var nameofApplicantfirstname=this.proposalInput.insured.firstName;
    var nameofApplicantlastname=this.proposalInput.insured.lastName;
    this.commondetails.nameofapplicant=nameofApplicantfirstname+" "+nameofApplicantlastname;
   // this.diver.birthdate=this.proposalInput.insured.dob;
   if(typeof(this.proposalInput.insured.insuredDivingdetails)!='undefined')
    {
   // this.diver=this.proposalInput.insured.insuredDivingdetails;
    $('#divingModal').show();
    
    }
    $('#divingModal').show();
     
  }
  else if(this.inputDiving.type=="secInsured")
  {
    this.proposalInput.secInsured.insuredDivingdetails=<any>[];
    //this.divercertification={};
  this.divercertificationarray=[];
    
    this.appNo=sessionStorage.getItem('appNo');
    var nameofApplicantfirstname=this.proposalInput.insured.firstName;
    var nameofApplicantlastname=this.proposalInput.insured.lastName;
    this.commondetails.nameofapplicant=nameofApplicantfirstname+" "+nameofApplicantlastname;
    //this.diver.birthdate=this.proposalInput.insured.dob;

     $('#divingModal').show();
  }
  

}
addtraveldetails(type)
{
 this.inputTravel.type=type;
 //console.log(" this.inputTravel.type",this.inputTravel.type)
  if(this.inputTravel.type=="insured")
  {
    this.proposalInput.insured.traveldetails=<any>[];
  this.appNo=sessionStorage.getItem('appNo');
  this.commondetails.nameofApplicantfirstname=this.proposalInput.insured.firstName;
  this.commondetails.nameofApplicantlastname=this.proposalInput.insured.lastName;
  this.commondetails.birthdate=this.proposalInput.insured.dob;
  if(typeof(this.proposalInput.insured.traveldetails)!='undefined')
  {


 $('#traveldetails').show();
  }
  else
  {
    $('#traveldetails').show();
  }
  
  
}  
 else if(this.inputTravel.type=="secInsured")
  {
    this.proposalInput.secInsured.traveldetails=<any>[];
  //  this.traveldetails.reasonforTravel=false;
      this.jointlife1=sessionStorage.getItem('jointlife1');
       this.appNo=sessionStorage.getItem('appNo');
       this.commondetailssec.nameofApplicantfirstname=this.proposalInput.secInsured.firstName;
       this.commondetailssec.nameofApplicantlastname= this.proposalInput.secInsured.lastName;
       this.commondetailssec.birthdate=this.proposalInput.secInsured.dob;
       if(typeof(this.proposalInput.secInsured.traveldetails)!='undefined')
       {
     
      $('#traveldetailsjointLife').show();
       }
       else
       {
         $('#traveldetailsjointLife').show();
       }

  }
}



firstname2(e)
{
  this.secfirstname=e.target.value
 //console.log("firstname2",this.secfirstname);
} 
lastname2(e)
{
  this.seclastName=e.target.value
 // console.log("lastname2",this.seclastName);
}
middlename2(e)
{
  this.secmiddleName=e.target.value
 // console.log("middlename2",this.secmiddleName);
}
firstname1(e)
{
  this.fullname1=e.target.value;
 //console.log("firstname1",this.fullname1);
} 
lastname1(e)
{
  this.lastname=e.target.value

}
uploadtravelhazardousdoc($event){
  const fileSelected: File = $event.target.files[0];
  var uploadeddoc1=<any>[];
  uploadeddoc1.push(fileSelected);
  console.log("uploadeddoc1",uploadeddoc1);
  
  }
middlename1(e)
{
  this.middlename=e.target.value
}
addDoc(document, number){
  if(this.showCanvas){
    this.showCanvas = false;
  }
  this.uploadbutton=false;
  this.showPreview= <any>[];
  this.documentNumber = number;
  this.count = 0;
 
  this.docPages = <any> [];
  this.fileDocs = document;
  //this.fileDocs.docType = document.displayName;
  this.documentError={key:"",errorPirnt:[]};
  $('#uploadModal').modal('show');
}
addPage() {
  
  this.uploadbutton=false;
  var doc = <any>{};
  ++ this.count;

  this.showPreview [this]= false;
  this.readytoUpload = false;
  //console.log("this.showPreview",this.showPreview)
  //console.log("this.fileDocs.docType",this.fileDocs.docType)
  doc.displayName = this.fileDocs.docType;
  doc.docId =  this.fileDocs.docId;
  doc.fileType = this.fileDocs.fileType;
  this.docPages.push(doc);
  console.log("Files to upload goes here", this.docPages);
 

}
deleteDoc(index){
  this.docPages.splice(index,1);
  this.showPreview.splice(index,1);
  this.readytoUpload = true;
}

  makePayment(){
      window.open(this.proposalInput.policy.payUrl,'_blank');
    } 
    showmakepaymentbutton()
    {
      window.open(this.proposalInput.submittedpayurl,'_blank');
    } 
download(){
      var doc = new jsPDF();
      var appData = this.proposalInput;
      var appDataillurl;
      var URL = this.URL;
      var data = new FormData();
      var uploadUrlPdf = this.shared.uploadUrlPdf;
      var requestHttp = this.http;
     html2canvas(document.getElementById('biModalbody')).then(function(canvas) {
           // var img = canvas.toDataURL("image/png");
           var imgData = canvas.toDataURL("image/jpeg",0.6);
           var imgWidth = doc.internal.pageSize.getWidth(); 
           var pageHeight = doc.internal.pageSize.getHeight();
      //  var imgWidth = 210; 
          // var pageHeight = 295;  
          
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var position = 0;
          
          doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
           heightLeft -= pageHeight;
          while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            let firstname=(<HTMLInputElement>document.getElementById('downloadfirstname')).value 
            let middlename=(<HTMLInputElement>document.getElementById('downloadmiddlename')).value
            let lastname=(<HTMLInputElement>document.getElementById('downloadLastname')).value
           let tdydate=new Date();
           let tdydate1=tdydate.getDate();
           let tdymonth=tdydate.getMonth()+1;
           let tdyyear=tdydate.getFullYear();
           let tdyhour=tdydate.getHours();
           let tdyminute=tdydate.getMinutes();
           let tdysec=tdydate.getSeconds();
            let downloadpdf=firstname+"_"+middlename+"_"+lastname+"_DigiShield"+":"+tdydate1+":"+tdymonth+":"+tdyyear+"_Time_"+tdyhour+":"+tdyminute+":"+tdysec;
      
          doc.save(downloadpdf+".pdf");
          var pdf = doc.output('blob');
       
          data.append('pdfData', pdf);
          console.log("formData pdf", data);
          uploadUrlPdf(URL, requestHttp, pdf,"111012", appData)
          .subscribe(
            data =>{
            
              data=JSON.parse(data);
              var illustrationUrl=<any>[]
              var illustrationUrl=data.fileUrl.split("https://storage.googleapis.com/dbs_applications/");
              var illuFileUrl=illustrationUrl[1];
              appDataillurl=illuFileUrl;
              appData.illustrationurl=appDataillurl;
           }
          );
          });
        
       
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
                 this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/bsliLifeProposal?proposalKeys='+rtnUrl }});
                 }else{
                 this.alertservice.error("Something broken, try again!");
                  }
                });
                
          
          }

          getSumAasured(cvr, indx, e)
          {
            this.errorCal[indx] = false;
            this.Viewillus=false;
            this.errMesg[indx] = '';
            this.errorCalmin[indx]= false;
            this.errMesgmin[indx] = '';
            this.errorCalblank[indx]= false;
            this.errMesgblank[indx] = '';
            if(e.target.value=='')
            {
              this.errorCal[indx]= true;
              this.Viewillus=true;
              this.errMesg[indx]="sum assured should not be blank";
            }
            else
            {
            if(e.target.value >cvr.maxSA)
            {
              this.errorCal[indx]= true;
              this.Viewillus=true;
              this.errMesg[indx]="sum assured should not be greater than "+this.covers[indx].maxSA;
            }
            if(e.target.value <cvr.minSA)
            {
              this.errorCalmin[indx] = true;
              this.Viewillus=true;
              this.errMesgmin[indx]="sum assured should be greater than "+this.covers[indx].minSA;
            }     
          }     
          
        }
          getValidmonth(e){
           // var year = 99;
           this.errorCall = false;
             if(e.target.value>12)
             {
               this.errorCall = true;
               this.errMessage1="maximum month should be 12";
             }
            }
            getValidmonthFNIO(e){
              // var year = 99;
              this.errorCall1 = false;
                if(e.target.value>12)
                {
                  this.errorCall1 = true;
                  this.errMessage2="maximum month should be 12";
                }
               }
               getValidmonthPIO(e){
                // var year = 99;
                this.errorCall2 = false;
                  if(e.target.value>12)
                  {
                    this.errorCall2 = true;
                    this.errMessage3="maximum month should be 12";
                  }
                 }
                 dateofconsultchange(obj)
                 {
                  this.errorCall3= false;
                  var todaysdate=new Date(obj);
                  this.errorCallmedical1= false;
                  if(todaysdate>this.medicalOption.maxDate)
                  {
                    this.errorCallmedical1= true;
                    this.errMsgmedical1="Invalid Date";
                  }

                  if(obj<this.question.dODiagnosis)
                  {
                    this.errorCall3= true;
                    this.errMessage4="Date of Last consultation should be greater than Date Of diagnosis";
                  }
                 }
                 diagnosisdate(eventdate)
                 {
                  this.errorCallmedical2= false;
                  var todaysdate=new Date(eventdate);
                  if(todaysdate>this.medicalOption.maxDate)
                  {
                    this.errorCallmedical2= true;
                    this.errMsgmedical2="Invalid Date";
                  }
                 }
                 hospitalisationmaxdate(eventdate)
                 {
                  this.errorCallmedical3= false;
                  var todaysdate=new Date(eventdate);
                  if(todaysdate>this.medicalOption.maxDate)
                  {
                    this.errorCallmedical3= true;
                    this.errMsgmedical3="Invalid Date";
                  }
                 }
                 dateofsurgerymaxdate(eventdate)
                 {
                  this.errorCallmedical4= false;
                  var todaysdate=new Date(eventdate);
                  if(todaysdate>this.medicalOption.maxDate)
                  {
                    this.errorCallmedical4= true;
                    this.errMsgmedical4="Invalid Date";
                  }
                 }
                 
                 changed() {
                  if (this.toppings.value.length < 4) {
                    this.mySelections = this.toppings.value;
                  
                    console.log()
                  } else {
                    this.toppings.setValue(this.mySelections);
                  }
                }
      
      validateCoverSelection(e)
      {
        
        if(e.coverId == 'ADDP'){
          for(var i=0;i<this.covers.length;i++){
            if(e.isSelected == 'Y'){
            if(this.covers[i].coverId=='ADD'){
              this.covers[i].isSelected = 'N';
              this.covers[i].coverFlag = true;
              this.adbbothflag=false;
            }
          }else { 
            this.covers[i].coverFlag= false;
            this.adbbothflag=false;
           }
          }
        
        }
        if(e.coverId == 'ADD'){
          for(var i=0;i<this.covers.length;i++){
            if(e.isSelected == 'Y'){
            if(this.covers[i].coverId=='ADDP'){
              this.covers[i].isSelected = 'N';
              this.covers[i].coverFlag = true;
              this.adbbothflag=false;
            }
          }else { this.covers[i].coverFlag = false;
            this.adbbothflag=false; }
          }
         }
         
      }   
      
      getValidPinCode(e){
        this.errMessagepincode ="";
        this.errorCallpincode = false;
         if(e.target.value ==""){
           this.errMessagepincode ="Pincode field can not blank";
         }
            else{
          this.shared.getPincode(e.target.value)
          .subscribe(
            data =>{
              if(Object.keys(data).length==0){
              this.errMessagepincode ="Pincode is not valid";
              this.errorCallpincode= true;
              }
              
              else{
               this.errMessagepincode="";
               this.errorCallpincode= false;
              }
            
            }
          );
        }   
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
}
