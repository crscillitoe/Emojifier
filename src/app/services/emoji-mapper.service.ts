import { Injectable } from '@angular/core';
import { RGBImage, dictionary } from './constants/emoji-dictionary';

@Injectable({
  providedIn: 'root',
})
export class EmojiMapperService {
  emojiMappings: Map<string, RGBImage>;
  constructor() {
    // Create the map
    this.emojiMappings = new Map<string, RGBImage>();

    for (let r = 0; r < 16; r++) {
      for (let g = 0; g < 16; g++) {
        for (let b = 0; b < 16; b++) {
          const rgb: RGB = {
            red: r,
            green: g,
            blue: b,
          };

          const _8bit = this.toEightBit(rgb);

          const closestEmoji = this.computeClosestEmoji(_8bit);
          this.emojiMappings.set(this.toString(rgb), closestEmoji);
        }
      }
    }

    console.log(this.emojiMappings);
  }

  toString(color: RGB): string {
    return `red: ${color.red}, green: ${color.green}, blue: ${color.blue}`;
  }

  getClosestEmoji(color: RGB): RGBImage {
    const fourBit = this.toFourBit(color);
    const emoji = this.emojiMappings.get(this.toString(fourBit));
    if (emoji) {
      return emoji;
    }

    throw `Dictionary mapping not found for ${fourBit.red} ${fourBit.green} ${fourBit.blue}`;
  }

  computeClosestEmoji(color: RGB): RGBImage {
    let toReturn: RGBImage | null = null;
    let smallestDisance: number = Number.POSITIVE_INFINITY;
    for (const candidate of dictionary) {
      const distanceRed = Math.pow(Math.abs(color.red - candidate.red), 2);
      const distanceGreen = Math.pow(
        Math.abs(color.green - candidate.green),
        2
      );
      const distanceBlue = Math.pow(Math.abs(color.blue - candidate.blue), 2);

      const summation = distanceRed + distanceGreen + distanceBlue;
      if (summation < smallestDisance) {
        smallestDisance = summation;
        toReturn = candidate;
      }
    }

    if (!toReturn) {
      throw `Unable to find closest emoji to ${color}`;
    }

    return toReturn;
  }

  toFourBit(color: RGB): RGB {
    const toReturn: RGB = {
      red: Math.round((color.red * 15) / 255),
      green: Math.round((color.green * 15) / 255),
      blue: Math.round((color.blue * 15) / 255),
    };

    return toReturn;
  }

  toEightBit(color: RGB): RGB {
    const toReturn: RGB = {
      red: Math.round((color.red * 255) / 15),
      green: Math.round((color.green * 255) / 15),
      blue: Math.round((color.blue * 255) / 15),
    };

    return toReturn;
  }
}

export interface RGB {
  red: number;
  green: number;
  blue: number;
}
