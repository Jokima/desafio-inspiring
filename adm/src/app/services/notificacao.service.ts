import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(public snackBar: MatSnackBar) { }

  // SERVICE CRIADA PARA APRESENTAÇÃO DE SNACKBARS

  mostrarSnack(msg: string, drt: number, css: string): void {
    this.snackBar.open(msg, 'Ok', {
      duration: drt,
      panelClass: css
    });
  }

}