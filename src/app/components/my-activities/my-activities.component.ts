import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SharedService } from '../../sharedServices/shared.service';
import { AuthguardGuard } from '../../authguard.guard';
import { AlertService } from '../../sharedServices/alert.service';
import { NgForm } from '@angular/forms';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {
  public userName = null;
  public myActivityResult= [];
  public allActivities = [];
  public myActivity= <any>{};
  public premiumMsg:boolean = false;
  public prodctNmeMsg : boolean = false;
  public firstName= null;
  public lastNameFtr:any;
  public designation = null;
  public dbsLocation =<any>{};
  public licenseExpdate: any;
  public errMessage3 = null;
  public errorCall2:boolean = false;
  public replacetym:any;
  

  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService, private authService: AuthguardGuard) { }

  ngOnInit() {
    $('#loader3').show();
    $("#rmCreationId").hide();
    $(document).ready(function(){
      $("#settingsIcon").click(function(){
        $("#rmCreationId").toggle();
      });
    });
    
    this.designation ="PRM";
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastNameFtr = sessionStorage.getItem('lastName');
    console.log('lastname::',this.lastNameFtr);
   
    console.log('inside oninit');
    this.myActivities();
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
 
  myActivities(){
    let rmId = sessionStorage.getItem("rmId");
      console.log('activities value::',rmId);
  
      this.shared.myActivitiesService(rmId)
    .subscribe(data =>{
      this.allActivities = data.result;
      this.allActivities.forEach(element => {
        $('#loader3').show();
  
          element.creationTime = element.creationTime.replace(/T/g, '  ');
          switch(element.productType){
            case 'ENDW': 
                  element.needName = "Saving Traditional";
                  break;
            case 'ULIP': 
                  element.needName = "Saving Unit Linked";
                  break;
            case 'Child': 
                  element.needName = "Child Education";
                  break;
            case 'MI': 
                  element.needName = "Regular Income";
                  break;
            case 'CIL': 
                  element.needName = "Critical Illness";
                  break;
            case 'Term': 
                  element.needName = "Protection";
                  break;
            case 'Home': 
                  element.needName = "Home Insurance";
                  break;
            case 'FF': 
                  element.needName = "Health Hospitalisation";
                  break;
            case 'INDV': 
                  element.needName = "Health Hospitalisation";
                  break;			
            case 'Motor': 
                  element.needName = "Car Insurance";
                  break;
            case 'PC': 
                  element.needName = "Car Insurance";
                  break;																											
          }
          this.myActivityResult.push(element);
          var premiumAct = element.premium;
          var productNme = element.productName;
          var creatnTym = element.creationTime;
          console.log('creatnTym::',creatnTym);
         // this.replacetym = creatnTym.replace(/T/g, '  ')
          console.log('replace::',this.replacetym);

          if(premiumAct>0)
          {
            this.premiumMsg=true;
            console.log('true premiumMsg',premiumAct);
          }
          else{
            this.premiumMsg = false;
            console.log('false premiumMsg',premiumAct);
  
          } 
          if(productNme != "")
          {
            this.prodctNmeMsg=true;
            console.log('true prodctNmeMsg',productNme);
          }
          else{
            this.prodctNmeMsg = false;
            console.log('false prodctNmeMsg',productNme);
  
          }
          var activeLink = window.location.href.split("/home")[0];
  
          var link = element.activityLink;
          console.log('linkkk::',activeLink+link);
      });
      $('#loader3').hide();
  
    });
  
  }
  activityLink(myActivityResult)
  {
    console.log('inse link',myActivityResult);
    var a = document.getElementById('activityListId');
  if (a) {
  }
  }
  userSignout(){
    this.router.navigate(['home/login']);
    this.authService.reset();
    sessionStorage.clear();
   
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
   rmCreation()
{
  let rmName = (<HTMLInputElement>document.getElementById('rmName')).value;
  let uhName = (<HTMLInputElement>document.getElementById('uhName')).value;
  let MangeEmail = (<HTMLInputElement>document.getElementById('MangeEmail')).value;
  let dbsLocation1 = this.dbsLocation;
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
    "location" : dbsLocation1
        };
       
  console.log('inside rmCreation',rmName+" "+this.designation+" "+uhName+" "+MangeEmail+" "+organizationCode+" "+cityHead1+" "+isAdmin+" "+licenseExpDate+" "+additionalData1);
  this.shared.rmCreationService(MangeEmail,rmName,uhName,organizationCode,isAdmin,additionalData1)
  .subscribe(data =>{
  if(data.error)
  {
    console.log('error occured',data.error);
  }
  else{
    alert('RM Id has been generated.')
    console.log('Success service', data); 
  } 
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
}
