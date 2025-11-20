import { CategoriaCertificado } from "./categoriacertificado";

export class Produto {
    codigo!: number;
    nome!: string;
    descricao!: string;
    validadeMeses!: number;
    preco!: number;
    disponivel!: boolean; // Para colocar a disposição de venda mediante estoque
    quantidade!: number;
    tipoPessoa!: string; // PF ou PJ
    modalidade!: string; // Token, Cartão, Arquivo
    categoriaCertificado!: CategoriaCertificado; // Muitos produtos estão associados a uma mesma categoria de certificado
}
