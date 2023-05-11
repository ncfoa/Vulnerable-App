import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.css']
})
export class ManageCandidatesComponent implements OnInit {

  isAdminLoggedIn = false;
  userdata: any = {} ;
  candidates: any = [];

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  isDeleteFailed = false;

  candidateForm : FormGroup;

  constructor(private tokenStorage: TokenStorageService, private adminService: AdminService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void{
      
      this.isAdminLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());
      
      this.candidateForm = this.fb.group({
        _id: ''
      });

      this.getCandidates();

      setTimeout(function () {
        $(function () {
          (<any>$('#candidates-table')).DataTable({
            pageLength: 5,
            fixedHeader: true,
            responsive: true,
            "sDom": 'rtip',
        });
        var table = (<any>$('#candidates-table')).DataTable();
        $('#key-search').on('keyup', function() {
            table.search($(this).val()).draw();
        });
        $('#type-filter').on('change', function() {
            table.column(2).search($(this).val()).draw();
        });
        });
      }, 500);
  }
 
  getCandidates(): void {
    
    this.adminService.get_candidates()
      .subscribe(
        data => {
          this.candidates = data;
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

    this.candidateForm.patchValue({_id: id});

    var myform = this.candidateForm.value;

    this.adminService.delete_candidate(myform).subscribe(
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
