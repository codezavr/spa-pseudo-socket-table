import { Injectable } from '@angular/core';

interface RowEntityModelProps {
  id: number;
  int: number;
  float: number;
  color: string;
  child: { id: number, color: string }
}

@Injectable({ providedIn: 'root' })
export class RowEntityModel {

  id: number;
  int: number;
  float: number;
  color: string;
  child: { id: number, color: string }

  constructor({ id, int, float, color, child }: RowEntityModelProps) {
    this.id = id;
    this.int = int;
    this.float = float;
    this.color = color;
    this.child = child;
  }

}
