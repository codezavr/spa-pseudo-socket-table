import { Component, OnDestroy, OnInit } from '@angular/core';
import { PseudoSocketService } from '../../services/pseudo-socket.service';
import { FiltersFormData, TableItems } from '../../../../types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-data-table-wrapper',
  templateUrl: './data-table-wrapper.component.html',
  styleUrls: ['./data-table-wrapper.component.scss']
})
export class DataTableWrapperComponent implements OnInit, OnDestroy {
  mainTableData: TableItems = [];

  private readonly destroyedSubject: Subject<void> = new Subject<void>();

  constructor(private pseudoSocketService: PseudoSocketService) {}

  handleFormSubmit(data: FiltersFormData) {
    this.pseudoSocketService.updateConditions(data)
  }

  ngOnInit() {
    this.pseudoSocketService.getDataStream()
      .pipe(
        takeUntil(this.destroyedSubject)
      )
      .subscribe((tableItems: TableItems) => {
        this.mainTableData = tableItems;
      })
  }

  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }
}
