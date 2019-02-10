import {EventEmitter, Output} from '@angular/core';

export interface CodeSegmentComponentItf {
  valueSelected: EventEmitter<CodeListEntry|string>;
  name: string;
  getValue(): string;
  isValid(): boolean;
  applyFilter(filterDef: CodeListFilterDefinition): void;
}


export class CodeListFilter {

  constructor(public sourceSegment: string, private allowedIDs: number[]) {
  }

  hasId(id: number): boolean {
    if (this.allowedIDs.length === 0) {
      return true;
    } else {
      if (id !== 0) {
        let found = false;
        this.allowedIDs.forEach((allowedID) => {
          found = found || allowedID === id;
        });
        return found;
      } else {
        return true;
      }
    }
  }
}

export class CodeListFilterList {

  filters: CodeListFilter[] = [];

  constructor(private segment: CodeSegment) {
  }

  applyFilterDefinition(filterDef: CodeListFilterDefinition) {
    this.filters = this.filters.filter((entry) => {
      return entry.sourceSegment !== filterDef.sourceSegment.name;
    });
    this.filters.push(new CodeListFilter(filterDef.sourceSegment.name, filterDef.allowedIDs));
  }

  hasId(id: number) {
    let result = true;
    this.filters.forEach((filter) => {
      result = result && filter.hasId(id);
    });
    return result;
  }
}

export class CodeListFilterDefinition {

  allowedIDs: number[] = [];

  constructor(public sourceSegment: CodeSegment, public targetSegmentName: string) { }

}

export class CodeSegment {

  helpTopicId: string = null;

  constructor(public name: string, public displayName: string) { }
}


export class CodeField extends CodeSegment {

  required = false;
  pattern = '';

  constructor(public name: string, public displayName: string) {
    super(name, displayName);
  }
}


export class CodeList extends CodeSegment {
  entries: CodeListEntry[] = [];
  filters: CodeListFilterList;
  fixed = false;

  filtering = true; // avoids that this will affect other segments
  filtered = true; // avoids that entries are filtered

  constructor(public name: string, public displayName: string) {
    super(name, displayName);
    this.filters = new CodeListFilterList(this);
  }

  // adding empty filter definitions to each entry for ALL
  // segments on the right (of the segment list) makes
  // resetting simple as this is actually the same as applying
  // a filled filter definition
  addEmptyFilterDefinitions(segmentNames: Array<string>) {
    if (this.filtering) {
      this.entries.forEach((entry) => {
        entry.addEmptyFilterDefinitions(segmentNames);
      });
    }
  }
}

export class CodeListEntry {
  segment: CodeSegment;
  name: string;
  value: string;
  id = 0;
  filterDefinitions: CodeListFilterDefinition[] = [];

  addEmptyFilterDefinitions(segmentNames: Array<string>) {
    segmentNames.forEach((segmentName) => {
      let foundFilter = false;
      this.filterDefinitions.forEach((filterDef) => {
        if (filterDef.targetSegmentName === segmentName) {
          foundFilter = true;
        }
      });
      if (foundFilter === false) {
        this.filterDefinitions.push(new CodeListFilterDefinition(this.segment, segmentName));
      }
    });
  }
}

export class CodeSegmentFactory {

  private static processCodeSegment(json: any, codeSegment: CodeSegment ) {
    if (json.helpTopicId !== undefined) {
      codeSegment.helpTopicId = json.helpTopicId;
    }
  }

  private static prepareFilterDefinitions(codeSegments: CodeSegment[]) {
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

  static buildEmptyCodeField(): CodeField {
    return new CodeField('', '');
  }

  static buildEmptyCodeList(): CodeList {
    return new CodeList('', '');
  }

  static buildCodeListFilterDefinition(codeSegment: CodeSegment, json: any): CodeListFilterDefinition {
    const codeSegmentFilterDefinition = new CodeListFilterDefinition(codeSegment, json.segment);
    codeSegmentFilterDefinition.allowedIDs = json.allowedIds;
    return codeSegmentFilterDefinition;
  }

  static buildCodeListEntry(codeSegment: CodeSegment, json: any): CodeListEntry {
    const codeSegmentEntry = new CodeListEntry();
    codeSegmentEntry.segment = codeSegment;
    codeSegmentEntry.name = json.name;

    if (json.value === undefined) {
      codeSegmentEntry.value = json.name;
    } else {
      codeSegmentEntry.value = json.value;
    }

    if (json.id !== undefined) {
      codeSegmentEntry.id = json.id;
    }

    if (json.filters !== undefined) {
      codeSegmentEntry.filterDefinitions = [];
      json.filters.forEach((filter: any) => {
        codeSegmentEntry.filterDefinitions.push(CodeSegmentFactory.buildCodeListFilterDefinition(codeSegment, filter));
      });
    }
    return codeSegmentEntry;
  }

  static buildCodeField(json: any): CodeField {
    const codeField = new CodeField(json.name, json.displayName);

    if (json.pattern !== undefined) {
      codeField.pattern = json.pattern;
    }
    if (json.required !== undefined) {
      codeField.required = json.required;
    }

    CodeSegmentFactory.processCodeSegment(json, codeField);
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

    json.entries.forEach((entry: any) => {
      codeList.entries.push(CodeSegmentFactory.buildCodeListEntry(codeList, entry));
    });

    CodeSegmentFactory.processCodeSegment(json, codeList);
    return codeList;
  }

  static buildCodeSegments(json: any): Array<CodeSegment> {

    const codeSegments = [];

    json.segments.forEach((entry: any) => {
      if (entry.type === 'LIST') {
        codeSegments.push(CodeSegmentFactory.buildCodeList(entry));
      } else if (entry.type === 'FIELD') {
        codeSegments.push(CodeSegmentFactory.buildCodeField(entry));
      }
    });

    CodeSegmentFactory.prepareFilterDefinitions(codeSegments);
    return codeSegments;
  }



}
