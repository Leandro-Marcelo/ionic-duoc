import { TestBed } from '@angular/core/testing';

import { StorePostService } from './store-post.service';

describe('StorePostService', () => {
  let service: StorePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
