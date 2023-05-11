import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './candidate/login/login.component';
import { RegisterCandidateComponent } from './candidate/register-candidate/register-candidate.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { BoardRecruiterComponent } from './recruiter/board-recruiter/board-recruiter.component';
import { BoardCandidateComponent } from './candidate/board-candidate/board-candidate.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { RegisterRecruiterComponent } from './recruiter/register-recruiter/register-recruiter.component';
import { LoginRecruiterComponent } from './recruiter/login-recruiter/login-recruiter.component';
import { ChangePasswordComponent } from './candidate/change-password/change-password.component';
import { CreateCvComponent } from './candidate/create-cv/create-cv.component';
import { EditCvComponent } from './candidate/edit-cv/edit-cv.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditProfileComponent } from './recruiter/edit-profile/edit-profile.component';
import { ChangePasswordRecruiterComponent } from './recruiter/change-password-recruiter/change-password-recruiter.component';
import { OffersComponent } from './recruiter/offers/offers.component';
import { PostOfferComponent } from './recruiter/post-offer/post-offer.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ChangePasswordAdminComponent } from './admin/change-password-admin/change-password-admin.component';
import { ManageCandidatesComponent } from './admin/manage-candidates/manage-candidates.component';
import { ManageRecruitersComponent } from './admin/manage-recruiters/manage-recruiters.component';
import { ManageOffersComponent } from './admin/manage-offers/manage-offers.component';
import { InternshipDetailsComponent } from './internship-details/internship-details.component';
import { MyApplicationsComponent } from './candidate/my-applications/my-applications.component';
import { ApplicationsComponent } from './recruiter/applications/applications.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterCandidateComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardRecruiterComponent,
    BoardCandidateComponent,
    RegisterRecruiterComponent,
    LoginRecruiterComponent,
    ChangePasswordComponent,
    CreateCvComponent,
    EditCvComponent,
    EditProfileComponent,
    ChangePasswordRecruiterComponent,
    OffersComponent,
    PostOfferComponent,
    LoginAdminComponent,
    ChangePasswordAdminComponent,
    ManageCandidatesComponent,
    ManageRecruitersComponent,
    ManageOffersComponent,
    InternshipDetailsComponent,
    MyApplicationsComponent,
    ApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgxPaginationModule
  ],
  providers: [authInterceptorProviders,
              BoardRecruiterComponent,
              BoardCandidateComponent,
              BoardAdminComponent,
              LoginComponent,
              LoginRecruiterComponent,
              LoginAdminComponent
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
