import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpClient: HttpClient) {}

  // URL DO CHEAPSHARK PARA USO GERAL NAS REQUESTS
  private readonly cheapSharkUrl = 'https://www.cheapshark.com/api/1.0/deals';

  // BUSCA OS JOGOS EM DESCONTO NA API DA CHEAPSHARK
  fetchGameDiscounts(
    pageNumber: number = 0,
    pageSize: number = 12,
    storeID: number = 1,
    onSale: number = 1,
    AAA: number = 1,
    query: string,
    sortBy: 'Price' | 'Savings' | 'Title',
    desc: number = 0
  ) {
    // SETA OS HTTP PARAMS PARA A BUSCA
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`)
      .set('storeID', `${storeID}`)
      .set('onSale', `${onSale}`)
      .set('AAA', `${AAA}`)
      .set('sortBy', sortBy)
      .set('desc', `${desc}`)
      .set('title', `${query}`);

    return this.httpClient.get(`${this.cheapSharkUrl}`, { params });
  }

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
}
