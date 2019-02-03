
export class Project {

  shortDescription = '';
  description = '';

  constructor(public name: string, public id: string) { }

}


export class ProjectList {

  projects: Project[];

  constructor() {
    this.projects = new Array<Project>();
  }

}


export class ProjectFactory {

  static buildProject(json: any) {
    const project = new Project(json.name, json.id);
    if (json.shortDescription !== undefined) {
      project.shortDescription = json.shortDescription;
    }
    if (json.description !== undefined) {
      project.description = json.description;
    }
    return project;
  }

  static buildProjectList(json: any): ProjectList {
    const projectList = new ProjectList();
    json.projects.forEach((project) => {
      projectList.projects.push(ProjectFactory.buildProject(project));
    });
    return projectList;
  }

  static buildEmtyProjectList(): ProjectList {
    return new ProjectList();
  }

}

