import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { IMAGE_URL, uploadURL } from '../../sharedServices/config';
import { DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Headers, Http, HttpModule, Response,RequestOptions, Request, RequestMethod} from '@angular/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';



declare var jquery:any;
declare var $;
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  public applicationDate:any;
  public URL = 'https://dbsuat-207905.appspot.com/fileUpload'
  public dataURL="https://dbsuat-207905.appspot.com/api/DataRequest"
  public proposalInput = <any>{};
  public bi = <any>{};
  public biInputTag:boolean = false;
  public requestData = <any>{};
  public applicationData= <any>{};
  public insurerMaster = <any> [];
  public insurancePurposeforapplication=<any>[];
  public loading:boolean = true;
  public masterLoaded: boolean = false;
  public appointeeFlag:boolean=false;
  public menuLoaded: boolean = false;
  public formLoaded: boolean = false;
  public uploadList = {};
  public dateOptions = {};
  public nomineeDobOptions = {};
  public pastDateOptions = <any>{};
  public futureDateOptions = <any> {};
  public adultDobOptions = {};
  public medicalOption = {};
  public covers=<any>[];
  public proposalError = <any>{};
  public application = <any>{};
  public family = <any>{};
  public isAlcoholicDetails = <any> {};
  public isTobaccoDetails = <any>{};
  public isTravelOutsidesDetails = <any> {};
  public policy = <any>{};
  public disState = null;
  public qIndex = 0;
  public permaddress:boolean=false;
  public appInput = <any>{};
  public disableRelSelect:boolean = false;
 
  public question = <any>{};
  public filesUploaded: Array<any> = [];
  public docUploaded: boolean = false;
  public readytoUpload: boolean = false;
  public uploadingDoc:boolean= false;
  public tcVisible:boolean = false;
  public secInsuredHealthqns: boolean = false;
  public countryCode = [];
  public biAccepted: boolean = false;
 

  public riders = [
    {"id" : "ADD",
     "name" : "ADB PLUS" ,
     "sa" : 0,
     "selected" : false,
     "display" : true
    },
    {"id" : "CI",
     "name" : "Critical Illness" ,
     "sa" : "",
     "selected" : false,
     "display" : false
    },
    {"id" : "SC",
     "name" : "Surgical Care" ,
     "sa" : "",
     "selected" : false,
     "display" : false
    },
    {"id" : "HOC",
     "name" : "Hospital Cash" ,
     "sa" : "",
     "selected" : false,
     "display" : false
    }
  ];
  
  public filesToUpload = [	
    {"fileType": "CDF","displayName" : "CDF",  "docId": "13101", "fileName": ""}
    ,{"fileType": "CCR","displayName" : "CCR",  "docId": "13102", "fileName": ""}
    ,{"fileType": "FPF","displayName" : "Financial Profile Form",  "docId": "13103", "fileName": ""}
    ,{"fileType": "FTF","displayName" : "Financial Transaction Form",  "docId": "13103", "fileName": ""}
    ,{"fileType": "insuredPhoto","displayName" : "Insured Photograph", "docId": "13104",  "fileName": ""}
    ,{"fileType": "chequeleaf","displayName" : "Cheque Leaf",  "docId": "13105", "fileName": ""}
  ];
 
 
  

  constructor(private shared: SharedService, public http: Http,private datepipe: DatePipe,private router: Router) { }

  ngOnInit() {
    this.applicationDate=new Date();
   
    this.getthePage();
  }
  
  ngDoCheck(){
   
     
    var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
     if (isiPad)
     {
      $('#dowillu span.testillu').text('Email Application Form');
     }
     else{
      $('#dowillu span.testillu').text('Download Application Form');
     }
    }
