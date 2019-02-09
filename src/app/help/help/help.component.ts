import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../_shared/help.service';
import { AlertService } from '../../_shared/alert.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),

      transition(':enter', [
        style({opacity: 0}),
        animate(400 )
      ]),

      transition(':leave',
        animate(200, style({opacity: 0})))
    ])
  ]
})
export class HelpComponent implements OnInit {

  content: string = null;

  constructor(private helpService: HelpService, private alertService: AlertService) { }

  ngOnInit() {
    this.helpService.getHelpTopic().subscribe((result: any) => {
      this.content = result.text;
    }, error => {
      this.alertService.handleError(error);
    });
  }

  onClose() {
    this.content = null;
  }

}
