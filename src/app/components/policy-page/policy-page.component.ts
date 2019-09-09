import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { SharedService } from '../../sharedServices/shared.service';
import { AlertService } from '../../sharedServices/alert.service';
import { IMAGE_URL } from '../../sharedServices/config';
import { tokenName } from '@angular/compiler';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SelectorMethodSignature } from '../../../../node_modules/rxjs/observable/FromEventObservable';
//import { RoundPipe } from '../../sharedServices/mathRound';
declare var jquery:any;
declare var $;
@Component({
  selector: 'app-policy-page',
  templateUrl: './policy-page.component.html',
  styleUrls: ['./policy-page.component.css']
})
export class PolicyPageComponent implements OnInit {
	public coversBrkUp = <any> [];	
  public showDeathBenifit: boolean = false;	
  public refineFilter :boolean = false;
  public sortField =null;
  public claimsAccepted:"claimsAccepted";
  public userName = null;
  public purchagePrice=null;
  public annuityAmt=null;
  public firstName= null;
  public lastName= null;
  public imagePath = IMAGE_URL;
  public policyData = [];
  public requestData = [];
  public requestParams =<any>{};
  public resultData = [];
  public allCovers = [];
  public coverOptions = [];
  public compareSelectedProd = [];
  public basicPre:number= 0;
  public goodSTax:number = 0;
  public totalPremium: number=0;
  public morePlan: boolean = false;
  public hideshowpanel:boolean = false;
  public compareProd: boolean = false;
  public checkDisble:number=2;
public requestId1 = null;
public producttype1= null;
public lob1 = null;

  public coverFetchComplete: boolean= false;
  public quoteFetchComplete: boolean= false;
  public hasAddons:boolean = false;
  public payoutlenght:boolean = false
  public isopen = true;
	public isFeature = true;
  public GSTRate = 1.18;
	public resultStopTime = 0;
	public quoteResuestId = "";
	public numResultsExpected = 0;
  public allQuotes = [];
  public reqstParams = <any>{};
  public requestparam1 = <any>{};
  public displayQuotes = [];
  public recomendations = [];
  public availableAddons =[];
  public filters=[];
  public compareViewQuotes = [];
  public limit:number = 2;
  public compare_Covers = [];
  public compareAttributes=[];
  public selectedProducts = [];
  public prjctions = [];
  public products1 = [];
  public productResult = <any>{};

  public ineachDetail = <any>[];
  public CompareArray = <any>[];
  public totalPrm = <any>{};
  public totalPayoutFour = <any>{};
  public totalPayoutEight = <any>{};
  public irrFour = <any>{};
  public irrEight = <any>{};
  public gaRatioFour = <any>{};
  public gaRatioEight = <any>{};
  public compareData= <any> {};
  public projections1= [];
  public errMessage1 = null; 
	public displayPayouts =[];
	public disPayouts = [];
	public quoteInput = <any>{};
	public serviceparam = <any>{};
	public BuyPolicy1 = <any>{};
	public quoteHealthInput = <any>{};
	public portfolioheaders = [];
	public portfolioheaders1 = [];
	public portfolioheaders2 = [];

	public resultPromise = null;
	public projrctionYear = [];
	public displayQuotes1 =[];
	public netPre: number = 0;
	public input = {
			lob : "",
			productType : "",
			needName : ""
		}
	public portfolioheaderLabels = [
		{
		   "label": "Sum Assured",
		   "value": "sa"
		 },
		 {
		   "label": "Age",
		   "value": "dob"
		 },
		 {
		   "label": "Years to pay(Pay Term)",
		   "value": "ppt"
		 },
		 {
			 "label": "Years Covered For(Policy Term)",
			 "value": "pt"
		   },
		 {
		   "label": "Smoker/Non Smoker",
		   "value": "rating"
		 }
		 
		 
	   ];

	   public portfolioheaderLabels2 = [
		{
		   "label": "Sum Assured",
		   "value": "sa"
		 },
		 {
		   "label": "Age",
		   "value": "dob"
		 },
		 {
		   "label": "Years to pay(Pay Term)",
		   "value": "ppt"
		 },
		 {
			 "label": "Years Covered For(Policy Term)",
			 "value": "pt"
		   }
		 
	   ];
	   
	   public portfolioheaderLabels1 = [
		{
		   "label": "Annual Premium",
		   "value": "ap"
		 },
		 {
		   "label": "Age",
		   "value": "dob"
		 },
		 {
			 "label": "Payment Term-Minimum(in Years)",
			 "value": "minPPT"
		   },
		   {
			"label": "Payment Term-Maximum(in Years)",
			"value": "maxPPT"
		  }
		 
	   ];	
	
	public lifeSpan: boolean = false;
	public totaPremiums = [];
	public quoteParam = <any>{};
	public termQuotes = <any>{};
	public limit1:number=2 ;
	public checkCount:number =0;
	public checkboxes:any;
	public disableCheck:boolean = false;
	gapayout4: any;
  constructor(private shared: SharedService, private alertservice: AlertService, private router: Router) { }

