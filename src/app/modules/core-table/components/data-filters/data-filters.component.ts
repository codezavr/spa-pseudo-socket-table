import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { workerBaseConfig } from '../../../../constants';
import { FiltersFormData } from '../../../../types';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.scss']
})
export class DataFiltersComponent implements OnInit {
  @Output() onFormSubmit: EventEmitter<FiltersFormData> = new EventEmitter<FiltersFormData>();

  dataFiltersForm: FormGroup = this.formBuilder.group({
    interval: [workerBaseConfig.interval],
    arraySize: [workerBaseConfig.arraySize],
    additionalIds: ['']
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataFiltersForm.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(() => {
        this.onSubmit();
      });
  }

  onSubmit() {
    this.onFormSubmit.emit(this.dataFiltersForm.value);
  }

}
