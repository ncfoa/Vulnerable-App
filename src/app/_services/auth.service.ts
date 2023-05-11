import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  candidate_login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'candidate_signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  recruiter_login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'recruiter_signin', {
      email: credentials.companyEmail,
      password: credentials.password
    }, httpOptions);
  }

  admin_login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'admin_signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register_candidate(user): Observable<any> {
    return this.http.post(AUTH_API + 'candidate_signup', {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  register_recruiter(recruiter): Observable<any> {
    return this.http.post(AUTH_API + 'recruiter_signup', {
      companyName: recruiter.companyName,
      companyEmail: recruiter.companyEmail,
      address: recruiter.address,
      city: recruiter.city,
      province: recruiter.province,
      country: recruiter.country,
      password: recruiter.password
    }, httpOptions);
  }
}
