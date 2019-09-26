import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import {
  MatButtonModule,
  MatRippleModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatProgressBarModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Components
import { FormComponent } from './components/form/form.component';
import { DisplayComponent } from './components/display/display.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressBarModule,
    ScrollingModule
  ],
  declarations: [
    FormComponent,
    DisplayComponent
  ],
  entryComponents: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressBarModule,
    ScrollingModule,
    FormComponent,
    DisplayComponent
  ],
  providers: []
})

export class SharedModule { }
