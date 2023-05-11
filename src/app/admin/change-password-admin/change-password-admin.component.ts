import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-change-password-admin',
  templateUrl: './change-password-admin.component.html',
  styleUrls: ['./change-password-admin.component.css']
})
export class ChangePasswordAdminComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  userdata: any = {} ;

  isAdminLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private adminService: AdminService) { }

  ngOnInit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());
    console.log(this.userdata);
    this.isAdminLoggedIn = true;
    
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  onSubmit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());

    var myform = this.form;
    myform["_id"] = this.userdata.id;

    console.log(myform);

    this.adminService.change_password(myform).subscribe(
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