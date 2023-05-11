import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login-recruiter',
  templateUrl: './login-recruiter.component.html',
  styleUrls: ['./login-recruiter.component.css']
})
export class LoginRecruiterComponent implements OnInit {

  form: any = {};
  isRecruiterLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()  && JSON.parse(this.tokenStorage.getUser()).role == "recruiter") {
      this.isRecruiterLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.authService.recruiter_login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveRole("Recruiter");

        this.isLoginFailed = false;
        this.isRecruiterLoggedIn = true;
        setTimeout(()=>this.router.navigate(['/recruiter']).then(() => {
          window.location.reload();
          }),1000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}

