import { Component, OnInit, Input } from '@angular/core';
import { HelpService } from 'app/_shared/help.service';

@Component({
  selector: 'app-help-icon',
  templateUrl: './help-icon.component.html',
  styleUrls: ['./help-icon.component.css']
})
export class HelpIconComponent implements OnInit {

  @Input() topicId: string = null;

  constructor(private helpService: HelpService) { }

  ngOnInit() {
  }

  onHelp() {
    this.helpService.showHelpTopicByIdTEST(this.topicId);
  }
}