  ngOnInit() {
	$( document ).ready(function() {
		$( "#buttonterm1" ).trigger( "click" );
	 });
	 $( document ).ready(function() {
		$( "#buttonterm1Yield" ).trigger( "click" );
	 });

	 	
	 
	this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
		$('#exampleModal').modal('hide');
		
		
     // Hide the "view" div.
 });
		this.getthePage();
     $('#selections').click(function() {
      // When clicked, toggle the "view" div.
      $('#sPanel').slideToggle(400);
      return false;
		});
		
		$('.panel-collapse').on('show.bs.collapse', function () {
			$(this).siblings('.panel-heading').addClass('active');
		});
	
		$('.panel-collapse').on('hide.bs.collapse', function () {
			$(this).siblings('.panel-heading').addClass('active');
		});
  }
  	


  getthePage(){
	let strUrl = window.location.href.split("=")[1];
	this.input.lob = strUrl.split('%2F')[0];
	this.input.productType = strUrl.split('%2F')[1];
	let encodedData = strUrl.split('%2F')[2];
	var decodeUriData = decodeURIComponent(encodedData);
	if(encodedData.indexOf('-') < 0){
	/*if(this.input.lob=='Health'){
		this.quoteHealthInput= JSON.parse(atob(decodeUriData));*/
		//this.quoteInput=this.quoteHealthInput.healthFormObj;  
	//}else{	
	this.quoteInput = JSON.parse(atob(decodeUriData));
	//}
	if(this.input.productType!='CIL')
	{
		this.showDeathBenifit=true;
	}
	else{
		this.showDeathBenifit=false
	}

	this.populateHeader();
}else{
	$('#loader').hide();
	this.alertservice.error("Failed in content validation, Please check the url!");
  }
}
populateHeader(){
	switch(this.input.productType){
		case 'ENDW': 
					this.input.needName = "Saving Traditional";
					break;
		case 'ULIP': 
					this.input.needName = "Saving Unit Linked";
					break;
		case 'Child': 
					this.input.needName = "Child Education";
					break;
		case 'MI': 
					this.input.needName = "Regular Income";
					break;
		case 'CIL': 
					this.input.needName = "Critical Illness";
					break;
		case 'Term': 
					this.input.needName = "Protection";
					break;
		case 'Home': 
					this.input.needName = "Home Insurance";
					break;
		case 'FF': 
					this.input.needName = "Health Hospitalisation";
					break;
		case 'INDV': 
					this.input.needName = "Health Hospitalisation";
					break;			
		case 'Motor': 
					this.input.needName = "Car Insurance";
					break;
		case 'PC': 
					this.input.needName = "Car Insurance";
					break;																											
	}
	if(this.input.productType=='ENDW' ||this.input.productType=='ULIP' ||this.input.productType=='Child' ||this.input.productType=='MI')
		{
			for (var i = 0; i<this.portfolioheaderLabels1.length; i++){
				var head =<any>{};
				head.label = this.portfolioheaderLabels1[i].label;
				var value = this.portfolioheaderLabels1[i].value;
				switch (value){
				case "ap":
					head.value = '₹'+Number(this.quoteInput.ap).toLocaleString();

					break;
					
				case "dob":
				head.value= this.shared.calculateAge(this.quoteInput.dob) + 'Yrs';
				break;
				case "minPPT":
				head.value = this.quoteInput.minPPT;
				break;				
				case "maxPPT":
					head.value = this.quoteInput.maxPPT;
					break;
					
				}
				this.portfolioheaders1.push(head);
				this.portfolioheaders.push(head);
				
			}
			}

			if(this.input.productType=='CIL')
		{
			for (var i = 0; i<this.portfolioheaderLabels2.length; i++){
				var head =<any>{};
				head.label = this.portfolioheaderLabels2[i].label;
				var value = this.portfolioheaderLabels2[i].value;
				switch (value){
				case "sa":
					head.value = '₹'+Number(this.quoteInput.sa).toLocaleString();
					break;
					
				case "dob":
				head.value= this.shared.calculateAge(this.quoteInput.dob) + 'Yrs';
				break;
				case "ppt":
					head.value = this.quoteInput.ppt;
					console.log('pptt chekc:::',head.value);
					
					break;
					case "pt":
					head.value = this.quoteInput.pt;
					break;					
			}
				
				this.portfolioheaders2.push(head);
				
			}
			}
			

	if(this.input.productType=='Term')
		{
			for (var i = 0; i<this.portfolioheaderLabels.length; i++){
				var head =<any>{};
				head.label = this.portfolioheaderLabels[i].label;
				var value = this.portfolioheaderLabels[i].value;
				switch (value){
				case "sa":
					head.value = '₹'+Number(this.quoteInput.sa).toLocaleString();
					break;
					
				case "dob":
				head.value= this.shared.calculateAge(this.quoteInput.dob) + 'Yrs';
				break;
				case "ppt":
					head.value = this.quoteInput.ppt;
					console.log('pptt chekc:::',head.value);
					
					break;
					case "pt":
					head.value = this.quoteInput.pt;
					break;
						
					case "rating":
					if (this.quoteInput.rating == "S"){
						head.value = "Smoker";
					}if (this.quoteInput.rating == "NS"){
						head.value = "Non-Smoker";
					}	    				
					break;
				
			}
				//for age
				//head.value=this.quoteInput.dob.split(',').map(parseFloat);
				//this.portfolioheaders[1].value= Math.max(...arr)+' Yrs';

				this.portfolioheaders.push(head);
				
			}


			}else if(this.input.productType=='FF'||this.input.productType=='INDV')
			{
				this.portfolioheaders=[{"label":'Policy',"value":''},{"label":'Oldest Member Age',"value":''},{"label":'Sum Insured',"value":''},{"label":'Tenure',"value":''}]
				
				if(this.quoteInput.children!=0){
					this.portfolioheaders[0].value= this.quoteInput.adult+ ' adult(s) , '+this.quoteInput.children+' children(s)';	
				}
				else{
					this.portfolioheaders[0].value= this.quoteInput.adult+ 'adult(s)'
				}
				
				//console.log($scope.quoteInput)
				var arr=this.quoteInput.agelist.split(',').map(parseFloat);
				this.portfolioheaders[1].value= Math.max(...arr)+' Yrs';

				this.portfolioheaders[2].value= '₹'+Number(this.quoteInput.sa).toLocaleString();
				this.portfolioheaders[3].value=this.quoteInput.tenure+ 'Yr(s)';
				
			}else if(this.input.productType=='TOPUP')
			{
				this.portfolioheaders=[{"label":'Policy',"value":''},{"label":'Oldest Member Age',"value":''},{"label":'Sum Insured',"value":''},{"label":'Deductible',"value":''},{"label":'Tenure',"value":''}]
				
				if(this.quoteInput.children!=0){
					this.portfolioheaders[0].value= this.quoteInput.adult+ ' adult(s) , '+ this.quoteInput.children+' children(s)';	
				}
				else{
					this.portfolioheaders[0].value= this.quoteInput.adult+ 'adult(s)'
				}
				
				//console.log($scope.quoteInput)
				var arr= this.quoteInput.agelist.split(',').map(parseFloat);
				this.portfolioheaders[1].value= Math.max(...arr)+' Yrs';

				this.portfolioheaders[2].value= '₹'+Number(this.quoteInput.sa).toLocaleString();
				this.portfolioheaders[3].value= this.quoteInput.deductible;
				this.portfolioheaders[4].value= this.quoteInput.tenure+ 'Yr(s)';
				
			}else if(this.input.lob=='Travel') {

				 this.portfolioheaders=[{"label":'Members',"value":''},{"label":'Oldest Member Age',"value":''},{"label":'Sum Insured',"value":''},{"label":'Zone',"value":''},{"label":'Days of Travel',"value":''}];
					if(this.quoteInput.children!=0){
						this.portfolioheaders[0].value= this.quoteInput.adult+ ' adult(s) , '+ this.quoteInput.children+' children(s)';	
					}
					else{
						this.portfolioheaders[0].value= this.quoteInput.adult+ ' adult(s)'
					}
				 	var arr= this.quoteInput.agelist.split(',').map(parseFloat);
				 	this.portfolioheaders[1].value= Math.max(...arr)+' Yrs';
					// Make it in dollar
					this.portfolioheaders[2].value= '₹'+Number(this.quoteInput.sa).toLocaleString(); 
					switch (this.quoteInput.zone) {
					case "1":
						this.portfolioheaders[3].value = "WorldWide";
						break;
					case "2":
						this.portfolioheaders[3].value = "WorldWide Excluding US and Canada";
						break;
					case "3":
						this.portfolioheaders[3].value = "Asia Excluding Japan";
						break;
					case "4":
						this.portfolioheaders[3].value = "Europe";
						break;
						
					}
					this.portfolioheaders[4].value=this.quoteInput.days;
			}else if(this.input.productType=='PC' || this.input.productType=='Motor'){
				this.portfolioheaders=[{"label":'MOTOR',"value":''},{"label":'RTO',"value":''},{"label":'Applicable NCB',"value":''}, {"label":"Type of Business", "value":""}]
				this.portfolioheaders[0].value= this.quoteInput.vehicleName;
				this.portfolioheaders[1].value= this.quoteInput.rto;
				this.portfolioheaders[2].value = "0%";
				this.portfolioheaders[3].value = this.quoteInput.typeOfBusiness;
				if (this.quoteInput.typeOfBusiness == "Rollover") {
					this.portfolioheaders[2].value= this.getApplicableNCB(this.quoteInput.prevncb, this.quoteInput.claim) + "%";
				}
				
			}else if(this.input.productType=='Home'){
				this.portfolioheaders=[{"label":'Building SI',"value":''},{"label":'Total Content SI',"value":''},{"label":'Policy Type',"value":''},{"label":'Tenure',"value":''}]
				this.portfolioheaders[0].value= '₹'+this.quoteInput.sastruct.toLocaleString();
				this.portfolioheaders[1].value= '₹'+this.quoteInput.contentTotal.toLocaleString();

				switch (this.quoteInput.policyType){
				case '3':
					 this.portfolioheaders[2].value = "Content Only";
					 this.portfolioheaders[3].value = 'Content: '+ this.quoteInput.contentpt+ ' Years';
					 break;
				case '2':
					 this.portfolioheaders[2].value = "Building Only";
					 this.portfolioheaders[3].value = 'Building: '+this.quoteInput.structpt+ ' Years';
					 break;
				case '1':
				 	 this.portfolioheaders[2].value = "Building and Content";
					 this.portfolioheaders[3].value = 'Building: '+this.quoteInput.structpt+'/ Content: '+ this.quoteInput.contentpt + ' Years';
					
					 break;
				}
				
			}
			

		this.getCoversToSelect(this.input.lob, this.input.productType); 
}
  getPolicyPage(quoteInput){	
		
     this.shared.getSeePolicies(this.input.lob, this.input.productType, quoteInput)
		.subscribe(data=>{
       $('#loader').hide();
	   this.quoteFetchComplete = true;
	   

	   this.allQuotes = data.result;
	   
	   this.serviceparam=data.result.serviceParameters;
	   this.claimsAccepted=this.serviceparam["claimsAccepted"];
	   console.log('data claimsAccepted::',this.claimsAccepted);

       //this.getCoversToSelect(this.input.lob, this.input.productType);
		//	if(this.input.lob == "Health"){
       var agelist = data.requestParams.agelist.split(',');
       data.requestParams["maxAge"] = Math.max(...agelist);
		//	}
	   this.requestData = data.requestParams;
	   console.log('requestParams',this.requestData);
	   
			this.getDisplayFilters(this.input.lob, this.input.productType);
     },
        error => {
		$('#loader').hide();
		if(error.status == 401 )
      	{
        let rtnUrl = window.location.href.split("=")[1];
        this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
     	}else{
			this.alertservice.error("Something broken, try again!");
	  	}
      }
     );
  }

	getApplicableNCB (currNCB, claim){
			var ncb = 0;
			if (claim == "N"){
				var numNcb = Number(currNCB);
				switch (numNcb){
				case 0:
					ncb = 20;
					break;
				case 20:
					ncb = 25;
					break;
				case 25:
					ncb = 35;
					break;
				case 35:
					ncb = 45;
					break;
				case 45:
				case 50:
					ncb = 50;
					break;
				default:
					ncb = 0;
					break;
				}
			}
			return ncb;	
		}

  getCoversToSelect(lob, productType){
    this.shared.getChooseCovers(lob, productType)
     .subscribe(data =>{
       if (data.hasOwnProperty("result")){
        this.coverFetchComplete = true;
        this.allCovers = data.result;
        var filterExp = [{display: "Y", mandatory : "N" }];
        var covers = this.allCovers.filter(item => filterExp.some(f => (f.display == item.display && f.mandatory == item.mandatory)));
      	covers.forEach(element => {
		element.selected = false;
		element.display = false;
		this.coverOptions.push(element);
      }); 
			this.coverFetchComplete = true;
      }
       console.log("Covers goes here", this.coverOptions);
			// if (this.input.lob != "Health"){
						//this.submitQuoteRequest(this.quoteInput);
						this.getDisplayFilters(this.input.lob, this.input.productType);
	    				//this.resultStopTime = new Date().getTime() + 50000;
	    				//this.resultPromise = setInterval(this.getResults(),5000, 10, false);
					
	    			/*} else
	    			{
	    				this.getPolicyPage(this.quoteInput);
	    				
	    			}*/
        //this.getDisplayFilters();
     },
	 error => {
	 $('#loader').hide();
	 if(error.status == 401 )
	   {
		let rtnUrl = window.location.href.split("=")[1];
		this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
	  }else{
		this.alertservice.error("Something broken, try again!");
	   }
   });

}
	submitQuoteRequest(quoteInput){
		this.shared.submitAllQuotesRequest(quoteInput, this.input.lob, this.input.productType)
		.subscribe(
			res => {
					if (!res.hasOwnProperty("error")){
	    			this.quoteResuestId =res.requestId;
	    			this.numResultsExpected =res.numResultsExpected;
					//console.log("Number of results Expected: " + $scope.numResultsExpected);
					this.resultStopTime = new Date().getTime() + 50000;
	    			this.resultPromise = setInterval(() => {
                        this.getResults(); 
                      }, 5000);
	    			if (this.numResultsExpected == 0){
	    				this.quoteFetchComplete = true;
	    			}
						//this.getResults();
	    		}else{
					$('#loader').hide();
					this.alertservice.error(res.error);
					this.errMessage1 = res.error;
					console.log("error errMessage1", this.errMessage1);
				}	    		
	    	},
			error => {
			$('#loader').hide();
			if(error.status == 401 )
			  {
			   let rtnUrl = window.location.href.split("=")[1];
			   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
			 }else{
			   this.alertservice.error("Something broken, try again!");
			  }
		  }	 
		);
	}

	getResults(){
			this.shared.gettheResults(this.quoteResuestId)
			.subscribe(
				data =>{
						if (data.hasOwnProperty("result")){
							 $('#loader').hide();
							
		    			if (data.result.length > this.allQuotes.length) {
							this.allQuotes=data.result;
							//this.reqstParams = data.reqstParams;
							//console.log('');
							
							this.reqstParams = data.requestParams;
		    				console.log("this.reqstParams",this.reqstParams);
			    			//console.log("Returned Results: " + $scope.allQuotes.length);
							this.purchagePrice=data.requestParams.purchasePrice;
							this.annuityAmt=data.requestParams.annuity;
			    			if (this.allQuotes.length>0) {
			    				this.quoteFetchComplete = true;
			    			}
			    				this.processCoverOptions();
		    			}
		    			
		    			var time = new Date().getTime()
		    			if ((this.allQuotes.length >= this.numResultsExpected)
		    				|| (this.resultStopTime < time)){
		    				clearInterval(this.resultPromise);
		    				this.quoteFetchComplete = true;
							}
							 //this.getDisplayFilters(this.input.lob, this.input.productType);
					}
					this.requestparam1 = data.requestParams;
					this.shared.requestId = data.requestParams.requestId;
					this.shared.productType = data.requestParams.productType;
					console.log('this.shared.productType',this.shared.productType);
					
					this.shared.lob = data.requestParams.lob;
				},
				error => {
				$('#loader').hide();
				if(error.status == 401 )
				  {
				   let rtnUrl = window.location.href.split("=")[1];
				   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
				 }else{
				   this.alertservice.error("Something broken, try again!");
				  }
			  }
			);

	}
  getDisplayFilters(lob, productType){
    this.shared.getFilters(lob, productType)
      .subscribe(data =>{
		if(this.lifeSpan != true)
		{
          if (data.hasOwnProperty("result")){
			  var filters = [];
			  
              data.result.forEach(element => {
              var filter = element;
						filter.options = [];
						filter.selectedId = "A";
						var options  = JSON.parse(filter.displayText);
              options.forEach(element => {
                var option = <any>{};
                for(var k in element){
	    						option.id = k;
								option.value= element[k];
	    					}
							filter.options.push(option);

			   });
			   
		filter.options.push({"id":"A", "value":"All"});

			   filters.push(filter);
			   console.log('filters::',filter);
			   
            });
			this.filters = filters;
			 if(this.filters.length>0)
			{
				this.refineFilter = true;
			}
			else{
				this.refineFilter = false;
			}
		  } }
		  else if (this.lifeSpan = true)

		  {
			if (data.hasOwnProperty("result")){
				var filters = [];
				
				data.result.forEach(element => {
				var filter = element;
						  filter.options = [];
						  filter.selectedId = "A";
						  var options  = JSON.parse(filter.displayText);
				options.forEach(element => {
				  var option = <any>{};
				  for(var k in element){
								  option.id = k;
								  option.value= element[k];
							  }
							  filter.options.push(option);
  
				 });
				 
		  filter.options.push({"id":"A", "value":"All"});
  
				 filters.push(filter);
				 console.log('filters::',filter);
  
			  });
			  this.filters = filters;
			   if(this.filters.length>0)
			{
				this.refineFilter = true;
			}
			else{
				this.refineFilter = false;
			}
			}
		  }
		  this.submitQuoteRequest(this.quoteInput);
      },
	error => {
		$('#loader').hide();
		if(error.status == 401 )
		{
			let rtnUrl = window.location.href.split("=")[1];
			this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
		}else{
			this.alertservice.error("Something broken, try again!");
		}
	}
	  );
  }
  
  processCoverOptions(){
    if(this.quoteFetchComplete && this.coverFetchComplete){
		this.displayQuotes = [];
		 this.recomendations = [];
		 this.availableAddons = [];		
   var selectedCovers = this.getSelectedCovers();
   this.shared.addonsCover = selectedCovers;
   console.log('selectedCovers:::',selectedCovers);
   this.allQuotes.forEach(element => {
	 var quote = element;
	 var displayPremium = quote.totalPremium;
				 var stdCovers = this.getStandardQuoteCovers(quote);
				 var addonCovers = this.getAddonQuoteCovers(quote);

	   quote.display = true;
				 for (var i = 0; i<selectedCovers.length; i++){
				 quote.display = false;
					 for (var j = 0; j<stdCovers.length; j++){
						 if (selectedCovers[i] == stdCovers[j]){
							 quote.display = true;
							 console.log('selected::::',selectedCovers[i] == stdCovers[j]);

							 break;
						 }
						 
					 }

					 if (!quote.display){ // Check in addon  covers
						 for (var j = 0; j< addonCovers.length; j++){
							 if (selectedCovers[i] == addonCovers[j]){
								 quote.display = true;
								 displayPremium = Number(displayPremium) + this.getAddonPremium(quote, selectedCovers[i]);
								 console.log('addonCovers::::',selectedCovers[i] == addonCovers[j]);

								}
						 }
					 }
		 if (!quote.display){ // exit if even one selected cover is absent
						 break;
					 } 
				 }
	   if (quote.display){
		   
					 // Get new list of Addon Covers
					 for (var j=0; j< stdCovers.length; j++) {
						if(this.availableAddons.indexOf(stdCovers[j])<0){
							this.availableAddons.push(stdCovers[j]);
						} 
					}
					 for (var j=0; j<addonCovers.length; j++) {
						 if(this.availableAddons.indexOf(addonCovers[j]) <0){
							 this.availableAddons.push(addonCovers[j]);
						
						 }
						 
					 }
					 quote.displayPremium = displayPremium;
					 if(quote.serviceParameters.claimsAccepted!=null)
					 {
						quote.claimsAccepted=quote.serviceParameters.claimsAccepted;

					 }
					 if(quote.irr4!=null)
					 {
						quote.irr4=quote.irr4;

					 }
					 if(quote.minimumdeathbenefit!=null)
					 {
						quote.minimumdeathbenefit=quote.minimumdeathbenefit;

					 }
					 quote.key = quote.productId;
					 if (quote.hasOwnProperty("planId")){
						 if(quote.productType == "ENDW" || quote.productType == "ULIP" || quote.productType == "CIL" || quote.productType == "MI")
						 {quote.key = quote.key + "" + quote.planId + "^" + quote.pt + quote.ppt ;
						 
					 }
						 else 
						 {
							 quote.key = quote.key + "" + quote.planId;
							 
						 }
						 
					 }
					 quote.selectedForCompare = false;
					 this.displayQuotes.push(quote);
				 }
   });
   // Apply Refine filters
		 this.filters.forEach(element => {
	 var filter = element;
	 if(this.lifeSpan != true)
	 {
					  if (filter.selectedId !="A"){ // "A" means select all and differentiate the policy to get Filter.
						  var filterExp = [{}];
						  filterExp[filter.key] = filter.selectedId;
						  this.displayQuotes = this.displayQuotes.filter(item => item[filter.key] == filter.selectedId);						
					  }}
	 
		

	 if(this.lifeSpan == true)
	 {
					  if (filter.selectedId !="A"){ // "A" means select all and differentiate the policy to get Filter.
						  var filterExp = [{}];
						  filterExp[filter.key] = filter.selectedId;
						  var filterKey = filter.key;
						  
						  switch(filterKey){
							case "growthFilter":
							
								if(filterExp[filter.key]=='4')
								{
							this.displayQuotes = this.displayQuotes.filter(item => item.irr4);	
							
								}
								else if(filterExp[filter.key]=='8')
								{
									this.displayQuotes = this.displayQuotes.filter(item => item.irr8);	
							
								}
						
											

								break;

							case "ageFilter":
							var displayQuotes1 =[];
							var displayQuotes2 =[];

								filter.options.forEach(item => {
									switch(filter.selectedId){
										case '1': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity < 45);
													break;
										case '2': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity >= 45 && element.ageAtMaturity < 50 );
													break;
										case '3': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity >= 50 && element.ageAtMaturity < 55 );
													break;
										case '4': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity >= 55 && element.ageAtMaturity < 60 );
													break;
										case '5': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity >= 60 && element.ageAtMaturity < 65 );
													break;
										case '6': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity >= 65 && element.ageAtMaturity < 70 );
													break;
										case '7': this.displayQuotes = this.displayQuotes.filter(element => element.ageAtMaturity >= 70);
													break;																	

								} 
								});
								
								break;	
							case "ageAtMaturity":
							var ageMatirity :any;
							var displayQuotes1 =[];
							var displayQuotes2 =[];

							this.displayQuotes.forEach(element=>
							{
								ageMatirity= element.ageAtMaturity;
								
								if((ageMatirity+2  || ageMatirity-2) == filter.selectedId)
								{
									displayQuotes1.push(element);
									this.displayQuotes=displayQuotes1;
									
								}
								
							})
								break;
							case "isGuaranteed":
							console.log('filterExp[filter.key] = filter.selectedId::',filterExp[filter.key]);
							this.displayQuotes = this.displayQuotes.filter(item => item[filter.key] == filter.selectedId);						
							break;
							
							case "payoutPeriodFilter":
							var payoutPeriodFilter :any;
							var payoutPeriodFilter1 :any;
							var payoutPeriodFilter2 :any;


							var displayQuotes2 =[];
							var displayQuotes3 =[];
							var displayQuotes4 =[];
							this.displayQuotes.forEach(element=>
								{
									payoutPeriodFilter= element.payoutPeriodFilter;
									if(payoutPeriodFilter>0  || payoutPeriodFilter<15)
									{
										if(filter.selectedId=='0-15')
									{
									
										payoutPeriodFilter="0-15";
										payoutPeriodFilter=filter.selectedId;
										displayQuotes2.push(element);
										this.displayQuotes=displayQuotes2;						
									}
								}

								})
								this.displayQuotes.forEach(element=>
									{
										payoutPeriodFilter1= element.payoutPeriodFilter;
										if(payoutPeriodFilter1>=15 || payoutPeriodFilter<20)
										{
											if(filter.selectedId=='15-20')
										{										
											payoutPeriodFilter="15-20";
											payoutPeriodFilter=filter.selectedId;
											displayQuotes3.push(element);
											this.displayQuotes=displayQuotes3;

							
										}
									}
									})
									this.displayQuotes.forEach(element=>
										{
											payoutPeriodFilter2= element.payoutPeriodFilter;
											if(payoutPeriodFilter2>=20  || payoutPeriodFilter2<=99)
											{
												if(filter.selectedId=='20-99')
											{											
												payoutPeriodFilter2="20-99";
												payoutPeriodFilter2=filter.selectedId;
												displayQuotes4.push(element);
												this.displayQuotes=displayQuotes4;								
											}
										}
		
										})									
							break;							
							}						 
					  }}			  
   });

   // Check if coveroption is to be displayed
			 for (var i=0; i<this.coverOptions.length; i++){
				 var coverId = this.coverOptions[i].coverid;
				 if (this.isCoverAvailable(coverId)){
					 this.coverOptions[i].display = true;
					 
				 }
			 }
	 var disFilter = [{"display":true}];
	 this.coverOptions = this.coverOptions.filter(item => disFilter.some(f => f.display == item.display));
	 if (this.coverOptions.length>0){
				 this.hasAddons = true;
			 }else
			 {
				 this.hasAddons = false;
			 }
			 // Sort the display quotes 
			 
				 this.displayQuotes = this.displayQuotes;
				// this.sortField = "displayPremium";
				 var sortOrder="D";
				 if(this.sortField=="displayPremium")
				 {
					 sortOrder="A";
					 
				 }
				 else if(this.sortField=="claimsAccepted")
				 {
					 sortOrder="D";
				 }
				 else if(this.sortField=="irr8")
				 {
					 sortOrder="D";
				 }
				 else if(this.sortField=="minimumdeathbenefit")
				 {
					 sortOrder="D";
				 }
				 
				
				 this.displayQuotes.sort((a: any, b: any) => {
					if (Number(a[this.sortField]) < Number(b[this.sortField])) {
						if (sortOrder == "A"){
							return -1;
						}
					  else{
						  return 1;
					  }
					} else if (Number(a[this.sortField]) > Number(b[this.sortField])) {
						if (sortOrder == "A"){
							return 1;
						}
					  else{
						  return -1;
					  }
					 
					} 
					return 0;
				  });
			  this.displayQuotes.forEach(element=>{
				  element.hasOwnProperty("displayPremium")
				  {
					  console.log('sorting displayPremium::',element.displayPremium);
					  
				  }
			  })
			  this.displayQuotes.forEach(element=>{
				  var serviceparam1=element.serviceParameters;
				serviceparam1.hasOwnProperty("claimsAccepted")
				{
					console.log('sorting claimsAccepted::',element.claimsAccepted);

				}
			})
			this.displayQuotes.forEach(element=>{
			  element.hasOwnProperty("irr8")
			  {
				console.log('sorting irr::',element.irr8);
 
			  }
		  })
		  this.displayQuotes.forEach(element=>{
			element.hasOwnProperty("minimumdeathbenefit")
			{
				console.log('sorting minimumdeathbenefit::',element.minimumdeathbenefit);

			}
		})
		  					 this.createRecommendations();
 		}
  }

  
