import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCandidateComponent } from './board-candidate.component';

describe('BoardCandidateComponent', () => {
  let component: BoardCandidateComponent;
  let fixture: ComponentFixture<BoardCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
