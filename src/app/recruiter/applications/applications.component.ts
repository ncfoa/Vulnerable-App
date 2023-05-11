import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruiterService } from 'src/app/_services/recruiter.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  isRecruiterLoggedIn = false;
  userdata: any = {} ;
  applications: any = [];
  sub: any;

  errorMessage = '';
  isSuccessful = false;
  isApplicationFailed = false;

  approveForm : FormGroup;

  rejectForm : FormGroup;


  constructor(private route: ActivatedRoute, private tokenStorage: TokenStorageService, private recruiterService: RecruiterService, private fb: FormBuilder) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") {
      this.isRecruiterLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());

      this.approveForm = this.fb.group({
        _id: ''
      });

      this.rejectForm = this.fb.group({
        _id: ''
      });

      this.getApplications();

      setTimeout(function () {
        $(function () {
          (<any>$('#applications-table')).DataTable({
            pageLength: 5,
            fixedHeader: true,
            responsive: true,
            "sDom": 'rtip',
        });
        var table = (<any>$('#applications-table')).DataTable();
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

  getApplications(): void {

    this.sub = this.route.params.subscribe((params) => {
			const id = params['id'];
    
    this.recruiterService.get_applications(id)
      .subscribe(
        data => {
          this.applications = data;
        },
        error => {
          console.log(error);
        });

      });
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  approve(id): void {

    this.approveForm.patchValue({_id: id , status: "Approved"});

    var myform = this.approveForm.value;

    this.recruiterService.edit_application(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isApplicationFailed = false;
  
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isApplicationFailed = true;
        this.isSuccessful = false;

      }
    );

  }

  reject(id): void {

    this.rejectForm.patchValue({_id: id , status: "Rejected"});

    var myform = this.rejectForm.value;

    this.recruiterService.edit_application(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isApplicationFailed = false;
  
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isApplicationFailed = true;
        this.isSuccessful = false;

      }
    );

  }

}
