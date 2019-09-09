import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { NgForm } from '@angular/forms';
import { AuthguardGuard } from '../../authguard.guard';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-manage-user-creation',
  templateUrl: './manage-user-creation.component.html',
  styleUrls: ['./manage-user-creation.component.css']
})
export class ManageUserCreationComponent implements OnInit {
  public firstName= null;
  public lastName:any
  public dbsLocation =<any>{};
  public licensetype =<any>{};
  public designation = null;
  public licenseExpdate: any;
  public errorCall2:boolean = false;
  public errMessage3 = null;
  public newUserEmailId= null;
  public data = [];
  public rmIdList = <any>{};
  public userName = null;
  public rmError =null;

  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService, private authService: AuthguardGuard) { 
  }

  ngOnInit() {
    this.designation ="TRM";
    this.getAllRMId();
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
    this.userName = atob(sessionStorage.getItem('user'));

    $("#rmCreationId").hide();
    $("#settingsIcon").click(function(){
      $("#rmCreationId").toggle();
    }); 
    $('#loader4').show();


  
  }
  newUserEmailIdEvent(e)
  {
    this.newUserEmailId = e.target.value;
    
  }
  userSignout(){
    this.router.navigate(['home/login']);
    this.authService.reset();
    sessionStorage.clear();
   
  }
  register()
  {
    (<HTMLInputElement>document.getElementById('MangeEmail')).value = this.newUserEmailId;
    
  }
  getToday() {
    var currentYear = (new Date).getFullYear();
    var currentMonth = (new Date).getMonth()+1;
    var currentDay = (new Date).getDate();
  var todayDate = currentYear+"-"+currentMonth+"-"+currentDay;
 this.licenseExpdate = (<HTMLInputElement>document.getElementById('licenseExpDate')).value;
    if(this.licenseExpdate<=todayDate)
    {
      this.errorCall2 = true;
      this.errMessage3="License Expiry date should be future dated."
    }
    else
    {
      this.errorCall2 = false;
      this.errMessage3="";
    }
  }
 
  rmCreation(manageUser:NgForm)
{
  
  let rmName = (<HTMLInputElement>document.getElementById('rmName')).value;
  let uhName = (<HTMLInputElement>document.getElementById('uhName')).value;
  let MangeEmail = (<HTMLInputElement>document.getElementById('MangeEmail')).value;
  let dbsLocation1 = this.dbsLocation;
  let licensetype =(<HTMLInputElement>document.getElementById('licenseType')).value;;
  let isAdmin = '0';
  (<HTMLInputElement>document.getElementById('designation')).value =this.designation;
  let cityHead1 = (<HTMLInputElement>document.getElementById('cityHead')).value;
  let licenseCode = (<HTMLInputElement>document.getElementById('licenseCode')).value;
  let licenseExpDate = (<HTMLInputElement>document.getElementById('licenseExpDate')).value;
  let organizationCode ="DBS";
  let additionalData1 = {
    "licenseNo" : licenseCode,
    "licenseExpiryDate" : licenseExpDate,
    "cityHead" : cityHead1,
    "designation" : this.designation,
    "location" : dbsLocation1,
    "licenseType" :licensetype
        };
       
  this.shared.rmCreationService(MangeEmail,rmName,uhName,organizationCode,isAdmin,additionalData1)
  .subscribe(data =>{
  if(data.error)
  {
    this.rmError = data.error;
    alert(this.rmError);
    setTimeout(function(){
      manageUser.form.reset();
 }, 2000);
    console.log('error occured',this.rmError);
  }
  else{
    alert('RM Id has been generated.');
    setTimeout(function(){
      manageUser.form.reset();
 }, 2000);
    console.log('Success service', data); 
  } 
  }); 
}

getAllRMId()
{
  $('#loader4').show();

  this.shared.getAllRMIdService()
  .subscribe(data =>{
    this.data =data.result;
    $('#loader4').hide();
    this.data.forEach(element=>
    {
      this.rmIdList = element.rmId;
    })
  });
}
deactivateRM(data)
{
  var rmId = data.rmId;
  var firstName = data.firstName;
  var lastName = data.lastName;
  var isAdmin = data.isAdmin;
  var isRm = data.isRm;
  var lastLoginDate =  data.lastLoginDate;
  var lastSyncDate = data.lastSyncDate;
  var organizationCode = data.organizationCode;
  var email = data.rmId;
  var addlData = data.addlData;
  this.shared.deactivateRMService(rmId,firstName,lastName,isAdmin,isRm,lastLoginDate,lastSyncDate,organizationCode,email,addlData)
  .subscribe(data =>{
    if(data.error){
      $('#deleteUserModal').hide();
     }
     else{
      $('#deleteUserModal').show();
      setInterval(this.getAllRMId(),1000);
      console.log('success',data);
      
     }
  });
}
activateRM(data)
{
  var rmId = data.rmId;
  var firstName = data.firstName;
  var lastName = data.lastName;
  var isAdmin = data.isAdmin;
  var isRm = data.isRm;
  var lastLoginDate =  data.lastLoginDate;
  var lastSyncDate = data.lastSyncDate;
  var organizationCode = data.organizationCode;
  var email = data.rmId;
  var addlData = data.addlData;
  this.shared.activateRMService(rmId,firstName,lastName,isAdmin,isRm,lastLoginDate,lastSyncDate,organizationCode,email,addlData)
  .subscribe(data =>{
    if(data.error){
      $('#activateRMModal').hide();
     }
     else{
      $('#activateRMModal').show();
      setInterval(this.getAllRMId(),1000);
      console.log('success',data);
      
     }
  });
}
resetPassword(data)
{
 var rmId = data.rmId;
 console.log('rmid::',rmId);
 this.shared.resetPasswordService(rmId)
 .subscribe(data =>{
   console.log('success msg',data);
   });
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
        this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/mycustomer' }});
      }else{
        this.alertservice.error("Something broken, try again!");
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
