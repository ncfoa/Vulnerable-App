import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterService } from '../../_services/recruiter.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  isProfileFailed = false;

  userdata: any = {} ;

  isRecruiterLoggedIn = false;

  profileForm: FormGroup;


  constructor(private recruiterService: RecruiterService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") {
      this.isRecruiterLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());

      this.profileForm = this.fb.group({
        address: this.userdata.address,
        city: this.userdata.city,
        province: this.userdata.province,
        country: this.userdata.country,
        description: this.userdata.description,
        website: this.userdata.website
      })
    }

  }

  
  onSubmit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());
    var myform = this.profileForm.value;
    
    myform["_id"] = this.userdata.id;

    this.recruiterService.edit_profile(myform).subscribe(
      data => {
        data["accessToken"]= this.tokenStorage.getToken();
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isProfileFailed = false;
        
        setTimeout(()=>this.router.navigate(['/recruiter']),2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isProfileFailed = true;

      }
    );

  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
