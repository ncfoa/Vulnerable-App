import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isCandidateLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()  && JSON.parse(this.tokenStorage.getUser()).role == "candidate") {
      this.isCandidateLoggedIn = true;
    }
  
  }

  onSubmit(): void {
    this.authService.candidate_login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveRole("Candidate");

        this.isLoginFailed = false;
        this.isCandidateLoggedIn = true;
        setTimeout(()=>this.router.navigate(['/candidate']).then(() => {
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
