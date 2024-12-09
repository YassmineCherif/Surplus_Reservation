import { TestBed } from '@angular/core/testing';

import { NumSerieService } from './numserie.service';

describe('NumSerieService', () => {
  let service: NumSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
