import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CodeSegmentEntry, CodeSegmentFactory, CodeSegmentFilter, CodeSegmentFilterDefinition} from '../../_shared/code';
import {MatSelectChange} from '@angular/material';
import {AlertService} from '../../_shared/alert-service';

@Component({
  selector: 'app-code-segment',
  templateUrl: './code-segment.component.html',
  styleUrls: ['./code-segment.component.css']
})
export class CodeSegmentComponent implements OnInit, OnChanges {

  @Input() codeSegment = CodeSegmentFactory.buildEmptyCodeSegment();
  @Output() codeSelected = new EventEmitter<CodeSegmentEntry>();

  selectedCode: CodeSegmentEntry = null;
  filteredCodes: CodeSegmentEntry[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    if (this.codeSegment.fixed) {
      if (this.codeSegment.entries.length === 1) {
        this.selectedCode = this.codeSegment.entries[0];
      } else {
        this.alertService.error('Wrong configuration: No or more than one entry for the fixed code segment ' +
          this.codeSegment.name, undefined);
      }
    }
  }

  ngOnChanges() {
    this.filteredCodes = [];
    this.codeSegment.entries.forEach((entry) => {
      if (this.codeSegment.filters.hasId(entry.id)) {
        this.filteredCodes.push(entry);
      }
    });
  }

  onSelectCode(selection: MatSelectChange) {
    this.selectedCode = selection.value;
    this.codeSelected.emit(selection.value);
  }

  applyFilter(filterDefinition: CodeSegmentFilterDefinition) {
    this.filteredCodes = [];
    this.codeSegment.filters.applyFilterDefinition(filterDefinition);
    this.codeSegment.entries.forEach((entry) => {
      if (this.codeSegment.filters.hasId(entry.id)) {
        this.filteredCodes.push(entry);
      }
    });
  }

  getSelectedCode(): string {
    if (this.selectedCode === null) {
      return '...';
    } else {
      return this.selectedCode.value;
    }
  }

}
