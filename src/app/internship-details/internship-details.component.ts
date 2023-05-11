import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../_services/admin.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-internship-details',
  templateUrl: './internship-details.component.html',
  styleUrls: ['./internship-details.component.css']
})
export class InternshipDetailsComponent implements OnInit {

  sub: any;
	internship: any;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    
      this.sub = this.route.params.subscribe((params) => {
			const id = params['id'];
      
    this.adminService.get_offer_details(id).subscribe(
      data => {

        this.internship = data;

        var index = this.internship.createdDate.indexOf('T');
        this.internship.createdDate = this.internship.createdDate.substring(0, index);
        this.internship.startDate = this.internship.startDate.substring(0, index);
        this.internship.endDate = this.internship.endDate.substring(0, index);

        this.internship.createdDate = this.internship.createdDate.split("-").reverse().join("/");
        this.internship.startDate = this.internship.startDate.split("-").reverse().join("/");
        this.internship.endDate = this.internship.endDate.split("-").reverse().join("/");
       
      },
      err => {
        console.log(err.error.message);
      }
    );

		});


  }

}
