import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[app-code-segment]'
})
export class CodeSegmentListDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
