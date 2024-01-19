import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableWrapperComponent } from './modules/core-table/components/data-table-wrapper/data-table-wrapper.component';

const routes: Routes = [{
  path: '',
  component: DataTableWrapperComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
