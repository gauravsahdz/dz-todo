import { NgModule } from '@angular/core';
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
import { VerifyDialogComponent } from './components/verify-dialog/verify-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfilePageComponent } from './authentication/profile-page/profile-page.component';
import {MatIconModule} from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { UpdateCurrentUserPasswordComponent } from './authentication/update-current-user-password/update-current-user-password.component';
import { VerifyUserDeletionComponent } from './components/verify-user-deletion/verify-user-deletion.component';
import { AddTodoDialogComponent } from './components/add-todo-dialog/add-todo-dialog.component';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    VerifyDialogComponent,
    MyLoaderComponent,
    LoginComponent,
    SignupComponent,
    ProfilePageComponent,
    FooterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UpdateCurrentUserPasswordComponent,
    VerifyUserDeletionComponent,
    AddTodoDialogComponent,
    EditTodoDialogComponent,
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
    MaterialFileInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
