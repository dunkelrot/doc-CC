import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { testData_Help } from './test-data';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private subject = new Subject<any>();

  private api = environment.server + environment.api;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getHelpTopicById(id: string): Observable<string> {
    return this.http.get(this.api + '/help/' + id).pipe(
      map((rawData: any) => {
        return rawData;
      })
    );
  }

  showHelpTopicById(id: string) {
    this.getHelpTopicById(id).subscribe((helpTopic) => {
      this.subject.next(helpTopic);
    });
  }

  showHelpTopicByIdTEST(id: string) {
    this.subject.next(testData_Help);
  }

  getHelpTopic(): Observable<string> {
    return this.subject.asObservable();
  }

}


