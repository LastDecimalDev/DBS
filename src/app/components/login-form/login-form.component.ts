import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, Http, HttpModule } from '@angular/http';

import { AuthguardGuard } from '../../authguard.guard';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
declare var grecaptcha: any;
declare var jquery:any;
declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ SharedService ]
})
export class LoginFormComponent implements OnInit {
  public returnUrl: string;
  public countryCode = [];
  public country = {display_name:'', phoneNum:'', e164_cc:'', userNum:''};
  public confirmationResultSMS =<any> {};
  public verifyCode: number;
  public errorCall:boolean = true;
  public errMessage1 = null; 
  public forgotPassRMId = null;
  public erroMessage = null;
  public errorPass: boolean = false;
  public forgotMsg = null;
  public userName = null;
  public namePass = null;
  public errorLoginMsg = null;
  constructor(private router:Router, 
              private shared: SharedService, 
              private http: Http,
              private route: ActivatedRoute,
              private alertservice: AlertService,
              private authService: AuthguardGuard) { }

  ngOnInit() {
    $('#loaderLogin').hide();
    
    if (localStorage.chkbx && localStorage.chkbx != '') {
      $('#remember_me').attr('checked', 'checked');
      this.userName = localStorage.usrname;
      this.namePass = atob(localStorage.pass); 
  } else {
      $('#remember_me').removeAttr('checked');
      this.userName = '';
      this.namePass = ''; 
  }

     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/mycustomer';
  }
 
  emailNullValid(e)
  {
      if(e.target.value=="")
      {
        this.errorCall = true;
        this.errMessage1="Please enter a valid User Name.";
      }else{
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if (reg.test(e.target.value) == false) 
      {
        this.errorCall = true;
        this.errMessage1="Please enter a valid user name.";
      }else{
        this.errMessage1 = null;
        this.errorCall = false;
      }

      } 
      
  }

 public loginUser() {
    var userEmail = (<HTMLInputElement>document.getElementById('email')).value;
    var password = (<HTMLInputElement>document.getElementById('pwd')).value;
    if(password == "") {
       $('#pwd').focus();
     }
     else
     {
      document.getElementById("readyGO").innerHTML = "Processing...";
      document.getElementById("readyGO").style.fontSize = "22px";

      $('#loaderLogin').show();

        var usr = btoa(userEmail);
         if(usr.match(/=/g)!= null){
        if(usr.match(/=/g).length > 0)
        usr = usr.replace(/=/g, "");
    }
        var paswrd = btoa(password);
        if(paswrd.match(/=/g)!= null){
        if(paswrd.match(/=/g).length > 0)
         paswrd = paswrd.replace(/=/g, "");
    }
 
       // sessionStorage.setItem("user", usr);
       // this.router.navigateByUrl(this.returnUrl);
      this.shared.getLoggedIn(usr, paswrd)
        .subscribe(
          data =>{
              
            if(!data.error && data.rmId){
              this.authService.resetTimer();
              this.rememberMe();
              sessionStorage.setItem("user", usr);
              sessionStorage.setItem("paswrd", paswrd);
              
              sessionStorage.setItem("rmId", data.rmId);
              sessionStorage.setItem("isAdmin", data.isAdmin);
              sessionStorage.setItem("fisrtName",data.firstName);
              sessionStorage.setItem("lastName",data.lastName);
             
               this.router.navigateByUrl(this.returnUrl);
            }
           else {
             this.errorLoginMsg = data.error;
             $('#unAuthorise').modal('show');
              $('#readyGO').hide();
              $('#loaderLogin').hide();

           }
          },
          error => {
              $('#readyGO').hide();
              $('#loaderLogin').hide();
              this.alertservice.error("Something went wrong, please try again!");
            /* setTimeout(function() {
                document.location.reload();
               }, 3000);*/
      });
      
     }
 }
 getPassword(emailId){
    this.forgotMsg = null;
    if(emailId != null){
    this.shared.resetPasswordService(emailId)
    .subscribe(data =>{
      if(data.result == "success")
        this.forgotMsg = "If you are a registered user, then you will receive a email from SelectAssure."
      else this.forgotMsg = "Unable process your request, please try again"; 
      $('#emailForgotModal').modal('show');
      });
     
   } 
  }
 rememberMe(){

    if ($('#remember_me').is(':checked')) {
        // save username and password
        localStorage.usrname = this.userName;
        localStorage.pass = btoa(this.namePass);
        localStorage.chkbx = $('#remember_me').val();
    } else {
        localStorage.usrname = '';
        localStorage.pass = '';
        localStorage.chkbx = '';
    }
}
}