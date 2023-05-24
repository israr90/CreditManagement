import { TestBed } from '@angular/core/testing';

import { AutoCloseService } from './auto-close.service';

describe('AutoCloseService', () => {
  let service: AutoCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
