import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { accessKey, secretKey }from '../../sharedServices/config';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { skipWhile } from 'rxjs/operators';
declare var jquery:any;
declare var $
@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
  public userName = null;
  public accessKey = accessKey;
  public secretKey = secretKey;
  public firstName= null;
  public lastName= null;
  public healthInput=<any>{member:[{dob:'',gender:'',adultChild:'',relationship:''}],adultAge:[],childAge:[], Pincode:'', Tenure:'',sumInsured: '', deductibe:'',relationship:''};
  public annualIncome=[{name:'One Lakh',val:'100000'},{name:'Two Lakh',val:'200000'},{name:'Three Lakh',val:'300000'},{name:'Four Lakh',val:'400000'},{name:'Four and Half Lakh',val:'450000'},{name:'Five Lakh',val:'500000'},{name:'Five and Half Lakh',val:'550000'},{name:'Six Lakh',val:'600000'},{name:'Seven Lakh',val:'700000'},{name:'Seven and Half Lakh',val:'750000'},{name:'Eight Lakh',val:'800000'},{name:'Nine Lakh',val:'900000'},{name:'Ten Lakh',val:'1000000'},{name:'Fifteen Lakh',val:'1500000'},{name:'Tweenty Lakh',val:'2000000'},{name:'Tweenty Five Lakh',val:'2500000'},{name:'Thirty Lakh',val:'3000000'},{name:'Fifty Lakh',val:'5000000'},{name:'Sixty Lakh',val:'6000000'},{name:'1 Crore',val:'10000000'},{name:'1 Crore Fifty Lakhs',val:'15000000'}];
  public dobList=[];
	public genderList=[];
	public Relationship=[];
	public memberval=[];
	public h_member='';
	public ageLists=[];
	public memebercal={};
	public relationshipvalue=[];
	public healthObj=<any>{};
	public age:any;
	public policyType='';
	public dateDisable: boolean = false;
	public errorDob:boolean=false;
	public selfInsured:boolean=false;
	public dobOptions=[];
	public existingAmt: boolean = false;
	public dobProposer: boolean = false;
  public error: string = null;
  public errMessage: string = null;
  public errMessage2: string = null;
  public localiData=[];
  public clicked: boolean = true;
  public errorCall:boolean = false;
	public errMessage1 = null; 
	public errMessage3 = null;
	public dateOptions = <any>{};
	public adultDobOptions=<any>{};
	public childDobOptions=<any>{};
	public errorforProdType = null;
	public errorCall4: boolean = false;
	public errorDobadult: boolean = false;
	public errorDobchild: boolean = false;
	public minstratDate:any;
  public maxstratDate:any;
	public errorforMaxRegdate = <any>[];
  public errorCall3:boolean = false;
	public adultCount: number = 0;
	public childCount: number = 0;
	public errorforAdultChild = null;
	constructor(private shared:SharedService,
  			  private router: Router,
			  private alertservice: AlertService,public datepipe: DatePipe) { }

  ngOnInit() {
	this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
		this.lastName = sessionStorage.getItem('lastName');
		this.dateOptions = {
			maxDate: new Date(yearMax, monthToday, dayToday-90),
			minDate: new Date(yearMin, monthToday, dayToday)
		};
		var dateToday=new Date();
    var yearMax=dateToday.getFullYear();
    var monthToday=dateToday.getMonth();
    var dayToday=dateToday.getDate();
    var yearMin=dateToday.getFullYear();
    var newYearMin=dateToday.getFullYear();
    var newYearMax=dateToday.getFullYear();
    var newMaxMonthToday=dateToday.getMonth();
    var newdayToday = dateToday.getDate();

		this.adultDobOptions={
		  maxDate : new Date(newYearMax-18, newMaxMonthToday, newdayToday),
			minDate: new Date(newYearMin-100, monthToday, newdayToday)
     };

this.childDobOptions={
			maxDate: new Date(yearMax-0, monthToday-3, dayToday),
			minDate: new Date(yearMax-25, monthToday, dayToday)
}
		this.getRelationshipMasters();
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
	$('#pincodecritical').tooltip({'trigger':'focus', 'title': ''});

	$('#radio5 button').click(function(){
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
	});
	$('#radio6 button').click(function(){
		$('.selectedBtn').removeClass('selectedBtn');
		$(this).addClass('selectedBtn');
	});
	var dateToday = new Date();
      var yearMin = dateToday.getFullYear() - 60;
      var yearMax = dateToday.getFullYear() - 18;
      
      var monthToday = dateToday.getMonth();
      var dayToday = dateToday.getDate();
      
	this.dateOptions = <any>{
		maxDate: new Date(yearMax, monthToday, dayToday),
		minDate: new Date(yearMin, monthToday, dayToday)
};
  }
  memberDob(dob,index)
  {
    this.minstratDate = this.datepipe.transform(this.dateOptions.minDate,'yyyy-MM-dd');
    this.maxstratDate  = this.datepipe.transform(this.dateOptions.maxDate,'yyyy-MM-dd');
	console.log('minstratDate',this.minstratDate+" "+this.maxstratDate);
	if(dob < this.minstratDate || dob > this.maxstratDate)
    {
      this.errorforMaxRegdate[index] = 'Invalid date';
      this.errorCall3= true;
      console.log(this.errorforMaxRegdate);  
    }
    else{
      this.errorforMaxRegdate[index] = '';
			this.errorCall3= false;
			this.ageCount(dob, index);
      console.log(this.errorforMaxRegdate);
    }
  }

  getValidSum(e){
	var proTermInput1 = <any> {};
	proTermInput1=e.target.value%5000;
	console.log('proTermInput1',proTermInput1);
	
	 this.errorCall = false;
	 if(e.target.value<50000)
	 {
	   this.errorCall = true;
	   this.errMessage2="Minimum sum assured should be 50,000";
	 }
	
	 
	 else if(proTermInput1!='0')
	 {
	   this.errorCall = true;
	   this.errMessage2="Sum assured should be increment of 5,000";
	 }
	 else{
	   this.errMessage2="";
	   this.errorCall = false;
	 } 
	  }

	  tenureValid(e){
		
		 this.errorCall = false;
		 if(e.target.value>3)
		 {
		   this.errorCall = true;
		   this.errMessage3="Maximum Tenure is 3 yrs";
		 }
		 else if(e.target.value < 1){
			 this.errorCall = true;
			 this.errMessage3="Minimum Tenure is 1 yr";
		 }else{
		   this.errMessage3="";
		   this.errorCall = false;
		 } 
		  }
  //pincode validation
  getValidPinCode(e){
	this.errMessage ="";
	this.errorCall = false;
	 if(e.target.value =="")
	   this.errMessage ="Pincode field can not blank";
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
		  // $('#errorCall').removeClass('has-error');
		  // $('#errorCall').addClass('validity');
		  }
		
		}
	  );
	}   
 } 
  

  addMember(){
	this.healthInput.member.push({dob:'',relationship:''});
	console.log('array::',this.healthInput.member);
	this.getFFIndv(this.healthInput);
  return true;
  }  
  reset(index)
	{
		this.healthInput.member.splice(index, 1);
		this.errorCall3= false;
		this.errorforAdultChild = '';
		this.getFFIndv(this.healthInput);
	}

	//submit health form
	checkMember(member, idx){
		this.dobProposer=true;
		this.healthInput.member.forEach(member => {
			var relId = member.relationship;
			if (relId == '4' || relId == '5' || relId == '9' || relId == '12'){
				member.type = "C";
				member.adultChild="Child";
				this.dobOptions[idx] = this.childDobOptions;
			} else
			{
				member.type = "A";
				member.adultChild="Adult";
				this.dobOptions[idx] = this.adultDobOptions;
			}
			if (relId == '1'){
				this.selfInsured = true;
			}
	
			// Assign Gender
			if (relId == '3' || relId == '5' || relId == '9'  || relId == '11' || relId == '13' 
				|| relId == '14' || relId == '15'){
				member.gender = "M";
			}
			
			if (relId == '2' || relId == '4' || relId == '6' || relId == '7' || relId == '8' 
				|| relId == '10' || relId == '12'){
				member.gender = "F";
			}
		
		});
		
	}


  submitForm(healthform)
	{
						this.error="";
					this.healthInput.member.forEach(element => {
								if(element.adultChild=='Adult')
							{
								this.healthInput.adultAge.push(this.shared.calculateAge(element.dob));
							}
							else if(element.adultChild=='Child')
							{
								this.healthInput.childAge.push(this.shared.calculateAge(element.dob));
							}
					});
					//$scope.ageLists=_.concat($scope.healthInput.adultAge,$scope.healthInput.childAge);
					this.healthInput.member.forEach(item => {
						this.dobList.push(item.dob);
						this.ageLists.push(this.shared.calculateAge(item.dob))
					//	this.genderList.push(item.gender);
					})
					console.log(this.dobList.sort());
					console.log(this.ageLists.sort(function(a, b){return b-a}));
					//this.healthObj={healthFormObj:"",member:this.healthInput.member}
					this.healthObj={
							"authentication":{"accesskey": this.accessKey,"secretkey": this.secretKey},
							"doblist": this.dobList.join(),
				            "agelist": this.ageLists.join(),
				            "pincode":this.healthInput.Pincode,
				            "tenure": this.healthInput.Tenure,
				            "deductible":"",
				            "adult": this.healthInput.adultAge.length,
				            "children": this.healthInput.childAge.length,
				        	"sa": this.healthInput.sumInsured,
							"members":this.healthInput.member
				            
					}
					if(this.policyType =='enhanceExCover')
					{
						this.healthObj.deductible=this.healthInput.deductibe;
						this.healthInput.productType='TOPUP'
					}
					else
						{
						this.healthObj.deductible=0;
						this.healthInput.productType;
						}
						console.log(this.healthObj);
				/*let healthpolicyParam = {"authentication":{"accesskey":"DBS","secretkey":"DBS"},
                     "doblist":this.healthObj.healthFormObj.doblist,"agelist": this.healthObj.healthFormObj.agelist,
                     "pincode": this.healthObj.healthFormObj.pincode,"tenure": this.healthObj.healthFormObj.tenure,
                     "deductibe": this.healthObj.healthFormObj.deductible,"adult":this.healthObj.healthFormObj.adult,
                     "children": this.healthObj.healthFormObj.children, "genderlist":this.healthObj.healthFormObj.genderlist,
                      "sa":this.healthObj.healthFormObj.sa
					};		
				this.shared.getSeePolicies('Health', this.healthInput.productType, healthpolicyParam)
				.subscribe(data=>{
					if(data.result){
						this.localiData = data.result;
						console.log("DATA goes here", this.localiData);
						let prodQuote = 'Health/'+this.healthInput.productType+'/'+ btoa(JSON.stringify(data.requestParams));
						this.router.navigate(['/policypage'], { queryParams: { quotes: prodQuote}});
					}
					else {this.alertservice.error("Please fill out all the mandatory fields!");
					setTimeout(function(){
						document.location.reload();
					}, 3000);
				}
					},
					error => {
						this.alertservice.error("Something broken, try again!");
						sessionStorage.clear();
						setTimeout(function(){
							document.location.reload();
						}, 3000);
					}
				);*/
				let prodQuote = 'Health/'+this.healthInput.productType+'/'+ btoa(JSON.stringify(this.healthObj));
				this.router.navigate(['home/policypage'], { queryParams: { quotes: prodQuote}});
		}
	
	
