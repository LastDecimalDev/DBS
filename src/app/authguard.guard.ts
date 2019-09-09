import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { takeUntil, take } from 'rxjs/operators';

import { AlertService } from './sharedServices/alert.service';

@Injectable()
export class AuthguardGuard implements CanActivate {
  private user;
  stateDesc;
  duration: number;
  endTime = 1;
  minutesDisplay = 0;
  secondsDisplay = 0;
  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription;
  constructor(private router: Router, private alertservice: AlertService)
   { }
   _userActionOccured: Subject<void> = new Subject();
   get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };
  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.stateDesc = state;
        if (sessionStorage.getItem('user')) {
            // logged in so return true
           // this.router.navigateByUrl(state.url);
            return true;
        }
        this.router.navigate(['home/login'], { queryParams: { returnUrl: state.url }});
        return false;
        
    }
    resetTimer() {
        const interval = 1000;
        this.duration = this.endTime * 60 * 60;
        this.timerSubscription = timer(0, interval).pipe(
          take( this.duration)
        ).subscribe(value =>
          this.render((this.duration - +value) * interval),
          err => { },
          () => {
            this.router.navigate(['home/login'], { queryParams: { returnUrl: this.stateDesc.url }});
          }
        )
      }
      private render(count) {
        this.secondsDisplay = this.getSeconds(count);
        this.minutesDisplay = this.getMinutes(count);
       // console.log(this.minutesDisplay +":"+ this.secondsDisplay);
      }
    
      private getSeconds(ticks: number) {
        const seconds = ((ticks % 60000) / 1000).toFixed(0);
        return this.pad(seconds);
      }
    
      private getMinutes(ticks: number) {
        const minutes = Math.floor(ticks / 60000);
        return this.pad(minutes);
      }
    
      private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
      }
      public reset(){
        this.timerSubscription.unsubscribe();
      }
   
    }
