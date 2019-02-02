
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
  name: string;
  displayName: string;
  entries: CodeSegmentEntry[] = [];
  filters: CodeSegmentFilterList;
  fixed = false;

  constructor() {
    this.filters = new CodeSegmentFilterList(this);
  }

  addEmptyFilterDefinitions(segmentNames: Array<string>) {
    this.entries.forEach((entry) => {
      entry.addEmptyFilterDefinitions(segmentNames);
    });
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

  static buildEmptyCodeSegment(): CodeSegment {
    const codeSegment = new CodeSegment();
    return codeSegment;
  }

  static buildCodeSegmentFilterDefinition(codeSegment: CodeSegment, json: any): CodeSegmentFilterDefinition {
    const codeSegmentFilterDefinition = new CodeSegmentFilterDefinition(codeSegment, json.segment);
    codeSegmentFilterDefinition.allowedIDs = json.allowedIds;
    return codeSegmentFilterDefinition;
  }

  static buildCodeSegmentEntry(codeSegment: CodeSegment, json: any): CodeSegmentEntry {
    const codeSegmentEntry = new CodeSegmentEntry();
    codeSegmentEntry.segment = codeSegment;
    codeSegmentEntry.name = json.name;
    codeSegmentEntry.value = json.value;
    codeSegmentEntry.id = json.id;
    if (json.filters !== undefined) {
      codeSegmentEntry.filterDefinitons = [];
      json.filters.forEach((filter) => {
        codeSegmentEntry.filterDefinitons.push(CodeSegmentFactory.buildCodeSegmentFilterDefinition(codeSegment, filter));
      });
    }
    return codeSegmentEntry;
  }

  static buildCodeSegment(json: any): CodeSegment {
    const codeSegment = new CodeSegment();
    codeSegment.name = json.name;
    codeSegment.displayName = json.displayName;

    if (json.fixed !== undefined) {
      codeSegment.fixed = json.fixed;
    }

    json.entries.forEach((entry) => {
      codeSegment.entries.push(CodeSegmentFactory.buildCodeSegmentEntry(codeSegment, entry));
    });
    return codeSegment;
  }

  static buildCodeSegments(json: any): Array<CodeSegment> {
    const codeSegments = [];
    json.segments.forEach((entry) => {
      codeSegments.push(CodeSegmentFactory.buildCodeSegment(entry));
    });

    CodeSegmentFactory.prepare(codeSegments);
    return codeSegments;
  }

  static prepare(codeSegments: CodeSegment[]) {
    const segmentNameList = Array<string>();
    codeSegments.forEach((codeSegment) => {
      segmentNameList.push(codeSegment.name);
    });

    codeSegments.forEach((codeSegment, index) => {
      if (index + 1 < codeSegments.length) {
        const rightOfThisSegmentNameList = segmentNameList.slice(index + 1);
        codeSegment.addEmptyFilterDefinitions(rightOfThisSegmentNameList);
      }
    });
  }

}
