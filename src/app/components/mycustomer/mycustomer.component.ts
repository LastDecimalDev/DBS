import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { searchFilter } from './searchFilter';
import { NgForm } from '@angular/forms';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { AuthguardGuard } from '../../authguard.guard';
import { DatePipe } from '@angular/common';

declare var jquery:any;
declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'app-mycustomer',
  templateUrl: './mycustomer.component.html',
  styleUrls: ['./mycustomer.component.css'],
  providers: [ SharedService ]
})
export class MycustomerComponent implements OnInit {
  public userName = null;
  public firstName= null;
  public lastName= null;
  public isAdmin = null;
  public localData = [];
  public data = [];
  public custLength: number = 0;
  public cusltnLength: number = 0;
  public declLength: number = 0;
  public queryString = <any> [];
  public customerData = <any> {};
  public genderID = "";
  public errorCall1:boolean = false;
  public errorCall2:boolean = false;

  public premiumMsg:boolean = false;
  public designation = null
  public errMessage1 = null;
  public errMessage3 = null;

  public updateCustomerMsg = null; 
  public myActivityResult= [];
  public allActivities = [];
  public myActivity= <any>{};
  public dbsLocation =<any>{};
  // array of all items to be paged
  //public formCtrl:boolean=true;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  data1: any;
  public rmId:any;
  statusID: any;
  public disableButton:boolean=false;
  public disableButton1:boolean=false;
  public hideMessage:boolean = false;
  public lastNameFtr:any
  public licenseExpdate: any;
  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService, private authService: AuthguardGuard) { 
  }

  ngOnInit() {
   
    $(".ngx-pagination").hide();

    
    this.designation ="PRM";
    $(".CollapseManage").collapse();
    //this.rmId= this.shared.getRmId();
    //console.log('check global rmId in mycustomer::',this.rmId);
    //this.disableButton=false;
    //this.disableButton1=true;
    $("#lastName").keypress(function(event){
      var inputValue = event.which;
      // allow letters and whitespaces only. 
      if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) { 
          event.preventDefault(); 
      }
  });
  $("#firstName").keypress(function(event){
    var inputValue = event.which;
    // allow letters and whitespaces only.
    if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) { 
        event.preventDefault(); 
    }
});
$("#editfirstName").keypress(function(event){
  var inputValue = event.which;
  // allow letters and whitespaces only.
  if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) { 
      event.preventDefault(); 
  }
});
$("#editlastName").keypress(function(event){
  var inputValue = event.which;
  // allow letters and whitespaces only.
  if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) { 
      event.preventDefault(); 
  }
});

  

    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastNameFtr = sessionStorage.getItem('lastName');
    this.isAdmin = sessionStorage.getItem('isAdmin');
    console.log('lastname::',this.lastNameFtr);
    $("#rmCreationId").hide();
    $(document).ready(function(){
      $("#settingsIcon").click(function(){
        $("#rmCreationId").toggle();
      });
    });
    
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
    //this.StatusCount();
    $('.list_box1').hide();
    
    
    this.allCustomerforRM();
    /*$(document).ready(function(){
      $('#itemsNotFound').delay(60000).fadeIn(500000);
      console.log('hide page:::')
 }, 60000);*/



    $(document).ready(function() {
      $('div.os-tech').hide();
      $(' div.os-tech1').hide();
      $('div.viewToggle').hide();
      $('#loader').hide();
      // Watch for clicks on the "slide1" link.
      $('div.slide1').click(function() {
      // When clicked, toggle the "view" div.
     // $('div.contentmain1').toggleClass('faded');
      $('div.os-tech').hide();
      $('div.viewToggle').hide();
      $('div.os-tech1').slideToggle(400);
      return false;
    });
      // Watch for clicks on the "slide" link.
      $('div.slide').click(function() {
        $('div.os-tech1').hide();
        $('div.contentmain1').toggleClass('faded');

      $('div.viewToggle').hide();
      // When clicked, toggle the "view" div.
      $('div.os-tech').slideToggle(400);
      return false;
    });
     $('div.editView a').click(function() {
      $('div.os-tech').toggle();
      console.log('hide search')
      $(' div.os-tech1').hide();
     
      // When clicked, toggle the "view" div.
      $('div.viewToggle').slideToggle(400);
      return false;
    });
    $('div.viewToggle button.editClose').click(function() {
      // When clicked, toggle the "view" div.
      $('div.viewToggle').slideToggle(400);
      return false;
    });
     $('div.os-tech button.close').click(function() {
      // When clicked, toggle the "view" div.
      $('div.contentmain1').toggleClass('faded');
      $('div.os-tech').slideToggle(400);
      return false;
    });
      $('div.os-tech1 button.close').click(function() {
      // When clicked, toggle the "view" div.
      $('div.os-tech1').slideToggle(400);
      return false;
    });
    $('div.viewToggle button.close').click(function() {
      // When clicked, toggle the "view" div.
      $('div.contentmain1').toggleClass('faded');
      $('div.viewToggle').slideToggle(400);
      return false;
    });
    
    $('div.slide1').click(function(){
      $('#txtName1').focus();
    });
  });




  $('.scroll_box4 img').click(function() {    
    console.log('maleee');
    if(this.genderID =="M"){
    $('#maleID').removeClass('selected');
    $(this).addClass('selected');
    console.log('maleee1111');
    }
    if(this.genderID =="F"){

    $('#femaleID').removeClass('selectedFemale');
    $(this).addClass('selectedFemale');
    console.log('femaleee1111');
    }

    
});

  
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
 
  custmrAgeValid(e)
  {
    this.errorCall1 = false;
    if(e.target.value<18)
    {
      this.errorCall1 = true;
      this.errMessage1="Minimum age should be 18 years"
    }
    else if(e.target.value>125)
{
  this.errorCall1 = true;

   this.errMessage1="Maximum age should be 125 years";
    }
    else{
      this.errMessage1="";
      this.errorCall1=false;
    }
  }
  lastNameValid(e)
  {
    this.errorCall1 = false;
    var lastNameLength = e.target.value.length;
    console.log('lastNameLength::',lastNameLength);
    
    if(lastNameLength<3)
    {
      this.errorCall1 = true;
      this.errMessage1="Last Name should be of minimum 3 characters."
    }
    else if(lastNameLength>3)
    {
  this.errorCall1 = true;

   this.errMessage1="";
    }
    else{
      this.errMessage1="";
      this.errorCall1=false;
    }
  }
 
  allCustomerforRM(){
    $('#loader1').show();
    $('#pageId').hide();
    $('.list_box1').hide();
    if(sessionStorage.getItem("rmId")){
    this.shared.getCustomer(sessionStorage.getItem("rmId"))
       .subscribe(
         data =>{
           var dat1 = JSON.stringify(data.result)
              this.custLength = Object.keys(data.result).length;
              
              for(var i=0; i<this.custLength; i++){
               data.result[i].statusImg = this.getStatusImage(data.result[i].status);
              }
              this.data = data.result;
              if(this.data.length<5)
              {
                $(".ngx-pagination").hide();
                console.log('less 5 hide');
                
              }
              else{
                $(".ngx-pagination").show();
                console.log('less 5 shiw');
                
              }
              //sessionStorage.setItem("customerId",JSON.stringify(data.result.customerId));
              //console.log('checkkkk:::',sessionStorage.getItem(JSON.parse("customerId")));
              this.localData = this.data;
              this.data.sort((a: any, b: any) => {
                if (a.lastUpdateTs > b.lastUpdateTs) {
                  return -1;
                } else if (a.lastUpdateTs < b.lastUpdateTs) {
                  return 1;
                } else {
                  return 0;
                }
              });
              this.disableButton=false;
              this.disableButton1=false;
    
              $('#pageId').show();

              this.localData = this.data;
              $('#loader1').hide();
             // (<HTMLInputElement>document.getElementById('custId')).value = sessionStorage.getItem("rmId");
            
          },
            error => {
              $('#loader1').hide();
              if(error.status == 401 )
              this.router.navigate(['home/login']);
      }
          );

   }
}

