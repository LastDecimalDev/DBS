import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../sharedServices/alert.service';
import { SharedService }from '../../sharedServices/shared.service';
import { accessKey, secretKey }from '../../sharedServices/config';
import { DISABLED } from '../../../../node_modules/@angular/forms/src/model';
import { NgForm } from '../../../../node_modules/@angular/forms';
declare var jquery:any;
declare var $;

@Component({
  selector: 'app-annuity',
  templateUrl: './annuity.component.html',
  styleUrls: ['./annuity.component.css']
})
export class AnnuityComponent implements OnInit {

  public accessKey = accessKey;
  public secretKey = secretKey;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public termInput = <any>{};
  public age:any;
  public showAnnualupto: boolean = false;
  public errMessage = null; 
  public errMessage1 = null; 
  public errMessage2 = null; 
  public errMessage3 = null;
  public errorCallJoint:boolean = false;
  public errMessagejoint = null; 
  public limitedValue = [
		{"id" : 1, "value" : "1"},
		{"id" : 5, "value" : "5"},
		{"id" : 7, "value" : "7"},
		{"id" : 10, "value" : "10"},
		{"id" : 12, "value" : "12"},
		{"id" : 15, "value" : "15"},
		{"id" : 20, "value" : "20"},
		{"id" : 25, "value" : "25"},
    {"id" : 30, "value" : "30"},
    {"id" : 50, "value" : "50"}
    ];
  public dateOptions = <any>{};
  public errorCall:boolean = false;
  public errorCall1:boolean = false;
  public errorCall2:boolean = false;
  public errorCall3:boolean = false;
  public lastDigit:any;
  public annualIn: boolean = false;
  public ConcernMessage: boolean = false;
  public shown = false;
  public annualSixty: boolean = false;
  public onetime:boolean = false;
 public consent:boolean = false;
 public errorCus: boolean = false;
 public errorMessageforagemonth=null;
 public errorMessageforage =null;
 public errorCall4: boolean=false;
 public month:any;
 public errorMessageformin = null;
 public errorCall5:boolean = false;
 public errorMessageforSecMin=null;
 public errorMessageforageSec = null;

  //for image radio
  imgSrc:any="../../../assets/images/Male_N.svg";
  imgSrc1:any="../../../assets/images/Female_N.svg";


  constructor( private shared: SharedService, private alertservice: AlertService, private  router:Router){}

  ngOnInit() {
    let cuskey = window.location.href.split('=')[1];
    if(cuskey == '' || cuskey== undefined){
      document.getElementById('errText').innerHTML = "Unable to find the customer key, please choose the product/policy once more!"
      this.errorCus = true;
    }

    

    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
      $('#pincodecritical').tooltip({'trigger':'focus', 'title': ''});


      var dateToday = new Date();
      var yearMin = dateToday.getFullYear() - 60;
      var yearMax = dateToday.getFullYear() - 18;
      
      var monthToday = dateToday.getMonth();
      var dayToday = dateToday.getDate();
      this.dateOptions = <any>{
    		maxDate: new Date(yearMax, monthToday, dayToday),
    		minDate: new Date(yearMin, monthToday, dayToday)
    };
    var number = document.getElementById('sumInsured');
    
    
// Listen for input event on numInput.
   
    }
    
    keyPress(event) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
     let maxlenght = 6;
      console.log('lenghtt',event.target.value);
      
