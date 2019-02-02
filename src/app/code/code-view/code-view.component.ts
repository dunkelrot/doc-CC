import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CodeSegment, CodeSegmentEntry} from '../../_shared/code';
import {CodeService} from '../../_shared/code-service';
import {CodeSegmentComponent} from '../code-segment/code-segment.component';
import {AlertService} from '../../_shared/alert-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css']
})
export class CodeViewComponent implements OnInit {

  codeSegments: CodeSegment[] = [];
  documentCode = '';

  @ViewChildren(CodeSegmentComponent) codeSegmentComponents: QueryList<CodeSegmentComponent>;

  constructor(private codeService: CodeService, private alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.codeService.getCodesForProjectTEST(params['id']).subscribe((result) => {
      this.codeSegments = result;
    }, error1 => {
      this.alertService.handleError(error1);
    });
  }

  onCodeSelected(code: CodeSegmentEntry) {
    code.filterDefinitons.forEach((filterDef) => {
      this.codeSegmentComponents.forEach((component) => {
        if (component.codeSegment.name === filterDef.targetSegmentName) {
          component.applyFilter(filterDef);
        }
      });
    });

    const codes = new Array<string>();
    this.codeSegmentComponents.forEach((component) => {
      codes.push(component.getSelectedCode());
    });
    this.documentCode = codes.join('-');
  }

  onCopy() {
    this.codeService.sendBeacon().subscribe(() => {
      // response is ignored
    });

    const el = document.createElement('textarea');
    el.value = this.documentCode;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
