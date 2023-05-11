import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.css']
})
export class EditCvComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  isCvFailed = false;

  userdata: any = {} ;

  isCandidateLoggedIn = false;

  cvForm: FormGroup;

  

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

      this.isCandidateLoggedIn = true;
      this.userdata = JSON.parse(this.tokenStorage.getUser());

      this.cvForm = this.fb.group({
        address: this.userdata.address,
        age: this.userdata.age,
        bio: this.userdata.bio,
        phoneNumber: this.userdata.phoneNumber,
        educations: this.fb.array(this.userdata.educations.map(edu => this.fb.group({
          degree: [edu.degree],
          school: [edu.school],
          startDate: [edu.startDate],
          endDate: [edu.endDate] }))),
        experiences: this.fb.array(this.userdata.experiences.map(exp => this.fb.group({
            title: exp.title,
            company: exp.company,
            startDate: exp.startDate,
            endDate:  exp.endDate,
            description:  exp.description }))),
        skills: this.fb.array(this.userdata.skills.map(skill => this.fb.group({
            name: skill.name,
            value: skill.value }))),
        languages: this.fb.array(this.userdata.languages),
        hobbies: this.fb.array(this.userdata.hobbies),
        socialLinks: this.fb.array([this.fb.group({
          facebook: this.userdata.socialLinks[0].facebook,
          linkedin: this.userdata.socialLinks[0].linkedin,
          github: this.userdata.socialLinks[0].github})])
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

    this.userService.edit_cv(myform).subscribe(
      data => {
        data["accessToken"]= this.tokenStorage.getToken();
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isCvFailed = false;
        
        setTimeout(()=>this.router.navigate(['/candidate']),2000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isCvFailed = true;

      }
    );

  }

}

