import { TestBed } from '@angular/core/testing';

import { CurrencyInformantService } from './currency-informant.service';

describe('CurrencyInformantService', () => {
  let service: CurrencyInformantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyInformantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
