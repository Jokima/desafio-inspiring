import { Injectable } from '@angular/core';
import { IOffer } from '../models/ofertas.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor() {}

  // O OBJETO COM AS OFERTAS FORNECIDO NO DESAFIO
  offers: IOffer[] = [
    {
      title: 'RAGE 2',
      salePrice: '0,00',
      normalPrice: '199,00',
      thumb: 'assets/imgs/548570.jpg',
    },
    {
      title: 'Batman™: Arkham Knight',
      salePrice: '12,49',
      normalPrice: '49,99',
      thumb: 'assets/imgs/208650.jpg',
    },
    {
      title: 'The Sims™ 4',
      salePrice: '39,75',
      normalPrice: '159,00',
      thumb: 'assets/imgs/1222670.jpg',
    },
    {
      title: 'Street Fighter V',
      salePrice: '15,99',
      normalPrice: '39,99',
      thumb: 'assets/imgs/310950.jpg',
    },
    {
      title: 'Divinity: Original Sin 2 - Definitive Edition',
      salePrice: '36,39',
      normalPrice: '90,99',
      thumb: 'assets/imgs/435150.jpg',
    },
    {
      title: 'Planet Zoo',
      salePrice: '50,00',
      normalPrice: '100,00',
      thumb: 'assets/imgs/703080.jpg',
    },
    {
      title: 'Battlefield V',
      salePrice: '119,60',
      normalPrice: '299,00',
      thumb: 'assets/imgs/1238810.jpg',
    },

    {
      title: 'Arma 3',
      salePrice: '17,49',
      normalPrice: '69,99',
      thumb: 'assets/imgs/107410.jpg',
    },
    {
      title: 'Zombie Army 4: Dead War',
      salePrice: '84,59',
      normalPrice: '93,99',
      thumb: 'assets/imgs/694280.jpg',
    },
    {
      title: 'Sniper Ghost Warrior Contracts',
      salePrice: '34,99',
      normalPrice: '69,99',
      thumb: 'assets/imgs/973580.jpg',
    },
    {
      title: 'Jurassic World Evolution',
      salePrice: '19,99',
      normalPrice: '79,99',
      thumb: 'assets/imgs/648350.jpg',
    },
    {
      title: 'RollerCoaster Tycoon® 3: Complete Edition',
      salePrice: '22,79',
      normalPrice: '37,99',
      thumb: 'assets/imgs/1368820.jpg',
    },
  ];

  // FUNÇÃO CALCULANDO A PORCENTAGEM DE DESCONTO (1 - NORMALPRICE/SALEPRICE) * 100
  calculateDiscount(normalPrice: string, salePrice: string): number {
    // TRANSFORMA AS STRINGS EM NÚMEROS PARA CÁLCULO
    let np = Number(normalPrice.replace(',', '.'));
    let sp = Number(salePrice.replace(',', '.'));

    if (sp === 0) {
      return 100;
    } else {
      return Math.round((1 - sp / np) * 100);
    }
  }

  // FUNÇÃO PARA FILTRAR O ARRAY DE OFERTAS
  filterOffers(query: string, sort: string): IOffer[] {
    // REALIZA O .SORT() SEGUIDO DE UM .FILTER()
    return this.handleSort(this.offers, sort).filter((off) => {
      return off.title
        .trim()
        .toLocaleLowerCase()
        .includes(query.trim().toLowerCase());
    });
  }

  handleSort(array: IOffer[], sort: string): IOffer[] {
    // UM SWITCH COM O VALOR DO SORT PARA APLICAR O .SORT() CORRETO
    switch (sort) {
      case 'discount':
        return this.sortByDiscount(array);
      case 'bigger-price':
        return this.sortByBiggerPrice(array);
      case 'lower-price':
        return this.sortByLowerPrice(array);
      default:
        return this.sortByTitle(array);
    }
  }

  // REALIZA O .SORT() POR DESCONTO
  sortByDiscount(ofertas: IOffer[]): IOffer[] {
    return ofertas.sort((a, b) => {
      if (a.discount! > b.discount!) {
        return -1;
      }
      if (a.discount! < b.discount!) {
        return 1;
      }
      return 0;
    });
  }

  // REALIZA O .SORT() POR MAIOR PREÇO
  sortByBiggerPrice(ofertas: IOffer[]): IOffer[] {
    return ofertas.sort((a, b) => {
      if (
        Number(a.salePrice.replace(',', '.')) >
        Number(b.salePrice.replace(',', '.'))
      ) {
        return -1;
      }
      if (
        Number(a.salePrice.replace(',', '.')) <
        Number(b.salePrice.replace(',', '.'))
      ) {
        return 1;
      }
      return 0;
    });
  }

  // REALIZA O .SORT() POR MENOR PREÇO
  sortByLowerPrice(ofertas: IOffer[]): IOffer[] {
    return ofertas.sort((a, b) => {
      if (
        Number(a.salePrice.replace(',', '.')) >
        Number(b.salePrice.replace(',', '.'))
      ) {
        return 1;
      }
      if (
        Number(a.salePrice.replace(',', '.')) <
        Number(b.salePrice.replace(',', '.'))
      ) {
        return -1;
      }
      return 0;
    });
  }

  // REALIZA O .SORT() POR TÍTULO
  sortByTitle(ofertas: IOffer[]): IOffer[] {
    return ofertas.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
  }
}
