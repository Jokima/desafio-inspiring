export interface IOferta {
    id: string;
    preco: string;
    precoDesconto: string;
    titulo: string;
    idLoja?: number;
    descricao?: string;
}