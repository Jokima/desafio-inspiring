import { Injectable } from "@angular/core";
import { IOferta } from "../models/oferta.model";

@Injectable({
  providedIn: "root",
})
export class OfertasService {

  // UM OBJETO LIMPO PARA CADASTRO
  readonly defaultOferta: IOferta = {
    id: "",
    preco: "",
    precoDesconto: "",
    titulo: ""
  };

  // OFERTAS BUSCADAS VIA LOCALSTORAGE
  ofertas: IOferta[] = JSON.parse(window.localStorage.getItem("ofertas-game-tracker"));
  // OFERTA A SER EDITADA/CADASTRADA NA TELA DE NOSSAS OFERTAS
  oferta: IOferta = this.defaultOferta;
  // TRUE SE ESTÁ EM MODO DE EDIÇÃO OU FALSE SE ESTÁ CADASTRANDO
  editMode: boolean = false;

  constructor() {}
}
