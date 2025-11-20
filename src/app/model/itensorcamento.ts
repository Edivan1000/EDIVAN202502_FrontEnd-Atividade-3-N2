import { Orcamento } from './orcamento';
import { Produto } from './produto';

export class ItensOrcamento {
  codigo?: number;
  quantidade!: number;
  orcamento!: Orcamento; //Muitos itens pertencem a um orçamento
  produto!: Produto; //Muitos itens podem referenciar um produto
}
