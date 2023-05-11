import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AdminService } from 'src/app/_services/admin.service';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  isAdminLoggedIn = false;
  userdata: any = {} ;

  candidates : number ;
  recruiters : number ;
  offers : number ;
  applications : number ;

  constructor(private tokenStorage: TokenStorageService, private adminService: AdminService) { }

  ngOnInit(): void {

      this.isAdminLoggedIn = true;

      this.adminService.get_candidates().subscribe(
        data => {
          this.candidates = data.length;
        },
        err => {
          console.log(err.error.message);
        }
      );

      this.adminService.get_recruiters().subscribe(
        data => {
          this.recruiters = data.length;
        },
        err => {
          console.log(err.error.message);
        }
      );

      this.adminService.get_all_offers().subscribe(
        data => {
          this.offers = data.length;
        },
        err => {
          console.log(err.error.message);
        }
      );

      this.adminService.get_all_applications().subscribe(
        data => {
          this.applications = data.length;
        },
        err => {
          console.log(err.error.message);
        }
      );


  

    
    
  }

  

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
