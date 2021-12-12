import { NgModule } from '@angular/core';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BasicInputComponent } from 'src/app/components/basic-input/basic-input.component';
import { OfferCardComponent } from 'src/app/components/offer-card/offer-card.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HomePageComponent,
    PageTitleComponent,
    BasicInputComponent,
    OfferCardComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
})
export class HomePageModule {}
