import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ForgetPasswordComponent } from './components/authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './utils/helpers/auth.guard';
import { ProfilePageComponent } from './components/authentication/profile-page/profile-page.component';
import { UpdateCurrentUserPasswordComponent } from './components/authentication/update-current-user-password/update-current-user-password.component';
import { ExploreComponent } from './components/explore/explore.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MainContainerComponent } from './components/main-container/main-container.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  {
    path: '',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'updateCurrentUserPassword',
        component: UpdateCurrentUserPasswordComponent,
      },
      {
        path: 'explore',
        component: ExploreComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'notifications',
        component: NotificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