sortPremium(arr,sortField,sortOrder)
{
	arr.sort((a: any, b: any) => {
		if (a[sortField] < b[sortField]) {
			if (sortOrder == "A"){
				return -1;
			}
		  else{
			  return 1;
		  }
		} else if (a[sortField] > b[sortField]) {
			if (sortOrder == "A"){
				return 1;
			}
		  else{
			  return -1;
		  }
		 
		} 
		return 0;
	  });
return arr;

}

sortingFunction(sortField)
{
var sortOrder="D";
this.sortField=sortField;
this.processCoverOptions();
}

  createRecommendations(){
    var insurers = [];
		var reco = {};
    console.log("DISPLAY Quote goes here", this.displayQuotes);
    this.displayQuotes.forEach(element => {
      var quote = element;
				var id = quote.insurerId;
				quote.selectedForCompare = false;
				this.compareViewQuotes=[];

        if (!this.itemExists(insurers, id)){
					
					insurers.push(id);
					var item = {};
					item['insurerId'] = quote.insurerId;
					item['currentIndex'] = 0;
					item['index'] = 0;
					item['productCount'] = 0;
					
					reco[id] = item;
					reco[id].quotes = [];
					
				}
				reco[id].productCount = reco[id].productCount + 1;
				// display name should be product name plus plan name
				if (quote.hasOwnProperty("planName")){
					quote.displayName = quote.productName + " - " + quote.planName;
				}else
				{
					quote.displayName = quote.productName;
				}
				if(this.input.lob == "Life" && this.input.productType !='Term' && this.input.productType != "CIL" && this.input.productType !='ANN'){
					this.lifeSpan = true;
					quote.totaPremiums = quote.total_ap;
				
				  }		
				reco[id].quotes.push(quote);
	});
	
      insurers.forEach(element => {
        var id = element;
				//console.log(value)
			  this.recomendations.push(reco[id]);
	  });
	  
  }

  isCoverAvailable(coverId) {
			var available = false;
			for (var i=0; i<this.availableAddons.length; i++){
				if (this.availableAddons[i] == coverId){
					available = true;
					break;
				}
			}
			
			return available;
			
		}

  	getStandardQuoteCovers(quote){	
			var stdFilter = [{coverType : "S"}];
      var data = quote.covers.filter(item => stdFilter.some(f => f.coverType == item.coverType));
			var stdCovers = [];
      data.forEach(element => {
        stdCovers.push(element.coverId);
      });
			return stdCovers;
		}

    getAddonQuoteCovers(quote){
			// Only those addon covers where premium is present should be counted as add-on.
			var addCovers = [];
			if (quote.hasOwnProperty("premiumBreakup")){
				if(quote.premiumBreakup.hasOwnProperty('addon')){
        quote.premiumBreakup.addon.forEach(element => {
          addCovers.push(element.coverId);
        });
				}
			}
			return addCovers;
		}

     getAddonPremium(quote, coverid){
			var premium = 0;
			if (quote.hasOwnProperty("premiumbreakup")){
				for (var j =0; j <quote.premiumbreakup.addon.length; j++){
					var cover = quote.premiumbreakup.addon[j];
					if (cover.coverId == coverid){
						//premium =  Math.round(this.GSTRate*Number(cover.premium));
						premium =  Number(cover.premium);
						break;
					}
				}
				
			}
			
			if (quote.hasOwnProperty("premiumBreakup")){
				for (var j =0; j <quote.premiumBreakup.addon.length; j++){
					var cover = quote.premiumBreakup.addon[j];
					if (cover.coverId == coverid){
						//premium =  Math.round(this.GSTRate*Number(cover.premium));
						premium =  Number(cover.premium);
						break;
					}
				}
			}
			return premium;
		}

  itemExists(array, item){
			var exists= false;
			for (var i = 0; i< array.length; i++){
				if (array[i] == item){
					exists= true;
					break;
				}
			}
			
			return exists;
		}
    
		premiumBreakUp(data, key){
			var selectedProduct= this.getQuotesForCompare(key);
			var selectedCovers = this.getSelectedCovers();
			this.basicPre = data.netPremium;
			this.netPre = data.netPremium;
			this.goodSTax = data.serviceTax;
			this.totalPremium = data.totalPremium;
			this.coversBrkUp = <any>[];	
			data.premiumBreakup.addon.forEach(element => {
				if (this.isCoverSelected(element.coverId, selectedCovers)) { 
					this.netPre =  Number(this.netPre) + Number(element.netPremium);
					this.totalPremium = Number(this.totalPremium) + Number(element.premium);
					this.goodSTax = Number(this.totalPremium) - Number(this.netPre);
					this.coversBrkUp.push(element);
				}
			});
			$('#premiumBrupmodal').modal('show');
		  }
		isCoverSelected(coverId, selectedCovers) {
			var selected = false;
			for(var i=0; i<selectedCovers.length; i++){
				if(selectedCovers[i] == coverId){
					selected = true;
				}
			}
			return selected;
		}
  getQuotesForCompare(productkey){
    var filterExp =<any> {selected : true, coverid : ""};
			var selectedProduct =<any>{};
			for (var i= 0; i<this.displayQuotes.length; i++) {
				if (this.displayQuotes[i].key == productkey){
					selectedProduct = this.displayQuotes[i];
					console.log('displayQuotes,,,,',selectedProduct);
					var covers = [];
					selectedProduct.covers.forEach(element => {
            if (element.coverType == "S"){
							covers.push(element);
														
						}else
						{
							// Check if the addon cover is selected.
							filterExp.coverid = element.coverId;
							
							var data = this.coverOptions.filter(item =>item.coverId == filterExp.coverid);
							
							if (data.length>0){
								covers.push(element);
							}
						}
          });
					selectedProduct.covers = covers;
					break;
				}
			}
			return selectedProduct;
  }

  getSelectedCovers(){

			var filterExp = [{selected : true}];
			var data = this.coverOptions.filter(item => item.selected == true);
			var selectedCovers = [];
      data.forEach(element => {
        selectedCovers.push(element.coverid);
	  });
	  
			return selectedCovers;
			
		}

  ModifySum(){
    document.getElementById("modsa").style.display = "inline-block";
    document.getElementById("modsatxt").style.display = "none";
    $('modsa').focus();
    document.getElementById("modify").innerHTML ="Click to see policies";
    

  }

  DisplayMore(index){
    if(!this.morePlan){
    $('#more'+index).toggle(600);
    this.morePlan = true;
    document.getElementById('hidenShow'+index).innerHTML = "Hide Plans";
    }
    else{
    $('#more'+index).toggle(600);
    this.morePlan = false;
    document.getElementById('hidenShow'+index).innerHTML = "More Plans";
    }
  }

  hideshowSelection(){
    if(!this.hideshowpanel){
     document.getElementById("selections").innerHTML ="Hide My Selections";
    this.hideshowpanel = true;
    }
    else {
    document.getElementById("selections").innerHTML ="Show My Selections";
    this.hideshowpanel = false;
    }
  }

  addCompare(key, selected){
	var maxChecks = 3;


	

	if(selected==true) {
				if ( this.compareViewQuotes.length < 4) {
					for (var i = 0; i <this.displayQuotes.length ; i++) {
						if (this.displayQuotes[i].key == key) {
							//console.log($scope.displayQuotes[i]);
							this.compareViewQuotes.push(this.displayQuotes[i]);
							console.log('select for comparee:::',this.compareViewQuotes);
							this.products1 = this.compareViewQuotes ;
							console.log('inside product array::',this.products1);   
   
										
						}
						
						/*if(this.compareViewQuotes.length> this.limit1)
						{
							this.disableCheck = true;
							console.log('disabel',this.disableCheck);
						}
						else{
							this.disableCheck = false;
							console.log('enablee',this.disableCheck);
							
						}*/
						}
						this.checkCount = this.compareViewQuotes.length;
							 
						console.log('checkCount',this.checkCount);
					 
						if (this.checkCount > maxChecks) {
							this.disableCheck = true;
							$('input[name=chkOrder]:checkbox').not(":checked").attr('disabled', true);
							console.log('disabled true');
							alert('You can Compare only upto'+" "+maxChecks+" "+"Products at a time.")
							
						} else {
							$('input[name=chkOrder]:checkbox').attr("disabled", false);
							this.disableCheck = false;
							console.log('disabled false');
					 
						}
				
						
							
						 
				} else 
				{
					for (var i = 0; i < this.displayQuotes.length; i++) {
				        if (this.displayQuotes[i].key== key) 
				        {
							this.displayQuotes[i].selectedForCompare =false;

				        }
					}
				}
							
			}
			else if(selected==false)
			{
				for (var i = 0; i < this.compareViewQuotes.length ; i++) {
					
			        if (this.compareViewQuotes[i].key== key) 
			        {
						this.compareViewQuotes.splice(i, 1);

			        }
				}
				
			}
      if(this.compareViewQuotes.length > 1 && this.compareViewQuotes.length <= 3)
	  this.compareProd = true;
	  else
	  {
		this.compareProd = false;
		//alert("Maximum Possible Comparisons should be 3 plans at one time.")
	  }
      
  }
  emailSending()
  {
	
	let rmId = sessionStorage.getItem("rmId"); 
	let strUrl = window.location.href.split("=")[1];
	let encodedData = strUrl.split('%2F')[2];
	let decodeUriData = decodeURIComponent(encodedData);	
	let cusData = JSON.parse(atob(decodeUriData));
	this.shared.loadCusmerDetails(rmId, cusData.customerId)
	.subscribe(data =>{
	  console.log("LOAD CUSTOMER", data);
	  if(data.error)
	  {
		  this.alertservice.error(data.error);
		  console.log('error in LOAD CUSTOMER',data);
		  
	  } else {
	  let customerId = data.result.customerId;
	  let customerName = data.result.firstName + " " + data.result.lastName;
	  let customerEmail = data.result.email;
	this.shared.getEmailService(rmId, customerId,customerName,customerEmail,this.shared.requestId,this.shared.productType,this.shared.lob,this.reqstParams,this.compareViewQuotes)
  	.subscribe(data =>{
	if(data.error)
	  {
		  this.alertservice.error(data.error);
		  console.log('error',data);
		  
	  }
	  else{
		$('#emailModal').modal('show');
		console.log('Email sent', data);

	  }
  });
	}
});
  }
  emailSending1()
  {
	let products2 = [];
	products2.push(this.ineachDetail);
	let rmId = sessionStorage.getItem("rmId"); 
	let strUrl = window.location.href.split("=")[1];
	let encodedData = strUrl.split('%2F')[2];
	let decodeUriData = decodeURIComponent(encodedData);	
	let cusData = JSON.parse(atob(decodeUriData));
	this.shared.loadCusmerDetails(rmId, cusData.customerId)
	.subscribe(data =>{
	  console.log("LOAD CUSTOMER", data);
	  if(data.error)
	  {
		  this.alertservice.error(data.error);
		  console.log('error in LOAD CUSTOMER',data);
		  
	  } else {
	  let customerId = data.result.customerId;
	  let customerName = data.result.firstName + " " + data.result.lastName;
	  let customerEmail = data.result.email;
	  this.shared.getEmailService(rmId, customerId,customerName,customerEmail,this.shared.requestId,this.shared.productType,this.shared.lob,this.reqstParams,products2)
  	  .subscribe(data =>{
	  if(data.error)
	  {
		this.alertservice.error(data.error);
		  console.log('error',data);
		  
	  }
	  else{
		$('#emailModal').modal('show');
		console.log('data service', data);

	  }
	
   });
	}
 });
  }
  comparePolicy(){	
			// Key Helps Identify the quote Selected. Retrieve and send to Modal window
			this.requestparam1=this.requestparam1;
			
	  this.compareSelectedProd = [];
	  this.compareAttributes = [];
			for (var j= 0; j<this.compareViewQuotes.length; j++){
				var item = this.compareViewQuotes[j];
				var pushToCompare = this.getQuotesForCompare(item.key)
				this.compareSelectedProd.push(pushToCompare);
		this.selectedProducts = this.compareSelectedProd;
		console.log('selectedProducts:::',this.selectedProducts);
		
        $('#compareProdModal').modal('show');

			}
      this.compareData = {
              coverDisplay : [],
              attributeDisplay : [],
			  premiums : [],
			  serviceParams: []
	    };
         // get cover and attributekeys to compare on.
      this.selectedProducts.forEach(product => {
        // get a list of covers
			this.compareData.premiums.push(product.displayPremium); 
        product.covers.forEach(cover => {
          if (!this.isCoverAvailableinCmp(cover.coverId)){
					var item = <any>{};
					item.name = cover.coverName;
					item.id = cover.coverId;
					this.compare_Covers.push(item);
					console.log('coversLLL::',this.compare_Covers);
					
				}
        });
        product.attributes.forEach(attribute => {
            if (!this.isAttributeAvailable(Object.keys(attribute)[0])){
						var item = <any>{};
						item.id = Object.keys(attribute);
            var AttName = (item.id).toString();
					  item.name = AttName.replace(/_/g, " ");
						this.compareAttributes.push(item);
						//console.log('compareAttributes::',this.compareAttributes);

					}
		});
		//for serving parameters display on compare of products
		this.compareData.serviceParams.push(product.serviceParameters);
		
	  });
	  //console.log('this.compareData.serviceParams',this.compareData.serviceParams);
	  

		
      // create the compare data arrays
      for (var i=0; i<this.compare_Covers.length; i++){
			var display = <any>{};
			display.cover = this.compare_Covers[i];
			display.coverData = [];
			for (var j = 0; j<this.selectedProducts.length; j++){
				var productKey = this.selectedProducts[j].key;

				var getCoverProd = this.getCover(productKey, this.compare_Covers[i].id)
				display.coverData.push(getCoverProd);
				
			}
			this.compareData.coverDisplay.push(display);
			console.log('covers::',this.compareData.coverDisplay);
			
		}

    for (var i=0; i<this.compareAttributes.length; i++){
			var display = <any>{};
			display.attribute = this.compareAttributes[i];
			
			display.attributeData = [];
			for (var j = 0; j<this.selectedProducts.length; j++){
				var productKey = this.selectedProducts[j].key;
				
				var getAttProd = this.getAttribute(productKey, this.compareAttributes[i].id)
				display.attributeData.push(getAttProd);

			}
			this.compareData.attributeDisplay.push(display);
			console.log('artributes:::::',this.compareData.attributeDisplay);
			

		}

	if(this.lifeSpan==true)
	{		
		
				var maxLength =0;
		for(var i=0; i<this.selectedProducts.length; i++)
	{
		this.displayPayouts = [];
		this.disPayouts = [];
		var product = this.selectedProducts[i];
		if (product.projections.length > maxLength) {
			maxLength = product.projections.length;
		};
	}
	console.log('maxlenght::',maxLength);
	for (var k=0; k<maxLength; k++){
		var  hasPayout:boolean = false;
		var payouts =<any>[];
		for(var i=0; i<this.selectedProducts.length; i++){
			var payout=<any>{};
			
			var projections =<any>{};
			projections = this.selectedProducts[i].projections;
			if (k< projections.length){					
				payout = this.selectedProducts[i].projections[k] ;
				//payout.year = k+1;
			}
			if(Number(payout.totalpayout8 > 0)){
				hasPayout = true;
			}
			if (!this.itemExists(this.disPayouts, payout.year)){
				payout.yearShow = 'Y';
				this.disPayouts.push(payout.year);
				//this.disPayouts.push(payout);
			} else {
				payout.yearShow = null;
			}
			payouts.push(payout);
		}
		

		if (hasPayout == true){	
				this.displayPayouts.push(payouts);
			
		}
		
		console.log('displayPayouts:',this.displayPayouts);
		
	}
  }
  if(this.selectedProducts.length == 3)
		{
			this.payoutlenght = true;
			console.log('lenght:::',this.selectedProducts.length+" "+this.payoutlenght);
			
		}
		else{
			this.payoutlenght = false;
			console.log('lenght:::',this.selectedProducts.length+" "+this.payoutlenght);

		}
}

