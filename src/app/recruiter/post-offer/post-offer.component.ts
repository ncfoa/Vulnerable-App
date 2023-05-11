import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/_services/recruiter.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-post-offer',
  templateUrl: './post-offer.component.html',
  styleUrls: ['./post-offer.component.css']
})
export class PostOfferComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  isOfferFailed = false;

  userdata: any = {} ;

  isRecruiterLoggedIn = false;

  offerForm: FormGroup;

  constructor(private recruiterService: RecruiterService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") {
      this.isRecruiterLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());

      this.offerForm = this.fb.group({
        title: null,
        company: null,
        type: null,
        category: null,
        location: null,
        startDate: null,
        endDate: null,
        description: null,
        keywords: this.fb.array([this.fb.control[0]])
      })
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  get myKeywords() {
    return this.offerForm.get('keywords') as FormArray;
  }

  addKeyword() {
    this.myKeywords.push(this.fb.control(''));
  }

  deleteKeyword(index) {
    this.myKeywords.removeAt(index);
  }

  onSubmit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());
    var myform = this.offerForm.value;
    
    myform["_id"] = this.userdata.id;

    console.log(myform);

    this.recruiterService.create_offer(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isOfferFailed = false;
  
        setTimeout(()=>this.router.navigate(['/recruiter/offers']),2000);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isOfferFailed = true;

      }
    );

  }


}
