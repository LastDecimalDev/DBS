import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from '../../sharedServices/shared.service';
import { accessKey, secretKey } from '../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-saving-trad',
  templateUrl: './saving-trad.component.html',
  styleUrls: ['./saving-trad.component.css']
})
export class SavingTradComponent implements OnInit {
  public accessKey = accessKey;
  public secretKey = secretKey;
  public userName = null;
  public firstName= null;
  public lastName= null;
 public investamount =[{name:'One Lakh',val:'100000'},{name:'Two Lakh',val:'200000'},{name:'Three Lakh',val:'300000'},{name:'Four Lakh',val:'400000'},{name:'Four and Half Lakh',val:'450000'},{name:'Five Lakh',val:'500000'},{name:'Five and Half Lakh',val:'550000'},{name:'Six Lakh',val:'600000'},{name:'Seven Lakh',val:'700000'},{name:'Seven and Half Lakh',val:'750000'},{name:'Eight Lakh',val:'800000'},{name:'Nine Lakh',val:'900000'},{name:'Ten Lakh',val:'1000000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Tweenty Lakh',val:'2000000'},{name:'Tweenty Five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Fifty Lakh',val:'5000000'},{name:'Sixty Lakh',val:'6000000'},{name:'1 Crore',val:'10000000'}];
 public annualPrepay: boolean = false;
 public errMessage = null;
 public errorCall:boolean = false;
  public errMessage2: string = null;
  public age:any;
  public ConcernMessage: boolean = false;
  public ConcernMessage1: boolean = false;

  public minPPT:any;
  public maxPPT :any;
  public disposableIncome:any;
  public disposableIncome1:any;
  public dateOptions = <any>{};
  public consent:boolean = false;
  public errorMessageforage = null;
 public errorMessageforSecMin=null;
 public errorMessageforageSec = null;
 public errorMessageforFutureDate =null;
 public errorCall2: boolean=false;
 public errorCall4: boolean=false;
 public month:any;
 public errorMessageforfuture = null;
 public errorCall3: boolean=false;
 public errorCallJoint:boolean = false;
 public errMessagejoint = null; 
 public errorMessageformin = null;
 public errorCall5:boolean = false;
 public inputSave = {pincode:'', dob:'', gender:'', age:null, secRating:'', secSmoker:'', secdob:'', isJointLife:'', childAge:'', mode:'1', smoker:'',rating:'',maxPPT:'14',minPPT:'10', minPT:'5', maxPT:'99',productType:'', premiumPay:'',sa: null,payoutType:''};
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
      $('#pincoderugular').tooltip({'trigger':'focus', 'title': ''});

      this.disposableIncome= sessionStorage.getItem("disposableIncome");
      this.disposableIncome1=(50/100)*this.disposableIncome;        
      console.log('sum of age and payment term::',this.disposableIncome1);
        
      var dateToday = new Date();
      var yearMin = dateToday.getFullYear() - 60;
      var yearMax = dateToday.getFullYear() - 18;
      
      var monthToday = dateToday.getMonth();
      var dayToday = dateToday.getDate();
      
      this.dateOptions = <any>{
    		maxDate: new Date(yearMax, monthToday, dayToday),
    		minDate: new Date(yearMin, monthToday, dayToday)
    };
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

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
    proTermInput1 = this.inputSave.sa%1000;
    console.log('proTermInput1',proTermInput1);
    
