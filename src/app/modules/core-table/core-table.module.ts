import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataFiltersComponent } from './components/data-filters/data-filters.component';
import { DataTableWrapperComponent } from './components/data-table-wrapper/data-table-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PseudoSocketService } from './services/pseudo-socket.service';

@NgModule({
  declarations: [
    DataTableComponent,
    DataFiltersComponent,
    DataTableWrapperComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [PseudoSocketService]
})
export class CoreTableModule {
}
