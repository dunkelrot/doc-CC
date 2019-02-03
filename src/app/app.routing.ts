import { Routes, RouterModule } from '@angular/router';
import {CodeViewComponent} from './code/code-view/code-view.component';
import {ProjectListComponent} from './project/project-list/project-list.component';
import {AboutComponent} from './home/about/about.component';


const appRoutes: Routes = [
  { path: 'projects', component: ProjectListComponent},
  { path: 'project/:id', component: CodeViewComponent},
  { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
