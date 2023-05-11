import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  isCandidateLoggedIn = false;
  userdata: any = {} ;
  applications: any = [];


  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.isCandidateLoggedIn = true;
    this.userdata = JSON.parse(this.tokenStorage.getUser());

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

  getApplications(): void {
    
    this.userService.get_applications(this.userdata.id)
      .subscribe(
        data => {
          this.applications = data;

          console.log(this.applications);
        },
        error => {
          console.log(error);
        });
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
