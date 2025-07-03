import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AddictionComponent} from './components/addiction/addiction.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CheckinComponent} from './components/checkin/checkin.component';
import {authGuard} from './guards/auth.guard';
import {TriggerManagerComponent} from './components/trigger-manager/trigger-manager.component';
import {AddictionDetailComponent} from './components/addiction-detail/addiction-detail.component';
import {ArticlesComponent} from './components/articles/articles.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {adminGuard} from './guards/admin.guard';
import {ArticleManageComponent} from './components/article-manage/article-manage.component';

export const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"register", component:RegisterComponent },
  { path:"login", component:LoginComponent },
  { path:"my-addictions", component:AddictionComponent, canActivate: [authGuard] },
  { path:"checkin", component:CheckinComponent , canActivate: [authGuard]},
  { path:"dashboard", component:DashboardComponent , canActivate: [authGuard], data: {roles: ['ROLE_VISITOR']}},
  { path:"admin/dashboard", component:AdminDashboardComponent , canActivate: [adminGuard], data: {roles: 'ROLE_ADMIN'}},
  { path:"articles/panel", component:ArticleManageComponent , canActivate: [adminGuard], data: {roles: 'ROLE_ADMIN'}},
  { path:"addiction", component:AddictionDetailComponent , canActivate: [authGuard]},
  { path:"unauthorized", component:UnauthorizedComponent},
  { path:"triggers", component:TriggerManagerComponent , canActivate: [authGuard]},
  { path:"articles", component:ArticlesComponent }

];
