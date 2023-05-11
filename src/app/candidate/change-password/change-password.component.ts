import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  userdata: any = {} ;

  isCandidateLoggedIn = false;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());
    this.isCandidateLoggedIn = true;
    
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  onSubmit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());

    var myform = this.form;
    myform["_id"] = this.userdata.id;

    this.userService.change_password(myform).subscribe(
      data => {
        console.log(this.form);
        this.isSuccessful = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }
    );
  }


}
