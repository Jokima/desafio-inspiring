import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // VARIÁVEL PARA CONTROLAR O ESTADO DO COMPONENTE DE LOADING (MOSTRANDO/ESCONDIDO)
  public loader = 0;

  constructor() {
  }
}
