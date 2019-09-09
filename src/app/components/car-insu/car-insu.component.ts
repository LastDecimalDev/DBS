import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { accessKey, secretKey } from '../../sharedServices/config';
import { NgForm } from '../../../../node_modules/@angular/forms';

declare var jquery:any;
declare var $;
@Component({
  selector: 'app-car-insu',
  templateUrl: './car-insu.component.html',
  styleUrls: ['./car-insu.component.css'],
  providers: [ SharedService ]
})
export class CarInsuComponent implements OnInit {
  public accessKey = accessKey;
  public secretKey = secretKey;
  public userName = null;
  public firstName= null;
  public lastName= null;
  public makes = [];
  public model = [];
  public variants = [];
  public currNcbs = [{'percn':'0%','value':0},{'percn':'20%', 'value':20},{'percn':'25%', 'value':25},{'percn':'50%','value':50} ];
  public carInput={idv:0,claimsCurrYr:'N',policyType:'','productType':'PC', RTO:{rto:'', name:''}, prevPolicy:null, currNcb:null, vehicledoReg:'', variant:{variantName:'', price:0, makeId:0, modelId:0,variantId:0, makeName:'', modelName:'', vehicleAttr:''}, yrOfManu:'', make:{id:'',name:''}};
  public yoms = [];
  public rto = "";
  public carErrorText = "";
  public age = null;
  public DepreciationRate = 0;
  public idvLow = 0;
	public idvHigh = 0;
  public dateToday=new Date();
	public currYear = this.dateToday.getFullYear();
	public currMonth = this.dateToday.getMonth();
	public currDay = this.dateToday.getDate();
  public idvValid: boolean = false;
  public regdateOptions = <any> {};
  public startPolicyOptions = <any> {};
  public yearofManf: boolean= false;
  public errorCall:boolean = false;
  public errorforMinRegdate = null;
  public errorCall2:boolean = false;
  public errorforMaxRegdate = null;
  public errorCall3:boolean = false;

  public removePriceDecimal :any;
  public carFormObj= <any>{
          //"authentication":{"accesskey":"DBS","secretkey":"DBS"},
          "authentication":{"accesskey": this.accessKey,"secretkey": this.secretKey},
          "rmId":"",
           "customerId":"",
				   "vehicleId":"",
			     "vehicleRegistrationDate":"",
			     "idv":0,
			     "vehicleAge":0,
			     "price":0,
           "vehicleName":'',
           "pincode": null,
           "policyStartDate": null,
			     "claim": "",
         	     "prevncb":"" ,
                 "rto": '',
                 "yom": "",
                 "typeOfBusiness": ""
	           }
   public errMessage = null;          
  maRegDate: any;
  minRegDate: string;
  maxRegDate: string;
  public minstratDate:any;
    public maxstratDate:any;

