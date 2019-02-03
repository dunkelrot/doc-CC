import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CodeSegmentComponent } from './code/code-segment/code-segment.component';
import { CodeViewComponent } from './code/code-view/code-view.component';
import {CodeService} from './_shared/code-service';
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
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


@NgModule({
  declarations: [
    AppComponent,
    CodeSegmentComponent,
    CodeViewComponent,
    HomeComponent,
    AlertComponent,
    ProjectListComponent,
    ProjectItemComponent,
    AboutComponent
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
    MatCardModule
  ],
  providers: [
    CodeService,
    AlertService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
