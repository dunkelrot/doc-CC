import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  constructor() {
  }

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, stack: string) {
    this.subject.next({ type: 'error', text: message, stack: stack });
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        this.subject.next({ type: 'error', text: error.error.message});
      } else if (error.error instanceof ProgressEvent) {
        this.subject.next({ type: 'error', text: error.message});
      } else {
        this.subject.next({ type: 'error', text: `${error.error} - ${error.status}`});
      }
    } else {
      this.error(error.message, error.stack);
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
