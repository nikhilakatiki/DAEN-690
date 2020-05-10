import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidComponent } from './covid/covid.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
{ path: '', component: CovidComponent },
{ path: 'covidworld', component: DashboardComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// { path: 'about', component: AboutComponent },
// { path: 'tweets', component: TweetsComponent }
// { path: 'comparision', component: ComparisionComponent },
// import { AboutComponent } from './about/about.component';
// import { ComparisionComponent } from './comparision/comparision.component';


// import { NtmComponent } from './ntm/ntm.component';
// import { TweetsComponent } from './tweets/tweets.component';