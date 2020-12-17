import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading: boolean = true;

  constructor(
    private renderer: EmojiCanvasRendererService,
    private snackBar: MatSnackBar
  ) {
    window.onload = () => {
      const canvas: HTMLCanvasElement = document.getElementById(
        'sprite-map'
      ) as HTMLCanvasElement;

      this.renderer.renderSpriteMap(canvas);
      this.loading = false;
    };
  }

  copy() {
    const rendered: HTMLCanvasElement = document.getElementById(
      'rendered-image'
    ) as HTMLCanvasElement;

    rendered.toBlob((blob) => {
      // @ts-ignore
      const item = new ClipboardItem({ 'image/png': blob });
      (navigator as any).clipboard.write([item]);
    });

    this.snackBar.open('Copied!', '', {
      duration: 1500,
    });
  }

  reset() {
    const scaledRender: HTMLCanvasElement = document.getElementById(
      'scaled-image'
    ) as HTMLCanvasElement;

    const context = scaledRender.getContext('2d');
    context?.clearRect(0, 0, 500, 500);

    this.rendered = false;
    this.rendering = false;
  }

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

      const spriteMap: HTMLCanvasElement = document.getElementById(
        'sprite-map'
      ) as HTMLCanvasElement;

      const scaledRender: HTMLCanvasElement = document.getElementById(
        'scaled-image'
      ) as HTMLCanvasElement;

      if (image) {
        const imageBase64 = FileManagerService.bufferToBase64Image(buffer);
        image.src = `data:image/png;base64,${imageBase64}`;
        image.onload = () => {
          ImageResizeService.resizeImage(image, canvas).then(() => {
            this.renderer.render(canvas, rendered, spriteMap, scaledRender);
            this.rendering = false;
            this.rendered = true;
          });
        };
      } else {
        // What the fuck?
        throw 'What the fuck?';
      }
    });
  }
}
