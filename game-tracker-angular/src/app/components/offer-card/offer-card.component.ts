import { Component, Input, OnInit } from '@angular/core';
import { IOfferCheapShark } from 'src/app/models/offerCheapShark.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {
  @Input() offer!: IOfferCheapShark;

  constructor() {}

  ngOnInit(): void {}

  makeThumbFromSteam(steamAppID: string): string {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppID}/header.jpg`;
  }

  formatDiscountPercentage(value: number): string {
    if (value === 100) {
      return 'GRÁTIS';
    } else {
      return `-${value.toFixed(0)}%`;
    }
  }

  makeSubstringFromTitle(value: string): string {
    return value.substring(0, 51);
  }
}
