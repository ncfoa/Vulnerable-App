import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/_services/recruiter.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-change-password-recruiter',
  templateUrl: './change-password-recruiter.component.html',
  styleUrls: ['./change-password-recruiter.component.css']
})
export class ChangePasswordRecruiterComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  userdata: any = {} ;

  isRecruiterLoggedIn = false;

  constructor(private recruiterService: RecruiterService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") {
      this.userdata = JSON.parse(this.tokenStorage.getUser());
      this.isRecruiterLoggedIn = true;
    }

  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  onSubmit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());

    var myform = this.form;
    myform["_id"] = this.userdata.id;

    this.recruiterService.change_password(myform).subscribe(
      data => {
        this.isSuccessful = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }
    );
  }


}
