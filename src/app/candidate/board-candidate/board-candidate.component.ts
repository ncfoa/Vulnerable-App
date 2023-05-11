import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../../_services/token-storage.service';
import { UserService } from './../../_services/user.service';

@Component({
  selector: 'app-board-candidate',
  templateUrl: './board-candidate.component.html',
  styleUrls: ['./board-candidate.component.css']
})
export class BoardCandidateComponent implements OnInit {

  isCandidateLoggedIn = false;
  userdata: any = {} ;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.isCandidateLoggedIn = true;
    this.userdata = JSON.parse(this.tokenStorage.getUser());


  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
