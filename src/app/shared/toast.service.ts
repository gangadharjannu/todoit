import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: MatSnackBar) {}
  showToast(text: string, duration: number) {
    return this.toast.open(text, null, { duration: duration * 1000 });
  }
}
