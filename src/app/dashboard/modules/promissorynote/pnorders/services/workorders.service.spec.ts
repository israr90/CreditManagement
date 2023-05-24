import { TestBed } from '@angular/core/testing';
import { WorkOdersService } from './workorders.service';


describe('WorkOdersService', () => {
  let service: WorkOdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkOdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
