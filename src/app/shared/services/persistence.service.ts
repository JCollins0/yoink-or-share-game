import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class PersistenceService {
  constructor() {}

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
