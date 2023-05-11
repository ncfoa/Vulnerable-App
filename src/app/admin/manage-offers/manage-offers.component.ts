import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.css']
})
export class ManageOffersComponent implements OnInit {

  isAdminLoggedIn = false;
  userdata: any = {} ;
  offers: any = [];

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  isDeleteFailed = false;
  isApproveFailed = false;

  offerForm : FormGroup;

  constructor(private tokenStorage: TokenStorageService, private adminService: AdminService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void{
      
      this.isAdminLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());
      
      this.offerForm = this.fb.group({
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
 
  getOffers(): void {
    
    this.adminService.get_all_offers()
      .subscribe(
        data => {
          this.offers = data;

          console.log(this.offers);
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

    this.offerForm.patchValue({_id: id});

    var myform = this.offerForm.value;

    this.adminService.delete_offer(myform).subscribe(
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
  
  approve(id): void {

    this.offerForm.patchValue({_id: id});

    var myform = this.offerForm.value;

    console.log(myform);

    this.adminService.approve_offer(myform).subscribe(
      data => {
        this.isSuccessful = true;
        this.isApproveFailed = false;
  
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isApproveFailed = true;
        this.isSuccessful = false;

      }
    );

  }

}
