import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  change_password(user): Observable<any> {
    return this.http.post(API_URL + 'change_password', {
      _id: user._id,
      oldPass: user.oldPass,
      newPass: user.newPass
    }, httpOptions);
  }
  
  approve_offer(offer): Observable<any> {
    return this.http.post(API_URL + 'offers/approve_offer', {
      _id: offer._id
    }, httpOptions);
  }

  delete_offer(offer): Observable<any> {
    return this.http.post(API_URL + 'offers/delete_offer', {
      _id: offer._id
    }, httpOptions);
  }

  get_all_offers(): Observable<any> {
    return this.http.post(API_URL + 'offers/get_all_offers', {
    }, httpOptions);
  }

  get_offer_details(id): Observable<any> {
    return this.http.post(API_URL + 'offers/get_offer_details', {
      _id: id
    }, httpOptions);
  }

  get_candidates(): Observable<any> {
    return this.http.post(API_URL + 'get_candidates', {
    }, httpOptions);
  }

  get_recruiters(): Observable<any> {
    return this.http.post(API_URL + 'get_recruiters', {
    }, httpOptions);
  }

  delete_candidate(candidate): Observable<any> {
    return this.http.post(API_URL + 'delete_candidate', {
      _id: candidate._id
    }, httpOptions);
  }

  delete_recruiter(recruiter): Observable<any> {
    return this.http.post(API_URL + 'delete_recruiter', {
      _id: recruiter._id
    }, httpOptions);
  }

  get_all_applications(): Observable<any> {
    return this.http.post(API_URL + 'applications/get_all_applications', {
    }, httpOptions);
  }

}
