import { Component, Input, OnInit } from '@angular/core';
import { IOffer } from 'src/app/models/ofertas.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {
  @Input() offer!: IOffer;

  constructor() {}

  ngOnInit(): void {}

  formatarPorcentagemDesconto(value: number): string {
    if (value === 100) {
      return 'GRÁTIS';
    } else {
      return `-${value.toFixed(0)}%`;
    }
  }
}