yearExists(array, item){
	var exists= false;
	for (var i = 0; i< array.length; i++){
		if (array[i] == item){
			exists= true;
			break;
		}
	}
	
	return exists;
}
  

  getAttribute(productKey, attrId){
	var attribute = <any> {"exists" : false};
	for (var i = 0; i<this.selectedProducts.length; i++){
		var product = this.selectedProducts[i];
		if (product.key == productKey){
			for (var j = 0; j<product.attributes.length; j++){
				if (product.attributes[j][attrId]){
					attribute.name = attrId;
					attribute.value = product.attributes[j][attrId];
					attribute.exists = true;
				}
			}
		}

	} 
	//console.log('attribute',attribute);

	return attribute;
	}

  getCover(productKey, coverId){
		var cover;
		for (var i = 0; i<this.selectedProducts.length; i++){
			var product = this.selectedProducts[i];
			if (product.key == productKey){
				for (var j = 0; j<product.covers.length; j++){
					if (product.covers[j].coverId == coverId){
						cover = product.covers[j];
						// refactor limits
						if(!cover.coverLimits.hasOwnProperty('Maximum Claim Amount')){
						var coverLimit = {};
						Array.prototype.forEach.call(cover.coverLimits, function(limit, keyl){
							var limitText = "";
							if (limit.hasOwnProperty("period")){
								var periodText = limit.period;
								switch(limit.period){
								case "AOY":
									periodText = "In a Policy Year";
									break;
								case "AOH":
									periodText = "Per Hospitalization";
									break;
								case "AOH":
									periodText = "Per Claim";
									break;
								}
								limitText = periodText + ": ";								
							}
							
							limitText = limitText + limit.limitValue;
							
							if (limit.hasOwnProperty("cond")){
								limitText = limitText + "( " + limit.cond + " ) ";								
							}
							limit.value = limitText;
							
							if (!coverLimit.hasOwnProperty(limit.sublimit)){
								coverLimit[limit.sublimit] = [];
							}
							coverLimit[limit.sublimit].push(limit);
						});					
						cover.coverLimits = coverLimit;
						cover.exists = true;
					}
					}
				}
			}
		}
		
		return cover;
	}

   isCoverAvailableinCmp(coverId) {
		var available = false;
		for (var i=0; i<this.compare_Covers.length; i++){
			if (this.compare_Covers[i].id == coverId){
				available = true;
				break;
			}
		}
		return available;
	}

	
  public isAttributeAvailable(id) {
		var available = false;

		for (var i=0; i<this.compareAttributes.length; i++){
			if (this.compareAttributes[i].id == id){
				available = true;
				break;
			}
		}
		return available;
	}
	public isProjectionAvailable(id) {
		var availablePrj = false;

		for (var i=0; i<this.projrctionYear.length; i++){
			if (this.projrctionYear[i].id == id){
				availablePrj = true;
				break;
			}
		}
		return availablePrj;
	}

 productDetail(key){
      this.ineachDetail = this.getQuotesForCompare(key);
      var attributes = [];
		this.CompareArray = [];	  
		this.ineachDetail.attributes.forEach(element => {
      var item = <any> {};
			item.name = Object.keys(element);
      item.value = element[item.name];
        this.CompareArray.push(item);
		  });
		  
      console.log("ATTRIBUTES",);
     this.ineachDetail.covers.forEach(cover =>{
	if(!cover.coverLimits.hasOwnProperty('Maximum Claim Amount')){	 
       var coverLimit = {};
   	Array.prototype.forEach.call(cover.coverLimits, limit=>{
          var limitText = "";
			if (limit.hasOwnProperty("period")){
				var periodText = limit.period;
				switch(limit.period){
				case "AOY":
					periodText = "In a Policy Year";
					break;
				case "AOH":
					periodText = "Per Hospitalization";
					break;
				case "AOH":
					periodText = "Per Claim";
					break;
				}
				limitText = periodText + ": ";								
			}
			limitText = limitText + limit.limitValue;
			

			
			// get Type of Value;
			
			if (limit.subLimit == "Maximum Claims Amount" 
			&& (limit.limitType == "Value" || limit.SubLimit =="Formula")
			){
				limit.inrSymbol = "Y";
			}
			
			
			
			if (limit.hasOwnProperty("cond")){
				limitText = limitText + "( " + limit.cond + " ) ";								
			}
			limit.value = limitText;
			
			if (!coverLimit.hasOwnProperty(limit.sublimit)){
				coverLimit[limit.sublimit] = [];
			}
			coverLimit[limit.sublimit].push(limit);

       });
	cover.coverLimits = coverLimit;
		}
	});
 this.serviceparam=this.ineachDetail.serviceParameters;
 this.BuyPolicy1=this.ineachDetail.quotes;
 console.log('inchdeatail:::',this.serviceparam.claimsRejected*100);
	$('#productDetails').modal('show');
  }

  printPdf() {
	var doc = new jsPDF();
	
     html2canvas(document.getElementById('printPdf1')).then(function(canvas){
		var imgData = canvas.toDataURL("image/jpeg",1.0);
		var imgWidth = 210; 
		var pageHeight = 295;  
		var imgHeight = canvas.height * imgWidth / canvas.width;
		var heightLeft = imgHeight;
		var position = 0;
	  doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
	   heightLeft -= pageHeight;
	  while (heightLeft >= 0) {
		  position = heightLeft - imgHeight;
		  doc.addPage();
		  doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
		  heightLeft -= pageHeight;
		}
		doc.save('ProductDetail.pdf');
	console.log('ProductDetaildownloaded::');
	
});
	

html2canvas(document.getElementById('comparePdf')).then(function(canvas){
	var imgData = canvas.toDataURL("image/jpeg",1.0);
	var imgWidth = 210; 
	var pageHeight = 295;  
	var imgHeight = canvas.height * imgWidth / canvas.width;
	var heightLeft = imgHeight;
	var position = 0;
  doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
   heightLeft -= pageHeight;
  while (heightLeft >= 0) {
	  position = heightLeft - imgHeight;
	  doc.addPage();
	  doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
	  heightLeft -= pageHeight;
	}
	doc.save('ComparePolicy.pdf');
console.log('downloaded::');

});

}
  
