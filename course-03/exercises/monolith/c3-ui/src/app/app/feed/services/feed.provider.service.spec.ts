import { TestBed } from '@angular/core/testing';

import { Feed.ProviderService } from './feed.provider.service';

describe('Feed.ProviderService', () => {
  let service: Feed.ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feed.ProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
