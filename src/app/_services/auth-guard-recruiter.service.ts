import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardRecruiterService implements CanActivate{

  constructor(public router: Router, private tokenStorage: TokenStorageService) { }
  
  canActivate(): boolean {
    
    if (this.tokenStorage.getToken() && this.tokenStorage.getRole() == "Recruiter") { 
      /*this.router.navigate(['candidate/login']);
      return false;*/
      return true;
    }
  else {
    this.router.navigate(['recruiter/login']);
    return false;
  }

  }
}
