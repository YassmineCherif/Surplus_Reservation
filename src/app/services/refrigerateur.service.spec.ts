import { TestBed } from '@angular/core/testing';

import { RefrigerateurService } from './refrigerateur.service';

describe('RefrigerateurService', () => {
  let service: RefrigerateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrigerateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
