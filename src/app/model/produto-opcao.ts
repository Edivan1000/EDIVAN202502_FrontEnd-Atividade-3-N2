// Removida a importação de ProdutoCatalogo, pois a referência 'catalogo' não é mais usada.

/**
 * Interface que representa as opções de um produto (validade e preço).
 * Alinhada com as correções de serialização do Backend.
 */
export interface ProdutoOpcao {
  id?: number;
  validadeMeses: number; // 12, 24, 36
  preco: number;
  
  // O relacionamento com ProdutoCatalogo (catalogo) foi ignorado no Backend e deve ser omitido aqui.
}