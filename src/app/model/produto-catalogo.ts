import { ProdutoOpcao } from './produto-opcao';

export interface ProdutoCatalogo {
  id?: number;
  nome: string; // Ex: Certificado A1
  descricao?: string;
  
  // Relacionamento 1:N (Para carregar as opções junto com o produto)
  opcoes?: ProdutoOpcao[]; 
}