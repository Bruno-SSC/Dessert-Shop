import { TestBed } from '@angular/core/testing';

import { KeyNavigationService } from './key-navigation.service';

describe('KeyNavigationService', () => {
  let service: KeyNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
