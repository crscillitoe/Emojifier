import { Injectable } from '@angular/core';
import { EmojiMapperService, RGB } from './emoji-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class EmojiCanvasRendererService {
  constructor(private emojiMapper: EmojiMapperService) {}
  render(toConvert: HTMLCanvasElement, toRender: HTMLCanvasElement) {
    const baseWidth = toConvert.width;
    const baseHeight = toConvert.height;
    const emojiScale = 10;

    const convertContext = toConvert.getContext('2d');
    const context = toRender.getContext('2d');
    if (!context || !convertContext) {
      throw 'Unable to get rendering context';
    }

    context.globalAlpha = 1;

    for (let x = 0; x < baseWidth; x++) {
      for (let y = 0; y < baseHeight; y++) {
        let img = new Image();
        const pixel = convertContext.getImageData(x, y, 1, 1).data;
        const rgb: RGB = {
          red: pixel[0],
          green: pixel[1],
          blue: pixel[2],
        };
        const emoji = this.emojiMapper.getClosestEmoji(rgb);
        img.src = `/assets/svgs/${emoji}.svg`;
        context.drawImage(
          img,
          x * emojiScale,
          y * emojiScale,
          emojiScale,
          emojiScale
        );
      }
    }
  }
}
