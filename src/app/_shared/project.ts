
export class Project {

  shortDescription = '';
  description = '';
  icon: string = null;

  constructor(public name: string, public id: string) { }

}


export class ProjectList {

  projects: Project[];

  constructor() {
    this.projects = new Array<Project>();
  }

}


export class ProjectFactory {

  static buildProject(json: any): Project {

    if (json.name !== undefined && json.id !== undefined) {
      const project = new Project(json.name, json.id);

      if (json.shortDescription !== undefined) {
        project.shortDescription = json.shortDescription;
      }
      if (json.description !== undefined) {
        project.description = json.description;
      }
      if (json.icon !== undefined) {
        project.icon = json.icon;
      }

      return project;
    } else {
      throw Error('Expected properties not present in JSON struct for Project.');
    }
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

