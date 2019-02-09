import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../_shared/project';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Project;

  iconURL = null;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.project.icon !== null) {
      this.iconURL = environment.server + '/' + environment.assets;
    }
  }

  onDocumentCoding() {
    this.router.navigate(['/project', this.project.id]);
  }

}
