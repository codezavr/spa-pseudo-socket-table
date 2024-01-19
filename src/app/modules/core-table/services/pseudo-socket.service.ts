import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FiltersFormData, TableItems } from '../../../types';
import { workerBaseConfig } from '../../../constants';
import { DataElement, DataElementChild } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class PseudoSocketService {
  private dataStream = new Subject<TableItems>();
  private worker: Worker;
  private displayedData: TableItems = [];
  private intervalWorker?: number;

  private dataLength: number = workerBaseConfig.arraySize;

  private additionalIds: string[] = [];

  constructor() {
    this.worker = new Worker(new URL('../web-workers/pseudo-socket.worker', import.meta.url));

    this.worker.onmessage = (event) => {
      const newData = event.data;
      this.updateDisplayedData(newData);
      this.dataStream.next([...this.displayedData]);
    };

    this.intervalWorker = setInterval(() => {
      this.worker.postMessage(workerBaseConfig.arraySize)
    }, workerBaseConfig.interval);
  }

  private updateDisplayedData(newData: TableItems) {
    this.displayedData = [];
    const displayedData = [...newData].map((item) => {
      return new DataElement(
        item.id,
        item.int,
        item.float,
        item.color,
        new DataElementChild(item.child.id, item.child.color)
      );
    });

    for (let i = this.dataLength - workerBaseConfig.lastElementsCount; i < this.dataLength; i++) {
      const currentDisplayData = { ...displayedData[i] };
      this.displayedData = [...this.displayedData, currentDisplayData];
      const additionalId = this.additionalIds[this.displayedData.length - 1];

      if (additionalId) {
        currentDisplayData.id = this.additionalIds[this.displayedData.length - 1];
      }
    }
  }

  getDataStream(): Observable<TableItems> {
    return this.dataStream.asObservable();
  }

  updateConditions({ interval, arraySize, additionalIds }: FiltersFormData) {

    if (additionalIds) {
      this.additionalIds = additionalIds.split(',');
    }

    this.dataLength = arraySize;
    clearInterval(this.intervalWorker);
    this.intervalWorker = setInterval(() => {
      this.worker.postMessage(arraySize)
    }, interval);
  }
}
