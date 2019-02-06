import {Component, ComponentFactoryResolver, Directive, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CodeField, CodeList, CodeSegment, CodeSegmentComponentItf, CodeSegmentEntry} from '../../_shared/code';
import {CodeService} from '../../_shared/code-service';
import {CodeSegmentComponent} from '../code-segment/code-segment.component';
import {AlertService} from '../../_shared/alert-service';
import {ActivatedRoute} from '@angular/router';
import {CodeListComponent} from '../code-list/code-list.component';
import {CodeFieldComponent} from '../code-field/code-field.component';
import {CodeSegmentListDirective} from '../../_directives/code-segment-list.directive';

@Directive({selector: '.code-segment'})
export class CodeSegmentDirective {
}

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css']
})
export class CodeViewComponent implements OnInit {

  @ViewChild(CodeSegmentListDirective) codeSegmentList: CodeSegmentListDirective;

  codeSegmentComponents = new Array<CodeSegmentComponentItf>();

  codeSegments: CodeSegment[] = null;
  documentCode = '';
  codeOk = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private codeService: CodeService,
              private alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.codeService.getCodesForProjectTEST(params['id']).subscribe((result) => {
      this.codeSegments = result;
      this.loadCodeSegments();
    }, error1 => {
      this.alertService.handleError(error1);
    });
  }

  onCodeSelected(code: CodeSegmentEntry|string) {
    if (code instanceof CodeSegmentEntry) {
      code.filterDefinitons.forEach((filterDef) => {
        this.codeSegmentComponents.forEach((component) => {
          const codeSegmentItf: CodeSegmentComponentItf = <CodeSegmentComponentItf>component;
          if (codeSegmentItf.name === filterDef.targetSegmentName) {
            codeSegmentItf.applyFilter(filterDef);
          }
        });
      });
    }

    const codes = new Array<string>();
    this.codeOk = true;
    this.codeSegmentComponents.forEach((component) => {
      const codeSegmentItf: CodeSegmentComponentItf = <CodeSegmentComponentItf> component;
      codes.push(codeSegmentItf.getSelectedValue());
      this.codeOk = this.codeOk && codeSegmentItf.hasSelectedValue();
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

  loadCodeSegments() {
    const viewContainerRef = this.codeSegmentList.viewContainerRef;
    viewContainerRef.clear();

    this.codeSegments.forEach((codeSegment) => {
      if (codeSegment instanceof CodeList) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CodeListComponent);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<CodeListComponent>componentRef.instance).codeList = codeSegment;
        (<CodeListComponent>componentRef.instance).valueSelected.subscribe((code: CodeSegmentEntry) => {
          this.onCodeSelected(code);
        });
        this.codeSegmentComponents.push(<CodeSegmentComponentItf> componentRef.instance);
      }
      if (codeSegment instanceof CodeField) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CodeFieldComponent);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<CodeFieldComponent>componentRef.instance).codeField = codeSegment;
        (<CodeFieldComponent>componentRef.instance).valueSelected.subscribe((code: CodeSegmentEntry) => {
          this.onCodeSelected(code);
        });
        this.codeSegmentComponents.push(<CodeSegmentComponentItf> componentRef.instance);
      }
    });
  }
}
