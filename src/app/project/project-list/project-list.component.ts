import { Component, OnInit } from '@angular/core';
import {ProjectList} from '../../_shared/project';
import {ProjectService} from '../../_shared/project.service';
import {AlertService} from '../../_shared/alert.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projectList: ProjectList = null;

  constructor( private projectService: ProjectService, private alertService: AlertService) { }

  ngOnInit() {
    this.projectService.getProjectsTEST().subscribe((result) => {
      this.projectList = result;
    }, error1 => {
      this.alertService.handleError(error1);
    });
  }



}
