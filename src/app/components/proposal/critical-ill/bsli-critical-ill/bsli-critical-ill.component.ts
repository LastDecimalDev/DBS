import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { SharedService } from '../../../../sharedServices/shared.service';
import { AlertService } from '../../../../sharedServices/alert.service';
import { IMAGE_URL } from '../../../../sharedServices/config';
//import { RoundProp } from '../../../../sharedServices/mathRound';

declare var jquery:any;
declare var $;

@Component({
  selector: 'app-bsli',
  templateUrl: './bsli-critical-ill.component.html',
  styleUrls: ['./bsli-critical-ill.component.css']
})
export class BsliCriticalIllComponent implements OnInit {
  public proposalError = <any>{};
  public imagePath = IMAGE_URL;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public finalResult = <any>{};
  public proposalData = <any>{};
  public requestData = <any>{};
  public applicationData= <any>{};
  public customerData  = <any>{};
  public loading:boolean = true;
  public errLoad: boolean = false;
  public addonCovers = <any> [];
   public tabStatus= <any> {
    firstComplete : 'indone',
    secondComplete : 'indone',
    thirdComplete : 'indone'
  }
  public purchaseId = null;
  public image_length: number = 0;
  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
 this.getthePage();
  }
getthePage(){
  $('#loader').hide();
  let strUrl = window.location.href.split("=")[1].split('&')[0];
  let decodeUriData =  decodeURIComponent(strUrl);
  //this.proposalInput = JSON.parse(atob(decodeUriData));
  //console.log(this.proposalInput);
  this.requestData.productId = decodeUriData.split('/')[2];
  this.requestData.rmId = decodeUriData.split('/')[3];
  this.requestData.customerId = decodeUriData.split('/')[4];
  this.requestData.appNo = decodeUriData.split('/')[5];
  this.requestData.customerId = window.location.href.split('=')[2];
  this.applicationData = this.shared.appParams;
  this.addonCovers =  this.shared.addonsCover;
  if(Object.keys(this.applicationData).length == 0){
    this.loading = false; 
    this.errLoad = true;   
   $('#resErrorModal').modal('show');
  }else{
  this.applicationData.requestParams.age = this.shared.calculateAge(this.applicationData.requestParams.dob);
  this.applicationData.paymentMode = "Annual";
  console.log("APPLICATION PARAMETERS", this.applicationData);
          this.shared.loadCusmerDetails(this.applicationData.requestParams.rmId, this.applicationData.requestParams.customerId)
          .subscribe(data =>{
            console.log("LOAD CUSTOMER", data);
            this.customerData = data.result;
            this.customerData.ProposerName = this.customerData.firstName + " " + this.customerData.lastName;
            this.loading = false;
            this.getChoosenQns(this.customerData.goals.goalsInput);
          });
        }
}
nextSection(section)
{
  $(document).ready(function(){
    $(this).scrollTop(0);
  });
  $('#loader').show();
  switch (section){
  case "1":
    this.tabStatus.firstComplete = 'done';
    $('#SecondTab').removeClass('tabdisable');
    $('#panel'+section).removeClass('in active');
    var nextSec = Number(section) + 1;
    $('#panel'+nextSec).addClass('in active');
    $('li:nth-child('+section+')').removeClass('active');
    $('li:nth-child('+nextSec+')').addClass('active');
    $('#loader').hide();
    break;
  case "2":
    this.tabStatus.secondComplete = 'done';
    $('#thirdTab').removeClass('tabdisable');
    this.submitofflineApp();
    break;
  }
  
}
submitofflineApp(){
  this.proposalData.rmId = this.customerData.rmId;
  this.proposalData.customerId = this.customerData.customerId;
  this.proposalData.insuredName =  this.customerData.ProposerName;
  this.proposalData.proposerName =  this.customerData.ProposerName;
  this.proposalData.email =  this.customerData.email;
  this.proposalData.age =  this.customerData.age;
  this.proposalData.occupation = this.customerData.occupation;
  this.proposalData.riskProfile = this.customerData.riskProfile;
  this.proposalData.goals = this.customerData.goals;
  this.proposalData.purchaseReason = this.customerData.purchaseReason;
  this.proposalData.productName  = this.applicationData.displayName;
  this.proposalData.productId = this.applicationData.productId;
  this.proposalData.planId = this.applicationData.planId;
  this.proposalData.premium = this.applicationData.totalPremium;
  this.proposalData.pt = this.applicationData.pt;
  this.proposalData.ppt = this.applicationData.ppt;
  this.proposalData.insAge =  this.applicationData.requestParams.age;
  this.proposalData.childAge = '';
  this.proposalData.deathBenefit = this.applicationData.requestParams.sa;
  this.proposalData.sa = this.applicationData.requestParams.sa;
  this.proposalData.paymentMode = this.applicationData.paymentMode;

    this.shared.offlineSubmit(this.proposalData)
    .subscribe( data=>{
    $('#loader').hide();
    if(data.hasOwnProperty("error")){
      this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPrint:[]}
      var str=data.error;
      this.proposalError.errorPrint=this.cleanArray(str.split(";"))
      console.log(this.proposalError)
    } else{
      this.purchaseId = data.result.purchaseId;
    $('#panel2').removeClass('in active');
    $('#panel3').addClass('in active');
    $('li:nth-child(2)').removeClass('active');
    $('li:nth-child(3)').addClass('active');
   console.log("RESULT APPPPPP", data);
    }
    });
}
userSignout(){
  this.router.navigate(['home/login']);
  sessionStorage.clear();
 
}

getChoosenQns(loadInputs){
  this.shared.getQuestionlist()
  .subscribe( data=>{
    var getGoals = loadInputs.split(',');
    for(var i=0; i<getGoals.length; i++){
        for(var j=0;j<data.result.length; j++){
            for(var k=0;k<data.result[j].answers.length; k++){
                if(getGoals[i]== data.result[j].answers[k].answer)
             this.finalResult[i] = data.result[j].answers[k].image_url;
             if(getGoals[2] == data.result[j].answers[k].answer)
             this.customerData.occupation = data.result[j].answers[k].answer_text;
             if(getGoals[3] == data.result[j].answers[k].answer)
             this.customerData.riskProfile = data.result[j].answers[k].answer_text.split(':')[0];
            }
        }
    }
    console.log(this.finalResult);
    this.image_length = Object.keys(this.finalResult).length;
  });
}
cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
}
