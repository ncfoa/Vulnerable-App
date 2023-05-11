import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRecruiterComponent } from './board-recruiter.component';

describe('BoardRecruiterComponent', () => {
  let component: BoardRecruiterComponent;
  let fixture: ComponentFixture<BoardRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardRecruiterComponent ],
      providers: [ BoardRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
