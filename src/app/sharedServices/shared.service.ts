import { Injectable,  } from '@angular/core';
import { Headers, Http, HttpModule, Response,RequestOptions, Request, RequestMethod} from '@angular/http';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BASE_URL, QUOTE_URL, accessKey, secretKey, DATA_URL } from './config';


@Injectable()
export class SharedService {
  public goalsdata= '';
  public requestId = null;
  public productType = null;
  public lob = null;
  public addonsCover = [];
  public products = {};
  public appParams = <any> {};
  public base_url = BASE_URL;
  public quote_url = QUOTE_URL;
  //public data_url = DATA_URL;
  public data_url = BASE_URL;
  public accessKey = accessKey;
  public secretKey = secretKey;
  //public authKeys = {"authentication":{"accesskey":"DBS","secretkey":"DBS"}};
  public authKeys = {"authentication":{"accesskey": this.accessKey,"secretkey": this.secretKey}};
  public headers: Headers = new Headers({'Content-Type': 'application/json'});
  public formHeader: Headers = new Headers({'Content-Type': undefined});
  constructor(public http: Http, private router:Router, private httpForm: HttpClient) { }

 getLoggedIn(userEmail, passwd){
  userEmail = atob(userEmail);
  passwd = atob(passwd);
  let getuserParam = {'userid': userEmail, 'pwd': passwd};
  let getlogUrl: string = `${this.base_url}/login`;
  return this.http.post(getlogUrl, getuserParam)
  .map(res => res.json());
}
getCustomer(rmId){
  let getCusUrl: string = `${this.base_url}/getAllCustomersforRM`;
  let getRMParam = {'rmId': rmId};
  return this.http.post(getCusUrl, getRMParam)
  .map(res => res.json());
}

