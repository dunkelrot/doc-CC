import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CodeSegmentComponent } from './code/code-segment/code-segment.component';
import {CodeSegmentDirective, CodeViewComponent} from './code/code-view/code-view.component';
import {CodeService} from './_shared/code-service';
import {
  MatButtonModule, MatCardModule,
  MatIconModule, MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './_shared/alert-service';
import {routing} from './app.routing';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectItemComponent } from './project/project-item/project-item.component';
import {ProjectService} from './_shared/project-service';
import { AboutComponent } from './home/about/about.component';
import { CodeFieldComponent } from './code/code-field/code-field.component';
import { CodeListComponent } from './code/code-list/code-list.component';
import { CodeSegmentListDirective } from './_directives/code-segment-list.directive';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CodeSegmentComponent,
    CodeViewComponent,
    HomeComponent,
    AlertComponent,
    ProjectListComponent,
    ProjectItemComponent,
    AboutComponent,
    CodeFieldComponent,
    CodeListComponent,
    CodeSegmentListDirective,
    CodeSegmentDirective
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    CodeService,
    AlertService,
    ProjectService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ CodeListComponent, CodeFieldComponent],
})
export class AppModule { }
