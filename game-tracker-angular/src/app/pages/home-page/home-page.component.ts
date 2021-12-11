import { Component, OnInit } from '@angular/core';
import { IOffer } from 'src/app/models/ofertas.model';
import { IOptions } from 'src/app/models/options.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // VALOR DO INPUT DE BUSCA
  search: string = '';
  // ARRAY DE OFERTAS FILTRADO
  filteredOffers: IOffer[] = [];

  // OPÇÕES DE SORT
  sortOptions: IOptions[] = [
    { value: 'discount', label: '% desconto' },
    { value: 'bigger-price', label: 'Maior Preco' },
    { value: 'lower-price', label: 'Menor Preco' },
    { value: 'title', label: 'Título' },
  ];
  // VALOR DO SORT
  sort: string = 'discount';

  constructor(public offerService: OfferService) {}

  ngOnInit(): void {
    // INICIALIZA AS OFERTAS FILTRADAS COM UMA CÓPIA DO ARRAY DE OFERTAS
    this.filteredOffers = [...this.offerService.offers];
    // PARA GERA O DESCONTO PARA CADA ITEM
    this.filteredOffers.forEach((off) => {
      off.discount = this.offerService.calculateDiscount(
        off.normalPrice,
        off.salePrice
      );
    });
  }

  // LIDA COM O EVENTO DE FILTRO
  handleFilter(): void {
    this.filteredOffers = [
      ...this.offerService.filterOffers(this.search, this.sort),
    ];
  }
}
