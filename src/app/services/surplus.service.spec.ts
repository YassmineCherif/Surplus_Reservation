import { TestBed } from '@angular/core/testing';
import { SurplusService } from './SurplusService';

 
describe('OperationService', () => {
  let service: SurplusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
