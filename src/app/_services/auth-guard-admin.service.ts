import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(public router: Router, private tokenStorage: TokenStorageService) { }
  
  canActivate(): boolean {
    
    if (this.tokenStorage.getToken() && JSON.parse(this.tokenStorage.getUser()).role == "admin") { 
      return true;
    }
  else {
    this.router.navigate(['admin/login']);
    return false;
  }

  }
}