getthePage(){
  
  this.requestData.productId = location.href.split('=')[1].split('&')[0];
  this.requestData.rmId = window.location.href.split('=')[2].split('&')[0];
  this.requestData.customerId = location.href.split('=')[3].split('&')[0];
  this.requestData.appNo = location.href.split('=')[4].split('&')[0];
 this.shared.getApplicationData(this.requestData.productId,this.requestData.rmId,this.requestData.customerId,this.requestData.appNo)
  .subscribe(
      data =>{
        console.log(data);
        if (data.hasOwnProperty("result")){
            this.applicationData = JSON.parse(data.result);
            console.log("this.applicationData",this.applicationData)
            this.applicationData.authentication = {"accesskey":"DBS","secretkey":"DBS"};
            this.proposalInput= this.applicationData.proposalData;
            this.covers=this.applicationData.proposalData.covers;
            this.proposalInput.policy.annualPremium = this.proposalInput.policy.basePremium;
            this.proposalInput.payments= this.applicationData.proposalData.payment;
            
            console.log(this.proposalInput.insured.personalInfo.height);
          console.log(this.proposalInput);
          
       /*if(this.shared.permaddressins==true)
          {
            this.permaddress=true;
          }
          else if(this.shared.permaddressins==false)
          {
            this.permaddress=false;

          }*/
        /* if(JSON.stringify(this.proposalInput.insured.address[0])==JSON.stringify(this.proposalInput.insured.address[1]))
        {
          this.permaddress=true;
          
        }*/
        if(this.proposalInput.policy.insurancePurpose!="")
        {
          this.insurancePurposeforapplication= this.proposalInput.policy.insurancePurpose.split(',');
      
        }
          this.loading = false;
          this.loadMasterData(this.proposalInput.insurerId);
           }
      });
}

