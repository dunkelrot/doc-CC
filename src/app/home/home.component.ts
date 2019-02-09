import {Component, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  version: '';

  mailAddress = environment.mailAddress;

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.version = environment.VERSION;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


