import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-see-final-qns',
  templateUrl: './see-final-qns.component.html',
  styleUrls: ['./see-final-qns.component.css']
})
export class SeeFinalQnsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
     $('#loader').hide();
  }
  getMyPlan(){
    if($("#netField").val() !="")
      this.router.navigate(['home/product']);
    else{
      document.getElementById("netExp").innerHTML = "Net Expense is required!"; 
      document.getElementById("netExp").style.color = "red";
      $('#netField').focus();
    }
  }
}
