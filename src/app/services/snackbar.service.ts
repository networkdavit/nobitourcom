import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 15000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'snack-success'
    });
  }

  openSnackWrongBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 15000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'snack-unsuccess'
    });
  }

  showLoginMessage() {
    this.snackBar.open('Logged in', '', {
      duration: 2000,
      panelClass: 'green-snackbar'
    });
  }

  showLogoutMessage() {
    this.snackBar.open('Logged out', '', {
      duration: 2000,
      panelClass: 'red-snackbar'
    });
  }
}