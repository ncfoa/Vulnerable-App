import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/candidate/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  change_password(user): Observable<any> {
    return this.http.post(API_URL + 'change_password', {
      _id: user._id,
      oldPass: user.oldPass,
      newPass: user.newPass
    }, httpOptions);
  }

  create_cv(user): Observable<any> {
    return this.http.post(API_URL + 'create_cv', {
      _id: user._id,
      address: user.address,
		  age: user.age,
		  bio: user.bio,
		  phoneNumber: user.phoneNumber,
		  experiences: user.experiences,
		  educations: user.educations,
		  skills: user.skills,
		  languages: user.languages,
		  hobbies: user.hobbies,
		  socialLinks: user.socialLinks
    }, httpOptions);
  }

  edit_cv(user): Observable<any> {
    return this.http.post(API_URL + 'edit_cv', {
      _id: user._id,
      address: user.address,
		  age: user.age,
		  bio: user.bio,
		  phoneNumber: user.phoneNumber,
		  experiences: user.experiences,
		  educations: user.educations,
		  skills: user.skills,
		  languages: user.languages,
		  hobbies: user.hobbies,
		  socialLinks: user.socialLinks
    }, httpOptions);
  }

  get_applications(id): Observable<any> {
    return this.http.post(API_URL + 'get_applications', {
      _id: id
    }, httpOptions);
  }

  get_profile(id): Observable<any> {
    return this.http.post(API_URL + 'get_profile', {
      _id: id
    }, httpOptions);
  }


}
