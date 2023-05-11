import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-board-recruiter',
  templateUrl: './board-recruiter.component.html',
  styleUrls: ['./board-recruiter.component.css']
})
export class BoardRecruiterComponent implements OnInit {

  isRecruiterLoggedIn = false;
  userdata: any = {} ;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") {
      this.isRecruiterLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());
    }

  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
