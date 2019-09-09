import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../sharedServices/shared.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';
declare var jquery:any;
declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {
  public userName = null;
  public firstName= null;
  public lastName= null;
  public isAdmin = null;
  public showHead: boolean = true;
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
     
  $(document).ready(function() {
         $('#exampleModal').modal('hide');
      // Hide the "view" div.
  });
    
  }
  ngDoCheck(){
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
    this.isAdmin = sessionStorage.getItem('isAdmin');
    $("#rmCreationId").hide();
    $(document).ready(function(){
      $("#settingsIcon").click(function(){
        $("#rmCreationId").toggle();
      });
    });
    if(location.pathname.includes('login'))
    this.showHead = false;
    else this.showHead = true;
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
