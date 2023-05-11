import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCandidateComponent } from './candidate/register-candidate/register-candidate.component';
import { LoginComponent } from './candidate/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardCandidateComponent } from './candidate/board-candidate/board-candidate.component';
import { BoardRecruiterComponent } from './recruiter/board-recruiter/board-recruiter.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { RegisterRecruiterComponent } from './recruiter/register-recruiter/register-recruiter.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthGuardRecruiterService } from './_services/auth-guard-recruiter.service';
import { AuthGuardAdminService } from './_services/auth-guard-admin.service';
import { LoginRecruiterComponent } from './recruiter/login-recruiter/login-recruiter.component';
import { ChangePasswordComponent } from './candidate/change-password/change-password.component';
import { CreateCvComponent } from './candidate/create-cv/create-cv.component';
import { EditCvComponent } from './candidate/edit-cv/edit-cv.component';
import { MyApplicationsComponent } from './candidate/my-applications/my-applications.component';
import { ChangePasswordRecruiterComponent } from './recruiter/change-password-recruiter/change-password-recruiter.component';
import { EditProfileComponent } from './recruiter/edit-profile/edit-profile.component';
import { OffersComponent } from './recruiter/offers/offers.component';
import { PostOfferComponent } from './recruiter/post-offer/post-offer.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ChangePasswordAdminComponent } from './admin/change-password-admin/change-password-admin.component';
import { ManageCandidatesComponent } from './admin/manage-candidates/manage-candidates.component';
import { ManageRecruitersComponent } from './admin/manage-recruiters/manage-recruiters.component';
import { ManageOffersComponent } from './admin/manage-offers/manage-offers.component';
import { InternshipDetailsComponent } from './internship-details/internship-details.component';
import { ApplicationsComponent } from './recruiter/applications/applications.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'candidate/login', component: LoginComponent },
  { path: 'candidate/register', component: RegisterCandidateComponent },
  { path: 'recruiter/login', component: LoginRecruiterComponent },
  { path: 'recruiter/register', component: RegisterRecruiterComponent },
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'candidate', component: BoardCandidateComponent, canActivate:[AuthGuardService] },
  { path: 'recruiter', component: BoardRecruiterComponent, canActivate:[AuthGuardRecruiterService] },
  { path: 'admin', component: BoardAdminComponent, canActivate:[AuthGuardAdminService] },
  { path: 'admin/login', component: LoginAdminComponent },
  { path: 'admin/change-password', component: ChangePasswordAdminComponent, canActivate:[AuthGuardAdminService] },
  { path: 'admin/manage-candidates', component: ManageCandidatesComponent, canActivate:[AuthGuardAdminService] },
  { path: 'admin/manage-recruiters', component: ManageRecruitersComponent, canActivate:[AuthGuardAdminService] },
  { path: 'admin/manage-offers', component: ManageOffersComponent, canActivate:[AuthGuardAdminService] },
  { path: 'candidate/change-password', component: ChangePasswordComponent, canActivate:[AuthGuardService] },
  { path: 'candidate/create-cv', component: CreateCvComponent, canActivate:[AuthGuardService] },
  { path: 'candidate/edit-cv', component: EditCvComponent, canActivate:[AuthGuardService] },
  { path: 'candidate/applications', component: MyApplicationsComponent, canActivate:[AuthGuardService] },
  { path: 'recruiter/change-password', component: ChangePasswordRecruiterComponent, canActivate:[AuthGuardRecruiterService] },
  { path: 'recruiter/edit-profile', component: EditProfileComponent, canActivate:[AuthGuardRecruiterService] },
  { path: 'recruiter/offers', component: OffersComponent, canActivate:[AuthGuardRecruiterService] },
  { path: 'recruiter/post-offer', component: PostOfferComponent, canActivate:[AuthGuardRecruiterService] },
  { path: 'internship/:id', component: InternshipDetailsComponent},
  { path: 'recruiter/offers/:id', component: ApplicationsComponent, canActivate:[AuthGuardRecruiterService] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
