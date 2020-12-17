import { Injectable } from '@angular/core';
import { dictionary, RGBImage } from './constants/emoji-dictionary';
import { EmojiMapperService, RGB } from './emoji-mapper.service';
import { ImageResizeService } from './image-resize.service';

@Injectable({
  providedIn: 'root',
})
export class EmojiCanvasRendererService {
  constructor(private emojiMapper: EmojiMapperService) {}

  renderSpriteMap(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw 'Unable to get rendering context';
    }

    let img = new Image();
    img.src = `/assets/sprite-map.png`;
    context.drawImage(img, 0, 0, 1000, 1000);
  }

  render(
    toConvert: HTMLCanvasElement,
    toRender: HTMLCanvasElement,
    spriteMap: HTMLCanvasElement,
    scaledRender: HTMLCanvasElement
  ) {
    const baseWidth = toConvert.width;
    const baseHeight = toConvert.height;
    const emojiScale = 20;

    const convertContext = toConvert.getContext('2d');
    const context = toRender.getContext('2d');
    const spriteContext = spriteMap.getContext('2d');
    if (!context || !convertContext || !spriteContext) {
      throw 'Unable to get rendering context';
    }

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
        const imageData = spriteContext.getImageData(
          emoji.x * emojiScale,
          emoji.y * emojiScale,
          emojiScale,
          emojiScale
        );
        context.putImageData(
          imageData,
          x * emojiScale,
          y * emojiScale,
          0,
          0,
          emojiScale,
          emojiScale
        );
      }
    }

    ImageResizeService.resizeImage(toRender, scaledRender);
  }
}
