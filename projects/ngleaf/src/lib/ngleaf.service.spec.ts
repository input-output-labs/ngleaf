import { TestBed } from '@angular/core/testing';

import { NgleafService } from './ngleaf.service';

describe('NgleafService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgleafService = TestBed.get(NgleafService);
    expect(service).toBeTruthy();
  });
});
