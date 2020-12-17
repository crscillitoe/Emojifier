import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AllTheSvgsComponent } from './all-the-svgs/all-the-svgs.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, AllTheSvgsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
