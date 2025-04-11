import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = new Subject<boolean>();
  public isLoading$ = this.isLoading.asObservable();

  show(): void {
    this.isLoading.next(true);
  }

  hide(): void {
    this.isLoading.next(false);
  }
}
