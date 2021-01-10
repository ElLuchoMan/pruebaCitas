import { ConfirmDialogData } from './../model/confirm-dialog-data';
import { ConfirmDialogComponent } from './../components/confirm-dialog/confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingState = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  mostrarSnackBar(
    message: string,
    action?: string
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action ? action : 'Ok', {
      duration: 4 * 1000, // 4ms * 1000 ms = 4 segundos
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  configurarSnackBar<T>(promise: Promise<T>, mensaje: string): Observable<boolean> {
    this.loadingState.next(true);
    return new Observable((exito) => {
      promise
        .then((res: any) => {
          this.mostrarSnackBar(mensaje);
          this.loadingState.next(false);
          exito.next(true);
        })
        .catch((err) => {
          this.loadingState.next(false);
          exito.next(false);
          const message = err.error ? err.error.mensaje : 'Ha ocurrido un error, contacta un administrador';
          const errors: string[] = err.error && err.error.errors ? err.error.errors : [];
          this.mostrarError({ title: 'Error', message, errors, confirm: 'Ok' });
        });
    });
  }

  mostrarConfirmDialog(data: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: data.title,
        message: data.message,
        errors: data.errors ? data.errors : [],
        confirm: data.confirm,
      },
    });
  }

  volverAListar(ruta: string): void {
    this.router.navigate([ruta]);
  }

  mostrarError(data: ConfirmDialogData): void {
    this.mostrarConfirmDialog({ ...data });
  }

}
