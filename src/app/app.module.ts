import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider, enableProdMode } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Headers, Http, HttpModule, BrowserXhr } from '@angular/http';

import { HttpClient, HttpClientModule ,HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { KeysPipe } from '../app/sharedServices/keyValuePipe';
import { OrderByPipe } from '../app/sharedServices/orderBy';
import { RoundPipe } from '../app/sharedServices/mathRound';
import { AppComponent } from './app.component';
import { AuthguardGuard } from './authguard.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MycustomerComponent } from './components/mycustomer/mycustomer.component';
import { searchFilter } from './components/mycustomer/searchFilter';
import { OneMinutePlanComponent } from './components/one-minute-plan/one-minute-plan.component';
import { CustmerQnsOneComponent } from './components/custmer-qns/custmer-qnsOne.component';
import { CustmerQnsTwoComponent } from './components/custmer-qns/custmer-qnsTwo.component';
import { CustmerQnsThreeComponent } from './components/custmer-qns/custmer-qnsThree.component';
import { CustmerQnsFourComponent } from './components/custmer-qns/custmer-qnsFour.component';
import { SharedService } from './sharedServices/shared.service';
import { AlertService } from './sharedServices/alert.service';
import { AppHeaderComponent } from './components/common/app-header/app-header.component';
import { AppFooterComponent } from './components/common/app-footer/app-footer.component';
import { ProductComponent } from './components/product/product.component';
import { PolicyPageComponent } from './components/policy-page/policy-page.component';
import { AlertComponent } from './components/common/alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { HealthComponent } from './components/health/health.component';
import { HomeInsuComponent } from './components/home-insu/home-insu.component';
import { CriticalIllComponent } from './components/critical-ill/critical-ill.component';
import { RegularIncomeComponent } from './components/regular-income/regular-income.component';
import { SavingTradComponent } from './components/saving-trad/saving-trad.component';
import { ProtectionComponent } from './components/protection/protection.component';
import { ChildEduComponent } from './components/child-edu/child-edu.component';
import { SavingsULinkComponent } from './components/savings-u-link/savings-u-link.component';
import { CarInsuComponent } from './components/car-insu/car-insu.component';

import { AxaComponent } from './components/proposal/car/axa/axa.component';
import { FgComponent } from './components/proposal/car/fg/fg.component';
import { HdfcComponent } from './components/proposal/car/hdfc/hdfc.component';
import { ItgiComponent } from './components/proposal/car/itgi/itgi.component';
import { RgiComponent } from './components/proposal/car/rgi/rgi.component';
import { RoyalSundaramComponent } from './components/proposal/car/royal-sundaram/royal-sundaram.component';
import { SompoComponent } from './components/proposal/car/sompo/sompo.component';
import { TataComponent } from './components/proposal/car/tata/tata.component';
import { ApolloComponent } from './components/proposal/health/apollo/apollo.component';
import { HealthaxaComponent} from './components/proposal/health/axa/axa.component';
import { BajajComponent } from './components/proposal/health/bajaj/bajaj.component';
import { CignaComponent } from './components/proposal/health/cigna/cigna.component';
import { HealthfgComponent} from './components/proposal/health/fg/fg.component';
import { HealthdfcComponent} from './components/proposal/health/hdfc/hdfc.component';
import { ReligareComponent } from './components/proposal/health/religare/religare.component';
import { HealthrgiComponent} from './components/proposal/health/rgi/rgi.component';
import { HealthroyalSundaramComponent} from './components/proposal/health/royal-sundaram/royal-sundaram.component';
import { StarComponent } from './components/proposal/health/star/star.component';
import { HealthsompoComponent} from './components/proposal/health/sompo/sompo.component';
import { HomeRoyalsundaramComponent } from './components/proposal/home/home-royalsundaram/home-royalsundaram.component';
import { AiaComponent } from './components/proposal/life/aia/aia.component';
import { BsliComponent } from './components/proposal/life/bsli/bsli.component';
//import { Broadcaster } from './components/common/form-builder/form-builder.component';
//import { FormBuilderDirective } from './components/common/form-builder/form-builder.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { SharableLinkComponent } from './components/common/sharable-link/sharable-link.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyActivitiesComponent } from './components/my-activities/my-activities.component';
import { AiaOfflineComponent } from './components/proposal/life/aia-offline/aia-offline.component';
import { BsliOfflineComponent } from './components/proposal/life/bsli-offline/bsli-offline.component';
import { OfflinePurchaseComponent } from './components/proposal/offline-purchase/offline-purchase.component';

const appRoutes:Routes = [
  {
    path: 'home/review/:id',
    component: SharableLinkComponent
  },
  {
    path: 'home/login',
    loadChildren: './components/login-form/login-form.module#LoginFormModule'
  },
  {
      path: '',
      canActivate: [AuthguardGuard],
      loadChildren:  './components/home/home.module#HomeModule'
  },
   {
      path: 'home/mycustomer',
      canActivate: [AuthguardGuard],
      loadChildren: './components/mycustomer/mycustomer.module#MyCustomerModule'
   },
   {
    path: 'home/myActivities',
    canActivate: [AuthguardGuard],
    loadChildren: './components/my-activities/my-activities.module#MyActivitiesModule'
 },
   {
    path: 'home/bsliapplicationform',
    canActivate: [AuthguardGuard],
    loadChildren: './components/application-form/application-form.module#bsliAppModule'
 },
    {
    path: 'home/oneminuteplan',
    canActivate: [AuthguardGuard],
    loadChildren: './components/one-minute-plan/one-minute-plan.module#OneMinutePlanModule'

    },
  {
    path: 'home/customerqusOne',
    canActivate: [AuthguardGuard],
    loadChildren: './components/custmer-qns/custmer-qnsOne.module#CustmerOnePlanModule'
  },
  {
    path: 'home/customerqusTwo',
    canActivate: [AuthguardGuard],
    loadChildren: './components/custmer-qns/custmer-qnsTwo.module#CustmerTwoPlanModule'

  },
  {
    path: 'home/customerqusThree',
    canActivate: [AuthguardGuard],
    loadChildren: './components/custmer-qns/custmer-qnsThree.module#CustmerThreePlanModule'

  },
  {
    path: 'home/customerqusFour',
    canActivate: [AuthguardGuard],
    loadChildren: './components/custmer-qns/custmer-qnsFour.module#CustmerFourPlanModule'

  },
   {
    path: 'home/product',
    canActivate: [AuthguardGuard],
    loadChildren: './components/product/product.module#ProductModule'

  },
   {
    path: 'home/policypage',
    canActivate: [AuthguardGuard],
    loadChildren: './components/policy-page/policy-page.module#PolicyPageModule'
  },
  {
    path: 'home/health-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/health/health.module#HealthModule'
  },
  {
    path: 'home/homeinsu-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/home-insu/home-insu.module#HomeInsuModule'
  },
  {
    path: 'home/criticalill-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/critical-ill/critical-ill.module#CriticalModule'
  },
  {
    path: 'home/regularIncome-details',
    canActivate: [AuthguardGuard],
    loadChildren:  './components/regular-income/regular-income.module#RegularModule'
  },
  {
    path: 'home/savingTrad-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/saving-trad/saving-trad.module#SavingTradModule'
  },
   {
    path: 'home/protection-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/protection/protection.module#ProtectionModule'
  },
   {
    path: 'home/childEdu-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/child-edu/child-edu.module#ChildEduModule'
  },
   {
    path: 'home/savingsULink-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/savings-u-link/savings-u-link.module#SavingsLinkModule'
  },
  {
    path: 'home/carinsu-details',
    canActivate: [AuthguardGuard],
    loadChildren: './components/car-insu/car-insu.module#CarInsuModule'
  },
  {
    path: 'home/axaCarProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/car/axa/axa.module#AxaCarModule'
  },
  {
    path: 'home/fgCarProposal',
    canActivate: [AuthguardGuard],
    component: FgComponent
  },
  {
    path: 'home/hdfcCarProposal',
    canActivate: [AuthguardGuard],
    component: HdfcComponent
  },
  {
    path: 'home/itgiCarProposal',
    canActivate: [AuthguardGuard],
    component: ItgiComponent
  },
  {
    path: 'home/rgiCarProposal',
    canActivate: [AuthguardGuard],
    component: RgiComponent
  },
  {
    path: 'home/royalSundaramCarProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/car/royal-sundaram/royal-sundaram.module#RsaCarModule'
  },
  {
    path: 'home/sompoCarProposal',
    canActivate: [AuthguardGuard],
    component: SompoComponent
  },
  {
    path: 'home/tataCarProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/car/tata/tata.module#TataCarModule'
  },
  {
    path: 'home/apolloHealthProposal',
    canActivate: [AuthguardGuard],
    component: ApolloComponent
  },
  {
    path: 'home/axaHealthProposal',
    canActivate: [AuthguardGuard],
    component: HealthaxaComponent
  },
  {
    path: 'home/bajajHealthProposal',
    canActivate: [AuthguardGuard],
    component: BajajComponent
  },
  {
    path: 'home/cignaHealthProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/health/cigna/cigna.module#CignaHealthModule'
  },
  {
    path: 'home/fgHealthProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/health/fg/fg.module#FgHealthModule'
  },
  {
    path: 'home/hdfcHealthProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/health/hdfc/hdfc.module#HdfcHealthModule'
  },
  {
    path: 'home/religareHealthProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/health/religare/religare.module#ReligareHealthModule'
  },
  {
    path: 'home/rgiHealthProposal',
    canActivate: [AuthguardGuard],
    component: HealthrgiComponent
  }, 
  {
    path: 'home/royalSHealthProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/health/royal-sundaram/royal-sundaram.module#RsaHealthModule'
  }, 
  {
    path: 'home/sompoHealthProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/health/sompo/sompo.module#SompoHealthModule'
  },
  {
    path: 'home/royalSHomeProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/home/home-royalsundaram/home-royalsundaram.module#HomeRsaModule'
  },
  {
    path: 'home/aiaLifeProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/life/aia/aia.module#AiaLifeModule'
  },
  {
    path: 'home/bsliLifeProposal',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/life/bsli/bsli.module#BsliLifeModule'
  },
  {
    path: 'home/starHealthProposal',
    canActivate: [AuthguardGuard],
    component: StarComponent
  },
  {
    path: 'home/bsliapplicationformForjointLife',
    canActivate: [AuthguardGuard],
    loadChildren: './components/applicationform-sec/applicationform-sec.module#bsliAppSecModule'

  },
  {
    path: 'home/avivaLifeApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/life/aviva/aviva.module#AvivaLifeModule'

  },
  {
    path: 'home/avivaRegularApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/regular-income/aviva-regular/aviva-regular.module#AvivaRegularModule'

  },
  {
    path: 'home/avivaSavingTradApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/saving-trad/aviva-saving-trad/aviva-saving-trad.module#AvivaSavingTradModule'

  },
  {
    path: 'home/avivaSavingUnitApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/saving-unit/aviva-saving-unit/aviva-saving-unit.module#AvivaSavingUnitModule'

  },
  {
    path: 'home/avivaChildEduApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/child-edu/aviva-child-edu/aviva-child-edu.module#AvivaChildEduModule'

  },
  {
    path: 'home/avivaCriticalIllApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/critical-ill/aviva-critical-ill/aviva-critical-ill.module#AvivaCriticalIllModule'

  },
  {
    path: 'home/avivaCarInsuApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/car/aviva-car/aviva-car.module#AvivaCarInsuModule'

  },
  {
    path: 'home/tataCriticalIllApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/critical-ill/tata-critical-ill/tata-critical-ill.module#tataCriticalIllModule'

  },
  {
    path: 'home/bsliCriticalIllApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/critical-ill/bsli-critical-ill/bsli-critical-ill.module#bsliCriticalIllModule'

  },
  {
    path: 'home/tataSavingTradApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/saving-trad/tata-saving-trad/tata-saving-trad.module#tataSavingTradModule'

  },
  {
    path: 'home/bsliSavingTradApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/saving-trad/bsli-saving-trad/bsli-saving-trad.module#bsliSavingTradModule'

  },
  {
    path: 'home/tataUlipApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/saving-unit/tata-saving-unit/tata-saving-unit.module#tataSavingUnitModule'

  },
  {
    path: 'home/bsliUlipApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/saving-unit/bsli-saving-unit/bsli-saving-unit.module#bsliSavingUnitModule'

  },
  {
    path: 'home/bsliRegularApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/regular-income/bsli-regular/bsli-regular.module#bsliRegularModule'

  },
  {
    path: 'home/tataRegularApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/regular-income/tata-regular/tata-regular.module#tataRegularModule'

  },
  {
    path: 'home/bsliChildEduApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/child-edu/bsli-child-edu/bsli-child-edu.module#bsliChildEduModule'

  },
  {
    path: 'home/tataChildEduApplication',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/child-edu/tata-child-edu/tata-child-edu.module#tataChildEduModule'

  },
  {
    path: 'home/PaymentConfirmation/:id/:id',
    loadChildren: './components/common/payment-confirm/payment-confirm.module#paymentConfirmModule'

  },
  {
    path: 'home/manageUserCreation',
    canActivate: [AuthguardGuard],
    loadChildren: './components/manage-user-creation//manage-user-creation.module#ManageUserCreationModule'

  },
  {
    path: 'home/aiaOfflinePurhase',
    canActivate: [AuthguardGuard],
    loadChildren: '././components/proposal/life/aia-offline/aia-offline.module#AiaOfflineModule'

  },
  {
    path: 'home/bsliOfflinePurhase',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/life/bsli-offline/bsli-offline.module#BsliOfflineModule'

  },
  {
    path: 'home/offlinePurhase',
    canActivate: [AuthguardGuard],
    loadChildren: './components/proposal/offline-purchase/offline-purchase.module#OfflinePurchaseModule'

  },
  {
    path: 'home/annuity-plan',
    canActivate: [AuthguardGuard],
    loadChildren: './components/annuity/annuity.module#AnnuityInsuModule'
  }

      ]

enableProdMode();      

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    FgComponent,
    HdfcComponent,
    ItgiComponent,
    RgiComponent,
    SompoComponent,
    ApolloComponent,
    BajajComponent,
    StarComponent,
    HealthaxaComponent,
    HealthrgiComponent,
    SharableLinkComponent,
    //Broadcaster,
    //FormBuilderDirective,
    KeysPipe
    ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
   // NgDatepickerModule,
    RouterModule.forRoot(appRoutes),
   ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
   BrowserAnimationsModule
  ],
  providers: [AuthguardGuard, SharedService, AlertService, DatePipe, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
