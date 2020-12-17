import { TestBed } from '@angular/core/testing';

import { EmojiCanvasRendererService } from './emoji-canvas-renderer.service';

describe('EmojiCanvasRendererService', () => {
  let service: EmojiCanvasRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiCanvasRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
