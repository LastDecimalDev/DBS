import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { AuthguardGuard } from '../../authguard.guard';

declare var jquery:any;
declare var $;
@Component({
  selector: 'app-critical-ill',
  templateUrl: './critical-ill.component.html',
  styleUrls: ['./critical-ill.component.css']
})
export class CriticalIllComponent implements OnInit {
  public consent:boolean = false;

  public userName = null;
  public firstName= null;
  public lastName= null;
  public annualIncome =[{name:'One Lakh',val:'100000'},{name:'Two Lakh',val:'200000'},{name:'Three Lakh',val:'300000'},{name:'Four Lakh',val:'400000'},{name:'Four and Half Lakh',val:'450000'},{name:'Five Lakh',val:'500000'},{name:'Five and Half Lakh',val:'550000'},{name:'Six Lakh',val:'600000'},{name:'Seven Lakh',val:'700000'},{name:'Seven and Half Lakh',val:'750000'},{name:'Eight Lakh',val:'800000'},{name:'Nine Lakh',val:'900000'},{name:'Ten Lakh',val:'1000000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Tweenty Lakh',val:'2000000'},{name:'Tweenty Five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Fifty Lakh',val:'5000000'},{name:'Sixty Lakh',val:'6000000'},{name:'1 Crore',val:'10000000'},{name:'1 Crore Fifty Lakhs',val:'15000000'},{name:'2 Crores',val:'20000000'},{name:'3 Crores',val:'30000000'}, {name:'4 Crores',val:'40000000'}, {name:'5 Crores',val:'50000000'}, {name:'6 Crores',val:'60000000'},{name:'7 Crores',val:'70000000'},{name:'8 Crores',val:'80000000'},{name:'9 Crores',val:'90000000'}, {name:'10 Crores',val:'100000000'}];
  public insureAmount =[{name:'Five Lakh',val:'500000'},{name:'Six Lakh',val:'600000'},{name:'Seven Lakh',val:'700000'},{name:'Eight Lakh',val:'800000'},{name:'nine Lakh',val:'900000'},{name:'Ten Lakh',val:'1000000'},{name:'Eleven Lakh',val:'1100000'},{name:'Twelve Lakh',val:'1200000'},{name:'Thirteen Lakh',val:'1300000'},{name:'Forteen Lakh',val:'1400000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Sixteen Lakh',val:'1600000'},{name:'Seventeen Lakh',val:'1700000'},{name:'Eighteen Lakh',val:'1800000'},{name:'Ninteen Lakh',val:'1900000'},{name:'Twenty Lakh',val:'2000000'},{name:'Twenty five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Thirty Five Lakh',val:'3500000'},{name:'forty Lakh',val:'4000000'},{name:'Forty Five Lakh',val:'4500000'},{name:'Fifty Lakh',val:'5000000'},{name:'Fifty Five Lakh',val:'5500000'},{name:'Sixty Lakh',val:'6000000'}];
  public annualIn: boolean = false;
  public onetime:boolean = false;
  public errorCall:boolean = false;
  public errMessage2 = null; 
  public errMessage3 = null;
  public errMessage = null; 
  public age:any;
  public ConcernMessage: boolean = false;
  public disposableIncome:any;
  public disposableIncome1:any;
  public ConcernMessage1: boolean = false;
  public errorMessageforage = null;
  public errorMessageformin = null;
  public errorCall2:boolean = false;

  public dateOptions = <any>{};

  public ciInput = <any>{};
  public ci=<any> {
		    		termDob : "",
		    		pincode : "",
		    		policyTerm : "",
		    		NoOfYrsPay : "",
		    		sa : "",
            gender: ""
		    };
  constructor(private shared: SharedService, private alertservice: AlertService, private router: Router, private authService: AuthguardGuard) { }

