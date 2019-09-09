import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from  '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userName = null;
  public firstName= null;
  public lastName= null;
  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
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
      }else{
        var pass = document.getElementById('messageTouser');
        pass.innerHTML = data.error;
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
