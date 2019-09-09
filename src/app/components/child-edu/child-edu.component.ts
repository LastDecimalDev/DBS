import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from '../../sharedServices/shared.service';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-child-edu',
  templateUrl: './child-edu.component.html',
  styleUrls: ['./child-edu.component.css']
})
export class ChildEduComponent implements OnInit {
  public consent:boolean = false;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public investamount =[{name:'One Lakh',val:'100000'},{name:'Two Lakh',val:'200000'},{name:'Three Lakh',val:'300000'},{name:'Four Lakh',val:'400000'},{name:'Four and Half Lakh',val:'450000'},{name:'Five Lakh',val:'500000'},{name:'Five and Half Lakh',val:'550000'},{name:'Six Lakh',val:'600000'},{name:'Seven Lakh',val:'700000'},{name:'Seven and Half Lakh',val:'750000'},{name:'Eight Lakh',val:'800000'},{name:'Nine Lakh',val:'900000'},{name:'Ten Lakh',val:'1000000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Tweenty Lakh',val:'2000000'},{name:'Tweenty Five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Fifty Lakh',val:'5000000'},{name:'Sixty Lakh',val:'6000000'},{name:'1 Crore',val:'10000000'}];
  public annualChildPay: boolean= false;
  public errMessage = null;
  public errorCall:boolean = false;
  public errMessage2: string = null;
  public errMessage3: string = null;
  public age:any;
  public ConcernMessage: boolean = false;
  public dateOptions = <any>{};
  public disposableIncome:any;
  public disposableIncome1:any;
  public ConcernMessage1: boolean = false;
  public errorMessageforage =null;
  public errorMessageformin = null;
  public errorCall5 :boolean =false;
  public errorCall6 :boolean =false;
  public errorCall3: boolean=false;
  public errorCallJoint:boolean = false;
  public errMessagejoint = null; 
  public errorMessageforSecMin=null;
  public errorMessageforageSec = null;
  public inputChild = {pincode:'', dob:'', gender:'',isJointLife: '', secRating: null,secdob: null, secSmoker:'', age:null, childAge:'', mode:'1', smoker:'',rating:'',minPPT:'10', maxPPT:'14', minPT:'5', maxPT:'99',productType:'', premiumPay:'',sa: null,payoutType:''};
  constructor(private router: Router, private shared: SharedService) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
      $('#pincodechildEdu').tooltip({'trigger':'focus', 'title': ''});
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
  getValidSum(){
    var proTermInput1 = <any> {};
    proTermInput1 = this.inputChild.sa%1000;
    console.log('proTermInput1',proTermInput1);
    
     this.errorCall = false;
     if( this.inputChild.isJointLife =='N' && this.inputChild.sa<50000)
     {
       this.errorCallJoint = true;
       this.errMessagejoint="Minimum sum assured should be 50,000";
      // this.errorCall =false;
       console.log('sum addu',this.errMessagejoint);
       
     }
     else if( this.inputChild.isJointLife =='Y' && this.inputChild.sa<100000)
     {
       this.errorCallJoint = true;
       this.errMessagejoint="Minimum sum assured should be 1,00,000";
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
     if(this.inputChild.sa>10000000)
     {
       this.errorCall = true;
       this.errMessage2="Maximum amount is 1,00,00,000";
     } 
      }
      isChecked(e)
  {
   if ($(e.target).prop("checked") )
   this.consent = true;
   else this.consent = false;
 
 
  }
      incomeWarning(e){
    
        var incomeValue = this.inputChild.sa;
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

      maxMin(value)
      {
        console.log('valueee::',value);
        switch(value){
          case 'five': 
                      this.inputChild.minPPT= '5';
                      console.log('minppt::',this.inputChild.minPPT);                 
                      this.inputChild.maxPPT= '9';
                      console.log('maxPPT::',this.inputChild.maxPPT);                 
                      break;
          case 'ten': 
                      this.inputChild.minPPT= '10';
                      console.log('minppt::',this.inputChild.minPPT);                 
                      this.inputChild.maxPPT= '14';
                      console.log('maxPPT::',this.inputChild.maxPPT);                 
                      break;
          case 'fifteen': 
                      this.inputChild.minPPT= '15';
                      console.log('minppt::',this.inputChild.minPPT);                 
                      this.inputChild.maxPPT= '19';
                      console.log('maxPPT::',this.inputChild.maxPPT);                 
                      break;
          case 'twenty': 
                      this.inputChild.minPPT= '20';
                      console.log('minppt::',this.inputChild.minPPT);                 
                      this.inputChild.maxPPT= '99';
                      console.log('maxPPT::',this.inputChild.maxPPT);                 
                      break;
        }
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
            this.errorCall5= true;
            console.log('max age');
          }
          else
          {
            this.errorMessageforage = "" ;
            this.errorCall5= false;
      
          }
          if(this.age<18)
                  {
                    this.errorMessageformin = 'Minimum age should be 18 years.';
                    this.errorCall6= true;
                    console.log('min age');
                  }
                  else
                  {
                    this.errorMessageformin = "" ;
                    this.errorCall6= false;
      
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
 agechildvalid(e){
  this.errorCall = false;
    if(e.target.value>18)
    {
      this.errorCall = true;
      this.errMessage3="Child age should be less than 18 years."
    }
    
    
    else{
      this.errMessage3="";
      this.errorCall=false;
    }
    
}

 submitForm(){
  var childEduInput = <any> {};
  let cuskey = window.location.href.split('=')[1];
  if(this.inputChild.smoker == "No")
  this.inputChild.rating = "NS";
  else if(this.inputChild.smoker == "Yes")
  this.inputChild.rating = "S"; 
  if(this.inputChild.secSmoker == "No")
  this.inputChild.secRating = "NS";
  else if(this.inputChild.secSmoker == "Yes")
   this.inputChild.secRating = "S";  
 // childEduInput.pincode  = this.inputChild.pincode;
  childEduInput.customerId = cuskey;
  childEduInput.rmId = sessionStorage.getItem('rmId');
  childEduInput.dob = this.inputChild.dob;
  childEduInput.insage = this.shared.calculateAge(this.inputChild.dob);
  childEduInput.ownage = childEduInput.insage;
  childEduInput.childage = this.inputChild.childAge;
  childEduInput.insgender = this.inputChild.gender;
  childEduInput.owngender = childEduInput.insgender;
  childEduInput.rating = this.inputChild.rating;
  childEduInput.mode = this.inputChild.mode;
  childEduInput.ap = this.inputChild.sa;
  childEduInput.minPT= this.inputChild.minPT;
  childEduInput.maxPT= this.inputChild.maxPT;
  childEduInput.maxPPT = this.inputChild.maxPPT;
  childEduInput.minPPT = this.inputChild.minPPT;
  childEduInput.secrating = this.inputChild.secRating;
  childEduInput.secdob = this.inputChild.secdob;
  childEduInput.isJointlife = this.inputChild.isJointLife;
  if(this.inputChild.isJointLife == 'Y'){
    switch(this.inputChild.gender){
      case 'M': childEduInput.secgender = 'F';
               break;
      case 'F': childEduInput.secgender = 'M';
               break;          
    }
    
   }
  let prodQuote = 'Life/Child/' + btoa(JSON.stringify(childEduInput));
  this.router.navigate(['home/policypage'], { queryParams: { quotes: prodQuote}});

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