selectedOptions(e){
	var selectedId = e.target.value;
	if(this.quoteFetchComplete && this.coverFetchComplete){
		 this.displayQuotes = [];
		this.recomendations = [];
		this.availableAddons = [];

		var selectedCovers = this.getSelectedCovers();
		console.log(selectedCovers);
		this.allQuotes.forEach(element => {
			var quote = element;
			var displayPremium = quote.totalPremium;
				var stdCovers = this.getStandardQuoteCovers(quote);
				var addonCovers = this.getAddonQuoteCovers(quote);

				quote.display = true;
				for (var i = 0; i<selectedCovers.length; i++){
					quote.display = false;
					for (var j = 0; j<stdCovers.length; j++){
						if (selectedCovers[i] == stdCovers[j]){
							quote.display = true;
							break;
						}
					}

					// If found in std cover then no need to add cover Premium
					if (!quote.display){ // Check in addon  covers
						for (var j = 0; j<addonCovers.length; j++){
							if (selectedCovers[i] == addonCovers[j]){
								quote.display = true;
								displayPremium = Number(displayPremium) + this.getAddonPremium(quote, selectedCovers[i]);
							}
						}
					}
				if (!quote.display){ // exit if even one selected cover is absent
						break;
					} 
				}
				if (quote.display){
					// Get new list of Addon Covers
				
					for (var j=0; j< addonCovers.length; j++) {
						if(this.availableAddons.indexOf(addonCovers[j])<0){
							this.availableAddons.push(addonCovers[j]);
						} 
					}
					
					quote.displayPremium = displayPremium;
					quote.key = quote.productId;
					if (quote.hasOwnProperty("planId")){
						quote.key = quote.key + "^" + quote.planId;
					}
					quote.selectedForCompare = false;
					this.displayQuotes.push(quote);
				}
		});
		// Apply Refine filters
		
		this.filters.forEach(element => {
			var filter = element;
			filter.selectedId = selectedId;
			if(filter.lob == "Life" && filter.productType !="Term" && filter.productType !="CIL"){
				if(filter.selectedId !="0" && filter.selectedId !="B" && filter.selectedId !="8"){
					switch(filter.key){
						case 'garFilter': 	if(filter.selectedId =="N")
											this.displayQuotes= this.displayQuotes.filter(item =>item.ga_ratio8 !='100')
											else this.displayQuotes= this.displayQuotes.filter(item =>item.ga_ratio8 =='100')
											break;
																					
					}
				}else this.displayQuotes = this.allQuotes;
			}else{
				if (filter.selectedId !="A"){ // "A" means select all
					var filterExp = <any> {};
					filterExp['key'] = filter.selectedId;
					this.displayQuotes = this.displayQuotes.filter(item => filterExp['key']  == item.ClaimsLoading);
				} else{
					this.displayQuotes = this.allQuotes;
				}
			}
		});
		// Check if coveroption is to be displayed
			for (var i=0; i<this.coverOptions.length; i++){
				var coverId = this.coverOptions[i].coverid;
				if (this.isCoverAvailable(coverId)){
					this.coverOptions[i].display = true;
				}
			}
			var disFilter = {"display":true};
			this.coverOptions = this.coverOptions.filter(item => (disFilter.display == item.display));
			if (this.coverOptions.length>0){
				this.hasAddons = true;
			}else
			{
				this.hasAddons = false;
			}
			// Sort the display quotes 
			this.displayQuotes = this.displayQuotes;
			  
			  
			this.createRecommendations();
	}

}
termNCond(quoteTermProposal){
	this.termQuotes = quoteTermProposal;
	$('#termsQuoteModal').modal('show');
}
agreeTC(agree){
    if( typeof(agree) != 'undefined')
    {
      if(agree = 'agree')
     this.fillProposal(this.termQuotes);
    }
   }
   
