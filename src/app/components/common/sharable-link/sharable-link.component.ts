import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../sharedServices/shared.service';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-sharable-link',
  templateUrl: './sharable-link.component.html',
  styleUrls: ['./sharable-link.component.css']
})
export class SharableLinkComponent implements OnInit {
  public illusUrl = null;
  public formUrl = null;
  public mobileNo = null;
  public showReview: boolean = false;
  public errorStatus: boolean = false;
  public failedStatus: boolean = false;
  public appNo = null;
  public productID = null;
  public productName = null;
  constructor(private shared: SharedService) { }

  ngOnInit() {
    $('#loader').hide();
    this.getReviewPage();
  }
  generateOTP(){
    $('#loader').show();
    this.failedStatus = false;
    this.appNo = window.location.href.split("/")[5];
    /*var n=this.appNo.match(/^[UuCc]{1}[0-9]{9}$/)
    if(n==null)
    {
     var productID = "109N108V02"
      console.log("productId",productID);
      var productName = "BSLI Life Insurance";
    }
    else
    {
      var productID = "110N129V03";
      var productName = "Tata AIA Life Insurance Sampoorna Raksha";
    }*/
    
    this.shared.generateOTP(this.appNo, this.productID, this.productName, this.mobileNo)
    .subscribe(data =>{
      $('#loader').hide();
      if(data.result==0)
      $('#successOTPSent').modal('show');
      else this.failedStatus= true;
    }, error =>{
      $('#loader').hide();
      this.failedStatus= true;
    });
  }
  openIllustration(){
    window.open(this.illusUrl, '_blank');
  }
   
  openFormUrl(){
    window.open(this.formUrl, '_blank');
  }
  getReviewPage(){
    this.appNo = window.location.href.split("/")[5];
    this.shared.getReview(this.appNo)
    .subscribe(data =>{
      if(data.result){
        this.illusUrl = data.result.illustrationUrl;
        this.formUrl = data.result.applicationUrl;
        this.mobileNo = data.result.mobile;
        this.productID = data.result.productId;
        this.productName = data.result.productName;
        this.showReview = true;
      }else{
       this.errorStatus = true;
      }
    }, error =>{
      this.failedStatus= true;
    });
  }
}
