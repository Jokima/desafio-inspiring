import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IOferta } from "src/app/models/oferta.model";
import { NotificacaoService } from "src/app/services/notificacao.service";
import { OfertasService } from "src/app/services/ofertas.service";

@Component({
  selector: "app-cadastro-ofertas",
  templateUrl: "./cadastro-ofertas.component.html",
  styleUrls: ["./cadastro-ofertas.component.scss"],
})
export class CadastroOfertasComponent implements OnInit {
  // OBJETO DE OFERTA A SER ADICIONADO/EDITADO
  oferta: IOferta;

  // ARRAY DE LOJAS
  lojas = [
    { id: 1, nome: "Epic" },
    { id: 2, nome: "Origin" },
    { id: 3, nome: "Steam" },
  ];

  constructor(
    public ofertasService: OfertasService,
    public router: Router,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    // INICIALIZA A OFERTA COM UMA CÓPIA DO OBJETO DE OFERTA DA SERVICE
    this.oferta = { ...this.ofertasService.oferta };
  }

  validarInputs(form: IOferta): void {
    // VALIDA EXISTENCIA DE ID
    if (!form.id) {
      this.notificacaoService.mostrarSnack(
        "Insira um ID!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA SE ID É ÚNICO, EM CASO DE ADIÇÃO
    if (this.verificarIdUnico(form.id) && !this.ofertasService.editMode) {
      this.notificacaoService.mostrarSnack(
        "Já existe um jogo cadastrado com este ID!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA EXISTENCIA DE TÍTULO
    if (!form.titulo) {
      this.notificacaoService.mostrarSnack(
        "Insira um título!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA EXISTENCIA DE PREÇO
    if (!form.preco) {
      this.notificacaoService.mostrarSnack(
        "Insira um preço!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA PREÇO > 0
    if (Number(form.preco.replace(",", ".")) <= 0) {
      this.notificacaoService.mostrarSnack(
        "Preço deve ser maior que 0!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA PREÇO DESCONTO
    if (!form.precoDesconto) {
      this.notificacaoService.mostrarSnack(
        "Insira um preço com desconto!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA PREÇO DESCONTO > 0
    if (Number(form.precoDesconto.replace(",", ".")) <= 0) {
      this.notificacaoService.mostrarSnack(
        "Preço com desconto deve ser maior que 0!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // VALIDA PREÇO DESCONTO < QUE PREÇO NORMAL
    if (
      Number(form.precoDesconto.replace(",", ".")) >=
      Number(form.preco.replace(",", "."))
    ) {
      this.notificacaoService.mostrarSnack(
        "Preço com desconto deve ser menor que o preço normal!",
        5000,
        "snackbar-negativo"
      );
      return;
    }

    // SALVA/EDITA UM REGISTRO AO PASSAR POR VALIDAÇÕES
    this.salvar(form);
  }

  verificarIdUnico(id: string): boolean {
    // BUSCA O UM ELEMENTO CUJO ID SEJA IGUAL AO ID INFORMADO, RETORNA TRUE OU FALSE COM BASE NA EXISTENCIA
    const found = this.ofertasService.ofertas.findIndex((off) => {
      return id == off.id;
    });
    return found !== -1;
  }

  salvar(form: IOferta): void {
    // SE ESTÁ EM MODO DE EDIÇÃO, ATUALIZA O REGISTRO CUJO ID É IGUAL AO ID INFORMADO
    if (this.ofertasService.editMode) {
      const newOfertas = this.ofertasService.ofertas.map((off: IOferta) => {
        return off.id === this.oferta.id ? this.oferta : off;
      });
      this.ofertasService.ofertas = newOfertas;
      this.notificacaoService.mostrarSnack(
        "Oferta atualizada com sucesso!",
        5000,
        "snackbar-positivo"
      );
    } else {
      // CASO CONTRÁRIO, ADICIONA UM NOVO REGISTRO À LISTA
      this.ofertasService.ofertas = [
        ...this.ofertasService.ofertas,
        { ...form },
      ];
      this.notificacaoService.mostrarSnack(
        "Oferta cadastrada com sucesso!",
        5000,
        "snackbar-positivo"
      );
    }
    this.router.navigateByUrl("/");
  }
}
