import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IOferta } from 'src/app/models/oferta.model';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-nossas-ofertas',
  templateUrl: './nossas-ofertas.component.html',
  styleUrls: ['./nossas-ofertas.component.scss']
})

export class NossasOfertasComponent implements OnInit {

  @Output() tableRowClick;

  displayedColumns: string[] = ['id', 'titulo', 'preco', 'precoDesconto', 'idLoja', 'descricao'];
  dataSource;

  constructor(public ofertasService: OfertasService, private router: Router) { }

  ngOnInit(): void {
    this.ofertasService.oferta = this.ofertasService.defaultOferta;
    this.ofertasService.editMode = false;
    this.dataSource = this.ofertasService.ofertas;
  }

  handleRowClick(row: IOferta): void {
    this.ofertasService.oferta = row;
    this.ofertasService.editMode = true;
    this.router.navigateByUrl('/cadastroofertas');
  }

}