fillProposal(quoteProposal){
	$(document).ready(function(){
		$(this).scrollTop(0);
	});
	$('#loader').show();
	$('#productDetails').modal('hide');

	this.quoteParam = quoteProposal;
	var params = quoteProposal;
	delete params.attributes;
	delete params.covers;
	delete params.summaryDisplays;
	params.productType = this.input.productType;
	params.lob = this.input.lob;
	params.productId = quoteProposal.productId;
	if (quoteProposal.hasOwnProperty("planId")){
		params.planId = quoteProposal.planId;
	}
	params.addc = this.getSelectedCovers();
	var url = "";
	
	switch (this.input.productType){
	case 'Term':
		params.requestParams=this.quoteInput;
		break;
	case 'INDV':
	case 'FF':
	case 'TOPUP':
			params.requestParams=this.quoteInput;
			params.requestParams.members = this.quoteInput.member;
			break;
	case 'PC':
			params.requestParams=this.quoteInput;
			params.requestParams.currNcb= this.getApplicableNCB(this.quoteInput.prevncb, this.quoteInput.claim);
		break;
	case 'Home':
		params.requestParams=this.quoteInput;
		break;
	case 'LTS':
	case 'AMT':
		params.requestParams= this.quoteInput;
		break;
	}
	//var input = JSON.stringify(params);
	params.requestParams = this.reqstParams;
	this.shared.appParams = params;
	//this.getAppInput(params.productId);//for production uncomment
	this.shared.CreateProposal(params, params.productId)
	.subscribe(
		data=>{
			if (!data.hasOwnProperty("error")){
				this.getAppInput(data);
			}else{

			}
		},
	error => {
		$('#loader').hide();
		if(error.status == 401)
		  {
		   let rtnUrl = window.location.href.split("=")[1];
		   this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
		 }else{
		   this.alertservice.error("Something broken, try again!");
		  }
	  }
	);
	
}


