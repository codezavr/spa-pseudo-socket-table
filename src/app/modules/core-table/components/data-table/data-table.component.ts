import { Component, Input } from '@angular/core';
import { TableItems } from '../../../../types';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() mainTableData: TableItems;
}
