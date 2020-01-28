import { TestBed } from '@angular/core/testing';

import { PostmanCallService } from './postman-call.service';

describe('PostmanCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostmanCallService = TestBed.get(PostmanCallService);
    expect(service).toBeTruthy();
  });
});
