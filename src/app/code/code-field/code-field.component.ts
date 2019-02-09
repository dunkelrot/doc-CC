import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CodeSegmentComponentItf, CodeSegmentEntry, CodeSegmentFactory, CodeListFilterDefinition} from '../../_shared/code';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import { HelpService } from '../../_shared/help.service';

/** Error when invalid control */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid);
  }
}

@Component({
  selector: 'app-code-field',
  templateUrl: './code-field.component.html',
  styleUrls: ['./code-field.component.css']
})
export class CodeFieldComponent implements OnInit, CodeSegmentComponentItf {

  @Input() codeField = CodeSegmentFactory.buildEmptyCodeField();
  @Output() valueSelected = new EventEmitter<CodeSegmentEntry|string>();

  value = null;
  valueFormControl = new FormControl('', []);
  matcher = new MyErrorStateMatcher();

  constructor(private helpService: HelpService) { }

  ngOnInit() {
    const validators = [Validators.pattern(this.codeField.pattern)];
    if (this.codeField.required) {
      validators.push(Validators.required);
    }
    this.valueFormControl.setValidators(validators);
  }

  applyFilter(filterDef: CodeListFilterDefinition): void {
  }

  getValue(): string {
    return this.value;
  }

  isValid(): boolean {
    const result = this.matcher.isErrorState(this.valueFormControl, null);
    return !result;
  }

  get name() {
    return this.codeField.name;
  }

  onValueChanged() {
    this.valueSelected.emit(this.value);
  }

  onHelp() {
    this.helpService.showHelpTopicByIdTEST('123');
  }

}