  constructor(private shared: SharedService, private router: Router, private alertservice: AlertService,public datepipe: DatePipe) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.

 });
    $('#pincodecarInsu').tooltip({'trigger':'focus', 'title': ''});
    this.startPolicyOptions={
      maxDate: new Date(this.currYear, this.currMonth, this.currDay+45),
      minDate: new Date(this.currYear, this.currMonth, this.currDay)
}
    this.getMake();
    this.getYoms(); 
    this.getRto(); 
}
keyPress(event) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
 let maxlenght = 6;
  console.log('lenghtt',event.target.value);
  
  if (!pattern.test(inputChar)) {    
      // invalid character, prevent input
      event.preventDefault();
  }
  
}
getValidPinCode(e){
  this.errMessage ="";
  this.errorCall = false;
   if(e.target.value =="")
     this.errMessage ="Pin Code field cannot be blank";
  else{
    this.shared.getPincode(e.target.value)
    .subscribe(
      data =>{
        if(Object.keys(data).length==0){
        this.errMessage ="Pincode is not valid";
        this.errorCall= true;
        }else {
         this.errMessage="";
         this.errorCall= false;
         this.carFormObj.pincode = e.target.value;
        // $('#errorCall').removeClass('has-error');
        // $('#errorCall').addClass('validity');
        }
      
      }
    );
  }   
}
	getMake()
	{
    this.shared.getCarMake()
    .subscribe(
      data =>{
        this.makes = data.result;
      });
	}
  getModel(){
   let carMakeId = $('#carMakes').val();
   this.shared.getCarModel(carMakeId)
   .subscribe(
     data =>{
        this.model = data.result;
     }
   );
  }
  getVariant(){
    let carMakeId = $('#carMakes').val();
    let carModelId = $('#carModel').val();
    this.shared.getCarVariant(carMakeId, carModelId)
    .subscribe(
      data =>{
        this.variants = data.result;
        console.log("Varinats", this.variants);
      }
    );
  }
  storeVariant(variant){
    console.log("VARIANTS goes here", variant);
  }
  submitForm(carInsu){
      if(this.carInput.variant.variantName && this.carInput.vehicledoReg){
			var age = 0;
			if (this.carInput.policyType =='Rollover') {
				age = this.currYear - Number(this.carInput.yrOfManu) + 1;
			}			
			this.DepreciationRate= this.shared.getDepreciationRate(age);
			var idv = (this.DepreciationRate * this.carInput.variant.price);
			this.idvLow = 0.9*idv;
			this.idvHigh = 1.1*idv;
		    this.carInput.idv= (this.DepreciationRate*this.carInput.variant.price);
		    this.validateIDV();
		}
    if(this.carInput.currNcb == null)
		{
			this.carInput.currNcb=0;
		}
    	this.carFormObj.vehicleId= this.carInput.variant.makeId+'^'+this.carInput.variant.modelId+'^'+this.carInput.variant.variantId;
      this.carFormObj.vehicleRegistrationDate = this.carInput.vehicledoReg;
      this.carFormObj.idv= Math.round(this.carInput.idv);
      this.carFormObj.vehicleAge= this.shared.calculateAge(this.carInput.yrOfManu);
      this.removePriceDecimal = this.carInput.variant.price;
      this.removePriceDecimal = Number(this.removePriceDecimal).toFixed(0);
      this.carFormObj.price= this.removePriceDecimal;
      console.log('price::',this.carFormObj.price);
      
     // this.carFormObj.policyCurrentExpDate= this.carInput.prevPolicy;
		  if (this.carInput.policyType=='Rollover'){
			//carFormObj.policyStartDate=this.carFormObj.policyCurrentExpDate, 0, 0, 1),'yyyy-MM-dd');
      this.carFormObj.policyCurrentExpDate = this.carInput.prevPolicy;
      var day = new Date(this.carInput.prevPolicy);
      var nextDay = day.setDate(day.getDate() + 1);
      this.carFormObj.policyStartDate = this.datepipe.transform(nextDay, 'yyyy-MM-dd');
	  	}else
		  {
			this.carFormObj.policyStartDate=this.carFormObj.vehicleRegistrationDate;
      }
      let cuskey = window.location.href.split('=')[1];
      this.carFormObj.customerId = cuskey;
      this.carFormObj.rmId = sessionStorage.getItem('rmId');

      this.carFormObj.claim=this.carInput.claimsCurrYr;
      this.carFormObj.prevncb= this.carInput.currNcb;
      this.carFormObj.rto= this.carInput.RTO.rto;
      console.log("rtoooo::",this.carFormObj.rto);
      this.carFormObj.yom= this.carInput.yrOfManu;
      this.carFormObj.typeOfBusiness=this.carInput.policyType;
      this.carFormObj.vehicleName= this.carInput.variant.makeName+'  '+this.carInput.variant.modelName+'  '+this.carInput.variant.vehicleAttr;
      console.log("CAR FINAL object", this.carFormObj);
			let prodQuote = 'Motor/PC/'+ btoa(JSON.stringify(this.carFormObj));
		  this.router.navigate(['home/policypage'], { queryParams: { quotes: prodQuote}});
         
				
    }

  	validateIDV(){
		
		if (this.carInput.idv < this.idvLow || this.carInput.idv > this.idvHigh ){
			
			this.carErrorText = "IDV out of Allowed Range";
			this.idvValid = false;
		} else
		{
			this.carErrorText = "";
			this.idvValid = true;
		}
		
	}
  getYoms(){
    var endYear= this.currYear-1;
		var startYear = this.currYear -10;
		this.yoms = [];
		if(this.carInput.policyType=='New Business'){
			var endYear=this.currYear;
			var startYear = this.currYear -1;
			
		}
		
		for(var i=endYear;i>=startYear;i--)
		{
			this.yoms.push(i);
		}
  }
  getRto(){
    this.shared.getCarRto()
    .subscribe(
      data =>{
       this.rto = data.result;
       console.log('rtooo',this.rto )
      }
    );
  }
  yomChange(yom)
	{
		
    this.carInput.vehicledoReg = null;
		if (this.carInput.policyType == "Rollover") {

			var startYear = Number(yom);
			var endYear = startYear + 1;
			var endMonth = 11;
			var endDay = 31;
			
			if (startYear == this.currYear || endYear == this.currYear){
				endYear = this.currYear;
				var endMonth = Number(this.currMonth)-10;
				var endDay = this.currDay;
			}
		    this.regdateOptions.minDate = new Date(startYear, 0, 1);
        this.regdateOptions.maxDate = new Date(endYear, endMonth, endDay);
        
		} else{
			this.regdateOptions.maxDate = new Date(this.currYear, this.currMonth, this.currDay+15);
      this.regdateOptions.minDate = new Date(this.currYear, this.currMonth, this.currDay)
	
		}
  }
  carRegDate(regDate)
  {
     this.minRegDate = this.datepipe.transform(this.regdateOptions.minDate,'yyyy-MM-dd');
    this.maxRegDate  = this.datepipe.transform(this.regdateOptions.maxDate,'yyyy-MM-dd')
    
    console.log('regdate::',regDate+" "+this.minRegDate+" "+this.maxRegDate);
    if(regDate < this.minRegDate || regDate > this.maxRegDate)
    {
      this.errorforMinRegdate = 'Invalid date';
      this.errorCall2= true;
      console.log(this.errorforMinRegdate);  
    }
    else{
      this.errorforMinRegdate = '';
      this.errorCall2= false;
      console.log(this.errorforMinRegdate);
    }
  }
  policyStartDate(policysart){
    this.minstratDate = this.datepipe.transform(this.startPolicyOptions.minDate,'yyyy-MM-dd');
    this.maxstratDate  = this.datepipe.transform(this.startPolicyOptions.maxDate,'yyyy-MM-dd')
    
    console.log('policysart::',policysart+" "+this.minstratDate+" "+this.maxstratDate);
    if(policysart < this.minstratDate || policysart > this.maxstratDate)
    {
      this.errorforMaxRegdate = 'Invalid date';
      this.errorCall3= true;
      console.log(this.errorforMaxRegdate);  
    }
    else{
      this.errorforMaxRegdate = '';
      this.errorCall3= false;
      console.log(this.errorforMaxRegdate);
    }
  }
  userSignout(){
    this.router.navigate(['home/login']);
    sessionStorage.clear();
   
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
        
        
      });
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
}