loadMasterData(insurerId){
  this.shared.getInsuMaster(insurerId)
  .subscribe(data =>{
    for(var k in data)  {
      var masterId = k;
      var master = [];
      var output = [];
      master = data[k];
      //console.log("get Masters for :" + masterId);
      $.each(master, function(key, value){
      var item = <any> {};
      item.id = key;
      item.value = value;
      output.push(item);
    });
    if (output.length>0){
      this.insurerMaster[masterId] = output;
    }
        this.masterLoaded = true;
        if (this.menuLoaded && this.masterLoaded && this.formLoaded){
          
          this.loading = false;
        }
  }
  this.setAppInput(this.applicationData);
  
  },
 );
  }
 
  
    setAppInput(data){
			
      this.appInput = data;
      // console.log("Data Updated at: " + new Date(this.appInput.lastUpdateTs));
      this.proposalInput = this.appInput.proposalData;
      //this.proposalInput.policy.modalPremium = this.proposalInput.policy.policyPremium
      console.log(this.proposalInput);
      //this.proposalInput.insured.dob = new Date(this.proposalInput.insured.dob);
      //this.proposalInput.proposer.dob = new Date(this.proposalInput.proposer.dob);
      this.proposalInput.policy.vendorUID = "11"; // for DBS
      this.proposalInput.policy.illustrationID = "qwewqewq354353";
      
      if (this.proposalInput.policy.isMinor) {
        this.disableRelSelect = true;
        this.proposalInput.insured.isProposerInsuredSame = "N";
      }
  
      if (this.proposalInput.policy.productType == "Term") {
        this.disableRelSelect = true;
        this.proposalInput.insured.isProposerInsuredSame = "Y";
        this.proposalInput.proposer.isProposerInsuredSame = "Y";
        this.proposalInput.insured.relationshipWithLi = "SAME";
        this.proposalInput.proposer.relationshipWithLi = "SAME";
      }
      
       
      if (!this.proposalInput.hasOwnProperty("funds")){
        this.proposalInput.funds = [];
      }
    
    
      this.populateDocuments();
      this.formLoaded = true;
     
      
    }
    populateDocuments(){
     
      if (typeof(this.proposalInput.insured) != "undefined"){
        if (typeof(this.proposalInput.insured.ageProofType) != "undefined" && this.proposalInput.insured.ageProofType != ""){
         // this.ageProofIN = this.getKYCId("AgeProof", "IN", this.proposalInput.insured.ageProofType);
          this.addDocumentToUploadList('IN','AGEPROOF',this.proposalInput.insured.ageProofType);
        }
        if (typeof(this.proposalInput.insured.idProofType) != "undefined" && this.proposalInput.insured.idProofType != ""){
         // this.identityProofIN = this.getKYCId("IdentityProof", "IN", this.proposalInput.insured.idProofType);
          this.addDocumentToUploadList('IN','IDPROOF', this.proposalInput.insured.idProofType);
        }
        if (typeof(this.proposalInput.insured.incomeProofType) != "undefined" && this.proposalInput.insured.incomeProofType != ""){
         // this.incomeProofIN = this.getKYCId("IncomeProof", "IN", this.proposalInput.insured.incomeProofType);
          this.addDocumentToUploadList('IN','INCOMEPROOF',this.proposalInput.insured.incomeProofType);
        }
        if (typeof(this.proposalInput.insured.addressProofType) != "undefined" && this.proposalInput.insured.addressProofType != ""){
           // this.addressProofIN = this.getKYCId("PermAddressProof", "IN", this.proposalInput.insured.addressProofType);
            this.addDocumentToUploadList('IN','RESPROOF',this.proposalInput.insured.addressProofType);	
        }
      }
    
      if (this.proposalInput.policy.jointLife){
        if (typeof(this.proposalInput.secInsured.ageProofType) != "undefined" && this.proposalInput.secInsured.ageProofType != ""){
         // this.ageProofIN = this.getKYCId("AgeProof", "IN", this.proposalInput.insured.ageProofType);
          this.addDocumentToUploadList('SECIN','AGEPROOF',this.proposalInput.secInsured.ageProofType);
        }
        if (typeof(this.proposalInput.secInsured.idProofType) != "undefined" && this.proposalInput.secInsured.idProofType != ""){
         // this.identityProofIN = this.getKYCId("IdentityProof", "IN", this.proposalInput.insured.idProofType);
          this.addDocumentToUploadList('SECIN','IDPROOF', this.proposalInput.secInsured.idProofType);
        }
      
      }

     this.download1();
     
    }
    addDocumentToUploadList(insuredType,attribute, proofType){
      proofType = this.getMasterValue(attribute, proofType);
      var obj = <any>[];
      if(insuredType == 'IN'){
        switch(attribute){
              case 'AGEPROOF':  
                                obj.displayName =  "Insured - "+proofType+"(Age Proof)"; 
                                obj.fileType = "CDF";
                                obj.docId = "2012010007";
                                obj.fileName = "";
                                if (!this.itemExists(this.filesToUpload, obj.docId))
                                this.filesToUpload.push(obj);
                                else this.filesToUpload[6].displayName = obj.displayName;
                              break;
              case 'IDPROOF':   
                                obj.displayName =  "Insured - "+proofType+"(Identity Proof)"; 
                                obj.fileType = "CDF";
                                obj.docId = "2023010108";
                                obj.fileName = "";
                                if (!this.itemExists(this.filesToUpload, obj.docId))
                                this.filesToUpload.push(obj);	
                                else this.filesToUpload[7].displayName = obj.displayName;
                              break;
              case 'INCOMEPROOF':  
                                obj.displayName =  "Insured - "+proofType+"(Income Proof)"; 
                                obj.fileType = "CDF";
                                obj.docId = "2016010038";
                                obj.fileName = "";
                                if (!this.itemExists(this.filesToUpload, obj.docId))
                                this.filesToUpload.push(obj);	
                                else this.filesToUpload[8].displayName = obj.displayName;
                              break;
              case 'RESPROOF':  
                                obj.displayName =  "Insured - "+proofType+"(Address Proof)"; 
                                obj.fileType = "CDF";
                                obj.docId = "2023010109";
                                obj.fileName = "";
                                if (!this.itemExists(this.filesToUpload, obj.docId))
                                this.filesToUpload.push(obj);	
                                else this.filesToUpload[9].displayName = obj.displayName;
                              break;                                                                
        }	
      }else{
        switch(attribute){
          case 'AGEPROOF':  
                            obj.displayName =  "Secondary Insured - "+proofType+"(Age Proof)"; 
                            obj.fileType = "CDF";
                            obj.docId = "2012010017";
                            obj.fileName = "";
                            if (!this.itemExists(this.filesToUpload, obj.docId))
                            this.filesToUpload.push(obj);
                            else this.filesToUpload[10].displayName = obj.displayName;
                          break;
      
          case 'INCOMEPROOF':  
                           
                            obj.displayName =  "Secondary Insured - "+proofType+"(Income Proof)"; 
                            obj.fileType = "CDF";
                            obj.docId = "2016010138";
                            obj.fileName = "";
                            if (!this.itemExists(this.filesToUpload, obj.docId))
                            this.filesToUpload.push(obj);	
                            else this.filesToUpload[12].displayName = obj.displayName;
                          break;
        }
      }
        console.log('FILES TO UPLOAD', this.filesToUpload); 
    }
    getMasterValue(masterName, masterId){
			
      var masterValue = "";
      var values = this.insurerMaster[masterName];
      
      if (typeof(values) != "undefined"){
        for (var i = 0; i<values.length; i++){
          
          if (values[i].id == masterId){
            masterValue = values[i].value;
            //console.log(masterValue)
            break;
          }
        }
        
      }
      return masterValue; 
    } 
      
    itemExists(array, item){
      var exists= false;
      for (var i = 0; i< array.length; i++){
        if (array[i].docId == item){
          exists= true;
          break;
        }
      }  
      return exists;
    }
    getRequirements(){
			
      var biInput = <any>{};
        
      // Fields for SMS
      biInput.biDate = new Date();
      biInput.productName = this.proposalInput.policy.productName;
      biInput.appNo = this.proposalInput.policy.applicationNumber;
      biInput.mobile = this.proposalInput.proposer.mobile;
      biInput.genOTP = "Y";
      
      //
      biInput.type = "P";
      biInput.productType = this.proposalInput.policy.productType;
      biInput.productId = this.proposalInput.policy.productId;
      biInput.planId = this.proposalInput.policy.planId;
      if(this.proposalInput.policy.jointLife== false){
        biInput.isJointlife = "N";
        biInput.secdob =  this.proposalInput.insured.dob;
        biInput.secage = this.proposalInput.insured.age;
        biInput.secgender= this.proposalInput.insured.gender;
        biInput.secrating =this.proposalInput.policy.rating;
      }else{ 
        biInput.isJointlife = "Y";
        biInput.secownname= this.proposalInput.secInsured.title+". "+ this.proposalInput.secInsured.firstName + " " + this.proposalInput.secInsured.lastName;
        biInput.secdob =  this.proposalInput.secInsured.dob;
        biInput.secage = this.proposalInput.secInsured.age;
        biInput.secgender= this.proposalInput.secInsured.gender;
        biInput.secrating =this.proposalInput.policy.secrating;
      }
      biInput.PremiumMultiple = '10';
      biInput.mode = "1";
      biInput.pt = this.proposalInput.policy.pt;
      biInput.ppt = this.proposalInput.policy.ppt;
     // biInput.mode = 12/ Number(this.proposalInput.policy.mode);
      biInput.ap = this.proposalInput.policy.basePremium;
      biInput.sa = this.proposalInput.policy.basicSumAssured;
      biInput.totalPremium = this.proposalInput.policy.totalPremium;
      biInput.serviceTax = this.proposalInput.policy.serviceTax;
      biInput.ownage = this.proposalInput.proposer.age;
      biInput.insage = this.proposalInput.insured.age;
      biInput.DOB = this.proposalInput.insured.dob;
      biInput.owngender = this.proposalInput.proposer.gender;
      biInput.insgender = this.proposalInput.insured.gender;
      biInput.ownname = this.proposalInput.proposer.title+". "+ this.proposalInput.proposer.firstName + " " + this.proposalInput.proposer.lastName;
      biInput.insname = this.proposalInput.insured.title+". "+ this.proposalInput.insured.firstName + " " + this.proposalInput.insured.lastName;;
      biInput.nrv = this.proposalInput.insured.nrv;
      biInput.relPeriod = this.proposalInput.insured.relPeriod;
      biInput.rating = this.proposalInput.policy.rating;
      if ( this.proposalInput.insured.employmentDetails.occupation == "Salaried"
      || this.proposalInput.insured.employmentDetails.occupation == "Self Employed"){
        biInput.occupationCode = "1";
      } else
      {
        biInput.occupationCode = "3";
      }
      // add Riders
      biInput.riders = this.addRiders();
      //
    
      if (this.proposalInput.policy.productType=='ULIP'){
        biInput.funds = this.proposalInput.funds;
      }
      console.log(biInput);
    
      this.shared.getBI(biInput)
      .subscribe(data=>{
        if (!data.hasOwnProperty("error")){
          this.bi = data;
          this.bi.biInput = biInput;
          this.biInputTag = true;
          // Check the premium and populate.
          this.proposalInput.policy.modalPremium = Math.round(this.bi.installmentPremiumPayableWtRider);
          //
          this.bi.productName = this.proposalInput.policy.productName;
          console.log("this.bi in application component",this.bi);
          if (this.bi.hasOwnProperty("Requirements") && this.bi.Requirements.length > 0) {
            this.bi.isMedical = true
          } else
          {
            this.bi.isMedical = false
          }
          
          if (this.bi.hasOwnProperty("Riders") && this.bi.Riders.length > 0) {
            this.proposalInput.riders = [];
            this.bi.Riders.forEach(value => {
              if (value.Name == "ADB Plus") {
                var rider = <any>{};
                rider.riderId = "ADD"
                rider.riderSumAssured = value.SA
                rider.riderPremium = value.AP
                this.proposalInput.riders.push(rider);
              }
            })
          }
         // this.getDocumentUploadList();
          
          
        var otpInput = <any> {};
        otpInput.appNo = this.proposalInput.policy.applicationNumber;
        otpInput.productId = this.proposalInput.productId;
        otpInput.productName = this.proposalInput.policy.productName;
        otpInput.mobile = this.proposalInput.proposer.mobile;
       
          
        }/* else
        {
          this.proposalError={key:"Proposal Submission couldn't be completed due to the following errors",errorPirnt:[]}
        if (data.error != "null") {
          var str=data['error'];
          
        } else
        {
          str="Unexpected Error from Insurer while processing your application";
        }
          
          this.proposalError.errorPirnt=str.split(";");
        console.log(this.proposalError)
            this.loading = false;
          
        }*/
      });
    }
    
    addRiders(){
			
      var riders = [];
      
      var rider = <any>{};
      for (var i=0; i<this.riders.length; i++){
        rider = {};
        rider.name = this.riders[i].id;
        if(this.riders[i].selected){
          rider.sa = this.riders[i].sa;
        } else
        {
          rider.sa = "";
        }
        riders.push(rider);
      }
      
      if (this.proposalInput.insured.age < 18) {
        rider.name = "WOP";
        riders.push(rider);
      } 
       return riders;
      
    }
  

