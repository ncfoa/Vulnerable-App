import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecruitersComponent } from './manage-recruiters.component';

describe('ManageRecruitersComponent', () => {
  let component: ManageRecruitersComponent;
  let fixture: ComponentFixture<ManageRecruitersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRecruitersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRecruitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
