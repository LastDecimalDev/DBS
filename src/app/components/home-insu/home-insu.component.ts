import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from '../../sharedServices/shared.service';
declare var jquery:any;
declare var $
@Component({

  selector: 'app-home-insu',
  templateUrl: './home-insu.component.html',
  styleUrls: ['./home-insu.component.css']
})
export class HomeInsuComponent implements OnInit {
	//public showCost: boolean = false;
	public errMessage2 = null;
	public errMessage3 = null;
	public errMessage1 = null; 
	public userName = null;
  public firstName= null;
  public lastName= null;
  public healthInput={member:[{dob:'',gender:'',adultChild:''}],adultAge:[],childAge:[]};
  public estimatedCost=[{name:'One Lakh',val:'100000'},{name:'Five Lakh',val:'500000'},{name:'Ten Lakh',val:'1000000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Tweenty Lakh',val:'2000000'},{name:'Tweenty Five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Fifty Lakh',val:'5000000'},{name:'Sixty Lakh',val:'6000000'},{name:'1 Crore',val:'10000000'},{name:'1 Crore Fifty Lakhs',val:'15000000'},{name:'2 Crores',val:'20000000'},{name:'3 Crores',val:'30000000'}, {name:'4 Crores',val:'40000000'}, {name:'5 Crores',val:'50000000'}, {name:'6 Crores',val:'60000000'},{name:'7 Crores',val:'70000000'},{name:'8 Crores',val:'80000000'},{name:'9 Crores',val:'90000000'}, {name:'10 Crores',val:'100000000'}];
  public valuetoInsure=[{name:'Five Thousands',val:'5000'},{name:'Ten Thousands',val:'10000'},{name:'Fifty Thousands',val:'50000'},{name:'Sixty Thousands',val:'60000'},{name:'Seventy Thousands',val:'70000'},{name:'Eighthy Thousands',val:'80000'},{name:'Ninenty Thousands',val:'90000'},{name:'One Lakh',val:'100000'},{name:'Five Lakhs',val:'500000'},{name:'Ten Lakhs',val:'1000000'},{name:'Twenty Lakhs',val:'2000000'},{name:'Twenty Five Lakhs',val:'2500000'},{name:'Thirty Lakhs',val:'3000000'}, {name:'Thirty Five Lakhs',val:'3500000'}, {name:'Forty Lakhs',val:'4000000'}, {name:'Forty Five Lakhs',val:'4500000'},{name:'Fifty Lakhs',val:'5000000'},{name:'Fifty Five Lakhs',val:'5500000'},{name:'Sixty Lakhs',val:'6000000'}];
  public helpme = {homesq:0, constrCost:0, cost:0};
  public dobList=[];
	public genderList=[];
	public h_member='';
	public ageLists=[];
	public healthObj={};
	public policyType='';
  public errMessage = null; 
  public usageType: boolean = true;
  public selfType: boolean = false;
  public rentedType: boolean = false;
  public domestic:boolean =false;
  public dateDisable: boolean = false;
	public butDisabled: boolean = false;
	public errorCall:boolean = false;
	public errorCallBuild: boolean = false;
	public errorCallCont: boolean = false;
	public ContentTypeTrue:any;
	public ContentTypeMsg:boolean = false;

	public homeContent: boolean = false;
	public estiMated: boolean = false;
	public valueInsu: boolean = false;
	public noerrCost: boolean = false;

  public homeInput = {
    pincode:null,
    stateid: null,
    stateCode: null,
    cost: null,
    contentInsu: null,
		policyType : 1,
		pt : null,
		bpt: null,
		sacont:  null,
		hasStructure : false,
		hascontent : false,
		structure : {
			area : 0,
			costSqft : 0
			
		},
		contentTypes : [
			{ contentType : "DOMAPL",
			  displayName : "Appliances",
			  isInsured : null,
			  contentValue : null
			},
			{ contentType : "JEWEL",
			  displayName : "Jewelery and Valuables",
			  isInsured : null,
			  contentValue : null
			},
			{ contentType : "ELECEQP",
			  displayName : "Mobile Eqipment",
			  isInsured : null,
			  contentValue : null
			},
			{ contentType : "BAGG",
			  displayName : "Baggage",
			  isInsured : null,
			  contentValue : null
			},
			{ contentType : "CASH",
			  displayName : "Cash",
			  isInsured : null,
			  contentValue : null
			},
			{ contentType : "EXTEQU",
			  displayName : "External Equipment",
			  isInsured : null,
			  contentValue : null
			},
      	/*{ contentType : "ACCI",
			  displayName : "personal accidents for your employees",
			  isInsured : 0,
			  contentValue : 0
			},
      	{ contentType : "COMPO",
			  displayName : "worker compensation for your employees",
			  isInsured : 0,
			  contentValue : 0
			}*/
		]
			
	}
  constructor(private shared:SharedService,
  			  private router: Router) { }
  ngOnInit() {
		let cuskey = window.location.href.split('=')[1];
		this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
    $('#pincodeInsu').tooltip({'trigger':'focus', 'title': ''});
	}

