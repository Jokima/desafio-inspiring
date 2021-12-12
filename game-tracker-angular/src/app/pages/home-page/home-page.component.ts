import { Component, OnInit } from '@angular/core';
import { IOfferCheapShark } from 'src/app/models/offerCheapShark.model';
import { IOptions } from 'src/app/models/options.model';
import { IPagination } from 'src/app/models/pagination.model';
import { LoaderService } from 'src/app/services/loader.service';
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
  filteredOffers: IOfferCheapShark[] = [];

  // OPÇÕES DE SORT
  sortOptions: IOptions[] = [
    { value: 'discount', label: '% desconto' },
    { value: 'bigger-price', label: 'Maior Preco' },
    { value: 'lower-price', label: 'Menor Preco' },
    { value: 'title', label: 'Título' },
  ];
  // VALOR DO SORT, % DE DESCONTO POR PADRÃO
  sort: string = 'discount';

  // PAGINAÇÃO
  pagination: IPagination = {
    pageNumber: 0,
    pageSize: 12,
  };

  constructor(
    public offerService: OfferService,
    private loaderService: LoaderService
  ) {}

  // VERIFICA O SORT PARA RETORNAR O VALOR CORRETO DE ORDENAÇÃO (Savings, Price ou Title)
  makeSortByParam(sort: string): 'Savings' | 'Price' | 'Title' {
    switch (sort) {
      case 'discount':
        return 'Savings';
      case 'bigger-price':
        return 'Price';
      case 'lower-price':
        return 'Price';
      default:
        return 'Title';
    }
  }

  // VERIFICA O SORT PARA RETORNAR O VALOR DE ORDENAÇÃO (CRESCENTE/DECRESCENTE)
  makeDescParam(sort: string): number {
    switch (sort) {
      case 'bigger-price':
        return 1;
      default:
        return 0;
    }
  }

  ngOnInit(): void {
    this.fetchOffers();
  }

  // CHAMADA À API, ACEITA UM PARÂMETRO "loadMore" PARA DEFINIR QUANDO CONCATENAR ITENS AO ARRAY ATUAL OU RESETAR SEU VALUE
  fetchOffers(loadMore: boolean = false) {

    if (!loadMore) {
      // SE NÃO FOR CARREGAR MAIS ITENS, ALTERAR PARA PÁGINA 0.
      this.pagination.pageNumber = 0;
    }

    // AUMENTA A VARIÁVEL LOADER PARA INICIAR A ANIMAÇÃO DE CARREGAMENTO
    this.loaderService.loader = 1;

    // REALIZA A CHAMADA À API, PASSANDO OS PARÂMETROS PARA O MÉTODO QUE EXECUTA A CHAMADA HTTP NA SERVICE "Offer Service".
    this.offerService
      .fetchGameDiscounts(
        this.pagination.pageNumber,
        this.pagination.pageSize,
        1,
        1,
        1,
        this.search,
        this.makeSortByParam(this.sort),
        this.makeDescParam(this.sort)
      )
      .subscribe(
        (res: any) => {
          // GERA OS VALORES DE DESCONTO
          this.generateDiscountValues(res);
          // CARREGA MAIS ITENS, OU RECEBE UM NOVO ARRAY.
          if (loadMore) {
            this.filteredOffers = [...this.filteredOffers, ...res];
          } else {
            this.filteredOffers = [...res];
          }
        },
        (err) => {},
        () => {
          this.loaderService.loader = 0;
        }
      );
  }

  // LIDA COM O EVENTO DO BOTÃO DE MOSTRAR MAIS ITENS. BUSCANDO ITENS DE UMA NOVA PÁGINA.
  handleShowMore(): void {
    this.pagination.pageNumber = this.pagination.pageNumber + 1;
    this.fetchOffers(true);
  }

  // FAZ UM LOOP NOS VALORES CALCULANDO OS DESCONTOS
  generateDiscountValues(value: IOfferCheapShark[]) {
    value.forEach((data: IOfferCheapShark) => {
      data.discount = this.offerService.calculateDiscount(
        data.normalPrice,
        data.salePrice
      );
    });
  }

  // LIDA COM O EVENTO DE FILTRO
  handleFilter(): void {
    this.fetchOffers();
  }
}
