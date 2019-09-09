import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  public signUrl = null;
  public showHead: boolean = true;
  constructor(public router: Router) {
   }

  ngOnInit() {
   
  }
  ngDoCheck(){
    if(location.pathname.includes('login'))
    this.showHead = false;
    else this.showHead = true;
  }
userSignout(){
    this.router.navigate(['home/login']);
    sessionStorage.clear();
   
  }
}