	contentChange()
	{
		this.ContentTypeMsg = true;
	}
	contentChangeNo()
	{
		this.ContentTypeMsg = false;
	}
evaluateCost(e){
    if(e.target.value<1200 || e.target.value>5000)
      this.errMessage = " Cost of Construction should be between 1200 and 5000"; 
    else{ 
			this.errMessage ='';
			this.noerrCost = true;
		}
    
}
modalpopUp(){
    $('#estimateModoal').modal('show');
}
 estimateCostNow(){
	this.helpme.cost = this.helpme.homesq * this.helpme.constrCost;
	console.log('helpme.cost::',this.helpme.homesq);
	
  this.butDisabled = true;
 }
submitForm(homeInsu){
	console.log('costtt: are::',this.helpme.homesq);

  var input = <any> {
		structure : {
			area : 0,
			costSqft : 0
			
		}
	};
		input.rmId = sessionStorage.getItem('rmId');
		let cuskey = window.location.href.split('=')[1];

		input.customerId = cuskey; //sessionStorage.getItem("customerId");
		input.policyType = this.homeInput.policyType;
		if(this.homeInput.pt == null)
		input.contentpt = 0;
		else input.contentpt = this.homeInput.pt;
		console.log('input.contentpt:',input.contentpt);
		if(this.homeInput.bpt == null)
		input.structpt = 0;
		else input.structpt = this.homeInput.bpt;
		input.pincode = this.homeInput.pincode;
    /*this.shared.getStatePinStd(this.homeInput.pincode)
    .subscribe(
      data =>{
          this.homeInput.stateid =data.stateCode;
          this.homeInput.stateCode = data.stdcode;
      }
    );*/
    //input.stateid = this.homeInput.stateid;
    //input.cityid = this.homeInput.stateCode;
		input.productType = "Home";	
    //input.lob = "Home";
    if (this.homeInput.policyType !=3){
			this.homeInput.hasStructure = true;
			input.structure.area = this.helpme.homesq;
			console.log('helpme.cost submit::',input.structure.area);

			input.structure.costSqft = this.helpme.constrCost;
      if(this.helpme.cost != 0)
			input.sastruct = this.helpme.cost;
      else input.sastruct = this.homeInput.cost;
		}
		input.contentTotal = input.sastruct;
		if (this.homeInput.policyType !=2){
			this.homeInput.hascontent = true;
			input.sacont = this.homeInput.sacont;
			this.homeInput.contentTypes.forEach(element=>{
						var type= element.contentType;
						if(element.contentValue == null)
						element.contentValue = 0;
			      input.contentTotal = Number(input.contentTotal) + Number(element.contentValue);
			      switch (type){
			      /*case "CONT": 
			    	  input.sacont = element.contentValue;
			    	  break;*/
			      case "JEWEL": 
			    	  input.sajewel = element.contentValue;
			    	  break;
			      case "DOMAPL": 
			    	  input.sadomapl = element.contentValue;
			    	  break;
			      case "ELECEQP": 
			    	  input.saeleceqp = element.contentValue;
			    	  break;
			      case "BAGG": 
			    	  input.sabagg = element.contentValue;
			    	  break;
			      /*case "CASH": 
			    	  input.satp = element.contentValue;
			    	  break;*/
           /*case "ACCI":
              input.satp = element.contentValue;
              break;
            case "COMPO":
              input.saexteqp = element.contentValue;
							break;*/
							case "EXTEQU":
              input.satp = element.contentValue;
              break;
							
            }			      
			});
		}
  
    console.log(JSON.stringify(input));
 	let prodQuote = 'Home/'+input.productType+'/'+ btoa(JSON.stringify(input));
	this.router.navigate(['home/policypage'], { queryParams: { quotes: prodQuote}});	
}
getCitycode(code){
	this.shared.getPincode(code)
	.subscribe(data=>{
		this.homeInput.stateCode = data.stateName;
		this.homeInput.stateid = data.stateCode;
	});
}
policyTermContentvalid(e){
	this.errorCallCont = false;
		if(e.target.value<1)
		{
			this.errorCallCont = true;
			this.errMessage2="Minimum is 1"
		}
		
		else if(e.target.value>3)
		{
			this.errorCallCont = true;
			this.errMessage2="Maximum is 3"
		
		}
		else{
			this.errMessage2="";
			this.errorCallCont=false;
		}
		
}
policyTermBuildvalid(e){
	this.errorCallBuild = false;
		
	 if(e.target.value>20)
		{
			this.errorCallBuild = true;
			this.errMessage1="Maximum is 20"
		
		}
		else{
			this.errMessage1="";
			this.errorCallBuild=false;
		}
		
}

getValidPinCode(e){
	this.errMessage3 ="";
	this.errorCall = false;
	 if(e.target.value ==""){
		 this.errMessage3 ="Pin Code field cannot be blank";
	 }
			else{
		this.shared.getPincode(e.target.value)
		.subscribe(
			data =>{
					//this.homeInput.stateCode = data.stateName;
					//this.homeInput.stateid = data.stateCode;
				if(Object.keys(data).length==0){
				this.errMessage3 ="Pincode is not valid";
				this.errorCall= true;
				}
				
				else{
				 this.errMessage3="";
				 this.errorCall= false;
				}
			
			}
		);
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
