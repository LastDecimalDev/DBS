import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { SharedService } from '../../sharedServices/shared.service';
declare var $ :any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public userName = null;
  public displayReason:boolean = false ;
  public termInput = <any>{};
  public firstName= null;
  public lastName= null;
  public proData = <any> [];
  public imgUrl = [];
  public prodDetails= <any>{};
  public results = [];
  userlist: any;
  public ReasonForContinue:boolean=false;
  public consent:boolean = false;
  public reasontext:boolean = false;

  
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.userName = atob(sessionStorage.getItem('user'));
    this.firstName= sessionStorage.getItem('fisrtName');
    this.lastName = sessionStorage.getItem('lastName');
     $(document).ready(function() {
        $('#exampleModal').modal('hide');
     // Hide the "view" div.
 });
    this.loadProduct();
    $('.contentmain1').hide();

  }

  isChecked(e)
  {
   if ($(e.target).prop("checked") )
   {
    this.consent = true;
console.log('truee');

   }
   else
   { this.consent = false;
    console.log('false');

   }
 
  }

  
myFunction(e) {
console.log('ress',e.target.value)
if(e.target.value.length>4)
{
  this.reasontext = true;
  console.log('true');
}
else{
  this.reasontext = false;
  console.log('false');

}
/*var reasonText = (<HTMLInputElement>document.getElementById('reasonText')).value;

console.log('reasonText:::',reasonText);
if (reasonText === "" && reasonText.length < 4) {
  var element = <HTMLInputElement> document.getElementById("send");
element.disabled = true;
console.log('element:::',element.disabled);


} else {
  var element = <HTMLInputElement> document.getElementById("send");
  element.disabled = false;
    }*/

}
  

loadProduct(){
  if(sessionStorage.getItem("rmId")){
    let strUrl = window.location.href.split("=")[1];
    let decodeUriData = decodeURIComponent(strUrl);
    let customerId=sessionStorage.getItem('customerId');
    let rmId=sessionStorage.getItem('rmId');
    let monthlyExpense= sessionStorage.getItem("monthlyExpense");
    let disposableIncome= sessionStorage.getItem("disposableIncome");

    var finalData = atob(decodeUriData);

    let answers=finalData;
    this.shared.getProduct()
        .subscribe(
          data =>{
              this.proData = data.products;
              console.log('finalData product',this.proData);
              this.shared.getProductRatings(answers,customerId,rmId,monthlyExpense,disposableIncome)
             .subscribe(
               res=>{
                    this.getTextandRAting(res);
                    $('#loader').hide();
                    $('.contentmain1').show();

             },
             error => {
              $('#loader').hide();
               if(error.status == 401)
               {
               let rtnUrl = window.location.href.split("=")[1];
               this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/product?answerKey='+rtnUrl }});
      
               }
       });

        });
      }
}
getTextandRAting(data){
  console.log('dataaa::',data);
  
    var data1 =<any> {};
   data1= data.result.result.goals;
   console.log('data11',data1);
   
   var data2 =data1["goalsOutput"];

   
    console.log("RATINGS", data2);


    var dataLength = Object.keys(data2).length;
    for(var i = 0; i < dataLength; i++) {
      
      switch(Object.keys(data2)[i]){
        case 'Protection': this.proData[4].ratings = data2[Object.keys(data2)[i]];
                            break;
        case 'Child-Education': this.proData[5].ratings = data2[Object.keys(data2)[i]];
                            break;
       case 'Health-Hospitalization': this.proData[0].ratings = data2[Object.keys(data2)[i]];
                            break;
       case 'Retirement': this.proData[2].ratings = data2[Object.keys(data2)[i]];
                            break;
       case 'Savings': this.proData[3].ratings = data2[Object.keys(data2)[i]];
                            break;
      case 'Protection_Text': this.proData[4].text = data2[Object.keys(data2)[i]];
                            break;
      case 'Child-Education_Text': this.proData[5].text = data2[Object.keys(data2)[i]];
                            break;  
       case 'Health-Hospitalization_Text': this.proData[0].text = data2[Object.keys(data2)[i]];
                            break; 
     case 'Retirement_Text': this.proData[2].text = data2[Object.keys(data2)[i]];
                            break; 
       case 'Savings_Text': this.proData[3].text = data2[Object.keys(data2)[i]];
                            break; 
      case 'Home_Text': this.proData[7].text = data2[Object.keys(data2)[i]];
                            break; 
       case 'Home': this.proData[7].ratings = data2[Object.keys(data2)[i]];
                            break;                       
       case 'Health-CI': this.proData[1].ratings = data2[Object.keys(data2)[i]];
                            break; 
       case 'Health-CI_Text': this.proData[1].text = data2[Object.keys(data2)[i]];
                            break; 
      case 'Motor-PC_Text': this.proData[8].text = data2[Object.keys(data2)[i]];
                            break; 
       case 'Motor-PC': this.proData[8].ratings = data2[Object.keys(data2)[i]];
                            break; 
      case 'Ulip_Text': this.proData[6].text = data2[Object.keys(data2)[i]];
                            break; 
       case 'Ulip': this.proData[6].ratings = data2[Object.keys(data2)[i]];
                            break;                                               
                                                                                                                                                                                                                                                                                           
      }
    } 

    
   this.putTheRatings(this.proData);
}