download1()
{
  var dataapp=this.applicationData;
  var productId = location.href.split('=')[1].split('&')[0];
  var rmId = window.location.href.split('=')[2].split('&')[0];
  var customerId = location.href.split('=')[3].split('&')[0];
  var appNo = location.href.split('=')[4].split('&')[0];
  var appDataillurl;
  var savedData= this.shared.saveApplicationDataForApplication;
  var URL = this.URL;
  var URLSAVE=this.dataURL;
  var data = new FormData();
  var uploadUrlPdf = this.shared.uploadUrlPdf;
  var requestHttp = this.http;
  $('html').css('background-color','white');
  var quotes = document.getElementById('dbs');

  html2canvas(quotes, )
 .then((canvas) => {
  var doc = new jsPDF('p', 'pt', 'letter');
  doc.internal.scaleFactor=3.0;
  for (var i = 0; i <= quotes.clientHeight/980; i++) {
      //! This is all just html2canvas stuff
      var srcImg  = canvas;
      var sX      = 0;
      var sY      = 980*i; // start 980 pixels down for every new page
      var sWidth  = 1350;
      var sHeight = 980;
      var dX      = 0;
      var dY      = 0;
      var dWidth  = 900;
      var dHeight = 980;
      var canvas1;
      canvas1= document.createElement("canvas");
      canvas1.setAttribute('width', 1350);
      canvas1.setAttribute('height', 980);
      var ctx = canvas1.getContext('2d');
      ctx.clearRect(0,0,1350,980);
      ctx.fillStyle="#ffff";
      ctx.fillRect(0,0,1350,980);
      // details on this usage of this function: 
      // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
      ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

      // document.body.appendChild(canvas);
      var canvasDataURL = canvas1.toDataURL("image/jpeg",0.3);
      var width         = canvas1.width;
      var height        = canvas1.clientHeight;

      //! If we're on anything other than the first page,
      // add another page
      if (i > 0) {
        doc.addPage(612, 791); //8.5" x 11" in pts (in*72)
      }
      //! now we declare that we're working on that page
      doc.setPage(i+1);
      doc.addImage(canvasDataURL, 'jpeg',0,20, (width*.62)+80, (height*.62));

  }
  let tdydate=new Date();
  let tdydate1=tdydate.getDate();
  let tdymonth=tdydate.getMonth()+1;
  let tdyyear=tdydate.getFullYear();
  let tdyhour=tdydate.getHours();
  let tdyminute=tdydate.getMinutes();
  let tdysec=tdydate.getSeconds();
   let downloadpdf=appNo+"_000000000_111001_"+tdydate1+tdymonth+tdyyear;
 
  //! after the for loop is finished running, we save the pdf.
  doc.save(downloadpdf+'.pdf');
  var pdf = doc.output('blob');
   data.append('pdfData', pdf);
   //alert(pdf);
  uploadUrlPdf(URL, requestHttp, pdf,"111001", dataapp.proposalData)
            .subscribe(data =>{
            if (!data.hasOwnProperty("error"))
             {
              data=JSON.parse(data);
              var illustrationUrl=<any>[];
              var illustrationUrl=data.fileUrl.split("https://storage.googleapis.com/dbs_applications/");
              var illuFileUrl=illustrationUrl[1];
              appDataillurl=illuFileUrl;
              dataapp.proposalData.appUrl=appDataillurl;
            

              savedData(URLSAVE,requestHttp,dataapp,productId,rmId,customerId,appNo)
              .subscribe(
                  data =>{
                    console.log("data",data)
                 });
              }
             }
            );
});

          
 
}


  

    
    download(){
      var dataapp=this.applicationData;
      var productId = location.href.split('=')[1].split('&')[0];
      var rmId = window.location.href.split('=')[2].split('&')[0];
      var customerId = location.href.split('=')[3].split('&')[0];
      var appNo = location.href.split('=')[4].split('&')[0];
      var appDataillurl;
      var savedData= this.shared.saveApplicationDataForApplication;
      var URL = this.URL;
      var URLSAVE=this.dataURL;
      var data = new FormData();
      var uploadUrlPdf = this.shared.uploadUrlPdf;
      var requestHttp = this.http;
      var doc = new jsPDF('p','pt','letter');
      doc.internal.scaleFactor=2.25;
    html2canvas(document.getElementById('dbs')).then(function(canvas) {
          var imgData = canvas.toDataURL("image/jpeg",1.0);
        //var imgData = canvas.toDataURL("image/jpeg")
           var imgWidth = doc.internal.pageSize.getWidth(); 
            var pageHeight = doc.internal.pageSize.getHeight();
            console.log("pageHeight",pageHeight);
            var imgHeight = canvas.height * imgWidth / canvas.width;
              var heightLeft = imgHeight;
            var position = 0;
           
             doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
          
             heightLeft -= pageHeight;
            
           while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
               heightLeft-= pageHeight;
            }
           
           let tdydate=new Date();
           let tdydate1=tdydate.getDate();
           let tdymonth=tdydate.getMonth()+1;
           let tdyyear=tdydate.getFullYear();
           let tdyhour=tdydate.getHours();
           let tdyminute=tdydate.getMinutes();
           let tdysec=tdydate.getSeconds();
           let downloadpdf=appNo+"_000000000_111001_"+tdydate1+tdymonth+tdyyear;
            
              doc.save(downloadpdf+".pdf");
              var pdf = doc.output('blob');
       
              data.append('pdfData', pdf);
            uploadUrlPdf(URL, requestHttp, pdf,"2023010113", dataapp.proposalData)
            .subscribe(data =>{
            if (!data.hasOwnProperty("error"))
             {
              data=JSON.parse(data);
              var illustrationUrl=<any>[];
              var illustrationUrl=data.fileUrl.split("https://storage.googleapis.com/dbs_applications/");
              var illuFileUrl=illustrationUrl[1];
              appDataillurl=illuFileUrl;
              dataapp.proposalData.appUrl=appDataillurl;
            

              savedData(URLSAVE,requestHttp,dataapp,productId,rmId,customerId,appNo)
              .subscribe(
                  data =>{
                    console.log("data",data)
                 });
              }
             }
            );
           
           
      });
         
}

}




    