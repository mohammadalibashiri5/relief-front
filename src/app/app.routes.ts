import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AddictionComponent} from './components/addiction/addiction.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CheckinComponent} from './components/checkin/checkin.component';
import {authGuard} from './auth.guard';
import {TriggerComponent} from './components/trigger/trigger.component';

export const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"register", component:RegisterComponent },
  { path:"login", component:LoginComponent },
  { path:"my-addictions", component:AddictionComponent, canActivate: [authGuard] },
  { path:"checkin", component:CheckinComponent , canActivate: [authGuard]},
  { path:"dashboard", component:DashboardComponent , canActivate: [authGuard]},
  { path:"trigger", component:TriggerComponent , canActivate: [authGuard]}

];
