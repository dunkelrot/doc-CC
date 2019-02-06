import {EventEmitter, Output} from '@angular/core';

export interface CodeSegmentComponentItf {
  valueSelected: EventEmitter<CodeSegmentEntry|string>;
  name: string;
  getSelectedValue(): string;
  hasSelectedValue(): boolean;
  applyFilter(filterDef: CodeSegmentFilterDefinition): void;
}


export class CodeSegmentFilter {

  constructor(public sourceSegment: string, private allowedIDs: number[]) {
  }

  hasId(id: number): boolean {
    if (this.allowedIDs.length === 0) {
      return true;
    } else {
      if (id !== 0) {
        return this.allowedIDs.includes(id);
      } else {
        return true;
      }
    }
  }
}

export class CodeSegmentFilterList {

  filters: CodeSegmentFilter[] = [];

  constructor(private segment: CodeSegment) {
  }

  applyFilterDefinition(filterDef: CodeSegmentFilterDefinition) {
    this.filters = this.filters.filter((entry) => {
      return entry.sourceSegment !== filterDef.sourceSegment.name;
    });
    this.filters.push(new CodeSegmentFilter(filterDef.sourceSegment.name, filterDef.allowedIDs));
  }

  hasId(id: number) {
    let result = true;
    this.filters.forEach((filter) => {
      result = result && filter.hasId(id);
    });
    return result;
  }
}

export class CodeSegmentFilterDefinition {

  allowedIDs: number[] = [];

  constructor(public sourceSegment: CodeSegment, public targetSegmentName: string) { }

}

export class CodeSegment {
  constructor(public name: string, public displayName: string) { }
}


export class CodeField extends CodeSegment {

  pattern: '';
  constructor(public name: string, public displayName: string) {
    super(name, displayName);
  }
}


export class CodeList extends CodeSegment {
  entries: CodeSegmentEntry[] = [];
  filters: CodeSegmentFilterList;
  fixed = false;

  filtering = true; // avoids that this will affect other segments
  filtered = true; // avoids that entries are filtered

  constructor(public name: string, public displayName: string) {
    super(name, displayName);
    this.filters = new CodeSegmentFilterList(this);
  }

  // adding empty filterDefintions to each entry for ALL
  // segments on the right (of the segment list) makes
  // resetting simple as this is actually the same as applying
  // a filled filterDefiniton
  addEmptyFilterDefinitions(segmentNames: Array<string>) {
    if (this.filtering) {
      this.entries.forEach((entry) => {
        entry.addEmptyFilterDefinitions(segmentNames);
      });
    }
  }
}

export class CodeSegmentEntry {
  segment: CodeSegment;
  name: string;
  value: string;
  id = 0;
  filterDefinitons: CodeSegmentFilterDefinition[] = [];

  addEmptyFilterDefinitions(segmentNames: Array<string>) {
    segmentNames.forEach((segmentName) => {
      let foundFilter = false;
      this.filterDefinitons.forEach((filterDef) => {
        if (filterDef.targetSegmentName === segmentName) {
          foundFilter = true;
        }
      });
      if (foundFilter === false) {
        this.filterDefinitons.push(new CodeSegmentFilterDefinition(this.segment, segmentName));
      }
    });
  }
}

export class CodeSegmentFactory {

  static buildEmptyCodeField(): CodeField {
    return new CodeField('', '');
  }

  static buildEmptyCodeList(): CodeList {
    return new CodeList('', '');
  }

  static buildCodeListFilterDefinition(codeSegment: CodeSegment, json: any): CodeSegmentFilterDefinition {
    const codeSegmentFilterDefinition = new CodeSegmentFilterDefinition(codeSegment, json.segment);
    codeSegmentFilterDefinition.allowedIDs = json.allowedIds;
    return codeSegmentFilterDefinition;
  }

  static buildCodeListEntry(codeSegment: CodeSegment, json: any): CodeSegmentEntry {
    const codeSegmentEntry = new CodeSegmentEntry();
    codeSegmentEntry.segment = codeSegment;
    codeSegmentEntry.name = json.name;
    codeSegmentEntry.value = json.value;

    if (json.id !== undefined) {
      codeSegmentEntry.id = json.id;
    }

    if (json.filters !== undefined) {
      codeSegmentEntry.filterDefinitons = [];
      json.filters.forEach((filter) => {
        codeSegmentEntry.filterDefinitons.push(CodeSegmentFactory.buildCodeListFilterDefinition(codeSegment, filter));
      });
    }
    return codeSegmentEntry;
  }

  static buildCodeField(json: any): CodeField {
    const codeField = new CodeField(json.name, json.displayName);
    codeField.pattern = json.pattern;
    return codeField;
  }

  static buildCodeList(json: any): CodeList {
    const codeList = new CodeList(json.name, json.displayName);
    if (json.fixed !== undefined) {
      codeList.fixed = json.fixed;
    }
    if (json.filtering !== undefined) {
      codeList.filtering = json.filtering;
    }
    if (json.filtered !== undefined) {
      codeList.filtered = json.filtered;
    }

    json.entries.forEach((entry) => {
      codeList.entries.push(CodeSegmentFactory.buildCodeListEntry(codeList, entry));
    });
    return codeList;
  }

  static buildCodeSegments(json: any): Array<CodeSegment> {
    const codeSegments = [];
    json.segments.forEach((entry) => {
      if (entry.type === 'LIST') {
        codeSegments.push(CodeSegmentFactory.buildCodeList(entry));
      } else if (entry.type === 'FIELD') {
        codeSegments.push(CodeSegmentFactory.buildCodeField(entry));
      }
    });

    CodeSegmentFactory.prepareFilterDefinitions(codeSegments);
    return codeSegments;
  }

  static prepareFilterDefinitions(codeSegments: CodeSegment[]) {
    const segmentNameList = Array<string>();

    codeSegments.forEach((codeSegment) => {
      if (codeSegment instanceof CodeList) {
        segmentNameList.push(codeSegment.name);
      }
    });
    codeSegments.forEach((codeSegment, index) => {
      if (codeSegment instanceof CodeList) {
        if (index + 1 < codeSegments.length) {
          // only those to the right
          const rightOfThisSegmentNameList = segmentNameList.slice(index + 1);
          codeSegment.addEmptyFilterDefinitions(rightOfThisSegmentNameList);
        }
      }
    });
  }

}