putTheRatings(proData){
  var imagePath = '../../../assets/images/';
    for(var i=0; i<proData.length; i++){
      switch(proData[i].ratings){

        case '0': this.proData[i].imageRateTag = imagePath+'ICONGrey.png';
                    break;
        case '1': this.proData[i].imageRateTag = imagePath+'ICONYellow.svg';
                    break;
        case '2': this.proData[i].imageRateTag = imagePath+'important_new.png';
                    break;
        case '3': this.proData[i].imageRateTag = imagePath+'ICONGreen.png';
                    break;                                   
      }
      if(proData[i].ratings==='0')
      {
        this.proData[i].img_url=proData[i].img_url_cross;

      }
      else if(proData[i].ratings== null){
        this.proData[i].img_url=proData[i].img_url_cross;

      }
      else{
        this.proData[i].img_url;
      }
     
    }

    proData.sort((a: any, b: any) => {
      if (a.ratings > b.ratings) {
        return -1;
      } else if (a.ratings < b.ratings) {
        return 1;
      } else {
        return 0;
      }
    });
    

}
getDetails(e, index){
  this.prodDetails.prodName = this.proData[index].name;
    this.prodDetails.prodImg = this.proData[index].img_url;
    this.prodDetails.text = this.proData[index].text;
    console.log('prodDetails',this.prodDetails.text);
    
    if(this.proData[index].ratings == '0')
    {
      this.ReasonForContinue = true;
    }
    else this.ReasonForContinue = false;
    $('#detailModal').modal('show');

   
}


gotoProdDetails(){
  $('#detailModal').modal('hide');
  let cusKey = sessionStorage.getItem('customerId');
  switch(this.prodDetails.prodName){
        case "Health Hospitalisation":
                this.router.navigate(['home/health-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Critical Illness":
                this.router.navigate(['home/criticalill-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Regular Income":
              this.router.navigate(['home/regularIncome-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Protection":
                this.router.navigate(['home/protection-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Child Education":
              this.router.navigate(['home/childEdu-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Saving Unit Linked":
                this.router.navigate(['home/savingsULink-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Home Insurance":
                this.router.navigate(['home/homeinsu-details'], { queryParams: { customerKey: cusKey}});
                break;
        case "Saving Traditional":
                this.router.navigate(['home/savingTrad-details'], { queryParams: { customerKey: cusKey}});
                break;
         case "Car Insurance":
                this.router.navigate(['home/carinsu-details'], { queryParams: { customerKey: cusKey}});
                break;      
        case "Annuity Plan":            
                this.router.navigate(['home/annuity-plan'], { queryParams: { customerKey: cusKey}});
                break; 
              }
              var termInput1 = <any>{};
              termInput1=this.termInput.addlData;
              console.log('addlDataaddlData::',termInput1);
              

}userSignout(){
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
      
      
    },
    error => {
     $('#loader').hide();
      if(error.status == 401)
      {
        let rtnUrl = window.location.href.split("=")[1];
        this.router.navigate(['home/login'], { queryParams: { returnUrl:'/home/product?answerKey='+rtnUrl }});
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
