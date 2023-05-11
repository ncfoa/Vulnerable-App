import { TestBed } from '@angular/core/testing';

import { AuthGuardRecruiterService } from './auth-guard-recruiter.service';

describe('AuthGuardRecruiterService', () => {
  let service: AuthGuardRecruiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardRecruiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
