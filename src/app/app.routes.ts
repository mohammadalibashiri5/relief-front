import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AddictionComponent} from './components/addiction/addiction.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {authGuard} from './guards/auth.guard';
import {TriggerManagerComponent} from './components/trigger-manager/trigger-manager.component';
import {AddictionDetailComponent} from './components/addiction-detail/addiction-detail.component';
import {ArticlesComponent} from './components/article/articles/articles.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {adminGuard} from './guards/admin.guard';
import {ArticleManageComponent} from './components/article/article-manage/article-manage.component';
import {AdminCategoryTypeComponent} from './components/admin-category-type/admin-category-type.component';
import {AdminAddictionsComponent} from './components/admin-addictions/admin-addictions.component';
import {ArticleDetailComponent} from './components/article/article-detail/article-detail.component';
import {ContactComponent} from './components/contact/contact.component';

export const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"register", component:RegisterComponent },
  { path:"login", component:LoginComponent },
  { path:"my-addictions", component:AddictionComponent, canActivate: [authGuard] },
  { path:"dashboard", component:DashboardComponent , canActivate: [authGuard], data: {roles: ['ROLE_VISITOR']}},
  { path:"admin/dashboard", component:AdminDashboardComponent , canActivate: [adminGuard], data: {roles: 'ROLE_ADMIN'}},
  { path:"articles/panel", component:ArticleManageComponent , canActivate: [adminGuard], data: {roles: 'ROLE_ADMIN'}},
  { path:"article/:id", component:ArticleDetailComponent },
  { path:"categoryType", component:AdminCategoryTypeComponent , canActivate: [adminGuard], data: {roles: 'ROLE_ADMIN'}},
  { path:"admin/addictions", component:AdminAddictionsComponent , canActivate: [adminGuard], data: {roles: 'ROLE_ADMIN'}},
  { path:"addiction", component:AddictionDetailComponent , canActivate: [authGuard]},
  { path:"unauthorized", component:UnauthorizedComponent},
  { path:"contact", component:ContactComponent},
  { path:"triggers", component:TriggerManagerComponent , canActivate: [authGuard]},
  { path:"articles", component:ArticlesComponent }

];