userSignout(){
  this.router.navigate(['home/login']);
  this.authService.reset();
  sessionStorage.clear();
 
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


saveCustomer(formCtrl:NgForm){
  setTimeout(function(){

  $('div.contentmain1').toggleClass('faded');
  },3000);
$('#loader').hide();

this.disableButton=true;

  let firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
  let lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
  let customEmail = (<HTMLInputElement>document.getElementById('customEmail')).value;
  let RmId = sessionStorage.getItem("rmId");
  //let birthDate = (<HTMLInputElement>document.getElementById('birthDate')).value;
  let custmrAge = (< HTMLInputElement>document.getElementById('custmrAge')).value;
  console.log('custmrAge::',RmId);
  //let maritlaStatus = (<HTMLInputElement>document.getElementById('custmrStatus')).value;
  let custmrgender = this.genderID; 
  //this.formCtrl=false;
  
 if(firstName!= "" && lastName!= ""&& customEmail!= "" && custmrgender!= "" && custmrAge!= "")
  {
    
   this.shared.getCustomerAdded(firstName, lastName, customEmail,RmId, custmrAge,custmrgender)
     .subscribe(
       data =>{
       $('#loader').hide();
       if(data.result.error){
        document.getElementById("sucessStatus").innerHTML = "Something went wrong. Try again...!"; 
        document.getElementById("sucessStatus").style.color = "red";
       }
        else{
          
          document.getElementById("sucessStatus").innerHTML = "The customer has been added successfully!";
          document.getElementById("sucessStatus").style.color = "green";
          
          setTimeout(function(){
            formCtrl.form.reset();
            console.log('claerr...', formCtrl.form.reset());
            document.getElementById("sucessStatus").innerHTML = null;
            console.log('claerr...',data.result);
            $('div.os-tech').hide();
            
       }, 3000);
       this.cusltnLength=0;
       setInterval(this.allCustomerforRM(),1000);
       firstName="";
       firstName=null;
       console.log('clear first::',firstName);
       
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
    
 else{
   $('#loader').hide();
   document.getElementById("sucessStatus").innerHTML = "All fields except ID are mandatory!";
   document.getElementById("sucessStatus").style.color = "red";

 }

}
 viewAllCus(){
  this.data =  this.localData;
 $('#pageId').show();

}

withPlanCus(){
  
   this.data = this.localData.filter(
       item => item.status === 1
        
      );
      
}

prospectCus(){
 this.data = this.localData.filter(
       item => 
         item.status === 0
      );
      
}

declinedCus(){
  this.hideMessage=true;
this.data = this.localData.filter(
       item => {
         item.status === 2;
        if(item.status === 2 )
        {
          $('#pageId').show();

        }
        else{
          $('#pageId').hide();

        }
        });
      
}
    
 editCustomer(data){
  this.customerData = <any> {};
 
    $('div.contentmain1').toggleClass('faded');
    $('div.os-tech').hide();
    $(' div.os-tech1').hide();
   console.log("DATA Customers here", data);
  $('div.viewToggle').slideToggle(400);
  this.customerData = data;
  let customerId= data.customerId;
  sessionStorage.setItem("customerId",customerId);
  
  (<HTMLInputElement>document.getElementById('editfirstName')).value = data.firstName;
  (<HTMLInputElement>document.getElementById('editlastName')).value = data.lastName;
  (<HTMLInputElement>document.getElementById('editcustomEmail')).value = data.email;
  console.log('edit email:::',(<HTMLInputElement>document.getElementById('editcustomEmail')).value = data.email);
  
  (<HTMLInputElement>document.getElementById('editRmId')).value = data.rmId;
  (<HTMLInputElement>document.getElementById('editcustmrAge')).value = data.age;
  sessionStorage.setItem("lastUpdateTs",data.lastUpdateTs);
  let lastUpdateTs=sessionStorage.getItem("lastUpdateTs");

  sessionStorage.getItem("rmId");
   if(data.gender == "F"){
         $('#femaleID img').addClass('selectedFemale');
    $('#maleID img').removeClass('selected');
    this.genderID = 'F';
   }
   else if(data.gender == "M"){
    $('#maleID img').addClass('selected');
    $('#femaleID img').removeClass('selectedFemale');
    this.genderID = 'M';   
   }
 }
 updateCustomer(formCtrl11:NgForm){
  $('div.contentmain1').toggleClass('faded');
  $('#loader').show();

  let firstName = (<HTMLInputElement>document.getElementById('editfirstName')).value;
  let lastName = (<HTMLInputElement>document.getElementById('editlastName')).value;
  let customEmail = (<HTMLInputElement>document.getElementById('editcustomEmail')).value;
  console.log('upadteee::emial::',customEmail);
  
  let customerId = this.customerData.customerId;

  let RmId = (<HTMLInputElement>document.getElementById('editRmId')).value;
  let custmrAge = (<HTMLInputElement>document.getElementById('editcustmrAge')).value;
  let custmrgender = this.genderID; 
  let lastUpdateTs=sessionStorage.getItem("lastUpdateTs");
  
  this.shared.updateCus(firstName, lastName,customerId,custmrAge, RmId, customEmail,  custmrgender,lastUpdateTs,
    this.customerData.addlData, this.customerData.applications, this.customerData.creationTime,
  this.customerData.customerNotifications, this.customerData.disposableIncome, this.customerData.goals,
this.customerData.maritalStatus, this.customerData.monthlyExpense, this.customerData.quotes, this.customerData.status)
  .subscribe(data =>{
     $('#loader').hide();
      if(data.result.error){
      document.getElementById("sucessStatus1").innerHTML = data.result.error ; 
      document.getElementById("sucessStatus1").style.color = "red";
      console.log('upadteerror::',data.result.error);
      
     }
     else{
      this.disableButton1=true;

      document.getElementById("sucessStatus1").innerHTML = "The customer has been updated successfully!";
      document.getElementById("sucessStatus1").style.color = "green";
      document.getElementById("sucessStatus1").style.fontSize = "18px";
      document.getElementById("sucessStatus1").style.marginLeft = "322px";

    
    setTimeout(function(){
      $('div.viewToggle').hide();
      document.getElementById("sucessStatus1").innerHTML =null;
        }, 3000);
this.cusltnLength=0;
 this.allCustomerforRM();
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
}
  );
 }
 ageCount() {
    var date1 = new Date();
    var dob = (<HTMLInputElement>document.getElementById("birthDate")).value;
    var date2 = new Date(dob);      
        var y1 = date1.getFullYear();
        //getting current year            
        var y2 = date2.getFullYear();
        //getting dob year            
        var age = y1 - y2;
        //calculating age                       
        (<HTMLInputElement>document.getElementById("custmrAge")).value = `${age}`;
        (<HTMLInputElement>document.getElementById("custmrAge")).focus ();
    }
   
   birth()
   {
    (<HTMLInputElement>document.getElementById('birthDate')).value;
    var today = new Date();      
        var currentYear = today.getFullYear();
        //getting current year            
        var age = parseInt((<HTMLInputElement>document.getElementById('custmrAge')).value,10);
        var currentYear1 = currentYear - age;
        var currentYear11 =  (currentYear1)+"-01-"+"01";
        (<HTMLInputElement>document.getElementById("birthDate")).value = `${currentYear11}`;
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

    getStatusImage(statusID){
       let ImageUrl: string = '../../../assets/images/';
       let statusImgUrl: string = null;
      switch(statusID){
        case 0:
				    statusImgUrl = ImageUrl + 'Exclamation Mark ICON.png';
				break;
			case 1:
            statusImgUrl = ImageUrl + 'tickMark.png';
            ++this.cusltnLength;
            
				break;
			case 3:
            statusImgUrl = ImageUrl + 'Cross Mark ICON.png';
            ++this.declLength;
				break;
      }
      return statusImgUrl;
    }
    gotoOmp(data) {
      var getdata55 = <any>{}
      getdata55 = data;
      sessionStorage.setItem("statusOfcustomer",getdata55.status);
      console.log('statusOfcustomer::',sessionStorage.getItem("statusOfcustomer"));

      //sessionStorage.setItem("getCustomerData",getdata55.goals);
      //console.log('getCustomerData::',sessionStorage.getItem("getCustomerData"));
      
      sessionStorage.setItem("customerId",data.customerId)
      this.router.navigate(['home/oneminuteplan'], { queryParams: { customerKey: data.customerId}});
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
