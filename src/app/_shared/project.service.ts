import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, delay, map, retry} from 'rxjs/operators';
import {testData_Projects} from './test-data';
import {ProjectFactory, ProjectList} from './project';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class ProjectService {

  private beacon = environment.beaconServer;
  private api = environment.server + environment.api;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  private static errorHandler(error: Error | any) {
    return throwError(error);
  }

  getProjects(): Observable<ProjectList> {
    const url = `${this.api}/projects`;
    return this.http.get(url).pipe(
      retry(3),
      map((rawData: any) => ProjectFactory.buildProjectList(rawData)),
      catchError(ProjectService.errorHandler)
    );
  }

  getProjectsTEST(): Observable<ProjectList> {
    try {
      const projects = ProjectFactory.buildProjectList(testData_Projects);
      const result = of(projects);
      return result.pipe(
        delay(1000),
      );
    } catch (error) {
      return throwError(error);
    }
  }

}
