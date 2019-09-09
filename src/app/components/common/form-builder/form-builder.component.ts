import { Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { DomSanitizer} from '@angular/platform-browser';
declare var jquery:any;
declare var $;
interface formSubmitter {
  url: any;
  method: any;
  params?: any;
} 
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})

export class Broadcaster {
  @ViewChild('builderform') form: NgForm;
  
  //private form: Subject<formSubmitter>;
  public formData = <any>{};
  constructor(private sanitizer: DomSanitizer) {
  //this.form = new Subject<formSubmitter>();
  }
  broadcast(url: any, method:any, params?: any) {
   url =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
    //this.form.next({url, method, params});
    this.formData.url = url;
    this.formData.method = method;
    this.formData.params = params;
    this.onSubmit(this.formData);
   
  }
  onSubmit(form) {
    return `<form id="payUrlSubmit"  #builderform = "ngForm" (ngSubmit)="onSubmit(builderform)" name="payUrlSubmit" action="{{ form.url }}" method="{{ form.method }}">
    <div *ngFor="let key of form.params">
        <input type="hidden" name="{{ key }}" value="{{key }}" />
    </div>
  </form>`;
  }
}