  ngOnInit() {
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
    this.disposableIncome= sessionStorage.getItem("disposableIncome");
    this.disposableIncome1=(50/100)*this.disposableIncome;        
    console.log('sum of age and payment term::',this.disposableIncome1);
   
}
policyTermvalid(e){
    this.errorCall = false;
      if(e.target.value<5)
      {
        this.errorCall = true;
        this.errMessage2="Minimum is 5"
      }
      else if(e.target.value>40)
      {
        this.errorCall = true;
        this.errMessage2="Maximum is 40"
      
      }
      else{
        this.errMessage2="";
        this.errorCall=false;
      }
      
  }
  incomeWarning(e){
    
    var incomeValue = this.ci.sa;
    console.log('paymentTermPolicy::',incomeValue);
    this.errorCall = false;
    if(incomeValue>this.disposableIncome1)
    {
      this.ConcernMessage1=true;
    }
    else{
      this.ConcernMessage1=false;
    }           
  }

  paymentTermValid(e){
    
    var paymentTermPolicy = this.ci.policyTerm;
   // console.log('paymentTermPolicy::',paymentTermPolicy);
    this.errorCall = false;
      if(e.target.value<5)
      {
        this.errorCall = true;
        this.errMessage3="Minimum is 5";
      }
      else if(e.target.value>=5 && e.target.value<10)
      {
        this.errorCall = false;
        this.errMessage3="";
      }
     else if(e.target.value>paymentTermPolicy)
      {
        this.errorCall = true;
        this.errMessage3="Payment Term can't be greater than Policy Term";
       
      }
      else if(e.target.value>50)
      {
        this.errorCall= true;
        this.errMessage3="Maximum is 40";
      
      }
      else{
        this.errMessage3="";
        this.errorCall=false;
      }
      var paymentTerm = this.ci.NoOfYrsPay;
      console.log('paymentTerm::',paymentTerm);
      
      this.ageCount();
      console.log('sum of age and payment term::',this.age+paymentTerm);
      if(((+paymentTerm)+(+this.age))>60)
      {
        this.ConcernMessage=true;
        console.log('print message');
        
      }
      else{
        this.ConcernMessage=false;
      }

  }
  isChecked(e)
  {
   if ($(e.target).prop("checked") )
   this.consent = true;
   else this.consent = false;
 
 
  }
 

  ageCount() {
	var date1 = new Date();
	var dob = (<HTMLInputElement>document.getElementById("brithID")).value;
	console.log('databitrh::',dob)
	var date2 = new Date(dob);      
		var y1 = date1.getFullYear();
		//getting current year            
		var y2 = date2.getFullYear();
		//getting dob year            
		this.age = y1 - y2;
		//console.log('age::',this.age);
    if(this.age>70)
    {
      this.errorMessageforage = 'Maximum age is 70 years.';
      this.errorCall2= true;
      console.log('max age');
    }
    else
    {
      this.errorMessageforage = "" ;
      this.errorCall2= false;

    }
    if(this.age<18)
            {
              this.errorMessageformin = 'Minimum age should be 18 years.';
              this.errorCall= true;
              console.log('min age');
            }
            else
            {
              this.errorMessageformin = "" ;
              this.errorCall= false;

            }
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

submitForm(criticalInsu){
  this.ciInput.dob= this.ci.termDob;
  this.ciInput.pincode = this.ci.pincode;
  this.ciInput.gender=(this.ci.gender =='male')? 'M': 'F';
  this.ciInput.sa = this.ci.sa;
  this.ciInput.pt= this.ci.policyTerm;
  this.ciInput.ppt= this.ci.NoOfYrsPay;
  this.shared.getSeePolicies('Life', 'CIL', this.ciInput)
 .subscribe(data=>{
  if(data.result){
    let cuskey = window.location.href.split('=')[1];
    console.log("DATA goes here", data.result);
    data.requestParams.customerId = cuskey;
    data.requestParams.rmId = sessionStorage.getItem('rmId');
    let prodQuote = 'Life/CIL/'+ btoa(JSON.stringify(data.requestParams));
    this.router.navigate(['home/policypage'], { queryParams: { quotes: prodQuote}});
  }else this.alertservice.error("Please fill out all the mandatory fields");
  },
  error => {
    this.alertservice.error("Something broken, try again!");
    sessionStorage.clear();
    setTimeout(function(){
      document.location.reload();
    }, 3000);
  }
  );

}
 userSignout(){
    this.router.navigate(['home/login']);
    this.authService.reset();
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
}



