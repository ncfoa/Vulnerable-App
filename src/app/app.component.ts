import { Component, OnInit } from '@angular/core';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { LoginComponent } from './candidate/login/login.component';
import { LoginRecruiterComponent } from './recruiter/login-recruiter/login-recruiter.component';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  showAdminBoard = false;
  showRecruiterBoard = false;
  showCandidateBoard = false;
  username: string;

  constructor(private tokenStorage: TokenStorageService, private candidateLogin: LoginComponent, private recruiterLogin: LoginRecruiterComponent, private adminLogin: LoginAdminComponent) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {

      this.recruiterLogin.ngOnInit();
      this.candidateLogin.ngOnInit();
      this.adminLogin.ngOnInit();
      this.showRecruiterBoard = this.recruiterLogin.isRecruiterLoggedIn;
	    this.showCandidateBoard = this.candidateLogin.isCandidateLoggedIn;
      this.showAdminBoard = this.adminLogin.isAdminLoggedIn;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
