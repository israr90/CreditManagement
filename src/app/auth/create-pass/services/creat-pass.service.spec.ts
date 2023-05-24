import { TestBed } from '@angular/core/testing';

import { CreatPassService } from './creat-pass.service';

describe('CreatPassService', () => {
  let service: CreatPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
