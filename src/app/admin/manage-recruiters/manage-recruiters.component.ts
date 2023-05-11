import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-manage-recruiters',
  templateUrl: './manage-recruiters.component.html',
  styleUrls: ['./manage-recruiters.component.css']
})
export class ManageRecruitersComponent implements OnInit {

  isAdminLoggedIn = false;
  userdata: any = {} ;
  recruiters: any = [];

  errorMessage = '';
  isSuccessful = false;
  isDeleteFailed = false;

  recruiterForm : FormGroup;

  constructor(private tokenStorage: TokenStorageService, private adminService: AdminService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void{
      
      this.isAdminLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());
      
      this.recruiterForm = this.fb.group({
        _id: ''
      });

      this.getRecruiters();

      setTimeout(function () {
        $(function () {
          (<any>$('#recruiters-table')).DataTable({
            pageLength: 5,
            fixedHeader: true,
            responsive: true,
            "sDom": 'rtip',
        });
        var table = (<any>$('#recruiters-table')).DataTable();
        $('#key-search').on('keyup', function() {
            table.search($(this).val()).draw();
        });
        $('#type-filter').on('change', function() {
            table.column(2).search($(this).val()).draw();
        });
        });
      }, 500);
  }
 
  getRecruiters(): void {
    
    this.adminService.get_recruiters()
      .subscribe(
        data => {
          this.recruiters = data;

          console.log(this.recruiters);
        },
        error => {
          console.log(error);
        });
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  delete(id): void {

    this.recruiterForm.patchValue({_id: id});

    var myform = this.recruiterForm.value;
    
    this.adminService.delete_recruiter(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isDeleteFailed = false;
  
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isDeleteFailed = true;

      }
    );

  }

}
