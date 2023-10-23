import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MyLoaderComponent } from '././utils/my-loader/my-loader.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ProfilePageComponent } from './components/authentication/profile-page/profile-page.component';
import { ForgetPasswordComponent } from './components/authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { UpdateCurrentUserPasswordComponent } from './components/authentication/update-current-user-password/update-current-user-password.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VerifyModal } from './utils/modal/verify-modal';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ExploreComponent } from './components/explore/explore.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    MyLoaderComponent,
    LoginComponent,
    SignupComponent,
    ProfilePageComponent,
    FooterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UpdateCurrentUserPasswordComponent,
    TimelineComponent,
    VerifyModal,
    MainContainerComponent,
    NotificationComponent,
    ExploreComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MaterialFileInputModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    FormsModule,
    MatTabsModule,
    MatChipsModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
