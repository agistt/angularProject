import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponentComponent } from './bugs/add-component/add-component.component';
import { BugsListComponent } from './bugs/bugs-list/bugs-list.component';
import { EditComponent } from './bugs/edit/edit.component';


const routes: Routes = [
  { path: 'addBugToPostman', component: AddComponentComponent},
  { path: '', component: BugsListComponent},
  { path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
