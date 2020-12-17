import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AllTheSvgsComponent } from './all-the-svgs/all-the-svgs.component';
@NgModule({
  declarations: [AppComponent, AllTheSvgsComponent],
  imports: [BrowserModule, AppRoutingModule, MatIconModule, NgxDropzoneModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
