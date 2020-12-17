import { TestBed } from '@angular/core/testing';

import { EmojiMapperService } from './emoji-mapper.service';

describe('EmojiMapperService', () => {
  let service: EmojiMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
