import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import {AuthGuard} from './helpers/auth.guard'
import { ProfilePageComponent } from './authentication/profile-page/profile-page.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { UpdateCurrentUserPasswordComponent } from './authentication/update-current-user-password/update-current-user-password.component';
 
const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'todos', component: HomePageComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfilePageComponent ,canActivate: [AuthGuard]},
  { path: 'forgetPassword', component:  ForgetPasswordComponent},
  { path: 'resetPassword', component:  ResetPasswordComponent},
  { path: 'updateCurrentUserPassword', component:  UpdateCurrentUserPasswordComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
