import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { Component } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { EmojiCanvasRendererService } from './services/emoji-canvas-renderer.service';
import { EmojiMapperService } from './services/emoji-mapper.service';
import { FileManagerService } from './services/file-manager.service';
import { ImageResizeService } from './services/image-resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Emojifier';
  rendering: boolean = false;
  rendered: boolean = false;

  constructor(private renderer: EmojiCanvasRendererService) {}

  onSelect(event: NgxDropzoneChangeEvent) {
    this.rendering = true;
    const file = event.addedFiles[0];
    file.arrayBuffer().then((buffer: ArrayBuffer) => {
      const image: HTMLImageElement = document.getElementById(
        'image'
      ) as HTMLImageElement;

      const canvas: HTMLCanvasElement = document.getElementById(
        'canvas'
      ) as HTMLCanvasElement;

      const rendered: HTMLCanvasElement = document.getElementById(
        'rendered-image'
      ) as HTMLCanvasElement;

      if (image) {
        const imageBase64 = FileManagerService.bufferToBase64Image(buffer);
        image.src = `data:image/png;base64,${imageBase64}`;
        image.onload = () => {
          ImageResizeService.resizeImage(image, canvas);
          this.renderer.render(canvas, rendered);
          this.rendering = false;
          this.rendered = true;
        };
      } else {
        // What the fuck?
        throw 'What the fuck?';
      }
    });
  }
}
