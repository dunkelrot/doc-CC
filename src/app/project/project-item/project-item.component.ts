import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../_shared/project';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Project;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onDocumentCoding() {
    this.router.navigate(['/project', this.project.id]);
  }

}
