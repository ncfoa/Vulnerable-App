import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/recruiter/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor(private http: HttpClient) { }

  
  change_password(user): Observable<any> {
    return this.http.post(API_URL + 'change_password', {
      _id: user._id,
      oldPass: user.oldPass,
      newPass: user.newPass
    }, httpOptions);
  }

  edit_profile(user): Observable<any> {
    return this.http.post(API_URL + 'edit_profile', {
      _id: user._id,
      address: user.address,
		  city: user.city,
		  province: user.province,
		  country: user.country,
		  description: user.description,
		  website: user.website
    }, httpOptions);
  }

  create_offer(offer): Observable<any> {
    return this.http.post(API_URL + 'offers/create_offer', {
      title: offer.title,
		  company: offer._id,
		  type: offer.type,
		  category: offer.category,
		  location: offer.location,	
		  startDate: offer.startDate,
		  endDate: offer.endDate,
		  keywords: offer.keywords,
		  description: offer.description
    }, httpOptions);
  }
  
  edit_offer(offer): Observable<any> {
    return this.http.post(API_URL + 'offers/edit_offer', {
      title: offer.title,
		  company: offer._id,
		  type: offer.type,
		  category: offer.category,
		  location: offer.location,	
		  startDate: offer.startDate,
		  endDate: offer.endDate,
		  keywords: offer.keywords,
		  description: offer.description
    }, httpOptions);
  }

  delete_offer(offer): Observable<any> {
    return this.http.post(API_URL + 'offers/delete_offer', {
      _id: offer._id
    }, httpOptions);
  }

  get_offers(recruiter): Observable<any> {
    return this.http.post(API_URL + 'offers/get_offers', {
      _id: recruiter._id
    }, httpOptions);
  }

  get_applications(offer): Observable<any> {
    return this.http.post(API_URL + 'applications/get_applications', {
      _id: offer._id
    }, httpOptions);
  }

  edit_application(application): Observable<any> {
    return this.http.post(API_URL + 'applications/edit_application', {
      _id: application._id,
      status: application.status
    }, httpOptions);
  }

}
