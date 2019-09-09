import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

declare var jquery:any;
declare var $
@Component({
  moduleId: module.id,
  selector: 'app-one-minute-plan',
  templateUrl: './one-minute-plan.component.html',
  styleUrls: ['./one-minute-plan.component.css']
})
export class OneMinutePlanComponent implements OnInit {
  public oneData = [];
  public cusKey = null;
  public custLength: number = 0;
  public data = [];
  public localData = [];
  public finalData = [];
  public userName = null;
  public firstName= null;
  public lastName= null;

  constructor(private router: Router,private shared: SharedService, private alertservice: AlertService) {
  }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
  });
    //this.allCustomerforRM();
    $('.DeclineText').hide();
    $('#declineButton').hide();
    //$('.onebutton').hide();
    var getStatus = sessionStorage.getItem("statusOfcustomer")
    console.log('getstatusssss::',getStatus);
    
    if(getStatus == '1')
  {
    $('.onebutton').show();
    console.log('show:::');  

  }
  else{
    $('.onebutton').hide();
    console.log('hide:::');  

  }
    this.cusKey = location.href.split('=')[1];

  }
  enableStart(e){
     if(e.target.checked){
      $('.onebutton2').hide();
      $('.DeclineText').show();
      $('#declineButton').hide();

     }
      else {
        $('.onebutton2').show();
       $('.DeclineText').hide();
       $('#declineButton').hide();

      }   
  }

  enableDecline(e)
  {
    if(!$('input #declinetext1').val()){
      $('#declineButton').show();
  }
  else {
      $('#declineButton').hide();
  }
  
  }

  declineAction()
  {
    this.router.navigate(['/']);

  }

 
  gotoCusQns(){
    this.router.navigate(['home/customerqusOne'], { queryParams: { customerKey: this.cusKey}});
  }
  getMyPlan(){
    var getItems = <any>{};
    var customerKey = window.location.href.split('=')[1];
    this.shared.loadCusmerDetails(sessionStorage.getItem("rmId"), customerKey)
    .subscribe(data =>{
      console.log("LOAD CUSTOMER", data.result);
      getItems=data.result.goals.goalsInput;
      console.log("LOAD CUSTOMER getItems", getItems);
      let ansKeys = getItems;
      console.log('ansKeysansKeys,',ansKeys);
  
      console.log('getItems1,',getItems);
      ansKeys = btoa(ansKeys);
      console.log('answe::',ansKeys);
      this.router.navigate(['home/product'], { queryParams: { answerKey: ansKeys}});

    },
    error => {
      if(error.status == 401)
        {
       this.router.navigate(['home/login']);
       }else{
       this.alertservice.error("Something broken, try again!");
        }
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
       // console.log('dataoldpass::',oldPwd);
        
        if(data.result == "success"){
        var pass = document.getElementById('messageTouser');
        pass.innerHTML = "Password has been changed successfully";
         $('#resultModal').modal('show');
        $('#exampleModal').modal('hide');
        }
        
        
      },
      error => {
       $('#loader').hide();
        if(error.status == 401)
        {
          let rtnUrl = window.location.href.split("=")[1];
          this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/product?answerKey='+rtnUrl }});
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
