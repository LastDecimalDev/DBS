import { Component, OnInit, Injector} from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from  '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { AuthguardGuard } from '../../authguard.guard';
import { NgForm } from '../../../../node_modules/@angular/forms';

declare var jquery:any;
declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'app-custmer-qns',
  templateUrl: './custmer-qnsThree.component.html',
  styleUrls: ['./custmer-qns.component.css']
})
export class CustmerQnsThreeComponent implements OnInit {
  public userName = null;
  public firstName= null;
  public lastName= null;
  public getAnsData01 = [];
  public getAnsData02 = [];
  public getData = null;
  public finalData = [];
  public cusKey = null;
  public showNext:boolean = false;
  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService, private authService: AuthguardGuard) { }

  ngOnInit() {
    this.cusKey = location.href.split('=')[1].split('&')[0];
    this.getData = decodeURIComponent(location.href.split('=')[2]);
    this.getData = atob(this.getData);

    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
}
ngDoCheck(){
  if (this.getAnsData02.length>0 && this.getAnsData01.length>0)
  this.showNext = true;
  else this.showNext = false;
}
gotoNext(){  
  this.finalData.push( this.getData, this.getAnsData01, this.getAnsData02);
  let ansKeys = this.finalData.toString();
  ansKeys = btoa(ansKeys);
  console.log('answe1::',atob(ansKeys));

  this.router.navigate(['home/customerqusFour'], { queryParams: { customerId: this.cusKey, answerKey: ansKeys}});
 }
 inputFieldChg05(e){
  if ($('input[name=qns05]:checked')) 
   this.getAnsData01 =  ($('input[name=qns05]:checked').val());
   console.log('getAnsData01:::',this.getAnsData01);
    
}
inputFieldChg06(e){
  if ($(e.target).prop("checked") && !this.itemExists(this.getAnsData02, e.target.value)){
   this.getAnsData02.push(e.target.value);
  }else{
    let arrIndex = this.getAnsData02.indexOf(e.target.value);
    this.getAnsData02.splice(arrIndex,1);
  }
   console.log('getAnsData02:::',this.getAnsData02);
    
}
itemExists(array, item){
  var exists= false;
  for (var i = 0; i< array.length; i++){
    if (array[i] == item){
      exists= true;
      break;
    }
  }  
  return exists;
}
goBack(){
  window.history.back();
  //this.router.navigate(['home/customerqusTwo'], { queryParams: { customerId: this.cusKey, answerKey: this.getData}});
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