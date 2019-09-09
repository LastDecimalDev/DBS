import { Component, OnInit, Injector} from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from  '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { CommentStmt } from '../../../../node_modules/@angular/compiler';
import { AuthguardGuard } from '../../authguard.guard';
import { NgForm } from '../../../../node_modules/@angular/forms';

declare var jquery:any;
declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'app-custmer-qns',
  templateUrl: './custmer-qnsFour.component.html',
  styleUrls: ['./custmer-qns.component.css']
})
export class CustmerQnsFourComponent implements OnInit {
  public userName = null;
  public firstName= null;
  public lastName= null;
  public slider1Url = null;
  public slider2Url = null;
  public slider3Url = null;
  public slider4Url = null;
  public input = <any>{};
  public termInput = <any>{};
  public monthlyExpense:any;
  public disposableIncome:any;
  public proTermInput=<any> {};
  public errorCall:boolean = false;
  public errMessage1 = null; 
  public showNext:boolean = false;

  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService, private authService: AuthguardGuard) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
    this.slider1Url = '../../../assets/images/1st_slide_N.svg';
    this.slider2Url = '../../../assets/images/2nd_slide_N.svg';
    this.slider3Url = '../../../assets/images/3rd_slide_N.svg';
    this.slider4Url = '../../../assets/images/4th_slide_N.svg';

    //for not taking negative values
    var number = document.getElementById('monthlyExpense');
    number.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8)) {
          return false;
      }
  }

  }
  ngDoCheck(){
    if (this.termInput.monthlyExpense != null && this.errMessage1 == "" && this.disposableIncome !=null)
    this.showNext = true;
    else this.showNext = false;
  }

  getValidmonthlyExpense(e){
    var proTermInput1 = <any> {};
    proTermInput1=e.target.value%1000;
    console.log('proTermInput1',proTermInput1);
    
     this.errorCall = false;
     if(e.target.value<100000)
     {
       this.errorCall = true;
       this.errMessage1="Minimum Net Annual Expense should be 1,00,000";
       document.getElementById("netExp").innerHTML = "";
     }
    
     
     else if(proTermInput1!='0')
     {
       this.errorCall = true;
       this.errMessage1="Net Annual Expense should be increment of 1,000";
       document.getElementById("netExp").innerHTML = "";
     }
     else{
       this.errMessage1="";
       this.errorCall = false;
     } 
      }

  inputFieldChg02(value){
    if ($('input[name=qns01]:checked')) 
     this.proTermInput = ($('input[name=qns01]:checked').val());
    
  }
    getDisposalIN(disposableIncome, url, first, secnd, third){
    switch(disposableIncome){
      case '200000': (<HTMLInputElement>document.getElementById(disposableIncome)).src = url;
                      (<HTMLInputElement>document.getElementById(first)).src = this.slider2Url;
                      (<HTMLInputElement>document.getElementById(secnd)).src = this.slider3Url;
                      (<HTMLInputElement>document.getElementById(third)).src = this.slider4Url;
                      break;
      case '500000': (<HTMLInputElement>document.getElementById(disposableIncome)).src = url;
                      (<HTMLInputElement>document.getElementById(first)).src = this.slider1Url;
                      (<HTMLInputElement>document.getElementById(secnd)).src = this.slider3Url;
                      (<HTMLInputElement>document.getElementById(third)).src = this.slider4Url;
                      break;
      case '1000000': (<HTMLInputElement>document.getElementById(disposableIncome)).src = url;
                      (<HTMLInputElement>document.getElementById(first)).src = this.slider1Url;
                      (<HTMLInputElement>document.getElementById(secnd)).src = this.slider2Url;
                      (<HTMLInputElement>document.getElementById(third)).src = this.slider4Url;
                      break;
      case '1500000': (<HTMLInputElement>document.getElementById(disposableIncome)).src = url;
                      (<HTMLInputElement>document.getElementById(first)).src = this.slider1Url;
                      (<HTMLInputElement>document.getElementById(secnd)).src = this.slider2Url;
                      (<HTMLInputElement>document.getElementById(third)).src = this.slider3Url;
                      break;
    }
    this.disposableIncome = disposableIncome;
    sessionStorage.setItem("disposableIncome",this.disposableIncome);
    console.log('inside hangg::',sessionStorage.getItem("disposableIncome"));

  }
  getMyPlan(data){
    
    this.proTermInput.monthlyExpense = this.termInput.monthlyExpense;
    
    sessionStorage.setItem("monthlyExpense",this.proTermInput.monthlyExpense);
    console.log('inside funtion:::',sessionStorage.getItem("disposableIncome"))
    if($("#monthlyExpense").val() !=""){
    let ansKeys= decodeURIComponent(location.href.split('=')[2]);
    
    this.router.navigate(['home/product'], { queryParams: { answerKey: ansKeys}});
    }else{
      document.getElementById("netExp").innerHTML = "Net Expense is required!"; 
      document.getElementById("netExp").style.color = "red";
      $('#monthlyExpense').focus();
    }
  }


  goBack(){
    window.history.back();
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