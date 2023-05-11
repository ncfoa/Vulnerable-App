import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  isCvFailed = false;
  userdata: any = {} ;
  skills: [];
  languages: [];
  hobbies: [];

  isCandidateLoggedIn = false;

  cvForm: FormGroup;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private router: Router) { }

  
  
  ngOnInit(): void {

      this.isCandidateLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());

      if (this.userdata.isActive) { this.router.navigate(['candidate']); }

      this.cvForm = this.fb.group({
        address: null,
        age: null,
        bio: null,
        phoneNumber: null,
        educations: this.fb.array([this.fb.group({
          degree: null,
          school: null,
          startDate: null,
          endDate: null})]),
        experiences: this.fb.array([this.fb.group({
            title: null,
            company: null,
            startDate: null,
            endDate: null,
            description: null})]),
        skills: this.fb.array([this.fb.group({
            name: null,
            value: null
        })]),
        languages: this.fb.array([this.fb.control[0]]),
        hobbies: this.fb.array([this.fb.control[0]]),
        socialLinks: this.fb.array([this.fb.group({
          facebook: null,
          linkedin: null,
          github: null})])
      })
   

  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  get myEducations() {
    return this.cvForm.get('educations') as FormArray;
  }
  get myExperiences() {
    return this.cvForm.get('experiences') as FormArray;
  }

  get mySkills() {
    return this.cvForm.get('skills') as FormArray;
  }

  get myLanguages() {
    return this.cvForm.get('languages') as FormArray;
  }

  get myHobbies() {
    return this.cvForm.get('hobbies') as FormArray;
  }

  get myLinks() {
    return this.cvForm.get('socialLinks') as FormArray;
  }

  addEducation() {
    this.myEducations.push(this.fb.group({
      degree: '',
      school: '',
      startDate: '',
      endDate: ''}));
  }

  deleteEducation(index) {
    this.myEducations.removeAt(index);
  }

  addExperience() {
    this.myExperiences.push(this.fb.group({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''}));
  }

  deleteExperience(index) {
    this.myExperiences.removeAt(index);
  }

  addSkill() {
    this.mySkills.push(this.fb.group({
      name: '',
      value: ''}));
  }

  deleteSkill(index) {
    this.mySkills.removeAt(index);
  }

  addLanguage() {
    this.myLanguages.push(this.fb.control(''));
  }

  deleteLanguage(index) {
    this.myLanguages.removeAt(index);
  }

  addHobbie() {
    this.myHobbies.push(this.fb.control(''));
  }

  deleteHobbie(index) {
    this.myHobbies.removeAt(index);
  }

  onSubmit(): void {

    this.userdata = JSON.parse(this.tokenStorage.getUser());
    var myform = this.cvForm.value;
    
    myform["_id"] = this.userdata.id;

    console.log(myform);

    this.userService.create_cv(myform).subscribe(
      data => {

        data["accessToken"]= this.tokenStorage.getToken();
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isCvFailed = false;
  
        setTimeout( function(){ 
          this.reloadPage();
          }, 10000);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isCvFailed = true;

      }
    );

  }

  reloadPage(): void {
    this.router.navigate(['candidate'])
    .then(() => {
    window.location.reload();
    });
  
  }

}
