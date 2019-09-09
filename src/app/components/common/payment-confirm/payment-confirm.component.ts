import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SharedService } from '../../../sharedServices/shared.service';
import { IMAGE_URL } from '../../../sharedServices/config';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  public imagePath = IMAGE_URL;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public requestData = <any>{};
  public paymentResults = <any>{};
  public loading:boolean = true;
  constructor(private shared: SharedService, private router: Router) { }

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
    this.requestData.insurerId = location.href.split('PaymentConfirmation')[1].split('/')[1];
    this.requestData.referenceId = location.href.split('PaymentConfirmation')[1].split('/')[2];
    this.shared.getPaymentDetails(this.requestData.referenceId)
    .subscribe(
      data=>{
        $('#loader').hide();
        this.loading = false; 
        if (data.hasOwnProperty("result")){
				this.paymentResults = data.result;
				} else
				{
					this.paymentResults.status = "Error";
					this.paymentResults.msg = "Error getting payment details";
					
				}
      }
    );
  }
 
}