     this.errorCall = false;
     if( this.inputSave.isJointLife =='N' && this.inputSave.sa<15000)
     {
       this.errorCallJoint = true;
       this.errMessagejoint="Minimum premium should be 15,000";
      // this.errorCall =false;
       console.log('sum addu',this.errMessagejoint);
       
     }
     else if( this.inputSave.isJointLife =='Y' && this.inputSave.sa<50000)
     {
       this.errorCallJoint = true;
       this.errMessagejoint="Minimum premium should be 50,000";
      // this.errorCall =false;
       console.log('sum addu joint',this.errMessagejoint);
       
     }
     else{
       this.errorCallJoint = false;
       this.errMessagejoint="";

     }
    /* if(e.target.value<50000)
     {
       this.errorCall = true;
       this.errMessage2="Minimum Premium amount should be 50,000";
     }*/
    
     
      if(proTermInput1!='0')
     {
       this.errorCall = true;
       this.errMessage2="Premium amount should be increment of 1,000";
     }
     else{
       this.errMessage2="";
       this.errorCall = false;
     }
     if(this.inputSave.sa>10000000)
     {
       this.errorCall = true;
       this.errMessage2="Maximum amount is 1,00,00,000";
     } 
     this.ageCount();
      }

      maxMin(value)
      {
        console.log('valueee::',value);
        switch(value){
          case 'five': 
                      this.inputSave.minPPT= '5';
                      this.inputSave.maxPPT= '9';
                      break;
          case 'ten': 
                      this.inputSave.minPPT= '10';
                      this.inputSave.maxPPT= '14';
                      break;
          case 'fifteen': 
                      this.inputSave.minPPT= '15';
                      this.inputSave.maxPPT= '19';
                      break;
          case 'twenty': 
                      this.inputSave.minPPT= '20';
                      this.inputSave.maxPPT= '99';
                      break;
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
          var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
          
          var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
          console.log('age::',this.age);
          if ((y1month < y2month) || (y1month == y2month && y1date<y2date)){
            this.age--;
            console.log('ageeee',this.age);
            
           }
       
          if(this.age>70)
          {
            this.errorMessageforage = 'Maximum age is 70 years.';
            this.errorCall5= true;
            console.log('max age');
          }
          else
          {
            this.errorMessageforage = '';
            this.errorCall5= false;
            
          }
          if(diffDays < 30 || this.age < 0)
                  {
                //  if(((y1month - y2month) < 2) && (y1date < y2date)){
                    this.errorMessageformin = 'Minimum entry age should be 30 days.';
                    this.errorCall= true;
                    console.log('min age');
                  //  }
          }else{
            this.errorMessageformin = '' ;
            this.errorCall= false;
            
          }
          if(this.inputSave.isJointLife =='Y'){
            if(this.age < 18){
            this.errorMessageformin = 'Minimum entry age should be 18 Years.';
            this.errorCall= true;
          } else
                  {
                    this.errorMessageformin = '' ;
                    this.errorCall= false;
                    
                  }
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
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
          
            var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
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
            if(this.age < 18)
                    {
                   // if(((y1month - y2month) < 2) && (y1date < y2date)){
                      this.errorMessageforSecMin = 'Minimum entry age should be 18 Years.';
                      this.errorCall= true;
                      console.log('min age');
                   // }
                    }
                    else
                    {
                      this.errorMessageforSecMin = '';
                      this.errorCall= false;
                      
                    }
          }
      incomeWarning(e){
    
        var incomeValue = this.inputSave.sa;
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
    
  
  getValidPinCode(e){
    this.errMessage ="";
    this.errorCall = false;
     if(e.target.value =="")
       this.errMessage ="Pin Code field cannot be blank";
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
 submitForm(){
  var savingsTradInput = <any> {};
  let cuskey = window.location.href.split('=')[1];
   if(this.inputSave.smoker == "No")
    this.inputSave.rating = "NS";
    else if(this.inputSave.smoker == "Yes")
    this.inputSave.rating = "S"; 
    if(this.inputSave.secSmoker == "No")
    this.inputSave.secRating = "NS";
    else if(this.inputSave.secSmoker == "Yes")
     this.inputSave.secRating = "S";  
   // savingsTradInput.pincode  = this.inputSave.pincode;
    //savingsTradInput.authentication = {"accesskey":"DBS","secretkey":"DBS"};
    savingsTradInput.authentication = {"accesskey": this.accessKey,"secretkey": this.secretKey};
    savingsTradInput.rmId = sessionStorage.getItem('rmId');
    savingsTradInput.customerId = cuskey;
    savingsTradInput.dob = this.inputSave.dob;
    savingsTradInput.age = this.shared.calculateAge(this.inputSave.dob);
    savingsTradInput.insgender = this.inputSave.gender;
    savingsTradInput.rating = this.inputSave.rating;
    savingsTradInput.mode = this.inputSave.mode;
    savingsTradInput.ap = this.inputSave.sa;
    console.log('savingsTradInput.ap::',savingsTradInput.ap);
    savingsTradInput.minPT= this.inputSave.minPT;
    savingsTradInput.maxPT= this.inputSave.maxPT;
    savingsTradInput.maxPPT = this.inputSave.maxPPT;
    savingsTradInput.minPPT = this.inputSave.minPPT;
    savingsTradInput.secrating = this.inputSave.secRating;
    savingsTradInput.secdob = this.inputSave.secdob;
    savingsTradInput.isJointlife = this.inputSave.isJointLife;
    if(this.inputSave.isJointLife == 'Y'){
     switch(this.inputSave.gender){
       case 'M': savingsTradInput.secgender = 'F';
                break;
       case 'F': savingsTradInput.secgender = 'M';
                break;          
     }
     
    }
    
    let prodQuote = 'Life/ENDW/' + btoa(JSON.stringify(savingsTradInput));
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
}
