import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/_services/recruiter.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  
  isRecruiterLoggedIn = false;
  userdata: any = {} ;
  offers: any = [];

  errorMessage = '';
  isSuccessful = false;
  isOfferFailed = false;

  offerForm : FormGroup;

  deleteOfferForm : FormGroup;


  constructor(private tokenStorage: TokenStorageService, private recruiterService: RecruiterService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") {
      this.isRecruiterLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());

      this.deleteOfferForm = this.fb.group({
        _id: ''
      });

      this.getOffers();

      setTimeout(function () {
        $(function () {
          (<any>$('#offers-table')).DataTable({
            pageLength: 5,
            fixedHeader: true,
            responsive: true,
            "sDom": 'rtip',
        });
        var table = (<any>$('#offers-table')).DataTable();
        $('#key-search').on('keyup', function() {
            table.search($(this).val()).draw();
        });
        $('#type-filter').on('change', function() {
            table.column(2).search($(this).val()).draw();
        });
        });
      }, 500);

    }

  }

  getOffers(): void {
    
    this.recruiterService.get_offers(this.userdata.id)
      .subscribe(
        data => {
          this.offers = data;
         
          this.offerForm = this.fb.group({
            title: null,
            type: null,
            category: null,
            location: null,
            startDate: null,
            endDate: null,
            description: null,
            keywords: this.fb.array([this.fb.control[0]])
            });

        },
        error => {
          console.log(error);
        });
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

    var myform = this.offerForm.value;

    myform["_id"] = this.offerForm.controls.company;

    console.log(myform);

    this.recruiterService.edit_offer(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isOfferFailed = false;
  
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isOfferFailed = true;

      }
    );

  }

  delete(id): void {

    this.deleteOfferForm.patchValue({_id: id});

    var myform = this.deleteOfferForm.value;

    this.recruiterService.delete_offer(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isOfferFailed = false;
  
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isOfferFailed = true;

      }
    );

  }

}
