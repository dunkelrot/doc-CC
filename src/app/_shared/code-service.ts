import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CodeSegment, CodeSegmentFactory} from './code';
import { throwError } from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {map, catchError, retry, delay} from 'rxjs/operators';
import {testData_CodeSegments, testData_Projects} from './test-data';
import {of} from 'rxjs/internal/observable/of';


@Injectable()
export class CodeService {

  private beacon = environment.beaconServer;
  private api = environment.server + environment.api;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  private static errorHandler(error: Error | any) {
    return throwError(error);
  }

  getCodesForProject(projectId: string): Observable<Array<CodeSegment>> {
    const url = `${this.api}/project/${projectId}`;
    return this.http.get(url).pipe(
      retry(3),
      map((rawData: any) => CodeSegmentFactory.buildCodeSegments(rawData)),
      catchError(CodeService.errorHandler));
  }

  getCodesForProjectTEST(projectId: string): Observable<Array<CodeSegment>> {
    const result = of(CodeSegmentFactory.buildCodeSegments(testData_CodeSegments));
    return result.pipe(
      delay(1000)
    );
  }

  sendBeacon(): Observable<any> {
    if (this.beacon !== null) {
      const url = `${this.beacon}`;
      return this.http.get(url).pipe(
        retry(3),
        catchError(CodeService.errorHandler));
    } else {
      return new Observable<any>(subscriber => {
        subscriber.complete();
      });
    }
  }
}
