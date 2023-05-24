import { TestBed } from '@angular/core/testing';
import { CmSetupService } from './cmsetup.service';


describe('WorkOdersService', () => {
  let service: CmSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
