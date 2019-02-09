import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {CodeSegmentComponentItf, CodeSegmentEntry, CodeSegmentFactory, CodeListFilterDefinition} from '../../_shared/code';
import {MatSelectChange} from '@angular/material';
import {AlertService} from '../../_shared/alert.service';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css']
})
export class CodeListComponent implements OnInit, OnChanges, CodeSegmentComponentItf {

  @Input() codeList = CodeSegmentFactory.buildEmptyCodeList();
  @Output() valueSelected = new EventEmitter<CodeSegmentEntry|string>();

  selectedCode: CodeSegmentEntry = null;
  filteredCodes: CodeSegmentEntry[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    if (this.codeList.fixed) {
      if (this.codeList.entries.length === 1) {
        this.selectedCode = this.codeList.entries[0];
      } else {
        this.alertService.error('Wrong configuration: No or more than one entry for the fixed code segment ' +
          this.codeList.name, undefined);
      }
    }
    this.getFilteredEntries();
  }

  ngOnChanges() {
    this.getFilteredEntries();
  }

  onSelectValue(selection: MatSelectChange) {
    this.selectedCode = selection.value;
    this.valueSelected.emit(selection.value);
  }

  applyFilter(filterDefinition: CodeListFilterDefinition): void {
    this.codeList.filters.applyFilterDefinition(filterDefinition);
    this.getFilteredEntries();
  }

  isValid(): boolean {
    return (this.selectedCode !== null);
  }

  getValue(): string {
    if (this.selectedCode === null) {
      return '...';
    } else {
      return this.selectedCode.value;
    }
  }

  getFilteredEntries() {
    if (this.codeList.filtered) {
      this.filteredCodes = [];
      this.codeList.entries.forEach((entry) => {
        if (this.codeList.filters.hasId(entry.id)) {
          this.filteredCodes.push(entry);
        }
      });
    } else {
      this.filteredCodes = this.codeList.entries;
    }

    // check if the current value is still available
    if (this.selectedCode !== null) {
      let found = false;
      this.filteredCodes.forEach((entry) => {
        if (this.selectedCode.value === entry.value) {
          found = true;
        }
      });

      if (!found) {
        this.selectedCode = null;
      }
    }
  }

  get name() {
    return this.codeList.name;
  }
}
