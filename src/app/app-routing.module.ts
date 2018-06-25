import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CrudTableComponent
  },
  {
    path: 'item/:id',
    component: EditItemComponent,
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
