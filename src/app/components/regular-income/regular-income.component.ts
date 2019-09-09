import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { DatepickerOptions } from 'ng2-datepicker';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from '../../sharedServices/shared.service';
import { accessKey, secretKey } from '../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.css']
})
export class RegularIncomeComponent implements OnInit {
  public accessKey = accessKey;
  public secretKey = secretKey;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public investamount =[{name:'One Lakh',val:'100000'},{name:'Two Lakh',val:'200000'},{name:'Three Lakh',val:'300000'},{name:'Four Lakh',val:'400000'},{name:'Four and Half Lakh',val:'450000'},{name:'Five Lakh',val:'500000'},{name:'Five and Half Lakh',val:'550000'},{name:'Six Lakh',val:'600000'},{name:'Seven Lakh',val:'700000'},{name:'Seven and Half Lakh',val:'750000'},{name:'Eight Lakh',val:'800000'},{name:'Nine Lakh',val:'900000'},{name:'Ten Lakh',val:'1000000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Tweenty Lakh',val:'2000000'},{name:'Tweenty Five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Fifty Lakh',val:'5000000'},{name:'Sixty Lakh',val:'6000000'},{name:'1 Crore',val:'10000000'}];
  public errMessage = null;
  public annualPrepay: boolean = false;
  public errorCall:boolean = false;
  public errMessage2: string = null;
  public age:any;
  public ConcernMessage: boolean = false;
  public disposableIncome:any;
  public disposableIncome1:any;
  public ConcernMessage1: boolean = false;
  public dateOptions = <any>{};
  public consent:boolean = false;
  public errorMessageforage = null;
  public errorMessageforfuture = null;
  public errorMessageforFutureDate = null;
  public errorCall4: boolean = false;
  public errorMessageforagemonth=null;
  public errorCall2: boolean=false;
  public errorCall3: boolean=false;
  public errMessage3 = null;

  public month:any;

  public inputSave = {pincode:'', dob:'', gender:'', age:null, childAge:'', mode:'1', smoker:'',rating:'',minPPT:'10', maxPPT:'14', minPT:'5', maxPT:'99',productType:'', premiumPay:'',sa:'',payoutType:''};
  constructor(private router: Router, private shared: SharedService) { 
    
  }

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
      console.log('interest of disposable::',this.disposableIncome1);
     
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
  isChecked(e)
  {
   if ($(e.target).prop("checked") )
   this.consent = true;
   else this.consent = false;
 
 
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
  /*minPT(e){

    var minPT=this.inputSave.minPT;
    console.log('minPTminPT',e.target.value);
    this.ageCount();
    if(((+e.target.value)+ (+this.age))>60)
    {
      this.ConcernMessage=true;
      console.log('print message',(+e.target.value) + (+this.age));
      
    }
    else{
      this.ConcernMessage=false;
      console.log('dontprint message');

    }

  }*/
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
        this.ageCount();
        if(((+this.inputSave.minPPT)+ (+this.age))>60)
        {
          this.ConcernMessage=true;
          console.log('print message',(+this.inputSave.minPPT) + (+this.age));
          
        }
        else{
          this.ConcernMessage=false;
          console.log('dontprint message');
    
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
      
getValidSum(e){
	var proTermInput1 = <any> {};
	proTermInput1=e.target.value%1000;
	console.log('proTermInput1',proTermInput1);
	
	 this.errorCall = false;
	 if(e.target.value<50000)
	 {
	   this.errorCall = true;
	   this.errMessage3="Minimum Premium amount should be 50,000";
	 }
	
	 
	 else if(proTermInput1!='0')
	 {
	   this.errorCall = true;
	   this.errMessage2="Premium amount should be increment of 1,000";
	 }
	 else{
     this.errMessage2="";
     this.errMessage3="";
	   this.errorCall = false;
   } 
   if(e.target.value>10000000)
     {
       this.errorCall = true;
       this.errMessage3="Maximum amount is 1,00,00,000";
     }
    
    }
    
    ageCount() {
      var date1 = new Date();
      this.errorMessageforFutureDate = null;
      this.errorCall4= false;
      var dob = (<HTMLInputElement>document.getElementById("brithID")).value;
      console.log('databitrh::',dob)
      var date2 = new Date(dob);      
          var y1 = date1.getFullYear();
          var month1 =date1.getMonth()+1;
          console.log('date1',y1);

          //getting current year            
          var y2 = date2.getFullYear();
          var month2 =date2.getMonth()+1;
          console.log('date2',y2);

          //getting dob year            
          this.age = y1 - y2;
          console.log("age", this.age)

         if(this.age==0)
         {
          if(month1>month2)
          {
          this.month = month1 - month2;
         }
          else
          {
            this.month = month2- month1;
            this.errorMessageforFutureDate = 'Future date is not allowed.';
            this.errorCall4= true;
           
          }
          if(this.month==0)
          {
            this.errorMessageforFutureDate = null;
            this.errorCall4= false;
            this.errorMessageforagemonth = 'Minimum age should be 1 month.';
            this.errorCall2= true;
          }
          else{
            this.errorMessageforagemonth = '';
            this.errorCall2= false;
            
          }
        }
        else
        {
          this.errorMessageforagemonth = '';
          this.errorCall2= false;
        }
          if(this.age>70)
          {
            this.errorMessageforage = 'Maximum age is 70 years.';
            this.errorCall= true;
          }
          else
          {
            this.errorMessageforage = "" ;
            this.errorCall= false;

          }
          if(this.age<0)
         {
          this.errorMessageforfuture = 'Future date is not allowed.';
          this.errorCall3= true;
          console.log('future errorMessageforfuture',this.errorMessageforfuture);
          
         }
         else
         {
           this.errorMessageforfuture = "" ;
           this.errorCall3= false;

         }
    
    }

    submitForm(){
      var savingsTradInput = <any> {};
      let cuskey = window.location.href.split('=')[1];
     if(this.inputSave.smoker == "No")
      this.inputSave.rating = "NS";
      else this.inputSave.rating = "S"; 
     // savingsTradInput.pincode  = this.inputSave.pincode;
      //savingsTradInput.authentication = {"accesskey":"DBS","secretkey":"DBS"};
      savingsTradInput.authentication = {"accesskey": this.accessKey,"secretkey": this.secretKey};
      savingsTradInput.rmId = sessionStorage.getItem('rmId');
      savingsTradInput.customerId = cuskey;
      savingsTradInput.dob = this.inputSave.dob;
      savingsTradInput.age = this.shared.calculateAge(this.inputSave.dob);
      savingsTradInput.insgender = this.inputSave.gender;
      savingsTradInput.rating = this.inputSave.rating
      savingsTradInput.mode = this.inputSave.mode;
      savingsTradInput.ap = this.inputSave.sa;
      savingsTradInput.minPT= this.inputSave.minPT;
      savingsTradInput.maxPT= this.inputSave.maxPT;
      savingsTradInput.maxPPT = this.inputSave.maxPPT;
      savingsTradInput.minPPT = this.inputSave.minPPT;
     
      let prodQuote = 'Life/MI/' + btoa(JSON.stringify(savingsTradInput));
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
