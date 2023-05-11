import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordRecruiterComponent } from './change-password-recruiter.component';

describe('ChangePasswordRecruiterComponent', () => {
  let component: ChangePasswordRecruiterComponent;
  let fixture: ComponentFixture<ChangePasswordRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
