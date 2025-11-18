import { CategoriaCertificado } from "./categoriacertificado";

export class Produto {
    codigo!: number;
    nome!: string;
    descricao!: string;
    validadeMeses!: number;
    preco!: number;
    disponivel!: boolean;
    quantidade!: number;
    tipoPessoa!: string; // PF ou PJ
    modalidade!: string; // Token Safenet, Cartão AWP, Arquivo A1…
    categoriaCertificado!: CategoriaCertificado;
}
