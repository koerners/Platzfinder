import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {SingleViewComponent} from '../single-view/single-view.component';
import {LegalComponent} from "../legal/legal.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'view/:bib',
    component: SingleViewComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
