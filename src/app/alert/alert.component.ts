import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_shared/alert.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  stack: any;
  mailMessage: any;

  mailAddress = environment.mailAddress;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      this.mailMessage = message.text;

      if (message.stack !== undefined) {
          this.stack = message.stack;
          this.mailMessage = this.mailMessage + ' +++ ' + message.stack;
      }
    });
  }

  onClose() {
    this.mailMessage = '';
    this.message = undefined;
    this.stack = undefined;
  }
}
