import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CodeSegmentComponent } from './code/code-segment/code-segment.component';
import { CodeViewComponent } from './code/code-view/code-view.component';
import {CodeService} from './_shared/code-service';
import { MatButtonModule, MatIconModule, MatSelectModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './_shared/alert-service';
import {routing} from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    CodeSegmentComponent,
    CodeViewComponent,
    HomeComponent,
    AlertComponent
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
  ],
  providers: [
    CodeService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