getAppInput(resultUrl){
if(resultUrl == '' || resultUrl == undefined || resultUrl == null){
	resultUrl = this.shared.appParams.productId;
}
var productNo = this.shared.appParams.insurerId;	
var formUrl = "";
if(productNo == '110' && this.input.productType == 'ANN' && this.shared.appParams.productId.includes("110N150"))
		 formUrl = "aiaOfflinePurhase";
else if(productNo == '109' && this.input.productType == 'Term' && this.shared.appParams.productId.includes("109N121"))
		 formUrl = "bsliOfflinePurhase";
	else if(productNo == '109' && this.input.productType == 'Term')
		 formUrl = "bsliLifeProposal";
		 //formUrl = "bsliOfflinePurhase";
	else if(productNo == '110' && this.input.productType == 'Term')
		 formUrl = "aiaLifeProposal";
		 //formUrl = "aiaOfflinePurhase";
	else if(productNo == '102' && this.input.productType == 'FF')
		 formUrl = "royalSHealthProposal";
		 //formUrl = "offlinePurhase";
	else if(productNo == '102' && this.input.productType == 'INDV')
		 formUrl = "royalSHealthProposal";
		 //formUrl = "offlinePurhase";	 	
	else if(productNo == '102' && this.input.productType == 'PC')
		 formUrl = "royalSundaramCarProposal";
		 //formUrl = "offlinePurhase"; 
	else if(productNo == '103' && this.input.productType == 'PC')
		 formUrl = "rgiCarProposal";
	else if(productNo == '103' && this.input.productType == 'FF') 
		 formUrl = "rgiHealthProposal";	 
	else if(productNo == '106' && this.input.productType == 'PC')
		 formUrl = "itgiCarProposal";	
	else if(productNo == '108' && this.input.productType == 'PC')
		 formUrl = "tataCarProposal";
	else if(productNo == '125' && this.input.productType == 'FF')
		 formUrl = "hdfcHealthProposal";
	else if(productNo == '125' && this.input.productType == 'PC')  
		 formUrl = "hdfcCarProposal"; 
	else if(productNo == '129' && this.input.productType == 'FF')  
		 formUrl = "starHealthProposal";
	else if(productNo == '131' && this.input.productType == 'FF') 
		 formUrl = "apolloHealthProposal"; 
	else if(productNo == '132' && this.input.productType == 'PC') 
		 formUrl = "fgCarProposal"; 
	else if(productNo == '113' && this.input.productType == 'FF') 
		 formUrl = "bajajHealthProposal";
	else if(productNo == '132' && this.input.productType == 'FF') 
		 formUrl = "fgHealthProposal";	 
	else if(productNo == '134' && this.input.productType == 'PC')
		 formUrl = "sompoCarProposal"; 
	else if(productNo == '134' && this.input.productType == 'FF')	
		 formUrl = "sompoHealthProposal"; 
	else if(productNo == '139' && this.input.productType == 'PC')
		 formUrl = "axaCarProposal";	
	else if(productNo == '102' && this.input.productType == 'Home')	
		 formUrl = "royalSHomeProposal"; 
		 //formUrl = "offlinePurhase";
	else if(productNo == '148' && this.input.productType == 'FF')
		 formUrl = "religareHealthProposal";
	else if(productNo == '151' && this.input.productType == 'FF')	
		 formUrl = "cignaHealthProposal"; 	
	else if(productNo == '122' && this.input.productType == 'Term')
		 formUrl = "avivaLifeApplication";
	else if(productNo == '110' && this.input.productType == 'ENDW')
		 formUrl = "tataSavingTradApplication";	 
	else if(productNo == '110' && this.input.productType == 'ULIP')
		 formUrl = "tataUlipApplication";	
	else if(productNo == '109' && this.input.productType == 'MI')
		 formUrl = "bsliRegularApplication";
	else if(productNo == '110' && this.input.productType == 'MI')
		 formUrl = "tataRegularApplication";
	else if(productNo == '109' && this.input.productType == 'ULIP')
		 formUrl = "bsliUlipApplication";	 	 		  	 	   
	else if(productNo == '122' && this.input.productType == 'MI')
		 formUrl = "avivaRegularApplication";	
	else if(productNo == '122' && this.input.productType == 'ENDW')
		 formUrl = "avivaSavingTradApplication";
	else if(productNo == '122' && this.input.productType == 'CIL')
		 formUrl = "avivaCriticalIllApplication";	
	else if(productNo == '110' && this.input.productType == 'CIL')
		 formUrl = "tataCriticalIllApplication";
	else if(productNo == '109' && this.input.productType == 'CIL')
		 formUrl = "bsliCriticalIllApplication";
	else if(productNo == '109' && this.input.productType == 'ENDW')
		 formUrl = "bsliSavingTradApplication";	 	 	  
  	else if(productNo == '109' && this.input.productType == 'Child')
		 formUrl = "bsliChildEduApplication";
	else if(productNo == '110' && this.input.productType == 'Child')
		 formUrl = "tataChildEduApplication";
	else if(productNo == '122' && this.input.productType == 'Child')
		 formUrl = "avivaChildEduApplication";	
		  	 
	this.router.navigate(['home/'+formUrl], { queryParams: { proposalKeys: resultUrl}});
    $('#loader').hide();

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
			
			
		  },
		error => {
		  $('#loader').hide();
		  if(error.status == 401 )
			{
			 let rtnUrl = window.location.href.split("=")[1];
			 this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/policypage?quotes='+rtnUrl }});
		   }else{
			 this.alertservice.error("Something broken, try again!");
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

userSignout(){
this.router.navigate(['home/login']);
sessionStorage.clear();

}	  
}
