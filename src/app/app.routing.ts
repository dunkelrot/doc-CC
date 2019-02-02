import { Routes, RouterModule } from '@angular/router';
import {CodeViewComponent} from './code/code-view/code-view.component';


const appRoutes: Routes = [
  { path: 'project/:id', component: CodeViewComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
