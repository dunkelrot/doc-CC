import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CodeSegmentComponentItf, CodeSegmentEntry, CodeSegmentFactory, CodeSegmentFilterDefinition} from '../../_shared/code';
import {MatSelectChange} from '@angular/material';
import {AlertService} from '../../_shared/alert-service';

@Component({
  selector: 'app-code-segment',
  templateUrl: './code-segment.component.html',
  styleUrls: ['./code-segment.component.css']
})
export class CodeSegmentComponent implements OnInit, OnChanges {


  constructor(private alertService: AlertService) { }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  onSelectCode(selection: MatSelectChange) {
  }

}