      if (!pattern.test(inputChar)) {    
          // invalid character, prevent input
          event.preventDefault();
      }
      
 }
 isChecked(e)
 {
  if ($(e.target).prop("checked") )
  this.consent = true;
  else this.consent = false;


 }

    getValidSum(){
     var proTermInput1 = <any> {};
     proTermInput1=this.termInput.sa%100000;
     console.log('proTermInput1',proTermInput1);
      
      this.errorCall = false;
      this.errorCallJoint = false;
      if( this.termInput.isJointLife =='N' && this.termInput.sa<3000000)
      {
        this.errorCallJoint = true;
        this.errMessagejoint="Minimum sum assured should be 30,00,000";
        this.errorCall =false;
        console.log('sum addu',this.errMessagejoint);
        
      }
      else if( this.termInput.isJointLife =='Y' && this.termInput.sa<6000000)
      {
        this.errorCallJoint = true;
        this.errMessagejoint="Minimum sum assured should be 60,00,000";
        this.errorCall =false;
        console.log('sum addu joint',this.errMessagejoint);
        
      }
      else{
        this.errorCallJoint = false;
        this.errMessagejoint="";

      }
      if(this.termInput.sa>1000000000)
      {
        this.errorCall = true;
        this.errMessage1="Maximum sum assured should be 100,00,00,000";
      }
      
      else if(proTermInput1!='0')
      {
        this.errorCall = true;
        this.errMessage1="Sum assured should be increment of 1,00,000";
      }
      else{
        this.errMessage1="";
        this.errorCall = false;
      } 
       }

  policyTermvalid(e){
    this.errorCall = false;
      if(e.target.value<5)
      {
        this.errorCall = true;
        this.errMessage2="Minimum is 5"
      }
      else if(e.target.value<this.termInput.ppt)
      {
        this.errorCall = true; 
        this.errMessage2="Policy Term should be greater than or equal to Payment Term.";
        console.log('hghjghj',this.errMessage2);
        
      }
      else if(e.target.value>82)
      {
        this.errorCall = true;
        this.errMessage2="Maximum is 82"
      
      }
      
      else{
        this.errMessage2="";
        this.errorCall=false;
      }
      
      
  }

  paymentTermValid(e){
    
    var paymentTermPolicy = this.termInput.pt;
    console.log('paymentTermPolicy::',paymentTermPolicy);
    this.errorCall = false;
      if(e.target.value<5)
      {
        this.errorCall = true;
        this.errMessage3="Minimum is 5"
      }
      else if(e.target.value>=5 && e.target.value<10)
      {
        this.errorCall = false;
        this.errMessage3="";
      }
     else if(e.target.value>paymentTermPolicy) 
      {
        this.errorCall = true;
        this.errMessage3="Payment Term can't be greater than Policy Term"
       
      }
      else if(e.target.value>50)
      {
        this.errorCall= true;
        this.errMessage3="Maximum is 50"
      
      }
      else{
        this.errMessage3="";
        this.errorCall=false;
      }
      var paymentTerm = this.termInput.ppt;
      
      this.ageCount();
      if(((+paymentTerm)+(+this.age))>60)
      {
        this.ConcernMessage=true;
        
      }
      else{
        this.ConcernMessage=false;
      }

  }
 getValidPinCode(e){
   this.errMessage ="";
   this.errorCall = false;
    if(e.target.value ==""){
      this.errMessage ="Pin Code field cannot be blank";
    }
       else{
     this.shared.getPincode(e.target.value)
     .subscribe(
       data =>{
         if(Object.keys(data).length==0){
         this.errMessage ="Pincode is not valid";
         this.errorCall= true;
         }
         
         else{
          this.errMessage="";
          this.errorCall= false;
         }
       
       }
     );
   }   
} 

