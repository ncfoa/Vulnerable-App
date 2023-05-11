import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  total_candidates: number;
  total_recruiters: number;
  total_offers: number;
  total_applications: number;
  offers: any;

  page = 1;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    
    this.adminService.get_candidates().subscribe(
      data => {
        this.total_candidates = data.length;
      },
      err => {
        console.log(err.error.message);
      }
    );

    this.adminService.get_recruiters().subscribe(
      data => {
        this.total_recruiters = data.length;
      },
      err => {
        console.log(err.error.message);
      }
    );

    this.adminService.get_all_applications().subscribe(
      data => {
        this.total_applications = data.length;
      },
      err => {
        console.log(err.error.message);
      }
    );

    this.adminService.get_all_offers().subscribe(
      data => {

        this.offers = data.filter(function (offer) {
          return (offer.isApproved == true);
        });

        this.offers.forEach((elem) => {
            var index = elem.createdDate.indexOf('T');
            elem.createdDate = elem.createdDate.substring(0, index);
            elem.startDate = elem.startDate.substring(0, index);
            elem.endDate = elem.endDate.substring(0, index);

            elem.createdDate = elem.createdDate.split("-").reverse().join("/");
            elem.startDate = elem.startDate.split("-").reverse().join("/");
            elem.endDate = elem.endDate.split("-").reverse().join("/");
  
        });

        console.log(this.offers);

        this.total_offers = this.offers.length;
      },
      err => {
        console.log(err.error.message);
      }
    );

  }

}