  getchangePwd(email, oldPwd, newPwd){
    let getuserParam = {'userid':email, 'oldpwd':oldPwd, 'newpwd': newPwd};
    let getChgUrl: string = `${this.base_url}/changePassword`;
    return this.http.post(getChgUrl, getuserParam)
    .map(res => res.json());
    
  }
  getCustomerAdded(fname, lname, cEmail, RmId, age, gender){
    let custmrParam = {"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "firstName":fname,"lastName": lname,"age": age,"gender": gender,"rmId": RmId,"email":cEmail};
    let getAddedUrl: string = `${this.base_url}/addCustomer`;
    return this.http.post(getAddedUrl, custmrParam)
    .map(res => res.json());
  }
  getQuestionlist(){
     let getCusUrl = '../../assets/resource/oneminuteplan.json';
    return this.http.get(getCusUrl)
    .map(res => res.json());
  }
  getProduct(){
    let getProdUrl = '../../assets/resource/productList.json';
    return this.http.get(getProdUrl)
    .map(res => res.json());
  }
  
  getProductRatings(answers,customerId,rmId,monthlyExpense,disposableIncome){
  
    let input={"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "answers":answers,"customerId":customerId,"rmId":rmId,"monthlyExpense":monthlyExpense,"disposableIncome":disposableIncome};
    let getProdUrl : string = `${this.data_url}/createCustomerGoals`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(getProdUrl, input,options)
    .map(res => res.json());
  }

  getSeePolicies(lob, productType, policyParam){
   // let policyParam = {"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, param};
    let input={url:'',data:policyParam};
    input.url = `/quote/allquotes/${lob}/${productType}`;
    let getpolicyUrl : string = `${this.data_url}`;
    return this.http.post(getpolicyUrl, input, {headers: this.headers})
   //return this.http.get(getpolicyUrl)
    .map(res => res.json());                 
  }
 
  getFilters(lob, productType){
    //let getpolicyUrl : string = '../../assets/resource/covers.json';
    let input={url:'',data: this.authKeys};
    input.url = `/master/getFilters/${lob}/${productType}`;
    let getFilterUrl : string = `${this.data_url}`;
    return this.http.post(getFilterUrl, input)
    //return this.http.get(getpolicyUrl)
    .map(res => res.json());
  }
   getChooseCovers(lob, productType){
    //let getpolicyUrl : string = '../../assets/resource/chooseCovers.json';
    let input={url:'',data: this.authKeys};
    input.url= `/master/getCoversToSelect/${lob}/${productType}`;
    let getCoverUrl : string = `${this.data_url}`;
    return this.http.post(getCoverUrl, input)
   //return this.http.get(getpolicyUrl)
    .map(res => res.json());
  }

  submitAllQuotesRequest(quoteInput, lob, productType){
    let input={url:'',data: quoteInput};
    input.url = `/quote/submitAllQuotesRequest/${lob}/${productType}`;
    let getAllQuotesUrl : string = `${this.data_url}`;
    return this.http.post(getAllQuotesUrl, input)
    .map(res => res.json());
  }
  gettheResults(quoteRequestId){
    //let getpolicyUrl : string = '../../assets/resource/regularIncome.json';
    let input={url:'',data: this.authKeys};
    input.url = `/quote/getResults/${quoteRequestId}`;
    let getResultUrl : string = `${this.data_url}`;
    return this.http.post(getResultUrl, input)
    //return this.http.get(getpolicyUrl)
    .map(res => res.json());
  }
  getPincode(pincode){
      let input={url:'',data: this.authKeys};
      input.url = `/master/getStatePinStd/${pincode}`;
      let getPinUrl : string = `${this.data_url}`;
      return this.http.post(getPinUrl, input)
      .map(res=> res.json());
  }
  calculateAge(dob){
        var dt = new Date(dob);
			  var dateToday = new Date();
			  var currYear = dateToday.getFullYear();
			  var currMonth = dateToday.getMonth();
		    var currDay = dateToday.getDate();
			
			  var dobYear = dt.getFullYear();
			  var dobMonth = dt.getMonth();
			  var dobDay = dt.getDate();
			  var age = currYear - dobYear;
			  if ((currMonth < dobMonth) || (currMonth == dobMonth && currDay<dobDay)){
				  age--;
			  }
			  return age;
  }

 getCarMake(){
    let input={url:'',data: this.authKeys};
    input.url = `/master/makes/`;
    let getCarMakeUrl : string = `${this.data_url}`;
    return this.http.post(getCarMakeUrl, input)
    .map(res => res.json());
 } 

 getCarModel(carMakerId){
    let input={url:'',data: this.authKeys};
    input.url = `/master/models/${carMakerId}`;
    let getCarModelUrl : string = `${this.data_url}`;
    return this.http.post(getCarModelUrl, input)
    .map(res => res.json());
 } 

 getCarVariant(carMakeId, carModelId){
   let input={url:'',data: this.authKeys};
    input.url = `/master/variants/${carMakeId}/${carModelId}`;
    let getCarVarUrl : string = `${this.data_url}`;
    return this.http.post(getCarVarUrl, input)
    .map(res => res.json());
 }

 getCarRto(){
    let input={url:'',data: this.authKeys};
    input.url = `/master/rto`;
    let getCarRtoUrl : string = `${this.data_url}`;
    return this.http.post(getCarRtoUrl, input)
    .map(res => res.json());
 }

  getDepreciationRate(age)
	    {
       var depRate =1;
	    	if (age <= 0.5) {
				depRate = 0.95;
			} else if (age <= 1) {
				depRate = 0.85;

			} else if (age <= 2) {
				depRate = 0.80;

			} else if (age <= 3) {
				depRate = 0.70;

			} else if (age <= 4) {
				depRate = 0.60;

			} else if (age <= 5) {
				depRate = 0.50;

			} else if (age <= 6) {
				depRate = 0.475;

			} else if (age <= 7) {
				depRate = 0.4512;

			} else if (age <= 8) {
				depRate = 0.4073;

			} else {
				depRate = 0.3869;

			}

			return depRate;

	    }
  strToDate(date){
        if (date && date != "" && typeof(date) != "undefined") {
          
          var parts = date.substring(0,10).split("-");
          var newDate = new Date(date.substring(0,10));
          
        }
        return newDate;
      }
  getCountryCode(){
    let countryPath: string = '../../assets/resource/full_country_data.json';
    return this.http.get(countryPath)
    .map(res => res.json());
  }
  getStatePinStd(pincode){
    let input={url:'',data: this.authKeys};
    input.url = `/master/getStatePinStd/${pincode}`;
    let getStateStdUrl : string = `${this.data_url}`;
    return this.http.post(getStateStdUrl, input)
    .map(res => res.json());
  }   
  
  CreateProposal(inputData, productID){
    let input={url:'',data: inputData};
    input.url = `/submitProposal/createProposal/${productID}`;
    let proposalUrl : string = `${this.data_url}`;
    return this.http.post(proposalUrl, input)
    .map(res => res.text());
  }
  getMedicalQns(productId, type){
    let input={url:'',data: this.authKeys};
    input.url = `/master/getQuestions/${productId}/${type}`;
    let getmedicalUrl : string = `${this.data_url}`;
    return this.http.post(getmedicalUrl, input)
    .map(res => res.json());
  }
  getMastersforProd(productId, masterId){
    let input={url:'',data: this.authKeys};
    input.url = `/master/codes/${productId}/${masterId}`;
    let getMasterUrl : string = `${this.data_url}`;
    return this.http.post(getMasterUrl, input)
    .map(res => res.json());
  }
  getApplicationData(productId, rmId, customerId, appNo){
    let input={url:'',data: this.authKeys};
    input.url = `/submitProposal/getProposal/${productId}/${rmId}/${customerId}/${appNo}`;
    let getappUrl : string = `${this.data_url}`;
    return this.http.post(getappUrl, input)
    .map(res => res.json());
  }
  saveApplicationData(appData, productId, rmId, customerId, appNo){
    let input={url:'',data: appData};
    input.url = `/submitProposal/saveProposal/${productId}/${rmId}/${customerId}/${appNo}`;
    let getsaveDataUrl : string = `${this.data_url}`;
    return this.http.post(getsaveDataUrl, input)
    .map(res => res.json());
  }
  getCityForState(insureID, stateId, name){
    let input={url:'',data: this.authKeys};
    input.url = `/master/city/${insureID}/${stateId}`;
    let getsaveDataUrl : string = `${this.data_url}`;
    return this.http.post(getsaveDataUrl, input)
    .map(res => res.json());
  }
  submitProposal(proposalData, insureId, productId){
    let input={url:'',data: proposalData};
    input.url = `/submitProposal/health/${insureId}/${productId}`;
    let getsaveDataUrl : string = `${this.data_url}`;
    return this.http.post(getsaveDataUrl, input)
    .map(res => res.json());
  }
  submitProposalMotor(proposalData, insureId, productId){
    let input={url:'',data: proposalData};
    input.url = `/submitProposal/motor/${insureId}/${productId}`;
    let getsaveDataUrl : string = `${this.data_url}`;
    return this.http.post(getsaveDataUrl, input)
    .map(res => res.json());
  }
  submitProposalHome(proposalData, insureId, productId){
    let input={url:'',data: proposalData};
    input.url = `/submitProposal/home/${insureId}/${productId}`;
    let getsaveDataUrl : string = `${this.data_url}`;
    return this.http.post(getsaveDataUrl, input)
    .map(res => res.json());
  }
  submitProposalLife(proposalData, insureId, productId){
    let input={url:'',data: proposalData};
    input.url = `/submitProposal/Life/${insureId}/${productId}`;
    let getsaveDataUrl : string = `${this.data_url}`;
    return this.http.post(getsaveDataUrl, input)
    .map(res => res.json());
  }
  getCityFromPin(insurerId, pincode){
    let input={url:'',data: this.authKeys};
    input.url = `/master/getDetailsForPincode/${insurerId}/${pincode}`;
    let getcityPinUrl : string = `${this.data_url}`;
    return this.http.post(getcityPinUrl, input)
    .map(res => res.json());
  }
  getProposalSumbit(proposalId){
    let input={url:'',data: this.authKeys};
    input.url = `/submitProposal/result/${proposalId}`;
    let getproposalUrl : string = `${this.data_url}`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getproposalUrl, input, options)
    .map(res => res.json());
  }
  formSunbmitter(Path){
    let payInput = {};
   // const options = new RequestOptions({headers:this.headers});
    //var formUrl =  this.sanitizer.bypassSecurityTrustUrl(Path);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(Path, payInput, options)
    .map(res => res.json());

  }
  getOTPChecked(otpInput){
    let input={url:'',data: otpInput};
    input.url = `/master/checkOtp`;
    let getotpUrl : string = `${this.data_url}`;
    return this.http.post(getotpUrl, input)
    .map(res => res.json());
  }
  getInsuMaster(insurerId){
    let masterUrl: string = `../../assets/resource/${insurerId}.json`;
    return this.http.get(masterUrl)
    .map(res => res.json());
  }
  getNowData(insurerId){
    let masterUrl: string = `../../assets/resource/${insurerId}now.json`;
    return this.http.get(masterUrl)
    .map(res => res.json());
  }
  getDesignMaster(insurerId){
    let masterUrl: string = `../../assets/resource/${insurerId}designation.json`;
    return this.http.get(masterUrl)
    .map(res => res.json());
  }
  getKYCmaster(insurerId){
    let masterUrl: string = `../../assets/resource/${insurerId}KYCMaster.json`;
    return this.http.get(masterUrl)
    .map(res => res.json());
  }
  updateCus(fname, lname,customerId,age,RmId, cEmail, gender,lastUpdateTs,addlData,applications, creationTime, customerNotifications,
            disposableIncome, goals, maritalStatus, monthlyExpense, quotes, status){
    let custmrParam = {"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "firstName":fname,"lastName": lname,"customerId":customerId,"age": age,"rmId": RmId,"email":cEmail,"gender": gender,"lastUpdateTs":lastUpdateTs,
                       "addlData":addlData, "applications":applications, "creationTime":creationTime, "customerNotifications":customerNotifications,
                      "disposableIncome": disposableIncome, "goals": goals, "maritalStatus": maritalStatus, "monthlyExpense": monthlyExpense, "quotes": quotes, "status": status};
    let getupdatedUrl: string = `${this.base_url}/updateCustomer`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(getupdatedUrl, custmrParam,options)
    .map(res => res.json());
  }
  getHealthMasters(){
    let input={url:'',data: this.authKeys};
    input.url = `/master/insuredRelationship`;
    let getMasterUrl : string = `${this.data_url}`;
    return this.http.post(getMasterUrl, input)
    .map(res => res.json());
  }
  uploadUrl(URL,files, filesToUpload, proposalInput){
    const formData: FormData = new FormData();
    formData.append("files", files);
    formData.append('insurerId',proposalInput.policy.insurerId);
    formData.append('docId',filesToUpload.docId);
    formData.append('appId', proposalInput.policy.appId);
    formData.append('agentId',"DBS");
    formData.append('policyNo',proposalInput.policy.policyNo);
    formData.append('spCode',proposalInput.policy.spCode);
    formData.append('enctype','multipart/form-data');
    let getUploadUrl: string = `${this.data_url}/fileUpload`;
    return this.http.post(URL, formData).map((res:Response) => res.text());
 
   // let formdata: FormData = new FormData();
 
   // formdata.append('file', files);
 
    /*const req = new HttpRequest('POST', getUploadUrl, formdata, {
      reportProgress: true
    });
 
    return this.httpForm.request(req);*/

  }
 
  getBI(biInput){
    let input={url:'',data: biInput};
    input.url = `/quote/getBI`;
    let getotpUrl : string = `${this.data_url}`;
    return this.http.post(getotpUrl, input, {headers: this.headers})
    .map(res => res.json());
  }
  getPdfRequestId(productId, rmId, customerId, appNo, proposalData){
    let input={url:'',data: proposalData};
    input.url = `/${productId}/${rmId}/${customerId}/${appNo}`;

    let getPdfUrl: string = `${this.data_url}/getProposalPdf`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getPdfUrl, input, options)
    .map(res => res.json());
  }
  getSignedURL(requestId){
    let input={url:'',data:  this.authKeys};
    input.url = `/${requestId}`;

    let getPdfUrl: string = `${this.data_url}/getResult`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getPdfUrl, input, options)
    .map(res => res.json());
  }
  getBankName(insurerId){
    let input={url:'',data:  this.authKeys};
    input.url = `/master/codes/${insurerId}/Bank`;
    let getPdfUrl: string = `${this.data_url}/Bank`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getPdfUrl, input, options)
    .map(res => res.json());
  }
  getPincodeaia(insurerId, pincode){
    let input={url:'',data:  this.authKeys};
    input.url = `/master/getDetailsForPincode/${insurerId}/${pincode}`;
    let getPdfUrl: string = `${this.data_url}/pincode`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getPdfUrl, input, options)
    .map(res => res.json());
  }
  verifyOTP(appNo, productId, OTP){
    let input={url:'', data: {"appNo":appNo, "productId":productId, "otp":OTP}};
    input.url = `/master/checkOtp`;
    let getOTPUrl: string = `${this.data_url}/checkOtp`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getOTPUrl, input, options)
    .map(res => res.json());
  }
  getReview(appNo){
    let input={url:'', data: this.authKeys};
    input.url = `/master/getReview/${appNo}`;
    let getReviewUrl: string = `${this.data_url}/getReview`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getReviewUrl, input, options)
    .map(res => res.json());
  }
  generateOTP(appNo, productID, productName, mobileNo){
    let input={url:'', data: {"mobile": mobileNo, "appNo":appNo, "productId": productID, "productName":productName}};
    input.url = `/master/generateOtp`;
    let getOTPUrl: string = `${this.data_url}/generateOTP`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(getOTPUrl, input, options)
    .map(res => res.json());
  }
  loadCusmerDetails(rmId, customerId){
    let input={url:'',data: {"rmId":rmId,"customerId":customerId,"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}}};
    input.url = `/customer/getCustomerforRM`;
    let getcustmUrl : string = `${this.data_url}`;
    return this.http.post(getcustmUrl, input)
    .map(res => res.json()); 
  }
  offlineSubmit(offlineData){
    let input={url:'',data: offlineData};
    input.url = `/submitProposal/recordOfflineProposal/${offlineData.rmId}/${offlineData.customerId}`;
    let getcustmUrl : string = `${this.data_url}`;
    return this.http.post(getcustmUrl, input)
    .map(res => res.json()); 
  }
  getEmailService(rmId,customerId,customerName,customerEmail,requestId,productType,lob,requestParams,products){
  
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "rmId":rmId,"customerId":customerId,"customerName":customerName,"customerEmail":customerEmail,"requestId":requestId,"productType":productType,"lob":lob,"requestParams":requestParams,"products":products}};
    input.url = `/quote/emailComparison`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  uploadUrlPdf(URL,requestHttp, files, docID, proposalInput){
    const formData: FormData = new FormData();
    formData.append("files", files);
    formData.append('insurerId',proposalInput.policy.insurerId);
    formData.append('docId', docID);
    formData.append('appId', proposalInput.policy.appId);
    formData.append('agentId',"DBS");
    formData.append('policyNo',proposalInput.policy.policyNo);
    formData.append('spCode', proposalInput.policy.spCode);
    formData.append('enctype','multipart/form-data');
   // let getUploadUrl: string = `${this.data_url}/fileUpload`;
    return requestHttp.post(URL, formData).map((res:Response) => res.text());
 

  }
  reportIssueService(rmId,url,desc){
  
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "rmId":rmId,"url":url,"desc":desc}};
    input.url = `/master/reportissue`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  myActivitiesService(rmId){
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "rmId":rmId}};
    input.url = `/customer/getAllActivitiesforRM`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  saveApplicationDataForApplication(URL,requestHttp,appData, productId, rmId, customerId, appNo){
    let input={url:'',data: appData};
    input.url = `/submitProposal/saveProposal/${productId}/${rmId}/${customerId}/${appNo}`;
   // let getsaveDataUrl : string = `${this.data_url}`;
    return requestHttp.post(URL,input)
    .map(res => res.json());
  }
  rmCreationService(email,firstName,lastName,organizationCode,isAdmin,addlData)
  {
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}, "email":email,"firstName":firstName,"lastName":lastName,"organizationCode":organizationCode,"isAdmin":isAdmin,"addlData":addlData}};
    input.url = `/customer/register`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  getPaymentDetails(referenceId){
    let input={url:'',data: this.authKeys};
    input.url = `/payment/getPaymentDetails/${referenceId}`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  getAllRMIdService()
  {
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey}}};
    input.url = `/customer/getAllRM`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  resetPasswordService(rmId)
  {
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey},"rmId":rmId}};
    input.url = `/customer/forgotPassword`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  deactivateRMService(rmId,firstName,lastName,isAdmin,isRm,lastLoginDate,lastSyncDate,organizationCode,email,addlData)
  {
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey},"rmId":rmId,"firstName":firstName,"lastName":lastName,"isAdmin":isAdmin,"isRm":isRm,"lastLoginDate":lastLoginDate,"lastSyncDate":lastSyncDate,"organizationCode":organizationCode,"email":email,"addlData":addlData}};
    input.url = `/customer/deactivateRM`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
  activateRMService(rmId,firstName,lastName,isAdmin,isRm,lastLoginDate,lastSyncDate,organizationCode,email,addlData)
  {
    let input={url:'',data:{"authentication":{"accesskey":this.accessKey,"secretkey":this.secretKey},"rmId":rmId,"firstName":firstName,"lastName":lastName,"isAdmin":isAdmin,"isRm":isRm,"lastLoginDate":lastLoginDate,"lastSyncDate":lastSyncDate,"organizationCode":organizationCode,"email":email,"addlData":addlData}};
    input.url = `/customer/activateRM`;
    let getProdUrl : string = `${this.data_url}`; 
    return this.http.post(getProdUrl, input)
    .map(res => res.json());
  }
}