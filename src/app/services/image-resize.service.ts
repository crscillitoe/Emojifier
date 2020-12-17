import { Injectable } from '@angular/core';
import * as pica from 'pica';

@Injectable({
  providedIn: 'root',
})
export class ImageResizeService {
  static resizeImage(
    from: HTMLImageElement,
    to: HTMLCanvasElement
  ): Promise<HTMLCanvasElement> {
    const resizer = new pica();
    return resizer.resize(from, to);
  }
}
