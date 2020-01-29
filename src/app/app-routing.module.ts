import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './bugs/bugs-list/update/update.component';
import { BugsListComponent } from './bugs/bugs-list/bugs-list.component';


const routes: Routes = [
  { path: 'addBug', component: UpdateComponent},
  { path: '', component: BugsListComponent},
  { path: 'edit/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
