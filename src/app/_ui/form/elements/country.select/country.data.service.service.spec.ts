import { TestBed } from '@angular/core/testing';

import { Country.Data.ServiceService } from './country.data.service.service';

describe('Country.Data.ServiceService', () => {
  let service: Country.Data.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Country.Data.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