getRelationshipMasters()
{
	this.shared.getHealthMasters().subscribe(
		data =>{
		if(data.hasOwnProperty("result"))
		{
       this.Relationship=data.result;
		}
	

	});
}
checkError(healthform)
	{
		//this.checkAdultAge();
		var child=[];
		var adult=[];
		var ok;
		this.healthInput.member.forEach(element => function(i,j){
			var memmber=i
			if(memmber.adultChild=='Adult')
				{
				adult.push('Adult');
				}
			else
				{
				child.push('Child');
				}
		})
		if(child.length==0 && adult.length!=0)
		{
			if(this.checkAdultCalAge())
			{
				console.log(this.healthInput.productType)
				if(this.healthInput.productType=='FF')
				{
					if(adult.length!=0)
						{
						   this.errMessage='';
							ok=true;
						
						}
					else
						{
						this.errMessage='Minimum 2  in floater family.';
						ok=false;
						}
					//ok=this.familyFloaterCheck();
					console.log(ok)
				}
				else
					{
					ok=true;
					}
			}
		}
		else if(child.length!=0 && adult.length==0)
		{
			if(this.checkChildCalAge())
				{
					if(adult.length==0)
					{
						
						//ok=false";
						if(this.healthInput.productType=='FF')
						{
							if(adult.length!=0)
							{
							   this.errMessage='';
								ok=true;
							
							}
						else
							{
							this.errMessage='Must have at least one Adult';	
							ok=false;
							}
						}
						else
							{
								if(adult.length!=0)
								{
								   this.errMessage='';
									ok=true;
								
								}
							else
								{
								this.errMessage='Must have at least one Adult';	
								ok=false;
								}
							/*this.errMessage=';'
							ok=true;*/
							}
					}
					else 
						{
						ok=true;
						}
					
				}
		}
		else if(child.length!=0 && adult.length!=0)
		{
			if(ok=this.checkAdultCalAge())
				{
					if(ok=this.checkChildCalAge())
						{
							
						}
				}
			console.log("adult and child")
		}
		return ok;
	}

	checkAdultCalAge()
	{
		var ok;
		var dob
		this.healthInput.member.forEach(item => function(i,j){
			this.h_member=i;
			if(this.h_member.adultChild=='Adult')
				{
					dob= this.shared.calculateAge(this.h_member.dob);
					if(dob<18)
					{
						ok=false;
						this.errMessage='Adults must be older than 18';
					}
					else
					{
						ok=true;
						this.errMessage='';
					}
				}
		});
			return ok;			
	}
  checkChildCalAge()
	{
		var ok;
		var dob;
		this.healthInput.member.forEach(element =>function(i,j){
			this.h_member=i;
			if(this.h_member.adultChild=='Child')
				{
					dob=this.shared.calculateAge(this.h_member.dob);
					if(dob<26)
					{
						ok=true;
						this.errMessage=''
						
					}
					else
					{
						
						ok=false;
						this.errMessage='Child must be less than 26';
					}
					
				}
		});
		return ok;
	}
	ageCount(dob, index) {
		var date1 = new Date();
		console.log('databitrh::',dob)
		var date2 = new Date(dob);      
			var y1 = date1.getFullYear();
			//getting current year            
			var y2 = date2.getFullYear();
			//getting dob year            
			this.age = y1 - y2;
			
			this.healthInput.member.forEach(member => {
				//var relId = member. 
			
				if (member.type =="C" && this.age>=18 )
				{
					this.memberval[index]="Child must be less than 18 years"
					this.errorDobchild=true;
					this.errorDobadult=false;
				}
				else if((member.type =="A" && this.age<18 ))
				{
					this.memberval[index]="Adult must be older than 18 years"
					this.errorDobchild=false;
					this.errorDobadult=true;
				}
				else{
					this.memberval[index]='';
					this.errorDobchild=false;
					this.errorDobadult=false;
				}
				
			});
			
		
			
			this.getAdultChild(this.healthInput.member[index].adultChild, index);
	}
	getAdultChild(member, index){
		this.errorforAdultChild = '';
		this.errorforMaxRegdate[index] = '';
		this.errorCall3= false;
		this.childCount = 0;
		this.adultCount = 0;
		this.healthInput.member.forEach(member => {
			if(member.adultChild == 'Adult')
				this.adultCount++;
			if(member.adultChild == 'Child')
				this.childCount++;	
		});
		
		if(this.adultCount >=3){
			this.errorforAdultChild = 'Maximum of 2 Adults are allowed';
			this.errorCall3= true;
		}
		if(this.childCount >=5){
			this.errorforAdultChild = 'Maximum of 4 Children are allowed';
			this.errorCall3= true;
		}

		
	}
	getFFIndv(healthInsInput){
		if(healthInsInput.productType == 'FF' && healthInsInput.member.length < 2){
			this.errorforProdType = 'Family Floater must have atleast two family members';
			this.errorCall4= true;
		} else if(healthInsInput.productType == 'INDV' && healthInsInput.member.length > 1){
			this.errorforProdType = 'Individual must have only one family member';
			this.errorCall4= true;
		} else{
			this.errorforProdType = '';
			this.errorCall4= false;
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
}