ageCount() {
	var date1 = new Date();
	var dob = (<HTMLInputElement>document.getElementById("brithID")).value;
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
 
    if(this.age>70)
    {
      this.errorMessageforage = 'Maximum age is 70 years.';
      this.errorCall5= true;
      this.showAnnualupto = false;
      console.log('max age');
    }
    else
    {
      this.errorMessageforage = "" ;
      this.errorCall5= false;
      this.showAnnualupto = true;
      if(this.annualSixty)
      this.termInput.ppt = 60 - (Number(this.age));
    }
    if(this.age<18)
            {
              this.errorMessageformin = 'Minimum age should be 18 years.';
              this.errorCall= true;
              this.showAnnualupto = false;
              console.log('min age');
            }
            else
            {
              this.errorMessageformin = "" ;
              this.errorCall= false;
              this.showAnnualupto = true;
              if(this.annualSixty)
              this.termInput.ppt = 60 - (Number(this.age));
            }
  }
  ageCountSec() {
    var date1 = new Date();
    var dob = (<HTMLInputElement>document.getElementById("secbrithID")).value;
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
   
      if(this.age>70)
      {
        this.errorMessageforageSec = 'Maximum age is 70 years.';
        this.errorCall5= true;
        console.log('max age');
      }
      else
      {
        this.errorMessageforageSec = '';
        this.errorCall5= false;
        
      }
      if(this.age<18)
              {
                this.errorMessageforSecMin = 'Minimum age should be 18 years.';
                this.errorCall= true;
                console.log('min age');
              }
              else
              {
                this.errorMessageforSecMin = '';
                this.errorCall= false;
                
              }
    }
  calculateTermPpt(){
    if(this.age != undefined){
      this.termInput.ppt = 60 - Number(this.age);
      console.log('pptttt::',this.termInput.ppt+" "+this.age);
      
    }
  
    else{

    } 
  }
 submitForm(){
  let cuskey = window.location.href.split('=')[1];

   this.termInput.age = this.shared.calculateAge(this.termInput.dob);
   console.log('termInput age',this.termInput.dob)
   if(this.termInput.smoker == "No")
    this.termInput.rating = "NS";
    else this.termInput.rating = "S";

    if(this.termInput.secSmoker == "No")
    this.termInput.secRating = "NS";
    else this.termInput.secRating = "S";  
   // this.termInput.mode = "LP";
    var proTermInput = <any> {};
    //proTermInput.authentication = {"accesskey":"DBS","secretkey":"DBS"};
    proTermInput.authentication = {"accesskey": this.accessKey,"secretkey": this.secretKey};
    proTermInput.rmId = sessionStorage.getItem('rmId');
    proTermInput.customerId = cuskey;

    proTermInput.dob = this.termInput.dob;
    proTermInput.pincode = this.termInput.pincode;
    proTermInput.rating = this.termInput.rating;
    proTermInput.gender = this.termInput.gender;
    proTermInput.mode = this.termInput.mode;
   // proTermInput.sa = this.termInput.sa;
  //  proTermInput.payTo60 = this.termInput.payTo60;
    proTermInput.secrating = this.termInput.secRating;
    proTermInput.secdob = this.termInput.secdob;
    proTermInput.isJointlife = this.termInput.isJointLife;
    proTermInput.isStartwith=this.termInput.isStartwith;
    proTermInput.purchasePrice=this.termInput.purchasePrice;
    proTermInput.annuity=this.termInput.annuityPrice;
    
   // proTermInput.isLifeLongCover = this.termInput.isLifeLongCover;
    if(this.termInput.gender == "M")
      proTermInput.secgender = 'F';
    else proTermInput.secgender = 'M';
    //proTermInput.smoker= this.termInput.smoker;
    /*if (this.termInput.ppt == 1) {
      this.termInput.mode = "SP";
    }
    if (this.termInput.ppt == this.termInput.pt) {
      
      this.termInput.mode = "RP";
    }*/
   // this.termInput = {age:25, dob:"1993-02-02", gender:"M", mma:"60", mode:"1", pincode:"560068", ppt:20, pt:11, rating:"NS",sa:10000000,smoker:"No"};
  
    let prodQuote = 'Life/ANN/' + btoa(JSON.stringify(proTermInput));
    this.router.navigate(['home/policypage'], { queryParams: { quotes: prodQuote}});
        
				
    
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
   getLifeLongCover(){
     if(this.termInput.isLifeLongCover == 'Y'){
      this.termInput.pt = 100 - this.age;
     }else{
      this.termInput.pt = '';
     }
   }
}
